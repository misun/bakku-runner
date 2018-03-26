# bakku-runner Game of Life with Variations

### Background

Bakku-Runner Game of Life is a classic example of the concept of **Super Mario Runner**.  The original GoL is a 0-player game that plays out until bumping to other obstacles. On the next iteration of the game the screen follow these rules:

1) bald-eagle and raccoons come out regularly,
2) User can get scores as time goes by.  

### Functionality & MVP  

With this bakku-runner Game of Life simulator, users will be able to:

- [ ] Start and reset the game
- [ ] Jump with space
- [ ] Choose from preset demo initial states

In addition, this project will include:

- [ ] An About rules of the game
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

- Create a feature so that a player can jump and collide to obstacles.

**Day 3**: Create the obstacles like racoons. Goals for the day:

- build a 'racoon.js' to shows up raccoons regularly
- If time: build 'baldeagle.js' to add a different obstacles

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, start, and reset
- Have a styled `HTML5`, nice looking
- If time: more styled.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add options for difficulties
- [ ] Add multiple choices for starting states that are interesting
