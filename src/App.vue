<template>
  <div id="app">
    <div class="covers-container">
      <Cover v-for="album in dirs" :key="album" :album="album"></Cover>
    </div>
    <div class="items-container">
    <Item v-for="song in files" :key="song.file" :song="song"></Item>
    </div>
  </div>
</template>
<script>

import Cover from './components/Cover.vue'
import Item from './components/Item.vue'
  
export default {
  name: 'App',
  components: {
    Item, Cover
  },
  methods:{
  },
  computed: { 
    dirs(){
      return this.$store.getters.getAllDirs;
    },
    files(){
      return this.$store.getters.getAllFiles;
    }
},
  mounted: function(){
    this.$store.dispatch("getAlbums");
}
}
</script>
<style>

</style>
