<template>
    <div id="mainnav">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <el-menu :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#ffffff"
                    text-color="#000000"
                    active-text-color="#ff0000"
                    :router="true"
                    @select="handleSelect">
                        <el-menu-item index="1" :route="routes.index" class="f-left">
                            <i class="el-icon-menu"></i>
                            主页
                        </el-menu-item>

                        <el-menu-item index="2" :route="routes.order" class="f-left">
                            <i class="el-icon-menu"></i>
                            运营管理
                        </el-menu-item>

                        <el-menu-item index="3" :route="routes.settlement" class="f-left">
                            <i class="el-icon-menu"></i>
                            结算中心
                        </el-menu-item>

                        <el-menu-item index="4" :route="routes.generalSituation" class="f-left">
                            <i class="el-icon-menu"></i>
                            数据分析
                        </el-menu-item>

                        <el-menu-item index="5" :route="routes.user" class="f-left">
                            <i class="el-icon-menu"></i>
                            系统设置
                        </el-menu-item>

                        <el-menu-item index="6" class="f-right">
                            退出
                        </el-menu-item>

                        <el-submenu index="7" class="content-top-right" style="float:right;">
                            <template slot="title">
                                <img src="../../public/img/tt.png" style="width:44px;height:44px;">
                            </template>
                            <el-menu-item index="7-1">
                                <router-link to="/dash">Home</router-link>
                            </el-menu-item>

                            <el-menu-item index="7-2" @click="goToGithub()">
                                Github
                            </el-menu-item>

                            <el-menu-item id="logout" index="7-3" @click="logout">Log Out</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="8" class="f-right">
                            管理员：测试F
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    name: 'mainnav',
    data() {
        return {
            activeIndex: '1',
            routes: {
                index: {
                    name: 'Index', path: '/'
                },
                order: {
                    name: 'Operating', params: { tab: 'order' }
                },
                settlement: {
                    name: 'Settle', params: { tab: 'settlement' }
                },
                generalSituation: {
                    name: 'Data', params: { tab: 'generalSituation' }
                },
                user: {
                    name: 'Setting', params: { tab: 'user' }
                }
            }
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        goToGithub() {
            window.open("https://github.com/ShyGodB/admin.edtuina");
        },
        logout() {
            console.log(1111);
        }
    },
    created() {

    }
}
</script>


<style scoped>

</style>
