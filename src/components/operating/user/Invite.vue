<template>
    <div id="UserComment">
        <div class="usercomment-table">
            <el-table :data="techComments" style="width: 100%">
                <el-table-column prop="techName" label="技师姓名" width="120" ></el-table-column>

                <el-table-column prop="userName" label="用户姓名" width="120" ></el-table-column>

                <el-table-column prop="behavior" label="用户行为" width="160" ></el-table-column>

                <el-table-column prop="remark" label="技师备注" width="120" ></el-table-column>

                <el-table-column prop="addTime" label="评论时间" width="200" ></el-table-column>

                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button>
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
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listInvite();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listInvite();
        },
        change (num) {
            this.pageIndex = num;
            this.listInvite();
        },
        sizeChange (num) { },
        async listInvite (data) {
            const res = await this.$api.post(
                "/user/listInvite",
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
    },
    created () {
        this.listInvite();
    }
};
</script>

<style scoped>
</style>
