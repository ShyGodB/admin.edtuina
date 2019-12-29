<template>
  <div id="Project">
    <div class="order-search">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="技师i姓名" prop="techName">
              <el-input v-model="ruleForm.techName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="技师手机" prop="techPhone">
              <el-input v-model="ruleForm.techPhone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户姓名" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户手机" prop="userPhone">
              <el-input v-model="ruleForm.userPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="project-table">
      <el-table :data="projects" style="width: 100%">
        <el-table-column prop="projectId" label="技师姓名" width="120" height="120"></el-table-column>

        <el-table-column
          prop="cityIds"
          class="table-userName"
          label="适用城市"
          width="120"
          height="120"
        ></el-table-column>

        <el-table-column prop="name" label="危险" width="80" height="120"></el-table-column>

        <el-table-column prop="originalPrice" label="原价" width="120" height="120"></el-table-column>

        <el-table-column prop="price" label="默认价格" width="160" height="120"></el-table-column>

        <el-table-column prop="isFirst" label="是否首单" width="120" height="120"></el-table-column>

        <el-table-column prop="time" label="时长" width="100" height="120"></el-table-column>

        <el-table-column prop="category" label="项目类别" width="100" height="120"></el-table-column>

        <el-table-column prop="view" label="展示属性" width="100" height="120"></el-table-column>

        <el-table-column prop="saleCount" label="销售量" width="100" height="120"></el-table-column>

        <el-table-column prop="sort" label="排序" width="180" height="120"></el-table-column>

        <el-table-column prop="state" label="状态" width="80" height="120"></el-table-column>

        <el-table-column label="操作" height="120">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="info(scope.$index, scope.row)" round>详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          ref="fenye"
          background
          @size-change="sizeChange"
          @current-change="change"
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :page-count="pageIndex"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Project",
  data() {
    return {
      projects: [],
      pageIndex: 1,
      pageSize: 10,
      ruleForm: {
        techName: "",
        techPhone: "",
        userName: "",
        userPhone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      loading: true
    };
  },
  methods: {
    info(index, row) {
      this.$message({
        message: "暂未完成",
        type: "success"
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listProject(this.ruleForm);
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change(num) {
      console.log("------pageIndex", num);
      this.pageIndex = num;
      this.listProject(this.ruleForm);
    },
    sizeChange(num) {
      // this.listProject(this.ruleForm);
    },
    listProject(data) {
      console.log("-----", data);
      axios({
        method: "post",
        url: "/api/admin/other/listProject",
        responseType: "json",
        data: data
      }).then(res => {
        console.log(res);
        this.projects = res.data.data.list || [];
        this.pageIndex = Math.floor((res.data.data.count || 0) / this.pageSize);
        if (res.data.data.count % this.pageSize !== 0) {
          this.pageIndex += 1;
        }
      });
    }
  },
  created() {
    this.listProject(
      Object.assign(
        {},
        this.ruleForm,
        { pageIndex: this.pageIndex },
        { pageSize: this.pageSize }
      )
    );
  }
};
</script>

<style scoped>
</style>
