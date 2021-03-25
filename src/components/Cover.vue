<template>
<div>
  <img class="cover-container" :src="src">
  </div>
</template>

<script>
export default {
  name: 'Cover',
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
</style>
