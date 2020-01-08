<template>
    <div id="Promote">
        <div class="promote-search">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="代理商" prop="proxyCodes">
                            <el-cascader
                                v-model="ruleForm.proxyCodes"
                                :options="agentOptions"
                                size="medium"
                                :props="{ expandTrigger: 'hover', size: 'medium' }"
                                @change="agentChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="时间区间" prop="times">
                            <el-date-picker
                                v-model="ruleForm.times"
                                type="datetimerange"
                                :picker-options="timeDouble"
                                @change="timeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="申请状态" prop="state">
                            <el-checkbox-group
                                @change="stateChange"
                                v-model="ruleForm.state"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(state, index) in states"
                                    :label="state"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{state}}</el-checkbox-button>
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

        <div class="promote-table">
            <el-table :data="promotes" style="width: 100%">
                <el-table-column prop="img" label="二维码" width="200">
                    <template slot-scope="scope">
                        <el-image style="width: 80px; height: 80px" :src="scope.row.img"></el-image>
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
                        <el-button
                            v-if="scope.row.state=='待审核'"
                            size="mini"
                            type="danger"
                            @click="agree(scope.$index, scope.row)"
                            round
                        >同意</el-button>
                        <el-button
                            v-if="scope.row.state=='待审核'"
                            size="mini"
                            type="primary"
                            @click="refuse(scope.$index, scope.row)"
                            round
                        >拒绝</el-button>
                        <div v-if="scope.row.state!='待审核'">{{ scope.row.state }}</div>
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
import util from "../../../../util";

export default {
    name: "Promote",
    data() {
        return {
            agentOptions: [],
            timeDouble: util.config.timeDouble,
            states: ["待审核", "审核通过", "审核拒绝"],
            promotes: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                times: [],
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
            value: [],
            loading: true
        };
    },
    methods: {
        agree(index, row) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        refuse(index, row) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listPromote();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listPromote();
        },
        agentChange(agent) {
            console.log(this.ruleForm);
        },
        timeChange(time) {
            console.log(this.ruleForm);
        },
        stateChange(state) {
            console.log(this.ruleForm);
        },
        change(pageNum) {
            this.listPromote(pageNum);
        },
        sizeChange(num) {
            console.log("funtion: sizeChange", num);
        },
        async listPromote(data) {
            const res = await util.api.post(
                "/promote/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.promotes = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async listAgent() {
            const res = await this.$api.get("/agent/list", {});
            this.agentOptions = res.data.data;
        }
    },
    created() {
        this.listPromote();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
