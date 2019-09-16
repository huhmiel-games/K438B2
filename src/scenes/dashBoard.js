import { Scene } from 'phaser';
// import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';
import iconMissile from '../assets/iconMissile.png';
import iconLaser from '../assets/iconLaser.png';
import iconSwell from '../assets/iconSwell.png';
import iconFullscreen from '../assets/iconFullscreen.png';

export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.image('blackpixel', blackPixel);
    this.load.image('iconMissile', iconMissile);
    this.load.image('iconLaser', iconLaser);
    this.load.image('iconSwell', iconSwell);
    this.load.image('iconFullscreen', iconFullscreen);
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    this.lifeText = this.add.bitmapText(16, 0, 'atomic', 'H e a l t h')
      .setFontSize(16)
      .setAlpha(0);

    this.Health = this.add.bitmapText(16, 16, 'atomic', '')
      .setFontSize(32)
      .setText('')
      .setAlpha(0);

    this.swell = this.add.image(400, 32, 'iconSwell')
      .setAlpha(0)
      .setDisplaySize(36, 40);

    this.missile = this.add.image(450, 32, 'iconMissile')
      .setAlpha(0)
      .setDisplaySize(36, 40);

    this.laser = this.add.image(500, 32, 'iconLaser')
      .setAlpha(0)
      .setDisplaySize(36, 40);

    this.fullscreenBtn = this.add.image(750, 32, 'iconFullscreen')
      .setDisplaySize(64, 64)
      .setInteractive()
      .on('pointerdown', () => {
        this.scale.toggleFullscreen();
      }, this);

    // loading
    this.mainScene.events.on('loadingDone', () => {
      this.lifeText.setAlpha(1);

      this.Health
        .setAlpha(1)
        .setText(`${this.mainScene.player.inventory.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);

      if (this.mainScene.player.inventory.missile) {
        this.missile.setAlpha(1);
      }
      if (this.mainScene.player.inventory.laser) {
        this.laser.setAlpha(1);
      }
      if (this.mainScene.player.inventory.swell) {
        this.swell.setAlpha(1);
      }
    });

    this.mainScene.events.on('setHealth', (elm) => {
      this.Health.setText(`${elm.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);
    });

    this.mainScene.events.on('addEnergyPack', (elm) => {
      this.Health.setText(elm.life);
    });

    this.mainScene.events.on('addWeapon', (elm) => {
      this[elm.Weapon].setAlpha(1);
    });

    this.mainScene.events.on('selectWeapon', (elm) => {
      this.missile.clearTint();
      this.laser.clearTint();
      this.swell.clearTint();
      if (this[elm.selectedWeapon]) {
        this[elm.selectedWeapon].setTint(0xFF3B00);
      }
    });
  }
}
