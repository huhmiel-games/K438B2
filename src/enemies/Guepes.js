export default class Guepes extends Phaser.GameObjects.Sprite {
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
    this.setDepth(101);
    this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false).setSize(20, 28).setOffset(10, 20);
    this.state.directionY = Math.sin(300 + Math.PI / 4);
    this.getFired = false;
    this.waspFX = this.scene.sound.add('guepe', { volume: 0.2 });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      this.body.velocity.normalize().scale(150);
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = 100;
        this.playSound();
      }
      if (this.body.blocked.right) {
        this.state.directionX = -100;
        this.playSound();
      }
      if (this.state.directionY > 0) {
        this.state.directionY += 2;
      } else {
        this.state.directionY -= 2;
      }
      if (this.body.blocked.down || this.state.directionY > 120) {
        this.state.directionY = -1;
        this.playSound();
      } else if (this.body.blocked.up || this.state.directionY < -120) {
        this.state.directionY = 2;
        this.playSound();
      }
      // flip the sprite
      if (this.state.directionX > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
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
      this.playSound();
      if (this.state.directionX > 0) {
        this.state.directionX = -100;
      } else {
        this.state.directionX = 100;
      }
    }
  }
}
