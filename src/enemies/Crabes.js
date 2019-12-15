export default class Crabe extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 30,
      directionY: 0,
      hited: false,
      giveLife: config.life / 10,
    };
    this.setDepth(101);
    this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity().setGravityY(500).setSize(16, 16).setOffset(16, 12);
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.followPath) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = 30;
      }
      if (this.body.blocked.right) {
        this.state.directionX = -30;
      }
      // fall
      if (this.body.blocked.none) {
        this.state.directionY = 600;
      }
      if (this.body.blocked.down) {
        this.state.directionY = 0;
      }
      // flip the sprite
      if (this.state.directionX > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
    }
    if (this.active && this.scene[`path${this.name}`]) {
      this.scene[`path${this.name}`].active ? this.startOnPath() : this.followPath = false;
    }
  }

  startOnPath() {
    this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
    this.body.setAllowGravity(false);
    this.angle = this.scene[`path${this.name}`].angle;
    this.followPath = true;
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.scene.sound.play('enemyHit');
    this.state.life = this.state.life - e;
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      if (this.state.directionX > 0) {
        this.state.directionX = -30;
      } else {
        this.state.directionX = 30;
      }
    }
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
    this.scene.crabParticles.emitParticleAt(this.x, this.y).setDepth(2000).setPipeline('Light2D');
  }
}
