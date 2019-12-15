export default class FishBig extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 100,
      directionY: 0,
      hited: false,
      giveLife: config.life / 10,
    };
    this.setDepth(101)
      .setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity(false)
      .setSize(20, 28)
      .setOffset(10, 20);
    this.state.directionY = Math.sin(300 + Math.PI / 4);
    this.getFired = false;
    this.animate(config.key, true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(Math.sin(time * 0.0005) * 100);
      this.body.velocity.normalize().scale(100);
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = Phaser.Math.Between(30, 50);
      }
      if (this.body.blocked.right) {
        this.state.directionX = Phaser.Math.Between(-50, -30);
      }
      // if (this.state.directionY > 0) {
      //   this.state.directionY += 20;
      // } else {
      //   this.state.directionY -= 20;
      // }
      // if (this.body.blocked.down || this.state.directionY > 120) {
      //   this.state.directionY = -1;
      // } else if (this.body.blocked.up || this.state.directionY < -120) {
      //   this.state.directionY = 2;
      // }
      // flip the sprite and set the angle
      if (this.state.directionX < 0) {
        this.flipX = true;
        this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x) + Math.PI);
      } else {
        this.flipX = false;
        this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x));
      }
    }
  }

  playSound() {
    if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 150) {
      if (!this.waspFX.isPlaying) {
        this.waspFX.play();
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.scene.sound.play('enemyHit');
    this.state.life = this.state.life - e;
  }

  explode(bullet) {
    const arr = [];
    for (let i = 0; i < 30; i += 1) {
      arr.push(i.toString());
    }
    // const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    // this.scene.particles = null;
    this.scene.particles = this.scene.add.particles('explodedCrab');
    this.scene.emitter = this.scene.particles.createEmitter({
      angle: { min: -30, max: -150 },
      speed: { min: 200, max: 300 },
      frame: arr,
      quantity: 16,
      lifespan: 3000,
      alpha: 1,
      gravityY: 300,
      on: false,
      frequency: -1,
    });
    this.scene.particles.emitParticleAt(this.x, this.y).setDepth(2000);
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      // this.playSound();
      if (this.state.directionX > 0) {
        this.state.directionX = -100;
      } else {
        this.state.directionX = 100;
      }
    }
  }
}
