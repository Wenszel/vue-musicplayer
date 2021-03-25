<template>
<div>
  <img class="cover-container" :src="src" @click="handleCoverClick">
  </div>
</template>

<script>
export default {
  name: 'Cover',
  methods:{
    handleCoverClick(){
      this.$store.dispatch("getAlbum",this.album);
    }
  },
  data: function(){
    return{
      src: `http://localhost:3000/static/covers/${this.album}/cover.jpg`,
    }
  },
  props: ['album'],
}
</script>

<style>
    .cover-container{
        width: 200px;
        height: 200px;
    }
    .cover-container:hover{
      cursor: pointer;
    }
</style>
