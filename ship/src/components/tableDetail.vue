<template>
  <div class="tableDetail">
    <el-row :gutter="16">
      <el-col :span="4"><div>名称:</div></el-col>
      <el-col :span="12"
        ><div>{{ table.name }}</div></el-col
      >
    </el-row>
    <!-- <el-row :gutter="16">
      <el-col :span="4"><div>单价(元/每小时):</div></el-col>
      <el-col :span="12"
        ><div>{{ table.price }}</div></el-col
      >
    </el-row> -->
    <el-row :gutter="16">
      <el-col :span="4"><div>空闲:</div></el-col>
      <el-col :span="12"
        ><div>{{ table.isfree === 0 ? "空闲" : "使用中" }}</div></el-col
      >
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4"><div>开始时间:</div></el-col>
      <el-col :span="12"
        ><div>{{ table.starttime ? table.starttime : "--" }}</div></el-col
      >
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4"><div>结束时间:</div></el-col>
      <el-col :span="12"
        ><div>{{ table.stoptime ? table.stoptime : "--" }}</div></el-col
      >
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4"><div>时长(小时):</div></el-col>
      <el-col :span="12"
        ><div>{{ table.duration ? table.duration : "--" }}</div></el-col
      >
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4"><div>消费记录:</div></el-col>
      <el-col :span="12"
        ><div>
          <el-table
            :data="records"
            stripe
            style="width: 100%"
            show-summary
            :summary-method="summary"
          >
            <el-table-column prop="name" label="消费品名称" width="180">
            </el-table-column>
            <el-table-column prop="count" label="数量"> </el-table-column>
            <el-table-column prop="costs" label="价格(元/个)">
            </el-table-column>
          </el-table></div
      ></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="16">
      <el-col :span="4"><div>是否会员</div></el-col>
      <el-col :span="12">
        <el-radio-group v-model="member">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="16" v-if="member == true">
      <el-col :span="4"><div>电话</div></el-col>
      <el-col :span="12">
        <el-input placeholder="请输入会员电话号码" v-model="phone" clearable>
        </el-input>
      </el-col>
    </el-row>
    <router-link
      :to="{
        path: '/order',
        query: { tableId: table.id, name: table.name },
      }"
      >续单</router-link
    >

    <el-button plain type="primary" @click="checkBalance">结账</el-button>
  </div>
</template>

<script>
export default {
  name: "tableDetail",
  data() {
    return {
      table: {
        id: "",
        duration: "",
        starttime: "",
        stoptime: "",
        price: "",
        isfree: "",
        name: "",
        record_id: "",
      },
      summaryCosts: null,
      records: [],
      member: null,
      phone: "",
    };
  },
  mounted: function () {
    this.getTableDetail();
  },
  methods: {
    getTableDetail() {
      let _this = this;
      this.$axios
        .post("table/detail", { id: this.$route.query.tableId })
        .then((res) => {
          if (res.data.code === 200) {
            _this.table = res.data.data;
            res.data.data.goods.forEach((element) => {
              _this.records.push({
                name: element.name,
                count: element.numbers,
                costs: element.price,
              });
            });
          } else alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkBalance() {
      let _this = this;
      this.$axios
        .post("balance/check", {
          table_id: this.$route.query.tableId,
          summary: this.summaryCosts,
          phone: this.phone,
          record_id: this.table.record_id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.$message({
              message: "结算成功",
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
    summary(param) {
      const { columns, data } = param;
      const sums = [];
      let sum = 0;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        if (index === 1) {
          sums[index] = "--";
          return;
        }

        for (let idx = 0; idx < data.length; idx++) {
          const element = data[idx];
          sum += element.costs * element.count;
        }
        sums[index] = sum;
        return;
      });
      this.summaryCosts = sum;
      return sums;
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
