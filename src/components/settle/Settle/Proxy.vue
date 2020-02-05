<template>
    <div id="Settle-TechIncome">
        <div class="techIncome-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="时间区间" prop="times">
                    <el-date-picker v-model="ruleForm.times" type="datetimerange" :picker-options="timeDouble"
                        @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="agentName" label="名称" width="130"></el-table-column>

                <el-table-column prop="realName" label="所有人" width="100"></el-table-column>

                <el-table-column prop="amount" label="所有人应得" width="100"></el-table-column>

                <el-table-column prop="totalServiceFee" label="服务费"></el-table-column>

                <el-table-column prop="totalTransFee" label="交通费"></el-table-column>

                <el-table-column prop="totalCouponFee" label="优惠卷"></el-table-column>

                <el-table-column prop="totalRewardFee" label="打赏"></el-table-column>

                <el-table-column prop="outSourceFee" label="来源分成支出"></el-table-column>

                <el-table-column prop="getSourceFee" label="来源分成获得"></el-table-column>

                <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>

                <el-table-column prop="endTime" label="结束时间" width="180"></el-table-column>

                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="lookOrders(scope.row, scope.$index)" round>查看订单
                        </el-button>
                        <el-button type="primary" size="mini" @click="techSettle(scope.row, scope.$index)" round>技师结算
                        </el-button>
                        <el-button type="warning" size="mini" @click="sendPayrolls(scope.row, scope.$index)" round>发送工资单
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    name: 'Settle-TechIncome',
    data () {
        return {
            tableData: [],
            timeDouble: util.config.timeDouble,
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            ruleForm: {
                times: []
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listSettle()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listSettle()
        },
        pageChange (pageNum) {
            this.pageIndex = pageNum
            this.listSettle();
        },
        sizeChange (num) { },
        timeChange () { },
        lookOrders (row, index) {
            this.$store.state.startTime = row.startTime
            this.$store.state.endTime = row.endTime
            this.$store.state.proxyCode = row.proxyCode
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/settle/settlement/proxyOrder");
            window.open(href, "_blank");
        },
        techSettle (row, index) {
            this.$store.state.startTime = row.startTime
            this.$store.state.endTime = row.endTime
            this.$store.state.proxyCode = row.proxyCode
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/settle/settlement/tech");
            window.open(href, "_blank");
        },
        async sendPayrolls (row, index) {
            const res = await this.$api.post('/settle/sendPayrolls', { _id: row._id })
            this.$message.success('发送成功！')
            this.reload()
        },
        async listSettle () {
            const res = await this.$api.post(
                "/settle/listProxy",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { startTime: this.$store.state.startTime },
                    { endTime: this.$store.state.endTime },
                    { parentId: this.$store.state.parentId },
                )
            );
            this.tableData = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created () {
        this.listSettle()
    }
}
</script>


<style scoped>
</style>
