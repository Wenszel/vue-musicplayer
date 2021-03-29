<template>
  <div class="item-container" v-bind:style="currentSong===this.song.file ? {backgroundColor: 'lightblue'} : null">
    <span class="album-name">{{currentlyViewedAlbum}}</span>
    <span class="song-name">{{song.file}}</span>
    <span class="song-size">{{song.size}}</span>
    <div class="player-button" @click="handlePlayerClick" v-text="currentSong === song.file && isCurrentlyPlaying ? '||' : '>'"></div>
  </div>
</template>

<script>

import convertSecToTime from '../convertSecToTime'

export default {
  name: 'Item',
  methods:{
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
          let time = Math.floor(e.target.duration);
          commit("SET_SONG_DURATION", convertSecToTime(time));       
          e.target.play();
          // Every seconds updates passed time of current song
          e.target.ontimeupdate = e => {
            commit("SET_CURRENT_TIME", convertSecToTime(Math.floor(e.target.currentTime)));
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
  border-bottom: 1px solid black;
  flex-direction: row;
}
.item-container>div{
  position: absolute;
  height: 40px !important;
  width: 40px !important;
  right: 0;
}
.song-name{
  width: 500px;
}
.song-size{
  width:50px;
}
.item-container>span{
  margin:10px;
}
</style>
