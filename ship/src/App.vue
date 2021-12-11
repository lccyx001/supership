<template>
  <div id="app">
    <div id="bg"></div>
    <el-container>
      <el-header>管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col>
              <!-- <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item
                  index="3"
                  disabled
                >
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu> -->

              <!--  -->
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

              <!-- <el-menu
                default-active="2"
                router
              >
                <el-menu-item
                  v-for="(item, i) in navList"
                  :key="i"
                  :index="item.name"
                >
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.navItem}}</span>
                  </template>

                  <i :class="item.icon"> {{ item.navItem }}</i>
                </el-menu-item>
              </el-menu> -->
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>{{ welcome }}</el-footer>
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
        {
          name: '/desk', idx: '1', navItem: '游轮客房管理', icon: 'el-icon-s-grid',
          groups: [
            { idx: '1-1', name: '/', navItem: '登记管理（预订、登船、换仓）', icon: 'el-icon-wallet' },
            { idx: '1-2', name: '/', navItem: '消费结账', icon: 'el-icon-tickets' },
            { idx: '1-3', name: '/', navItem: '补交押金', icon: 'el-icon-discount' },
            { idx: '1-4', name: '/', navItem: '打印明细', icon: 'el-icon-news' }
          ]
        },
        {
          name: '/records', idx: '2', navItem: '信息查询管理', icon: 'el-icon-s-data', groups: [
            { idx: '1-1', name: '/', navItem: '查询用户信息', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询客房信息', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询物品消耗', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询清洁状态', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '查询销售进度', icon: 'el-icon-wallet' }

          ]
        },
        {
          name: '/vip', idx: '3', navItem: '用户功能', icon: 'el-icon-user-solid', groups: [
            { idx: '1-1', name: '/', navItem: '游轮查询', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '游轮预订', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '积分管理', icon: 'el-icon-wallet' },
            { idx: '1-1', name: '/', navItem: '优惠信息', icon: 'el-icon-wallet' }
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
