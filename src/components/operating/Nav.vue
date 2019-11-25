<template>
    <el-row class="tac" id="operating-nav">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#ffffff"
            text-color="#000"
            active-text-color="#ff0000">
                <el-menu-item index="1" @click="switchTab('order')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/order">订单管理</router-link>
                </el-menu-item>

                <el-menu-item index="2" @click="switchTab('user')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/user">用户管理</router-link>
                </el-menu-item>

                <el-menu-item index="3" @click="switchTab('tech')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/tech">技师管理</router-link>
                </el-menu-item>

                <el-menu-item index="4" @click="switchTab('promote')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/promote">推广管理</router-link>
                </el-menu-item>

                <el-menu-item index="5" @click="switchTab('comment')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/comment">评论管理</router-link>
                </el-menu-item>

                <el-menu-item index="6" @click="switchTab('coupon')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/coupon">优惠卷</router-link>
                </el-menu-item>

                <el-menu-item index="7" @click="switchTab('project')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/project">项目管理</router-link>
                </el-menu-item>

                <el-menu-item index="8" @click="switchTab('complaint')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/complaint">投诉记录</router-link>
                </el-menu-item>

                <el-menu-item index="9" @click="switchTab('techApply')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/techApply">资料审核</router-link>
                </el-menu-item>

                <el-menu-item index="10" @click="switchTab('feedback')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/feedback">意见反馈</router-link>
                </el-menu-item>

                <el-menu-item index="11" @click="switchTab('review')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/review">客户回访</router-link>
                </el-menu-item>

                <el-menu-item index="12" @click="switchTab('techTime')">
                <i class="el-icon-menu"></i>
                <router-link to="/operating/techTime">技师时间</router-link>
                </el-menu-item>

                <el-menu-item index="13" @click="switchTab('alarm')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/alarm">呼叫报警</router-link>
                </el-menu-item>

                <el-menu-item index="14" @click="switchTab('apply')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/apply">应聘管理</router-link>
                </el-menu-item>

                <el-menu-item index="15" @click="switchTab('agent')">
                <i class="el-icon-setting"></i>
                <router-link to="/operating/agent">渠道管理</router-link>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'operating-nav',
    data() {
        return {
            tab: 'order'
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
                name: 'operating',
                params: {
                    tab: tab,
                }
            });
        }
    },
    created() {

    }
}
</script>


<style scoped>
</style>
