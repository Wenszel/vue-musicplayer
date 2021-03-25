<template>
  <div class="item-container">
    <span class="song-name">{{song.file}}</span>
    <span class="song-size">{{song.size}}</span>
    <div class="player-button" @click="playSong" v-text="this.isPlaying ? '>' : '||'"></div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data: function(){
    return{
      isPlaying: false,
    }
  },
  methods:{
    playSong(){
      this.isPlaying = !this.isPlaying;
    }
  },
  props: ['song']
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
