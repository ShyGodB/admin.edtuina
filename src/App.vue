<template>
    <el-container style="padding: 0;">
        <el-header>
            <mainnav></mainnav>
        </el-header>

        <el-main>
            <mainbox></mainbox>
        </el-main>

        <el-footer>
            <!-- <mainfoo></mainfoo> -->
        </el-footer>
    </el-container>
</template>


<script>
import Mainnav from "./components/Mainnav.vue";
import Foo from "./components/Footer.vue";
import Content from "./components/Content.vue";
import Login from "./views/Login.vue";

export default {
    name: "app",
    components: {
        mainnav: Mainnav,
        mainfoo: Foo,
        mainbox: Content,
        login: Login
    },
    data () {
        return {
            tab: "",
            hasUser: false,
            routeName: ""
        };
    },
    created () {
        console.log(123);
        this.hasUser = this.$store.state.hasUser;
        // this.routeName = this.$route.name;
    }
};
</script>


<style scoped>
#mainnav {
    margin-bottom: 20px;
}
</style>
