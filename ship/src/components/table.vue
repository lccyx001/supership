<template>
  <div class="desk">
    <el-row class="add-table">
      <el-col :offset="11">
        <router-link to="/add_table">添加桌位</router-link>
      </el-col>
    </el-row>

    <el-row class="row-con">
      <el-col :span="4" v-for="(table, index) in tables" :key="index">
        <el-card class="card">
          <div class="card-size">
            <div>
              <span>{{ table.name }}</span>
              <router-link
                :to="{ path: '/table_detail', query: { tableId: table.id } }"
                >详情</router-link
              >
            </div>

            <div class="bottom clearfix">
              <div>
                <span>时长:</span>
                <span>{{ table.duration }}</span>
              </div>
              <div>
                <span>开始时间:</span>
                <span>{{ table.start }}</span>
              </div>
              <div>
                <span>结束时间:</span>
                <span>{{ table.end }}</span>
              </div>
              <span>{{ table.free }}</span>
              <span v-if="table.free == '空闲'">
                <router-link
                  :to="{
                    path: '/order',
                    query: { tableId: table.id, name: table.name },
                  }"
                  >下单</router-link
                >
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "desk",
  data() {
    return {
      currentDate: new Date(),
      tables: [
        {
          name: "一号桌",
          free: "空闲",
          start: "",
          end: "",
          id: null,
          duration: "",
        },
      ],
    };
  },

  mounted: function () {
    // this.loadTables();
  },

  methods: {
    loadTables() {
      let _this = this;
      this.$axios
        .get("/table/list")
        .then((res) => {
          if (res.data.code === 200) {
            _this.tables = [];
            res.data.data.forEach((element) => {
              _this.tables.push({
                name: element.name,
                free: element.isfree == 0 ? "空闲" : "使用中",
                start: element.starttime ? element.starttime : "--",
                end: element.stoptime ? element.stoptime : "--",
                id: element.id,
                duration: element.duration ? element.duration : "--",
              });
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.desk {
}
.add-table {
  font-size: 20px;
}
.card-size {
  padding: 14px;
  /* width: 175px;
  height: 165px; */
}
.row-con {
  display: flex;
  flex-flow: row wrap;
}
.row-con .card {
  height: 100%;
}
</style>
