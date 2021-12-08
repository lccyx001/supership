<template>
  <div class="index">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-col :span="8">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="8">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      const _this = this;
      this.$axios
        .post("login", {
          name: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((res) => {
          if (res.data.code == 200) {
            _this.$store.commit("SET_TOKEN", res.data.token);
            _this.$store.commit("GET_USER", res.data.user);
            _this.$message({
              message: "登陆成功",
              type: "success",
            });
            _this.$router.push({ name: "desk" });
          } else {
            _this.$message.error("用户名密码错误");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
</style>
