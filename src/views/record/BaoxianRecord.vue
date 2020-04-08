<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>保险记录({{recordList.length}})</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addRecord">新增</el-button>
      </div>
      <div>
        <el-timeline>
          <el-timeline-item v-for="item in recordList" :key="item.id" color="#f471d8" :timestamp="item.createDate | dateFilter" placement="top">
            <el-card>
              <span style="font-size: 18px;font-weight: 600">{{item.baoxianText}}</span>
<!--              <p>{{item.repairRemark}}</p>-->
              <p><span style="color: #eaac43;font-weight: 400">￥</span>&nbsp;{{item.baoxianPrice}}</p>
              <div>
                <el-image
                  v-for="(url, index2) in item.baoxianImgs"
                  :key="index2"
                  style="width: 100px; height: 100px"
                  :src="url | imgUrlFilter(BASE_HOST)"
                  :preview-src-list="item.baoxianImgs | allImgUrlFilter(BASE_HOST)">
                </el-image>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!--对话框Start-->
    <div>
      <el-dialog title="新增保险记录" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="record">
          <el-form-item label="保险内容 " label-width="140px">
            <el-input placeholder="请输入保险内容..." type="textarea" v-model="record.baoxianText" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="保险收费" label-width="140px">
            <el-input-number v-model="record.baoxianPrice" :precision="2" :step="0.1" :min="0" :max="1000000"></el-input-number>
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
import { add, getAll } from '../../api/baoxianRecord'
export default {
  name: 'BaoxianRecord',
  data() {
    return {
      customerId: 0,
      dialogFormVisible: false,
      record: {
        baoxianText: '',
        baoxianPrice: '',
        baoxianImgs: []
      },
      recordList: [],
      UPLOAD_PATH: '',
      BASE_HOST: ''
    }
  },
  props: [
    'customer_id'
  ],
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
  watch: {
    customer_id(newValue, oldValue) {
      this.customerId = newValue
      this.getAllRecord()
    }
  },
  mounted() {
    this.initUPLOAD_PATH()
  },
  methods: {
    enshureAddRecord() {
      if (this.record.baoxianImgs.length === 0) {
        this.$message.info('请完善信息')
        return
      }
      add({
        customerId: this.customerId,
        baoxianText: this.record.baoxianText,
        baoxianPrice: this.record.baoxianPrice,
        baoxianImgs: this.record.baoxianImgs.join(',')
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
          if (item.baoxianImgs) {
            item.baoxianImgs = item.baoxianImgs.split(',')
          }
        })
      })
    },
    addRecord() {
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.record.baoxianPrice = ''
      this.record.baoxianText = ''
      this.record.baoxianImgs = []
      this.$refs.upload.clearFiles()
    },
    initUPLOAD_PATH() {
      this.UPLOAD_PATH = this.$UPLOAD_PATH
      this.BASE_HOST = this.$BASE_HOST
    },
    handlePictureCardPreview(file) {},
    handleUpLoadSuccessRecordImg(res, file) {
      this.record.baoxianImgs.push(res.data.path)
    },
    handleRemoveImg(file, fileList) {
      this.record.baoxianImgs = []
      fileList.forEach((item, index) => {
        this.record.baoxianImgs.push(item.response.data.path)
      })
    }
  }
}
</script>

<style scoped>

</style>
