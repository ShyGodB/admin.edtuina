<template>
    <div id="OrderDetail">
        <div>{{ order.orderId }}</div>
        <div>{{ user.userId }}</div>
        <div>{{ tech.techId }}</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "OrderDetail",
    data() {
      return {
        order: {},
        user: {},
        tech: {}
      }
    },
    methods: {
      getOrderDetail(orderId) {
        axios({
          method: "post",
          url: "/api/admin/order/detail",
          responseType: "json",
          data: { orderId }
        }).then(res => {
          this.order = res.data.order
          this.user = res.data.user
          this.tech = res.data.tech
        });
      }
    },
    created() {
      this.getOrderDetail(this.$store.state.orderId)
    }
  };
  </script>
  
  <style scoped>
  </style>
  