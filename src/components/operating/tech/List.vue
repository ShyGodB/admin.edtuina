<template>
    <div id="Tech" class="bg-white">
        <div class="order-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师姓名" prop="realName">
                            <el-input v-model="ruleForm.realName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师手机" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="接单状态" prop="acceptState">
                            <el-checkbox-group @change="acceptChange" v-model="ruleForm.acceptState" size="medium">
                                <el-checkbox-button v-for="(state, index) in acceptState" :label="index"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商" prop="proxyCodes">
                            <el-cascader v-model="ruleForm.proxyCodes" :options="agentOptions" size="medium"
                                :props="{ expandTrigger: 'hover', size: 'medium' }" @change="agentChange"></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师状态" prop="state">
                            <el-checkbox-group @change="techChange" v-model="ruleForm.state" size="medium">
                                <el-checkbox-button v-for="(state, index) in state" :label="(index + 1)"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="avatar">头像审核</el-button>
                    <el-button type="warning" @click="growth">成长记录</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="tech-table">
            <el-table :data="techs" style="width: 100%">
                <el-table-column prop="techId" label="技师编号" width="120"></el-table-column>

                <el-table-column prop="realName" label="姓名" width="120"></el-table-column>

                <el-table-column prop="gender" label="性别" width="80"></el-table-column>

                <el-table-column prop="phone" label="手机" width="120"></el-table-column>

                <el-table-column prop="orders" label="订单量" width="160"></el-table-column>

                <el-table-column prop="clicks" label="点击量" width="120" height="180"></el-table-column>

                <el-table-column prop="star" label="星级" width="100"></el-table-column>

                <el-table-column prop="group" label="分组" width="100"></el-table-column>

                <el-table-column prop="state" label="状态" width="100"></el-table-column>

                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button>
                        <el-button size="mini" type="primary" @click="openEditDialog(scope.row, scope.$index)" round>编辑
                        </el-button>
                        <el-button size="mini" type="success" @click="openProjectEditDialog(scope.row, scope.$index)"
                            round>项目管理
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>

            <el-dialog title="编辑" :visible.sync="editDialog">
                <el-form :model="editForm" ref="editForm" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户姓名" prop="realName">
                                <el-input v-model="editForm.realName"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="用户手机" prop="phone">
                                <el-input v-model="editForm.phone"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender">
                                <el-select v-model="editForm.gender" placeholder="请选择性别">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="星级" prop="star">
                                <el-select v-model="editForm.star" placeholder="请选择星级">
                                    <el-option label="4星" value="4"></el-option>
                                    <el-option label="5星" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="分组" prop="group">
                                <el-select v-model="editForm.group" placeholder="请选择分组">
                                    <el-option label="软件" value="软件"></el-option>
                                    <el-option label="服务" value="服务"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="手法" prop="labels">
                                <el-checkbox-group @change="labelsChange" v-model="editForm.labels" size="medium">
                                    <el-checkbox-button v-for="(state, index) in labels" :label="state"
                                        :key="(index + 1)" :index="(index + 1).toString()">{{state}}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="个人简介" prop="orderId">
                        <el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="editForm.introduction">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialog = false">取 消</el-button>
                    <el-button type="primary" @click="edit">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="项目设置" :visible.sync="projectDialog">
                <el-form :model="projectForm" ref="projectForm" label-width="100px">

                    <el-form-item label="正常" prop="normalProjects">
                        <el-checkbox-group @change="normalChange" v-model="projectForm.normalProjects" size="medium">
                            <el-checkbox-button v-for="item in normalProjects" :label="item.projectId"
                                :key="item.projectId" :index="item.projectId">{{ item.name }}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="加钟" prop="clockProjects">
                        <el-checkbox-group @change="clockChange" v-model="projectForm.clockProjects" size="medium">
                            <el-checkbox-button v-for="item in clockProjects" :label="item.projectId"
                                :key="item.projectId" :index="item.projectId">{{ item.name }}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="projectDialog = false">取 消</el-button>
                    <el-button type="primary" @click="editProject">确 定</el-button>
                </div>
            </el-dialog>
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
        labelsChange (value) {
            console.log(value);
        },
        normalChange (value) { },
        clockChange (value) { },
        avatar () {
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/tech/avatar");
            window.open(href, "_blank");
        },
        growth () {
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/tech/growth");
            window.open(href, "_blank");
        },
        info (row, index) {
            this.$store.state.techId = row.techId;
            this.$router.push("/operating/tech/detail");
        },
        async edit () {
            const res = await this.$api.post('/tech/update', this.editForm)
            if (res.data.success) this.$message.success('修改成功！')
            this.reload()
        },
        async editProject () {
            const res = await this.$api.post('/tech/updateProject', this.projectForm)
            if (res.data.success) this.$message.success('修改成功！')
            this.reload()
        },
        openEditDialog (row, index) {
            this.listLabelName()
            this.editDialog = true
            this.editForm.techId = row.techId
            this.editForm.realName = row.realName
            this.editForm.phone = row.phone
            this.editForm.gender = row.gender
            this.editForm.star = row.star
            this.editForm.group = row.group || ''
            this.editForm.labels = row.labels || []
            this.editForm.introduction = row.introduction || ''
        },
        openProjectEditDialog (row, index) {
            this.listProjects(row.projectIds)
            this.projectDialog = true
            this.projectForm.techId = row.techId
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listTech();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listTech();
        },
        acceptChange (value) { },
        agentChange (proxyCodes) {
            this.$store.state.proxyCodes = proxyCodes;
        },
        change (num) {
            this.pageIndex = num;
            this.listTech();
        },
        sizeChange (num) {
            // this.listTech(this.ruleForm);
        },
        techChange (state) {
            console.log(state);
        },
        async listTech () {
            const res = await this.$api.post(
                "/tech/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
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
        async listLabelName () {
            const res = await this.$api.get('/tech/listLabelName', Object.assign({}, this.ruleForm, { pageIndex: this.pageIndex }, { pageSize: this.pageSize }))
            this.labels = res.data.data.list || []
        },
        async listAgent () {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        },
        async listProjects (projectIds) {
            const res = await this.$api.get("/project/listProject", {});
            this.normalProjects = res.data.data.normalProjects;
            this.clockProjects = res.data.data.clockProjects;
            const { resultNormal, resultClock } = util.tool.checkProjectIds(this.normalProjects, this.clockProjects, projectIds)
            this.projectForm.normalProjects = resultNormal
            this.projectForm.clockProjects = resultClock
        }
    },
    created () {
        this.listTech();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
