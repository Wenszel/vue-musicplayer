<template>
  <div id="app">
    <div id="menu">
      <!--Displays selection menu of albums-->
      <div class="covers-container">
        <Cover v-for="album in dirs" :key="album" :album="album"></Cover>
      </div>
      <!--Displays songs of album-->
      <div class="items-container">
        <Item v-for="song in files" :key="song.file" :song="song"></Item>
      </div>
    </div>
    <MusicPlayer/>
  </div>
</template>

<script>
//importing components
import Cover from './components/Cover.vue'
import Item from './components/Item.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    Item, Cover, MusicPlayer
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
  *{
    margin: 0px;
    padding: 0px;
  }
  #menu{
    display: flex;
    flex-direction: row;
  }
  .items-container{
    display: flex;
    flex-direction: column;
  }
  .covers-container{
    overflow: scroll;
  }
</style>
