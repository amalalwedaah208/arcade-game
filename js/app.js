"use strict";
// Draw the enemy on the screen, required method for game
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/coronavirus.PNG';
    this.x = x;
    this.y = y;
    this.speed = 100+Math.floor(Math.random()*200);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  if (this.x > 510) {
      this.x = -50;
      this.speed =Math.floor((Math.random() * 200) + 100);
  };

  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
      player.x = 202;
      player.y = 405;
  };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Now write your own player class
var Player = function() {
    this.reset();
};
Player.prototype.reset = function() {
  this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x -= 50;
        //if right key is pressed and player is not on edge of map increment x
    } else if (this.ctlKey === 'right' && this.x <400) {
        this.x += 50;
        //if up key is pressed increment y
    } else if (this.ctlKey === 'up') {
        this.y -= 50;
        //if down key is pressed and player is not on edge of map decrement y
    } else if (this.ctlKey === 'down' && this.y != 400) {
        this.y += 50;
    }
    this.ctlKey = null;
    //If on water
    if (this.y < 25) {
        this.reset();
    }
};

Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2, 150));
    allEnemies.push(new Enemy(-2, 220));
}());

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
