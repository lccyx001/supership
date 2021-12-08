<template>
  <div class="goods">
    <el-table :data="goods" stripe style="width: 100%">
      <el-table-column prop="create_time" label="进货日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="price" label="单价(元)"> </el-table-column>
      <el-table-column prop="bid" label="进价(元)"> </el-table-column>
      <el-table-column prop="numbers" label="库存剩余"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="manage(scope.$index, scope.row)"
            >管理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <router-link to="/add_goods">添加货物</router-link>
  </div>
</template>

<script>
export default {
  name: "goods",
  mounted: function () {
    this.getGoods();
  },
  methods: {
    manage(idx, row) {
      console.log(idx, row);
    },
    getGoods() {
      let _this = this;
      this.$axios
        .get("goods/list")
        .then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              _this.goods.push({
                id: element.id,
                name: element.name,
                numbers: element.numbers,
                price: element.price,
                rest: element.rest,
                bid: element.bid,
                create_time: element.create_time,
                update_time: element.update_time,
              });
            });
          } else alert(_this.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  data() {
    return {
      goods: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
