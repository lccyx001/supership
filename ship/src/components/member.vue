<template>
  <div class="member">
    <el-dialog
      title="生成订单"
      :visible.sync="orderDialog"
    >
      <div>
        <el-table
          :data="roomData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="房间号"
            width="120"
          > </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="120"
          > </el-table-column>
          <el-table-column
            prop="cashPledge"
            label="押金"
            width="80"
          > </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <!-- <el-button
            size="mini"
            type="primary"
            @click="detail(scope.$index, scope.row)"
          >查看详情</el-button> -->
              <el-button
                v-if="scope.row.isFree"
                size="mini"
                type="primary"
                @click="choose(scope.$index, scope.row)"
              >选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="orderDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="orderDialog = false"
        >确 定</el-button>
      </span> -->
    </el-dialog>

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

      <el-table-column
        prop="id"
        label="编号"
        width="120"
      > </el-table-column>
      <el-table-column
        prop="name"
        label="游轮名称"
        width="120"
      > </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="80"
      > </el-table-column>
      <el-table-column
        prop="discont"
        label="优惠价格"
        width="80"
      > </el-table-column>
      <el-table-column
        prop="date"
        label="出发日期"
      > </el-table-column>
      <el-table-column
        prop="des"
        label="起始站-终点站"
      >
      </el-table-column>
      <el-table-column>
        <template
          slot="header"
          slot-scope="scope"
        >
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入轮船名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="primary"
            @click="detail(scope.$index, scope.row)"
          >查看详情</el-button> -->
          <el-button
            size="mini"
            type="primary"
            @click="openOrder(scope.$index, scope.row)"
          >预订</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'member',
  mounted: function () {
    this.getMembers()
  },
  methods: {
    openOrder (idx, row) {
      this.getRoom(row.id)
      this.orderDialog = true
    },
    choose (idx, row) {
      let _this = this
      console.log(this.$store.state.token)
      this.$axios
        .post('Ship/buyTicket', { shipId: row.shipid, tookenId: this.$store.state.token, roomId: row.id })
        .then((res) => {
          if (res.data.errcode >= 0) {
            _this.$message({
              message: '恭喜你，下单成功',
              type: 'success'
            })
            _this.orderDialog = false
          } else alert('Failed on Ship/buyTicket')
        })
        .catch((err) => {
          alert(err)
        })

    },
    getRoom (shipId) {
      let _this = this
      this.$axios
        .post('Ship/getAllRoom', { shipId: shipId })
        .then((res) => {
          if (res.data.errcode >= 0) {
            const cashPledge = res.data.data.cashPledge
            const roomRange = res.data.data.roomRange
            const priceLev = res.data.data.priceLev
            const reserve = res.data.data.reserve
            const shipid = res.data.data.shipId
            for (let index = 0; index < roomRange; index++) {
              _this.roomData.push({
                id: index + 1,
                cashPledge: cashPledge,
                price: priceLev[parseInt(index / (roomRange / priceLev.length))],
                isFree: reserve.indexOf(index + 1) < 0,
                shipid: shipid
              })
            }
          } else alert('Failed on Ship/getAllRoom')
        })
        .catch((err) => {
          alert(err)
        })
    },
    getMembers () {
      let _this = this
      this.$axios
        .post('Ship/getshipticket', {})
        .then((res) => {
          console.log(res.data.errcode)
          if (res.data.errcode >= 0) {
            res.data.data.forEach((element) => {
              _this.tableData.push({
                id: element.Id,
                name: element.Name,
                price: element.Price,
                discont: element.Discout,
                date: element.Date,
                des: element.Des
              })
            })
          } else alert('Failed on Ship/getshipticket')
        })
        .catch((err) => {
          alert(err)
        })
    }
  },
  data () {
    return {
      tableData: [],
      roomData: [],
      search: '',
      orderDialog: false
    }
  }
}
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
