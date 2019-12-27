<template>
    <div id="Order">
        <div class="order-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="order-table">
            <el-table :data="orders" style="width: 100%">
                <el-table-column prop="techName" label="技师姓名" width="120" height="120"></el-table-column>

                <el-table-column prop="userName" class="table-userName" label="用户姓名" width="120" height="120"></el-table-column>

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
                    :page-count="ruleForm.pageIndex">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'Order',
    data() {
        return {
            orders: [],
            allOrder: [],
            pageNum: 1,
            ruleForm: {
                techName: '',
                techPhone: '',
                userName: '',
                userPhone: '',
                pageIndex: 1,
                pageSize: 10
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            loading: true
        };
    },
    methods: {
        info(index, row) {
            this.$message({
                message: '暂未完成',
                type: 'success'
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listOrder(this.ruleForm)
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        change(num) {
            console.log('------pageIndex', num)
            this.ruleForm.pageIndex = num;
            this.listOrder(this.ruleForm)
        },
        sizeChange(num) {
            // console.log(this.ruleForm);
            // this.ruleForm.pageIndex = num;
            // this.listOrder(this.ruleForm);
        },
        listOrder(data) {
            axios({
                method: 'post',
                url: '/api/admin/order/list',
                responseType: 'json',
                data: data
            }).then(res => {
                this.orders = res.data.data.list || [];
                this.ruleForm.pageIndex = Math.floor((res.data.data.count || 0) / this.ruleForm.pageSize);
                if (res.data.data.count % this.ruleForm.pageSize !== 0) {
                    this.ruleForm.pageIndex += 1;
                }
            })
        }
    },
    created() {
        this.listOrder(this.ruleForm);
    }
}
</script>


<style scoped>
</style>
