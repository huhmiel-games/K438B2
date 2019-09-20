import { Scene } from 'phaser';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import Crabes from '../enemies/Crabes';
import Guepes from '../enemies/Guepes';
import Jumpers from '../enemies/Jumpers';
import Octopus from '../enemies/Octopus';
import RhinoBeetles from '../enemies/RhinoBeetles';
import Boss1 from '../enemies/Boss1';
import BossFinal from '../enemies/BossFinal';
import Elevators from '../utils/Elevators';
import Doors from '../utils/Doors';
import SaveStation from '../utils/saveStation';
import Lava from '../utils/Lava';
import FireBalls from '../enemies/FireBalls';
import WaterFall from '../utils/WaterFalls';
import U from '../utils/usefull';
import countDeadEnemies from '../utils/counDeadEnemies';
import countTime from '../utils/countTime';

// Player
import spritesheetPlayer from '../assets/spritesheets/player/atlas/spritesheetPlayer.png';
import spritesheetPlayerJaune from '../assets/spritesheets/player/atlas/spritesheetPlayer_jaune.png';
import spritesheetPlayerN from '../assets/spritesheets/player/atlas/spritesheetPlayer_n.png';
import spritesheetPlayerJSON from '../assets/spritesheets/player/atlas/spritesheetPlayer.json';

// Various
import spritesheetVarious from '../assets/various/spritesheetVarious.png';
import spritesheetVariousN from '../assets/various/spritesheetVarious_n.png';
import spritesheetVariousJSON from '../assets/various/spritesheetVarious.json';


// import playerRunShoot from '../assets/spritesheets/player/runShoot.png';
// import playerRunShootN from '../assets/spritesheets/player/runShoot_n.png';
// import idle from '../assets/spritesheets/player/idle.png';
// import stand from '../assets/spritesheets/player/stand.png';
// import standN from '../assets/spritesheets/player/stand_n.png';
// import jump from '../assets/spritesheets/player/jump.png';
// import jumpVertical from '../assets/spritesheets/player/jumpVertical.png';
// import duck from '../assets/spritesheets/player/duck.png';
// import shootUp from '../assets/spritesheets/player/shootUp.png';
// import morphingBall from '../assets/spritesheets/player/morphingBall.png';

// Power Up
import powerupBlue from '../assets/powerupBleu.png';
import powerupYellow from '../assets/powerupJaune.png';
import powerupGreen from '../assets/powerupVert.png';
import powerupRed from '../assets/powerupRouge.png';
import powerUp from '../assets/spritesheets/Fx/power-up.png';

// Enemies
import spritesheetEnemies from '../assets/spritesheets/enemies/atlas/spritesheetEnemies.png';
import spritesheetEnemiesN from '../assets/spritesheets/enemies/atlas/spritesheetEnemies_n.png';
import spritesheetEnemiesJSON from '../assets/spritesheets/enemies/atlas/spritesheetEnemies.json';

import crabe from '../assets/spritesheets/enemies/crab-walk.png';
import crabeN from '../assets/spritesheets/enemies/crab-walk_n.png';
import guepe from '../assets/spritesheets/enemies/guepe.png';
import guepe2 from '../assets/spritesheets/enemies/guepe2.png';
import jumper from '../assets/spritesheets/enemies/jumper-idle.png';
import jumper2 from '../assets/spritesheets/enemies/jumper-idle2.png';
import enemyExplode from '../assets/spritesheets/Fx/enemy-death.png';
import octopus from '../assets/spritesheets/enemies/octopus.png';
import fireballs from '../assets/fire-ball.png';
import rhinoBeetle from '../assets/spritesheets/enemies/rhinoBeetle.png';

// boss 1
import boss1wallfront from '../assets/boss1wallfront.png';
import boss1Walk from '../assets/spritesheets/enemies/boss1walk.png';
import boss1Run from '../assets/spritesheets/enemies/boss1run.png';
import boss1Crouch from '../assets/spritesheets/enemies/boss1crouch.png';
import boss1Attack from '../assets/spritesheets/enemies/boss1attack.png';
import boss1Jump from '../assets/spritesheets/enemies/boss1jump.png';
import boss1Hit from '../assets/spritesheets/enemies/boss1hit.png';

// final boss
import bosstest from '../assets/spritesheets/enemies/bossAttack.png';
// Map
import tiles from '../assets/environment/layers/tilesets.png';
import tilesN from '../assets/environment/layers/tilesets_n.png';
import map1 from '../maps/map1.json';
import map2 from '../maps/map2.json';
import map3 from '../maps/map3.json';
import map4 from '../maps/map4.json';
import map5 from '../maps/map5.json';
import map6 from '../maps/map6.json';
import map7 from '../maps/map7.json';
import map8 from '../maps/map8.json';
import map9 from '../maps/map9.json';


// Various
import bullet from '../assets/spritesheets/Fx/shot.png';
import bomb from '../assets/bomb.png';
import laser from '../assets/laser.png';
import impact from '../assets/spritesheets/Fx/impact.png';
import missile from '../assets/missile.png';
import swell from '../assets/swell.png';
import blackPixel from '../assets/blackPixel.png';
import lavaPixel from '../assets/lavaPixel.png';
import elevator from '../assets/elevator.png';
import door from '../assets/door.png';
import doorN from '../assets/door_n.png';
import doorGreen from '../assets/doorGreen.png';
import doorRed from '../assets/doorRed.png';
import saveStation from '../assets/savestation.png';
import head from '../assets/head.png';
import whitePixel from '../assets/whitePixel.png';
import lava from '../assets/lava.png';
import lavaFall from '../assets/lava-fall.png';
import waterFall from '../assets/waterfall.png';
import boss1dead from '../assets/boss1dead.png';

// parralax
import paraMiddleground from '../assets/environment/layers/para_middleground.png';
import paraBackground from '../assets/environment/layers/background.png';
import paraBackMountain from '../assets/environment/layers/backMountain.png';
import paraMiddleMountain from '../assets/environment/layers/para_middleMountain.png';
import bgLava from '../assets/bgLava.png';

// import sounds fx
import bulletFX from '../assets/sounds/bullet.ogg';
import swellFX from '../assets/sounds/swell.ogg';
import missileFX from '../assets/sounds/missile.ogg';
import laserFX from '../assets/sounds/laser3.ogg';
import impactFX from '../assets/sounds/explo.ogg';
import explo2FX from '../assets/sounds/explo2.ogg';
import enemyImpactFX from '../assets/sounds/enemyHit.ogg';
import playerHitFX from '../assets/sounds/playerHit.ogg';
import morphFX from '../assets/sounds/playerHit2.ogg';
import powerUpFX from '../assets/sounds/powerup.ogg';
import selectFX from '../assets/sounds/select.ogg';
import doorFX from '../assets/sounds/elevator.ogg';
import jumpBoosterFX from '../assets/sounds/jumpboost.ogg';
import getLifeFX from '../assets/sounds/getlife2.ogg';
import runFX from '../assets/sounds/walk.ogg';
import explo3FX from '../assets/sounds/explo3.ogg';
import melo from '../assets/sounds/melo1.ogg';
import playerDead from '../assets/sounds/playerdead.ogg';
import shake from '../assets/sounds/shake3.ogg';
import shake2 from '../assets/sounds/shake4.ogg';
import guepeFX from '../assets/sounds/guepe.ogg';
import grog from '../assets/sounds/grog.ogg';

// import boss1 sounds fx
import cri1 from '../assets/sounds/boss1/cri-001.ogg';
import cri2 from '../assets/sounds/boss1/cri-002.ogg';
import cri3 from '../assets/sounds/boss1/cri-003.ogg';
import cri4 from '../assets/sounds/boss1/cri-004.ogg';
import LetsPlayWithTheDemon from '../assets/music/LetsPlayWithTheDemon.ogg';

// import music
import ambient1 from '../assets/music/ambient1.ogg';
import ambient2 from '../assets/music/ambient2.ogg';
import waterAmbient from '../assets/music/waterAmbiance.ogg';
import ambient3 from '../assets/music/grotte.ogg';

export default class playLvl1 extends Scene {
  constructor() {
    super('playLvl1');
    this.state = {
      displayPowerUpMsg: false,
    };
  }

  // ====================================================================
  preload() {
    // map
    this.load.image('tiles', [tiles, tilesN]);
    this.load.tilemapTiledJSON('map1', map1);
    this.load.tilemapTiledJSON('map2', map2);
    this.load.tilemapTiledJSON('map3', map3);
    this.load.tilemapTiledJSON('map4', map4);
    this.load.tilemapTiledJSON('map5', map5);
    this.load.tilemapTiledJSON('map6', map6);
    this.load.tilemapTiledJSON('map7', map7);
    this.load.tilemapTiledJSON('map8', map8);
    this.load.tilemapTiledJSON('map9', map9);
    // this.load.image('test', test);

    // player animation
    this.load.atlas('player', [spritesheetPlayer, spritesheetPlayerN], spritesheetPlayerJSON);
    this.load.atlas('playerJaune', [spritesheetPlayerJaune, spritesheetPlayerN], spritesheetPlayerJSON);
    // this.load.spritesheet('playerShoot', [playerRunShoot, playerRunShootN], { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('idle', idle, { frameWidth: 40, frameHeight: 55 });
    // this.load.spritesheet('stand', [stand, standN], { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('duck', duck, { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('shootUp', shootUp, { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('jump', jump, { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('jumpVertical', jumpVertical, { frameWidth: 40, frameHeight: 40 });
    // this.load.spritesheet('morphingBall', morphingBall, { frameWidth: 40, frameHeight: 40 });

    // player bullets
    this.load.spritesheet('bullet', bullet, { frameWidth: 6, frameHeight: 4 });
    this.load.spritesheet('impact', impact, { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('missile', missile, { frameWidth: 18, frameHeight: 10 });
    this.load.spritesheet('bomb', bomb, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('swell', swell, { frameWidth: 12, frameHeight: 12 });
    this.load.image('laser', laser);

    // various
    this.load.atlas('various', [spritesheetVarious, spritesheetVariousN], spritesheetVariousJSON);

    // power up
    this.load.spritesheet('powerupBlue', powerupBlue, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupYellow', powerupYellow, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupGreen', powerupGreen, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupRed', powerupRed, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerUp', powerUp, { frameWidth: 23, frameHeight: 21 });

    // Enemies
    this.load.atlas('enemies', [spritesheetEnemies, spritesheetEnemiesN], spritesheetEnemiesJSON);

    this.load.spritesheet('crabe', [crabe, crabeN], { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('guepe', guepe, { frameWidth: 40, frameHeight: 47 });
    this.load.spritesheet('guepe2', guepe2, { frameWidth: 40, frameHeight: 47 });
    this.load.spritesheet('jumper', jumper, { frameWidth: 47, frameHeight: 32 });
    this.load.spritesheet('jumper2', jumper2, { frameWidth: 47, frameHeight: 32 });
    this.load.spritesheet('enemyExplode', enemyExplode, { frameWidth: 67, frameHeight: 48 });
    this.load.spritesheet('octopus', octopus, { frameWidth: 28, frameHeight: 37 });
    this.load.spritesheet('fireball', fireballs, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('rhinobeetle', rhinoBeetle, { frameWidth: 80, frameHeight: 64 });

    // boss
    this.load.image('boss1wallfront', boss1wallfront);
    this.load.spritesheet('boss1walk', boss1Walk, { frameWidth: 184, frameHeight: 136 });
    this.load.spritesheet('boss1run', boss1Run, { frameWidth: 178, frameHeight: 136 });
    this.load.spritesheet('boss1crouch', boss1Crouch, { frameWidth: 185, frameHeight: 136 });
    this.load.spritesheet('boss1attack', boss1Attack, { frameWidth: 188, frameHeight: 136 });
    this.load.spritesheet('boss1hit', boss1Hit, { frameWidth: 153, frameHeight: 136 });
    this.load.spritesheet('boss1jump', boss1Jump, { frameWidth: 172, frameHeight: 179 });

    // final boss
    this.load.spritesheet('bossFinal', bosstest, { frameWidth: 384, frameHeight: 480 });

    // various map items
    // this.load.spritesheet('savestation', saveStation, { frameWidth: 40, frameHeight: 60 });
    this.load.image('head', head);
    this.load.image('elevator', elevator);
    // this.load.spritesheet('door', [door, doorN], { frameWidth: 8, frameHeight: 64 });
    // this.load.spritesheet('doorGreen', doorGreen, { frameWidth: 8, frameHeight: 64 });
    // this.load.spritesheet('doorRed', doorRed, { frameWidth: 8, frameHeight: 64 });
    this.load.spritesheet('savestation', saveStation, { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('lava', lava, { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('lavaFall', lavaFall, { frameWidth: 16, frameHeight: 16 });
    // this.load.spritesheet('waterFall', waterFall, { frameWidth: 16, frameHeight: 16 });
    this.load.image('blackPixel', blackPixel);
    this.load.image('whitePixel', whitePixel);
    this.load.image('lavaPixel', lavaPixel);
    this.load.image('boss1dead', boss1dead);

    // parralax
    this.load.image('para_middle', paraMiddleground);
    this.load.image('para_back', paraBackground);
    this.load.image('para_mountain', paraBackMountain);
    this.load.image('para_middleMountain', paraMiddleMountain);

    this.load.image('bgLava', bgLava);

    // sounds
    this.load.audio('bullet', bulletFX);
    this.load.audio('swell', swellFX);
    this.load.audio('missile', missileFX);
    this.load.audio('laser', laserFX);
    this.load.audio('impact', impactFX);
    this.load.audio('explo2', explo2FX);
    this.load.audio('explo3', explo3FX);
    this.load.audio('enemyHit', enemyImpactFX);
    this.load.audio('playerHit', playerHitFX);
    this.load.audio('powerUp', powerUpFX);
    this.load.audio('select', selectFX);
    this.load.audio('jumpBooster', jumpBoosterFX);
    this.load.audio('getLife', getLifeFX);
    this.load.audio('run', runFX);
    this.load.audio('morph', morphFX);
    this.load.audio('melo', melo);
    this.load.audio('playerDead', playerDead);
    this.load.audio('shake', shake);
    this.load.audio('shake2', shake2);
    this.load.audio('guepe', guepeFX);
    this.load.audio('jumpers', grog);
    this.load.audio('door', doorFX);
    this.load.audio('doorLocked', morphFX);

    // sounds boss1
    this.load.audio('cri1', cri1);
    this.load.audio('cri2', cri2);
    this.load.audio('cri3', cri3);
    this.load.audio('cri4', cri4);
    this.load.audio('LetsPlayWithTheDemon', LetsPlayWithTheDemon);
    // music
    this.load.audio('ambient1', ambient1);
    this.load.audio('ambient2', ambient2);
    this.load.audio('ambient3', ambient3);
    this.load.audio('waterAmbient', waterAmbient);
  }

  // ====================================================================
  create() {
    this.createAnimations();

    // initialize the map and tileset
    this.map = this.make.tilemap(this, { key: 'map1', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);

    // initialize the time
    this.firstTimestamp = new Date().getTime();
    if (!localStorage.getItem('time')) {
      localStorage.setItem('time', 0);
    }

    // call stopFullscreen on esc key to prevent phaser 16.2 bug on esc key
    this.leaveFullscreenKey = this.input.keyboard.addKey('ESC')
      .on('down', () => {
        this.scale.stopFullscreen();
      });

    // ====================================================================
    // parralax backgrounds
    // this.para_back = this.add.image(0, 0, 'para_back')
    //   .setDepth(0)
    //   .setScrollFactor(0.1)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(800, 512);

    // this.para_middle = this.add.image(0, 0, 'para_middle')
    //   .setDepth(3)
    //   .setScrollFactor(0.5)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(2048, 1024);

    // this.para_lava = this.add.image(0, 880, 'bgLava')
    //   .setDepth(5)
    //   .setScrollFactor(0.5)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(1600, 1200);

    // ====================================================================
    // Groups that need to be destroyed when changing room
    this.giveLifeGroup = [];
    this.powerups = [];
    this.enemyGroup = [];
    this.elevatorGroup = [];
    this.lavaGroup = [];
    this.doorGroup = [];
    this.saveStationGroup = [];
    this.pathGroup = [];

    // ====================================================================
    // player in water effect (need to be translated to room part)
    // this.waterAmbientMusic = this.sound.add('waterAmbient', { volume: 0.6 });
    // this.solLayer.setTileLocationCallback(2, 34, 26, 18, (e) => {
    //   if (e === this.player) {
    //     this.player.onWater = true;
    //     this.player.setDepth(98);
    //     if (!this.waterAmbientMusic.isPlaying) {
    //       this.waterAmbientMusic.play();
    //     }
    //   }
    // }, this);
    // this.solLayer.setTileLocationCallback(30, 31, 1, 21, () => {
    //   this.player.onWater = false;
    //   this.player.setDepth(105);
    //   this.waterAmbientMusic.stop();
    // }, this);
    // this.solLayer.setTileLocationCallback(2, 53, 29, 1, () => {
    //   this.player.onWater = false;
    //   this.player.setDepth(105);
    //   this.waterAmbientMusic.stop();
    // }, this);

    // ====================================================================
    // AMBIENT MUSIC
    this.musicGroup = [];
    this.ambient1 = this.sound.add('ambient1', { volume: 0.2, loop: true });
    this.ambient2 = this.sound.add('ambient2', { volume: 0.1, loop: true });
    this.ambient3 = this.sound.add('ambient3', { volume: 0.1, loop: true });

    this.musicGroup.push(this.ambient1, this.ambient2, this.ambient3);

    // ====================================================================

    // ====================================================================
    // PLAYER SECTION
    this.player = new Player(this, 34 * 16, 26 * 16, { key: 'player' }); // 458, 122
    this.playerHurt = false;
    this.player.body.setSize(15, 35, 6, 11);
    
    // player walk and run sounds
    this.walkplay = false;
    this.walkk = this.sound.add('run', { volume: 0.8 });
    this.player.on('animationupdate', () => {
      if (this.player.anims.currentAnim.key === 'runShoot' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: 150,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
      if (this.player.anims.currentAnim.key === 'walkShoot' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: 250,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
    });
    // player bullets
    this.player.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    // player missiles
    this.player.missiles = this.physics.add.group({
      defaultKey: 'missile',
      maxSize: 1,
      allowGravity: false,
      createIfNull: true,
    });
    // player swell
    this.player.swells = this.physics.add.group({
      defaultKey: 'swell',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    // player morphing bomb
    this.player.bombs = this.physics.add.group({
      defaultKey: 'bomb',
      maxSize: 3,
      allowGravity: false,
      createIfNull: true,
    });
    // player laser
    this.player.lasers = this.physics.add.group({
      defaultKey: 'laser',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    this.playerFlashTween = null;

    // ====================================================================
    // loading saved game
    if (this.data.systems.settings.data.loadSavedGame) {
      this.loadGame();
    }
    // creating new game
    if (!localStorage.getItem('k438b')) {
      // this.transmission('New transmision-A problem occured during-the material transfer on planet-Sorry for inconvenience.');
      this.player.inventory.savedPositionX = 34 * 16;
      this.player.inventory.savedPositionY = 26 * 16;
      const s = JSON.stringify(this.player.inventory);
      localStorage.setItem('k438b', s);
      this.loadGame();
    }

    this.explodeSprite = this.add.group({
      defaultKey: 'transparentPixel',
      maxSize: 30,
      allowGravity: false,
      createIfNull: true,
    });


    // LAVA RISE
    this.lavaRiseFlag = false;
    this.onSismic = false;
    this.isTheEnd = false; // My only friend, the end

    // ====================================================================
    // CAMERA
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
    this.cameras.main.transparent = true;
    this.cameras.main.fadeIn(200);

    // set the fps to 120 for good collisions at high speed
    this.physics.world.setFPS(120);

    // //////////////////////////////////////////////////////////////////////
    // mask for morphing sonar
    // this.mask = this.make.graphics({ fillStyle: { color: 0xffffff }, add: false })
    //   .fillCircleShape(new Phaser.Geom.Circle(0, 6, 30));

    // this.frontLayer.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
    // this.frontLayer.mask.invertAlpha = true;
    // ====================================================================
    // load the dashBoard
    this.events.emit('loadingDone');

    // DEBUG / HELPERS
    this.text1 = this.add.text(10, 226, '', { fill: '#00ff00' }).setDepth(5000);
  }

  // ====================================================================
  update() {
    // DEBUG
    const pointer = this.input.activePointer;

    this.text1.setText([
      `x: ${Math.round(pointer.worldX)}`,
      `y: ${Math.round(pointer.worldY)}`,
    ]);
    this.text1.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY + 226)
    // lava rise
    if (this.lavaRise) {
      this.stopLavaRise();
      this.sismicActivity();
    }
    if (this.playerLight && this.player) {
      this.playerLight.setPosition(this.player.body.x, this.player.body.y);
    } else {
      this.playerLight.setPosition(-1000, -1000);
    }
    // player sonar
    this.setSonarPosition();
    // ====================================================================

    if (this.state.displayPowerUpMsg) {
      this.msgtext.x = this.player.x;
      this.msgtext.y = this.player.y - 60;
    }
    if (this.modalText) {
      this.modalText.x = this.player.x;
      this.modalText.y = this.player.y - 100;
    }
  }

  // ====================================================================
  // ANIMATIONS
  createAnimations() {
    // player
    this.anims.create({
      key: 'playerWalk',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 9,
        first: 0,
      }),
      frameRate: 18,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerRun',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 9,
        first: 0,
      }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumpBoost',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13, first: 10 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 16, first: 14 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', { start: 20, end: 25, first: 20 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumpVertical',
      frames: this.anims.generateFrameNumbers('player', { start: 19, end: 19, first: 19 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'duck',
      frames: this.anims.generateFrameNumbers('player', { start: 17, end: 17, first: 17 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'shootup',
      frames: this.anims.generateFrameNumbers('player', { start: 18, end: 18, first: 18 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'morphingBall',
      frames: this.anims.generateFrameNumbers('player', { start: 26, end: 29, first: 26 }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'morphingBallIdle',
      frames: this.anims.generateFrameNumbers('player', { start: 26, end: 29, first: 26 }),
      frameRate: 1,
      repeat: -1,
    });
    // ////////////////////////////////////////////////////
    // weapons
    this.anims.create({
      key: 'bull',
      frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'missile',
      frames: this.anims.generateFrameNumbers('missile', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'swell',
      frames: this.anims.generateFrameNumbers('swell', { start: 0, end: 7, first: 0 }),
      frameRate: 24,
      repeat: -1,
    });
    this.anims.create({
      key: 'bomb',
      frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 1, first: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    // impacts
    this.anims.create({
      key: 'impact',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: 'impactBomb',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      repeat: 0,
    });
    // power-up
    this.anims.create({
      key: 'powerupYellow',
      frames: this.anims.generateFrameNumbers('various', { start: 30, end: 35, first: 30 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupBlue',
      frames: this.anims.generateFrameNumbers('various', { start: 12, end: 17, first: 12 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupRed',
      frames: this.anims.generateFrameNumbers('various', { start: 24, end: 29, first: 24 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupGreen',
      frames: this.anims.generateFrameNumbers('various', { start: 18, end: 23, first: 18 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerUp',
      frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });

    // doors
    this.anims.create({
      key: 'opendoorBlue',
      frames: this.anims.generateFrameNumbers('various', { start: 0, end: 3, first: 0 }),
      frameRate: 16,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'opendoorGreen',
      frames: this.anims.generateFrameNumbers('various', { start: 4, end: 7, first: 4 }),
      frameRate: 16,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'opendoorRed',
      frames: this.anims.generateFrameNumbers('various', { start: 8, end: 11, first: 8 }),
      frameRate: 16,
      yoyo: false,
      repeat: 0,
    });
    // savestation anim
    this.anims.create({
      key: 'savestation',
      frames: this.anims.generateFrameNumbers('savestation', { start: 0, end: 1, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    // ====================================================================
    // SECTION ENEMIES
    // explode animation
    this.anims.create({
      key: 'enemyExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'bossExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: 10,
    });
    // anims enemies
    this.anims.create({
      key: 'crabe',
      frames: this.anims.generateFrameNumbers('enemies', { start: 0, end: 3, first: 0 }),
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'guepe',
      frames: this.anims.generateFrameNumbers('enemies', { start: 4, end: 6, first: 4 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'guepe2',
      frames: this.anims.generateFrameNumbers('enemies', { start: 7, end: 9, first: 7 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper1Idle',
      frames: this.anims.generateFrameNumbers('jumper', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper1Jump',
      frames: this.anims.generateFrameNumbers('jumper', { start: 4, end: 4, first: 4 }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'jumper2Idle',
      frames: this.anims.generateFrameNumbers('jumper2', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper2Jump',
      frames: this.anims.generateFrameNumbers('jumper2', { start: 4, end: 4, first: 4 }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'octopus',
      frames: this.anims.generateFrameNumbers('octopus', { start: 0, end: 3, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'octopusIdle',
      frames: this.anims.generateFrameNumbers('octopus', { start: 2, end: 2, first: 2 }),
      frameRate: 1,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('various', { start: 36, end: 38, first: 36 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'rhinoWalk',
      frames: this.anims.generateFrameNumbers('rhinobeetle', { start: 0, end: 2, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'rhinoBall',
      frames: this.anims.generateFrameNumbers('rhinobeetle', { start: 3, end: 6, first: 3 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    // lava
    this.anims.create({
      key: 'lava',
      frames: this.anims.generateFrameNumbers('various', { start: 45, end: 47, first: 45 }),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'lavaFall',
      frames: this.anims.generateFrameNumbers('various', { start: 42, end: 44, first: 42 }),
      frameRate: 3,
      yoyo: false,
      repeat: -1,
    });
    // water fall
    this.anims.create({
      key: 'waterFall',
      frames: this.anims.generateFrameNumbers('various', { start: 39, end: 41, first: 39 }),
      frameRate: 6,
      yoyo: false,
      repeat: -1,
    });
  }
  // ====================================================================
  // morphing sonar set position

  async setSonarPosition() {
    if (!this.mask || !this.player.inventory.morphingSonar) {
      return;
    }
    if (this.player.state.onMorphingBall) {
      this.mask.x = this.player.x;
      this.mask.y = this.player.y;
    } else {
      this.mask.x = -300;
      this.mask.y = -300;
    }
  }

  playMusic(music) {
    for (let i = 0; i < this.musicGroup.length; i += 1) {
      if (this.musicGroup[i].isPlaying && this.musicGroup[i].key === music) {
        break;
      }
      this.musicGroup[i].stop();
      this[music].play();
    }
  }

  sismicActivity() {
    if (!this.onSismic) {
      this.onSismic = true;
      const rdm = Phaser.Math.Between(2000, 5000);
      this.shakeCamera(1000);
      this.sound.play('shake', { volume: 0.5 });
      // this.sound.play('shake2', { volume: 0.5 });
      this.time.addEvent({
        delay: rdm,
        callback: () => {
          this.onSismic = false;
        },
      });
    }
  }

  startLavaRise() {
    this.transmission('ALERT-High sismic activity detected-return to spacehip for evacuation');
    this.solLayer.setTileLocationCallback(119, 3, 1, 9, (e) => {
      if (e === this.player) {
        this.endMission();
      }
    }, this);
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.lavaRise = this.physics.add.image(0, 3072, 'lavaPixel')
          .setOrigin(0, 0)
          .setDisplaySize(2048, 3072)
          .setDepth(99)
          .setAlpha(0.9)
          .setOffset(0, 0);
        this.lavaRise.body.setVelocityY(-43)
          .setImmovable(true)
          .setAllowGravity(false);
        this.physics.add.overlap(this.player, this.lavaRise, () => this.player.handleLava(), null, this.player);
      },
    });
  }

  stopLavaRise() {
    if (!this.lavaRiseFlag && this.lavaRise.y > 0) {
      this.lavaRiseFlag = true;
    }
    if (this.lavaRise.y < 0) {
      this.lavaRise.setVelocityY(0);
    }
  }

  // ====================================================================
  getPowerUp(elm) {
    this.state.displayPowerUpMsg = true;
    if (elm.state.ability === 'energy') {
      this.player.addEnergy();
      this.events.emit('setHealth', { life: this.player.inventory.life });
    } else if (elm.state.ability === 'speedfire') {
      this.player.addSpeedFire();
    } else if (elm.state.ability === 'missile') {
      this.player.addMissile();
    } else if (elm.state.ability === 'laser') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addLaser();
    } else if (elm.state.ability === 'swell') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addSwell();
    } else {
      this.player.inventory[elm.state.ability] = true;
    }
    this.sound.play('powerUp');
    this.player.inventory.powerUp[elm.state.id] = 1;

    this.msgtext = this.add.bitmapText(0, 0, 'atomic', elm.state.text, 12, 1)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(210);
    elm.destroy();

    this.fadingTween = this.tweens.add({
      targets: [this.msgtext],
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: 3000,
      repeat: 0,
      yoyo: false,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0,
      },
      onComplete: () => {
        this.state.displayPowerUpMsg = false;
      },
    });
  }

  // ====================================================================
  // GAME PAUSE
  pauseGame() {
    if (!this.player.state.pause) {
      this.events.emit('pause');
      this.countTime();
      this.player.state.pause = true;
      this.physics.pause();
      this.player.anims.pause(this.player.anims.currentFrame);
      this.msg = this.add.image(this.cameras.main.worldView.x, this.cameras.main.worldView.y, 'blackPixel')
        .setOrigin(0, 0)
        .setDisplaySize(U.WIDTH, U.HEIGHT)
        .setAlpha(0.9)
        .setDepth(109);

      this.msgText = this.add.bitmapText(this.cameras.main.worldView.x + 200, this.cameras.main.worldView.y + 128, 'atomic', 'PAUSE', 50, 1)
        .setOrigin(0.5, 0.5)
        .setAlpha(1)
        .setDepth(110);

      // save part
      this.position = [this.cameras.main.worldView.y + 180, this.cameras.main.worldView.y + 200];
      this.lastPosition = 0;

      this.continueBtn = this.add.bitmapText(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[0], 'atomic', ' Continue ', 16, 1)
        .setTint(0xFF3B00)
        .setDepth(110)
        .setOrigin(0.5, 0.5);

      this.saveGameBtn = this.add.bitmapText(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[1], 'atomic', '      Save ', 16, 1)
        .setTint(0xFF3B00)
        .setDepth(110)
        .setOrigin(0.85, 0.5);

      this.head = this.add.image(this.cameras.main.worldView.x + U.WIDTH / 4 - 60, this.position[0], 'head')
        .setOrigin(0.5, 0.65)
        .setDisplaySize(15, 15)
        .setAlpha(1)
        .setDepth(110);
    }
  }

  choose() {
    this.player.chooseDone = true;
    if (this.player.state.pause) {
      if (this.lastPosition === 1) {
        this.lastPosition = 0;
      } else {
        this.lastPosition += 1;
      }
      this.head.y = this.position[this.lastPosition];
      this.time.addEvent({
        delay: 300,
        callback: () => {
          this.player.chooseDone = false;
        },
      });
    }
  }

  launch() {
    this.player.chooseDone = true;
    if (this.player.state.pause) {
      if (this.lastPosition === 0) {
        this.events.emit('unpause');
        this.player.state.pause = false;
        this.scene.scene.physics.resume();
        this.player.anims.resume(this.player.anims.currentFrame);
        this.msgText.destroy();
        this.msg.destroy();
        this.continueBtn.destroy();
        this.saveGameBtn.destroy();
        this.head.destroy();
        this.firstTimestamp = new Date().getTime();
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.player.chooseDone = false;
          },
        });
      }
      if (this.lastPosition === 1) {
        this.saveGame();
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.player.chooseDone = false;
          },
        });
      }
    }
  }

  // ====================================================================
  

  // ====================================================================
  

  

  // ====================================================================
  playerIsHit(elm) {
    if (!this.playerHurt && Math.abs(this.player.body.velocity.x) < 400) {
      this.playerHurt = true; // flag
      this.player.state.runSpeed = 285;
      this.sound.play('playerHit');
      this.player.inventory.life -= elm.state.damage;
      this.playerFlashTween = this.tweens.add({
        targets: this.player,
        ease: 'Sine.easeInOut',
        duration: 200,
        delay: 0,
        repeat: 5,
        yoyo: true,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.player.alpha = 1;
          this.playerHurt = false;
          // this.player.animate('stand');
        },
      });
      // if player is dead, launch deadth sequence
      if (this.player.inventory.life <= 0) {
        this.player.state.dead = true;
        this.playerDead = true;
        this.physics.pause();
        this.input.enabled = false;
        this.player.anims.pause(this.player.anims.currentFrame);
        this.playerFlashTween.stop();
        this.player.inventory.life = 0;
        this.player.setTintFill(0xFFFFFF);
        this.player.setDepth(2000);

        this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel');
        this.round.setOrigin(0.5, 0.5);
        this.round.setDepth(1000);
        this.round.displayWidth = 2;
        this.round.displayHeight = 2;
        this.sound.play('playerDead', { volume: 0.2 });

        this.tween = this.tweens.add({
          targets: this.round,
          ease: 'Sine.easeInOut',
          scaleX: 1,
          scaleY: 1,
          duration: 2500,
          delay: 800,
          onComplete: () => {
            this.input.enabled = true;
            this.playerIsDead();
          },
        });
      }
    }
    if (!this.playerHurt && Math.abs(this.player.body.velocity.x) >= 400) {
      elm.clearTint();
      this.giveLife = this.physics.add.staticSprite(elm.x, elm.y, 'powerUp');
      this.giveLife.setDepth(105);
      this.giveLife.health = elm.state.giveLife;
      this.giveLife.body.setSize(23, 21);
      this.giveLife.anims.play('powerUp');
      this.giveLifeGroup.push(this.giveLife);
      this.enemyExplode(elm.x, elm.y);
      this.enemyDestroy(elm);
      return;
    }
    this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
  }

  playerOnSpikes(int) {
    if (!this.playerHurt) {
      this.playerHurt = true; // flag
      this.player.state.runSpeed = 285;
      this.sound.play('playerHit');
      this.player.inventory.life -= int;
      this.playerFlashTween = this.tweens.add({
        targets: this.player,
        ease: 'Sine.easeInOut',
        duration: 200,
        delay: 0,
        repeat: 5,
        yoyo: true,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.player.alpha = 1;
          this.playerHurt = false;
          // this.player.animate('stand');
        },
      });
      // if player is dead, launch deadth sequence
      if (this.player.inventory.life <= 0) {
        this.player.state.dead = true;
        this.playerDead = true;
        this.physics.pause();
        this.input.enabled = false;
        this.player.anims.pause(this.player.anims.currentFrame);
        this.playerFlashTween.stop();
        this.player.inventory.life = 0;
        this.player.setTintFill(0xFFFFFF);
        this.player.setDepth(2000);

        this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel');
        this.round.setOrigin(0.5, 0.5);
        this.round.setDepth(1000);
        this.round.displayWidth = 2;
        this.round.displayHeight = 2;
        this.sound.play('playerDead', { volume: 0.2 });

        this.tween = this.tweens.add({
          targets: this.round,
          ease: 'Sine.easeInOut',
          scaleX: 1,
          scaleY: 1,
          duration: 2500,
          delay: 800,
          onComplete: () => {
            this.input.enabled = true;
            this.playerIsDead();
          },
        });
      }
      this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
    }
  }

  // ====================================================================
  playerIsDead() {
    let d = localStorage.getItem('d');
    d = JSON.parse(d);
    d += 1;
    localStorage.setItem('d', d);
    // this.bossMusic.stop();
    this.ambient1.stop();
    this.ambient2.stop();
    this.ambient3.stop();
    // this.waterAmbientMusic.stop();
    this.countTime();
    if (this.lavaRise) {
      this.lavaRise = null;
    }
    this.player.state.dead = false;
    this.scene.start('gameOver');
  }

  

  // ====================================================================
  enemyIsHit(bull, elm) {
    const el = elm;
    if (!el.getFired) {
      el.getFired = true;
      if (this.player.state.selectedWeapon === 'missile'
      || this.player.state.selectedWeapon === 'bullet'
      || this.player.state.selectedWeapon === 'swell'
      ) {
        this.player[`${this.player.state.selectedWeapon}Kill`](bull);
      }
      if (el === this.rhino1 || el === this.rhino2 || el === this.rhino3) {
        if (el.vulnerable) {
          el.looseLife(this.player.inventory[`${this.player.state.selectedWeapon}Damage`]);
          el.setTintFill(0xDDDDDD);
          this.time.addEvent({
            delay: 50,
            callback: () => {
              el.clearTint();
            },
          });
        }
      } else {
        el.looseLife(this.player.inventory[`${this.player.state.selectedWeapon}Damage`]);
        el.setTintFill(0xDDDDDD);
        this.time.addEvent({
          delay: 50,
          callback: () => {
            el.clearTint();
          },
        });
      }
      this.hitTimer = this.time.addEvent({
        delay: 120,
        callback: () => {
          el.getFired = false;
        },
      });
    }
    if (el.state.life < 0) {
      el.clearTint();
      // kill the enemy
      if (el === this.rhino1 || el === this.rhino2 || el === this.rhino3) {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        countDeadEnemies();
        this.player.state.rhinoCount += 1;
        if (this.player.state.rhinoCount === 3) {
          this.player.inventory.rhino = true;
        }
      }
      if (el === this.boss1) {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        this.boss1.setTintFill(0xDDDDDD);
        this.missile.body.reset(this.boss1.x, this.boss1.y);
        this.bossExplode(this.boss1.x, this.boss1.y);
        this.shakeCamera(5000);
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x - 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x - 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x + 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x + 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x - 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x + 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x + 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        countDeadEnemies();
        this.boss1.anims.pause(this.boss1.anims.currentFrame);
        this.boss1.body.setEnable(false);
        this.boss1.setDepth(0);
        this.time.addEvent({
          delay: 600,
          callback: () => {
            this.tween = this.tweens.add({
              targets: this.boss1,
              ease: 'Sine.easeInOut',
              duration: 1000,
              delay: 0,
              repeat: 0,
              yoyo: false,
              alpha: {
                getStart: () => 1,
                getEnd: () => 0,
              },
              onComplete: () => {
                this.missile.alpha = 1;
                this.player.inventory.boss1 = true;
                this.boss1.destroy();
              },
            });
          },
        });
      } else if (el === this.bossFinal) {
        if (!this.bossFinal.isDead) {
          this.bossFinal.isDead = true;
          this.bossFinal.body.setVelocityY(500);
          this.bossFinal.setTintFill(0xDDDDDD);
          this.bossExplode(this.bossFinal.x, this.bossFinal.y);
          this.shakeCamera(5000);
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x - 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x - 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x + 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x + 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x - 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x + 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x + 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.bossFinal.anims.pause(this.bossFinal.anims.currentFrame);
          this.bossFinal.setDepth(0);
          this.bossFinal.playRoar('cri4');
          this.bossFinal.body.velocity.y = 500;
          this.time.addEvent({
            delay: 600,
            callback: () => {
              this.tween = this.tweens.add({
                targets: this.bossFinal,
                ease: 'Sine.easeInOut',
                duration: 1000,
                delay: 0,
                repeat: 0,
                yoyo: false,
                alpha: {
                  getStart: () => 1,
                  getEnd: () => 0,
                },
                onComplete: () => {
                  countDeadEnemies();
                  this.giveLife = this.physics.add.staticSprite(this.bossFinal.x, this.bossFinal.y, 'powerUp');
                  this.giveLife.setDepth(105);
                  this.giveLife.health = el.state.giveLife;
                  this.giveLife.body.setSize(23, 21);
                  this.giveLife.anims.play('powerUp');
                  this.giveLifeGroup.push(this.giveLife);
                  const filteringOptions = {
                    // isNotEmpty: false,
                    isColliding: false,
                    // hasInterestingFace: false
                  };
                  const bossFinalTiles = this.solLayer.getTilesWithinWorldXY(this.bossFinal.x, this.bossFinal.y + 48, 48, 16, filteringOptions);
                  bossFinalTiles.forEach((e) => {
                    if (e.properties.boss) {
                      this.solLayer.removeTileAt(e.x, e.y, true, true);
                    }
                  });
                  this.enemyExplode(117 * 16, 186 * 16);
                  this.solLayer.removeTileAt(117, 186, true, true);
                  this.enemyExplode(117 * 16, 187 * 16);
                  this.solLayer.removeTileAt(117, 187, true, true);
                  this.enemyExplode(117 * 16, 188 * 16);
                  this.solLayer.removeTileAt(117, 188, true, true);
                  this.enemyExplode(118 * 16, 186 * 16);
                  this.solLayer.removeTileAt(118, 186, true, true);
                  this.enemyExplode(118 * 16, 187 * 16);
                  this.solLayer.removeTileAt(118, 187, true, true);
                  this.enemyExplode(118 * 16, 188 * 16);
                  this.solLayer.removeTileAt(118, 188, true, true);
                  this.startLavaRise();
                  this.player.inventory.bossFinal = true;
                  this.bossFinal.destroy();
                },
              });
            },
          });
        }
      } else {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        this.enemyExplode(el.x, el.y);
        this.enemyDestroy(el);
      }
    }
  }

  enemyDestroy(e) {
    e.destroy();
    countDeadEnemies();
  }

  bossExplode(x, y) {
    this.bossMusic.stop();
    const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', null, true).setDepth(107);
    this.sound.play('explo2', { volume: 0.3 });
    if (exp) {
      exp.anims.play('bossExplode').on('animationrepeat', () => {
        this.sound.play('explo2', { volume: 0.3 });
      }).on('animationcomplete', () => {
        exp.destroy();
      });
    }
  }

  enemyExplode(x, y) {
    const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', null, true).setDepth(107);
    exp.anims.play('enemyExplode').on('animationcomplete', () => {
      exp.destroy();
    });
  }

  // ====================================================================
  // LOAD ROOM
  loadGame() {
    const l = localStorage.getItem('k438b');
    this.player.inventory = JSON.parse(l);
    this.player.x = this.player.inventory.savedPositionX;
    this.player.y = this.player.inventory.savedPositionY;
    this.startRoom(this.player.inventory.map);
  }

  saveGame(player, savestation) {
    if (player === this.player && !savestation.isOverlap) {
      savestation.setIsOverlap();
      this.player.inventory.savedPositionX = this.player.x;
      this.player.inventory.savedPositionY = this.player.y;
      this.player.inventory.map = savestation.state.destination;
      const s = JSON.stringify(this.player.inventory);
      localStorage.setItem('k438b', s);
      this.sound.play('melo');
      this.msgText = this.add.bitmapText(this.cameras.main.worldView.x + 200, this.cameras.main.worldView.y + 128, 'atomic', 'Game Saved', 30, 1)
        .setOrigin(0.5, 0.5)
        .setAlpha(1)
        .setDepth(110);
      this.countTime();
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.msgText.setAlpha(0);
        },
      });
    }
  }

  startRoom(room) {
    // clean up
    this.cameras.main.fadeOut(50);
    this.physics.world.colliders.destroy();
    this.map.destroy();
    this.doorGroup.forEach(e => e.destroyDoor());
    this.giveLifeGroup.forEach(e => e.destroy());
    this.powerups.forEach(e => e.destroy());
    this.enemyGroup.forEach(e => e.destroy());
    this.elevatorGroup.forEach(e => e.destroy());
    this.lavaGroup.forEach(e => e.destroy());
    this.doorGroup.forEach(e => e.destroy());
    this.lights.lights.forEach(light => this.lights.removeLight(light));
    // create room
    this.map = this.make.tilemap({ key: room, tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
    this.addParaBack(this.map.properties.paraBack);
    this.addParaMiddle(this.map.properties.paraMiddle);
    this.addLayers();
    this.addSceneLights();
    this.addDoors();
    // this.addEnemies();
    this.player.x = this.player.inventory.savedPositionX + 24;
    this.player.y = this.player.inventory.savedPositionY;
    this.addColliders();
    this.addPowerUp();
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
    this.cameras.main.fadeIn(50);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.events.emit('loadingDone');
      },
    });
  }

  changeRoom(player, doorP) {
    // if door closed, return!!
    if (doorP && doorP.alpha === 1) {
      return;
    }
    // destroy leaving room
    this.cameras.main.fadeOut(50);
    this.physics.world.colliders.destroy();
    this.map.destroy();
    this.doorGroup.forEach(e => e.destroyDoor());
    this.doorGroup = [];
    this.giveLifeGroup.forEach(e => e.destroy());
    this.powerups.forEach(e => e.destroy());
    this.powerups = [];
    this.pathGroup.forEach(e => {
      console.log(e)
      e.destroy()
      e = null;
    });
    this.pathGroup = [];
    this.enemyGroup.forEach(e => e.destroy());
    this.enemyGroup = [];
    this.elevatorGroup.forEach(e => e.destroy());
    this.elevatorGroup = [];
    this.lavaGroup.forEach(e => e.destroy());
    this.lavaGroup = [];
    this.doorGroup.forEach(e => e.destroy());
    this.doorGroup = [];
    this.saveStationGroup.forEach(e => e.destroy());
    this.saveStationGroup = [];
    this.para_back.destroy();
    this.para_middle.destroy();
    this.lights.lights.forEach(light => this.lights.removeLight(light));

    // create new room
    this.map = this.make.tilemap({ key: doorP.state.destination, tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
    this.addLayers();
    this.addSceneLights();
    this.addDoors();
    this.addMask();
    this.addParaBack(this.map.properties.paraBack);
    this.addParaMiddle(this.map.properties.paraMiddle);
    this.addPath();
    this.addEnemies();
    this.addLava();
    this.addWaterFall();
    this.addSavestation();
    this.cameras.main.stopFollow();
    this.cameras.main.setScroll(doorP.state.playerX * 16, doorP.state.playerY * 16);
    if (doorP.state.side === 'left') {
      this.player.body.reset(doorP.state.playerX * 16, doorP.state.playerY * 16 + 20);
    } else {
      this.player.body.reset(doorP.state.playerX * 16 + 16, doorP.state.playerY * 16 + 20);
    }
    this.addElevators();
    this.addColliders();
    this.addPowerUp();
    // launch special functions from the room
    if (this.map.properties.callFunction && this.map.properties.callFunction.length) {
      const arr = this.map.properties.callFunction.split(',');
      arr.forEach(elm => this[elm]());
    }
    this.playMusic(this.map.properties.music);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
    this.cameras.main.fadeIn(50);
  }

  addCrumbleTiles() {
    const { CrumbleStartX, CrumbleStartY, CrumbleLength } = this.map.properties;
    this.solLayer.setTileLocationCallback(CrumbleStartX, CrumbleStartY, CrumbleLength, 1, (e, t) => this.handleCrumbleTile(e, t), this);
  }

  handleCrumbleTile(e, t) {
    if (e !== this.player) {
      return;
    }
    const { crumbleTimer } = t.properties;
    this.time.addEvent({
      delay: crumbleTimer,
      callback: () => {
        t.setVisible(false);
        const t2 = this.solLayer.getTileAt(t.x, t.y + 1);
        t2.setVisible(false);
        this.solLayer.setCollision(t2.index, false);
        this.resetCrumbleTiles(t, t2);
      },
    });
  }

  resetCrumbleTiles(t, t2) {
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        t.setVisible(true);
        t2.setVisible(true);
        this.solLayer.setCollision(t2.index, true);
      },
    });
  }

  // ====================================================================
  // ADD ROOM STUFF
  addPath() {
    const layerArray = this.checkObjectsLayerIndex('path');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      const poly = element.polyline;
      const pathOriginX = element.properties.originX;
      const pathOriginY = element.properties.originY;
      this.pathCrabs = new Phaser.Curves.Path(pathOriginX + poly[0].x, pathOriginY + poly[0].y);
      poly.forEach(line => this.pathCrabs.lineTo(line.x + pathOriginX, line.y + pathOriginY));
      this[`path${element.name}`] = this.add.follower(this.pathCrabs, pathOriginX, pathOriginY, 'blackPixel');
      this[`path${element.name}`].setVisible(true);
      this[`path${element.name}`].setTintFill(0xFF0000);
      this[`path${element.name}`].name = element.name;
      this[`path${element.name}`].startFollow({
        duration: element.properties.duration,
        yoyo: false,
        repeat: -1,
        rotateToPath: true,
        verticalAdjust: false,
      });
      this.pathGroup.push(this[`path${element.name}`]);
      // graphics for debug
      var graphics = this.add.graphics();

      graphics.lineStyle(1, 0xffffff, 1); //what is 1, , 1

      this.pathCrabs.draw(graphics, 328);﻿ //what is 328

    });
  }

  addColliders() {
    this.solLayer.setCollisionByProperty({ collides: true });
    //this.spikeLayer.setCollisionByProperty({ hurt: true });
    this.physics.add.collider(this.player, this.solLayer, null, (e, t) => {
      if (t.index === 705 || t.index === 706) {
        this.playerOnSpikes(20);
      }
      return true;
    }, this);
    // this.physics.add.collider(this.doorGroup, this.player, null);
    this.physics.add.collider(this.enemyGroup, this.solLayer, null);
    this.physics.add.collider(this.enemyGroup, this.doorGroup, (e, d) => { this[e.name].checkCollision(d); }, null, this);
    this.physics.add.collider(this.lavaGroup, this.solLayer, null);
    this.physics.add.collider([this.player.bullets, this.player.swells], this.solLayer, this.player.bulletKill, null, this.player);
    this.physics.add.collider(this.player.missiles, this.solLayer, this.player.missileKill, null, this.player);
    this.physics.add.collider(this.player.lasers, this.solLayer, this.player.laserKill, null, this.player);
    // this.physics.add.collider([this.player.bullets, this.player.swells], this.doorGroup, (bull, d) => this.player.bulletKill(d), null, this.player.bullets);
    // this.physics.add.collider(this.player.lasers, this.doorGroup, (bull, d) => this.player.laserKill(d), null, this.player.lasers);
    this.physics.add.collider([this.player.bullets, this.player.missiles, this.player.lasers], this.doorGroup, (d, miss) => this.openDoor(d, miss), null, this);
    this.physics.add.collider(this.elevatorGroup, this.player, elm => this.handleElevator(elm), null, this);
    this.physics.add.overlap(this.lavaGroup, this.player, () => this.player.handleLava(), null, this.player);
    this.physics.add.overlap(this.giveLifeGroup, this.player, elm => this.player.getLife(elm), null, this.player);
    this.physics.add.overlap(this.powerups, this.player, elm => this.getPowerUp(elm), null, this);
    this.physics.add.overlap(this.enemyGroup, this.player, elm => this.playerIsHit(elm), null, this);
    this.physics.add.overlap([
      this.player.bullets,
      this.player.swells,
      this.player.missiles,
      this.player.lasers], this.enemyGroup, (elm, bull) => this.enemyIsHit(bull, elm, this.player), null, this.player);

    this.physics.add.collider(this.player, this.doorGroup, (player, door) => this.changeRoom(player, door), null, this);
    //this.physics.add.collider(this.player, this.spikeLayer, () => this.playerOnSpikes(20), null, this);
  }

  addSpikes() {
    console.log('SPIKES')
    //this.spikeLayer.setCollisionByProperty({ hurt: true });
    // this.spikeCollider = this.physics.add.overlap(this.player, this.spikeLayer, () => this.playerOnSpikes(20), (e, t) => {
    //   if (t.index === 705 || t.index === 706) {
    //     return true;
    //   }
    //   return false;
    // }, this);
  }

  addLayers() {
    this.solLayer = this.map.createDynamicLayer('collideGround', this.tileset, 0, 0)
      .setDepth(11).setPipeline('Light2D');
    this.backLayer = this.map.createStaticLayer('back', this.tileset, 0, 0)
      .setDepth(4).setPipeline('Light2D');
    this.middleLayer = this.map.createStaticLayer('middle', this.tileset, 0, 0)
      .setDepth(5).setPipeline('Light2D');
    this.middleLayer2 = this.map.createDynamicLayer('middle2', this.tileset, 0, 0)
      .setDepth(10).setPipeline('Light2D');
    this.statue = this.map.createStaticLayer('statue', this.tileset, 0, 0)
      .setDepth(98).setPipeline('Light2D');
    this.eau = this.map.createStaticLayer('eau', this.tileset, 0, 0)
      .setDepth(99).setPipeline('Light2D');
    this.spikeLayer = this.map.createDynamicLayer('spikeLayer', this.tileset, 0, 0)
      .setDepth(100).setPipeline('Light2D');
    this.frontLayer = this.map.createDynamicLayer('front', this.tileset, 0, 0)
      .setDepth(106).setPipeline('Light2D');
  }

  addMask() {
    // mask for morphing sonar
    this.mask = this.make.graphics({ fillStyle: { color: 0xffffff }, add: false })
      .fillCircleShape(new Phaser.Geom.Circle(0, 6, 40));

    this.frontLayer.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
    this.frontLayer.mask.invertAlpha = true;
  }

  addPowerUp() {
    const layerArray = this.checkObjectsLayerIndex('powerup');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      if (this.player.inventory.powerUp[element.properties.id] === 0) {
        this[element.name] = new PowerUp(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.properties.name,
          ability: element.properties.ability,
          text: element.properties.text,
          id: element.properties.id,
        });
        this[element.name].setDisplayOrigin(0, 0).animate(element.properties.powerup, true);
        this[element.name].body.setSize(16, 16).setAllowGravity(false);
        this.powerups.push(this[element.name]);
      }
    });
  }

  addDoors() {
    const layerArray = this.checkObjectsLayerIndex('doors');
    layerArray.objects.forEach((element) => {
      if (element.properties.side === 'right') {
        this[element.name] = new Doors(this, element.x + 3, element.y + 9, {
          key: element.properties.key,
          name: element.name,
          side: element.properties.side,
          playerX: element.properties.playerX,
          playerY: element.properties.playerY,
          destination: element.properties.destination,
          openWith: element.properties.openWith,
        });
        this[element.name].body.setSize(10, 47);
        // add door light
        this.lights.addLight(element.x + 3, element.y + 9, 64, 0xEEBB22, 1);
      }
      if (element.properties.side === 'left') {
        this[element.name] = new Doors(this, element.x + 13, element.y + 9, {
          key: element.properties.key,
          name: element.name,
          side: element.properties.side,
          playerX: element.properties.playerX,
          playerY: element.properties.playerY,
          destination: element.properties.destination,
          openWith: element.properties.openWith,
        });
        this[element.name].flipX = true;
        this[element.name].body.setSize(10, 47);
        // add door light
        this.lights.addLight(element.x + 13, element.y + 9, 64, 0xEEBB22, 1);
      }
      this.doorGroup.push(this[element.name]);
    });
  }

  addSceneLights() {
    // Clean up existing lights (need more testing and optimization)
    if (this.lights.lights.length > 0) {
      this.lights.culledLights.forEach(light => this.lights.removeLight(light));
      this.lights.lightPool.forEach(light => this.lights.removeLight(light));
      this.lights.lights.forEach(light => this.lights.removeLight(light));
      this.lights.forEachLight(elm => this.lights.removeLight(elm));
    }
    // enable the light system
    this.lights.enable();
    // Player light
    this.playerLight = this.lights.addLight(this.player.x, this.player.y + 48, 48, 0xFCDECA, 0.4);
    // add room ambient lights
    const layerArray = this.checkObjectsLayerIndex('lights');
    if (layerArray) {
      layerArray.objects.forEach((element) => {
        this.lights.addLight(element.x, element.y, element.properties.radius, element.properties.color, element.properties.intensity)
      });
    }
    if (this.map.properties.ambientColor) {
      this.lights.setAmbientColor(this.map.properties.ambientColor);
      return;
    }
    this.lights.setAmbientColor(0x222222);
  }

  addElevators() {
    const layerArray = this.checkObjectsLayerIndex('elevators');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      if (this.player.y < element.properties.up * 16) {
        this[element.name] = new Elevators(this, element.x + 24, element.properties.up * 16 + 7, {
          name: element.name,
          key: element.properties.key,
          up: element.properties.up,
          down: element.properties.down,
          position: 'up',
        });
      } else {
        this[element.name] = new Elevators(this, element.x + 24, element.properties.down * 16 + 7, {
          name: element.name,
          key: element.properties.key,
          up: element.properties.up,
          down: element.properties.down,
          position: 'down',
        });
      }
      this.elevatorGroup.push(this[element.name]);
    });
  }

  addEnemies() {
    // the crabs
    const layerArray = this.checkObjectsLayerIndex('enemies');
    layerArray.objects.forEach((element) => {
      this[element.name] = new Crabes(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].setPipeline('Light2D');
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
      this[element.name].setPosition(element.x, element.y - 16);
    });
    console.log(this)
    // the wasps
    const layerArray2 = this.checkObjectsLayerIndex('guepes');
    layerArray2.objects.forEach((element) => {
      this[element.name] = new Guepes(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // the jumpers
    const layerArray3 = this.checkObjectsLayerIndex('jumpers');
    layerArray3.objects.forEach((element) => {
      this[element.name] = new Jumpers(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this.enemyGroup.push(this[element.name]);
    });
    // the octopus
    const layerArray4 = this.checkObjectsLayerIndex('octopus');
    layerArray4.objects.forEach((element) => {
      this[element.name] = new Octopus(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this.enemyGroup.push(this[element.name]);
    });
  }

  addLava() {
    // lava
    const layerArray = this.checkObjectsLayerIndex('lava');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      this[element.name] = new Lava(this, element.x, element.y, {
        key: element.properties.key,
      });
      this[element.name].animate(element.properties.key, true);
      this[element.name].setDepth(11).setPipeline('Light2D');
      this.lavaGroup.push(this[element.name]);
    });

    // lava fall, same group as lava
    const layerArray2 = this.checkObjectsLayerIndex('lavaFall');
    if (!layerArray2 || layerArray2.objects.length === 0) {
      return;
    }
    layerArray2.objects.forEach((element) => {
      this[element.name] = new Lava(this, element.x + 16, element.y - 8, {
        key: element.properties.key,
      });
      this[element.name].setDisplaySize(32, 32).setDepth(10).setPipeline('Light2D');
      this[element.name].animate(element.properties.key, true);
      this.lavaGroup.push(this[element.name]);
    });

    // fireballs, same group as lava
    const layerArray3 = this.checkObjectsLayerIndex('fireball');
    if (!layerArray3 || layerArray3.objects.length === 0) {
      return;
    }
    layerArray3.objects.forEach((element) => {
      this[element.name] = new FireBalls(this, element.x + 16, element.y - 8, {
        key: element.properties.key,
      });
      this[element.name].setPipeline('Light2D').animate(element.properties.key, true);
      this.lavaGroup.push(this[element.name]);
    });
  }

  addWaterFall() {
    const layerArray = this.checkObjectsLayerIndex('waterFall');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      this[element.name] = new WaterFall(this, element.x + 8, element.y - 8, {
        key: element.properties.key,
      });
      this[element.name].setPipeline('Light2D').animate(element.properties.key, true);
    });
  }

  addSavestation() {
    const layerArray = this.checkObjectsLayerIndex('savestation');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      this[element.name] = new SaveStation(this, element.x + 16, element.y + 6, {
        key: element.properties.key,
        destination: element.properties.destination,
      });
      this[element.name].animate(element.properties.key, true);
      this.saveStationGroup.push(this[element.name]);
      this.physics.add.overlap(this.player, this[element.name], (player, savestation) => this.saveGame(player, savestation), null, this.player);
    });
  }

  addParaBack(image) {
    this.para_back = this.add.image(0, 0, image)
      .setDepth(0)
      .setScrollFactor(0.2)
      .setOrigin(0, 0)
      .setDisplaySize(800, 512);
  }

  addParaMiddle(image) {
    this.para_middle = this.add.image(0, 0, image)
      .setDepth(3)
      .setScrollFactor(0.5)
      .setOrigin(0, 0)
      .setDisplaySize(2048, 1024);
  }

  // ====================================================================
  // HANDLE ROOM ELEMENTS
  openDoor(d, miss) {
    if (d.state.openWith === 'any') {
      d.openDoor();
      miss.destroy();
      return;
    }
    if (d.state.openWith === 'missile' && miss.texture.key === 'missile') {
      d.openDoor();
      miss.destroy();
      return;
    }
    if (d.state.openWith === 'laser' && miss.texture.key === 'laser') {
      d.openDoor();
      miss.destroy();
      return;
    }
    miss.destroy();
    this.sound.play('doorLocked', { volume: 0.5, rate: 0.5 });
  }

  handleElevator(elm) {
    if (this.player.body.touching.down && this.player.keys.down.isDown && elm.state.position === 'up') {
      elm.handleElevator();
    }
    if (this.player.body.touching.down && this.player.keys.up.isDown && elm.state.position === 'down') {
      elm.handleElevator();
    }
  }

  noEnemyWithoutMorphing() {
    if (this.player.inventory.morphing) return;
    this.enemyGroup.forEach(enemy => enemy.destroy());
  }

  // ====================================================================
  // CAMERA EFFECTS
  shakeCamera(e) {
    this.cameras.main.shake(e, 0.005);
  }

  flashCamera() {
    this.cameras.main.flash(1000);
  }
  

  // ====================================================================
  // HELPERS
  checkObjectsLayerIndex(layerName) {
    const arr = this.map.objects.filter(elm => elm.name === layerName);
    if (!arr.length) {
      return null;
    }
    return arr[0];
  }

  countTime() {
    this.firstTimestamp = countTime(this.firstTimestamp);
  }

  // ====================================================================
  transmission(txt) {
    let count = 0;
    this.modalText = this.add.bitmapText(this.player.x, this.player.y - 480, 'atomic', '', 6, 1)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(201);
    this.time.addEvent({
      delay: 100,
      repeat: txt.length - 1,
      callback: () => {
        if (txt[count] === '-') {
          this.modalText.text += '\n';
          this.modalText.y -= 10;
          this.sound.play('bip3', { volume: 0.5 });
          count += 1;
        } else {
          this.modalText.text += txt[count];
          this.sound.play('bip1', { volume: 1 });
          count += 1;
        }
      },
    });
    this.time.addEvent({
      delay: 12000,
      callback: () => {
        this.modalText.destroy();
      },
    });
  }

  endMission() {
    if (!this.isTheEnd) {
      this.isTheEnd = true;
      this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel')
        .setOrigin(0.5, 0.5)
        .setDepth(1000)
        .setDisplaySize(4096, 4096)
        .setAlpha(0);
      this.countTime();
      this.ambient1.stop();
      this.tween = this.tweens.add({
        targets: this.round,
        ease: 'Sine.easeInOut',
        duration: 1500,
        delay: 0,
        repeat: 0,
        yoyo: false,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.lavaRise = null;
          this.ambient1.stop();
          this.scene.start('endGame');
        },
      });
    }
  }
}
