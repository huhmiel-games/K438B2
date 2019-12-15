export default class Mine extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      hited: false,
      giveLife: 0,
      type: config.key,
    };

    this.setDepth(97)
      .setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false);
    this.flag = false;
    this.getFired = false;
    // this.lastAnim = null;
    this.animate(config.key);
    console.log(this)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    // let animationName;
    // animationName = this.state.type;
    if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < this.width / 2) {
      this.explode();
    }

    // if (this.lastAnim !== animationName) {
    //   this.lastAnim = animationName;
    //   this.animate(animationName, true);
    // }
  }

  explode() {
    this.setAlpha(0);
    
    const explosion = this.scene.explodeSprite.getFirstDead(true, this.x, this.y, 'enemyExplode', null, true);
    explosion.setDepth(107)
      .setPipeline('TestFx');
    if (this.state.type === 'mine-big') {
      explosion.setScale(2);
    }
    explosion.anims.play('enemyExplode').on('animationcomplete', () => {
      explosion.destroy();
      this.destroy();
    });
  
    
    // this.destroy();
    console.log('explode')
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
