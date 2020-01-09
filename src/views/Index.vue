<template>
    <div id="Index" class="w-100">
        <el-row class="index-today">
            <index-today :data="today"></index-today>
        </el-row>

        <el-row class="index-seven">
            <index-seven :data="{seven}"></index-seven>
        </el-row>

        <el-row class="index-yesterday">
            <index-yesterday :data="yesterday"></index-yesterday>
        </el-row>

        <el-row class="index-yesterday">
            <index-client :data="client"></index-client>
        </el-row>
    </div>
</template>

<script>
import TodayData from '../components/index/TodayData.vue'
import RecentSevenDayData from '../components/index/RecentSevenDayData.vue'
import YesterdayData from '../components/index/YesterdayData.vue'
import ClientTotalData from '../components/index/ClientTotalData.vue'
import util from '../../util'

export default {
    name: 'Index',
    components: {
        'index-today': TodayData,
        'index-seven': RecentSevenDayData,
        'index-yesterday': YesterdayData,
        'index-client': ClientTotalData,
    },
    data () {
        return {
            today: [],
            yesterday: [],
            seven: [],
            userCount: 0,
            techCount: 0,
            client: []
        }
    },
    methods: {
        async getData () {
            const res = await this.$api.get('/index/data', {})
            if (res.data.success) {
                const { today, seven, yesterday, userCount, techCount, client } = util.tool.checkHomeData(res.data.data)
                this.today = today
                this.yesterday = yesterday
                this.seven = seven
                this.userCount = userCount
                this.techCount = techCount
                this.client = client
            } else {
                this.$message.error('主页数据请求错误，请联系技术人员！')
            }

        }
    },
    created () {
        this.getData()
    }
}
</script>


<style scoped>
#myChart {
    width: 100%;
    height: 400px;
}
</style>
