<template>
  <div class="items-container">
    {{song.file}} {{song.size}}
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['song']
}
</script>

<style>

</style>
