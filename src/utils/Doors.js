export default class Doors extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.state = {
      key: config.key,
      side: config.side,
      destination: config.destination,
      playerX: config.playerX,
      playerY: config.playerY,
      openWith: config.openWith,
    };
    this.setTexture('various');
    if (config.key === 'doorBlue') this.setFrame(0);
    if (config.key === 'doorGreen') this.setFrame(4);
    if (config.key === 'doorRed') this.setFrame(8);
    this.setDepth(110);
    this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.mass = 20;
    this.isOpen = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  animate(str) {
    this.anims.play(str, true).on('animationcomplete', () => {
      this.setAlpha(0);
    });
  }

  destroyDoor() {
    this.destroy(true);
  }

  openDoor() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.scene.sound.play('door', { rate: 2 });
      console.log(`open${this.state.key}`)
      this.anims.play(`open${this.state.key}`, true).on('animationcomplete', () => {
        this.setAlpha(0);
        if (this.state.side === 'left') {
          this.x = this.x + 32;
        } else if (this.state.side === 'right') {
          this.x = this.x - 32;
        }
      });
    }
  }

  setDoorPosition(x, y) {
    this.body.reset(x, y);
  }
}
