import { Scene } from 'phaser';
import U from '../utils/usefull';
// HUD
import atlasHud from '../assets/hud/atlasHUD.png';
import atlasHudJSON from '../assets/hud/atlasHUD.json';
import blackPixel from '../assets/blackPixel.png';
import iconMissile from '../assets/iconMissile.png';
import iconLaser from '../assets/iconLaser.png';
import iconSwell from '../assets/iconSwell.png';
import iconFullscreen from '../assets/iconFullscreen.png';
import bullets from '../assets/spritesheets/Fx/shot.png';
import healthBarIcon from '../assets/HealthBarIcon.png';

export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.atlas('hud', atlasHud, atlasHudJSON);
    this.load.image('blackpixel', blackPixel);
    this.load.image('iconMissile', iconMissile);
    this.load.image('iconLaser', iconLaser);
    this.load.image('iconSwell', iconSwell);
    this.load.image('iconFullscreen', iconFullscreen);
    this.load.image('healthBarIcon', healthBarIcon);
    this.load.spritesheet('bullets', bullets, { frameWidth: 6, frameHeight: 4 });
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    this.cameras.main
      .setPosition(0, 0)
      .setSize(400, 24)
      .setAlpha(0)
      //.setBackgroundColor(0x722188);

    // HUD 
    // ====================================================================
    // this.Header = this.add.image(U.WIDTH * (1 / 3) *2, 22, 'hud')
    //   .setFrame('Header')
      //.setDisplaySize(U.WIDTH, 8);
    this.backLife = this.add.image(-3, -3, 'hud')
      .setOrigin(0, 0)
      .setFrame('HealthBar2')
      //.setDisplaySize(160, 32);
    this.skillBar = this.add.image(313, -2, 'hud')
      .setOrigin(0, 0)
      .setFrame('SkillBar')
      .setDisplaySize(200, 26)
      .setDepth(10)
    
    this.healthBaricon = this.add.image(8, 3, 'healthBarIcon')
      .setOrigin(0, 0)
      //.setDisplaySize(200, 26)


    this.lifeText = this.add.bitmapText(16, 0, 'atomic', 'Health')
      .setFontSize(10)
      .setAlpha(0);

    this.Health = this.add.bitmapText(32, 8, 'atomic', '')
      .setFontSize(9)
      .setText('')
      .setAlpha(0);

    this.bullet = this.add.image(330, 12, 'bullets')
      .setFrame(0)
      .setAlpha(0)
      //.setTint(0xFF3B00)
      .setDisplaySize(4, 4);

    this.swell = this.add.image(348, 12, 'iconSwell')
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.missile = this.add.image(366, 12, 'iconMissile')
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.laser = this.add.image(384, 11, 'iconLaser')
      .setAlpha(1)
      .setDisplaySize(16, 16);

    this.backWeapon = this.add.image(329, 11, 'hud')
      .setFrame('HighlightBox5')
      .setAlpha(1)
      .setDisplaySize(17, 15)
      .setDepth(1)
      .setTint(0xFF0F09);

    this.fullscreenBtn = this.add.image(392, 8, 'iconFullscreen')
      .setDisplaySize(16, 16)
      .setInteractive()
      .on('pointerdown', () => {
        this.scale.toggleFullscreen();
      }, this);

    // loading
    this.mainScene.events.on('loadingDone', () => {
      this.lifeText.setAlpha(0);
      this.fullscreenBtn.setAlpha(0);
      this.cameras.main.setAlpha(1);

      this.Health
        .setAlpha(1)
        .setText(`${this.mainScene.player.inventory.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);

      if (this.mainScene.player.inventory.gun) {
        this.bullet.setAlpha(1);
      }
      if (this.mainScene.player.inventory.missile) {
        this.missile.setAlpha(1);
      }
      if (this.mainScene.player.inventory.laser) {
        this.laser.setAlpha(1);
      }
      if (this.mainScene.player.inventory.swell) {
        this.swell.setAlpha(1);
      }
      console.log(this)
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
      this.bullet.clearTint();
      this.missile.clearTint();
      this.laser.clearTint();
      this.swell.clearTint();
      if (this[elm.selectedWeapon]) {
        //this[elm.selectedWeapon].setTint(0xFF3B00);
        this.backWeapon.setPosition(this[elm.selectedWeapon].x, 11);
      }
    });

    this.mainScene.events.on('pause', () => {
      this.cameras.main.setBackgroundColor(0x000000);
    });

    this.mainScene.events.on('unpause', () => {
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
    });
  }
}
