<template>
<div style="width: 97%;padding: 15px;margin: 0 auto">
  <div>
    <el-divider content-position="left"><i class="el-icon-user"></i> &nbsp;&nbsp;
      <span style="font-weight: 600;font-size: 18px">
      {{customerInfo.customerName}}
      </span>
    </el-divider>
    <div style="line-height: 2;font-size: 14px">
      <span>电话：{{customerInfo.customerPhone}}</span><br>
      <span>车牌：{{customerInfo.customerCarnum}}</span><br>
      <span>车类型：{{customerInfo.customerCartype}}</span><br>
      <span>备注：{{customerInfo.customerRemark}}</span><br>
<!--      <span>创建时间：{{customerInfo.createDate}}</span>-->
    </div>
  </div>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :span="16">
        <repair-record v-bind:customer_id="customer_id"></repair-record>
      </el-col>
<!--      <el-col :span="8" style="padding-left: 2px">-->
<!--        <shenche-record></shenche-record>-->
<!--      </el-col>-->
      <el-col :span="8" style="padding-left: 3px">
        <chejian-record v-bind:customer_id="customer_id"></chejian-record>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { getById } from '../../api/customer'
import RepairRecord from './RepairRecord'
// import ShencheRecord from './ShencheRecord'
import ChejianRecord from './BaoxianRecord'

export default {
  name: 'RecordIndex',
  components: { RepairRecord, ChejianRecord },
  data() {
    return {
      customer_id: '',
      record_type: '',
      customerInfo: {}
    }
  },
  mounted() {
    this.customer_id = this.$route.query.customer_id
    this.getCustomInfo()
  },
  methods: {
    getCustomInfo() {
      getById(this.customer_id).then(res => {
        this.customerInfo = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
