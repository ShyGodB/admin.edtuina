<template>
    <el-row class="tac" id="Settle-nav">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            :router="true"
            background-color="#ffffff"
            text-color="#000000"
            active-text-color="#ffd04b">

                <el-menu-item index="1" :route="routes.Settlement">
                    <i class="el-icon-menu"></i>
                    代理商结算
                </el-menu-item>

                <el-menu-item index="2" :route="routes.Cash">
                    <i class="el-icon-menu"></i>
                    提现管理
                </el-menu-item>

                <el-menu-item index="3" :route="routes.TechIncome">
                    <i class="el-icon-setting"></i>
                    技师流水
                </el-menu-item>

                <el-menu-item index="4" :route="routes.Account">
                    <i class="el-icon-setting"></i>
                    账户余额
                </el-menu-item>

                <el-menu-item index="5" :route="routes.Refund">
                    <i class="el-icon-setting"></i>
                    退款管理
                </el-menu-item>

                <el-menu-item index="6" :route="routes.Recharge">
                    <i class="el-icon-menu"></i>
                    充值管理
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
                Settlement: {
                    name: 'Settle', params: { tab: 'settlement' }
                },
                Cash: {
                    name: 'Settle', params: { tab: 'cash' }
                },
                TechIncome: {
                    name: 'Settle', params: { tab: 'techIncome' }
                },
                Account: {
                    name: 'Settle', params: { tab: 'account' }
                },
                Refund: {
                    name: 'Settle', params: { tab: 'refund' }
                },
                Recharge: {
                    name: 'Settle', params: { tab: 'recharge' }
                }
            }
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    created() {

    }
}
</script>


<style scoped>
</style>
