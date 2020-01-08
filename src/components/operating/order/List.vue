<template>
  <div id="Order">
    <div class="order-search">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="技师i姓名" prop="techName">
              <el-input v-model="ruleForm.techName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="技师手机" prop="techPhone">
              <el-input v-model="ruleForm.techPhone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户姓名" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户手机" prop="userPhone">
              <el-input v-model="ruleForm.userPhone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="时间区间" prop="value">
              <time-double v-on:getDoubleTime="getDoubleTime"></time-double>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="代理商" prop="value">
              <agent-cascader v-on:getProxyCodes="getProxyCodes"></agent-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单编号" prop="orderId">
              <el-input v-model="ruleForm.orderId"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="订单状态" prop="orderState">
              <div>
                <el-checkbox-group @change="orderStateChange" v-model="ruleForm.orderState" size="medium">
                  <el-checkbox-button v-for="(state, index) in orderState" :label="index" :key="(index + 1)" :index="(index + 1).toString()">{{state}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="订单类型" prop="orderType">
              <div>
                <el-checkbox-group @change="orderTypeChange" v-model="ruleForm.orderType" size="medium">
                  <el-checkbox-button v-for="(type, index) in orderType" :label="type" :key="(index + 1)" :index="(index + 1).toString()">{{type}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="order-table">
      <el-table :data="orders" @row-click="rowInfo" style="width: 100%">
        <el-table-column prop="techName" label="技师姓名" width="120" height="120"></el-table-column>

        <el-table-column prop="userName" label="用户姓名" width="120" height="120"></el-table-column>

        <el-table-column prop="userDanger" label="危险" width="80" height="120"></el-table-column>

        <el-table-column prop="userPhone" label="用户手机" width="120" height="120"></el-table-column>

        <el-table-column prop="projectsName" label="项目名称" width="160" height="120"></el-table-column>

        <el-table-column prop="source" label="来源" width="120" height="120"></el-table-column>

        <el-table-column prop="payService" label="服务费" width="100" height="120"></el-table-column>

        <el-table-column prop="payTrans" label="交通费" width="100" height="120"></el-table-column>

        <el-table-column prop="payCoupon" label="优惠卷" width="100" height="120"></el-table-column>

        <el-table-column prop="payPrice" label="实际支付" width="100" height="120"></el-table-column>

        <el-table-column prop="addTime" label="下单时间" width="180" height="120"></el-table-column>

        <el-table-column prop="state" label="状态" width="80" height="120"></el-table-column>

        <el-table-column label="操作" height="120">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="info(scope.$index, scope.row)" round>详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          ref="fenye"
          background
          @size-change="sizeChange"
          @current-change="change"
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :page-count="pageNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AgentCascader from '../../tools/AgentCascader'
import TimeDouble from '../../tools/TimeDouble'

export default {
  name: "Order",
  components: {
    "agent-cascader": AgentCascader,
    "time-double": TimeDouble
  },
  data() {
    return {
      orders: [],
      pageIndex: 1,
      pageSize: 10,
      pageNum: 1,
      orderState: ['未支付', '未接单', '已接单', '已出发', '已到达', '服务中', '服务完成', '取消订单', '已入账'],
      orderType: ['普通', '加单', '补单', '超时接单', '用户取消订单', '技师拒单'],
      ruleForm: {
        techName: "",
        techPhone: "",
        userName: "",
        userPhone: "",
        times: '',
        proxyCodes: [],
        orderId: '',
        orderState: [],
        orderType: []
      }
    };
  },
  methods: {
    info(index, row) {
      this.$store.state.orderId = row.orderId;
      // this.$router.push('/operating/order/detail');
      localStorage.setItem("store", JSON.stringify(this.$store.state))
      const {href} = this.$router.resolve('/operating/order/detail')
      window.open(href, '_blank')
    },
    rowInfo(row, column, event) {
      this.$store.state.orderId = row.orderId;
      // this.$router.push('/operating/order/detail');
      localStorage.setItem("store", JSON.stringify(this.$store.state))
      const {href} = this.$router.resolve('/operating/order/detail')
      window.open(href, '_blank')
    },
    orderStateChange(value) {
      console.log(this.ruleForm)
    },
    orderTypeChange(value) {
      console.log(this.ruleForm)
    },
    getProxyCodes(proxyCodes) {
        this.ruleForm.proxyCodes = proxyCodes
        console.log(this.ruleForm)
    },
    getDoubleTime(times) {
        this.ruleForm.times = times
        console.log(this.ruleForm)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listOrder(Object.assign(
            {},
            this.ruleForm,
            { pageIndex: this.pageIndex },
            { pageSize: this.pageSize }
          ));
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change(num) {
      this.pageIndex = num;
      this.listOrder(Object.assign(
        {},
        this.ruleForm,
        { pageIndex: this.pageIndex },
        { pageSize: this.pageSize }
      ));
    },
    sizeChange(num) {
      // this.listOrder(this.ruleForm);
    },
    async listOrder(data) {
      const res = await this.$api.post("/api/admin/order/list", data);
      this.orders = res.data.data.list || [];
      this.pageNum = Math.floor((res.data.data.count || 0) / this.pageSize);
      if (res.data.data.count % this.pageSize !== 0) {
        this.pageNum += 1;
      }
    }
  },
  created() {
    this.listOrder(
      Object.assign(
        {},
        this.ruleForm,
        { pageIndex: this.pageIndex },
        { pageSize: this.pageSize }
      )
    );

  }
};
</script>

<style scoped>
</style>
