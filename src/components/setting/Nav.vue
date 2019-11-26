<template>
    <el-row class="tac" id="Settle-nav">
        <el-col :span="24">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#ffffff"
            text-color="#000000"
            :router="true"
            @select="handleSelect">

                <el-menu-item index="1" :route="routes.UserList">
                    <i class="el-icon-menu"></i>
                    用户列表
                </el-menu-item>

                <el-menu-item index="2" :route="routes.RoleConfig">
                    <i class="el-icon-menu"></i>
                    角色配置
                </el-menu-item>

                <el-menu-item index="3" :route="routes.MenuConfig">
                    <i class="el-icon-menu"></i>
                    菜单配置
                </el-menu-item>

                <el-menu-item index="4" :route="routes.TechMethod">
                    <i class="el-icon-menu"></i>
                    技师手法设置
                </el-menu-item>

                <el-menu-item index="5" :route="routes.AgentLevel">
                    <i class="el-icon-menu"></i>
                    代理商分级
                </el-menu-item>

                <el-menu-item index="6" :route="routes.TimeManage">
                    <i class="el-icon-menu"></i>
                    时间管理
                </el-menu-item>

                <el-menu-item index="7" :route="routes.Announcement">
                    <i class="el-icon-menu"></i>
                    公告发布
                </el-menu-item>

                <el-menu-item index="8" :route="routes.WithdrawalTime">
                    <i class="el-icon-menu"></i>
                    提现时间
                </el-menu-item>

                <el-menu-item index="9" :route="routes.AdvertisePush">
                    <i class="el-icon-menu"></i>
                    广告推送
                </el-menu-item>

                <el-menu-item index="10" :route="routes.EnterpriseManage">
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
            activeIndex: '1',
            routes: {
                UserList: {
                    name: 'Setting', params: { tab: 'userList' }
                },
                RoleConfig: {
                    name: 'Setting', params: { tab: 'roleConfig' }
                },
                MenuConfig: {
                    name: 'Setting', params: { tab: 'menuConfig' }
                },
                TechMethod: {
                    name: 'Setting', params: { tab: 'techMethod' }
                },
                AgentLevel: {
                    name: 'Setting', params: { tab: 'agentLevel' }
                },
                TimeManage: {
                    name: 'Setting', params: { tab: 'timeManage' }
                },
                Announcement: {
                    name: 'Setting', params: { tab: 'announcement' }
                },
                WithdrawalTime: {
                    name: 'Setting', params: { tab: 'withdrawalTime' }
                },
                AdvertisePush: {
                    name: 'Setting', params: { tab: 'advertisePush' }
                },
                EnterpriseManage: {
                    name: 'Setting', params: { tab: 'enterpriseManage' }
                }
            }
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
}
</script>


<style scoped>
</style>
