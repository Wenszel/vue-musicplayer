<template>
  <div id="app hide">
    <div id="menu">
      <!--Displays selection menu of albums-->
      <div class="container">
        <div class="cover-container" @click="handleLikedSongsClicked">
          <span class="icon-heart"></span>
        </div>
        <Cover v-for="album in dirs" :key="album" :album="album"></Cover>
      </div>
      <!--Displays songs of album-->
      <div class="container items-container">
        <span class="current-album">{{currentlyViewedAlbum}}</span>
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
    currentlyViewedAlbum(){
      return this.$store.getters.getCurrentlyViewedAlbum;
    },
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
  @-moz-document url-prefix() {
  .hide {
    overflow: hidden;
  }
}
  ::-webkit-scrollbar {
    width: 10px;
    
  }
  ::-webkit-scrollbar-track {
    background: #121212;
  }
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    color: #999;
  }
  #app{
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
  #menu{   
    font-family: 'Roboto', sans-serif;
    background-color: #121212;
    display: flex;
    flex-direction: row;
  }
  .container{
    color: white;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
  .cover-container{
    width: 200px;
    height: 200px;
  }
  .items-container{
    width: calc(100% - 200px);
  }
  .current-album{
    font-family: 'Roboto 300', 'sans-serif';
    font-size: 50px;
    width: 100%;
    text-align: center;
  }
</style>
