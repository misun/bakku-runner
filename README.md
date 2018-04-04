# bakku-runner Game of Life with Variations

### Background

Bakku-Runner Game of Life is a classic example of the concept of **Super Mario Runner**.  The original GoL is a 0-player game that plays out until bumping to other obstacles. On the next iteration of the game the screen follow these rules:

1) Raccoons come out when a user chooses 'EASY' level with woodland background
2) Wolves come out when a user chooses 'MEDIUM' level with newyork city background
3) Polarbears come out when a user chooses 'HARD' level with winter background
4) User can get scores with jumping as time goes by

[Live Demo](http://www.misun.me/bakku-runner/)


### Demo
#### Level EASY
![level-easy](https://user-images.githubusercontent.com/3492959/38317267-a3f40d52-37fa-11e8-9625-103eda8aa5be.gif)
#### Level MEDIUM
![level-medium](https://user-images.githubusercontent.com/3492959/38317290-b124d164-37fa-11e8-9ee9-2c4873ae4a65.gif)
#### Level HARD
![level-hard](https://user-images.githubusercontent.com/3492959/38317296-b5c6a4c2-37fa-11e8-828d-85bb7e742d7f.gif)


### Functionality & MVP  

With this bakku-runner Game of Life simulator, users will be able to:

- [x] Start and reset the game
- [x] Jump with the up arroy key
- [x] Choose level from menu

In addition, this project will include:

- [x] An About rules of the game
- [ ] A production README

### Architecture and Technologies

All features in this game would be implemented using native JavaScript DOM manipulation and, HTML5 canvas.

This project will be implemented with the following technologies:

- `JavaScript` for game logic
- `HTML5 Canvas` for rendering
- `Webpack` for bundling scripts

### Implementation Timeline

**Day 1**: Setup all necessary html and css to render objects, including getting webpack up. Goals for the day:

- Get a green bundle
- render an object to the `HTML5` element
- Setup player.js properly

**Day 2**: Add jump and collision. Goals for the day: 

- Create a feature so that a player can jump and collide to obstacles

**Day 3**: Create the obstacles like racoons. Goals for the day:

- build a 'racoon.js' to shows up raccoons regularly
- If time: build 'baldeagle.js' to add a different obstacles

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, start, and reset
- Have a styled `HTML5`, nice looking
- If time: more styled


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add options for difficulties
- [x] Add multiple theme for difficulties
