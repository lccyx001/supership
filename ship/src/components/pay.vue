<template>
  <div class="pay">
    <el-form ref="form" :model="form" label-width="auto">
      <el-form-item label="手机号">
        <el-col :span="8"><el-input v-model="form.name"></el-input></el-col>
      </el-form-item>
      <el-form-item label="单价(元/小时)">
        <el-col :span="8"><el-input v-model="form.price"></el-input></el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="8">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data() {
    return {
      form: {
        name: '',
        price: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this
      this.$axios
        .post('/table/add', {
          name: this.form.name,
          price: this.form.price
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.$message({
              message: '创建成功',
              type: 'success'
            })
            _this.$router.push({ name: 'desk' })
          } else {
            _this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
</style>
