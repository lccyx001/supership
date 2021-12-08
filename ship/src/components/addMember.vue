<template>
  <div class="addMember">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="昵称">
        <el-col :span="8"><el-input v-model="form.name"></el-input></el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-col :span="8"><el-input v-model="form.phone"></el-input></el-col>
      </el-form-item>
      <el-form-item label="积分">
        <el-col :span="8"><el-input v-model="form.points"></el-input></el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="8"
          ><el-button type="primary" @click="onSubmit">创建</el-button
          ><el-button>取消</el-button></el-col
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addMember",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        points: 0,
      },
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.$axios
        .post("/member/add", {
          name: this.form.name,
          phone: this.form.phone,
          points: this.form.points,
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.$message({
              message: "创建成功",
              type: "success",
            });
            _this.$router.push({ name: "member" });
          } else {
            _this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
