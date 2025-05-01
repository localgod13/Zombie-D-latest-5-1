function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
import Phaser from 'https://esm.sh/phaser@3.60.0';
import { SOUND_KEYS } from './SoundManager.js'; // Import sound keys
export var PreloadScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(PreloadScene, _Phaser_Scene);
    function PreloadScene() {
        _class_call_check(this, PreloadScene);
        return _call_super(this, PreloadScene, [
            {
                key: './PreloadScene.js'
            }
        ]);
    }
    _create_class(PreloadScene, [
        {
            key: "preload",
            value: function preload() {
                var _this = this;
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                // --- Loading Bar Setup ---
                var progressBar = this.add.graphics();
                var progressBox = this.add.graphics();
                progressBox.fillStyle(0x222222, 0.8);
                progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
                var loadingText = this.make.text({
                    x: width / 2,
                    y: height / 2 - 50,
                    text: 'Loading...',
                    style: {
                        font: '20px monospace',
                        fill: '#ffffff'
                    }
                });
                loadingText.setOrigin(0.5, 0.5);
                var percentText = this.make.text({
                    x: width / 2,
                    y: height / 2,
                    text: '0%',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText.setOrigin(0.5, 0.5);
                var assetText = this.make.text({
                    x: width / 2,
                    y: height / 2 + 50,
                    text: '',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                assetText.setOrigin(0.5, 0.5);
                // --- Loading Event Listeners ---
                this.load.on('progress', function(value) {
                    percentText.setText(parseInt(value * 100) + '%');
                    progressBar.clear();
                    progressBar.fillStyle(0xffffff, 1);
                    progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
                });
                this.load.on('fileprogress', function(file) {
                    assetText.setText('Loading asset: ' + file.key);
                });
                this.load.on('complete', function() {
                    progressBar.destroy();
                    progressBox.destroy();
                    loadingText.destroy();
                    percentText.destroy();
                    assetText.destroy();
                    _this.scene.start('./TitleScene.js'); // Start TitleScene after loading
                    // Also ensure UpgradeScene and PauseScene are available if not loaded elsewhere
                    _this.scene.launch('./UpgradeScene.js').stop('./UpgradeScene.js'); // Launch then stop to have it ready
                    _this.scene.launch('./PauseScene.js').stop('./PauseScene.js'); // Launch then stop to have it ready
                });
                // --- Start Asset Loading (Moved from GameScene.js) ---
                // Load images
                this.load.image('background', 'assets/images/background.png');
                this.load.image('block_segment', 'assets/images/block_segment.png');
                this.load.image('wooden_barricade', 'assets/images/wooden_barricade.png');
                this.load.image('health_ui', 'assets/images/health_ui.png');
                this.load.image('ammo_ui', 'assets/images/ammo_ui.png');
                this.load.image('pistol_icon', 'assets/images/pistol_icon.png');
                this.load.image('shotgun_icon', 'assets/images/shotgun_icon.png');
                this.load.image('rifle_icon', 'assets/images/rifle_icon.png');
                this.load.image('rocket_launcher_icon', 'assets/images/Rocket_Launcher_ui .png');
                this.load.image('player_rocket_launcher', 'assets/sprites/Rocket Launcher.png');
                this.load.image('Rocket Launcher Fired', 'assets/sprites/Rocket Launcher Fired.png');
                this.load.spritesheet('rocket_launcher_reload', 'assets/sprites/Rocket Reload.png', {
                    frameWidth: 199,
                    frameHeight: 150
                });
                this.load.spritesheet('rocket_explosion', 'assets/sprites/Rocket Explosion.png', {
                    frameWidth: 64, // 640 / 10 frames = 64 pixels per frame
                    frameHeight: 64
                });
                this.load.image('rocket_launcher_projectile', 'assets/images/Rocket Launcher Projectile.png');
                console.log("Loading rocket launcher image..."); // Debug log
                this.load.image('red-ink-stains', 'assets/images/red_ink_stains.png');
                this.load.image('supply_crate', 'assets/images/Supply Crate.png');

                // Load player sprites
                this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png', {
                    frameWidth: 258,
                    frameHeight: 220
                });
                this.load.spritesheet('player_handgun_reload', 'assets/sprites/player_handgun_reload.png', {
                    frameWidth: 260,
                    frameHeight: 230
                });
                this.load.spritesheet('player_shotgun', 'assets/sprites/player_shotgun.png', {
                    frameWidth: 313,
                    frameHeight: 206
                });
                this.load.spritesheet('player_shotgun_reload', 'assets/sprites/player_shotgun_reload.png', {
                    frameWidth: 322,
                    frameHeight: 217
                });
                this.load.spritesheet('player_rifle', 'assets/sprites/player_rifle.png', {
                    frameWidth: 313,
                    frameHeight: 206
                });
                this.load.spritesheet('player_rifle_reload', 'assets/sprites/player_rifle_reload.png', {
                    frameWidth: 322,
                    frameHeight: 217
                });

                // Load zombie sprites
                this.load.spritesheet('enemy_zombie_walk', 'assets/sprites/zombie1_walk.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie_attack', 'assets/sprites/zombie1_attack.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie_hurt', 'assets/sprites/zombie1_hurt.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie_dead', 'assets/sprites/zombie1_dead.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });

                this.load.spritesheet('enemy_zombie2_walk', 'assets/sprites/zombie2_walk.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie2_attack', 'assets/sprites/zombie2_attack.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie2_hurt', 'assets/sprites/zombie2_hurt.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie2_dead', 'assets/sprites/zombie2_dead.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });

                this.load.spritesheet('enemy_zombie3_walk', 'assets/sprites/zombie3_walk.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie3_attack', 'assets/sprites/zombie3_attack.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie3_hurt', 'assets/sprites/zombie3_hurt.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie3_dead', 'assets/sprites/zombie3_dead.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });

                this.load.spritesheet('enemy_zombie4_walk', 'assets/sprites/zombie4_walk.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie4_attack', 'assets/sprites/zombie4_attack.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie4_hurt', 'assets/sprites/zombie4_hurt.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });
                this.load.spritesheet('enemy_zombie4_dead', 'assets/sprites/zombie4_dead.png', {
                    frameWidth: 128,
                    frameHeight: 128
                });

                this.load.spritesheet('enemy_zombie5_walk', 'assets/sprites/zombie5_walk.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie5_attack', 'assets/sprites/zombie5_attack.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie5_hurt', 'assets/sprites/zombie5_hurt.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie5_dead', 'assets/sprites/zombie5_dead.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });

                this.load.spritesheet('enemy_zombie6_walk', 'assets/sprites/zombie6_walk.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie6_attack', 'assets/sprites/zombie6_attack.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie6_hurt', 'assets/sprites/zombie6_hurt.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie6_dead', 'assets/sprites/zombie6_dead.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });

                this.load.spritesheet('enemy_zombie7_walk', 'assets/sprites/zombie7_walk.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie7_attack', 'assets/sprites/zombie7_attack.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie7_hurt', 'assets/sprites/zombie7_hurt.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie7_dead', 'assets/sprites/zombie7_dead.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.spritesheet('enemy_zombie7_scream', 'assets/sprites/zombie7_scream.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });

                // Load hulk zombie sprites
                this.load.spritesheet('enemy_zombie8_walk', 'assets/sprites/hulk_walk.png', {
                    frameWidth: 96, // 1344/14 = 96 pixels per frame
                    frameHeight: 96
                });

                // Load hulk attack sprites
                this.load.spritesheet('enemy_zombie8_attack', 'assets/sprites/Hulk_Attack.png', {
                    frameWidth: 96, // 2304/24 = 96 pixels per frame
                    frameHeight: 96
                });

                // Load hulk hurt sprites
                this.load.spritesheet('enemy_zombie8_hurt', 'assets/sprites/Hulk_Hurt.png', {
                    frameWidth: 96,
                    frameHeight: 95
                });

                // Load hulk death sprites
                this.load.spritesheet('enemy_zombie8_dead', 'assets/sprites/Hulk_Death.png', {
                    frameWidth: 96, // 2112/22 = 96 pixels per frame
                    frameHeight: 96
                });

                // Load hulk summon sprites
                this.load.spritesheet('enemy_zombie8_summon', 'assets/sprites/Hulk_Sum2.png', {
                    frameWidth: 480, // 11040/23 = 480 pixels per frame
                    frameHeight: 256
                });

                // Load audio
                this.load.audio(SOUND_KEYS.SHOOT, 'assets/audio/pistol_shot.mp3');
                this.load.audio(SOUND_KEYS.RELOAD, 'assets/audio/pistol_reload.mp3');
                this.load.audio(SOUND_KEYS.BACKGROUND_MUSIC, 'assets/audio/background_music.mp3');
                this.load.audio(SOUND_KEYS.ENEMY_HIT, 'assets/audio/enemy_hit.mp3');
                this.load.audio(SOUND_KEYS.SHOTGUN_SHOOT, 'assets/audio/shotgun_shot.mp3');
                this.load.audio(SOUND_KEYS.SHOTGUN_RELOAD, 'assets/audio/shotgun_reload.mp3');
                this.load.audio(SOUND_KEYS.ZOMBIE_MOAN, 'assets/audio/zombie_moan.mp3');
                this.load.audio(SOUND_KEYS.ZOMBIE_GROWL, 'assets/audio/zombie_growl.mp3');
                this.load.audio(SOUND_KEYS.ZOMBIE_GRUNT, 'assets/audio/zombie_grunt.mp3');
                this.load.audio(SOUND_KEYS.ZOMBIE_7_SCREAM, 'assets/audio/zombie7_scream.mp3');
                this.load.audio(SOUND_KEYS.RIFLE_SHOOT, 'assets/audio/rifle_shot.mp3');
                this.load.audio(SOUND_KEYS.ZOMBIE_ROUND_ALARM, 'assets/audio/Zombie Round Alarm.mp3');
                this.load.audio('helicopter', 'assets/audio/Helicopter.mp3');
                this.load.audio('rocket_sound', 'assets/audio/Rocket Sound.mp3');
                this.load.audio(SOUND_KEYS.HULK_DEATH, 'assets/audio/hulk_death.mp3');

                // Create projectile graphic
                var GRID_SIZE = 32; // Define locally for consistency
                var graphics = this.add.graphics();
                graphics.fillStyle(0xffff00, 1); // Yellow
                graphics.fillRect(0, 0, GRID_SIZE / 4, GRID_SIZE / 4); // Small square
                graphics.generateTexture('projectile', GRID_SIZE / 4, GRID_SIZE / 4);
                graphics.destroy();
            }
        },
        {
            key: "create",
            value: function create() {
                // This method is intentionally left blank for now.
                // The 'complete' event handler in preload() handles starting the next scene.
                console.log("PreloadScene complete.");
            }
        }
    ]);
    return PreloadScene;
}(Phaser.Scene);
