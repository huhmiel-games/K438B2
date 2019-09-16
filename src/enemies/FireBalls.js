export default class FireBalls extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      damage: config.damage,
      directionX: 0,
      directionY: -400,
    };
    this.setDepth(10);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(300);
    this.body.velocity.x = 0;
    this.getFired = false;
    this.flag = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      if (this.body.blocked.down) {
        this.state.directionX = 0;
        this.fireJump();
      }
    }
    if (this.body.velocity.y > 0) {
      this.flipY = true;
    } else {
      this.flipY = false;
    }
    // if (this.lastAnim !== animationName) {
    //   this.lastAnim = animationName;
    //   this.animate(animationName, true);
    // }
  }

  fireJump() {
    if (!this.flag) {
      this.flag = true;
      this.delay = Phaser.Math.Between(150, 325);
      this.body.setVelocity(0, 0);
      this.scene.time.addEvent({
        delay: this.delay * 10,
        callback: () => {
          if (this.active) {
            this.body.setVelocityY(-this.delay);
            this.flag = false;
          }
        },
      });
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }
}
