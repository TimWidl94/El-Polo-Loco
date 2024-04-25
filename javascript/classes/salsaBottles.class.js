class SalsaBottles extends MovableObject{
    y = 330;
    height = 100;
    width = 100; 

    offset = {
        left: 40,
        top: 20,
        right: 10,
        bottom: 30,
      }

    constructor(x){
        super().loadImage('./img/ElPoloLoco/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x + Math.random() * 100;
    }
}