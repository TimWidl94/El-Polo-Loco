class Cloud extends MovableObject{
    y = 0;
    height = 350;
    width = 500;
    speed = 0.15;   
    constructor(x){
        super().loadImage('./img/ElPoloLoco/5_background/layers/4_clouds/1.png');   
        this.x = x + Math.random() * 500;
        this.animate(); 
    }


/**
* Animates the clouds movement by continuously moving it left.
* @returns {void}
*/
animate() {
    /**
     * Interval for continuously moving the clouds left.
     */
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
    }  
}
