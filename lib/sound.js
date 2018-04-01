class Sound {
  constructor(){
    this.bgSoundTag = document.getElementById('bg-sound');
    this.bgSound = new Audio('./assets/sounds/bg.ogg');
  }
  toggleSound(e){
    this.bgSound.paused ? this.bgSound.play() : this.bgSound.pause();
    const [originText1, originText2] = this.bgSoundTag.innerText.split(' ');
    originText2 === 'On' ? (this.bgSoundTag.innerText = originText1.concat(' ','Off')) : (this.bgSoundTag.innerText = originText1.concat(' ','On'));
  }
}

module.exports = Sound;
