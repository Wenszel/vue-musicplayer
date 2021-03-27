<template>
  <div class="item-container">
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
      if(!this.isCurrentlyPlaying || (this.isCurrentlyPlaying && this.currentSong !== this.song.file)){
        commit("SET_CURRENT_SONG", this.song.file);
        commit("SET_IS_CURRENTLY_PLAYING", true)
        commit("SET_CURRENT_SONG_PATH");
        audioEl.load();
        //When song is loaded this listener handle song duration events
        audioEl.onloadeddata = e => {  
          let time = Math.floor(e.target.duration);
          commit("SET_CURRENT_SONG_DURATION", convertSecToTime(time));       
          e.target.play();
          //every seconds updates passed time of current song
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
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    isCurrentlyPlaying(){
      return this.$store.getters.getIsCurrentlyPlaying;
    }

  },
  props: ['song','isPlaying']
}
</script>

<style>
.item-container{
  display: flex;
  flex-direction: row;
}
.song-name{
  width: 500px;
  background-color: cyan;
}
.song-size{
  width:50px;
  background-color:cyan;
}
.item-container>span{
  margin:10px;
}
</style>
