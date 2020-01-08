<template>
    <div id="Project">
        <div class="order-search">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="状态" prop="state">
                            <el-checkbox-group
                                @change="techChange"
                                v-model="ruleForm.state"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(state, index) in state"
                                    :label="state"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="类别" prop="category">
                            <el-checkbox-group
                                @change="techChange"
                                v-model="ruleForm.category"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(category, index) in category"
                                    :label="category"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{category}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="技师状态" prop="view">
                            <el-checkbox-group
                                @change="techChange"
                                v-model="ruleForm.view"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(view, index) in view"
                                    :label="view"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{view}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="project-table">
            <el-table :data="projects" style="width: 100%">
                <el-table-column prop="projectId" label="技师姓名" width="120" height="120"></el-table-column>

                <el-table-column prop="name" label="名字" width="200" height="120"></el-table-column>

                <el-table-column prop="originalPrice" label="原价" width="120" height="120"></el-table-column>

                <el-table-column prop="price" label="默认价格" width="160" height="120"></el-table-column>

                <el-table-column prop="isFirst" label="是否首单" width="120" height="120"></el-table-column>

                <el-table-column prop="time" label="时长" width="100" height="120"></el-table-column>

                <el-table-column prop="category" label="项目类别" width="100" height="120"></el-table-column>

                <el-table-column prop="view" label="展示属性" width="100" height="120"></el-table-column>

                <el-table-column prop="saleCount" label="销售量" width="100" height="120"></el-table-column>

                <el-table-column prop="sort" label="排序" width="180" height="120"></el-table-column>

                <el-table-column prop="state" label="状态" width="80" height="120"></el-table-column>

                <el-table-column label="操作" height="120">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="info"
                            @click="info(scope.$index, scope.row)"
                            round
                        >详情</el-button>
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
import axios from "axios";

export default {
    name: "Project",
    data() {
        return {
            state: ["正常", "禁用"],
            category: ["正常", "加钟"],
            view: ["全部展示", "服务列表", "技师列表", "都不显示"],
            projects: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                state: [],
                category: [],
                view: []
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
        info(index, row) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listProject();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listProject();
        },
        change(num) {
            this.pageIndex = num;
            this.listProject();
        },
        sizeChange(num) {
            // this.listProject(this.ruleForm);
        },
        async listProject() {
            const res = await this.$api.post(
                "/project/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.projects = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created() {
        this.listProject();
    }
};
</script>

<style scoped>
</style>
