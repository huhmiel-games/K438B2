/* eslint-disable no-unused-expressions */
import getConfigKeys from '../utils/getConfigKeys';

let morph;
let jumpB;
const cling = { left: false, right: false };
const onWallJump = false;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.lastAnim = null;
    this.scene = scene;
    this.inventory = {
      lifeEnergyBlock: 1,
      life: 100,
      savedPositionX: 600,
      savedPositionY: 300,
      map: 'map1',
      selectableWeapon: ['bullet'],
      gun: false,
      bulletDamage: 5,
      swell: false,
      swellDamage: 10,
      missile: false,
      missileDamage: 100,
      laser: false,
      laserDamage: 50,
      fireRate: 420,
      morphing: false,
      morphingBomb: false,
      morphingSonar: false, // default to false
      jumpBooster: false,
      speedBooster: false,
      clingGloves: false,
      aquaSuit: false,
      boss1: false,
      bossFinal: false,
      rhino: false,
      powerUp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      visitedRooms: [],
    };
    this.state = {
      onCling: false,
      canJump: false,
      stopJump: false,
      onJump: false,
      jumpDelay: 500,
      onRun: false,
      onWalk: true,
      onMorphingBall: false,
      jumpBoost: false,
      onJumpBoost: false,
      speed: 165,
      runSpeed: 285,
      maxSpeed: 300,
      morphingSpeed: 140,
      selectedWeapon: 'bullet',
      lastFired: 0,
      bulletOrientationX: 'right',
      bulletOrientationY: 'normal',
      bulletPositionY: 10,
      bulletPositionX: 10,
      pause: false,
      dead: false,
      fullScreen: false,
      rhinoCount: 0,
      e: 0,
      d: 0,
      colorChange: false,
      SuperPowersActive: false,
    };

    this.onWater = false;
    this.jumpCooldownTimer = null;
    this.isSpeedRunningTimer = null;
    this.onSpeedRunning = 0;
    this.boostTimer = null;
    this.bombTimer = null;
    this.lavaOverlap = false;
    this.selectWeaponFlag = false;
    this.chooseDone = false;
    this.setDepth(105);
    this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    const keysOptions = getConfigKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes[keysOptions[0]],
      right: Phaser.Input.Keyboard.KeyCodes[keysOptions[1]],
      up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
      down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
      fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
      jump: Phaser.Input.Keyboard.KeyCodes[keysOptions[5]],
      run: Phaser.Input.Keyboard.KeyCodes[keysOptions[6]],
      select: Phaser.Input.Keyboard.KeyCodes[keysOptions[7]],
      pause: Phaser.Input.Keyboard.KeyCodes[keysOptions[8]],
    });

    this.ComboMorphingBall = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.down],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.ComboJumpBooster = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.jump],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.scene.input.keyboard.on('keycombomatch', (keyCombo) => {
      if (keyCombo.keyCodes[0] === this.keys.down.keyCode && keyCombo.keyCodes[1] === this.keys.down.keyCode && !this.body.touching.down && !(cling.left || cling.right)) {
        if (this.inventory.morphing) {
          morph = true;
          this.scene.sound.play('morph', { volume: 0.3 });
        }
      }
      if (this.inventory.jumpBooster && keyCombo.keyCodes[0] === this.keys.down.keyCode && keyCombo.keyCodes[1] === this.keys.jump.keyCode && !this.onWater) {
        jumpB = true;
      }
    });
    const arrEmit = [];
    for (let i = 0; i < 31; i += 1) {
      arrEmit.push(i.toString());
    }
    this.playerGhostParticles = this.scene.add.particles('player').setDepth(99).setPipeline('Light2D');
    this.playerGhostParticlesJaune = this.scene.add.particles('playerJaune').setDepth(99);
    this.playerGhostEmitter = this.playerGhostParticles.createEmitter({
      speed: this.body.velocity.x,
      quantity: 1,
      frame: { frames: arrEmit, cycle: false },
      alpha: { start: 0.5, end: 0 },
      rotate: 0,
      gravityY: 0,
      on: false,
      active: true,
    });
    this.playerGhostEmitterJaune = this.playerGhostParticles.createEmitter({
      speed: this.body.velocity.x,
      quantity: 1,
      frame: { frames: arrEmit, cycle: false },
      alpha: { start: 0.2, end: 0 },
      rotate: 0,
      gravityY: 0,
      on: false,
      active: true,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const {
      body, keys, state, inventory,
    } = this;
    let animationName;
    // if not game pause
    if (!state.pause && !state.dead) {
      // check morphing ball ability active
      if (inventory.morphing) {
        this.state.onMorphingBall = morph;
      }
      // check jumpBooster ability active
      if (inventory.jumpBooster) {
        this.state.jumpBoost = jumpB;
      }
      // check cling gloves active
      if (inventory.clingGloves) {
        this.state.onCling = cling;
      }
      // check jumpBoost
      if (body.blocked.down && state.jumpBoost) {
        this.jumpBoosterTimer();
      }
      // fire Y orientation
      if (keys.up.isDown && !morph && !(cling.left || cling.right)) {
        this.state.bulletOrientationY = 'up';
      } else {
        this.state.bulletOrientationY = 'normal';
      }
      if (
        keys.up.isDown
        && state.onMorphingBall
        && this.scene.solLayer.getTileAtWorldXY(body.x + 6, body.y - 16, true)
        && !body.touching.down
      ) {
        if (!this.scene.solLayer.getTileAtWorldXY(body.x + 6, body.y - 16, true).properties.collides) {
          this.state.bulletOrientationY = 'up';
          this.state.onMorphingBall = false;
          morph = false;
        }
      }
      // call run speed
      this.isRunning();
      if (keys.fire.isDown) {
        this.shoot(time);
      }
      // player movement
      switch (true) {
        case (
          !body.blocked.down
          && ((body.blocked.left) || (body.blocked.right))
          && state.stopJump
          && inventory.clingGloves
          && !state.onMorphingBall
        ): {
          // s'accroche aux murs
            const playerPositionInTileX = Math.floor(this.body.x / 16);
            const playerPositionInTileY = Math.floor(this.body.y / 16);
            const tileOverPlayerLeftTop = this.scene.solLayer.getTileAt(playerPositionInTileX - 1, playerPositionInTileY );
            const tileOverPlayerLeftBottom = this.scene.solLayer.getTileAt(playerPositionInTileX - 1, playerPositionInTileY + 1);
            const tileOverPlayerRightTop = this.scene.solLayer.getTileAt(playerPositionInTileX + 1, playerPositionInTileY );
            const tileOverPlayerRightBottom = this.scene.solLayer.getTileAt(playerPositionInTileX + 1, playerPositionInTileY + 1);
            if (
              ((tileOverPlayerLeftTop && tileOverPlayerLeftTop.properties.collides) && (tileOverPlayerLeftBottom && tileOverPlayerLeftBottom.properties.collides))
              || ((tileOverPlayerRightTop && tileOverPlayerRightTop.properties.collides) && (tileOverPlayerRightBottom && tileOverPlayerRightBottom.properties.collides))
            ) {
              this.state.bulletPositionY = 8;
              jumpB = false;
              body.blocked.left ? cling.left = true : cling.right = true;
              this.state.stopJump = false;
              animationName = 'playerCling';
              this.body.setVelocityX(0);
              this.body.setVelocityY(0);
              this.body.setSize(10, 35, true);
              this.state.runSpeed = 285;
            }
          }
          break;

        case (keys.left.isDown && !keys.run.isDown && !state.onMorphingBall && !(cling.left || cling.right) && !this.SUPERJUMP):
        // marche vers la gauche
          this.body.setVelocityX(-this.state.speed);
          this.state.bulletOrientationX = 'left';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else {
            cling.right = false;
            animationName = 'playerWalk';
          }
          this.body.setSize(10, 35, true);
          break;

        case (keys.right.isDown && !keys.run.isDown && !state.onMorphingBall && !(cling.left || cling.right) && !this.SUPERJUMP):
        // marche vers la droite
          this.body.setVelocityX(this.state.speed);
          this.state.bulletOrientationX = 'right';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else {
            cling.left = false;
            animationName = 'playerWalk';
          }
          this.body.setSize(10, 35, true);
          break;

        case (keys.left.isDown && keys.run.isDown && !state.onMorphingBall && !(cling.left || cling.right) && !this.SUPERJUMP):
        // cours vers la gauche
          this.body.setVelocityX(-this.state.speed);
          this.state.bulletOrientationX = 'left';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else {
            animationName = 'playerRun';
          }
          this.body.setSize(10, 35, true);
          break;

        case (keys.right.isDown && keys.run.isDown && !state.onMorphingBall && !(cling.left || cling.right) && !this.SUPERJUMP):
        // cours vers la droite
          this.body.setVelocityX(this.state.speed);
          this.state.bulletOrientationX = 'right';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else {
            animationName = 'playerRun';
          }
          this.body.setSize(10, 35, true);
          break;

        case (
          !body.blocked.down
          && (!keys.left.isDown || !keys.right.isDown)
          && !state.onMorphingBall
          && !state.jumpBoost
          && !body.touching.down
          && !state.SuperPowersActive
          && !(cling.left || cling.right)):
          // saut droit et chute libre
          animationName = 'jumpVertical';
          this.body.setVelocityX(0);
          this.ComboJumpBooster.enabled = false;
          break;

        case (
          state.jumpBoost
          && !(keys.left.isDown || keys.right.isDown)
          && !state.onMorphingBall
        ):
          // saut avec booster
          animationName = 'jumpBoost';
          break;

        case (
          // super power jump vertical
          !body.blocked.down
          && !(keys.left.isDown || keys.right.isDown)
          && !state.onMorphingBall
          && !state.jumpBoost
          && !body.touching.down
          && state.SuperPowersActive
        ):
          animationName = 'jumpBoost';
          break;

        case (keys.down.isDown && !state.onMorphingBall && !body.touching.down && !(keys.left.isDown || keys.right.isDown) && !(cling.left || cling.right)):
          // position baissée
          this.body.setVelocityX(0);
          this.state.bulletPositionY = 10;
          animationName = 'duck';
          this.body.velocity.y = -0.5;
          this.body.setSize(10, 23, 8, 10);
          break;

        case (state.onMorphingBall && !(cling.left || cling.right)):
          // morphing ball
          animationName = 'morphingBall';
          this.body.setSize(10, 10, true);
          this.body.setOffset(15, 22);
          if (!(keys.left.isDown || keys.right.isDown)) {
            if (this.lastAnim !== 'morphingBall') {
              animationName = 'morphingBallIdle';
            }
            this.body.setVelocityX(0);
            if (this.anims.isPlaying) {
              this.anims.pause(this.anims.currentFrame);
            }
          } else if (keys.left.isDown) {
            this.body.setVelocityX(-this.state.morphingSpeed);
            this.state.bulletOrientationX = 'left';
            this.anims.resume(this.anims.currentFrame);
          } else if (keys.right.isDown) {
            this.body.setVelocityX(this.state.morphingSpeed);
            this.state.bulletOrientationX = 'right';
            this.anims.resume(this.anims.currentFrame);
          }
          this.state.bulletPositionY = 10;
          break;

        case (keys.fire.isDown && keys.up.isDown && !(keys.left.isDown || keys.right.isDown) && !(cling.left || cling.right)):
          // tire vers le haut
          animationName = 'shootup';
          this.body.setVelocityX(0);
          break;

        case (keys.fire.isDown && !keys.up.isDown && !(keys.left.isDown || keys.right.isDown) && !(cling.left || cling.right)):
        // tire a l'arret
          this.state.bulletPositionY = 8;
          animationName = 'stand';
          this.body.setVelocityX(0);
          this.body.setSize(10, 35, true);
          this.state.runSpeed = 285;
          break;

        case (keys.fire.isDown && !keys.up.isDown && (cling.left || cling.right)):
        // tire a l'arret
          this.state.bulletPositionY = 12;
          animationName = 'playerCling';
          this.body.setVelocityX(0);
          this.body.setSize(10, 35, true);
          this.state.runSpeed = 285;
          break;

        default:
        // reste immobile
          if (cling.left || cling.right) {
            cling.left ? this.state.bulletOrientationX = 'right' : this.state.bulletOrientationX = 'left';
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            animationName = 'playerCling';
          } else {
            this.body.setVelocityX(0);
            !this.SUPERJUMP ? animationName = 'stand' : null;
            this.body.setSize(10, 35, true);
            this.state.runSpeed = 285;
          }
      }
      // positionne la hauteur du tir en marchant //ptet en courant aussi a verifier
      if (!keys.down.isDown && (keys.left.isDown || keys.right.isDown)) {
        this.state.bulletPositionY = 11;
      }
      //  PLAYER JUMP    ////
      // peut sauter
      if (!keys.jump.isDown && (body.blocked.down || (cling.left || cling.right))) {
        this.state.canJump = true;
        this.state.stopJump = false;
      }
      // saute
      if (keys.jump.isDown && body.blocked.down && state.canJump && !jumpB && !(cling.left || cling.right)) {
        // saut super power
        if (state.SuperPowersActive) {
          this.SUPERJUMP = true;
          this.setPipeline('GlowFx');
        }
        // saut droit
        if ((!keys.left.isDown || !keys.right.isDown) && !state.SuperPowersActive) {
          this.state.jumpDelay = 650;
          if (keys.run.isDown) this.state.speed = 165;
          this.body.setVelocityY(-this.state.speed);
        }
        // saut en marchant
        if ((keys.left.isDown || keys.right.isDown) && state.canJump && !state.SuperPowersActive && !this.onWater) {
          this.state.jumpDelay = 700;
          this.body.setVelocityY(-this.state.speed);
        }
        // saut en courant
        if (keys.run.isDown && (keys.left.isDown || keys.right.isDown) && state.canJump) { // && !state.SuperPowersActive) {
          this.state.jumpDelay = 500;
          if (!this.onWater || this.inventory.aquaSuit) {
            this.body.setVelocityY(-this.state.runSpeed);
          } else {
            this.body.setVelocityY(-this.state.speed);
          }
        }
        this.state.onJump = true;
        this.isJumping();
        this.state.canJump = false;
      }
      // saute depuis un mur
      if (
        keys.jump.isDown
        && state.canJump
        && !jumpB
        && !keys.run.isDown
        && (keys.left.isDown || keys.right.isDown)
        && (cling.left || cling.right)) {
        // saut depuis un mur
        if (cling.left && keys.right.isDown) {
          this.state.jumpDelay = 700;
          this.body.setVelocityY(-this.state.speed);
          this.state.onJump = true;
          this.isJumping();
          this.state.canJump = false;
          cling.left = false;
        } else if (cling.right && keys.left.isDown) {
          this.state.jumpDelay = 700;
          this.body.setVelocityY(-this.state.speed);
          this.state.onJump = true;
          this.isJumping();
          this.state.canJump = false;
          cling.right = false;
        }
      }

      // descend du mur
      if (keys.down.isDown && !keys.jump.isDown && (cling.left || cling.right)) {
        if (cling.right) {
          this.flipX = true;
          this.state.bulletOrientationX = 'left';
          this.state.bulletPositionX = 3;
          cling.right = false;
        }
        if (cling.left) {
          this.flipX = false;
          this.state.bulletOrientationX = 'right';
          this.state.bulletPositionX = 7;
          cling.left = false;
        }
        this.state.canJump = false;
      }
      // si touche un plafond en super saut
      if (body.blocked.up && this.SUPERJUMP) {
        const arr = [534, 535, 598, 599];
        let n = 0;
        const playerPositionInTileX = Math.floor(this.body.x / 16);
        const playerPositionInTileY = Math.floor(this.body.y / 16) - 1;

        if (this.body.x + 10 > (playerPositionInTileX * 16) + 16) {
          n += 1;
        }
        const tileOverPlayer = this.scene.solLayer.getTileAt(playerPositionInTileX, playerPositionInTileY);
        const tileOverPlayer2 = this.scene.solLayer.getTileAt(playerPositionInTileX + n, playerPositionInTileY);
        if ((tileOverPlayer && !arr.includes(tileOverPlayer.index)) || (tileOverPlayer2 && !arr.includes(tileOverPlayer2.index))) {
          if (!this.scene.cameraIsShaking) {
            this.scene.shakeCamera(300);
          }
          this.scene.time.addEvent({
            delay: 899,
            callback: () => {
              this.SUPERJUMP = false;
              this.state.SuperPowersActive = false;
              this.colorToggleTimer2.remove();
              this.setPipeline('Light2D');
            },
          });
        }
      }
      // si touche un plafond
      if (body.blocked.up && !this.SUPERJUMP) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
          this.state.stopJump = true;
          (this.onWater && !this.inventory.aquaSuit)
            ? this.body.setVelocityY(this.state.speed)
            : this.body.setVelocityY(this.state.speed * 1.5);
          this.state.runSpeed = 285;
        }
      }
      // a l'atterissage
      if (body.blocked.down) {
        this.state.onJump = false;
        this.ComboJumpBooster.enabled = true;
        // cling ?
      }
      if (!body.blocked.down && jumpB && (!cling.left || !cling.right)) {
        this.state.onJump = true;
      }
      // reset jump
      if (state.stopJump && (!cling.left || !cling.right)) {
        (this.onWater && !this.inventory.aquaSuit)
          ? this.body.setVelocityY(this.state.speed)
          : this.body.setVelocityY(this.state.speed * 1.5);
      }
      // annule le timer du saut
      if (!keys.jump.isDown && !state.stopJump) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
        }
        (cling.left || cling.right) ? this.body.setVelocityY(0) : this.body.setVelocityY(this.state.speed * 1.5);
      }
      // select weapon
      if (keys.select.isDown) {
        this.selectWeapon();
      }
      // player on water
      if (this.onWater && !this.inventory.aquaSuit) {
        keys.run.isDown ? this.state.speed = 120 : this.state.speed = 70;
        this.state.morphingSpeed = 55;
        this.state.jumpDelay = 400;
      } else {
        if (!keys.run.isDown) {
          this.state.speed = 165;
        }
        this.state.morphingSpeed = 140;
        // this.state.jumpDelay = 500;
      }
      // flip player animation and bullets positions
      if (body.velocity.x < 0) {
        this.flipX = true;
        this.state.bulletOrientationX = 'left';
        this.state.bulletPositionX = 3;
        this.playerGhostEmitter.scaleX.propertyValue = -1;
      } else if (body.velocity.x > 0) {
        this.flipX = false;
        this.state.bulletOrientationX = 'right';
        this.state.bulletPositionX = 7;
        this.playerGhostEmitter.scaleX.propertyValue = 1;
      }
      // pause
      if (keys.pause.isDown) {
        this.scene.pauseGame();
      }
    } else if (state.pause) {
      // GAME PAUSE
      if (!this.scene.isPausing && keys.pause.isDown) {
        this.scene.pauseGame();
      }
      if (keys.down.isDown) {
        this.scene.events.emit('scrollMapDown');
      }
      if (keys.up.isDown) {
        this.scene.events.emit('scrollMapUp');
      }
      // if (keys.left.isDown) {
      //   this.events.emit('scrollMapLeft');
      // }
      // if (keys.right.isDown) {
      //   this.events.emit('scrollMapRight');
      // }
      // if (!this.chooseDone && keys.fire.isDown) {
      //   this.scene.launch();
      // }
    }
    if (!keys.run.isDown && !this.onWater) {
      this.state.runSpeed = 285;
    }
    // player animation play
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }

    if (this.SUPERJUMP) {
      this.state.jumpDelay = 6666650;
      this.body.setVelocityY(-600);
    }
    this.anims.setTimeScale(Math.abs(this.body.velocity.x) / 250);
    const absSpeed = Math.abs(body.velocity.x);
    if (absSpeed > 385) {
      this.playerGhostEmitter
        .setFrame(this.anims.currentFrame.textureFrame.toString())
        .setLifespan(Math.abs(this.body.velocity.x / 10))
        .emitParticleAt(this.x, this.y);
      if (absSpeed >= 550) {
        this.setPipeline('GlowFx');
        this.isSpeedRunningMax(true, time);
        if (keys.down.isDown) {
          this.SuperPowers(time);
        }
      }
      return;
    }
    if (!this.SUPERJUMP) {
      this.setPipeline('Light2D');
    }
    //console.log('fin update')
    //this.playerGhostEmitter.tint.propertyValue = 0xFFFFFF;
    this.isSpeedRunningMax(false, time);
  }

  isJumping() {
    this.jumpCooldownTimer = this.scene.time.addEvent({
      delay: this.state.jumpDelay,
      callback: () => {
        this.state.stopJump = true;
      },
    });
  }

  animate(str) {
    this.anims.play(str, true);
    //this.anims.setTimeScale(Math.abs(this.body.velocity.x) / 200);
  }

  stopAnimate(str) {
    this.anims.stop(str);
  }

  isRunning() {
    if (this.keys.run.isDown
      && (this.keys.left.isDown || this.keys.right.isDown)
      // && this.body.blocked.down
      && (!this.onWater || this.inventory.aquaSuit)) {
      if (this.state.speed < this.state.runSpeed) {
        this.state.speed += this.state.speed / 10;
      }
      if (this.inventory.speedBooster) {
        this.isSpeedRunning();
      }
    } else if (!this.keys.run.isDown && (this.keys.left.isDown || this.keys.right.isDown) && (!this.onWater || this.inventory.aquaSuit)) {
      this.state.speed = 165;
    }
  }

  isSpeedRunning() {
    if (!this.inventory.speedBooster) {
      return;
    }
    this.scene.time.addEvent({
      delay: 32,
      callback: () => {
        if (this.state.runSpeed < 600) {
          this.state.runSpeed += this.state.runSpeed / 200;
        }
      },
    });
  }

  isSpeedRunningMax(bool) {
    if (!bool) {
      if (this.colorToggleTimer) {
        this.colorToggleTimer.destroy();
        this.state.colorChange = false;
      }
      return;
    }
    if (this.state.colorChange) {
      return;
    }
    this.state.colorChange = true;
    this.setPipeline('GlowFx');
    // this.colorToggleTimer = this.scene.time.addEvent({
    //   delay: 64,
    //   loop: true,
    //   callback: () => {
    //     if (this.tintBottomLeft !== 16777215) { // 16777215) {
    //       //this.clearTint();
    //       //this.playerGhostEmitter.tint.propertyValue = 0xFFFFFF;
    //       return;
    //     }
    //     const col = 0xDEFF00;
    //     //this.setTint(col);
    //     //this.playerGhostEmitter.tint.propertyValue = col;
    //   },
    // });
  }

  SuperPowers() {
    if (this.state.SuperPowersActive) {
      return;
    }
    this.state.SuperPowersActive = true;
    // display superpowers active
    this.colorToggleTimer2 = this.scene.time.addEvent({
      delay: 64,
      loop: true,
      callback: () => {
        if (this.getPipelineName() === 'Light2D' && !this.SUPERJUMP) {
          this.setPipeline('GlowFx');
        } else {
          this.setPipeline('Light2D');
        }
        if (this.SUPERJUMP) {
          this.setPipeline('GlowFx');
        }
      },
    });
    // ends superpowers
    this.scene.time.addEvent({
      delay: 5000,
      callback: () => {
        this.state.SuperPowersActive = false;
        this.colorToggleTimer2.remove();
        this.setPipeline('Light2D');
      },
    });
  }

  shoot(time) {
    if (this.state.selectedWeapon === 'bullet' && !this.state.onMorphingBall) {
      this.shootGun(time);
    }
    if (this.state.selectedWeapon === 'swell' && !this.state.onMorphingBall) {
      this.shootSwell(time);
    }
    if (this.state.selectedWeapon === 'missile' && !this.state.onMorphingBall) {
      this.shootMissile(time);
    }
    if (this.state.selectedWeapon === 'laser' && !this.state.onMorphingBall) {
      this.shootLaser(time);
    }
    if (this.inventory.morphingBomb && this.state.onMorphingBall) {
      this.shootBomb(time);
    }
  }

  shootLaser(time) {
    if (time > this.state.lastFired) {
      const laser = this.lasers.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'laser', null, true);
      if (laser) {
        this.state.lastFired = time + this.inventory.fireRate;
        laser.visible = true;
        laser.setPipeline('TestFx');
        if (this.onWater) {
          laser.setDepth(98);
        } else {
          laser.setDepth(102);
        }
        this.scene.sound.play('laser', { volume: 0.3 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.x = -600;
        }
        if (this.state.bulletOrientationX === 'right') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.x = 600;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          laser.setAngle(90);
          laser.body.setSize(4, 22);
          laser.body.velocity.y = -600;
          laser.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 800,
          callback: () => {
            laser.destroy();
          },
        });
      }
    }
  }

  laserKill(e) {
    this.scene.sound.play('explo2', { volume: 0.2 });
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('enemyExplode', true);
    e.on('animationcomplete', () => { e.destroy(); });
  }

  shootBomb(time) {
    if (time > this.state.lastFired) {
      const bomb = this.bombs.getFirstDead(true, this.body.x + 6, this.body.y + 10, 'bomb', null, true);
      if (bomb) {
        this.state.lastFired = time + this.inventory.fireRate;
        bomb.displayWidth = 10;
        bomb.displayHeight = 10;
        bomb.visible = true;
        bomb.setImmovable();
        bomb.anims.play('bomb', true);
        if (this.onWater) {
          bomb.setDepth(98);
        } else {
          bomb.setDepth(106);
        }
        bomb.body.enabled = false;
        bomb.body.setSize(16, 16);
        //    BOMB EXPLODE TIMER    //
        this.bombTimer = this.scene.time.addEvent({
          delay: 1500,
          callback: () => {
            const filteringOptions = {
              // isNotEmpty: false,
              isColliding: true,
              // hasInterestingFace: false
            };
            const tiles = this.scene.solLayer.getTilesWithinWorldXY(bomb.body.x || bomb.body.x - 8 || bomb.body.x + 8, bomb.body.y - 4, 16, 16, filteringOptions);
            tiles.forEach((e) => {
              if (e.properties.destructible) {
                this.scene.solLayer.removeTileAt(e.x, e.y, true, true);
                this.scene.frontLayer.removeTileAt(e.x, e.y, true, true);
              }
            });
            bomb.body.enabled = true;
            this.scene.sound.play('impact', { volume: 0.4 });
            bomb.displayWidth = 16;
            bomb.displayHeight = 16;
            bomb.anims.play('impactBomb', true).on('animationcomplete', () => bomb.destroy());
          },
        });
      }
    }
  }

  shootSwell(time) {
    if (time > this.state.lastFired) {
      const swell = this.swells.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'swell', null, true);
      if (swell) {
        this.state.lastFired = time + this.inventory.fireRate;
        // swell.displayWidth = 12;
        // swell.displayHeight = 12;
        swell.visible = true;
        swell.anims.play('swell', true);
        swell.setPipeline('TestFx');
        if (this.onWater) {
          swell.setDepth(98);
        } else {
          swell.setDepth(102);
        }
        this.scene.sound.play('swell', { volume: 0.15 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          // swell.body.setSize(18, 4);
          // swell.setAngle(0);
          swell.flipX = false;
          swell.body.velocity.x = -450;
        }
        if (this.state.bulletOrientationX === 'right') {
          // swell.body.setSize(18, 4);
          // swell.setAngle(0);
          swell.flipX = true;
          swell.body.velocity.x = 450;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          // swell.body.setSize(4, 18);
          // swell.setAngle(90);
          // swell.flipX = false;
          swell.body.velocity.y = -450;
          swell.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          swell.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            swell.destroy();
          },
        });
      }
    }
  }

  swellKill(e) {
    this.scene.sound.play('impact', { volume: 0.4 });
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('impact', true);
    e.on('animationcomplete', () => { e.destroy(); });
  }

  shootMissile(time) {
    if (time > this.state.lastFired) {
      const missile = this.missiles.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'missile', null, true);
      if (missile) {
        this.state.lastFired = time + this.inventory.fireRate;
        missile.visible = true;
        missile.setPipeline('GlowFx');
        missile.anims.play('missile', true);
        if (this.onWater) {
          missile.setDepth(98);
        } else {
          missile.setDepth(102);
        }
        this.scene.sound.play('missile', { volume: 0.5 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          missile.body.setSize(18, 4);
          missile.setAngle(0);
          missile.flipX = false;
          missile.body.velocity.x = -450;
        }
        if (this.state.bulletOrientationX === 'right') {
          missile.body.setSize(18, 4);
          missile.setAngle(0);
          missile.flipX = true;
          missile.body.velocity.x = 450;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          missile.body.setSize(4, 18);
          missile.setAngle(90);
          missile.flipX = false;
          missile.body.velocity.y = -450;
          missile.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          missile.body.velocity.y = 0;
        }

        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            missile.destroy();
          },
        });
      }
    }
  }

  missileKill(e) {
    // e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    this.scene.sound.play('explo2', { volume: 0.4 });
    if (e.texture.key === 'missile') {
      e.setPipeline('TestFx');
      e.anims.play('enemyExplode', true).on('animationcomplete', () => { e.destroy(); });
    } else {
      e.destroy();
    }
  }

  shootGun(time) {
    if (time > this.state.lastFired && this.inventory.gun) {
      const bullet = this.bullets.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'bullet', null, true);
      if (bullet) {
        this.state.lastFired = time + this.inventory.fireRate;
        bullet.visible = true;
        bullet.setPipeline('TestFx');
        this.scene.physics.world.enable(bullet);
        this.scene.add.existing(bullet);
        bullet.anims.play('bull', true);
        if (this.onWater) {
          bullet.setDepth(98);
        } else {
          bullet.setDepth(102);
        }
        // bullet sound
        this.scene.sound.play('bullet', { volume: 0.08 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          bullet.body.velocity.x = -600;
        }
        if (this.state.bulletOrientationX === 'right') {
          bullet.body.velocity.x = 600;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          bullet.body.velocity.y = -600;
          bullet.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          bullet.body.velocity.y = 0;
        }

        this.scene.time.addEvent({
          delay: 800,
          callback: () => {
            bullet.destroy();
          },
        });
      }
    }
  }

  bulletKill(e) {
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('impact', true);
    this.scene.sound.play('impact', { volume: 0.4 });
    //e.on('animationcomplete', () => { e.destroy(); });
  }

  jumpBoosterTimer() {
    if (this.state.onJump) {
      this.state.jumpBoost = false;
      this.state.onJumpBoost = false;
      jumpB = false;
      return;
    }
    this.state.onJumpBoost = true;
    this.state.maxSpeed = 550;
    this.body.setVelocityY(-550);
    this.body.velocity.normalize().scale(this.state.maxSpeed);
    this.scene.sound.play('jumpBooster', { volume: 0.08 });
    // timer for not passing trough floor
    this.scene.time.addEvent({
      delay: 50,
      callback: () => {
        this.body.setSize(10, 35, true);
      },
    });
    // timer for end of jumpBoster
    this.boostTimer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.state.jumpBoost = false;
        this.state.onJumpBoost = false;
        jumpB = false;
        this.body.setVelocityY(this.state.speed * 1.5);
        this.state.maxSpeed = 250;
      },
    });
  }

  killJumpBoosterTimer() {
    if (this.state.onJumpBoost && this.body.blocked.down) {
      this.state.onJumpBoost = false;
      this.boostTimer.remove();
      this.state.jumpBoost = false;
      this.state.maxSpeed = 250;
      jumpB = false;
      this.body.setVelocityY(this.state.speed * 1.5);
    }
  }

  addEnergy() {
    this.inventory.lifeEnergyBlock += 1;
    this.inventory.life = this.inventory.lifeEnergyBlock * 100;
  }

  addSpeedFire() {
    this.inventory.fireRate -= 50;
  }

  addMissile() {
    this.inventory.missile = true;
    this.inventory.selectableWeapon.push('missile');
    this.scene.events.emit('addWeapon', { Weapon: 'missile' });
  }

  addLaser() {
    this.inventory.laser = true;
    this.inventory.selectableWeapon.push('laser');
    this.scene.events.emit('addWeapon', { Weapon: 'laser' });
  }

  addSwell() {
    this.inventory.swell = true;
    this.inventory.selectableWeapon.push('swell');
    this.scene.events.emit('addWeapon', { Weapon: 'swell' });
  }

  selectWeapon() {
    if (!this.selectWeaponFlag && !this.keys.fire.isDown) {
      this.selectWeaponFlag = true;
      let count = this.inventory.selectableWeapon.indexOf(this.state.selectedWeapon);
      if (count === this.inventory.selectableWeapon.length - 1) {
        count = -1;
      }
      this.state.selectedWeapon = this.inventory.selectableWeapon[count + 1];
      this.scene.events.emit('selectWeapon', { selectedWeapon: this.state.selectedWeapon });
      this.scene.sound.play('select', { volume: 0.1 });
      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.selectWeaponFlag = false;
        },
      });
    }
  }

  handleLava() {
    if (!this.lavaOverlap) {
      this.lavaOverlap = true;
      this.inventory.life -= 3;
      this.scene.sound.play('playerHit');
      this.scene.events.emit('setHealth', { life: this.inventory.life });
      this.playerFlashTween = this.scene.tweens.add({
        targets: this.scene.player,
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
          this.scene.player.alpha = 1;
        },
      });
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          this.lavaOverlap = false;
        },
      });
    }
    if (this.inventory.life <= 0) {
      this.state.dead = true;
      this.playerDead = true;
      this.scene.physics.pause();
      this.scene.events.emit('setHealth', { life: 0 });
      this.scene.sound.play('playerDead', { volume: 0.2 });
      this.scene.input.enabled = false;
      this.scene.player.anims.pause(this.scene.player.anims.currentFrame);
      this.playerFlashTween.stop();
      this.inventory.life = 0;
      this.scene.player.setTintFill(0xFFFFFF);
      this.scene.player.setDepth(2000);

      this.round = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'whitePixel');
      this.round.setOrigin(0.5, 0.5);
      this.round.setDepth(1000);
      this.round.displayWidth = 2;
      this.round.displayHeight = 2;

      this.tween = this.scene.tweens.add({
        targets: this.round,
        ease: 'Sine.easeInOut',
        scaleX: 1,
        scaleY: 1,
        duration: 2000,
        delay: 2000,
        onComplete: () => {
          this.scene.input.enabled = true;
          this.scene.playerIsDead();
        },
      });
    }
  }

  getLife(l) {
    if (this.inventory.life + l.health < this.inventory.lifeEnergyBlock * 100) {
      this.inventory.life += l.health;
    } else {
      this.inventory.life = this.inventory.lifeEnergyBlock * 100;
    }
    this.scene.sound.play('getLife', { volume: 0.05 });
    l.destroy();
    this.scene.events.emit('setHealth', { life: this.inventory.life });
  }
}
