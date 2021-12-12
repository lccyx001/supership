<template>
  <div id="app">
    <div id="bg"></div>
    <el-container>
      <el-header>管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col>
              <el-menu router>
                <el-submenu
                  v-for="(item, i) in navList"
                  :key="i"
                  :index="item.name"
                >
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.navItem}}</span>
                  </template>
                  <el-menu-item
                    v-for="(gp,gpi) in item.groups"
                    :index="gp.name"
                    :key="gpi"
                  >
                    <template slot="title">
                      <i :class="gp.icon"></i>
                      <span>{{gp.navItem}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <!-- <el-footer>{{ welcome }}</el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {},
  data () {
    return {
      welcome: '欢迎来到管理系统',
      navList: [
        // 第一个目录
        {
          name: '/desk', idx: '1', navItem: '游轮客房管理', icon: 'el-icon-s-grid',
          groups: [
            { idx: '1-1', name: '/', navItem: '登记管理（预订、登船、换仓）', icon: 'el-icon-wallet' },
            { idx: '1-2', name: '/', navItem: '消费结账', icon: 'el-icon-tickets' },
            { idx: '1-3', name: '/', navItem: '补交押金', icon: 'el-icon-discount' },
            { idx: '1-4', name: '/', navItem: '打印明细', icon: 'el-icon-news' }
          ]
        },
        // 第二个目录
        {
          name: '/records', idx: '2', navItem: '信息查询管理', icon: 'el-icon-s-data', groups: [
            { idx: '1-1', name: '/', navItem: '查询用户信息', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询客房信息', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询物品消耗', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询清洁状态', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询销售进度', icon: 'el-icon-wallet' }

          ]
        },
        // 第三个目录
        {
          name: '/vip', idx: '3', navItem: '用户功能', icon: 'el-icon-user-solid', groups: [
            { idx: '1-1', name: '/vip', navItem: '游轮查询', icon: 'el-icon-date' },
            { idx: '1-1', name: '/table_detail', navItem: '个人信息', icon: 'el-icon-user' },
            // { idx: '1-1', name: '/', navItem: '积分管理', icon: 'el-icon-wallet' },
            // { idx: '1-1', name: '/', navItem: '优惠信息', icon: 'el-icon-wallet' }
          ]
        }
        // { name: '/goods', navItem: '库存', icon: 'el-icon-s-shop' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
#bg {
  width: 100%;
  height: 100%;
}
</style>
