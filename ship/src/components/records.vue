<template>
  <div class="records">
    <el-divider>销售记录</el-divider>
    <el-table :data="records" stripe style="width: 100%">
      <el-table-column prop="create_time" label="时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="桌位" width="120"> </el-table-column>
      <el-table-column prop="member_name" label="会员" width="120">
      </el-table-column>
      <el-table-column prop="price" label="消费" width="120"> </el-table-column>
      <el-table-column prop="goods" label="消费详情"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script>
export default {
  name: "records",
  mounted: function () {
    this.getTotal();
    console.log(this.total);
    this.getRecords(this.page, this.size);
  },
  methods: {
    getTotal() {
      let _this = this;
      this.$axios
        .get("records/count")
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            _this.total = res.data.data.count;
          } else alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    manage(idx, row) {
      console.log(idx, row);
    },
    sizeChange(size) {
      this.size = size;
      this.getRecords(this.page, this.size);
    },
    currentChange(page) {
      this.page = page;
      this.getRecords(this.page, this.size);
    },
    getRecords(page, size) {
      let _this = this;
      this.$axios
        .post("records/list", { page: page, size: size })
        .then((res) => {
          if (res.data.code === 200) {
            _this.records = [];
            res.data.data.forEach((element) => {
              let goods_str = "";
              element.goods.forEach((good) => {
                goods_str += good.name + ":" + good.numbers + ",";
              });
              goods_str = goods_str.substr(0, goods_str.length - 1);
              _this.records.push({
                id: element.id,
                name: element.name,
                member_id: element.member_id,
                member_name: element.member_name,
                price: element.price,
                table_id: element.table_id,
                table_name: element.table_name,
                create_time: element.create_time,
                update_time: element.update_time,
                goods: goods_str,
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
      records: [],
      size: 10,
      page: 1,
      total: 0,
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
