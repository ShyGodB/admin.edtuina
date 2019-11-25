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

                <el-menu-item index="1" @click="switchTab('settlement')">
                <i class="el-icon-menu"></i>
                <router-link to="/settle/settlement">代理商结算</router-link>
                </el-menu-item>

                <el-menu-item index="2" @click="switchTab('cash')">
                <i class="el-icon-menu"></i>
                <router-link to="/settle/cash">提现管理</router-link>
                </el-menu-item>

                <el-menu-item index="3" @click="switchTab('techIncome')">
                <i class="el-icon-setting"></i>
                <router-link to="/settle/techIncome">技师流水</router-link>
                </el-menu-item>

                <el-menu-item index="4" @click="switchTab('account')">
                <i class="el-icon-setting"></i>
                <router-link to="/settle/account">账户余额</router-link>
                </el-menu-item>

                <el-menu-item index="5" @click="switchTab('refund')">
                <i class="el-icon-setting"></i>
                <router-link to="/settle/refund">退款管理</router-link>
                </el-menu-item>

                <el-menu-item index="6" @click="switchTab('recharge')">
                <i class="el-icon-menu"></i>
                <router-link to="/settle/recharge">充值管理</router-link>
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
                name: 'settle',
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
