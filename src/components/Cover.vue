<template>
  <img class="cover-container" v-bind:src="src"/>
</template>

<script>
export default {
  name: 'Item',
  props: ['src']
}
</script>

<style>
    .cover-container{
        width: 200px;
        height: 200px;
    }
</style>
