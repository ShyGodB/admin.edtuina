<template>
    <el-row class="w-100 h-100 bg-offwhite" id="operating">
        <el-col :span="3">
            <operating-nav></operating-nav>
        </el-col>

        <el-col :span="21" v-if="tab==='order'">
            <operating-order v-if="model==='list'"></operating-order>
            <operating-order-detail v-if="model==='detail'"></operating-order-detail>
            <operating-order-replenish v-if="model==='replenish'"></operating-order-replenish>
        </el-col>

        <el-col :span="21" v-if="tab==='user'">
            <operating-user v-if="model==='list'"></operating-user>
            <operating-user-detail v-if="model==='detail'"></operating-user-detail>
            <operating-user-orderList v-if="model==='orderList'"></operating-user-orderList>
            <operating-user-techList v-if="model==='techList'"></operating-user-techList>
            <operating-user-feedback v-if="model==='feedback'"></operating-user-feedback>
            <operating-user-comment v-if="model==='comment'"></operating-user-comment>
            <operating-user-coupon v-if="model==='coupon'"></operating-user-coupon>
            <operating-user-invite v-if="model==='invite'"></operating-user-invite>
            <operating-user-balance v-if="model==='balance'"></operating-user-balance>
            <operating-user-location v-if="model==='location'"></operating-user-location>
            <operating-user-review v-if="model==='review'"></operating-user-review>
        </el-col>

        <el-col :span="21" v-if="tab==='tech'">
            <operating-tech v-if="model==='list'"></operating-tech>
            <operating-tech-detail v-if="model==='detail'"></operating-tech-detail>
            <operating-tech-orderList v-if="model==='orderList'"></operating-tech-orderList>
            <operating-tech-commentList v-if="model==='commentList'"></operating-tech-commentList>
            <operating-tech-growthList v-if="model==='growthList'"></operating-tech-growthList>
            <operating-tech-locationList v-if="model==='locationList'"></operating-tech-locationList>
            <operating-tech-overList v-if="model==='overList'"></operating-tech-overList>
        </el-col>

        <el-col :span="21" v-if="tab==='promote'">
            <operating-promote></operating-promote>
        </el-col>

        <el-col :span="21" v-if="tab==='techComment'">
            <operating-techcomment></operating-techcomment>
        </el-col>

        <el-col :span="21" v-if="tab==='userComment'">
            <operating-usercomment></operating-usercomment>
        </el-col>

        <el-col :span="21" v-if="tab==='coupon'">
            <operating-coupon-store v-if="model === 'list'"></operating-coupon-store>
            <operating-coupon-userCoupons v-if="model === 'userCoupons'"></operating-coupon-userCoupons>
            <operating-coupon-codes v-if="model === 'codes'"></operating-coupon-codes>
        </el-col>

        <el-col :span="21" v-if="tab==='project'">
            <operating-project></operating-project>
        </el-col>

        <el-col :span="21" v-if="tab==='complaint'">
            <operating-complaint></operating-complaint>
        </el-col>

        <el-col :span="21" v-if="tab==='techApply'">
            <operating-techApply></operating-techApply>
        </el-col>

        <el-col :span="21" v-if="tab==='feedback'">
            <operating-feedback></operating-feedback>
        </el-col>

        <el-col :span="21" v-if="tab==='review'">
            <operating-review></operating-review>
        </el-col>

        <el-col :span="21" v-if="tab==='techTime'">
            <operating-techTime></operating-techTime>
        </el-col>

        <el-col :span="21" v-if="tab==='alarm'">
            <operating-alarm></operating-alarm>
        </el-col>

        <el-col :span="21" v-if="tab==='apply'">
            <operating-apply></operating-apply>
        </el-col>

        <el-col :span="21" v-if="tab==='agent'">
            <operating-agent></operating-agent>
        </el-col>
    </el-row>
</template>


<script>
import axios from "axios";
import md5 from "md5";
import Nav from "../components/SecondNav.vue";
import Order from "../components/operating/Order/List.vue";
import OrderDetail from "../components/operating/Order/Detail.vue";
import OrderReplenish from "../components/operating/Order/Add.vue";
import User from "../components/operating/User/List.vue";
import UserDetail from "../components/operating/User/Detail.vue";
import UserOrderList from "../components/operating/User/OrderList";
import UserTechList from "../components/operating/User/TechList";
import UserFeedback from "../components/operating/User/Feedback";
import UserCommentList from "../components/operating/User/Comment";
import UserCouponList from "../components/operating/User/Coupon";
import UserInvite from "../components/operating/User/Invite";
import UserBalance from "../components/operating/User/Balance";
import UserLocation from "../components/operating/User/Location";
import UserReview from "../components/operating/User/Review";
import Tech from "../components/operating/Tech/List.vue";
import TechDetail from "../components/operating/Tech/Detail";
import TechCommentList from "../components/operating/Tech/CommentList.vue";
import TechGrowthList from "../components/operating/Tech/GrowthList.vue";
import TechLocationList from "../components/operating/Tech/LocationList.vue";
import TechOrderList from "../components/operating/Tech/OrderList.vue";
import TechOverList from "../components/operating/Tech/OverList.vue";
import Promote from "../components/operating/Promote/List.vue";
import TechComment from "../components/operating/TechComment/List.vue";
import UserComment from "../components/operating/UserComment/List.vue";
import CouponList from "../components/operating/Coupon/List.vue";
import UserCoupons from "../components/operating/Coupon/UserCoupons.vue";
import Codes from "../components/operating/Coupon/Codes.vue";
import Project from "../components/operating/Project/List.vue";
import Complaint from "../components/operating/Complaint/List.vue";
import TechApply from "../components/operating/TechApply/List.vue";
import Feedback from "../components/operating/Feedback/List.vue";
import Review from "../components/operating/Review/List.vue";
import TechTime from "../components/operating/TechTime/List.vue";
import Alarm from "../components/operating/Alarm/List.vue";
import Apply from "../components/operating/Apply/List.vue";
import Agent from "../components/operating/Agent/List.vue";

export default {
    name: "Operating",
    components: {
        "operating-nav": Nav,
        "operating-agent": Agent,
        "operating-alarm": Alarm,
        "operating-apply": Apply,
        "operating-techcomment": TechComment,
        "operating-usercomment": UserComment,
        "operating-complaint": Complaint,
        "operating-coupon-store": CouponList,
        "operating-coupon-userCoupons": UserCoupons,
        "operating-coupon-codes": Codes,
        "operating-feedback": Feedback,
        "operating-order": Order,
        "operating-order-detail": OrderDetail,
        "operating-order-replenish": OrderReplenish,
        "operating-project": Project,
        "operating-promote": Promote,
        "operating-review": Review,
        "operating-order": Order,
        "operating-tech": Tech,
        "operating-tech-detail": TechDetail,
        "operating-tech-orderList": TechOrderList,
        "operating-tech-commentList": TechCommentList,
        "operating-tech-growthList": TechGrowthList,
        "operating-tech-locationList": TechLocationList,
        "operating-tech-overList": TechOverList,
        "operating-techApply": TechApply,
        "operating-techTime": TechTime,
        "operating-user": User,
        "operating-user-detail": UserDetail,
        "operating-user-orderList": UserOrderList,
        "operating-user-techList": UserTechList,
        "operating-user-feedback": UserFeedback,
        "operating-user-comment": UserCommentList,
        "operating-user-coupon": UserCouponList,
        "operating-user-invite": UserInvite,
        "operating-user-balance": UserBalance,
        "operating-user-location": UserLocation,
        "operating-user-review": UserReview,
    },
    data () {
        return {
            tab: "order",
            model: "detail"
        };
    },
    methods: {
        changeRoute () {
            const { tab, model } = this.$route.params;
            this.tab = tab;
            this.model = model;
        }
    },
    watch: {
        $route: "changeRoute"
    },
    created () {
        this.tab = this.$route.params.tab;
        this.model = this.$route.params.model;
    }
};
</script>


<style scoped>
#god,
#boss {
    margin-top: 21px;
}
.register {
    width: 60%;
    min-height: 500px;
    margin: 40px auto 0;
}
.register .register-body {
    margin-top: 40px;
}
.oa {
    max-height: 800px;
    overflow: auto;
}
</style>
