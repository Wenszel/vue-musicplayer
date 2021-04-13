<template>
  <img class="cover-container" :src="src" @click="handleCoverClick" @error="replaceByDefault">
</template>

<script>
export default {
  name: 'Cover',
  methods:{
    handleCoverClick(){
      this.$store.dispatch("getAlbum", this.album);
      this.$store.commit("SET_CURRENTLY_VIEWED_ALBUM", this.album);
    },
    replaceByDefault(e){
      e.target.src = 'http://localhost:3000/static/icons/default_cover.jpg'
    }
  },
  data: function(){
    return{
      src: `http://localhost:3000/static/mp3/${this.album}/cover.jpg`,
    }
  },
  props: {
    album: String
  },
}
</script>

<style>
    .cover-container{
      text-align: center;
      font-size: 100px;
      width: 200px;
      height: 200px;
    }
    .cover-container:hover{
      cursor: pointer;
    }
</style>
