<template>
    <el-container id="Client">

        <el-row class="w-100">
            <el-col :span="6" v-for="item in data">
                <p> {{ item.name }} </p>
                <p> {{ item.value }} </p>
            </el-col>
        </el-row>

    </el-container>
</template>

<script>

export default {
    name: 'Client',
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
}
</script>


<style scoped>
#myChart {
    width: 100%;
    height: 400px;
}
</style>
