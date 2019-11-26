<template>
    <el-row class="tac" id="Settle-nav">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#ffffff"
            text-color="#000000"
            :router="true"
            active-text-color="#ffd04b">

                <el-menu-item index="1" :route="routes.GeneralSituation">
                    <i class="el-icon-menu"></i>
                    概况
                </el-menu-item>

                <el-menu-item index="2" :route="routes.PerformanceAnalysis">
                    <i class="el-icon-menu"></i>
                    业绩分析
                </el-menu-item>

                <el-menu-item index="3" :route="routes.UserAnalysis">
                    <i class="el-icon-menu"></i>
                    客户分析
                </el-menu-item>

                <el-menu-item index="4" :route="routes.OrderAnalysis">
                    <i class="el-icon-menu"></i>
                    订单分析
                </el-menu-item>

                <el-menu-item index="5" :route="routes.TechAnalysis">
                    <i class="el-icon-menu"></i>
                    技师分析
                </el-menu-item>

                <el-menu-item index="6" :route="routes.PageTransform">
                    <i class="el-icon-menu"></i>
                    页面转化
                </el-menu-item>

            </el-menu>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'Data-nav',
    data() {
        return {
            activeIndex: '1',
            routes: {
                GeneralSituation: {
                    name: 'Data', params: { tab: 'generalSituation' }
                },
                PerformanceAnalysis: {
                    name: 'Data', params: { tab: 'performanceAnalysis' }
                },
                UserAnalysis: {
                    name: 'Data', params: { tab: 'userAnalysis' }
                },
                OrderAnalysis: {
                    name: 'Data', params: { tab: 'orderAnalysis' }
                },
                TechAnalysis: {
                    name: 'Data', params: { tab: 'techAnalysis' }
                },
                PageTransform: {
                    name: 'Data', params: { tab: 'pageTransform' }
                }
            }
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    }
}
</script>


<style scoped>
</style>
