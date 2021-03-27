<template>
  <div class="player-container">
    <audio id="audio">
      <source
      :src="currentSongPath"
      id="audio_src"
      type="audio/mp3" />
    </audio>
    <span class="current-song">{{currentSong.replace(".mp3", "")}}</span>
    <div class="player-buttons">
      <div class="player-button" @click="previousSong">&#60;&#60;</div>
      <div class="player-button" @click="handleResumeClick" v-text=" !currentSongPath || isCurrentlyPlaying ? '||' : '>'"></div>
      <div class="player-button" @click="nextSong">&#62;&#62;</div>
    </div>
    <span class="song-progress">{{currentTime}}/{{currentSongDuration}}</span>
  </div>
</template>

<script>

import convertSecToTime from '../convertSecToTime'

export default {
  name: 'MusicPlayer',
  methods: {
    handleResumeClick(){
      let { commit } = this.$store;
      let audioEl = document.getElementById("audio");
      //If song is stopped play it
      if(!this.isCurrentlyPlaying){
        //Load song and play it from the beginning or do nothing
        this.currentTime == 0 ? document.getElementById("audio").load() : null;
        this.playSong();
      }else{
        commit("SET_IS_CURRENTLY_PLAYING", false);
        audioEl.pause();
      }     
    },
    previousSong(){
      let indexOfCurrentSong = this.files.findIndex(elem => elem.file == this.currentSong);
      let newSong;
       // Returns previous song or last song of album if current song is first 
      if(indexOfCurrentSong-1>=0){
        newSong = this.files[indexOfCurrentSong-1].file;
      }else{
        newSong = this.files[this.files.length-1].file;
      }
      this.$store.commit("SET_CURRENT_SONG", newSong);
      this.playSong();
    },

    nextSong(){  
      let indexOfCurrentSong = this.files.findIndex(elem => elem.file == this.currentSong);
      let newSong;
      // Returns next song or first song of album if current song is last 
      if(indexOfCurrentSong+1<this.files.length){
        newSong = this.files[indexOfCurrentSong+1].file;
      }else{
        newSong = this.files[0].file;
      }
      this.$store.commit("SET_CURRENT_SONG", newSong);
      this.playSong(); 
    },
    
    playSong(){
      let { commit } = this.$store;
      commit("SET_IS_CURRENTLY_PLAYING", true);
      commit("SET_CURRENT_SONG_PATH"); //sets path for server song request
      //loads song to player
      let audioEl = document.getElementById("audio");
      audioEl.load();
      //when loaded sets duration time in player
      audioEl.onloadeddata = e => {  
        let time = Math.floor(e.target.duration);
        commit("SET_CURRENT_SONG_DURATION", convertSecToTime(time));       
        e.target.play();
        //every seconds updates passed time of current song
        e.target.ontimeupdate = e => {
          commit("SET_CURRENT_TIME", convertSecToTime(Math.floor(e.target.currentTime)));
        };     
      };
    },
  },

  computed: {
    files(){
      return this.$store.getters.getAllFiles;
    },
    isCurrentlyPlaying(){
      return this.$store.getters.getIsCurrentlyPlaying;
    },
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    currentSongDuration(){
      return this.$store.getters.getCurrentSongDuration;
    },
    currentTime(){
      return this.$store.getters.getCurrentTime;
    },
    currentAlbum(){
      return this.$store.getters.getCurrentAlbum;
    },
    currentSongPath(){
      return this.$store.getters.getCurrentSongPath; 
    }
  },
}
</script>

<style>
  .player-container{
    position: -webkit-sticky; /* Safari */  
    position: sticky;
    display: flex;
    justify-content:center;
    align-items: center;
    bottom:0;
    z-index: 1;
    width: 100vw;
    background-color: grey;
    height: 70px;
  }
  .current-song{
    position: absolute;
    left: 0;
  }
  .song-progress{
    position: absolute;
    right: 0;
  }
  .player-buttons{
    
    display: flex;
    flex-direction:row;
    float: left;
  }
  .player-button{
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: blue;
  }
  .player-button:hover{
    cursor: pointer;
    background-color: lightblue;
  }
</style>
