<template>
    <div style="padding: 15px;">
      <!--头-->
      <el-row style="">
        <el-col :span="2" :offset="1">
          <el-button @click="addCustomer()" plain icon="el-icon-plus" type="primary">新增</el-button>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-input @change="searchCustomer" placeholder="请输入关键字搜索..." v-model="matchStr" class="input-with-select">
            <el-button @click="searchCustomer" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--表格-->
      <el-row style="margin-top: 10px;">
        <el-table v-loading="loading" :data="customerList" style="width: 100%" stripe border>
          <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
          <el-table-column prop="customerName" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="customerPhone" label="手机号" width="120" align="center"></el-table-column>
          <el-table-column prop="customerSex" label="性别" width="90" align="center"></el-table-column>
          <el-table-column prop="customerCarnum" label="车牌号" width="150" align="center"></el-table-column>
          <el-table-column prop="customerCartype" label="车类型" width="120" align="center"></el-table-column>
          <el-table-column prop="customerShencedate" label="上次审车时间" align="center" width="130">
            <template slot-scope="scope">
              {{scope.row.customerShencedate | dateFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="customerRemark" label="备注"></el-table-column>
          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
              <el-button style="margin-left: 10px;" type="primary" plain size="mini" @click="toRecord(scope.row)">记录</el-button>
              <el-button style="margin-left: 10px;" type="success" plain size="mini" @click="editCustom(scope.row)">编辑</el-button>
              <el-button style="margin-left: 10px;" type="danger" plain size="mini" @click="deleteCustom(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!--新增用户对话框 Start-->
      <el-dialog title="新增客户" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="customer">
          <el-form-item label="姓名" label-width="140px">
            <el-input v-model="customer.customerName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="140px">
            <el-input v-model="customer.customerPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="140px">
            <el-radio-group v-model="customer.customerSex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="车牌号" label-width="140px">
            <el-input v-model="customer.customerCarnum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车类型" label-width="140px">
            <el-select v-model="customer.customerCartype" placeholder="请选择活动区域">
              <el-option label="大众" value="大众"></el-option>
              <el-option label="起亚" value="起亚"></el-option>
              <el-option label="丰田" value="丰田"></el-option>
              <el-option label="奥迪" value="奥迪"></el-option>
              <el-option label="宝马" value="宝马"></el-option>
              <el-option label="本田" value="本田"></el-option>
              <el-option label="福特" value="福特"></el-option>
              <el-option label="现代" value="现代"></el-option>
              <el-option label="别克" value="别克"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上次审车日期 " label-width="140px">
            <el-date-picker v-model="customer.customerShencedate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注 " label-width="140px">
            <el-input type="textarea" v-model="customer.customerRemark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddCustomer">确 定</el-button>
          <el-button v-if="isEdit" type="primary" @click="enUpdateCustomer">修 改</el-button>
        </div>
      </el-dialog>
      <!--新增用户对话框 End-->

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
    </div>
</template>

<script>
import { add, getPage, deleteById, update, search } from '../../api/customer'
export default {
  name: 'CustomerIndex',
  data() {
    return {
      loading: false,
      isEdit: false,
      matchStr: '',
      pageNum: 1,
      pageSize: 15,
      totalNum: 0,
      dialogFormVisible: false,
      customerList: [],
      customer: {
        customerName: '',
        customerPhone: '',
        customerSex: '',
        customerCarnum: '',
        customerCartype: '',
        customerRemark: '',
        customerShencedate: ''
      }
    }
  },
  filters: {
    dateFilter(value) {
      if (!value) {
        return '未知'
      }
      var date = new Date(value)
      return (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
    }
  },
  mounted() {
    this.getAllCustomer()
  },
  methods: {
    toRecord(row) {
      this.$router.push({ path: '/record/index', query: { customer_id: row.id }})
    },
    searchCustomer() {
      this.loading = true
      if (this.matchStr === '') {
        this.getAllCustomer()
        return
      } else {
        search(this.matchStr, this.pageNum, this.pageSize).then(res => {
          this.totalNum = res.data.total
          this.customerList = res.data.records
          this.loading = false
        })
      }
    },
    closeDialog() {
      for (var key in this.customer) {
        delete this.customer[key]
      }
    },
    enUpdateCustomer() {
      if (this.customer.customerName === '' || this.customer.customerPhone === '' ||
        this.customer.customerSex === '' || this.customer.customerCarnum === '' ||
        this.customer.customerCartype === '') {
        this.$message.info('请完善信息')
        return
      }
      if (this.customer.customerPhone.length === 11) {
        update(this.customer).then(res => {
          this.$message.success('修改成功！')
          this.getAllCustomer()
          this.isEdit = false
          this.dialogFormVisible = false
          this.closeDialog()
        })
      } else {
        this.$message.info('电话号应该为11位~')
        return
      }
    },
    editCustom(row) {
      this.isEdit = true
      this.dialogFormVisible = true
      this.customer = JSON.parse(JSON.stringify(row))
    },
    deleteCustom(row) {
      this.$confirm('此操作将删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllCustomer()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addCustomer() {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    enshureAddCustomer() {
      if (this.customer.customerName === '' || this.customer.customerPhone === '' ||
        this.customer.customerSex === '' || this.customer.customerCarnum === '' ||
        this.customer.customerCartype === '') {
        this.$message.info('请完善信息')
        return
      }
      if (this.customer.customerPhone.length === 11) {
        add(this.customer).then(res => {
          this.$message.success('添加成功！')
          this.getAllCustomer()
          this.dialogFormVisible = false
          this.closeDialog()
        })
      } else {
        this.$message.info('电话号应该为11位~')
        return
      }
    },
    getAllCustomer() {
      this.loading = true
      getPage(this.pageNum, this.pageSize).then(res => {
        this.totalNum = res.data.total
        this.customerList = res.data.records
        this.loading = false
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAllCustomer()
    }
  }
}
</script>

<style scoped>

</style>
