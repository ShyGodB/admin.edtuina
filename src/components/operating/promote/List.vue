<template>
    <div id="Promote">
        <div class="promote-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师姓名" prop="techName">
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

        <div class="promote-table">
            <el-table :data="promotes" style="width: 100%">
                <el-table-column prop="img" label="二维码" width="200">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 80px; height: 80px"
                            :src="scope.row.img"
                            :fit="fit">
                        </el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="promoteType" label="类型"></el-table-column>

                <el-table-column prop="purpose" label="用途"></el-table-column>

                <el-table-column prop="userCount" label="用户量"></el-table-column>

                <el-table-column prop="applyTime" label="申请时间"></el-table-column>

                <el-table-column prop="authName" label="审核人"></el-table-column>

                <el-table-column prop="authTime" label="审核时间"></el-table-column>

                <el-table-column prop="state" label="状态"></el-table-column>

                <el-table-column prop="reason" label="审核意见"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="agree(scope.$index, scope.row)" round>同意</el-button>
                    <el-button size="mini" type="primary" @click="refuse(scope.$index, scope.row)" round>拒绝</el-button>
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
    name: 'Promote',
    data() {
        return {
            promotes: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            fits: 'fill',
            ruleForm: {
                techName: '',
                techPhone: '',
                userName: '',
                userPhone: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            value: [],
            loading: true,
            
        };
    },
    methods: {
        agree(index, row) {
            this.$message({
                message: '暂未完成',
                type: 'success'
            });
        },
        refuse(index, row) {
            this.$message({
                message: '暂未完成',
                type: 'success'
            });
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
        change(pageNum) {
            this.listOrder(pageNum)
        },
        sizeChange(num) {
            console.log('funtion: sizeChange', num);
        },
        listPromote(data) {
            axios({
                method: "post",
                url: "/api/admin/promote/list",
                responseType: "json",
                data: data
            }).then(res => {
                this.promotes = res.data.data.list || [];
                this.pageNum = Math.floor((res.data.data.count || 0) / this.pageSize);
                if (res.data.data.count % this.pageSize !== 0) {
                    this.pageNum += 1;
                }
            });
        }
    },
    created() {
        this.listPromote(Object.assign(
            {}, 
            this.ruleForm,
            { pageIndex: this.pageIndex },
            { pageSize: this.pageSize }
        ));
    }
}
</script>


<style scoped>
</style>
