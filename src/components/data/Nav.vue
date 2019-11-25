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

                <el-menu-item index="1" @click="switchTab('generalSituation')">
                    <i class="el-icon-menu"></i>
                    概况
                </el-menu-item>

                <el-menu-item index="2" @click="switchTab('performanceAnalysis')">
                    <i class="el-icon-menu"></i>
                    业绩分析
                </el-menu-item>

                <el-menu-item index="3" @click="switchTab('userAnalysis')">
                    <i class="el-icon-menu"></i>
                    客户分析
                </el-menu-item>

                <el-menu-item index="4" @click="switchTab('orderAnalysis')">
                    <i class="el-icon-menu"></i>
                    订单分析
                </el-menu-item>

                <el-menu-item index="5" @click="switchTab('techAnalysis')">
                    <i class="el-icon-menu"></i>
                    技师分析
                </el-menu-item>

                <el-menu-item index="6" @click="switchTab('pageTransform')">
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
                name: 'data',
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
