<template>
  <div id="app">
    <div id="menu">
      <!--Displays selection menu of albums-->
      <div class="covers-container">
        <Cover v-for="album in dirs" :key="album" :album="album"></Cover>
      </div>
      <!--Displays songs of album-->
      <div class="items-container">
        <Item 
          v-for="song in files" 
          :key="song.file" 
          :song="song" 
        />       
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
  #app{
    height: 100vh;
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
    height: calc(100% - 70px);
    overflow: scroll;
  }
</style>
