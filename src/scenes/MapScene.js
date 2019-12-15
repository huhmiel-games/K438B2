import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';
import mapGrid from '../assets/backgrounds/mapGrid.png';
import roomImg from '../assets/room.png';


export default class MapScene extends Scene {
  constructor() {
    super({ key: 'MapScene', active: true });
  }

  preload() {
    this.load.image('bg', blackPixel);
    this.load.image('mapGrid', mapGrid);
    this.load.image('roomImg', roomImg);
    // this.load.image('iconLaser', iconLaser);
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');

    this.cameras.main
      .setViewport(0, 25, 1000, 1000)
      .setSize(480, 256 - 25)
      .setPosition(0, 25)
      .setAlpha(0)
      .setBackgroundColor(0x722188);

    this.cardBg = this.add.image(0, 0, 'mapGrid')
      .setOrigin(0, 0)
      .setDepth(3000)
      .setDisplaySize(480, 384)
      .setAlpha(0.3);

    this.HeaderTop = this.add.image(U.WIDTH / 2, -6, 'hud')
      .setOrigin(0.5, 0)
      .setFrame('Header')
      .setDisplaySize(U.WIDTH, 16)
      .setDepth(4000)
      .setScrollFactor(0, 0);

    this.HeaderBottom = this.add.image(U.WIDTH / 2, U.HEIGHT - 35, 'hud')
      .setOrigin(0.5, 0)
      .setFrame('Header')
      .setDisplaySize(U.WIDTH, 16)
      .setDepth(4000)
      .setFlipY(true)
      .setScrollFactor(0, 0);

    this.HeaderLeft = this.add.image(10, 3, 'hud')
      .setOrigin(0, 0)
      .setFrame('Header')
      .setDisplaySize(U.HEIGHT - 28, 16)
      .setDepth(4000)
      .setAngle(90)
      .setFlipY(true)
      .setScrollFactor(0, 0);

    this.HeaderRight = this.add.image(U.WIDTH + 6, 3, 'hud')
      .setOrigin(0, 0)
      .setFrame('Header')
      .setDisplaySize(U.HEIGHT - 28, 16)
      .setDepth(4000)
      .setAngle(90)
      .setFlipY(false)
      .setScrollFactor(0, 0);

    this.roomGroup = [];
    // loading
    this.playerPos = null;

    this.mainScene.events.on('loadingDone', () => {
      this.playerPos = this.add.image(0, 0, 'head').setDisplayOrigin(0.5, 0).setDisplaySize(4, 4).setDepth(3000);
      const worldMap = Object.values(this.mainScene.cache.tilemap.entries.entries);
      // console.log(worldMap)

      // worldMap.length
      for (let i = 0; i < 20; i += 1) {
        const room = worldMap[i];
        const roomWidth = room.data.width / 25;
        const roomHeight = room.data.height / 16;
        const pos = room.data.properties.mapScenePosition.split(',');
        // console.log(room)
        if (pos) {
          this[`room${i}`] = this.add.image(pos[0] * 16 + 1, (pos[1] * 16) + 1, 'roomImg');
          this[`room${i}`]
            .setDisplayOrigin(0, 0)
            .setDisplaySize(roomWidth * 16 - 2, roomHeight * 16 - 2)
            .setDepth(3010)
            .setAlpha(0)
            .setTint(pos[2]);
          this[`room${i}`].name = `map${i + 1}`;
          if (room.data.layers[20].objects[0]) {
            room.data.layers[20].objects[0].properties.key === 'savestation'
              ? this.add.bitmapText(pos[0] * 16 + 4, (pos[1] * 16) + 2, 'atomic', 'S', 10, 1).setDepth(3011)
              : null;
          }
          if (room.data.layers[5].objects[0]) {
            if (room.data.layers[5].objects[0]) {
              const elx = room.data.layers[5].objects[0].x;
              const ely = room.data.layers[5].objects[0].y;
              this.add.bitmapText(
                pos[0] * 16 + elx / 25,
                pos[1] * 16 + (ely / 16) - 4,
                'atomic', 'O', 4, 1,
              ).setDepth(3011).setTint(0xD8F613);
            }
          }
          this.roomGroup.push(this[`room${i}`]);
        }
      }
    });

    // ON PAUSE
    this.mainScene.events.on('pause', () => {
      this.cameras.main.setAlpha(1);
      // this.cardBg.setAlpha(1);
      this.roomGroup.forEach((e) => {
        if (this.mainScene.player.inventory.visitedRooms.includes(e.name)) {
          e.setAlpha(1);
        }
      });

      // positionne le player sur la map
      const roomNbr = this.mainScene.playerPosition.substr(3) - 1;
      // console.log('roomNbr: ', roomNbr)
      this.playerPos
        .setPosition(this[`room${roomNbr}`].x + this.mainScene.player.x / 25 - 4, this[`room${roomNbr}`].y + this.mainScene.player.y / 16 - 4)
        .setDepth(3020);
    });

    // QUIT PAUSE
    this.mainScene.events.on('unpause', () => {
      this.cameras.main.setAlpha(0);
    });

    this.mainScene.events.on('scrollMapDown', () => {
      if (this.cameras.main.scrollY < this.cardBg.height - 224) {
        this.cameras.main.scrollY += 2;
      }
    });

    this.mainScene.events.on('scrollMapUp', () => {
      if (this.cameras.main.scrollY > 4) {
        this.cameras.main.scrollY -= 2;
      }
    });
  }
}
