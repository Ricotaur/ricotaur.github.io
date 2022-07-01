import { Sitting, RunningR, Jumping, Falling, RunningL, Holding, FlyingR } from './states.js';

export class Player{
    constructor(game){
        this.game = game;

        this.width = 50;
        this.height = 50;
        this.x = 50;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.gravity = 0.25;

        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.rotation = 0;

        this.speed = 0;
        this.maxSpeed = 5;

        this.states = [new Sitting(this), new RunningR(this), new Jumping(this), new Falling(this), new RunningL(this), new Holding(this), new FlyingR(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.loseAudio = new Audio('./sounds/lose_sound_1_0.wav');
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //links,rechts Bewegung
        this.x += this.speed;
        if(input.includes('ArrowRight')){this.speed = this.maxSpeed;}
        else if (input.includes('ArrowLeft')){this.speed = -this.maxSpeed;}
        else{this.speed = 0;}
        if(this.x < 0){this.x = 0;}
        if(this.x > this.game.width - this.width){this.x = this.game.width - this.width;}
        //Jump
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.gravity;
            if(this.atCeiling()){
                this.y = 63;
                this.vy = 1;
            }
        }
        else{this.vy = 0;}
        //animations
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame){this.frameX++;}
            else{this.frameX = 0;}
        }
        else{ if(!isNaN(deltaTime)){this.frameTimer += deltaTime;}}
    }
    draw(context){
        //context.strokeStyle = 'black';                                Optionale Hitbox des Spielers/Ufos
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.save()
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.rotation * Math.PI / 180);
        context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
        this.width, this.height, this.x, this.y, this.width, this.height);
        context.restore();
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    atCeiling(){
        return this.y <= 63;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = speed;
        this.currentState.enter();
    }
    checkCollision(context){
        this.game.obstacles.forEach(obstacle => {
            if( 
                obstacle.x < this.x + this.width &&
                obstacle.x + obstacle.width > this.x &&
                obstacle.y < this.y + this.height &&
                obstacle.y + obstacle.height > this.y 
            ){
                document.getElementById("resetText").innerHTML = "You crashed, sadly. Game will reload";
                this.loseAudio.play();
                this.game.speed = 0;
                setTimeout(() => { window.location.reload(); }, 2000);
            }
            else{ }
    });
    
 }
}