import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';

export default class MapScene extends Scene {
  constructor() {
    super({ key: 'MapScene', active: true });
  }

  preload() {
    this.load.image('bg', blackPixel);
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    this.cardBg = this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT - 64)
      .setAlpha(0)
      .setDepth(10000);
    // loading
    this.mainScene.events.on('pause', () => {
      console.log('pause')
     this.cardBg.setAlpha(1);
    });

    this.mainScene.events.on('unpause', () => {
      console.log('unpause')
      this.cardBg.setAlpha(0);
    });
  }
}
