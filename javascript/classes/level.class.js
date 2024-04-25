class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x = 2800;
    statusBar;
    coin;
    cactus;
    salsaBottle;
   
    constructor(enemies, endboss, clouds, backgroundObjects, statusBar, coin, cactus, salsaBottle,){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBar = statusBar;
        this.coin = coin;
        this.cactus = cactus;
        this.salsaBottle = salsaBottle;
    }
}