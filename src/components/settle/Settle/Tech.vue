<template>
    <div id="SettleTech" class="bg-white">
        <el-table :data="techs" style="width: 100%">
            <el-table-column prop="techId" label="技师编号" width="80" fixed></el-table-column>

            <el-table-column prop="techName" label="技师姓名" width="80" fixed></el-table-column>

            <el-table-column prop="state" label="状态" width="80"></el-table-column>

            <el-table-column prop="ratio" label="分成比例" width="120"></el-table-column>

            <el-table-column prop="totalServiceFee" label="服务费(订单)" width="160"></el-table-column>

            <el-table-column prop="totalTransFee" label="交通费(订单)" width="120" height="180"></el-table-column>

            <el-table-column prop="totalCouponFee" label="优惠卷(订单)" width="100"></el-table-column>

            <el-table-column prop="totalRewardFee" label="打赏(订单)" width="100"></el-table-column>

            <el-table-column prop="serviceFeeCash" label="服务费(现金)" width="160"></el-table-column>

            <el-table-column prop="transFeeCash" label="交通费(现金)" width="120" height="180"></el-table-column>

            <el-table-column prop="rewardFeeCash" label="打赏(现金)" width="100"></el-table-column>

            <el-table-column prop="serviceFee" label="服务费(余额)" width="160"></el-table-column>

            <el-table-column prop="transFee" label="交通费(余额)" width="120" height="180"></el-table-column>

            <el-table-column prop="rewardFee" label="打赏(余额)" width="100"></el-table-column>

            <el-table-column prop="totalOrderNumber" label="总单量" width="160"></el-table-column>

            <el-table-column prop="orderQuantity" label="接单量" width="120" height="180"></el-table-column>

            <el-table-column prop="addOrderNumber" label="加单量" width="100"></el-table-column>

            <el-table-column prop="addOrderRate" label="加单率" width="100"></el-table-column>

            <el-table-column prop="enterpriseNumber" label="企业单金额" width="160"></el-table-column>

            <el-table-column prop="enterpriseAmount" label="企业单量" width="120" height="180"></el-table-column>

            <el-table-column prop="outSourceAmount" label="来源分成支出" width="100"></el-table-column>

            <el-table-column prop="getSourceAmount" label="来源分成获得" width="100"></el-table-column>

            <el-table-column prop="rate" label="费率" width="160"></el-table-column>

            <el-table-column prop="VAT" label="增值税" width="120" height="180"></el-table-column>

            <el-table-column prop="serviceFeeCommission" label="服务费提成" width="100"></el-table-column>

            <el-table-column prop="totalAmount" label="总计金额" width="100"></el-table-column>

            <el-table-column prop="amount" label="实发" width="160"></el-table-column>

            <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="lookOrders(scope.row, scope.$index)" round>查看订单
                    </el-button>
                    <el-button size="mini" v-if="scope.row.state==='审核中'" type="primary"
                        @click="auditDone(scope.row, scope.$index)" round>审核完成
                    </el-button>
                    <el-button size="mini" v-if="scope.row.state==='审核完成'" type="primary"
                        @click="sendPayroll(scope.row, scope.$index)" round>发送工资单
                    </el-button>
                    <el-button size="mini" v-if="scope.row.state==='已发送工资单'" type="primary"
                        @click="check(scope.row, scope.$index)" round>核对
                    </el-button>
                    <el-button size="mini" v-if="scope.row.state==='已核对'" type="primary"
                        @click="openCash(scope.row, scope.$index)" round>打开提现
                    </el-button>
                    <el-button size="mini" v-if="scope.row.state==='可提现'" type="primary"
                        @click="closeCash(scope.row, scope.$index)" round>关闭提现
                    </el-button>
                    <el-button size="mini" type="danger" @click="reset(scope.row, scope.$index)" round>重置
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change"
                layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
        </div>
    </div>
</template>


<script>
import util from '../../../../util'

export default {
    inject: ['reload'],
    name: "Tech",
    data () {
        return {
            acceptState: ["可接单", "进行中", "不可接单"],
            agentOptions: [],
            state: ["正常", "禁用"],
            techs: [],
            allUser: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            editDialog: false,
            projectDialog: false,
            formLabelWidth: '80px',
            labels: [],
            ruleForm: {
                realName: "",
                phone: "",
                acceptState: [],
                proxyCodes: [],
                state: []
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ]
            },
            loading: true,
            editForm: {
                techId: '',
                realName: '',
                phone: '',
                gender: '',
                star: '',
                group: '',
                labels: [],
                introduction: '',
            },
            normalProjects: [],
            clockProjects: [],
            projectForm: {
                techId: '',
                normalProjects: [],
                clockProjects: []
            }
        };
    },
    methods: {
        change (num) {
            this.pageIndex = num;
            this.listTech();
        },
        sizeChange (num) {
            // this.listTech(this.ruleForm);
        },
        lookOrders (row, index) {
            this.$store.state.startTime = row.startTime
            this.$store.state.endTime = row.endTime
            this.$store.state.techId = row.techId
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/settle/settlement/techOrder");
            window.open(href, "_blank");
        },
        async closeCash (row, index) {
            const res = await this.$api.post('/settle/closeCash', { _id: row._id })
            this.$message.success('关闭提现成功！')
            this.reload()
        },
        async auditDone (row, index) {
            const res = await this.$api.post('/settle/auditDone', { _id: row._id })
            this.$message.success('审核完成！')
            this.reload()
        },
        async reset (row, index) {
            const res = await this.$api.post('/settle/reset', { _id: row._id })
            this.$message.success('重置成功！')
            this.reload()
        },
        async check (row, index) {
            const res = await this.$api.post('/settle/check', { _id: row._id })
            this.$message.success('替技师核对账单成功！')
            this.reload()
        },
        async openCash (row, index) {
            const res = await this.$api.post('/settle/openCash', { _id: row._id })
            this.$message.success('打开提现成功！')
            this.reload()
        },
        async sendPayroll (row, index) {
            const res = await this.$api.post('/settle/sendPayroll', { _id: row._id })
            this.$message.success('发送成功！')
            this.reload()
        },
        async listTech () {
            const res = await this.$api.post(
                "/settle/listTech",
                Object.assign(
                    {},
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { startTime: this.$store.state.startTime },
                    { endTime: this.$store.state.endTime },
                    { proxyCode: this.$store.state.proxyCode },
                )
            );
            this.techs = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
    },
    created () {
        this.listTech();
    }
};
</script>


<style scoped>
</style>
