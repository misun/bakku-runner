class LevelHandler{
  constructor({menu, game}){
    this.easy = document.getElementById("level-easy");
    this.medium = document.getElementById("level-medium");
    this.hard = document.getElementById("level-hard");
    this.menu = menu;
    this.game = game;
  }
  setLevel(e){
    this.menu.style.display = "none";
    this.game.level = e.currentTarget.value;
    this.game.start();
  }

}

module.exports = LevelHandler;
