<template>
<div class="player-container">
  <audio id="audio">
    <source
    :src="currentSongPath"
    id="audio_src"
    type="audio/mp3" />
  </audio>
  <div class="player-button" @click="previousSong">&#60;&#60;</div>
  <div class="player-button" @click="handleResumeClick">||</div>
  <div class="player-button" @click="nextSong">&#62;&#62;</div>
</div>

</template>

<script>
export default {
  name: 'MusicPlayer',
  methods: {
    handleResumeClick(){
      document.getElementById("audio").play();
      //document.getElementById("audio").pause();
    },
    load(){
      document.getElementById("audio").load();
    },
    previousSong(){

    },
    nextSong(){

    },
    
  },
  computed: {
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
