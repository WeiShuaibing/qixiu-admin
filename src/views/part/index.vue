<template>
 <div style="padding: 15px;">
   <!--头-->
   <el-row style="">
     <el-col :span="2" :offset="1">
       <el-button @click="addPart()" plain icon="el-icon-plus" type="primary">新增</el-button>
     </el-col>
     <el-col :span="6" :offset="2">
       <el-input @change="searchPart" placeholder="请输入关键字搜索..." v-model="matchStr" class="input-with-select">
         <el-button @click="searchPart" slot="append" icon="el-icon-search"></el-button>
       </el-input>
     </el-col>
   </el-row>

   <el-row style="margin-top: 10px;">
     <el-table v-loading="loading" :data="partList" style="width: 100%" stripe border>
       <el-table-column prop="partId" label="编码" width="120" align="center"></el-table-column>
       <el-table-column prop="partName" label="名字" width="120" align="center"></el-table-column>
       <el-table-column prop="partBuyNum" label="进货数量" width="100" align="center"></el-table-column>
       <el-table-column prop="partFreeNum" label="剩余数量" width="100" align="center"></el-table-column>
       <el-table-column prop="partPrice" label="进价" width="90" align="center"></el-table-column>
       <el-table-column prop="partQa" label="质保时长" width="100" align="center"></el-table-column>
       <el-table-column prop="partFrom" label="进货渠道" width="180" align="center"></el-table-column>
       <el-table-column prop="partRemark" label="备注" align="center"></el-table-column>
       <el-table-column prop="partBuyDate" label="进货日期" align="center" width="130">
         <template slot-scope="scope">
           {{scope.row.partBuyDate | dateFilter}}
         </template>
       </el-table-column>
       <el-table-column prop="partImgs" label="图片" align="center" width="320">
         <template slot-scope="scope">
           <el-image
             v-for="(img, index2) in scope.row.partImgs"
             :key="index2"
             style="width: 60px; height: 60px"
             :src="img | imgUrlFilter(BASE_HOST)"
             :preview-src-list="scope.row.partImgs | allImgUrlFilter(BASE_HOST)">
           </el-image>
         </template>
       </el-table-column>
       <el-table-column fixed="right" label="操作" width="160" align="center">
         <template slot-scope="scope">
           <el-button style="margin-left: 10px;" type="success" plain size="mini" @click="editPart(scope.row)">编辑</el-button>
           <el-button style="margin-left: 10px;" type="danger" plain size="mini" @click="deletePart(scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
   </el-row>
   <!--分页-->
   <el-row>
     <!--分页组件 start-->
     <div style="height: 40px;" />
     <el-pagination
       background
       style="margin-bottom: 100px;"
       :current-page="pageNum"
       :page-size="pageSize"
       :total="totalNum"
       layout="total, prev, pager, next, jumper"
       @current-change="handleCurrentChangeOfFenye"
     />
     <!--分页组件 end-->
   </el-row>
   <!--分页-->

   <!--新增零件对话框 Start-->
   <el-dialog title="新增零件" :visible.sync="dialogFormVisible" @close="closeDialog">
     <el-form :model="part">
       <el-row>
         <el-col :span="10">
           <el-form-item label="编号" label-width="140px">
             <el-input :disabled="isEdit"  v-model="part.partId" autocomplete="off" placeholder="请输入编号"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="10">
           <el-form-item label="零件名称" label-width="140px">
             <el-input v-model="part.partName" autocomplete="off" placeholder="请输入名称"></el-input>
           </el-form-item>
         </el-col>
       </el-row>
       <el-form-item label="进货渠道" label-width="140px">
         <el-input v-model="part.partFrom" autocomplete="off" placeholder="请输入进货渠道"></el-input>
       </el-form-item>
       <el-form-item :inline="true" label="进货数" label-width="140px">
         <el-input-number v-model="part.partBuyNum" :min="1" :max="100000"></el-input-number>
       </el-form-item>
       <el-form-item :inline="true" label="进价" label-width="140px">
         <el-input-number v-model="part.partPrice" :precision="2" :step="0.1" :min="1" :max="100000"></el-input-number>
       </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="购买日期" label-width="140px">
            <el-date-picker v-model="part.partBuyDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="质保时长" label-width="140px">
            <el-select v-model="part.partQa" placeholder="请选择">
              <el-option-group label="月">
                <el-option label="1个月" value="1个月"></el-option>
                <el-option label="2个月" value="2个月"></el-option>
                <el-option label="3个月" value="3个月"></el-option>
                <el-option label="4个月" value="4个月"></el-option>
                <el-option label="5个月" value="5个月"></el-option>
                <el-option label="6个月" value="6个月"></el-option>
                <el-option label="7个月" value="7个月"></el-option>
                <el-option label="8个月" value="8个月"></el-option>
                <el-option label="9个月" value="9个月"></el-option>
                <el-option label="10个月" value="10个月"></el-option>
                <el-option label="11个月" value="11个月"></el-option>
              </el-option-group>
              <el-option-group label="年">
                <el-option label="1年" value="1年"></el-option>
                <el-option label="2年" value="2年"></el-option>
                <el-option label="3年" value="3年"></el-option>
                <el-option label="4年" value="4年"></el-option>
                <el-option label="5年" value="5年"></el-option>
                <el-option label="6年" value="6年"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-form-item label="图片" label-width="140px">
         <el-upload
           :action="UPLOAD_PATH"
           list-type="picture-card"
           :limit="5"
           :file-list="fileListOfEdit"
           :on-preview="handlePictureCardPreview"
           :on-success="handleUpLoadSuccessRecordImg"
           accept=".jpg,.jpeg,.png"
           :on-remove="handleRemoveImg">
           <i class="el-icon-plus"></i>
         </el-upload>
       </el-form-item>
       <el-form-item label="备注" label-width="140px">
         <el-input type="textarea" v-model="part.partRemark" autocomplete="off" placeholder="请输入备注信息..."></el-input>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button v-if="!isEdit" type="primary" @click="enshureAddPart">确 定</el-button>
       <el-button v-if="isEdit" type="primary" @click="enUpdatePart">修 改</el-button>
     </div>
   </el-dialog>
   <!--新增零件对话框 End-->
 </div>
</template>

<script>
import { add, getPage, deleteById, update, search } from '../../api/part'
export default {
  name: 'PartIndex',
  data() {
    return {
      loading: false,
      isEdit: false,
      UPLOAD_PATH: '',
      BASE_HOST: '',
      matchStr: '',
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      partList: [],
      dialogFormVisible: false,
      part: {
        partId: '',
        partName: '',
        partBuyNum: '',
        partPrice: '',
        partBuyDate: '',
        partQa: '',
        partFrom: '',
        partRemark: '',
        partImgs: []
      },
      fileListOfEdit: []
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
    dateFilter(value) {
      if (!value) {
        return '未知'
      }
      var date = new Date(value)
      return (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
    },
    imgUrlFilter(value, that) {
      return that + value
    }
  },
  mounted() {
    this.initUPLOAD_PATH()
    this.getPage()
  },
  methods: {
    editPart(row) {
      this.isEdit = true
      this.dialogFormVisible = true
      this.part = JSON.parse(JSON.stringify(row))
      this.part.partImgs.forEach((item, index) => {
        this.fileListOfEdit.push({
          url: this.BASE_HOST + item
        })
      })
      console.log(this.partList)
    },
    deletePart(row) {
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.partId).then(res => {
          this.$message.success('删除成功')
          this.getPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    enshureAddPart() {
      if (this.part.partId === '' || this.part.partName === '' ||
        this.part.partBuyNum === '' ||
        this.part.partPrice === '' || this.part.partBuyDate === '' ||
        this.part.partQa === '' || this.part.partFrom === '') {
        this.$message.info('请完善信息')
        return
      }
      add({
        partId: this.part.partId,
        partName: this.part.partName,
        partBuyNum: this.part.partBuyNum,
        partFreeNum: this.part.partBuyNum,
        partPrice: this.part.partPrice,
        partBuyDate: this.part.partBuyDate,
        partQa: this.part.partQa,
        partFrom: this.part.partFrom,
        partRemark: this.part.partRemark,
        partImgs: this.part.partImgs.join(',')
      }).then(res => {
        this.$message.success('添加成功')
        this.getPage()
        this.closeDialog()
      })
    },
    enUpdatePart() {
      if (this.part.partId === '' || this.part.partName === '' ||
        this.part.partBuyNum === '' ||
        this.part.partPrice === '' || this.part.partBuyDate === '' ||
        this.part.partQa === '' || this.part.partFrom === '') {
        this.$message.info('请完善信息')
        return
      }
      update({
        partId: this.part.partId,
        partName: this.part.partName,
        partBuyNum: this.part.partBuyNum,
        partFreeNum: this.part.partBuyNum,
        partPrice: this.part.partPrice,
        partBuyDate: this.part.partBuyDate,
        partQa: this.part.partQa,
        partFrom: this.part.partFrom,
        partRemark: this.part.partRemark,
        partImgs: this.part.partImgs.join(',')
      }).then(res => {
        this.$message.success('修改成功')
        this.getPage()
        this.closeDialog()
      })
    },
    addPart() {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    searchPart() {
      this.loading = true
      if (this.matchStr === '') {
        this.getPage()
        return
      }
      search(this.matchStr, this.pageNum, this.pageSize).then(res => {
        this.partList = res.data.records
        this.totalNum = res.data.total
        this.partList.forEach((item, index) => {
          if (item.partImgs) {
            item.partImgs = item.partImgs.split(',')
          }
        })
        this.loading = false
      })
    },
    getPage() {
      this.loading = true
      getPage(this.pageNum, this.pageSize).then(res => {
        this.partList = res.data.records
        this.totalNum = res.data.total
        this.partList.forEach((item, index) => {
          if (item.partImgs) {
            item.partImgs = item.partImgs.split(',')
          }
        })
        this.loading = false
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    },
    closeDialog() {
      this.dialogFormVisible = false
      for (var key in this.part) {
        delete this.part[key]
      }
      this.fileListOfEdit = []
    },
    initUPLOAD_PATH() {
      this.UPLOAD_PATH = this.$UPLOAD_PATH
      this.BASE_HOST = this.$BASE_HOST
    },
    handlePictureCardPreview(file) {},
    handleUpLoadSuccessRecordImg(res, file) {
      this.part.partImgs.push(res.data.path)
    },
    handleRemoveImg(file, fileList) {
      this.part.partImgs = []
      if (this.isEdit) {
        fileList.forEach((item, index) => {
          this.part.partImgs.push('/' + item.url.split('//')[2])
        })
      } else {
        fileList.forEach((item, index) => {
          this.part.partImgs.push(item.response.data.path)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
