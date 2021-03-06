class Obstacle{
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.deleteMark = false;

    }
    update(deltaTime){
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame){this.frameX++;}
            else{this.frameX = 0;}
        } else{ if(!isNaN(deltaTime)){this.frameTimer += deltaTime;}}

        if(this.x + this.width < 0){this.deleteMark = true; this.game.score++;}
    }
    draw(context){
        //context.strokeStyle = 'red';                                          //Optionale Hitboxen der Hindernisse
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 
        0, this.width, this.height, this.x, this.y, this.width, this.height);

    }
}

export class FlyingObstacle extends Obstacle{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 130;
        this.x = this.game.width;
        this.y = 63;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
        this.image = document.getElementById('ceil_Obst');
    }
    update(deltaTime){
        super.update(deltaTime);

    }
}
export class GroundObstacle extends Obstacle{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 200;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
        this.image = document.getElementById('ground_Obst');
    }
}
export class MiddleObstacle extends Obstacle{
    constructor(game){
        super();
        this.game = game;
        this.width = 130;
        this.height = 60;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6 + 63;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 3;
        this.image = document.getElementById('middle_Obst');
    }
}