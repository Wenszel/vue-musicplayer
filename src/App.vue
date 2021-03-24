<template>
  <div id="app">
    <div class="covers-container">
  <!--  <Cover v-for="album in dirs" v-bind:key="album" v-bind:album="album"></Cover>-->
    </div>
    <div class="items-container">
      {{dirs}}
      {{files}}
   <!-- <Item v-for="song in files" v-bind:key="song" v-bind:song="song"></Item>-->
    </div>
  </div>
</template>
<script>
//import Cover from './components/Cover.vue'
//import Item from './components/Item.vue'
  
export default {
  name: 'App',
  data: function() {
    return{
      dirs: [],
      covers: [],
      files: []
  }},
  components: {
  },
  methods:{
  },
  mounted: function(){
    this.$store.dispatch("getAlbums");
    //this.$store.dispatch("getCovers");
    this.dirs = this.$store.state.dirs;
    this.files = this.$store.state.files;
}
}
</script>
<style>

</style>
