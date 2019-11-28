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
                <el-table-column prop="orderNo" label="订单号" width="200"></el-table-column>

                <el-table-column prop="techId" label="技师编号" width="100"></el-table-column>

                <el-table-column prop="projectName" label="项目名称" width="150"></el-table-column>

                <el-table-column prop="serviceFee" label="服务费" width="100"></el-table-column>

                <el-table-column prop="transFee" label="交通费" width="100"></el-table-column>

                <el-table-column prop="couponFee" label="优惠卷" width="100"></el-table-column>

                <el-table-column prop="realFee" label="实际支付" width="100"></el-table-column>

                <el-table-column prop="addTime" label="下单时间"></el-table-column>

                <el-table-column prop="optState" label="状态" width="50"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button size="mini" type="info" @click="info(scope.$index, scope.row)" round>详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change" layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
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
                pageNum: 1
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        info(index, row) {
            console.log(index, row);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        change(value) {
            console.log(value)
            this.orders = this.allOrder.slice(10 * (value - 1), 10 * value);
        },
        sizeChange(num) {
            console.log(num);
        },
    },
    created() {
        axios({
            method: 'post',
            url: '/api/api/client/order/list'
        }).then(res => {
            console.log(res);
            this.allOrder = res.data;
            this.orders = res.data.slice(0, 11);
            this.pageNum = Math.floor(res.data.length / 10);
            if (res.data.length % 10 !== 0) {
                this.pageNum += 1;
            }
        })
    }
}
</script>


<style scoped>

</style>
