<template>
    <div id="TechOrder" class="bg-white">
        <div class="order-table">
            <el-table :data="orders" @row-click="rowInfo" style="width: 100%">
                <el-table-column prop="orderId" label="订单号" width="240"></el-table-column>

                <el-table-column prop="type" label="类型" width="80"></el-table-column>

                <el-table-column prop="source" label="来源" width="120"></el-table-column>

                <el-table-column prop="orderClockFee" label="服务费(加钟)" width="120"></el-table-column>

                <el-table-column prop="orderServiceFee" label="服务费(订单)" width="120"></el-table-column>

                <el-table-column prop="orderTransFee" label="交通费(订单)" width="120"></el-table-column>

                <el-table-column prop="orderRewardFee" label="打赏(订单)" width="120"></el-table-column>

                <el-table-column prop="orderCouponFee" label="优惠卷(订单)" width="120"></el-table-column>

                <el-table-column prop="serviceFeeCash" label="服务费(现金)" width="120"></el-table-column>

                <el-table-column prop="transFeeCash" label="交通费(现金)" width="120"></el-table-column>

                <el-table-column prop="rewardFeeCash" label="打赏(现金)" width="120"></el-table-column>

                <el-table-column prop="serviceFee" label="服务费(余额)" width="120"></el-table-column>

                <el-table-column prop="transFee" label="交通费(余额)" width="120"></el-table-column>

                <el-table-column prop="rewardFee" label="打赏(余额)" width="120"></el-table-column>

                <el-table-column prop="channelFee" label="渠道分成" width="120"></el-table-column>

                <el-table-column prop="agentName" label="对应渠道商" width="120"></el-table-column>

                <el-table-column prop="clientFee" label="平台分成" width="120"></el-table-column>

                <el-table-column prop="techFee" label="技师分成" width="120"></el-table-column>

                <el-table-column prop="proxyFeeTech" label="代理商分成(技师)" width="150"></el-table-column>

                <el-table-column prop="proxyFeeUser" label="代理商分成(用户)" width="150"></el-table-column>

                <el-table-column prop="userName" label="用户姓名" width="120"></el-table-column>

                <el-table-column prop="addTime" label="下单时间" width="180"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../../../util";

export default {
    name: "Order",
    data () {
        return {
            orders: [],
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
        };
    },
    methods: {
        info (row, index) {
            this.$store.state.orderId = row.orderId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/order/detail");
            window.open(href, "_blank");
        },
        rowInfo (row, column, event) {
            this.$store.state.orderId = row.orderId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/order/detail");
            window.open(href, "_blank");
        },
        pageChange (pageNum) {
            this.pageIndex = pageNum
            this.listOrder();
        },
        sizeChange (num) { },
        async listOrder () {
            const res = await this.$api.post(
                "/settle/listTechOrder",
                Object.assign(
                    {},
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { startTime: this.$store.state.startTime },
                    { endTime: this.$store.state.endTime },
                    { techId: this.$store.state.techId },
                )
            );
            this.orders = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created () {
        this.listOrder();
    }
};
</script>

<style scoped>
.text-noPay {
    color: #ff7f00;
}
.text-noAccept {
    color: #1e9fff;
}
.text-accepted {
    color: #00ff00;
}
.text-out {
    color: #00ffff;
}
.text-arrive {
    color: #0000ff;
}
.text-start {
    color: #8b00ff;
}
.text-complete {
    color: #999999;
}
.text-cancel {
    color: #ff0000;
}
.text-bill {
    color: #ff0000;
}
</style>
