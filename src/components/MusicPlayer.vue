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
      <div class="player-button" 
        @click="handleResumeClick" 
        v-text="isCurrentlyPlaying ? '||' : '>'">
      </div>
      <div class="player-button" @click="nextSong">&#62;&#62;</div>
    </div>
    <div class="song-progress">
      <span v-text="currentSongPath ? convertSecToTime(currentTime)+'/'+convertSecToTime(songDuration) : ''">
      </span>
      <input 
      :style="currentSongPath? {display: 'block'} : {display: 'none'}"
      type="range" 
      :min="0" 
      :max="songDuration" 
      :value="currentTime" 
      @change="handleProgressBarChange">
    </div>
  </div>
</template>

<script>

import convertSecToTime from '../convertSecToTime'

export default {
  name: 'MusicPlayer',
  methods: {
    handleProgressBarChange(e){
      document.getElementById("audio").currentTime = e.target.value;
       this.$store.commit("SET_CURRENT_TIME", e.target.value);
    },
    handleResumeClick(){
      let { commit } = this.$store;
      let audioEl = document.getElementById("audio");
      // Checkes if song is chosen
      if(this.currentSongPath){
        // If song is stopped play it
        if(!this.isCurrentlyPlaying){
          // Load song and play it from the beginning or do nothing
          commit("SET_IS_CURRENTLY_PLAYING", true);
          audioEl.play();
        }else{
          commit("SET_IS_CURRENTLY_PLAYING", false);
          audioEl.pause();
        }  
      }       
    },
    // Handle previous song button click
    previousSong(){
      if(this.currentSongPath){
        this.$store.commit("SET_CURRENT_SONG", this.findNextSong(false));
        this.playSong();
      }
    },
    // Handle next song button click
    nextSong(){  
      if(this.currentSongPath){
        this.$store.commit("SET_CURRENT_SONG", this.findNextSong(true));
        this.playSong(); 
      }
    },
    /*
      Finds next or previous song
      next - boolean: next/previous song
    */
    findNextSong(next){
      let indexOfCurrentSong = this.albumSongs.findIndex(elem => elem.file == this.currentSong);
      if(next){
        // Returns next song or first song of album if current song is last 
        if(indexOfCurrentSong+1<this.albumSongs.length){
          return this.albumSongs[indexOfCurrentSong+1].file;
        }else{
          return this.albumSongs[0].file;
        }
      }else{
        // Returns previous song or last song of album if current song is first 
        if(indexOfCurrentSong-1>=0){
          return this.albumSongs[indexOfCurrentSong-1].file;
        }else{
          return this.albumSongs[this.albumSongs.length-1].file;
        }
      }
    },

    playSong(){
      let { commit } = this.$store;
      commit("SET_IS_CURRENTLY_PLAYING", true);
      // Loads song to player
      let audioEl = document.getElementById("audio");
      audioEl.load();
      // When loaded sets duration time in player
      audioEl.onloadeddata = e => {  
        commit("SET_SONG_DURATION", Math.floor(e.target.duration));    
        e.target.play();
        // Every seconds updates passed time of current song
        e.target.ontimeupdate = e => {
          commit("SET_CURRENT_TIME", Math.floor(e.target.currentTime));
        };     
      };
    },
    convertSecToTime: convertSecToTime,
  },

  computed: {
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    currentSongPath(){
      return this.$store.getters.getCurrentSongPath;
    },
    songDuration(){
      return this.$store.getters.getSongDuration;
    },
    isCurrentlyPlaying(){
      return this.$store.getters.getIsCurrentlyPlaying;
    },
    currentTime(){
      return this.$store.getters.getCurrentTime;
    },
    albumSongs(){
      return this.$store.getters.getAlbumSongs;
    },
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
    height: 10vh;
  }
  .current-song{
    position: absolute;
    left: 0;
  }
  .song-progress{
    display: flex;
    flex-direction: row;
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
