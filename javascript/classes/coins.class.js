class Coin extends MovableObject{
    height = 100;
    width = 100; 

    IMAGES_COIN = [
        './img/ElPoloLoco/8_coin/coin_1.png',
        './img/ElPoloLoco/8_coin/coin_2.png',

    ]

    offset = {
        left: 30,
        top: 30,
        right: 30,
        bottom: 60,
      }
    
    constructor(){
        super().loadImage('./img/ElPoloLoco/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 2500;
        this.y = 100 + Math.random() * 100;
        this.animate();
    }

/**
* Animates the coins for permantly blinking.
* @returns {void}
*/
    animate() {
        let moveInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
        setStoppableInterval(moveInterval, 1000 / 60);
    }
}