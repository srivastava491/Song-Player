let audio = new Audio('/songs/1.mp3')
let mplay = document.getElementById("master-play")
let mpause = document.getElementById("master-pause")
let duration = document.getElementById('duration')
let index = 0
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let songName = Array.from(document.getElementsByClassName("song"))
let play = Array.from(document.getElementsByClassName("play"))
let pause = Array.from(document.getElementsByClassName("pause"))

songs = ["Golden Hour", "Diamond Heart", "What If I Told You I Like You", "Past Life", "Glimpse of Us", "Love Story", "Under the influence", "Snap"]

songName.forEach((e, i) => {
    e.getElementsByClassName("cover")[0].src = `cover/${i + 1}.jpeg`
    e.getElementsByClassName("song-name")[0].innerHTML = songs[i]
    let temp = new Audio(`/songs/${i + 1}.mp3`)
    temp.addEventListener('loadedmetadata', function () {
        let dur = temp.duration;
        console.log(dur);
        dur = Math.ceil(dur);
        let dmin = Math.floor(dur / 60);
        let dsec = dur % 60;
        if (dsec < 10)
            dsec = '0' + dsec;
        dur = dmin + ":" + dsec;
        e.getElementsByClassName('song-duration')[0].innerHTML = dur;

    })
})
mplay.addEventListener('click', () => {
    audio.play()
    mplay.style.display = 'none'
    mpause.style.display = 'inline'
})
mpause.addEventListener('click', () => {
    audio.pause()
    mpause.style.display = 'none'
    mplay.style.display = 'inline'
})
let range = document.getElementById('time')
audio.addEventListener('timeupdate', () => {
    let val = (audio.currentTime / audio.duration) * 100
    range.value = val
    let dur = audio.duration - audio.currentTime
    dur = Math.ceil(dur)
    let dmin = Math.floor(dur / 60)
    let dsec = dur % 60
    if (dsec < 10)
        dsec = '0' + dsec
    duration.innerHTML = dmin + ':' + dsec
    if (audio.duration == audio.currentTime) {
        audio.pause()
        mpause.style.display = 'none'
        mplay.style.display = 'inline'
    }
})
range.addEventListener('change', () => {
    audio.currentTime = (range.value * audio.duration) / 100
})

next.addEventListener('click', () => {
    index += 1
    if (index == songs.length) {
        index = 0
    }
    audio.pause()
    audio = new Audio(`/songs/${index + 1}.mp3`)
    audio.play()
    mplay.style.display = 'none'
    mpause.style.display = 'inline'
    change_info(index)
    audio.addEventListener('timeupdate', () => {
        let val = (audio.currentTime / audio.duration) * 100
        range.value = val
        let dur = audio.duration - audio.currentTime
        dur = Math.ceil(dur)
        let dmin = Math.floor(dur / 60)
        let dsec = dur % 60
        if (dsec < 10)
            dsec = '0' + dsec
        duration.innerHTML = dmin + ':' + dsec
        if (audio.duration == audio.currentTime) {
            audio.pause()
            mpause.style.display = 'none'
            mplay.style.display = 'inline'
        }
    })
})

function change_info() {
    document.getElementById("play-song-name").innerHTML = songs[index]
    document.getElementById("song-cover").src = `cover/${index + 1}.jpeg`

}
play.forEach((element) => {
    element.addEventListener('click', (e) => {
        stop()
        index = parseInt(e.target.id);
        audio.pause()
        audio = new Audio(`/songs/${index + 1}.mp3`)
        audio.play()
        mplay.style.display = 'none'
        mpause.style.display = 'inline'
        change_info(index)
        audio.addEventListener('timeupdate', () => {
            let val = (audio.currentTime / audio.duration) * 100
            range.value = val
            let dur = audio.duration - audio.currentTime
            dur = Math.ceil(dur)
            let dmin = Math.floor(dur / 60)
            let dsec = dur % 60
            if (dsec < 10)
                dsec = '0' + dsec
            duration.innerHTML = dmin + ':' + dsec
            if (audio.duration == audio.currentTime) {
                audio.pause()
                mpause.style.display = 'none'
                mplay.style.display = 'inline'
            }
        })
        element.style.display = 'none'
        pause[index].style.display = 'inline'
    });
});
pause.forEach((element)=>{
    element.addEventListener("click",()=>{
        audio.pause()
        mpause.style.display = 'none'
        mplay.style.display = 'inline'
        element.style.display = 'none'
        play[index].style.display = 'inline'
    })
})

function stop(){
    pause.forEach((e,i)=>{
        e.style.display='none'
        play[i].style.display='inline'
    })
}