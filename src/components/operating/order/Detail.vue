<template>
    <div id="OrderDetail">
        <div class="order-detail-steps bg-white p-3 mt-3 mr-3">
            <el-steps class="ml-5" :space="500" :active="activeIndex" finish-status="success">
                <el-step title="已下单"></el-step>
                <el-step title="已接单"></el-step>
                <el-step title="已出发"></el-step>
                <el-step title="已到达"></el-step>
                <el-step title="已开始"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </div>

        <div class="order-detail-techinfo mt-3">
            <el-row>
                <el-col :span="11" class="p-3 techinfo border-8">
                    <div @click="getTechInfo" class="hover-hand">
                        <p>技师信息</p>
                        <el-row>
                            <el-col :span="8">
                                <img :src="tech.headImg" class="img" alt="图片加载失败或无图片">
                            </el-col>
                            <el-col :span="8">
                                <p>姓名 {{ tech.realName }}</p>
                                <p>手机 {{ tech.phone }}</p>
                            </el-col>
                            <el-col :span="8">
                                <p>性别 {{ tech.gender }}</p>
                                <p>分组 {{ tech.city }}</p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>

                <el-col :span="1">123</el-col>

                <el-col :span="11" class="p-3 userinfo border-8">
                    <div @click="getUserInfo" class="hover-hand">
                        <p>用户信息</p>
                        <el-row>
                            <el-col :span="8">
                                <img :src="user.headImg" class="img" alt="图片加载失败或无图片">
                            </el-col>
                            <el-col :span="8">
                                <p>姓名 {{ user.nickName }}</p>
                                <p>手机 {{ user.phone }}</p>
                            </el-col>
                            <el-col :span="8">
                                <p>性别 {{ user.gender }}</p>
                                <p>分组 {{ user.city }}</p>
                            </el-col>
                        </el-row>
                    </div @click="getUserInfo">
                </el-col>
            </el-row>
        </div>

        <div class="order-detail-orderinfo mt-3 p-3 bg-white border-8 mr-3">
            <el-row>
                <span class="pr-3">订单信息</span>
                <el-button class="pr-3" type="success" v-if="order.state===1" @click="accept" size="mini" round>接单
                </el-button v-if="order.state===1">
                <el-button class="pr-3" type="primary" v-if="order.state===2" @click="leave" size="mini" round>出发
                </el-button>
                <el-button class="pr-3" type="primary" v-if="order.state===3" @click="arrive" size="mini" round>到达
                </el-button>
                <el-button class="pr-3" type="primary" v-if="order.state===4" @click="start" size="mini" round>开始
                </el-button>
                <el-button class="pr-3" type="primary" v-if="order.state===5" @click="end" size="mini" round>服务完成
                </el-button>
                <el-button type="danger" size="mini" @click="cancel" round>取消订单</el-button>
            </el-row>

            <div class="py-3 pl-4">
                <el-row class="base-info">
                    <el-col :span="6" v-if="value" v-for="(value, name, index) in order.baseinfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="time-info">
                    <el-col :span="6" v-if="value" v-for="(value, name, index) in order.timeinfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="money-info">
                    <el-col :span="6" v-for="(value, name, index) in order.moneyInfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="address-info">
                    <el-col :span="24" v-for="(value, name, index) in order.addressInfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="remark-info">
                    <el-col :span="6" v-for="(value, name, index) in order.signInfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="remark-info">
                    <el-col :span="6" v-for="(value, name, index) in order.remarkInfo" class="d-ib mb-2"
                        :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                </el-row>

                <div class="line mb-2"></div>

                <el-row class="remark-info">
                    <el-col v-if="order.isReview" :span="6" v-for="(value, name, index) in order.reviewInfo"
                        class="d-ib mb-2" :index="(index + 1).toString()" :key="index">
                        <span class="pr-2">{{ name }} : </span> <span>{{ value }}</span>
                    </el-col>
                    <el-col :span="24">
                        <el-button type="primary">现在回访</el-button>
                        <el-button type="info">回访记录</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="clock-info mt-3 p-3 bg-white border-8 mr-3">
            <el-table :data="order.children" style="width: 100%">
                <el-table-column prop="orderId" label="订单号" height="120"></el-table-column>

                <el-table-column prop="projectName" label="加钟项目" height="120"></el-table-column>

                <el-table-column prop="duration" label="加钟时间" height="120"></el-table-column>

                <el-table-column prop="payState" label="支付状态" height="120"></el-table-column>

                <el-table-column prop="payPrice" label="支付金额" height="120"></el-table-column>

                <el-table-column prop="payStyle" label="支付方式" height="120"></el-table-column>
            </el-table>
        </div>

        <div class="call-info mt-3 p-3 bg-white border-8 mr-3">
            <el-table :data="calls" style="width: 100%">
                <el-table-column prop="callType" label="呼叫类型" height="120"></el-table-column>

                <el-table-column prop="breakUser" label="挂断方" height="120"></el-table-column>

                <el-table-column prop="breakReason" label="挂断原因" height="120"></el-table-column>

                <el-table-column prop="callTime" label="开始呼叫时间" height="120"></el-table-column>

                <el-table-column prop="hearTime" label="开始接听时间" height="120"></el-table-column>

                <el-table-column prop="breakTime" label="挂断时间" height="120"></el-table-column>

                <el-table-column prop="virtualPhone" label="虚拟电话" height="120"></el-table-column>

                <el-table-column label="操作" height="120">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="listen(scope.row, scope.$index)" round>听录音
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "OrderDetail",
    data () {
        return {
            activeIndex: 1,
            order: {},
            user: {},
            tech: {},
            addOrders: [],
            calls: []
        }
    },
    methods: {
        listen (row, index) {

        },
        getUserInfo () {
            this.$store.state.userId = this.user.userId;
            this.$router.push('/operating/user/detail');
        },
        getTechInfo () {
            this.$store.state.techId = this.tech.techId;
            this.$router.push('/operating/tech/detail');
        },
        getOrderDetail (data) {
            axios({
                method: "post",
                url: "/api/admin/order/detail",
                responseType: "json",
                data: data
            }).then(res => {
                this.activeIndex = res.data.data.order.state
                this.order = res.data.data.order
                this.user = res.data.data.user
                this.tech = res.data.data.tech
                this.calls = res.data.data.calls
            });
        },
        async accept () {
            const res = await this.$api.post('/order/accept', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
        async leave () {
            const res = await this.$api.post('/order/leave', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
        async arrive () {
            const res = await this.$api.post('/order/arrive', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
        async start () {
            const res = await this.$api.post('/order/start', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
        async end () {
            const res = await this.$api.post('/order/end', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
        async cancel () {
            const res = await this.$api.post('/order/cancel', { orderId: this.order.orderId })
            if (res.data.success) this.$message.success('操作成功!')
        },
    },
    created () {
        this.getOrderDetail({ orderId: this.$store.state.orderId })
    }
};
</script>

<style scoped>
.img {
    width: 100px;
    height: 100px;
}

.f-right {
    float: right;
}

.userinfo {
    background-color: #ffffff;
    margin-right: 16px;
    float: right;
}
.techinfo {
    background-color: #ffffff;
}

.d-ib {
    display: inline-block;
}

.line {
    height: 1px;
    width: 100%;
    background-color: #dddddd;
}
.order-detail-steps {
    border-radius: 8px;
}
</style>