<template>
    <div id="Index" class="w-100">
        <el-row class="index-today">
            <el-col :span="4" v-for="(item, index) in today" :key="index">
                <el-row>
                    <el-col :span="10">
                        <el-image style="width: 40px; height: 40px; margin-left: 3rem" :src="url"></el-image>
                    </el-col>
                    <el-col :span="14">
                        <div>{{ item.name }}</div>
                        <div style="font-size: x-large">{{ item.value }}</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="index-seven">
            <el-col :span="14" class="seven-recent-serven">
                <div ref="myChart" id="myChart"></div>
            </el-col>

            <el-col :span="10" class="seven-user-tech h-100">
                <div class="seven-user">
                    <el-row>
                        <el-col :span="12" class="index-count height-half">总用户</el-col>

                        <el-col :span="12">{{ userCount }}</el-col>
                    </el-row>
                </div>

                <div class="seven-tech h-100">
                    <el-row>
                        <el-col :span="12" class="index-count height-half">总技师</el-col>

                        <el-col :span="12">{{ techCount }}</el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-row class="index-yesterday">
            <el-col :span="4" v-for="(item, index) in yesterday" :key="index">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">{{ item.name }}</div>
                    <div class="text item">{{ item.value }}</div>
                </el-card>
            </el-col>
        </el-row>

        <el-row class="index-yesterday">
            <el-col :span="6" v-for="(item, index) in client" :key="index">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">{{ item.name }}</div>
                    <div class="text item">{{ item.value }}</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import util from "../../util";

export default {
    name: "Index",
    data() {
        return {
            today: [],
            yesterday: [],
            seven: [],
            userCount: 0,
            techCount: 0,
            client: [],
            url: "/public/img/a1.jpg"
        };
    },
    methods: {
        async showEcharts(data) {
            const option = {
                color: ["#65a031", "#fc7c00"],
                title: {
                    text: "",
                    subtext: "交易额(项目费/交通费/优惠券)",
                    top: -25
                },
                grid: {
                    height: 310,
                    top: 35
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["单量", "交易额"],
                    top: 6
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    },
                    right: 13,
                    top: 27,
                    orient: "vertical",
                    itemGap: 15
                },
                xAxis: [
                    {
                        type: "category",
                        data: data.day
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: ""
                    },
                    {
                        type: "value",
                        name: "单量",
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: "单量",
                        type: "line",
                        yAxisIndex: 1,
                        data: data.orders
                    },
                    {
                        name: "交易额",
                        type: "bar",
                        data: data.pay
                    }
                ]
            };
            const myChart = await this.$echarts.init(this.$refs.myChart);
            myChart.setOption(option);
        },
        async getData() {
            const res = await this.$api.get("/index/data", {});
            if (res.data.success) {
                const {
                    today,
                    seven,
                    yesterday,
                    userCount,
                    techCount,
                    client
                } = util.tool.checkHomeData(res.data.data);
                this.today = today;
                this.yesterday = yesterday;
                this.seven = seven;
                this.userCount = userCount;
                this.techCount = techCount;
                this.client = client;
                this.showEcharts(this.seven);
            } else {
                this.$message.error("主页数据请求错误，请联系技术人员！");
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>


<style scoped>
#myChart {
    width: 100%;
    height: 400px;
}
.index-count {
    display: inline-block;
    text-align: right;
    padding-right: 4rem;
}
.height-half {
    height: 50%;
    margin: auto;
}
.d-inline {
    display: inline;
}
</style>
