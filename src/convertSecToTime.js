//Converts seconds to music time format mm:ss
function convertSecToTime(sec){
    let minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    seconds < 10 ? seconds = "0" + seconds : seconds;
    return minutes + ":" + seconds;
}
export default convertSecToTime;