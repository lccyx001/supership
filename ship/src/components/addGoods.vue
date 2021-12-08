<template>
  <div class="addGoods">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-col :span="8"><el-input v-model="form.name"></el-input></el-col>
      </el-form-item>
      <el-form-item label="进价">
        <el-col :span="8"><el-input v-model="form.bid"></el-input></el-col>
      </el-form-item>
      <el-form-item label="售价">
        <el-col :span="8"><el-input v-model="form.price"></el-input></el-col>
      </el-form-item>
      <el-form-item label="数量">
        <el-col :span="8"><el-input v-model="form.numbers"></el-input></el-col>
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
  name: "addGoods",
  data() {
    return {
      form: {
        name: "",
        bid: "",
        price: "",
        numbers: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.$axios
        .post("/goods/add", {
          name: this.form.name,
          bid: this.form.bid,
          price: this.form.price,
          numbers: this.form.numbers,
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.$message({
              message: "创建成功",
              type: "success",
            });
            _this.$router.push({ name: "goods" });
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
