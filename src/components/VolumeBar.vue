<template>
    <div class="volume-container">
        <span :class="icon"></span>
        <input type="range" min="0" max="1" step="0.05" value="0.5" @change="handleVolumeBarChange">
    </div>    
</template>
<script>
export default {
    name: "VolumeBar",
    data: function(){
        return{ 
            icon: 'icon-volume'
        }
    },
    methods: {
        handleVolumeBarChange(e){
            let volume = e.target.value;
            document.getElementById("audio").volume = volume;
            // Setting volume icon based on volume value
            if( volume >= 0.7 ){
                this.icon = "icon-volume-up"
            }else if( volume > 0.3 && volume < 0.7 ){
                this.icon = "icon-volume"
            }else if( volume <= 0.3 && volume > 0 ){
                this.icon = "icon-volume-down"
            }else if( volume == 0 ){
                this.icon = "icon-volume-off"
            }
        }
    }

}
</script>
<style scoped>
    .volume-container {
        margin-right: 10px;
        display: flex;
        flex-direction: row;
    }
</style>
