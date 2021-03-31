<template>
  <div class="progress-bar-container" :style="currentSongPath ? {display: 'flex'} : {display: 'none'}">
    <span v-text="convertSecToTime(this.currentTime)"></span>
    <input 
        type="range" 
        min="0" 
        :max="songDuration" 
        :value="currentTime" 
        @change="handleProgressBarChange">
    <span v-text="convertSecToTime(this.songDuration)"></span>
  </div>
</template>
<script> 
import convertSecToTime from '../convertSecToTime'

export default {
  name: 'ProgressBar',
  methods: {
    handleProgressBarChange(e){
      document.getElementById("audio").currentTime = e.target.value;
      this.$store.commit("SET_CURRENT_TIME", e.target.value);
    },
    convertSecToTime: convertSecToTime,
  },
  computed: {
    currentSongPath(){
      return this.$store.getters.getCurrentSongPath;
    },
    songDuration(){
      return this.$store.getters.getSongDuration;
    },
    currentTime(){
      return this.$store.getters.getCurrentTime;
    },
  }
}
</script>
<style>
.progress-bar-container{
  width: 500px;
  flex-direction: row;
}
input[type=range] {
  width: 100%;
  margin: 0.8px 0;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  background: #707070;
  border: 0;
  border-radius: 21.3px;
  width: 100%;
  height: 8.4px;
  cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  margin-top: -0.8px;
  width: 10px;
  height: 10px;
  background: #585858;
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #7a7a7a;
}
input[type=range]::-moz-range-track {
  background: #707070;
  border: 1px solid black;
  border-radius: 21.3px;
  width: 100%;
  height: 8.4px;
  cursor: pointer;
}
input[type=range]::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #585858;
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 1.8px 0;
  color: transparent;
  width: 100%;
  height: 8.4px;
  cursor: pointer;
}
input[type=range]::-ms-fill-lower {
  background: #666666;
  border: 0;
  border-radius: 42.6px;
}
input[type=range]::-ms-fill-upper {
  background: #707070;
  border: 0;
  border-radius: 42.6px;
}
input[type=range]::-ms-thumb {
  width: 10px;
  height: 10px;
  background: #585858;
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #707070;
}
input[type=range]:focus::-ms-fill-upper {
  background: #7a7a7a;
}
</style>