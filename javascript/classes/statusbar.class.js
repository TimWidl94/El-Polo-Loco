class StatusBar extends DrawableObject {
    imgStatusBarHealth = [
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    imgStatusBarCoin = [
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/ElPoloLoco/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    imgStatusBarBottle = [

    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.imgStatusBarHealth);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.height = 50;
        this.width = 200;
    }

    /**
     * Sets the percentage of the status bar and updates the corresponding image.
     * @param {number} percentage - The percentage value to set for the status bar.
     * @returns {void}
     */
    setPercentage(percentage){
        this.percentage = percentage;
        /**
         * Resolves the index of the image based on the percentage value.
         * @returns {number} - The index of the image.
         */
        let path = this.imgStatusBarHealth[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the percentage value.
     * @returns {number} - The index of the image.
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage >= 80){
            return 4;
        } else if (this.percentage >= 60){
            return 3;
        } else if (this.percentage >= 40){
            return 2;
        } else if (this.percentage >= 20){
            return 1;
        } else if (this.percentage >= 0){
            return 0;
        }
    }
}