<template>
  <div class="item-container">
    <span class="song-name">{{song.file}}</span>
    <span class="song-size">{{song.size}}</span>
    <div class="player-button" @click="playSong" v-text="this.currentSong === song.file ? '||' : '>'"></div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  methods:{
    playSong(){
      this.$store.commit("SET_CURRENT_SONG", this.song.file);
      this.$store.commit("SET_CURRENT_SONG_PATH");
      document.getElementById("audio").load();
      //document.getElementById("audio").play();
    }
  },
  computed: {
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    isCurrentlyPlaying(){
      return this.$store.getter.getIsCurrentlyPlaying;
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
