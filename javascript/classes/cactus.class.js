class Cactus extends MovableObject{
    y = 290;
    height = 150;
    width = 120;
    speed = 0.15;   

    offset = {
        left: 30,
        top: 27,
        right: 30,
        bottom: 30,
      };

    constructor(x){
        super().loadImage('./img/ElPoloLoco/11_cactus/cactus.png');   
        this.x = x + Math.random() * 200;
    }
}