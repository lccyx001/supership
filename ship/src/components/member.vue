<template>
  <div class="member">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.phone.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="50"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="phone" label="电话号码"> </el-table-column>
      <el-table-column prop="levels" label="等级" width="50"> </el-table-column>
      <el-table-column prop="points" label="当前积分" width="120"> </el-table-column>
      <el-table-column prop="history_points" label="历史积分">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入电话号码搜索"
          />
        </template>
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
    <router-link to="/add_member">添加Vip</router-link>
  </div>
</template>

<script>
export default {
  name: "member",
  mounted: function () {
    this.getMembers();
  },
  methods: {
    manage(idx, row) {
      console.log(idx, row);
    },
    getMembers() {
      let _this = this;
      this.$axios
        .get("member/list")
        .then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              _this.tableData.push({
                id: element.id,
                name: element.name,
                levels: element.levels,
                phone: element.phone,
                points: element.points,
                history_points: element.history_points,
                create_time: element.create_time,
                update_time: element.update_time,
              });
            });
          } else alert(_this.data.message);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
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
