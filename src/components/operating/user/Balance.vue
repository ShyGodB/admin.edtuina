<template>
    <div id="UserBalance">
        <div class="usercomment-table">
            <el-table :data="techComments" style="width: 100%">
                <el-table-column prop="userName" label="用户姓名" width="120" ></el-table-column>

                <el-table-column prop="amount" label="金额" width="120" ></el-table-column>

                <el-table-column prop="balance" label="余额" width="160" ></el-table-column>

                <el-table-column prop="des" label="类型" width="120" ></el-table-column>

                <el-table-column prop="remark" label="备注" width="200" ></el-table-column>

                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.relateId" size="mini" type="info"
                            @click="info(scope.row, scope.$index)" round>详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../../../util";

export default {
    name: "UserComment",
    data () {
        return {
            agentOptions: [],
            techComments: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                techName: "",
                techPhone: "",
                userName: "",
                userPhone: "",
                proxyCodes: []
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
            loading: true
        };
    },
    methods: {
        info (row, index) {
            this.$store.state.orderId = row.relateId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/order/detail");
            window.open(href, "_blank");
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listUserComment();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listUserComment();
        },
        change (num) {
            this.pageIndex = num;
            this.listUserComment();
        },
        sizeChange (num) { },
        async listUserComment (data) {
            const res = await this.$api.post(
                "/user/listComment",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { userId: this.$store.state.userId }
                )
            );
            this.techComments = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        agentChange (proxyCodes) {
            console.log(proxyCodes);
            this.$store.state.proxyCodes = proxyCodes;
        },
        async listAgent () {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        }
    },
    created () {
        this.listUserComment();
        this.listAgent();
    }
};
</script>

<style scoped>
</style>
