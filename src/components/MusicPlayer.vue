<template>
  <div class="player-container">
    <audio id="audio">
      <source
      :src="currentSongPath"
      id="audio_src"
      type="audio/mp3">
    </audio>
    <!-- Displays songs name -->
    <span class="current-song">{{currentAlbum}} - {{currentSong.replace(".mp3", "")}}</span>
    <!-- Control buttons -->
    <div class="middle">
      <ProgressBar />
      <div class="player-buttons">
        <div class="player-button options" @click="handleRepeat" :style="repeat ? {backgroundColor: 'lightblue'} : null"> 
          <span class="icon-loop"></span> 
        </div>
        <div class="player-button" @click="previousSong"> <span class="icon-fast-bw"></span> </div>
        <div class="player-button" @click="handleResumeClick"><span :class="!isCurrentlyPlaying && currentSongPath ? 'icon-play' : 'icon-pause'"></span></div>
        <div class="player-button" @click="nextSong"><span class="icon-fast-fw"></span></div>
        <div class="player-button options" @click="handleShuffle" :style="shuffle ? {backgroundColor: 'lightblue'} : null">
          <span class="icon-shuffle"></span> 
        </div>
    </div>
    <!-- Input to change volume -->
    <VolumeBar />
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'
import VolumeBar from './VolumeBar.vue'

export default {
  name: 'MusicPlayer',
  components: {
    ProgressBar, VolumeBar
  },
  methods: {
    handleRepeat(){
      let { commit } = this.$store;
      let audioEl = document.getElementById("audio");
      if(this.repeat){
        audioEl.loop = false; 
        commit("SET_REPEAT", false);
      }else{
        audioEl.loop = true; 
        commit("SET_REPEAT", true);
      }
    },
    handleShuffle(){
      let { commit } = this.$store;
      this.shuffle ? commit("SET_SHUFFLE", false) : commit("SET_SHUFFLE", true);
    },
    handleResumeClick(){
      let { commit } = this.$store;
      let audioEl = document.getElementById("audio");
      // Checkes if song is chosen
      if(this.currentSongPath){
        // If song is stopped play it
        if(!this.isCurrentlyPlaying){
          // Load song and play it from the beginning or do nothing
          commit("SET_IS_CURRENTLY_PLAYING", true);
          audioEl.play();
        }else{
          commit("SET_IS_CURRENTLY_PLAYING", false);
          audioEl.pause();
        }  
      }       
    },
    // Handle previous song button click
    previousSong(){
      if(this.currentSongPath){
        this.$store.commit("SET_CURRENT_SONG", this.findNextSong(false));
        this.playSong();
      }
    },
    // Handle next song button click
    nextSong(){  
      if(this.currentSongPath){
        this.$store.commit("SET_CURRENT_SONG", this.findNextSong(true));
        this.playSong(); 
      }
    },
    /*
      Finds next or previous song
      next - boolean: next/previous song
    */
    findNextSong(next){
      let indexOfCurrentSong = this.albumSongs.findIndex(elem => elem.file == this.currentSong);
      if(next){
        // Returns next song or first song of album if current song is last 
        if(indexOfCurrentSong+1<this.albumSongs.length){
          return this.albumSongs[indexOfCurrentSong+1].file;
        }else{
          return this.albumSongs[0].file;
        }
      }else{
        // Returns previous song or last song of album if current song is first 
        if(indexOfCurrentSong-1>=0){
          return this.albumSongs[indexOfCurrentSong-1].file;
        }else{
          return this.albumSongs[this.albumSongs.length-1].file;
        }
      }
    },

    playSong(){
      let { commit } = this.$store;
      commit("SET_IS_CURRENTLY_PLAYING", true);
      // Loads song to player
      let audioEl = document.getElementById("audio");
      audioEl.load();
      // When loaded sets duration time in player
      audioEl.onloadeddata = e => {  
        commit("SET_SONG_DURATION", Math.floor(e.target.duration));    
        e.target.play();
        // Every seconds updates passed time of current song
        e.target.ontimeupdate = e => {
          commit("SET_CURRENT_TIME", Math.floor(e.target.currentTime));
        };    
        // When song ends play next song or random if shuffle 
        e.target.onended = () => {
          if (this.shuffle){
            let newSong;
            do{
              newSong = this.albumSongs[Math.floor(Math.random() * this.albumSongs.length)].file;
            }while( newSong == this.currentSong )
            this.$store.commit("SET_CURRENT_SONG", newSong);
          } else{
            this.$store.commit("SET_CURRENT_SONG", this.findNextSong(true));
          }
          this.playSong(); 
        };
      };
    },
  },

  computed: {
    currentAlbum(){
      return this.$store.getters.getCurrentAlbum;
    },
    shuffle(){
      return this.$store.getters.getShuffle;
    },
    repeat(){
      return this.$store.getters.getRepeat;
    },
    currentSong(){
      return this.$store.getters.getCurrentSong;
    },
    currentSongPath(){
      return this.$store.getters.getCurrentSongPath;
    },
    songDuration(){
      return this.$store.getters.getSongDuration;
    },
    isCurrentlyPlaying(){
      return this.$store.getters.getIsCurrentlyPlaying;
    },
    currentTime(){
      return this.$store.getters.getCurrentTime;
    },
    albumSongs(){
      return this.$store.getters.getAlbumSongs;
    },
  },
}
</script>

<style>
  .options {
    width: 30px !important;
    height: 30px !important;
  }
  .player-container{
    position: -webkit-sticky; /* Safari */  
    position: sticky;
    display: flex;
    justify-content:center;
    align-items: center;
    bottom:0;
    z-index: 1;
    width: 100vw;
    background-color: grey;
    height: 75px;
  }
  .current-song{
    position: absolute;
    left: 0;
  }
  .middle{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .player-buttons{ 
    display: flex;
    align-items: center;
    flex-direction:row;
    float: left;
  }
  .player-button{
    margin: 3px;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: blue;
  }
  .player-button:hover{
    cursor: pointer;
    background-color: lightblue;
  }
</style>
