<template>
    <el-row class="tac" id="Settle-nav">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#ffffff"
            text-color="#000000"
            active-text-color="#ffd04b">

                <el-menu-item index="1" @click="switchTab('userList')">
                    <i class="el-icon-menu"></i>
                    用户列表
                </el-menu-item>

                <el-menu-item index="2" @click="switchTab('roleConfig')">
                    <i class="el-icon-menu"></i>
                    角色配置
                </el-menu-item>

                <el-menu-item index="3" @click="switchTab('menuConfig')">
                    <i class="el-icon-menu"></i>
                    菜单配置
                </el-menu-item>

                <el-menu-item index="4" @click="switchTab('techMethod')">
                    <i class="el-icon-menu"></i>
                    技师手法设置
                </el-menu-item>

                <el-menu-item index="5" @click="switchTab('agentLevel')">
                    <i class="el-icon-menu"></i>
                    代理商分级
                </el-menu-item>

                <el-menu-item index="6" @click="switchTab('timeManage')">
                    <i class="el-icon-menu"></i>
                    时间管理
                </el-menu-item>

                <el-menu-item index="7" @click="switchTab('announcement')">
                    <i class="el-icon-menu"></i>
                    公告发布
                </el-menu-item>

                <el-menu-item index="8" @click="switchTab('withdrawalTime')">
                    <i class="el-icon-menu"></i>
                    提现时间
                </el-menu-item>

                <el-menu-item index="9" @click="switchTab('advertisePush')">
                    <i class="el-icon-menu"></i>
                    广告推送
                </el-menu-item>

                <el-menu-item index="10" @click="switchTab('enterpriseManage')">
                    <i class="el-icon-menu"></i>
                    企业账号管理
                </el-menu-item>

            </el-menu>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'Settle-nav',
    data() {
        return {

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        switchTab(tab) {
            this.$router.push({
                name: 'setting',
                params: {
                    tab: tab,
                }
            });
        }
    }
}
</script>


<style scoped>
</style>
