<template>
    <div id="techLocation">
        <div class="techLocation-table">
            <el-table :data="techComments" style="width: 100%">
                <el-table-column prop="cityId" label="城市编号" width="120"></el-table-column>

                <el-table-column prop="time" label="时间" width="120"></el-table-column>

                <el-table-column prop="province" label="省" width="160"></el-table-column>

                <el-table-column prop="city" label="市" width="120"></el-table-column>

                <el-table-column prop="district" label="区/县" width="200"></el-table-column>

                <el-table-column prop="address" label="地址" width="200"></el-table-column>

                <el-table-column prop="lng" label="经度" width="200"></el-table-column>

                <el-table-column prop="lat" label="纬度" width="200"></el-table-column>
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
                    this.listUserLocation();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listUserLocation();
        },
        change (num) {
            this.pageIndex = num;
            this.listUserLocation();
        },
        sizeChange (num) { },
        async listUserLocation (data) {
            const res = await this.$api.post(
                "/user/listLocation",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { userId: this.$store.state.techId }
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
        this.listUserLocation();
    }
};
</script>

<style scoped>
</style>
