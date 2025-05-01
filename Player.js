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
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
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
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
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
// Constants from GameScene (move relevant ones here later)
var GRID_SIZE = 32;
export var Player = /*#__PURE__*/ function(_Phaser_GameObjects_Sprite) {
    "use strict";
    _inherits(Player, _Phaser_GameObjects_Sprite);
    function Player(scene, x, y) {
        _class_call_check(this, Player);
        var _this;
        // Start with handgun texture by default
        _this = _call_super(this, Player, [
            scene,
            x,
            y,
            'player_handgun'
        ]);
        _this.scene = scene;
        // Add to scene and physics
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        // Basic properties moved from GameScene.create
        // Adjust size - make height roughly 2x grid size, maintain aspect ratio
        var targetHeight = GRID_SIZE * 2;
        var playerScale = targetHeight / _this.height; // Use actual sprite height
        var targetWidth = _this.width * playerScale;
        _this.setDisplaySize(targetWidth, targetHeight);
        _this.body.setCollideWorldBounds(true); // Call on the physics body
        _this.body.allowGravity = false;
        _this.setDepth(10); // Ensure player is rendered above most other elements
        // Use a rectangular physics body matching scaled dimensions
        _this.body.setSize(targetWidth, targetHeight);
        // Optional: Adjust offset if needed
        // this.body.setOffset(offsetX, offsetY);
        // --- Player-specific state (to be expanded) ---
        _this.health = 5;
        _this.isReloading = false;
        _this.currentWeapon = 'handgun'; // Default weapon
        // Weapon Stats
        _this.weaponStats = {
            handgun: {
                maxAmmo: 6,
                reloadTimeMultiplier: 1.0,
                fireRate: 500 // 500ms between shots
            },
            shotgun: {
                maxAmmo: 2,
                reloadTimeMultiplier: 1.5,
                fireRate: 800 // 800ms between shots
            },
            auto_rifle: {
                maxAmmo: 30,
                reloadTimeMultiplier: 1.0,
                fireRate: 100 // 100ms between shots
            },
            rocket_launcher: {
                maxAmmo: 1,
                reloadTimeMultiplier: 2.0,
                fireRate: 1500 // 1.5 seconds between shots
            }
        };
        _this.maxAmmo = _this.weaponStats[_this.currentWeapon].maxAmmo;
        _this.currentAmmo = _this.maxAmmo;
        _this.isFiring = false; // Track if fire button is held
        _this.lastFiredTime = 0; // Track time of last shot for fire rate control
        _this.isRifleSoundPlaying = false; // Flag for looping rifle sound
        console.log("Player initialized"); // Add log to confirm creation
        // Initialize animations
        _this.initAnimations();
        // Set initial animation
        _this.anims.play('player_handgun_idle', true);
        return _this;
    }
    _create_class(Player, [
        {
            key: "initAnimations",
            value: function initAnimations() {
                // Handgun Animations
                this.scene.anims.create({
                    key: 'player_handgun_idle',
                    frames: this.scene.anims.generateFrameNumbers('player_handgun', {
                        start: 0,
                        end: 0
                    }),
                    frameRate: 1,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_handgun_walk',
                    frames: this.scene.anims.generateFrameNumbers('player_handgun', {
                        start: 1,
                        end: 19
                    }),
                    frameRate: 20,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_handgun_reload',
                    frames: this.scene.anims.generateFrameNumbers('player_handgun_reload', {
                        start: 0,
                        end: 14
                    }),
                    frameRate: 25,
                    repeat: 0 // Play only once
                });
                // Shotgun Animations
                this.scene.anims.create({
                    key: 'player_shotgun_idle',
                    frames: this.scene.anims.generateFrameNumbers('player_shotgun', {
                        start: 0,
                        end: 0
                    }),
                    frameRate: 1,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_shotgun_walk',
                    // Assuming similar frame count to handgun for now (adjust if needed based on sheet)
                    frames: this.scene.anims.generateFrameNumbers('player_shotgun', {
                        start: 1,
                        end: 19
                    }),
                    frameRate: 20,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_shotgun_reload',
                    // Assuming 20 frames total (0-19) - Adjust if needed based on sheet
                    frames: this.scene.anims.generateFrameNumbers('player_shotgun_reload', {
                        start: 0,
                        end: 19
                    }),
                    // Slow down frame rate further (e.g., ~1.5 seconds)
                    frameRate: 13,
                    repeat: 0
                });
                // Auto Rifle Animations (using 'player_rifle' and 'player_rifle_reload')
                this.scene.anims.create({
                    key: 'player_auto_rifle_idle',
                    frames: this.scene.anims.generateFrameNumbers('player_rifle', {
                        start: 0,
                        end: 0
                    }),
                    frameRate: 1,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_auto_rifle_walk',
                    frames: this.scene.anims.generateFrameNumbers('player_rifle', {
                        start: 1,
                        end: 19
                    }),
                    frameRate: 20,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'player_auto_rifle_reload',
                    frames: this.scene.anims.generateFrameNumbers('player_rifle_reload', {
                        start: 0,
                        end: 19
                    }),
                    frameRate: 15,
                    repeat: 0
                });

                // Rocket Launcher Animations
                // Removed rocket launcher animations since it's a static image
                // Add a check to ensure animations were created successfully
                if (!this.scene.anims.exists('player_handgun_idle') || 
                    !this.scene.anims.exists('player_handgun_walk') || 
                    !this.scene.anims.exists('player_handgun_reload')) {
                    console.error('Failed to create handgun animations');
                }
            }
        },
        {
            // --- Player Methods ---
            key: "handleMovement",
            value: function handleMovement(cursors, keys) {
                if (!this || !this.body) return; // Ensure player and body exist
                var speed = this.baseSpeed || 160; // Use baseSpeed if set, otherwise default to 160
                var velocityX = 0;
                var velocityY = 0;
                if (cursors.left.isDown || keys.A.isDown) {
                    velocityX = -speed;
                } else if (cursors.right.isDown || keys.D.isDown) {
                    velocityX = speed;
                }
                if (cursors.up.isDown || keys.W.isDown) {
                    velocityY = -speed;
                } else if (cursors.down.isDown || keys.S.isDown) {
                    velocityY = speed;
                }
                this.body.setVelocityX(velocityX);
                this.body.setVelocityY(velocityY);
                // Normalize diagonal speed
                this.body.velocity.normalize().scale(speed);
                // Play animation based on movement AND reload state
                if (this.currentWeapon === 'rocket_launcher') {
                    // Don't try to play animations for rocket launcher since it's static
                    return;
                }
                if (this.isReloading) {
                    var _this_anims_currentAnim;
                    // If reloading, always play the correct reload animation, even if moving
                    var reloadAnimKey = "player_".concat(this.currentWeapon, "_reload");
                    // Only play if not already playing to avoid interrupting
                    if (((_this_anims_currentAnim = this.anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) !== reloadAnimKey) {
                        this.anims.play(reloadAnimKey, true);
                    }
                } else if (velocityX !== 0 || velocityY !== 0) {
                    var _this_anims_currentAnim1;
                    // If moving and NOT reloading, play the correct walk animation
                    var walkAnimKey = "player_".concat(this.currentWeapon, "_walk");
                    // Only play if not already playing to avoid interrupting idle frame
                    if (((_this_anims_currentAnim1 = this.anims.currentAnim) === null || _this_anims_currentAnim1 === void 0 ? void 0 : _this_anims_currentAnim1.key) !== walkAnimKey) {
                        this.anims.play(walkAnimKey, true);
                    }
                } else {
                    var _this_anims_currentAnim2;
                    // If not moving and NOT reloading, play the correct idle animation
                    var idleAnimKey = "player_".concat(this.currentWeapon, "_idle");
                    // Only play if not already playing to avoid interrupting walk cycle
                    if (((_this_anims_currentAnim2 = this.anims.currentAnim) === null || _this_anims_currentAnim2 === void 0 ? void 0 : _this_anims_currentAnim2.key) !== idleAnimKey) {
                        this.anims.play(idleAnimKey, true);
                    }
                }
            }
        },
        {
            key: "updateAnimation",
            value: function updateAnimation() {
            // Kept for potential future use, but movement handles anims now
            }
        },
        {
            key: "fire",
            value: function fire(targetX, targetY) {
                var _this = this;
                // Return false if unable to fire (allows game scene to manage timing/flags)
                if (this.isReloading) {
                    // console.log("Reloading..."); // Reduce console spam
                    return false;
                }
                if (this.currentAmmo <= 0) {
                    // console.log("Out of ammo!"); // Reduce console spam
                    if (!this.isReloading) this.startReload(); // Trigger reload automatically if not already doing so
                    return false;
                }
                // Only fire if player is active
                if (!this.active) return false;

                // Check fire rate for all weapons
                var currentTime = this.scene.time.now;
                var fireRate = this.weaponStats[this.currentWeapon].fireRate || 500; // Default to 500ms if not specified
                if (currentTime - this.lastFiredTime < fireRate) {
                    return false; // Too soon to fire again
                }
                this.lastFiredTime = currentTime;

                // Decrement ammo
                this.currentAmmo--;
                if (this.scene.uiManager) this.scene.uiManager.updateAmmoText(); // Update ammo UI via manager
                console.log("Ammo: ".concat(this.currentAmmo, "/").concat(this.maxAmmo)); // Log ammo count
                // Player model recoil on fire
                var recoilDistance = 3; // How many pixels to move back
                var recoilDuration = 50; // Milliseconds for the recoil effect
                // --- Calculate spawn point FIRST ---
                var originalX = this.x;
                var originalY = this.y;
                // --- Calculate gun tip position --- (Common for both weapons)
                var forwardOffset = this.currentWeapon === 'shotgun' ? 45 : 38; // Slightly more forward for shotgun visual
                var rightOffset;
                if (this.currentWeapon === 'shotgun') {
                    rightOffset = 20;
                } else if (this.currentWeapon === 'auto_rifle') {
                    rightOffset = 15; // Adjusted value for rifle barrel alignment
                } else {
                    rightOffset = 17;
                }
                var playerAngle = this.rotation; // Use the player's visual rotation for spawn offset
                var spawnX = originalX + Math.cos(playerAngle) * forwardOffset + Math.cos(playerAngle + Math.PI / 2) * rightOffset;
                var spawnY = originalY + Math.sin(playerAngle) * forwardOffset + Math.sin(playerAngle + Math.PI / 2) * rightOffset;
                // --- Calculate fire angle from the SPAWN POINT to the target ---
                var fireAngle = Phaser.Math.Angle.Between(spawnX, spawnY, targetX, targetY);
                // Recoil angle is still based on the fire angle
                var recoilAngle = fireAngle + Math.PI;
                // --- Apply Recoil (after calculating spawn, before firing) ---
                // Calculate recoil position
                var recoilX = originalX + Math.cos(recoilAngle) * recoilDistance;
                var recoilY = originalY + Math.sin(recoilAngle) * recoilDistance;
                // Apply recoil immediately
                this.setPosition(recoilX, recoilY);
                // Schedule return to original position using scene's timer
                this.scene.time.delayedCall(recoilDuration, function() {
                    if (_this && _this.active) {
                        _this.setPosition(originalX, originalY);
                    }
                });
                // --- Fire based on weapon ---
                if (this.currentWeapon === 'handgun') {
                    // --- Handgun: Fire one projectile ---
                    var projectile = this.scene.projectiles.get(spawnX, spawnY);
                    if (projectile) {
                        this.scene.setupProjectile(projectile, fireAngle); // Use the corrected fireAngle
                        // --- Immediate Overlap Check ---
                        this.checkImmediateHit(projectile);
                    }
                } else if (this.currentWeapon === 'shotgun') {
                    // --- Shotgun: Fire multiple projectiles in a spread ---
                    var numPellets = 5;
                    var spreadAngle = Phaser.Math.DegToRad(15); // 15 degrees total spread
                    for(var i = 0; i < numPellets; i++){
                        // Apply spread relative to the corrected fireAngle
                        var pelletAngle = fireAngle + Phaser.Math.FloatBetween(-spreadAngle / 2, spreadAngle / 2);
                        var projectile1 = this.scene.projectiles.get(spawnX, spawnY);
                        if (projectile1) {
                            this.scene.setupProjectile(projectile1, pelletAngle); // Use the pellet's angle
                            // --- Immediate Overlap Check ---
                            this.checkImmediateHit(projectile1);
                        }
                    }
                } else if (this.currentWeapon === 'auto_rifle') {
                    // --- Auto Rifle: Fire one projectile (similar to handgun for now) ---
                    var projectile2 = this.scene.projectiles.get(spawnX, spawnY);
                    if (projectile2) {
                        this.scene.setupProjectile(projectile2, fireAngle); // Use the corrected fireAngle
                        // --- Immediate Overlap Check ---
                        this.checkImmediateHit(projectile2);
                    }
                } else if (this.currentWeapon === 'rocket_launcher') {
                    // --- Rocket Launcher: Fire one powerful projectile ---
                    var projectile3 = this.scene.projectiles.get(spawnX, spawnY);
                    if (projectile3) {
                        // Set the rocket launcher projectile texture
                        projectile3.setTexture('rocket_launcher_projectile');
                        // Scale the projectile to be smaller than GRID_SIZE
                        projectile3.setDisplaySize(GRID_SIZE * 0.5, GRID_SIZE * 0.5); // 50% of GRID_SIZE
                        
                        // Play rocket sound
                        this.scene.sound.play('rocket_sound', { volume: 0.2 });
                        
                        // Add explosion animation when projectile hits something
                        projectile3.on('destroy', function() {
                            var explosion = this.scene.add.sprite(projectile3.x, projectile3.y, 'rocket_explosion');
                            explosion.setScale(2); // Make explosion larger
                            explosion.play('rocket_explosion_anim');
                            explosion.once('animationcomplete', function() {
                                explosion.destroy();
                            });
                        }, this);
                        
                        this.scene.setupProjectile(projectile3, fireAngle); // Use the corrected fireAngle
                        // --- Immediate Overlap Check ---
                        this.checkImmediateHit(projectile3);
                    }
                }
                // --- Play Weapon-Specific Sound ---
                if (this.currentWeapon === 'shotgun') {
                    this.scene.soundManager.playShotgunShoot();
                } else if (this.currentWeapon === 'auto_rifle') {
                    // Start looping rifle sound only if it's not already playing
                    if (!this.isRifleSoundPlaying) {
                        this.scene.soundManager.playRifleShootLoop();
                        this.isRifleSoundPlaying = true;
                    }
                } else if (this.currentWeapon === 'rocket_launcher') {
                    this.scene.soundManager.playShoot(); // Use handgun sound for now
                } else {
                    this.scene.soundManager.playShoot();
                }
                // Check if we just ran out of ammo
                if (this.currentAmmo <= 0) {
                    this.startReload(); // Trigger reload
                }
                return true; // Indicate successful firing attempt
            }
        },
        {
            key: "startReload",
            value: function startReload() {
                var _this = this;
                // Don't reload if already reloading or ammo is full
                if (this.isReloading || this.currentAmmo === this.maxAmmo) {
                    return;
                }
                console.log("Starting reload for ".concat(this.currentWeapon, "..."));
                this.isReloading = true;
                
                // Handle rocket launcher differently since it's a static image
                if (this.currentWeapon === 'rocket_launcher') {
                    // Play reload sound
                    this.scene.soundManager.playReload();
                    
                    // Create the reload animation if it doesn't exist
                    if (!this.scene.anims.exists('rocket_launcher_reload_anim')) {
                        this.scene.anims.create({
                            key: 'rocket_launcher_reload_anim',
                            frames: this.scene.anims.generateFrameNumbers('rocket_launcher_reload', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 20, // 20 frames over 1 second
                            repeat: 0
                        });
                    }
                    
                    // Create the explosion animation if it doesn't exist
                    if (!this.scene.anims.exists('rocket_explosion_anim')) {
                        this.scene.anims.create({
                            key: 'rocket_explosion_anim',
                            frames: this.scene.anims.generateFrameNumbers('rocket_explosion', {
                                start: 0,
                                end: 9
                            }),
                            frameRate: 15,
                            repeat: 0
                        });
                    }
                    
                    // Play the reload animation
                    this.setTexture('rocket_launcher_reload');
                    this.anims.play('rocket_launcher_reload_anim');
                    
                    // Set a slightly larger size for the reload animation
                    var targetHeight = GRID_SIZE * 1.4; // Slightly larger than 1.2
                    var targetWidth = this.width * (targetHeight / this.height);
                    this.setDisplaySize(targetWidth, targetHeight);
                    
                    // Set a timer for the reload duration
                    var reloadDuration = 2000; // 2 seconds for rocket launcher
                    this.scene.time.delayedCall(reloadDuration, function() {
                        if (!_this.scene || !_this.scene.scene.isActive(_this.scene.key) || !_this || !_this.active) {
                            console.log("Reload cancelled - player or scene invalid.");
                            return;
                        }
                        _this.isReloading = false;
                        _this.currentAmmo = _this.maxAmmo;
                        // Restore the regular rocket launcher texture
                        _this.setTexture('player_rocket_launcher');
                        // Keep the same size
                        var targetHeight = GRID_SIZE * 2.2;
                        var targetWidth = _this.width * (targetHeight / _this.height);
                        _this.setDisplaySize(targetWidth, targetHeight);
                        console.log("Reload complete!");
                        if (_this.scene.uiManager) _this.scene.uiManager.updateAmmoText();
                    });
                    return;
                }

                // For other weapons, handle reload animations
                var reloadAnimKey = "player_".concat(this.currentWeapon, "_reload"); // Dynamically select animation
                this.anims.play(reloadAnimKey, true); // Play the correct reload animation once
                // --- Play Weapon-Specific Reload Sound ---
                if (this.currentWeapon === 'shotgun') {
                    this.scene.soundManager.playShotgunReload();
                } else if (this.currentWeapon === 'auto_rifle') {
                    // TODO: Add specific auto_rifle reload sound later
                    this.scene.soundManager.playReload(); // Use handgun sound for now
                    this.scene.soundManager.stopRifleShootLoop(); // Stop firing sound on reload
                } else {
                    this.scene.soundManager.playReload();
                }
                if (this.scene.uiManager) this.scene.uiManager.updateAmmoText(); // Show 'Reloading...' in ammo UI via manager
                // Calculate reload duration based on the correct animation
                var reloadAnim = this.anims.get(reloadAnimKey);
                var baseReloadDuration = reloadAnim ? reloadAnim.frames.length / reloadAnim.frameRate * 1000 : 1000; // Duration in ms, default 1s if anim not found
                // Apply reload time multiplier from weapon stats
                var reloadDuration = baseReloadDuration * this.weaponStats[this.currentWeapon].reloadTimeMultiplier;
                // Set timer to finish reload using scene's timer
                this.scene.time.delayedCall(reloadDuration, function() {
                    // Check if the scene/player is still valid before completing reload
                    if (!_this.scene || !_this.scene.scene.isActive(_this.scene.key) || !_this || !_this.active) {
                        console.log("Reload cancelled - player or scene invalid.");
                        return; // Stop if scene/player destroyed during reload
                    }
                    _this.isReloading = false;
                    _this.currentAmmo = _this.maxAmmo;
                    console.log("Reload complete!");
                    if (_this.scene.uiManager) _this.scene.uiManager.updateAmmoText(); // Update ammo UI with full ammo via manager
                    // After reload animation, explicitly check movement state and set animation
                    // Access cursors/keys from the scene
                    var cursors = _this.scene.cursors;
                    var keys = _this.scene.keys;
                    // Check if any movement keys are currently pressed
                    var isMoving = cursors.left.isDown || keys.A.isDown || cursors.right.isDown || keys.D.isDown || cursors.up.isDown || keys.W.isDown || cursors.down.isDown || keys.S.isDown;
                    // Use the correct idle/walk animation for the current weapon
                    var idleAnimKey = "player_".concat(_this.currentWeapon, "_idle");
                    var walkAnimKey = "player_".concat(_this.currentWeapon, "_walk");
                    if (isMoving) {
                        _this.anims.play(walkAnimKey, true);
                    } else {
                        _this.anims.play(idleAnimKey, true);
                    }
                    // If the player was firing before reload, resume firing
                    if (_this.scene.input.activePointer.isDown) {
                        _this.isFiring = true;
                    }
                }, [], this); // Scope set to 'this' (the Player instance)
            }
        },
        {
            key: "switchWeapon",
            value: function switchWeapon(weaponKey) {
                // Don't switch if reloading or already using the weapon
                if (this.isReloading || this.currentWeapon === weaponKey) {
                    return;
                }
                console.log("Switching to ".concat(weaponKey));
                this.currentWeapon = weaponKey;
                // Update ammo based on the new weapon's stats
                this.maxAmmo = this.weaponStats[this.currentWeapon].maxAmmo;
                // Reset current ammo to the new max (or handle differently if desired, e.g., remember ammo counts)
                this.currentAmmo = this.maxAmmo;
                this.isReloading = false; // Cancel any ongoing reload
                // Update the sprite texture
                var textureKey = "player_".concat(weaponKey);
                console.log("Setting texture to: ".concat(textureKey)); // Debug log
                this.setTexture(textureKey);
                
                // Set specific target sizes for each weapon
                var targetHeight, targetWidth;
                if (weaponKey === 'auto_rifle') {
                    // Set specific size for rifle to match other weapons
                    targetHeight = GRID_SIZE * 0.35 * 0.95 * 0.95; // Shrink height by another 5%
                    targetWidth = GRID_SIZE * 0.35 * 0.95 * 0.95; // Shrink width by another 5%
                } else if (weaponKey === 'rocket_launcher') {
                    // Make rocket launcher slightly larger
                    targetHeight = GRID_SIZE * 2.2; // Slightly taller than other weapons
                    targetWidth = this.width * (targetHeight / this.height);
                } else {
                    // Standard size for other weapons
                    targetHeight = GRID_SIZE * 2;
                    targetWidth = this.width * (targetHeight / this.height);
                }
                
                this.setDisplaySize(targetWidth, targetHeight);
                
                // For rocket launcher, stop animations since it's static
                if (weaponKey === 'rocket_launcher') {
                    this.anims.stop();
                } else {
                    // For other weapons, handle animations as before
                    var isMoving = this.body.velocity.x !== 0 || this.body.velocity.y !== 0;
                    var idleAnimKey = "player_".concat(this.currentWeapon, "_idle");
                    var walkAnimKey = "player_".concat(this.currentWeapon, "_walk");
                    // Check if the animations exist before trying to play them
                    if (this.scene.anims.exists(idleAnimKey) && this.scene.anims.exists(walkAnimKey)) {
                        if (isMoving) {
                            this.anims.play(walkAnimKey, true);
                        } else {
                            this.anims.play(idleAnimKey, true);
                        }
                    } else {
                        console.warn("Animations not found for weapon: ".concat(weaponKey));
                    }
                }
                // Stop the looping rifle sound if switching AWAY from the rifle
                if (this.isRifleSoundPlaying && weaponKey !== 'auto_rifle') {
                    this.scene.soundManager.stopRifleShootLoop();
                    this.isRifleSoundPlaying = false;
                }
            }
        },
        {
            key: "takeDamage",
            value: function takeDamage(amount) {
                var _this = this;
                // Ignore damage if already dead or invincible (add invincibility state later if needed)
                if (this.health <= 0 || !this.active) {
                    return;
                }
                this.health -= amount;
                console.log("Player took ".concat(amount, " damage. Health: ").concat(this.health));
                this.scene.soundManager.playPlayerHit(); // Play player hit sound via scene
                if (this.scene.uiManager) this.scene.uiManager.updateHealthText(); // Update health UI via manager
                if (this.health <= 0) {
                    this.die(); // Trigger death sequence
                } else {
                    // Visual feedback for getting hit (only if not dead)
                    this.scene.cameras.main.shake(100, 0.01);
                    this.setTint(0xff0000); // Tint red briefly
                    this.scene.time.delayedCall(100, function() {
                        if (_this && _this.active) _this.clearTint(); // Remove tint if still active
                    });
                }
            }
        },
        {
            key: "die",
            value: function die() {
                console.log("Player died!");
                this.health = 0; // Ensure health doesn't go below 0
                this.setActive(false); // Make player inactive
                this.setTint(0xff0000); // Keep player tinted red
                this.anims.stop(); // Stop animations
                // Trigger the game over state in the scene
                this.scene.gameOver();
            }
        },
        {
            // --- Helper for Immediate Hit Check ---
            key: "checkImmediateHit",
            value: function checkImmediateHit(projectile) {
                var _this = this;
                this.scene.physics.overlap(projectile, this.scene.enemies, function(proj, enemy) {
                    // Only register hit if projectile is still active (hasn't been destroyed by another immediate hit)
                    if (proj.active && enemy.active && !enemy.getData('isDying') && !enemy.getData('isCorpse')) {
                        console.log("Immediate hit detected!");
                        _this.scene.handleProjectileHit(proj, enemy);
                        // Ensure projectile is destroyed *immediately* after the hit to prevent tunneling/double hits
                        // handleProjectileHit already destroys it, but doing it here guarantees it for the immediate check.
                        if (proj.active) {
                            proj.destroy();
                        }
                    }
                }, null, this);
            }
        },
        {
            key: "updateStats",
            value: function updateStats(upgradeData) {
                // Apply reload speed upgrade
                if (upgradeData.reloadSpeedLevel) {
                    // Reduce reload time by 10% per level
                    this.weaponStats.handgun.reloadTimeMultiplier = 1.0 / (1 + (upgradeData.reloadSpeedLevel * 0.1));
                    this.weaponStats.shotgun.reloadTimeMultiplier = 1.5 / (1 + (upgradeData.reloadSpeedLevel * 0.1));
                    this.weaponStats.auto_rifle.reloadTimeMultiplier = 1.0 / (1 + (upgradeData.reloadSpeedLevel * 0.1));
                }

                // Apply fire rate upgrade
                if (upgradeData.fireRateLevel) {
                    // Increase fire rate by 10% per level
                    this.weaponStats.shotgun.fireRate = 800 / (1 + (upgradeData.fireRateLevel * 0.1));
                    this.weaponStats.auto_rifle.fireRate = 100 / (1 + (upgradeData.fireRateLevel * 0.1));
                }

                // Apply attack damage upgrade
                if (upgradeData.attackDamageLevel) {
                    // Store damage multiplier for use in projectile creation
                    this.damageMultiplier = 1 + (upgradeData.attackDamageLevel * 0.2); // 20% increase per level
                }

                // Apply movement speed upgrade
                if (upgradeData.moveSpeedLevel) {
                    // Increase base speed by 10% per level
                    this.baseSpeed = 160 * (1 + (upgradeData.moveSpeedLevel * 0.1));
                }

                console.log("Player stats updated:", {
                    reloadMultiplier: this.weaponStats.handgun.reloadTimeMultiplier,
                    fireRate: this.weaponStats.auto_rifle.fireRate,
                    damageMultiplier: this.damageMultiplier,
                    baseSpeed: this.baseSpeed
                });
            }
        },
        {
            key: "preUpdate",
            value: function preUpdate(time, delta) {
                _get(_get_prototype_of(Player.prototype), "preUpdate", this).call(this, time, delta); // Important: Call the parent method
                // Check if the primary mouse button is UP
                if (!this.scene.input.activePointer.isDown) {
                    // If the rifle sound is currently playing, stop it
                    if (this.isRifleSoundPlaying && this.currentWeapon === 'auto_rifle') {
                        this.scene.soundManager.stopRifleShootLoop();
                        this.isRifleSoundPlaying = false;
                    // console.log("Stopped rifle loop on pointer up"); // Optional: for debugging
                    }
                }
            }
        }
    ]);
    return Player;
}(Phaser.GameObjects.Sprite);
