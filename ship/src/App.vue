<template>
  <div id="app">
    <div id="bg"></div>
    <el-container>
      <el-header>管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col>
              <el-menu
                default-active="2"
                router
              >
                <el-menu-item
                  v-for="(item, i) in navList"
                  :key="i"
                  :index="item.name"
                >
                  <i :class="item.icon"> {{ item.navItem }}</i>
                </el-menu-item>
              </el-menu>
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
        { name: '/desk', navItem: '桌位', icon: 'el-icon-s-grid' },
        { name: '/vip', navItem: '会员', icon: 'el-icon-user-solid' },
        { name: '/goods', navItem: '库存', icon: 'el-icon-s-shop' },
        { name: '/records', navItem: '统计', icon: 'el-icon-s-data' }
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
