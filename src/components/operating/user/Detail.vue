<template>
    <div id="UserDetail">
        <div id="user-detail-baseinfo" class="p-3 bg-white border-8 mt-3">
            <p class="tc-green">基本信息</p>
            <el-row class="p-3">
                <el-col :span="4">
                    <img class="img" :src="user.headImg" alt="图片显示错误或无图片" />
                </el-col>
                <el-col :span="18">
                    <el-col :span="8">
                        <p>姓名： <span class="tc-orange">{{ user.nickName }}</span></p>
                        <p>注册时间： <span class="tc-orange">{{ user.regTime }}</span></p>
                        <p>普通余额： <span class="tc-orange">{{ user.amount }}</span></p>
                    </el-col>
                    <el-col :span="8">
                        <p>城市： <span class="tc-orange">{{ user.city }}</span></p>
                        <p>生日： <span class="tc-orange">{{ user.birthday }}</span></p>
                        <p>充值余额： <span class="tc-orange">{{ user.amountRecharge }}</span></p>
                    </el-col>
                    <el-col :span="8">
                        <p>性别： <span class="tc-orange">{{ user.gender }}</span></p>
                        <p>手机： <span class="tc-orange">{{ user.phone }}</span></p>
                        <p>退款余额： <span class="tc-orange">{{ user.amountRefund }}</span></p>
                    </el-col>
                </el-col>
            </el-row>
        </div>

        <div id="user-detail-grid" class="mt-3 border-8 bg-white">
            <el-row>
                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listOrder">
                        <p>订单列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listCollectTech">
                        <p>收藏列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listAdvice">
                        <p>意见反馈</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listComment">
                        <p>评论列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listCoupon">
                        <p>优惠卷</p>
                    </div>
                </el-col>
                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listInvite">
                        <p>邀请有奖</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listBalanceRecord">
                        <p>余额明细</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listLocation">
                        <p>定位记录</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listReview">
                        <p>回访记录</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="addReview">
                        <p>添加回访记录</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="addDanger">
                        <p>添加危险标识</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";

export default {
    name: "UserDetail",
    data () {
        return {
            user: {},
            grids: [
                {
                    icon: "el-icon-s-order",
                    name: "订单列表",
                    method: "listOrder"
                },
                {
                    icon: "el-icon-s-order",
                    name: "收藏列表",
                    method: "listCollectTech"
                },
                {
                    icon: "el-icon-s-order",
                    name: "意见反馈",
                    method: "listAdvice"
                },
                {
                    icon: "el-icon-s-order",
                    name: "评论列表",
                    method: "listComment"
                },
                {
                    icon: "el-icon-s-order",
                    name: "优惠卷",
                    method: "listCoupon"
                },
                {
                    icon: "el-icon-s-order",
                    name: "邀请有奖",
                    method: "listInvite"
                },
                {
                    icon: "el-icon-s-order",
                    name: "余额明细",
                    method: "listBalanceRecord"
                },
                {
                    icon: "el-icon-s-order",
                    name: "位置记录",
                    method: "listLocation"
                },
                {
                    icon: "el-icon-s-order",
                    name: "回访记录",
                    method: "listReview"
                },
                {
                    icon: "el-icon-s-order",
                    name: "添加回访记录",
                    method: "addReview"
                },
                {
                    icon: "el-icon-s-order",
                    name: "添加危险标识",
                    method: "addDanger"
                }
            ]
        };
    },
    methods: {
        listOrder () {
            this.$router.push("/operating/user/orderList");
        },
        listCollectTech () {
            this.$router.push("/operating/user/techList");
        },
        listAdvice () {
            console.log("abc");
        },
        listComment () {
            console.log("abc");
        },
        listCoupon () {
            console.log("abc");
        },
        listInvite () {
            console.log("abc");
        },
        listBalanceRecord () {
            console.log("abc");
        },
        listLocation () {
            console.log("abc");
        },
        listReview () {
            console.log("abc");
        },
        addReview () {
            console.log("abc");
        },
        addDanger () {
            console.log("abc");
        },
        async getUserDetail (userId) {
            const res = await this.$api.get("/user/detail", {
                userId: this.$store.state.userId
            });
            this.user = res.data.data;
        }
    },
    created () {
        this.getUserDetail(this.$store.state.userId);
    }
};
</script>


<style scoped>
.grid {
    height: 186px;
    border: 1px solid #dddddd;
}

.fullbox {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
  