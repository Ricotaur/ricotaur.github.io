export class Input{
    constructor(){
        this.keys =[];
        this.pageWidth = window.innerWidth || document.body.clientWidth;
        this.treshold = Math.max(1,Math.floor(0.01 * (this.pageWidth)));
        this.touchstartX = 0;
        this.touchstartY = 0;
        this.touchendX = 0;
        this.touchendY = 0;
        
        const limit = Math.tan(45 * 1.5 / 180 * Math.PI);

        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
            ) && 
            this.keys.indexOf(e.key) === -1)
            {
                this.keys.push(e.key);
                console.log(e.key, this.keys);
            }
        });
        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
            )
            {    
            this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            
            console.log(e.key, this.keys);
        });



        window.addEventListener('touchstart', e => {
            this.touchstartX = e.changedTouches[0].screenX;
            this.touchstartY = e.changedTouches[0].screenY;
        });
        
        window.addEventListener('touchend', e => {
            this.touchendX = e.changedTouches[0].screenX;
            this.touchendY = e.changedTouches[0].screenY;
            
            
                let x = this.touchendX - this.touchstartX;
                let y = this.touchendY - this.touchstartY;
                let xy = Math.abs(x / y);
                let yx = Math.abs(y / x);
                if (Math.abs(x) > this.treshold || Math.abs(y) > this.treshold) {
                    if (yx <= limit) {
                        if (x < 0) {
                            if(this.keys.indexOf('swipeLeft') === -1){ this.keys.push('swipeLeft');}
                            console.log(this.keys);
                        } else {
                            if(this.keys.indexOf('swipeRight') === -1){ this.keys.push('swipeRight');}
                            console.log(this.keys);
                        }
                    }
                    if (xy <= limit) {
                        if (y < 0) {
                            if(this.keys.indexOf('swipeUp') === -1){ this.keys.push('swipeUp');}
                            console.log(this.keys);
                        } else {
                            if(this.keys.indexOf('swipeDown') === -1){ this.keys.push('swipeDown');}
                            console.log(this.keys);
                        }
                    }
                } else {
                    if(this.keys.indexOf('swipeTap') === -1){ this.keys.push('swipeTap');}
                }
                setTimeout(() => { this.keys.splice(this.keys.indexOf('swipeLeft'), 1); }, 100);
                setTimeout(() => { this.keys.splice(this.keys.indexOf('swipeRight'), 1); }, 100);
                setTimeout(() => { this.keys.splice(this.keys.indexOf('swipeUp'), 1); }, 100);
                setTimeout(() => { this.keys.splice(this.keys.indexOf('swipeDown'), 1); }, 100);
                setTimeout(() => { this.keys.splice(this.keys.indexOf('swipeTap'), 1); }, 100);

            });

        };
}

