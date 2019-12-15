export default class Jumpers extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 100,
      directionY: 0,
      hited: false,
      type: config.key,
      giveLife: config.life / 10,
    };
    this.name = config.name;
    this.lastAnim = null;
    this.setDepth(101); // .setScale(2, 2);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(300);
    this.body.setSize(31, 23);
    this.body.setOffset(8, 8);
    this.flag = false;
    this.getFired = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.active) {
      if (this.body.blocked.down) {
        this.state.directionX = 0;
        this.jumperJump();
      }
      if (!this.body.blocked.down) {
        animationName = `${this.state.type}Jump`;
      } else {
        animationName = `${this.state.type}Idle`;
      }
    }
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
  }

  jumperJump() {
    if (!this.flag) {
      this.flag = true;
      this.delay = Phaser.Math.Between(0, 300);
      if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 200) {
        this.side = this.scene.player.x - this.x;
      } else {
        this.side = Phaser.Math.Between(-100, 100);
      }
      this.body.setVelocity(0, 0);
      this.scene.time.addEvent({
        delay: this.delay * 10,
        callback: () => {
          if (this.active) {
            if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 250) {
              this.scene.sound.play('jumpers', { volume: 0.6 });
            }
            this.body.setVelocityX(this.side);
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

  looseLife(e) {
    this.scene.sound.play('enemyHit');
    this.state.life = this.state.life - e;
  }

  explode(bullet) {
    console.log(this, bullet)
    let arr = [];
    for (let i = 0; i < 30; i+=1) {
      arr.push(i.toString())
    }
    const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    //this.scene.particles = null;
    this.scene.crabParticles = this.scene.add.particles('explodedCrab');
    this.scene.crabEmitter = this.scene.crabParticles.createEmitter({
      angle: { min: -30, max: -150 },
      speed: { min: 200, max: bulletSpeed },
      frame: arr,
      quantity: 16,
      lifespan: 3000,
      alpha: 1,
      rotate: { start: 0, end: 3, ease: 'Linear' },
      gravityY: 300,
      on: false,
    });
    this.scene.crabParticles.emitParticleAt(this.x, this.y).setDepth(2000).setPipeline('Light2D');
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      if (this.state.directionX > 0) {
        this.state.directionX = -100;
      } else {
        this.state.directionX = 100;
      }
    }
  }
}
