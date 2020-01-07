<template>
    <div id="TimeDouble" class="block">
        <el-date-picker
            v-model="times"
            type="datetimerange"
            :picker-options="pickerOptions"
            @change="change"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
    </div>
  </template>
  
  <script>
  export default {
    name: "TimeDouble",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        times: []
      }
    },
    methods: {
        change(times) {
            this.$store.state.times = times
            this.$emit('getDoubleTime', times)
        }
    },
    created() {
     
    }
  };
  </script>
  
  <style scoped>
  </style>
  