// NOTE: This file is growing large. Consider moving new logic into a separate module or .js file for better maintainability.
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
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
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
import { BlockChoiceUI } from './BlockChoiceUI.js';
import { Enemy } from './Enemy.js';
import { EnemyZombie2 } from './EnemyZombie2.js';
import { EnemyZombie3 } from './EnemyZombie3.js';
import { EnemyZombie4 } from './EnemyZombie4.js'; // Import Zombie 4
import { EnemyZombie5 } from './EnemyZombie5.js'; // Import Zombie 5
import { EnemyZombie6 } from './EnemyZombie6.js'; // Import Zombie 6
import { EnemyZombie7 } from './EnemyZombie7.js'; // Import Zombie 7
import { EnemyZombie8 } from './EnemyZombie8.js'; // Import Zombie 8
import { EnemyZombie8Summon } from './EnemyZombie8Summon.js'; // Import Summon Zombie
import { SoundManager, SOUND_KEYS } from './SoundManager.js';
import { Player } from './Player.js'; // Import the new Player class
import { BlockSegment } from './BlockSegment.js';
import { BlockManager, BLOCK_SHAPES } from './BlockManager.js'; // Import BlockManager and its shapes
import { UpgradeScene } from './UpgradeScene.js'; // Import the UpgradeScene
import { UIManager } from './UIManager.js'; // Import UIManager
// Constants
var GRID_SIZE = 32; // Size of grid cells and block segments - Keep for now, used elsewhere
// Configuration for the game
export var gameConfig = {
    type: Phaser.AUTO,
    // Set fixed internal resolution
    width: 1920,
    height: 1080,
    parent: 'renderDiv',
    // Add scale manager configuration for virtual resolution
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true // Set to true for physics debugging visuals
        }
    },
    backgroundColor: '#2d2d2d',
    scene: null // Scene will be added dynamically
};
export var GameScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(GameScene, _Phaser_Scene);
    function GameScene() {
        _class_call_check(this, GameScene);
        var _this;
        _this = _call_super(this, GameScene, [
            {
                key: './GameScene.js'
            }
        ]);
        _this.player = null;
        // this.currentBlock = null; // Removed, managed by BlockManager indirectly
        _this.placedBlocks = null; // Group for placed blocks (still needed for physics)
        // this.placementIndicator = null; // Removed, managed by BlockManager
        _this.gridGraphics = null; // Visual grid lines (still drawn by scene)
        _this.blockManager = null; // Add reference for BlockManager instance
        _this.enemies = null; // Group for enemies
        _this.spawnTimer = null; // Timer for enemy spawns
        _this.cursors = null; // Input cursors
        _this.projectiles = null; // Group for player projectiles
        _this.gameState = 'BUILDING'; // Initial state ('BUILDING', 'DEFENDING', 'CLEARING', 'GAMEOVER')
        _this.roundNumber = 1;
        _this.buildTime = 15000; // 15 seconds build time
        _this.defendTime = 30000; // 30 seconds defend time
        _this.phaseTimer = null; // Timer for current phase
        _this.uiManager = null; // Use UIManager instance
        _this.supplyCrate = null; // Add reference for supply crate
        _this.nextRoundBonusBlocks = 0; // Track bonus blocks for next round
        _this.nextRoundBonusBarricades = 0; // Track bonus barricades for next round
        // REMOVED: this.shapeChoices = [];
        // REMOVED: this.chosenShapes = [];
        // REMOVED: this.selectedShapeIndex = -1;
        // REMOVED: this.blockChoiceHandler = null; // Managed by BlockManager
        // REMOVED: this.isChoosingBlocks = false; // Managed by BlockManager, though scene needs access via getter
        _this.isSelectionGracePeriodActive = false; // Still needed for click input handling during build
        // Ammo and Reloading
        _this.weaponStats = {
            handgun: {
                maxAmmo: 6,
                reloadTimeMultiplier: 1.0
            },
            shotgun: {
                maxAmmo: 2,
                reloadTimeMultiplier: 1.5
            },
            auto_rifle: {
                maxAmmo: 30,
                reloadTimeMultiplier: 1.0
            }, // Auto Rifle: High capacity, standard reload
            rocket_launcher: {
                maxAmmo: 1,
                reloadTimeMultiplier: 2.0
            } // Rocket Launcher: Low capacity, slow reload
        };
        _this.currentWeapon = 'handgun'; // Start with the handgun
        _this.maxAmmo = _this.weaponStats[_this.currentWeapon].maxAmmo;
        _this.currentAmmo = _this.maxAmmo;
        _this.isReloading = false;
        _this.playerHealth = 5; // Player starts with 5 health
        _this.isGameOver = false; // Flag to check if game is over
        _this.ambientSoundTimer = null; // Timer for zombie sounds
        _this.isPaused = false; // Flag to track pause state
        _this.upgradePoints = 0; // Points for upgrades
        // --- Placeholder Stat Levels (to be passed to UpgradeScene) ---
        // These should ideally live on the Player or be managed more centrally later
        _this.playerReloadLevel = 0;
        _this.playerFireRateLevel = 0;
        _this.playerAttackDamageLevel = 0;
        _this.playerMoveSpeedLevel = 0;
        _this.wallHealthLevel = 3; // Give walls initial health
        _this.isMouseDown = false; // Flag to track if mouse button is held down
        // --- Add Stat Tracking Properties ---
        _this.totalKills = 0;
        _this.totalShotsFired = 0;
        _this.totalShotsLanded = 0;
        _this.totalDamageTaken = 0;
        _this.isEnduranceRound = false;
        _this.enduranceRoundMultiplier = 3; // Speed multiplier for endurance rounds
        _this.warningText = null;
        return _this;
    }
    _create_class(GameScene, [
        {
            key: "create",
            value: function create() {
                var _this = this;
                // --- Instantiate SoundManager and start background music ---
                this.soundManager = new SoundManager(this);
                this.soundManager.playBackgroundMusic(); // Start music

                // Set up the camera to maintain the virtual resolution
                this.cameras.main.setBounds(0, 0, 1920, 1080);
                
                // --- Add Background (Store reference) ---
                this.bgImage = this.add.image(960, 540, 'background'); // Center at 960,540 (half of 1920x1080)
                this.bgImage.setDepth(-10); // Ensure background is behind everything else

                // Initialize grid graphics but don't draw initially
                this.gridGraphics = this.add.graphics();
                
                // Place player sprite at the center grid cell
                var playerStartX = Math.floor(960 / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;
                var playerStartY = Math.floor(540 / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;

                // Prepare initial stats object for the player
                var initialStats = {
                    reloadSpeedLevel: this.playerReloadLevel,
                    fireRateLevel: this.playerFireRateLevel,
                    attackDamageLevel: this.playerAttackDamageLevel,
                    moveSpeedLevel: this.playerMoveSpeedLevel,
                    // Wall health level isn't directly used by player, but pass for consistency if needed later
                    wallHealthLevel: this.wallHealthLevel
                };
                // --- Instantiate Player using the new class, passing initial stats ---
                this.player = new Player(this, playerStartX, playerStartY, initialStats);
                // Player properties (size, physics body, depth, collision) are now set in the Player constructor
                // OLD Player creation code (removed):
                // this.player = this.physics.add.sprite(playerStartX, playerStartY, 'player_handgun');
                // const targetHeight = GRID_SIZE * 2;
                // const playerScale = targetHeight / 220;
                // const targetWidth = 258 * playerScale;
                // this.player.setDisplaySize(targetWidth, targetHeight);
                // this.player.setCollideWorldBounds(true);
                // this.player.body.allowGravity = false;
                // this.player.setDepth(10);
                // this.player.body.setSize(targetWidth, targetHeight);
                // Group to hold placed blocks for collision, etc.
                // Use the custom BlockSegment class for blocks
                this.placedBlocks = this.physics.add.staticGroup({
                    classType: BlockSegment,
                    runChildUpdate: false
                });
                this.placedBlocks.setDepth(5); // Set depth for the whole group
                // Group for enemies
                this.enemies = this.physics.add.group({
                });
                // Group for projectiles
                this.projectiles = this.physics.add.group({
                    defaultKey: 'projectile',
                    maxSize: 30 // Limit number of projectiles on screen
                });
                // Remove initial block generation - player will choose at start of build phase
                // this.generateNewBlock();
                // Instantiate BlockManager
                this.blockManager = new BlockManager(this);
                // Setup mouse interaction
                this.input.on('pointermove', function(pointer) {
                    // Delegate to BlockManager
                    if (_this.blockManager) {
                        _this.blockManager.updatePlacementIndicator(pointer.worldX, pointer.worldY);
                    }
                });
                this.input.on('pointerdown', function(pointer) {
                    if (pointer.leftButtonDown()) {
                        _this.isMouseDown = true; // Set flag on mouse down
                        if (_this.gameState === 'BUILDING') {
                            // Delegate to BlockManager
                            if (_this.blockManager) {
                                _this.blockManager.placeBlock(pointer.worldX, pointer.worldY);
                            }
                        } else if (_this.gameState === 'DEFENDING' || _this.gameState === 'CLEARING') {
                            // Set firing flag instead of firing directly
                            if (_this.player && _this.player.active) {
                                _this.player.isFiring = true;
                            // We'll handle the actual firing in the update loop for autofire
                            }
                        }
                    }
                });
                // Add listener for mouse button release
                this.input.on('pointerup', function(pointer) {
                    if (pointer.leftButtonReleased()) {
                        _this.isMouseDown = false; // Clear flag on mouse up
                        // Clear the firing flag on the player and stop rifle sound
                        if (_this.player) {
                            _this.player.isFiring = false;
                            if (_this.player.currentWeapon === 'auto_rifle') {
                                _this.soundManager.stopRifleShootLoop();
                            }
                        }
                    }
                });
                // Add keyboard input for rotation
                this.input.keyboard.on('keydown-R', function() {
                    // R key handling: Rotate in BUILD, Reload in DEFEND
                    if (_this.gameState === 'BUILDING') {
                        // Delegate to BlockManager
                        if (_this.blockManager) {
                            _this.blockManager.rotateBlock();
                        }
                    } else if (_this.gameState === 'DEFENDING') {
                        // Call player's startReload method
                        if (_this.player && _this.player.active) {
                            _this.player.startReload();
                        }
                    }
                });
                // Setup enemy spawning timer (initially paused)
                this.spawnTimer = this.time.addEvent({
                    delay: 2000,
                    callback: this.spawnEnemy,
                    callbackScope: this,
                    loop: true,
                    paused: true // Start paused, activate during DEFENDING state
                });
                // Add collision detection
                // Use a process callback for enemy vs block collisions to handle health
                this.physics.add.collider(this.enemies, this.placedBlocks, this.handleEnemyBlockHit, null, this);
                this.physics.add.collider(this.player, this.enemies, this.handlePlayerHit, null, this); // Player vs Enemy collision - KEEP this collider definition
                this.physics.add.collider(this.player, this.placedBlocks); // Player collides with walls - KEEP this collider definition
                // Add collision for projectiles vs enemies
                this.physics.add.collider(this.projectiles, this.enemies, this.handleProjectileHit, null, this);
                // Optional: Add collision for projectiles vs walls (destroy projectile) - REMOVED
                // this.physics.add.collider(this.projectiles, this.placedBlocks, this.handleProjectileWallHit, null, this);
                // Initialize keyboard controls
                this.cursors = this.input.keyboard.createCursorKeys();
                // Add WASD keys as well
                this.keys = this.input.keyboard.addKeys('W,A,S,D');
                // Add Debug key 'N' for next round
                this.input.keyboard.on('keydown-N', function() {
                    console.log("DEBUG: Skipping to next round.");
                    if (_this.phaseTimer) _this.phaseTimer.remove(); // Clear existing phase timer
                    if (_this.spawnTimer) _this.spawnTimer.paused = true; // Stop spawning
                    _this.enemies.clear(true, true); // Clear existing enemies
                    // Ensure BlockManager cleans up its choice handler if skipping
                    if (_this.blockManager && _this.blockManager.blockChoiceHandler) {
                        _this.blockManager.blockChoiceHandler.destroy();
                        _this.blockManager.blockChoiceHandler = null;
                        _this.blockManager.isChoosingBlocks = false; // Reset state in manager
                    }
                    // Skip directly to the Upgrade Scene
                    _this.finishRound();
                // this.roundNumber++; // roundNumber is incremented in handleUpgradesComplete
                // this.startBuildPhase(); // Build phase starts after upgrade scene now
                });
                // Add Debug key 'H' to toggle hitboxes
                this.input.keyboard.on('keydown-H', function() {
                    _this.physics.world.debugGraphic.visible = !_this.physics.world.debugGraphic.visible;
                    console.log("Physics debug visibility: ".concat(_this.physics.world.debugGraphic.visible));
                });
                // Add keyboard listeners for weapon switching
                this.input.keyboard.on('keydown-ONE', function() {
                    return _this.switchWeapon('handgun');
                });
                this.input.keyboard.on('keydown-TWO', function() {
                    return _this.switchWeapon('shotgun');
                });
                this.input.keyboard.on('keydown-THREE', function() {
                    return _this.switchWeapon('auto_rifle');
                }); // Add key for Auto Rifle
                this.input.keyboard.on('keydown-FOUR', function() {
                    return _this.switchWeapon('rocket_launcher');
                }); // Add key for Rocket Launcher
                // Remove keyboard block selection listeners
                // Add Escape key for pausing
                this.input.keyboard.on('keydown-ESC', this.togglePause, this);
                // Start with physics debug disabled
                this.physics.world.debugGraphic.visible = false;
                // UI Text display - Now handled by UIManager
                // this.uiText = this.add.text(10, 10, '', { fontSize: '16px', fill: '#ffffff' }); // Removed
                // this.updateUIText(); // Removed
                this.uiManager = new UIManager(this); // Create UIManager instance
                // Define player animations using the new spritesheet key -- MOVED TO Player.js
                // this.anims.create({
                //    key: 'player_handgun_idle', // CORRECTED KEY
                //    frames: this.anims.generateFrameNumbers('player_handgun', { start: 0, end: 0 }), // First frame as idle
                //    frameRate: 1,
                //    repeat: -1
                // });
                // this.anims.create({
                //    key: 'player_handgun_walk', // CORRECTED KEY
                //    frames: this.anims.generateFrameNumbers('player_handgun', { start: 1, end: 19 }), // Use frames 1-19 for walking (20 total frames)
                //    frameRate: 20, // Adjust frame rate as needed
                //    repeat: -1
                // });
                // Start the first build phase timer
                this.startBuildPhase();
                // Set initial animation to idle -- MOVED TO Player.js constructor
                // this.player.anims.play('player_handgun_idle', true); // Ensure correct key
                // Define player reload animation -- MOVED TO Player.js
                // this.anims.create({
                //    key: 'player_handgun_reload', // CORRECTED KEY
                //    frames: this.anims.generateFrameNumbers('player_handgun_reload', { start: 0, end: 14 }), // 15 frames total
                //    frameRate: 25, // Increased frame rate for smoother animation
                //    repeat: 0 // Play only once
                // });
                // Define shotgun animations -- MOVED TO Player.js
                // this.anims.create({
                //    key: 'player_shotgun_idle',
                //    frames: this.anims.generateFrameNumbers('player_shotgun', { start: 0, end: 0 }),
                //    frameRate: 1,
                //    repeat: -1
                // });
                // this.anims.create({
                //    key: 'player_shotgun_walk',
                //    // Assuming similar frame count to handgun for now (adjust if needed based on sheet)
                //    frames: this.anims.generateFrameNumbers('player_shotgun', { start: 1, end: 19 }), // Adjust end frame based on actual sheet
                //    frameRate: 20,
                //    repeat: -1
                // });
                // this.anims.create({
                //    key: 'player_shotgun_reload',
                //    // Assuming 20 frames total (0-19) - Adjust if needed based on sheet
                //    frames: this.anims.generateFrameNumbers('player_shotgun_reload', { start: 0, end: 19 }),
                //    // Slow down frame rate further (e.g., ~1.5 seconds)
                //    frameRate: 13, // 20 frames / 13 fps = ~1.54 seconds
                //    repeat: 0
                // });
                // --- Define Zombie Animations ---
                this.anims.create({
                    key: 'zombie_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie_walk', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 10,
                    repeat: -1 // Loop the walk animation
                });
                // --- Define Zombie Attack Animation ---
                this.anims.create({
                    key: 'zombie_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie_attack', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 10,
                    repeat: 0 // Play only once
                });
                // --- Define Zombie Hurt Animation ---
                this.anims.create({
                    key: 'zombie_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie_hurt', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0 // Play only once
                });
                // --- Define Zombie Dead Animation ---
                this.anims.create({
                    key: 'zombie_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0 // Play only once
                });
                // --- Define Zombie 2 Animations ---
                this.anims.create({
                    key: 'zombie2_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie2_walk', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie2_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie2_attack', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie2_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie2_hurt', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie2_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie2_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                // --- End Zombie 2 Animations ---
                // --- Define Zombie 3 Animations ---
                this.anims.create({
                    key: 'zombie3_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie3_walk', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie3_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie3_attack', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie3_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie3_hurt', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie3_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie3_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                // --- End Zombie 3 Animations ---
                // --- Define Zombie 4 Animations ---
                this.anims.create({
                    key: 'zombie4_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie4_walk', {
                        start: 0,
                        end: 11
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie4_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie4_attack', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie4_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie4_hurt', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie4_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie4_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                // --- End Zombie 4 Animations ---
                // --- Define Zombie 5 Animations ---
                this.anims.create({
                    key: 'zombie5_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie5_walk', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie5_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie5_attack', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie5_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie5_hurt', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie5_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie5_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                // --- End Zombie 5 Animations ---
                // --- Define Zombie 6 Animations ---
                this.anims.create({
                    key: 'zombie6_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie6_walk', {
                        start: 0,
                        end: 7
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie6_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie6_attack', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie6_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie6_hurt', {
                        start: 0,
                        end: 2
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie6_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie6_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                // --- End Zombie 6 Animations ---
                // --- Define Zombie 7 Animations ---
                this.anims.create({
                    key: 'zombie7_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie7_walk', {
                        start: 0,
                        end: 6
                    }),
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'zombie7_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie7_attack', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie7_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie7_hurt', {
                        start: 0,
                        end: 2
                    }),
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie7_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie7_dead', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 12,
                    repeat: 0
                });
                this.anims.create({
                    key: 'zombie7_scream',
                    frames: this.anims.generateFrameNumbers('enemy_zombie7_scream', {
                        start: 0,
                        end: 4
                    }),
                    frameRate: 5 / 3,
                    repeat: 0
                });
                // --- End Zombie 7 Animations ---
                // --- Define Zombie 8 Animations ---
                this.anims.create({
                    key: 'zombie8_walk',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_walk', {
                        start: 0,
                        end: 13
                    }),
                    frameRate: 12,
                    repeat: -1
                });

                // Add hulk attack animation
                this.anims.create({
                    key: 'zombie8_attack',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_attack', {
                        start: 0,
                        end: 23
                    }),
                    frameRate: 15,
                    repeat: 0
                });

                // Add hulk hurt animation
                this.anims.create({
                    key: 'zombie8_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_hurt', {
                        start: 0,
                        end: 2
                    }),
                    frameRate: 10,
                    repeat: 0
                });

                // Add hulk death animation
                this.anims.create({
                    key: 'zombie8_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_dead', {
                        start: 0,
                        end: 21
                    }),
                    frameRate: 15,
                    repeat: 0
                });

                // Add hulk summon animation
                this.anims.create({
                    key: 'zombie8_summon',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_summon', {
                        start: 0,
                        end: 22
                    }),
                    frameRate: 15,
                    repeat: -1
                });

                // Add summon hulk hurt animation
                this.anims.create({
                    key: 'zombie8_summon_hurt',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_summon', {
                        start: 0,
                        end: 22
                    }),
                    frameRate: 15,
                    repeat: 0
                });

                // Add summon hulk death animation
                this.anims.create({
                    key: 'zombie8_summon_dead',
                    frames: this.anims.generateFrameNumbers('enemy_zombie8_summon', {
                        start: 0,
                        end: 22
                    }),
                    frameRate: 15,
                    repeat: 0
                });

                // --- End Zombie 8 Animations ---
                // --- Setup Resize Listener ---
                this.scale.on('resize', this.handleResize, this);
                // Call resize handler initially to set up background and grid
                this.handleResize(this.scale.gameSize);
                // --- End Resize Setup ---
                // --- Setup Ambient Sound Timer ---
                // Use a delayed call initially that reschedules itself
                this.scheduleNextAmbientSound();

                // Add Debug key 'K' to kill all zombies
                this.input.keyboard.on('keydown-K', () => {
                    console.log("Debug: Killing all zombies");
                    this.enemies.children.iterate((enemy) => {
                        if (enemy && enemy.active) {
                            enemy.takeDamage(100); // Deal enough damage to kill any zombie
                        }
                    });
                });
                
                // Create rocket explosion animation
                this.anims.create({
                    key: 'rocket_explosion_anim',
                    frames: this.anims.generateFrameNumbers('rocket_explosion', {
                        start: 0,
                        end: 9
                    }),
                    frameRate: 15,
                    repeat: 0
                });
            }
        },
        {
            key: "handleResize",
            value: function handleResize(gameSize) {
                // The game will automatically scale to fit the screen
                // while maintaining the 1920x1080 virtual resolution
                if (this.bgImage) {
                    // Scale the background to cover the entire game area
                    var scaleX = 1920 / this.bgImage.width;
                    var scaleY = 1080 / this.bgImage.height;
                    var scale = Math.max(scaleX, scaleY);
                    this.bgImage.setScale(scale);
                }

                // Update UI if needed
                if (this.uiManager) this.uiManager.handleResize(gameSize);
            }
        },
        {
            key: "drawGrid",
            value: function drawGrid() {
                // Check BlockManager for indicator status
                var indicator = this.blockManager ? this.blockManager.getIndicator() : null;
                // Only draw grid if manager exists, indicator exists & is visible, and in BUILDING state
                if (!indicator || !indicator.visible || this.gameState !== 'BUILDING') {
                    if (this.gridGraphics) this.gridGraphics.clear();
                    return;
                }
                var _this_scale_gameSize = this.scale.gameSize, width = _this_scale_gameSize.width, height = _this_scale_gameSize.height; // Use scale manager dimensions
                // Ensure gridGraphics exists
                if (!this.gridGraphics) {
                    this.gridGraphics = this.add.graphics();
                }
                this.gridGraphics.clear(); // Clear previous lines
                this.gridGraphics.lineStyle(2, 0xffffff, 0.2); // Brighter, slightly thicker, semi-transparent lines
                // Vertical lines
                for(var x = 0; x < width; x += GRID_SIZE){
                    this.gridGraphics.lineBetween(x, 0, x, height);
                }
                // Horizontal lines
                for(var y = 0; y < height; y += GRID_SIZE){
                    this.gridGraphics.lineBetween(0, y, width, y);
                }
            }
        },
        {
            // generateNewBlock() - MOVED to BlockManager.js
            // updatePlacementIndicator() - MOVED to BlockManager.js
            // placeBlock() - MOVED to BlockManager.js
            // fireProjectile(targetX, targetY) removed - logic moved to Player.js
            // startReload() removed - logic moved to Player.js
            // rotateBlock() - MOVED to BlockManager.js
            // updatePlacementIndicator(pointerX, pointerY, isRotation = false) - MOVED to BlockManager.js
            key: "update",
            value: function update(time, delta) {
                // Update player movement
                if (this.player && this.player.active) {
                    this.player.handleMovement(this.cursors, this.keys);
                }
                
                // Update rocket projectiles
                this.projectiles.getChildren().forEach(function(projectile) {
                    if (projectile.active && projectile.getData('updateCallback')) {
                        projectile.getData('updateCallback')();
                    }
                });
                
                if (this.isGameOver || this.isPaused) return; // Don't update if game is over or paused
                
                // Check if this is a boss round and if the boss is dead
                if (this.isBossRound && this.enemies.countActive(true) === 0 && !this.bossDeathTimer) {
                    console.log("Boss defeated! Ending round in 3 seconds...");
                    // Create a timer to end the round after 3 seconds
                    this.bossDeathTimer = this.time.delayedCall(3000, () => {
                        if (!this.isGameOver) {
                            this.finishRound();
                        }
                    });
                }
                
                // Call player's movement handling method
                if (this.player && this.player.active) {
                    this.player.handleMovement(this.cursors, this.keys);
                    // --- Handle Continuous Firing ---
                    if (this.player.isFiring && (this.gameState === 'DEFENDING' || this.gameState === 'CLEARING')) {
                        var weapon = this.player.currentWeapon;
                        var fireRate = this.player.weaponStats[weapon].fireRate;
                        var now = time; // Use the current time from the update loop
                        // Check if enough time has passed since the last shot
                        if (now > this.player.lastFiredTime + fireRate) {
                            // --- Start rifle sound loop ---
                            if (weapon === 'auto_rifle') {
                                this.soundManager.playRifleShootLoop();
                            }
                            // Increment shots fired BEFORE attempting to fire
                            this.totalShotsFired++;
                            console.log("Shot fired attempt. Total fired: ".concat(this.totalShotsFired));
                            if (this.player.fire(this.input.activePointer.worldX, this.input.activePointer.worldY)) {
                                this.player.lastFiredTime = now; // Update last fired time only if fire was successful
                            } else {
                                // If firing failed (e.g., out of ammo, reloading), stop trying for non-auto weapons
                                if (weapon !== 'auto_rifle') {
                                    this.player.isFiring = false;
                                }
                                // --- Stop rifle sound loop if firing failed ---
                                if (weapon === 'auto_rifle') {
                                    this.soundManager.stopRifleShootLoop();
                                }
                            }
                        }
                    } else if (this.player.currentWeapon === 'auto_rifle') {
                        // Explicitly stop the loop if isFiring is false for the rifle
                        this.soundManager.stopRifleShootLoop();
                    }
                }
                // Update enemies during DEFEND and CLEARING phases
                if ((this.gameState === 'DEFENDING' || this.gameState === 'CLEARING') && this.player && this.player.active) {
                    this.enemies.children.iterate(function(enemy) {
                        // Call the update method on each enemy instance
                        if (enemy && enemy.update) {
                            enemy.update(time, delta);
                        }
                    });
                    // Check if all enemies are cleared during the CLEARING phase
                    if (this.gameState === 'CLEARING' && this.enemies.countActive(true) === 0) {
                        // Check if this is an Endurance round and no crate exists
                        if (this.isEnduranceRound && !this.supplyCrate) {
                            console.log("All enemies cleared in Endurance round, spawning supply crate...");
                            this.spawnSupplyCrate();
                            // Store the timer reference so we can cancel it if the crate is collected
                            this.enduranceTimer = this.time.delayedCall(10000, () => {
                                if (!this.isGameOver) { // Only finish if game isn't over
                                    this.finishRound();
                                }
                            });
                        } else if (!this.isEnduranceRound) {
                            // For non-Endurance rounds, finish immediately
                            if (!this.isGameOver) { // Only finish if game isn't over
                                this.finishRound();
                            }
                        }
                    }
                }
                // --- Manage Ambient Sound Timer ---
                // Pause if no zombies are active, resume if they are
                if (this.ambientSoundTimer) {
                    var zombiesExist = this.enemies.countActive(true) > 0;
                }
                // Update UI text timer continuously
                if (this.uiManager) this.uiManager.update(); // Call UIManager update
                // Check projectile bounds - MUST check AFTER physics updates
                this.physics.world.on('worldbounds', function(body) {
                    if (body.gameObject.getData('onWallHit')) {
                        body.gameObject.getData('onWallHit')();
                    }
                });
                // Rotate player to face cursor
                if (this.player && this.player.active) {
                    var pointer = this.input.activePointer;
                    var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
                    // Add offset if the sprite's default facing direction is not right (0 radians)
                    // For example, if the sprite faces up by default, add: + Math.PI / 2
                    // Reset offset to 0 to establish a baseline
                    // The exact value might require some experimentation based on the sprite's default orientation
                    var rotationOffset = 0; // Reset to no offset
                    this.player.rotation = angle + rotationOffset;
                }
            }
        },
        {
            // handlePlayerMovement() removed - logic moved to Player.js
            key: "spawnEnemy",
            value: function spawnEnemy() {
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                var margin = GRID_SIZE * 2; // Spawn distance outside screen edge
                var x, y;
                // Choose a random edge (0: top, 1: right, 2: bottom, 3: left)
                var edge = Phaser.Math.Between(0, 3);
                switch(edge){
                    case 0:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = -margin;
                        break;
                    case 1:
                        x = width + margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                    case 2:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = height + margin;
                        break;
                    case 3:
                        x = -margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                }
                
                var enemy;
                
                // During boss rounds, spawn the hulk zombie (EnemyZombie8) more frequently
                if (this.isBossRound) {
                    // 70% chance to spawn hulk zombie during boss rounds
                    if (Phaser.Math.Between(1, 10) <= 7) {
                        enemy = new EnemyZombie8(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Hulk Zombie (Boss)");
                    } else {
                        // 30% chance to spawn regular zombies
                        var zombieType = Phaser.Math.Between(0, 6); // Reduced max to 6 to exclude hulk zombie
                        enemy = this.createRegularZombie(zombieType, x, y);
                    }
                } else {
                    // Normal round spawning
                    var zombieType;
                    if (this.roundNumber < 10) {
                        // Rounds 1-9: No hulk zombies
                        zombieType = Phaser.Math.Between(0, 6); // Max 6 to exclude hulk zombie
                        enemy = this.createRegularZombie(zombieType, x, y);
                    } else {
                        // After round 10: Gradually increase chance of hulk zombies
                        // Base chance starts at 5% at round 10 and increases by 1% each round
                        var hulkChance = Math.min(30, 5 + (this.roundNumber - 10)); // Cap at 30% max chance
                        if (Phaser.Math.Between(1, 100) <= hulkChance) {
                            enemy = new EnemyZombie8(this, x, y, this.player, this.roundNumber);
                            console.log("Spawning Hulk Zombie (Regular Round)");
                        } else {
                            zombieType = Phaser.Math.Between(0, 6); // Max 6 to exclude hulk zombie
                            enemy = this.createRegularZombie(zombieType, x, y);
                        }
                    }
                }
                
                this.enemies.add(enemy);
            }
        },
        {
            key: "handlePlayerHit",
            value: function handlePlayerHit(player, enemy) {
                if (this.isGameOver || !player.active) return; // Don't do anything if game is over or player inactive
                // Only deal damage and trigger attack if the enemy can currently deal damage
                if (enemy && enemy.attack && enemy.getData('canDealDamage')) {
                    console.log("Enemy dealing damage to player...");
                    var damageDealt = 1; // Assuming standard enemy attack deals 1 damage
                    enemy.attack(player); // Trigger enemy attack animation/cooldown
                    // Call the player's takeDamage method
                    player.takeDamage(damageDealt);
                    this.totalDamageTaken += damageDealt; // Increment damage taken stat
                    console.log("Player took damage. Total damage taken: ".concat(this.totalDamageTaken));
                // Health decrease, UI update, visual feedback, and death check are now handled within player.takeDamage()
                }
            }
        },
        {
            key: "handleEnemyBlockHit",
            value: function handleEnemyBlockHit(enemy, blockSegment) {
                console.log("Collision: Enemy ".concat(enemy.texture.key, " vs Block ").concat(blockSegment.x, ",").concat(blockSegment.y)); // Log collision entry
                // Only deal damage and trigger attack if the enemy can currently deal damage
                if (enemy && enemy.attack && enemy.getData('canDealDamage')) {
                    console.log("Enemy can deal damage. Calling attack() and takeDamage(1)"); // Log damage intent
                    enemy.attack(blockSegment); // Trigger attack animation and disable damage temporarily
                    // Call the block segment's takeDamage method
                    // Assuming standard enemy attack deals 1 damage for now
                    if (blockSegment.takeDamage) {
                        blockSegment.takeDamage(1);
                    } else {
                        console.warn("Block segment missing takeDamage method!");
                    // Fallback logic (less ideal)
                    // let currentHealth = blockSegment.getData('health') || 0;
                    // currentHealth -= 1;
                    // blockSegment.setData('health', currentHealth);
                    // if (currentHealth <= 0) blockSegment.destroy();
                    }
                    // --- Check if the block is a barricade and deal damage back ---
                    if (blockSegment.texture.key === 'wooden_barricade' && enemy.takeDamage) {
                        console.log("Barricade dealing 1 damage back to enemy.");
                        enemy.takeDamage(1); // Barricade deals 1 damage per hit
                    // Enemy's takeDamage handles hit sound and animation
                    }
                // Health reduction, tinting, sound, and destruction are now handled within blockSegment.takeDamage()
                } else if (enemy && enemy.attack) {
                    console.log("Enemy cannot deal damage right now (canDealDamage: ".concat(enemy.getData('canDealDamage'), ")"));
                } else {
                    console.log("Enemy object or attack method missing in collision."); // Log if enemy/attack is missing
                }
            // If enemy couldn't deal damage (e.g., was still in attack cooldown), do nothing this frame.
            // It will try again on the next collision check if still overlapping.
            }
        },
        {
            key: "handleProjectileHit",
            value: function handleProjectileHit(projectile, enemy) {
                // Special handling for rocket launcher projectiles
                if (this.player.currentWeapon === 'rocket_launcher') {
                    // Create explosion at hit location
                    var explosion = this.add.sprite(projectile.x, projectile.y, 'rocket_explosion');
                    explosion.setScale(2);
                    explosion.play('rocket_explosion_anim');
                    explosion.once('animationcomplete', function() {
                        explosion.destroy();
                    });
                    
                    // Play hit sound once for the explosion
                    this.soundManager.playEnemyHit();
                    
                    // Check for enemies in explosion radius
                    var explosionRadius = 200;
                    this.enemies.getChildren().forEach(function(enemy) {
                        var enemyDx = enemy.x - projectile.x;
                        var enemyDy = enemy.y - projectile.y;
                        var enemyDistance = Math.sqrt(enemyDx * enemyDx + enemyDy * enemyDy);
                        
                        if (enemyDistance <= explosionRadius) {
                            var damage = projectile.getData('damage') || 1;
                            this.totalShotsLanded++;
                            console.log("Shot landed. Total landed: ".concat(this.totalShotsLanded));
                            var enemyWillDie = enemy.health - damage <= 0;
                            enemy.takeDamage(damage);
                            
                            // Apply force push effect ONLY for rocket launcher explosions
                            if (enemy.active && !enemy.getData('isDying') && !enemy.getData('isCorpse')) {
                                // Calculate push direction (away from explosion)
                                var pushAngle = Math.atan2(enemyDy, enemyDx);
                                var pushForce = 500; // Base push force
                                var distanceFactor = 1 - (enemyDistance / explosionRadius); // Stronger push closer to explosion
                                var finalPushForce = pushForce * distanceFactor;
                                
                                // Apply velocity in the push direction
                                enemy.body.setVelocity(
                                    Math.cos(pushAngle) * finalPushForce,
                                    Math.sin(pushAngle) * finalPushForce
                                );
                                
                                // Set stunned state for shorter duration
                                enemy.setData('isStunned', true);
                                
                                // Gradually reduce velocity over time
                                this.time.delayedCall(300, function() {
                                    if (enemy.active && enemy.body) {
                                        enemy.body.setVelocity(0, 0);
                                        enemy.setData('isStunned', false);
                                    }
                                });
                            }
                            
                            if (enemyWillDie && !enemy.active) {
                                this.totalKills++;
                                console.log("Enemy killed. Total kills: ".concat(this.totalKills));
                            }
                        }
                    }, this);
                } else {
                    // Regular projectile behavior for other weapons - NO KNOCKBACK
                    this.soundManager.playEnemyHit();
                    var damage = projectile.getData('damage') || 1;
                    this.totalShotsLanded++;
                    console.log("Shot landed. Total landed: ".concat(this.totalShotsLanded));
                    var enemyWillDie = enemy.health - damage <= 0;
                    enemy.takeDamage(damage);
                    if (enemyWillDie && !enemy.active) {
                        this.totalKills++;
                        console.log("Enemy killed. Total kills: ".concat(this.totalKills));
                    }
                }
                
                projectile.destroy(); // Destroy projectile on hit
            }
        },
        {
            // handleProjectileWallHit is no longer needed as the collider was removed
            // handleProjectileWallHit(projectile, wallSegment) {
            //    projectile.destroy(); // Destroy projectile when it hits a wall
            // }
            key: "startBuildPhase",
            value: function startBuildPhase() {
                console.log("Starting Build Phase - Round ".concat(this.roundNumber));
                this.gameState = 'BUILDING';
                this.spawnTimer.paused = true; // Ensure enemy spawning is off
                // --- Delegate Choice Phase Start to BlockManager ---
                if (this.blockManager) {
                    // Pass bonus blocks to BlockManager
                    this.blockManager.startChoicePhase(this.nextRoundBonusBlocks, this.nextRoundBonusBarricades);
                    // Reset bonus blocks after passing them to BlockManager
                    this.nextRoundBonusBlocks = 0;
                    this.nextRoundBonusBarricades = 0;
                } else {
                    console.error("BlockManager not found in startBuildPhase!");
                    // Handle error case - maybe skip to defend phase?
                    this.startDefendPhase();
                    return; // Exit early
                }
                // Destroy any remaining enemies from previous round
                this.enemies.clear(true, true);
                // Clear previous phase timer (build timer starts after selection)
                if (this.phaseTimer) this.phaseTimer.remove();
            // Update UI text (done within blockManager.startChoicePhase call now)
            // this.updateUIText();
            }
        },
        {
            key: "startDefendPhase",
            value: function startDefendPhase() {
                console.log("Starting Defend Phase - Round " + this.roundNumber);
                this.gameState = 'DEFENDING';
                
                // Check if this is a special round (every 5th round)
                this.isSpecialRound = this.roundNumber % 5 === 0;
                
                if (this.isSpecialRound) {
                    // Alternate between boss and endurance rounds
                    // Odd multiples of 5 (5, 15, 25...) are endurance rounds
                    // Even multiples of 5 (10, 20, 30...) are boss rounds
                    this.isBossRound = (this.roundNumber / 5) % 2 === 0;
                    this.isEnduranceRound = !this.isBossRound;
                    
                    if (this.isBossRound) {
                        console.log("BOSS ROUND!");
                        // Play the boss alarm sound
                        if (this.soundManager) {
                            this.soundManager.playZombieRoundAlarm();
                        }
                        // Show the boss warning message
                        this.showBossWarning();
                        // Spawn the boss and start summoning
                        this.spawnBossRound();
                    } else {
                        console.log("ENDURANCE ROUND!");
                        // Play the alarm sound
                        if (this.soundManager) {
                            this.soundManager.playZombieRoundAlarm();
                        }
                        // Show the warning message
                        this.showEnduranceWarning();
                    }
                } else {
                    this.isBossRound = false;
                    this.isEnduranceRound = false;
                }
                
                // --- Adjust Spawn Rate Based on Round ---
                var baseSpawnDelay = 2000; // Initial delay in ms
                var minSpawnDelay = 500; // Minimum delay in ms
                var delayReductionPerRound = 100; // How much faster spawns get each round
                var currentDelay = Math.max(minSpawnDelay, baseSpawnDelay - delayReductionPerRound * (this.roundNumber - 1));
                
                // Make spawns even faster during endurance rounds
                if (this.isEnduranceRound) {
                    currentDelay = Math.max(minSpawnDelay, currentDelay / 2);
                }
                
                // For boss rounds, we don't need regular spawns since we spawn the boss immediately
                if (!this.isBossRound) {
                    this.spawnTimer.delay = currentDelay;
                    this.spawnTimer.paused = false;
                    console.log("Current spawn delay: " + currentDelay + "ms");
                } else {
                    this.spawnTimer.paused = true; // Don't spawn regular enemies during boss round
                }
                
                // Ensure indicator is hidden via BlockManager
                if (this.blockManager) {
                    // Calling update will hide indicator and clear grid if state isn't BUILDING
                    this.blockManager.updatePlacementIndicator(0, 0);
                } else if (this.gridGraphics) {
                    // Fallback clear grid if manager doesn't exist for some reason
                    this.gridGraphics.clear();
                }
                // Ensure BlockManager cleans up its choice handler if it exists
                if (this.blockManager && this.blockManager.blockChoiceHandler) {
                    this.blockManager.blockChoiceHandler.destroy();
                    this.blockManager.blockChoiceHandler = null;
                    this.blockManager.isChoosingBlocks = false; // Ensure manager state is correct
                }
                // Setup timer to stop spawning
                if (this.phaseTimer) this.phaseTimer.remove();
                this.phaseTimer = this.time.delayedCall(this.defendTime, this.stopSpawning, [], this);
            }
        },
        {
            key: "spawnBoss",
            value: function spawnBoss() {
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                var margin = GRID_SIZE * 2; // Spawn distance outside screen edge
                
                // Choose a random edge (0: top, 1: right, 2: bottom, 3: left)
                var edge = Phaser.Math.Between(0, 3);
                var x, y;
                
                switch(edge){
                    case 0:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = -margin;
                        break;
                    case 1:
                        x = width + margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                    case 2:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = height + margin;
                        break;
                    case 3:
                        x = -margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                }
                
                // Create the boss hulk zombie
                var boss = new EnemyZombie8(this, x, y, this.player, this.roundNumber);
                
                // Make the boss 3x larger
                boss.setScale(3);
                
                // Set boss health to 20 times the current round number
                boss.health = this.roundNumber * 20;
                
                // Add to enemies group
                this.enemies.add(boss);
                console.log("Spawning Giant Boss Hulk Zombie with " + boss.health + " health!");
            }
        },
        {
            key: "stopSpawning",
            value: function stopSpawning() {
                console.log("Defend timer ended. Stopping spawns.");
                this.spawnTimer.paused = true; // Stop spawning new enemies
                this.gameState = 'CLEARING'; // Transition to clearing state
                if (this.phaseTimer) this.phaseTimer.remove(); // Clear the timer
                // UI update is handled by the UIManager in the main update loop
                // Check immediately if enemies are already cleared
                if (this.enemies.countActive(true) === 0) {
                    // Let the update method handle the round completion
                    console.log("All enemies cleared, waiting for update method to handle completion...");
                }
            }
        },
        {
            key: "finishRound",
            value: function finishRound() {
                console.log("Round ".concat(this.roundNumber, " cleared!"));
                // Award exactly 5 upgrade points per round
                this.upgradePoints += 5;
                console.log("Awarded 5 upgrade points. Total: ".concat(this.upgradePoints));
                
                // Prepare current stats to pass
                var currentStats = {
                    reloadSpeedLevel: this.playerReloadLevel,
                    fireRateLevel: this.playerFireRateLevel,
                    attackDamageLevel: this.playerAttackDamageLevel,
                    moveSpeedLevel: this.playerMoveSpeedLevel,
                    wallHealthLevel: this.wallHealthLevel
                };
                
                console.log("Pausing GameScene and launching UpgradeScene with stats:", currentStats);
                // Ensure the scene isn't already pausing/launching (e.g., rapid 'N' presses)
                if (this.scene.isPaused('./GameScene.js')) {
                    console.log("GameScene already paused, skipping launch.");
                    return;
                }
                this.scene.pause('./GameScene.js'); // Pause this scene
                this.scene.launch('./UpgradeScene.js', {
                    upgradePoints: this.upgradePoints,
                    currentStats: currentStats
                });
            }
        },
        {
            // --- Listener for when upgrades are complete ---
            key: "handleUpgradesComplete",
            value: function handleUpgradesComplete(upgradeData) {
                console.log("Received upgrade data (levels):", upgradeData);
                // Store the new levels received from UpgradeScene
                this.playerReloadLevel = upgradeData.reloadSpeedLevel;
                this.playerFireRateLevel = upgradeData.fireRateLevel;
                this.playerAttackDamageLevel = upgradeData.attackDamageLevel;
                this.playerMoveSpeedLevel = upgradeData.moveSpeedLevel;
                this.wallHealthLevel = upgradeData.wallHealthLevel;
                
                // Save the remaining upgrade points
                if (upgradeData.remainingPoints !== undefined) {
                    this.upgradePoints = upgradeData.remainingPoints;
                }
                
                // Apply these new levels to the active player instance
                if (this.player && this.player.updateStats) {
                    this.player.updateStats(upgradeData);
                } else {
                    console.error("Player object not found or missing updateStats method when trying to apply upgrades!");
                }
                
                console.log("Updated GameScene levels (for next block/player creation):", {
                    reload: this.playerReloadLevel,
                    fireRate: this.playerFireRateLevel,
                    damage: this.playerAttackDamageLevel,
                    speed: this.playerMoveSpeedLevel,
                    wall: this.wallHealthLevel,
                    remainingPoints: this.upgradePoints
                });
                
                this.roundNumber++;
                this.startBuildPhase(); // Now start the build phase
            }
        },
        {
            // REMOVED: selectChosenShape() - Moved to BlockManager
            // REMOVED: handleShapeChoiceMade() - Moved to BlockManager
            // REMOVED: finishBlockSelection() - Moved to BlockManager
            // --- Game Over Method ---
            key: "gameOver",
            value: function gameOver() {
                if (this.isGameOver) return; // Prevent multiple calls
                console.log("GAME OVER!");
                this.gameState = 'GAMEOVER';
                this.isGameOver = true;
                this.physics.pause();
                // Stop timers
                if (this.spawnTimer) this.spawnTimer.paused = true;
                if (this.phaseTimer) this.phaseTimer.remove();
                if (this.ambientSoundTimer) this.ambientSoundTimer.remove(); // Stop ambient sounds too
                // Stop rifle sound loop
                if (this.soundManager) {
                    this.soundManager.stopRifleShootLoop();
                // Optionally stop background music or play game over music
                // this.soundManager.stopBackgroundMusic();
                // this.soundManager.playGameOverSound(); // Add this sound if you have one
                }
                // Destroy BlockManager if it exists
                if (this.blockManager) {
                    this.blockManager.destroy();
                    this.blockManager = null;
                }
                // Destroy UIManager if it exists
                if (this.uiManager) {
                    this.uiManager.destroy();
                    this.uiManager = null;
                }
                // Disable scene input (prevents clicks/keys in GameScene)
                this.input.enabled = false;
                // --- Collect Stats ---
                var stats = {
                    roundNumber: this.roundNumber,
                    totalKills: this.totalKills,
                    shotsFired: this.totalShotsFired,
                    shotsLanded: this.totalShotsLanded,
                    damageTaken: this.totalDamageTaken
                };
                console.log("Passing stats to GameOverScene:", stats);
                // --- Launch GameOverScene ---
                // Pause this scene and launch the Game Over scene, passing stats
                this.scene.pause(); // Pause GameScene
                this.scene.launch('./GameOverScene.js', stats); // Launch GameOverScene with data
            }
        },
        {
            // --- Method to switch weapon ---
            key: "switchWeapon",
            value: function switchWeapon(weaponKey) {
                // Ensure player exists before trying to switch
                if (!this.player || !this.player.active) {
                    return;
                }
                // Stop the rifle sound loop IF the current weapon is the rifle
                if (this.player.currentWeapon === 'auto_rifle' && this.soundManager) {
                    this.soundManager.stopRifleShootLoop();
                }
                // Call player's method to handle the actual switching logic
                this.player.switchWeapon(weaponKey);
                // Update UI immediately (reads updated state from player)
                if (this.uiManager) this.uiManager.update(); // Trigger UI update via manager
            }
        },
        {
            // --- Helper to setup projectile physics and properties, now accepting damage ---
            key: "setupProjectile",
            value: function setupProjectile(projectile, angle) {
                // Set projectile properties
                projectile.setActive(true);
                projectile.setVisible(true);
                projectile.setRotation(angle);
                projectile.setDepth(9);
                this.physics.world.enable(projectile);
                
                // Apply player's damage multiplier if available
                var damageMultiplier = this.player.damageMultiplier || 1;
                projectile.setData('damage', 1 * damageMultiplier); // Base damage * multiplier
                
                // Special handling for rocket launcher projectiles
                if (this.player.currentWeapon === 'rocket_launcher') {
                    // Store the target position
                    var targetX = this.input.activePointer.worldX;
                    var targetY = this.input.activePointer.worldY;
                    projectile.setData('targetX', targetX);
                    projectile.setData('targetY', targetY);
                    
                    // Set initial velocity towards target
                    var speed = 800;
                    this.physics.velocityFromRotation(angle, speed, projectile.body.velocity);
                    
                    // Add update callback to check distance to target
                    projectile.setData('updateCallback', function() {
                        var dx = targetX - projectile.x;
                        var dy = targetY - projectile.y;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // If we're close enough to the target, explode
                        if (distance < 10) {
                            // Create explosion
                            var explosion = this.add.sprite(projectile.x, projectile.y, 'rocket_explosion');
                            explosion.setScale(2);
                            explosion.play('rocket_explosion_anim');
                            explosion.once('animationcomplete', function() {
                                explosion.destroy();
                            });
                            
                            // Check for enemies in explosion radius
                            var explosionRadius = 200; // Increased from 100 to 200 for larger AOE
                            this.enemies.getChildren().forEach(function(enemy) {
                                var enemyDx = enemy.x - projectile.x;
                                var enemyDy = enemy.y - projectile.y;
                                var enemyDistance = Math.sqrt(enemyDx * enemyDx + enemyDy * enemyDy);
                                
                                if (enemyDistance <= explosionRadius) {
                                    this.handleProjectileHit(projectile, enemy);
                                }
                            }, this);
                            
                            // Destroy the projectile
                            projectile.destroy();
                        }
                    }.bind(this));
                } else {
                    // Regular projectile behavior for other weapons
                    var speed = 800;
                    this.physics.velocityFromRotation(angle, speed, projectile.body.velocity);
                    
                    // Set up collision with world bounds
                    projectile.body.setCollideWorldBounds(true);
                    projectile.body.onWorldBounds = true;
                    projectile.setData('onWallHit', function() {
                        if (projectile.active) {
                            projectile.destroy();
                        }
                    });
                }
                
                // Add timer to destroy projectile after a certain time (e.g., 1 second) to prevent buildup
                this.time.delayedCall(1000, function() {
                    if (projectile.active) {
                        projectile.destroy();
                    }
                });
            }
        },
        {
            // --- Method to schedule the next random ambient sound ---
            key: "scheduleNextAmbientSound",
            value: function scheduleNextAmbientSound() {
                var _this = this;
                // Clear previous timer if it exists
                if (this.ambientSoundTimer) {
                    this.ambientSoundTimer.remove();
                }
                // Determine random delay (e.g., between 4 and 10 seconds)
                var randomDelay = Phaser.Math.Between(4000, 10000);
                this.ambientSoundTimer = this.time.delayedCall(randomDelay, function() {
                    // Check if zombies are active when the timer fires
                    if (_this.enemies && _this.enemies.countActive(true) > 0 && _this.soundManager) {
                        _this.soundManager.playRandomZombieSound();
                    }
                    // Schedule the next call recursively
                    _this.scheduleNextAmbientSound();
                }, [], this);
            }
        },
        {
            key: "togglePause",
            value: function togglePause() {
                if (this.isGameOver) return; // Cannot pause/unpause if game over
                if (this.isPaused) {
                    // --- Resume Game ---
                    // This case is handled by PauseScene's resume button/key
                    // We might need logic here if resuming from something *other* than PauseScene
                    console.log("Game already paused, resume via PauseScene.");
                } else {
                    // --- Pause Game ---
                    console.log("Pausing game...");
                    this.isPaused = true;
                    // Pause physics and timers
                    this.physics.pause();
                    if (this.spawnTimer) this.spawnTimer.paused = true;
                    if (this.phaseTimer) this.phaseTimer.paused = true;
                    if (this.ambientSoundTimer) this.ambientSoundTimer.paused = true;
                    // Stop rifle sound loop
                    if (this.soundManager) {
                        this.soundManager.stopRifleShootLoop();
                    }
                    // Pause animations for all enemies
                    this.enemies.children.iterate(function(enemy) {
                        if (enemy && enemy.anims) enemy.anims.pause();
                    });
                    // Pause player animation
                    if (this.player && this.player.anims) this.player.anims.pause();
                    // Launch PauseScene as an overlay
                    this.scene.launch('./PauseScene.js');
                    // Explicitly pause this scene (important for stopping its internal update loop)
                    this.scene.pause();
                }
            }
        },
        {
            key: "init",
            value: function init(data) {
                var _this = this;
                console.log("GameScene initializing...");
                // --- Reset Core Game State ---
                this.isGameOver = false;
                this.isPaused = false;
                this.gameState = 'BUILDING'; // Start in building state
                this.roundNumber = 1; // Reset round to 1
                if (!data || !data.continuing) {  // Only reset if starting a new game
                    this.upgradePoints = 0;
                }
                this.playerHealth = 5; // Reset player health (initial value)
                // Reset weapon stats (if they aren't re-read from config)
                this.currentWeapon = 'handgun';
                // Reset ammo based on starting weapon (maxAmmo is derived in create/switchWeapon)
                // this.currentAmmo = this.weaponStats[this.currentWeapon].maxAmmo; // Let Player constructor handle this
                this.isReloading = false;
                // Reset stat tracking
                this.totalKills = 0;
                this.totalShotsFired = 0;
                this.totalShotsLanded = 0;
                this.totalDamageTaken = 0;
                // Reset player stat levels (used for initial player creation)
                this.playerReloadLevel = 0;
                this.playerFireRateLevel = 0;
                this.playerAttackDamageLevel = 0;
                this.playerMoveSpeedLevel = 0;
                this.wallHealthLevel = 3; // Reset initial wall health level
                this.isMouseDown = false;
                // Nullify object references that will be recreated in 'create'
                this.player = null;
                this.placedBlocks = null;
                this.gridGraphics = null;
                this.blockManager = null;
                this.enemies = null;
                this.spawnTimer = null;
                this.cursors = null;
                this.keys = null;
                this.projectiles = null;
                this.phaseTimer = null;
                this.uiManager = null;
                this.ambientSoundTimer = null;
                this.bgImage = null;
                this.soundManager = null; // Ensure sound manager is recreated if needed per scene instance
                // Remove previous listeners before adding new ones
                this.events.off('resume');
                this.events.off('upgradesComplete');
                // --- Setup Listeners ---
                // Listener for resuming from PauseScene
                this.events.on('resume', function() {
                    // Check if resuming from PauseScene or UpgradeScene
                    // We only want to unpause if resuming from PauseScene
                    if (!_this.scene.isPaused('./GameScene.js')) {
                        console.log("Resuming GameScene from Pause...");
                        _this.isPaused = false;
                        // Resume physics and timers (respecting game state)
                        _this.physics.resume();
                        if (_this.gameState === 'DEFENDING' && _this.spawnTimer) _this.spawnTimer.paused = false;
                        if ((_this.gameState === 'BUILDING' || _this.gameState === 'DEFENDING') && _this.phaseTimer) _this.phaseTimer.paused = false;
                        if (_this.ambientSoundTimer) _this.ambientSoundTimer.paused = false;
                        // Resume animations for all enemies
                        _this.enemies.children.iterate(function(enemy) {
                            if (enemy && enemy.anims) enemy.anims.resume();
                        });
                        // Resume player animation
                        if (_this.player && _this.player.anims) _this.player.anims.resume();
                    } else {
                        console.log("GameScene still paused (likely due to UpgradeScene)");
                    }
                }); // End of 'resume' event listener
                // Listener for completing upgrades
                this.events.on('upgradesComplete', this.handleUpgradesComplete, this);
            }
        },
        {
            key: "shutdown",
            value: function shutdown() {
                var _this = this;
                console.log("GameScene shutting down...");
                // --- Stop Timers ---
                if (this.spawnTimer) this.spawnTimer.remove();
                if (this.phaseTimer) this.phaseTimer.remove();
                if (this.ambientSoundTimer) this.ambientSoundTimer.remove();
                if (this.bossDeathTimer) this.bossDeathTimer.remove(); // Add cleanup for boss death timer
                this.spawnTimer = null;
                this.phaseTimer = null;
                this.ambientSoundTimer = null;
                this.bossDeathTimer = null; // Add null assignment
                // --- Destroy Managers ---
                if (this.uiManager) this.uiManager.destroy();
                if (this.blockManager) this.blockManager.destroy();
                // --- Force Stop All Sounds & Remove BG Music Key ---
                this.sound.stopAll(); // Explicitly stop all sounds managed by this scene's sound manager
                this.sound.removeByKey(SOUND_KEYS.BACKGROUND_MUSIC); // Force removal from cache
                // --- Destroy Sound Manager ---
                if (this.soundManager) {
                    this.soundManager.destroy(); // Call our custom destroy which stops specific tracked sounds
                // this.soundManager = null; // Let GC handle this after destroy
                }
                this.uiManager = null;
                this.blockManager = null;
                // --- Destroy Game Objects and Groups ---
                if (this.player) this.player.destroy(); // Destroy player explicitly
                if (this.enemies) this.enemies.destroy(true); // Destroy group and children
                if (this.projectiles) this.projectiles.destroy(true);
                if (this.placedBlocks) this.placedBlocks.destroy(true);
                if (this.gridGraphics) this.gridGraphics.destroy();
                if (this.bgImage) this.bgImage.destroy();
                this.player = null;
                this.enemies = null;
                this.projectiles = null;
                this.placedBlocks = null;
                this.gridGraphics = null;
                this.bgImage = null;
                // --- Remove Event Listeners ---
                this.input.off('pointermove');
                this.input.off('pointerdown');
                this.input.off('pointerup');
                this.input.keyboard.off('keydown-R');
                this.input.keyboard.off('keydown-N');
                this.input.keyboard.off('keydown-H');
                this.input.keyboard.off('keydown-ESC');
                [
                    'ONE',
                    'TWO',
                    'THREE',
                    'FOUR',
                    'FIVE'
                ].forEach(function(key) {
                    _this.input.keyboard.off("keydown-".concat(key));
                });
                this.scale.off('resize', this.handleResize, this);
                this.events.off('resume');
                this.events.off('upgradesComplete', this.handleUpgradesComplete, this); // Clean up old listener
                // NOTE: Resetting flags and state is now done in init()
                // Remove physics listeners? Usually handled by destroying objects/groups
                // this.physics.world.off('worldbounds'); // Be cautious removing global listeners
                console.log("GameScene shutdown complete.");
            }
        },
        {
            key: "showEnduranceWarning",
            value: function showEnduranceWarning() {
                var _this = this;
                var width = this.sys.game.config.width;
                var height = this.sys.game.config.height;
                
                // Create warning text if it doesn't exist
                if (!this.warningText) {
                    this.warningText = this.add.text(width / 2, height / 2, 'WARNING!\nIncoming Horde!', {
                        fontFamily: '"Arial Black", Gadget, sans-serif',
                        fontSize: '48px',
                        fill: '#ff0000',
                        align: 'center',
                        stroke: '#000000',
                        strokeThickness: 6,
                        shadow: {
                            offsetX: 2,
                            offsetY: 2,
                            color: '#000',
                            blur: 3,
                            fill: true
                        }
                    }).setOrigin(0.5).setDepth(100);
                }

                // Reset text properties
                this.warningText.setAlpha(1);
                this.warningText.setScale(1);
                
                // Create flashing effect
                this.tweens.add({
                    targets: this.warningText,
                    alpha: { from: 1, to: 0 },
                    scale: { from: 1, to: 1.5 },
                    ease: 'Power2',
                    duration: 1000,
                    repeat: 2,
                    onComplete: function() {
                        _this.warningText.setVisible(false);
                    }
                });
            }
        },
        {
            key: "spawnSupplyCrate",
            value: function spawnSupplyCrate() {
                console.log("Attempting to spawn supply crate...");
                console.log("Is Endurance Round:", this.isEnduranceRound);
                console.log("Game State:", this.gameState);
                console.log("Existing Crate:", this.supplyCrate ? "Yes" : "No");

                // Only spawn if we're in an Endurance round and in the CLEARING phase
                if (!this.isEnduranceRound || this.gameState !== 'CLEARING') {
                    console.log("Crate spawn conditions not met:");
                    console.log("- Is Endurance Round:", this.isEnduranceRound);
                    console.log("- Game State:", this.gameState);
                    return;
                }

                // Function to check if a position is safe (no blocks)
                const isSafePosition = (x, y) => {
                    // Convert to grid coordinates
                    const gridX = Math.floor(x / GRID_SIZE);
                    const gridY = Math.floor(y / GRID_SIZE);
                    
                    // Check if there's a block at this position
                    let isSafe = true;
                    this.placedBlocks.children.iterate((block) => {
                        if (block) {
                            const blockGridX = Math.floor(block.x / GRID_SIZE);
                            const blockGridY = Math.floor(block.y / GRID_SIZE);
                            if (blockGridX === gridX && blockGridY === gridY) {
                                isSafe = false;
                            }
                        }
                    });
                    return isSafe;
                };

                // Find a safe position
                let x, y;
                let attempts = 0;
                const maxAttempts = 50; // Prevent infinite loop
                
                do {
                    x = Phaser.Math.Between(100, this.game.config.width - 100);
                    y = Phaser.Math.Between(100, this.game.config.height - 100);
                    attempts++;
                } while (!isSafePosition(x, y) && attempts < maxAttempts);

                if (attempts >= maxAttempts) {
                    console.log("Could not find safe position for crate, using default position");
                    x = this.game.config.width / 2;
                    y = this.game.config.height / 2;
                }

                console.log("Spawning crate at safe position:", x, y);

                // Create the supply crate sprite
                this.supplyCrate = this.add.image(x, y, 'supply_crate');
                this.supplyCrate.setScale(0.1); // Reduced scale from 0.2 to 0.1
                this.supplyCrate.setDepth(1); // Ensure it's above the ground but below other elements

                // Start position high above screen
                this.supplyCrate.setPosition(x, -200);

                // Play helicopter sound
                this.sound.play('helicopter', { volume: 0.2 });

                // Create falling animation
                this.tweens.add({
                    targets: this.supplyCrate,
                    y: y,
                    duration: 2000,
                    ease: 'Power2'
                });

                // Add interaction
                this.supplyCrate.setInteractive();
                this.supplyCrate.on('pointerdown', () => {
                    console.log("Supply crate collected!");
                    // Give player benefits when collected
                    this.currentAmmo = this.maxAmmo; // Refill ammo
                    this.playerHealth = Math.min(this.playerHealth + 2, 5); // Heal 2 health points, max 5
                    
                    // Set bonus blocks for next round
                    this.nextRoundBonusBlocks = 1; // One additional block choice
                    this.nextRoundBonusBarricades = 3; // Three additional barricades
                    console.log("Next round will have bonus blocks:", this.nextRoundBonusBlocks, "and barricades:", this.nextRoundBonusBarricades);
                    
                    // Update UI
                    if (this.uiManager) {
                        this.uiManager.update();
                    }

                    // Remove the crate
                    this.supplyCrate.destroy();
                    this.supplyCrate = null;

                    // Cancel the endurance timer if it exists
                    if (this.enduranceTimer) {
                        this.enduranceTimer.remove();
                        this.enduranceTimer = null;
                    }

                    // Finish the round immediately after collecting the crate
                    if (!this.isGameOver) {
                        this.finishRound();
                    }
                });

                console.log("Supply crate spawned successfully!");
            }
        },
        {
            key: "showBossWarning",
            value: function showBossWarning() {
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                // Create a semi-transparent black overlay
                var overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);
                overlay.setOrigin(0, 0);
                overlay.setDepth(100);
                
                // Create warning text
                var warningText = this.add.text(width / 2, height / 2 - 50, 'BOSS ROUND!', {
                    fontSize: '64px',
                    fontStyle: 'bold',
                    fill: '#ff0000',
                    stroke: '#000000',
                    strokeThickness: 6
                });
                warningText.setOrigin(0.5);
                warningText.setDepth(101);
                
                // Create subtext
                var subText = this.add.text(width / 2, height / 2 + 50, 'The Hulk Zombie approaches...', {
                    fontSize: '32px',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 4
                });
                subText.setOrigin(0.5);
                subText.setDepth(101);
                
                // Remove warning after 3 seconds
                this.time.delayedCall(3000, function() {
                    overlay.destroy();
                    warningText.destroy();
                    subText.destroy();
                });
            }
        },
        {
            key: "createRegularZombie",
            value: function createRegularZombie(zombieType, x, y) {
                var enemy;
                switch(zombieType) {
                    case 0:
                        enemy = new Enemy(this, x, y, 'enemy_zombie_walk', this.player, this.roundNumber);
                        console.log("Spawning Zombie 1");
                        break;
                    case 1:
                        enemy = new EnemyZombie2(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 2");
                        break;
                    case 2:
                        enemy = new EnemyZombie3(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 3");
                        break;
                    case 3:
                        enemy = new EnemyZombie4(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 4");
                        break;
                    case 4:
                        enemy = new EnemyZombie5(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 5");
                        break;
                    case 5:
                        enemy = new EnemyZombie6(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 6");
                        break;
                    case 6:
                        enemy = new EnemyZombie7(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 7");
                        break;
                    case 7:
                        enemy = new EnemyZombie8(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 8");
                        break;
                    default:
                        enemy = new EnemyZombie7(this, x, y, this.player, this.roundNumber);
                        console.log("Spawning Zombie 7 (default)");
                }
                return enemy;
            }
        },
        {
            key: "spawnBossRound",
            value: function spawnBossRound() {
                console.log("Starting Boss Round " + this.roundNumber);
                this.gameState = 'DEFENDING';
                this.spawnTimer.paused = false;

                // Spawn the boss hulk
                this.spawnBossHulk();

                // Start spawning summon hulks every 2 seconds
                this.summonTimer = this.time.addEvent({
                    delay: 2000,
                    callback: this.spawnSummonHulk,
                    callbackScope: this,
                    loop: true
                });

                // Set up the defend timer
                this.phaseTimer = this.time.delayedCall(60000, this.stopSpawning, [], this);
            }
        },
        {
            key: "spawnSummonHulk",
            value: function spawnSummonHulk() {
                if (!this.player || !this.player.active) return;

                // Calculate spawn position near the player
                const angle = Phaser.Math.Between(0, 359);
                const distance = 200; // Spawn 200 pixels away from player
                const x = this.player.x + Math.cos(Phaser.Math.DegToRad(angle)) * distance;
                const y = this.player.y + Math.sin(Phaser.Math.DegToRad(angle)) * distance;

                // Create the summon hulk
                const summonHulk = new EnemyZombie8Summon(this, x, y, this.player, this.roundNumber);
                this.enemies.add(summonHulk);
            }
        },
        {
            key: "spawnBossHulk",
            value: function spawnBossHulk() {
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                var margin = GRID_SIZE * 2; // Spawn distance outside screen edge
                
                // Choose a random edge (0: top, 1: right, 2: bottom, 3: left)
                var edge = Phaser.Math.Between(0, 3);
                var x, y;
                
                switch(edge){
                    case 0:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = -margin;
                        break;
                    case 1:
                        x = width + margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                    case 2:
                        x = Phaser.Math.Between(-margin, width + margin);
                        y = height + margin;
                        break;
                    case 3:
                        x = -margin;
                        y = Phaser.Math.Between(-margin, height + margin);
                        break;
                }
                
                // Create the boss hulk zombie
                var boss = new EnemyZombie8(this, x, y, this.player, this.roundNumber);
                
                // Make the boss 3x larger
                boss.setScale(3);
                
                // Set boss health to 20 times the current round number
                boss.health = this.roundNumber * 20;
                
                // Add to enemies group
                this.enemies.add(boss);
                console.log("Spawning Giant Boss Hulk Zombie with " + boss.health + " health!");
            }
        }
    ]);
    return GameScene;
} // END OF GameScene CLASS DEFINITION
(Phaser.Scene);
// --- Helper function outside the class ---
// Updated to accept an array of scenes
export var initGame = function(parentDiv, scenes) {
    var allScenes = _to_consumable_array(scenes).concat([
        UpgradeScene
    ]); // Add UpgradeScene to the list
    var config = _object_spread_props(_object_spread({}, gameConfig), {
        parent: parentDiv,
        scene: allScenes // Pass the array including UpgradeScene
    });
    return new Phaser.Game(config);
};
