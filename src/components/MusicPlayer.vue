<template>
<div class="player-container">
  <audio id="audio">
    <source src="http://localhost:3000/static/mp3/album1/01 Czlowiek z dziura zamiast krtani.mp3"
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
      this.load();
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
    song(){
      return this.$store.getters.getCurrentSong;
    }
  },
  mounted: function(){
    this.$store.dispatch("getAlbums");
}
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
    height: 10vh;
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
