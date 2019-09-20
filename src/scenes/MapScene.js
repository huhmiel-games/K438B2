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
      .setDisplaySize(U.WIDTH * 2, U.HEIGHT * 2)
      .setAlpha(0)
      .setDepth(10000);
    // loading
    this.cameras.main.setZoom(0.5)
    this.mainScene.events.on('pause', () => {
      console.log('pause')
      this.cardBg.setAlpha(1);

      
      const worldMap = Object.values(this.mainScene.cache.tilemap.entries.entries);
      console.log(worldMap)

      for (let i = 0; i < worldMap.length; i += 1) {
        const room = worldMap[i];
        console.log(room.data, i)
        const doors = room.data.layers[16].objects;

        this[`room${i}`] = this.add.image(100, 100, 'iconLaser');//, room.data.width, room.data.height);
        this[`room${i}`].setDisplaySize(room.data.width, room.data.height);
        this[`room${i}`].setDepth(10001);
        if (i > 0) {
          for (let j = 0; j < doors.length; j += 1) {
            this[`room${j}`].setPosition(doors[j].x+ room.data.width, doors[j].y+ room.data.height)
            this[`room${j}`].alpha = i / 10;
            this[`room${j}`].setDepth(10001);
            i += j;
          }
        }
        
      };
      console.log(this)
    });

    this.mainScene.events.on('unpause', () => {
      console.log('unpause')
      this.cardBg.setAlpha(0);
    });

    
  }
}
