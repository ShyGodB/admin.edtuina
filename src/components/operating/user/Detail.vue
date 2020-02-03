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
                    <div class="fullbox pt-5 ta-center" @click="openReviewDialog">
                        <p>添加回访记录</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="openDangerDialog">
                        <p>添加危险标识</p>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="添加回访记录" :visible.sync="dialogAddReview">
            <el-form :model="addDangerForm" ref="addDangerForm" label-width="100px">
                <el-form-item label="用户手机" prop="userPhone">
                    <el-input v-model="addReviewForm.userPhone"></el-input>
                </el-form-item>

                <el-form-item label="用户姓名" prop="userName">
                    <el-input v-model="addReviewForm.userName"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                    <el-select v-model="addReviewForm.gender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="来源" prop="source">
                    <el-select v-model="addReviewForm.source" placeholder="请选择来源">
                        <el-option label="大众点评" value="大众点评"></el-option>
                        <el-option label="百度糯米" value="百度糯米"></el-option>
                        <el-option label="到位" value="到位"></el-option>
                        <el-option label="美团" value="美团"></el-option>
                        <el-option label="支付宝口碑" value="支付宝口碑"></el-option>
                        <el-option label="公众号" value="公众号"></el-option>
                        <el-option label="小程序" value="小程序"></el-option>
                        <el-option label="App" value="App"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="类别" prop="style">
                    <el-select v-model="addReviewForm.style" placeholder="请选择回访类别">
                        <el-option label="软件" value="软件"></el-option>
                        <el-option label="服务" value="服务"></el-option>
                        <el-option label="商务合作" value="商务合作"></el-option>
                        <el-option label="服务完成" value="服务完成"></el-option>
                        <el-option label="取消订单" value="取消订单"></el-option>
                        <el-option label="新注册下单" value="新注册下单"></el-option>
                        <el-option label="团单客户联系" value="团单客户联系"></el-option>
                        <el-option label="技师安排调动" value="技师安排调动"></el-option>
                        <el-option label="客户建议反馈" value="客户建议反馈"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="呼叫类型" prop="callType">
                    <el-select v-model="addReviewForm.callType" placeholder="请选择呼叫类型">
                        <el-option label="400呼入" value="400呼入"></el-option>
                        <el-option label="3110呼入" value="3110呼入"></el-option>
                        <el-option label="呼出" value="呼出"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="来电时间" prop="callTime">
                    <el-date-picker v-model="addReviewForm.callTime" type="datetime" placeholder="来电时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="城市" prop="city">
                    <el-input v-model="addReviewForm.city"></el-input>
                </el-form-item>

                <el-form-item label="订单号" prop="orderId">
                    <el-input v-model="addReviewForm.orderId"></el-input>
                </el-form-item>

                <el-form-item label="询问内容" prop="orderId">
                    <el-input type="textarea" :rows="3" placeholder="请输入询问内容" v-model="addReviewForm.content">
                    </el-input>
                </el-form-item>

                <el-form-item label="备注" prop="orderId">
                    <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="addReviewForm.remark">
                    </el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddReview = false">取 消</el-button>
                <el-button type="primary" @click="addReview">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加危险标识" :visible.sync="dialogAddDanger">
            <el-form :model="addDangerForm" ref="addDangerForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-select v-model="addDangerForm.danger" placeholder="请选择危险等级">
                        <el-option label="一级红色" value="1"></el-option>
                        <el-option label="二级黄色" value="2"></el-option>
                        <el-option label="三级蓝色" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddDanger = false">取 消</el-button>
                <el-button type="primary" @click="addDanger">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
  
<script>
import axios from "axios";

export default {
    name: "UserDetail",
    data () {
        return {
            user: {},
            dialogAddDanger: false,
            dialogAddReview: false,
            addDangerForm: {
                danger: 0
            },
            addReviewForm: {
                userPhone: '',
                userName: '',
                gender: '',
                source: '',
                style: '',
                callType: '',
                callTime: '',
                city: '',
                orderId: '',
                content: '',
                remark: '',
            },
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
            this.$router.push("/operating/user/feedback");
        },
        listComment () {
            this.$router.push("/operating/user/comment");
        },
        listCoupon () {
            this.$router.push("/operating/user/coupon");
        },
        listInvite () {
            this.$router.push("/operating/user/invite");
        },
        listBalanceRecord () {
            this.$router.push("/operating/user/balance");
        },
        listLocation () {
            this.$router.push("/operating/user/location");
        },
        listReview () {
            this.$router.push("/operating/user/review");
        },
        openReviewDialog () {
            this.dialogAddReview = true
            this.addReviewForm.userName = this.user.nickName
            this.addReviewForm.userPhone = this.user.phone
            this.addReviewForm.gender = this.user.gender
        },
        async addReview () {
            this.addReviewForm.userId = this.user.userId
            const res = await this.$api.post('/user/addReview', this.addReviewForm)
            if (res.data.success) this.$message.success('设置成功！')
            this.dialogAddReview = false
            this.addReviewForm.userPhone = ''
            this.addReviewForm.userName = ''
            this.addReviewForm.gender = ''
            this.addReviewForm.source = ''
            this.addReviewForm.style = ''
            this.addReviewForm.callType = ''
            this.addReviewForm.callTime = ''
            this.addReviewForm.city = ''
            this.addReviewForm.orderId = ''
            this.addReviewForm.content = ''
            this.addReviewForm.remark = ''
        },
        openDangerDialog () {
            this.dialogAddDanger = true
        },
        async addDanger () {
            const res = await this.$api.post('/user/setDanger', {
                userId: this.$store.state.userId,
                danger: this.addDangerForm.danger
            })
            if (res.data.success) this.$message.success('设置成功！')
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
    background-color: aquamarine;
    border: 1px solid #dddddd;
}

.fullbox {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
  