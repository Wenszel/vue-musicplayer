<template>
  <div class="items-container">
    {{name}} {{size}}
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['name', 'size']
}
</script>

<style>

</style>
