<template>
    <div id="tool-agentCascader" class="block">
        <el-cascader
            v-model="proxyCodes"
            :options="options"
            size="medium"
            :props="{ expandTrigger: 'hover', size: 'medium' }"
            @change="handleChange">
        </el-cascader>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import api from '../../../util/api'
  
  export default {
    name: "tool-agentCascader",
    data() {
      return {
        proxyCodes: [],
        options: []
      }
    },
    methods: {
        handleChange(proxyCodes) {
            console.log(proxyCodes)
            this.$store.state.proxyCodes = proxyCodes
            this.$emit('getProxyCodes', proxyCodes)
        },
        async listAgent() {
            const res = await this.$api.get('/api/admin/agent/list', {})
            this.options = res.data.data
        }
    },
    created() {
      this.listAgent()
    }
  };
  </script>
  
  <style scoped>
  </style>
  