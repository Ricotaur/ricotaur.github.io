const states ={
    SITTING: 0,
    RUNNINGR: 1,
    JUMPING: 2,
    FALLING: 3,
    RUNNINGL: 4,
}

class State{
    constructor(state){
        this.state = state; 
    }
}
//Stillstand---------------------------------------------------------------
export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 3;
    }

    handleInput(input){
        if(input.includes('ArrowRight')){
            this.player.setState(states.RUNNINGR, 2);
        }
        else if(input.includes('ArrowLeft')){
            this.player.setState(states.RUNNINGL, 0);
        }
        else if (input.includes('ArrowUp') || input.includes('swipeUp')){
            this.player.setState(states.JUMPING, 0);
        }
    }
}
//Move Rightt---------------------------------------------------------------
export class RunningR extends State{
    constructor(player){
        super('RUNNINGR');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 3;
    }

    handleInput(input){
        if(input.includes('ArrowDown') || input.includes('swipeDown')){
            this.player.setState(states.SITTING, 0);
        }
        else if (input.includes('ArrowUp') || input.includes('swipeUp')){
            this.player.setState(states.JUMPING, 0);
        }
        else if(input.includes('ArrowLeft')){
            this.player.setState(states.RUNNINGL, 0);
        }
        
    }
}
export class RunningL extends State{
    constructor(player){
        super('RUNNINGL');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 3;
    }

    handleInput(input){
        if(input.includes('ArrowDown') || input.includes('swipeDown')){
            this.player.setState(states.SITTING, 0);
        }
        else if (input.includes('ArrowUp') || input.includes('swipeUp')){
            this.player.setState(states.JUMPING, 0);
        }
        if(input.includes('ArrowRight')){
            this.player.setState(states.RUNNINGR, 2);
        }
    }
}
//Jump---------------------------------------------------------------
export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        if(this.player.onGround()){this.player.vy -= 12;}
        this.player.frameY = 3;
        this.player.maxFrame = 3;
    }

    handleInput(){
        if(this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING, 0);
        }
    }
}
//Fall---------------------------------------------------------------
export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 4;
        this.player.maxFrame = 3;
    }

    handleInput(){
        if(this.player.onGround()){
            this.player.setState(states.SITTING, 0);
        }
    }
}