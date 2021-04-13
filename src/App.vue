<template>
  <div id="app">
    <div id="menu">
      <!--Displays selection menu of albums-->
      <div class="container">
        <div class="cover-container" @click="handleLikedSongsClicked"><span class="icon-heart"></span></div>
        <Cover v-for="album in dirs" :key="album" :album="album"></Cover>
      </div>
      <!--Displays songs of album-->
      <div class="container items-container">
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
import axios from "axios"
import Cover from './components/Cover.vue'
import Item from './components/Item.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    Item, Cover, MusicPlayer
  },
  methods:{
    handleLikedSongsClicked(){
      axios.post('http://localhost:3000/', JSON.stringify({body:{action:"likedSongs"}}))
      .then( response => {
        this.$store.commit('SET_FILES', response.data);
        console.log(response.data);
      });
    }
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
    width: 100vw;
    height: 100vh;
  }
  #menu{   
    display: flex;
    flex-direction: row;
  }
  .container{
    background-color: lightgrey;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .covers-container{
    width: 200px;
  }
  .items-container{
    font-weight: bold;
    width: calc(100vw - 200px);
  }
</style>
