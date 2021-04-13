<template>
  <div class="item-container" v-bind:style="currentSong===song.file ? {backgroundColor: '#2a2a2a'} : null">
    <div class="player-button" @click="handlePlayerClick">
      <span :class="currentSong === song.file && isCurrentlyPlaying ? 'icon-pause' : 'icon-play'"></span>
    </div>
    
    <span class="song-name">{{song.file}}</span>
    <span class="album-name">{{song.album}}</span>
    <span class="song-size">{{song.size}}</span>
    <div class="player-button like-button" @click="handleLikeButtonClick">
      <span :class="song.isLiked ? 'icon-heart' : 'icon-heart-empty'"></span>
    </div>
    
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'Item',
  methods:{
    handleLikeButtonClick(){
      axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'likeSong', file: this.song.file, album: this.song.album, size: this.song.size}}))
      .then(response => {
        this.song.isLiked = !response.data.isLiked
      });
    },
    handlePlayerClick(){
      let { commit } = this.$store;
      let audioEl = document.getElementById("audio");
      // Play track if players is stopped or chosen other song
      if(!this.isCurrentlyPlaying || (this.isCurrentlyPlaying && this.currentSong !== this.song.file)){
        // Changing player data
        commit("SET_IS_CURRENTLY_PLAYING", true);
        commit("SET_CURRENT_SONG", this.song.file);
        commit("SET_CURRENT_ALBUM", this.currentlyViewedAlbum);
        commit("SET_ALBUM_SONGS", this.files);
        // Loads track to player based on the data above
        audioEl.load();
        // When song is loaded this listener handle song duration events
        audioEl.onloadeddata = e => {  
          console.log(audioEl.src);
          //console.log(e.target.duration);
          //console.log(e.target)
          commit("SET_SONG_DURATION", Math.floor(e.target.duration));       
          e.target.play();
          // Every seconds updates passed time of current song
          e.target.ontimeupdate = e => {
            commit("SET_CURRENT_TIME", Math.floor(e.target.currentTime));
          };     
        };
        audioEl.play();
      }else{
        commit("SET_IS_CURRENTLY_PLAYING", false);
        audioEl.pause();
      }
    }
  },
  computed: {
    files(){
      return this.$store.getters.getAllFiles;
    },
    currentlyViewedAlbum(){
      return this.$store.getters.getCurrentlyViewedAlbum;
    },
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    isCurrentlyPlaying(){
      return this.$store.getters.getIsCurrentlyPlaying;
    }
  },
  props: {
    song: Object,
  }
}
</script>

<style>
.item-container{
  display: flex;
  align-items: center;
  justify-content:center;
  height: 40px;
  width: 100%;
  flex-direction: row;
}
.item-container:hover{
  background-color: #2a2a2a;
}
.song-name{
  font-family: 'Roboto 300', sans-serif;
  width: 600px;
}
.album-name{
  width: 300px;
}
.song-size{
  width:50px;
}
.item-container>span{
  margin:10px;
}
</style>
