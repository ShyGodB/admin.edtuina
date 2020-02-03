<template>
    <div id="TechDetail">
        <div id="tech-detail-baseinfo" class="mt-3 mr-3 p-3 border-8 bg-white">
            <p class="tc-green">基本信息</p>
            <el-row class="p-3">
                <el-col :span="4">
                    <img class="img" :src="tech.headImg" alt="图片显示错误或无图片">
                    <p>技师可提现余额： {{ tech.amount }}</p>
                </el-col>
                <el-col :span="18">
                    <el-row>
                        <el-col :span="8">
                            <p>姓名： <span class="tc-orange">{{ tech.realName }}</span></p>
                            <p>性别： <span class="tc-orange">{{ tech.gender }}</span> </p>
                            <p>生日： <span class="tc-orange">{{ tech.birthday }}</span> </p>
                            <p>状态： <span class="tc-orange">{{ tech.state }}</span> </p>
                        </el-col>
                        <el-col :span="8">
                            <p>城市： <span class="tc-orange">{{ tech.city }}</span></p>
                            <p>认证级别： <span class="tc-orange">{{ tech.level }}</span> </p>
                            <p>从业时间： <span class="tc-orange">{{ tech.jobYear }}</span> </p>
                            <p>服务项目： <span class="tc-orange">{{ tech.projects }}</span> </p>
                        </el-col>
                        <el-col :span="8">
                            <p>手机系统： <span class="tc-orange">{{ tech.phoneSystem }}</span></p>
                            <p>审核通过时间： <span class="tc-orange">{{ tech.regtime }}</span> </p>
                            <p>手机： <span class="tc-orange">{{ tech.phone }}</span> </p>
                            <p>定位设备号： <span class="tc-orange">{{ tech.posDeviceId }}</span> </p>
                        </el-col>
                    </el-row>
                    <p>简介： <span class="tc-orange">{{ tech.remark }}</span> </p>
                    <el-row>
                        <el-col :span="4">

                        </el-col>
                        <el-col :span="20">
                            <span>星级： <span class="tc-orange mr-4">{{ tech.star }}</span> </span>
                            <span>单量： <span class="tc-orange mr-4">{{ tech.orders }}</span> </span>
                            <span>点击： <span class="tc-orange mr-4">{{ tech.clicks }}</span> </span>
                            <span>加钟： <span class="tc-orange mr-4">{{ tech.clocks }}</span> </span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div id="tech-card-baseinfo" class="mt-3 mr-3 p-3 border-8 bg-white">
            <p class="tc-green">身份证信息</p>
            <el-row class="p-3">
                <el-col :span="24">
                    <p>身份证号： {{ tech.IDCard || '暂无数据，待补充' }} </p>
                    <img class="img" v-for="(img, index) in imgs" :key="index + 1" :src="img" alt="图片显示错误或无图片">
                </el-col>
            </el-row>
        </div>

        <div id="tech-detail-grid" class="mt-3 pr-3 py-3 border-8">
            <el-row>
                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listOrder">
                        <p>订单列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listOver">
                        <p>浏览列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listComment">
                        <p>评论列表</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listGrowth">
                        <p>成长记录</p>
                    </div>
                </el-col>

                <el-col :span="4" class="grid">
                    <div class="fullbox pt-5 ta-center" @click="listLocation">
                        <p>位置记录</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";

export default {
    name: "TechDetail",
    data () {
        return {
            tech: {},
            imgs: [],
            grids: [
                {
                    icon: 'el-icon-s-order',
                    name: '订单列表',
                    method: 'listOrder'
                },
                {
                    icon: 'el-icon-s-order',
                    name: '浏览列表',
                    method: 'listOver'
                },
                {
                    icon: 'el-icon-s-order',
                    name: '评论列表',
                    method: 'listComment'
                },
                {
                    icon: 'el-icon-s-order',
                    name: '成长记录',
                    method: 'listGrowth'
                },
                {
                    icon: 'el-icon-s-order',
                    name: '位置记录',
                    method: 'listLocation'
                }
            ]
        };
    },
    methods: {
        Fn (method) {
            this[method]()
        },
        listOrder () {
            this.$router.push("/operating/tech/orderList");
        },
        listOver () {
            this.$message.error('暂未完成！')
            // this.$router.push("/operating/tech/overList");
        },
        listComment () {
            this.$router.push("/operating/tech/commentList");
        },
        listGrowth () {
            this.$router.push("/operating/tech/growthList");
        },
        listLocation () {
            this.$router.push("/operating/tech/locationList");
        },
        getTechDetail (techId) {
            axios({
                method: "post",
                url: "/api/admin/tech/detail",
                responseType: "json",
                data: {
                    techId: this.$store.state.techId
                }
            }).then(res => {
                this.tech = res.data.data
                this.imgs = this.tech.imgs
            });
        }
    },
    created () {
        this.getTechDetail(this.$store.state.techId)
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
  