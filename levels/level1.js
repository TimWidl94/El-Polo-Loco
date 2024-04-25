let level1;

function initLevel() {
  level1 = new Level(
    [new Chicken(0), new Chicken(1), new Chicken(2), new SmallChicken(3), new Chicken(4),
     new SmallChicken(5), new SmallChicken(6), new Chicken(7), new SmallChicken(8), new SmallChicken(9),
     new Chicken(10), new Chicken(11), new SmallChicken(12), new Chicken(13),],
    [new Endboss(0)],
    [new Cloud(200), new Cloud(700), new Cloud(1200), new Cloud(1700), new Cloud(2200), new Cloud(2500)],
    [
      new BackgroundObject(
        "./img/ElPoloLoco/5_background/layers/air.png",
        -719
      ),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/air.png", 0),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/air.png", 719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/air.png",719 * 2),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/air.png",719 * 3),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/air.png",719 * 4),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/2.png",-719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/1.png",719 * 2),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/1.png",719 * 2),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/1.png",719 * 2),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/2.png",719 * 3),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/2.png",719 * 3),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/2.png",719 * 3),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/3_third_layer/1.png",719 * 4),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/2_second_layer/1.png",719 * 4),
      new BackgroundObject("./img/ElPoloLoco/5_background/layers/1_first_layer/1.png",719 * 4),
    ],
    [],
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),
       new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
    [new Cactus(300), new Cactus(400), new Cactus(900), new Cactus(1200), new Cactus(1500), new Cactus(2000),],
       [
      new SalsaBottles(250), new SalsaBottles(400), new SalsaBottles(800), new SalsaBottles(1000),
      new SalsaBottles(1200), new SalsaBottles(1500), new SalsaBottles(1800), new SalsaBottles(2100), 
      new SalsaBottles(2200), new SalsaBottles(2400),
    ],
  );
}
