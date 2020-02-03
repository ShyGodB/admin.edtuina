<template>
    <div id="UserCollectTech">
        <div class="tech-table">
            <el-table :data="techs" style="width: 100%">
                <el-table-column prop="techId" label="技师编号" width="120" ></el-table-column>

                <el-table-column prop="techName" label="姓名" width="120" ></el-table-column>

                <el-table-column prop="star" label="星级" width="80" ></el-table-column>

                <el-table-column prop="orderCount" label="单量" width="120" ></el-table-column>

                <el-table-column prop="clicks" label="点击量" width="160" ></el-table-column>

                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: "Tech",
    data () {
        return {
            techs: [],
            allUser: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            loading: true
        };
    },
    methods: {
        info (row, index) {
            this.$store.state.techId = row.techId;
            this.$router.push("/operating/tech/detail");
        },
        async listTech () {
            const res = await this.$api.post(
                "/user/listCollectTech",
                Object.assign(
                    {},
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize },
                    { userId: this.$store.state.userId }
                )
            );
            this.techs = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
    },
    created () {
        this.listTech();
    }
};
</script>


<style scoped>
</style>
