export default class Octopus extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      hited: false,
      giveLife: config.life / 10,
    };

    this.setDepth(97)
      .setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity()
      .setGravityY(100)
      .setSize(12, 22)
      .setOffset(8, 8);
    this.flag = false;
    this.getFired = false;
    this.lastAnim = null;
    console.log(this)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.scene.player.onWater) {
      if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 100) {
        this.attack();
      } else {
        this.goHome(time);
      }
    } else {
      this.goHome(time);
    }

    if (!this.body.blocked.down) {
      animationName = 'octopus';
    } else {
      animationName = 'octopusIdle';
    }

    if (this.body.velocity.x > 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
  }

  goHome(time) {
    const speed = 50;
    this.body.setVelocity(
      0,
      Math.sin(time * 0.0005) * speed,
    );
  }

  attack() {
    const dx = this.scene.player.x - this.x;
    const dy = this.scene.player.y - this.y;
    const angle = Math.atan2(dy, dx);
    const speed = 90;
    this.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
    );
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }

  explode(bullet) {
    const arr = [];
    for (let i = 0; i < 30; i += 1) {
      arr.push(i.toString());
    }
    // const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    // this.scene.particles = null;
    this.scene.crabParticles = this.scene.add.particles('explodedCrab');
    this.scene.crabEmitter = this.scene.crabParticles.createEmitter({
      angle: { min: -30, max: -150 },
      speed: { min: 200, max: 300 },
      frame: arr,
      quantity: 16,
      lifespan: 3000,
      alpha: 1,
      rotate: { start: 0, end: 3, ease: 'Linear' },
      gravityY: 300,
      on: false,
    });
    this.scene.crabParticles
      .emitParticleAt(this.x, this.y)
      .setDepth(100)
      .setPipeline('Light2D');
  }
}
