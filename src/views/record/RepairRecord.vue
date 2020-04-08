<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维修记录({{recordList.length}})</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addRecord">新增</el-button>
      </div>
      <div>
        <el-timeline style="">
          <el-timeline-item v-for="item in recordList" :key="item.id" color="#0bbd87" :timestamp="item.createDate | dateFilter" placement="top">
            <el-card>
              <span style="font-size: 18px;font-weight: 600">{{item.repairType}}</span>
              <p>{{item.repairRemark}}</p>
              <p><span style="color: #eaac43;font-weight: 400">￥</span>&nbsp;{{item.repairPrice}}</p>
              <div>
                <el-image
                  v-for="(url, index2) in item.repairImgs"
                  :key="index2"
                  style="width: 100px; height: 100px"
                  :src="url | imgUrlFilter(BASE_HOST)"
                  :preview-src-list="item.repairImgs | allImgUrlFilter(BASE_HOST)">
                </el-image>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!--对话框Start-->
    <div>
      <el-dialog title="新增维修记录" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="record">
          <el-form-item label="维修类型" label-width="140px">
            <el-select v-model="record.repairType" placeholder="请选择维修类型...">
              <el-option label="发动机维修" value="发动机维修"></el-option>
              <el-option label="车窗维修" value="车窗维修"></el-option>
              <el-option label="离合/刹车维修" value="离合/刹车维修"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维修价格" label-width="140px">
            <el-input-number v-model="record.repairPrice" :precision="2" :step="0.1" :min="0" :max="1000000"></el-input-number>
          </el-form-item>
          <el-form-item label="备注 " label-width="140px">
            <el-input placeholder="请输入备注信息..." type="textarea" v-model="record.repairRemark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" label-width="140px">
            <el-upload
              ref="upload"
              :action="UPLOAD_PATH"
              list-type="picture-card"
              :limit="5"
              :on-preview="handlePictureCardPreview"
              :on-success="handleUpLoadSuccessRecordImg"
              accept=".jpg,.jpeg,.png"
              :on-remove="handleRemoveImg">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enshureAddRecord">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { add, getAll } from '../../api/repairRecord'

export default {
  name: 'RepairRecord',
  data() {
    return {
      customerId: 0,
      dialogFormVisible: false,
      record: {
        repairType: '',
        repairPrice: 0,
        repairRemark: '',
        repairImgs: []
      },
      recordList: [],
      UPLOAD_PATH: '',
      BASE_HOST: ''
    }
  },
  props: [
    'customer_id'
  ],
  watch: {
    customer_id(newValue, oldValue) {
      this.customerId = newValue
      this.getAllRecord()
    }
  },
  filters: {
    allImgUrlFilter(value, that) {
      var imgs = []
      value.forEach((url, index) => {
        imgs.push(that + url)
      })
      return imgs
    },
    imgUrlFilter(value, that) {
      return that + value
    },
    dateFilter(value) {
      return value.substring(0, 10)
    }
  },
  mounted() {
    this.initUPLOAD_PATH()
  },
  methods: {
    enshureAddRecord() {
      if (this.record.repairType === '') {
        this.$message.info('请完善信息')
        return
      }
      add({
        customerId: this.customerId,
        repairType: this.record.repairType,
        repairPrice: this.record.repairPrice,
        repairRemark: this.record.repairRemark,
        repairImgs: this.record.repairImgs.join(',')
      }).then(res => {
        this.$message.success('添加成功')
        this.closeDialog()
        this.getAllRecord()
      })
    },
    getAllRecord() {
      getAll(this.customerId).then(res => {
        this.recordList = res.data
        this.recordList.forEach((item, index) => {
          if (item.repairImgs) {
            item.repairImgs = item.repairImgs.split(',')
          }
        })
      })
    },
    addRecord() {
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.record.repairType = ''
      this.record.repairPrice = 0
      this.record.repairRemark = ''
      this.record.repairImgs = []
      this.$refs.upload.clearFiles()
    },
    initUPLOAD_PATH() {
      this.UPLOAD_PATH = this.$UPLOAD_PATH
      this.BASE_HOST = this.$BASE_HOST
    },
    handlePictureCardPreview(file) {},
    handleUpLoadSuccessRecordImg(res, file) {
      this.record.repairImgs.push(res.data.path)
    },
    handleRemoveImg(file, fileList) {
      this.record.repairImgs = []
      fileList.forEach((item, index) => {
        this.record.repairImgs.push(item.response.data.path)
      })
    }
  }
}
</script>

<style scoped>

</style>
