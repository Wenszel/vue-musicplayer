<template>
<div class="player-container">
  <audio id="audio">
    <source
    :src="currentSongPath"
    id="audio_src"
    type="audio/mp3" />
  </audio>
  <div class="player-button" @click="previousSong">&#60;&#60;</div>
  <div class="player-button" @click="handleResumeClick" v-text=" !currentSongPath || isCurrentlyPlaying ? '||' : '>'"></div>
  <div class="player-button" @click="nextSong">&#62;&#62;</div>
</div>

</template>

<script>
export default {
  name: 'MusicPlayer',
  methods: {
    handleResumeClick(){
      if(this.currentSongPath){
        if(!this.isCurrentlyPlaying){
          this.$store.commit("SET_IS_CURRENTLY_PLAYING", true)
          document.getElementById("audio").play();
        }else{
          this.$store.commit("SET_IS_CURRENTLY_PLAYING", false);
          document.getElementById("audio").pause();
        }
      }
      
    },
    previousSong(){
      let indexOfCurrentSong = this.files.findIndex(elem => elem.file == this.currentSong);
      let newSong;
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
      if(indexOfCurrentSong+1<this.files.length){
        newSong = this.files[indexOfCurrentSong+1].file;
      }else{
        newSong = this.files[0].file;
      }
      this.$store.commit("SET_CURRENT_SONG", newSong);
      this.playSong(); 
    },
    playSong(){
      this.$store.commit("SET_IS_CURRENTLY_PLAYING", true)
      this.$store.commit("SET_CURRENT_SONG_PATH");
      document.getElementById("audio").load();
      document.getElementById("audio").play();
    }
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
    flex-direction: row;
    justify-content:center;
    align-items: center;
    bottom:0;
    z-index: 1;
    width: 100vw;
    background-color: grey;
    height: 70px;
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
