<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>审车记录</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
      </div>
      <div>
        <el-timeline>
          <el-timeline-item color="#f88b0d" timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!--对话框Start-->
<!--    <div>-->
<!--      <el-dialog title="新增维修记录" :visible.sync="dialogFormVisible" @close="closeDialog">-->
<!--        <el-form :model="record">-->
<!--          <el-form-item label="维修类型" label-width="140px">-->
<!--            <el-select v-model="record.repairType" placeholder="请选择维修类型...">-->
<!--              <el-option label="发动机维修" value="发动机维修"></el-option>-->
<!--              <el-option label="车窗维修" value="车窗维修"></el-option>-->
<!--              <el-option label="离合/刹车维修" value="离合/刹车维修"></el-option>-->
<!--              <el-option label="其他" value="其他"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="维修价格" label-width="140px">-->
<!--            <el-input-number v-model="record.repairPrice" :precision="2" :step="0.1" :max="1000000"></el-input-number>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="备注 " label-width="140px">-->
<!--            <el-input placeholder="请输入备注信息..." type="textarea" v-model="record.repairRemark" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="closeDialog">取 消</el-button>-->
<!--          <el-button type="primary" @click="enshureAddRecord">确 定</el-button>-->
<!--        </div>-->
<!--      </el-dialog>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'RepairRecord',
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
