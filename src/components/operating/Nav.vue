<template>
    <el-row class="tac" id="operating-nav">
        <el-col :span="24">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#ffffff"
            text-color="#000"
            :router="true"
            active-text-color="#ff0000">
                <el-menu-item index="1" :route="routes.Order">
                    <i class="el-icon-menu"></i>
                    订单管理
                </el-menu-item>

                <el-menu-item index="2" :route="routes.User">
                    <i class="el-icon-menu"></i>
                    用户管理
                </el-menu-item>

                <el-menu-item index="3" :route="routes.Tech">
                    <i class="el-icon-setting"></i>
                    技师管理
                </el-menu-item>

                <el-menu-item index="4" :route="routes.Promote">
                    <i class="el-icon-setting"></i>
                    推广管理
                </el-menu-item>

                <el-menu-item index="5" :route="routes.Comment">
                    <i class="el-icon-setting"></i>
                    评论管理
                </el-menu-item>

                <el-menu-item index="6":route="routes.Coupon">
                    <i class="el-icon-menu"></i>
                    优惠卷
                </el-menu-item>

                <el-menu-item index="7" :route="routes.Project">
                    <i class="el-icon-menu"></i>
                    项目管理
                </el-menu-item>

                <el-menu-item index="8" :route="routes.Complaint">
                    <i class="el-icon-setting"></i>
                    投诉记录
                </el-menu-item>

                <el-menu-item index="9" :route="routes.TechApply">
                    <i class="el-icon-setting"></i>
                    资料审核
                </el-menu-item>

                <el-menu-item index="10" :route="routes.Feedback">
                    <i class="el-icon-setting"></i>
                    意见反馈
                </el-menu-item>

                <el-menu-item index="11" :route="routes.Review">
                    <i class="el-icon-menu"></i>
                    客户回访
                </el-menu-item>

                <el-menu-item index="12" :route="routes.TechTime">
                    <i class="el-icon-menu"></i>
                    技师时间
                </el-menu-item>

                <el-menu-item index="13" :route="routes.Alarm">
                    <i class="el-icon-setting"></i>
                    呼叫报警
                </el-menu-item>

                <el-menu-item index="14" :route="routes.Apply">
                    <i class="el-icon-setting"></i>
                    应聘管理
                </el-menu-item>

                <el-menu-item index="15" :route="routes.Agent">
                    <i class="el-icon-setting"></i>
                    渠道管理
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
            activeIndex: '1',
            routes: {
                Order: {
                    name: 'Operating', params: { tab: 'order' }
                },
                User: {
                    name: 'Operating', params: { tab: 'user' }
                },
                Tech: {
                    name: 'Operating', params: { tab: 'tech' }
                },
                Promote: {
                    name: 'Operating', params: { tab: 'promote' }
                },
                Comment: {
                    name: 'Operating', params: { tab: 'comment' }
                },
                Coupon: {
                    name: 'Operating', params: { tab: 'coupon' }
                },
                Project: {
                    name: 'Operating', params: { tab: 'project' }
                },
                Complaint: {
                    name: 'Operating', params: { tab: 'complaint' }
                },
                TechApply: {
                    name: 'Operating', params: { tab: 'techApply' }
                },
                Feedback: {
                    name: 'Operating', params: { tab: 'feedback' }
                },
                Review: {
                    name: 'Operating', params: { tab: 'review' }
                },
                TechTime: {
                    name: 'Operating', params: { tab: 'techTime' }
                },
                Alarm: {
                    name: 'Operating', params: { tab: 'alarm' }
                },
                Apply: {
                    name: 'Operating', params: { tab: 'apply' }
                },
                Agent: {
                    name: 'Operating', params: { tab: 'agent' }
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
