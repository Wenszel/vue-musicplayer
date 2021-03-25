<template>
  <div class="item-container">
    <span class="song-name">{{song.file}}</span>
    <span class="song-size">{{song.size}}</span>
    <div class="player-button" @click="handlePlayerClick" v-text="currentSong === song.file && isCurrentlyPlaying ? '||' : '>'"></div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  methods:{
    handlePlayerClick(){
      if(!this.isCurrentlyPlaying || (this.isCurrentlyPlaying && this.currentSong !== this.song.file)){
        this.$store.commit("SET_CURRENT_SONG", this.song.file);
        this.$store.commit("SET_IS_CURRENTLY_PLAYING", true)
        this.$store.commit("SET_CURRENT_SONG_PATH");
        document.getElementById("audio").load();
        document.getElementById("audio").play();
      }else{
        this.$store.commit("SET_IS_CURRENTLY_PLAYING", false);
        document.getElementById("audio").pause();
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
