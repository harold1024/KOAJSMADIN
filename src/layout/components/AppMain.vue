<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
        </keep-alive>
         暂时去掉缓存与动画，缓存有问题，动画切换也太慢

      </transition> -->
      
          <component :is="Component" :key="route.path"/>
    </router-view>
  </section>
</template>

<script setup>
import useTagsViewStore from '@/store/modules/tagsview'

const tagsViewStore = useTagsViewStore()
const route = useRoute()
tagsViewStore.addCachedView(route)
const cachedViews = computed(() => {
    return tagsViewStore.cachedViews
})

</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>