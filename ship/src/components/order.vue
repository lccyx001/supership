<template>
  <div class="order">
    <el-form :model="order" ref="order" label-width="80px" class="demo-dynamic">
      <el-form-item prop="tableName" label="桌号">
        <el-col :span="8">
          <el-input
            v-model="order.tableName"
            placeholder="桌号"
            disable
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        v-for="(record, index) in order.records"
        :label="'消费品' + index"
        :key="record.key"
        :prop="'records.' + index + '.value'"
        :inline="true"
      >
        <el-col :span="4">
          <el-select
            v-model="order.records[index].value"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.numbers <= 0"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.numbers
              }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1">--</el-col>
        <el-col :span="2">
          <el-input
            @change="
              (val) => {
                checkRest(val, index);
              }
            "
            v-model="order.records[index].numbers"
            placeholder="数量"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">下单</el-button>
        <el-button @click="add">新增</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      goods: [],
      order: {
        tableid: null,
        records: [],
        tableName: "",
        id: null,
      },
      isappend: false,
    };
  },
  mounted: function () {
    this.initOrder();
    this.initGoods();
  },
  methods: {
    initOrder() {
      this.order.tableid = this.$route.query.tableId;
      this.order.tableName = this.$route.query.name;
      this.order.records = [];
      let _this = this;
      this.$axios
        .post("table/detail", { id: this.order.tableid })
        .then((res) => {
          if (res.data.code === 200 && res.data.data.goods) {
            for (let index = 0; index < res.data.data.goods.length; index++) {
              const element = res.data.data.goods[index];
              _this.order.records.push({
                key: index + 1,
                value: element.id,
                numbers: element.numbers,
                isnew: 0,
              });
            }
            _this.order.id = res.data.data.record_id;
            _this.isappend = true;
          } else {
            this.order.records = [
              {
                key: 1,
                value: "",
                numbers: null,
              },
            ];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initGoods() {
      this.$axios
        .get("goods/list")
        .then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              this.goods.push({
                id: element.id,
                numbers: element.numbers,
                price: element.price,
                name: element.name,
              });
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    mergeForm(records) {
      let newRecords = {};
      records.forEach((element) => {
        console.log(newRecords.hasOwnProperty(element.value), element.value);
        if (newRecords.hasOwnProperty(element.value))
          newRecords[element.value] += element.numbers;
        else newRecords[element.value] = element.numbers;
      });
    },
    submitForm() {
      let _this = this;
      const url = this.isappend ? "records/append" : "records/add";
      if (this.isappend) console.log(this.order.records);
      this.$axios
        .post(url, {
          name: this.order.tableName,
          table: this.order.tableid,
          goods: this.order.records,
          records_id: this.order.id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.$message({
              message: "添加成功",
              type: "success",
            });
            _this.$router.push({
              name: "tableDetail",
              query: { tableId: this.order.tableid },
            });
          } else _this.$message.error("添加失败");
        })
        .catch((err) => {
          alert(err);
        });
    },
    reset() {
      this.initOrder();
    },
    remove(item) {
      var index = this.order.records.indexOf(item);
      if (index !== -1) {
        this.order.records.splice(index, 1);
      }
    },
    add() {
      let len = this.order.records.length;
      this.order.records.push({
        value: "",
        key: len + 1,
        isnew: 1,
        numbers: null,
      });
    },
    checkRest(val, idx) {
      let warn = false;
      let name = "";
      this.goods.forEach((good) => {
        if (good.id == this.order.records[idx].value) {
          if (val > good.numbers) {
            warn = true;
            name = good.name;
            return;
          }
          good.numbers -= parseInt(val);
        }
      });
      if (warn) this.$message.error(name + "数量超过库存数量");
    },
  },
};
</script>

<style scoped>
.order {
  color: #fff;
}
</style>
