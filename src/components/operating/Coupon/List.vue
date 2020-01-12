<template>
    <div id="Settle-Cash">
        <div class="techIncome-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="ruleForm.realName"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="dialogFormVisible = true">赠送</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="名称" width="200"></el-table-column>

                <el-table-column prop="type" label="类型"></el-table-column>

                <el-table-column prop="discount" label="折扣"></el-table-column>

                <el-table-column prop="amount" label="优惠金额"></el-table-column>

                <el-table-column prop="minPrice" label="使用门槛"></el-table-column>

                <el-table-column prop="state" label="状态"></el-table-column>

                <el-table-column prop="userName" label="姓名" width="120"></el-table-column>

                <el-table-column prop="userPhone" label="手机" width="120"></el-table-column>

                <el-table-column prop="startTime" label="生效时间" width="200"></el-table-column>

                <el-table-column prop="endTime" label="失效时间" width="200"></el-table-column>

                <el-table-column prop="addTime" label="领取时间" width="200"></el-table-column>

                <el-table-column prop="source" label="获取方式"></el-table-column>

                <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>

            <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="give">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Settle-Cash',
    data () {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            ruleForm: {
                realName: '',
                phone: '',
                times: []
            },
            form: {
                phone: ''
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listCoupon()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listCoupon()
        },
        pageChange (pageNum) {
            this.pageIndex = pageNum
            this.listCoupon();
        },
        sizeChange (num) { },
        async listCoupon () {
            const res = await this.$api.post(
                "/coupon/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.tableData = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async give () {

        }
    },
    created () {
        this.listCoupon()
    }
}
</script>


<style scoped>
</style>
