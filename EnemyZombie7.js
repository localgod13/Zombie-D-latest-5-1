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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
import { Enemy } from './Enemy.js';
var GRID_SIZE = 32; // Consider importing from a constants file later
export var EnemyZombie7 = /*#__PURE__*/ function(Enemy) {
    "use strict";
    _inherits(EnemyZombie7, Enemy);
    function EnemyZombie7(scene, x, y, player, roundNumber) {
        _class_call_check(this, EnemyZombie7);
        var _this;
        // Use the specific texture key for Zombie 7
        _this = _call_super(this, EnemyZombie7, [
            scene,
            x,
            y,
            'enemy_zombie7_walk',
            player,
            roundNumber
        ]);
        // --- Zombie 7 Specific Configuration ---
        _this.enemyType = 'Zombie7';
        _this.baseHealth = 4; // Slightly more health?
        _this.baseSpeed = 45 + roundNumber * 4; // Slightly slower base speed?
        _this.frameWidth = 96; // Original frame width for this sprite
        _this.frameHeight = 96; // Original frame height for this sprite
        _this.desiredBodyHeightScale = 0.6; // How much of the scaled height the physics body should take up
        _this.hitboxWidthScale = 0.225; // How much of the scaled width the hitbox should be (Reduced by 25%)
        _this.hitboxHeightScale = 0.375; // How much of the scaled height the hitbox should be (Reduced by 25%)
        _this.hitboxOffsetXScale = -0.25; // Fine-tune X offset (percentage of scaled width) - Moved further left
        _this.hitboxOffsetYScale = -0.1; // Fine-tune Y offset (percentage of scaled height) - Moved slightly up
        _this.adjustDisplayAndHitbox();
        // Set health based on round (can be adjusted)
        _this.setData('health', _this.baseHealth + Math.floor(roundNumber / 3));
        _this.setData('isScreaming', false);
        _this.screamChance = 0.003; // Adjust chance as needed (checked each frame)
        _this.screamCooldownTimer = null; // Timer to prevent spamming screams
        // Start the correct walk animation
        _this.anims.play('zombie7_walk', true);
        return _this;
    }
    _create_class(EnemyZombie7, [
        {
            // --- Reuse Adjust Display and Hitbox Logic ---
            // (Copied from EnemyZombie6 as it shares 96x96 frame size - consider moving to base Enemy if common)
            key: "adjustDisplayAndHitbox",
            value: function adjustDisplayAndHitbox() {
                // Increased scale from 5x to 6x grid size
                var enemyScale = GRID_SIZE * 6 / this.frameWidth; // Scale based on desired size (6x grid size) relative to frame width
                this.setDisplaySize(this.frameWidth * enemyScale, this.frameHeight * enemyScale);
                if (this.body) {
                    var displayWidth = this.frameWidth * enemyScale;
                    var displayHeight = this.frameHeight * enemyScale;
                    var hitboxWidth = displayWidth * this.hitboxWidthScale;
                    var hitboxHeight = displayHeight * this.hitboxHeightScale;
                    this.body.setSize(hitboxWidth, hitboxHeight);
                    // Calculate offset to center the hitbox within the scaled display size
                    var offsetX = (displayWidth - hitboxWidth) / 2;
                    var offsetY = (displayHeight - hitboxHeight) / 2;
                    // Apply fine-tuning offsets based on scale factors
                    offsetX += displayWidth * this.hitboxOffsetXScale;
                    offsetY += displayHeight * this.hitboxOffsetYScale;
                    this.body.setOffset(offsetX, offsetY);
                    // Store original values if needed for flipping (though offset calculation based on scale might handle it)
                    this.setData('originalOffsetX', offsetX);
                    this.setData('offsetY', offsetY);
                    this.setData('enemyScale', enemyScale);
                }
            }
        },
        {
            key: "update",
            value: function update(time, delta) {
                var _this_anims_currentAnim, _this_anims;
                // Use base class update for movement ONLY if not dying, not a corpse, AND not screaming
                if (this.active && this.body && !this.getData('isDying') && !this.getData('isCorpse') && !this.getData('isScreaming')) {
                    // Calculate angle towards the player target
                    var angle = Phaser.Math.Angle.Between(this.x, this.y, this.playerTarget.x, this.playerTarget.y);
                    // Calculate speed based on round number
                    var speed = this.baseSpeed; // Use the adjusted base speed
                    // Apply velocity
                    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
                    // Flip sprite based on horizontal direction towards player
                    this.flipX = this.playerTarget.x < this.x;
                // NOTE: Hitbox offset flipping might need adjustment if hitbox isn't symmetrical after scaling/offsetting.
                // Reusing the offset calculation during flip might be more robust.
                } else if (this.body) {
                    // Ensure dying, corpse, or screaming enemies stop moving
                    this.body.setVelocity(0, 0);
                }
                // --- Scream Logic ---
                var canTryScream = this.active && !this.getData('isDying') && !this.getData('isCorpse') && !this.getData('isScreaming') && ((_this_anims = this.anims) === null || _this_anims === void 0 ? void 0 : (_this_anims_currentAnim = _this_anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) === 'zombie7_walk';
                if (canTryScream && !this.screamCooldownTimer) {
                    if (Math.random() < this.screamChance) {
                        this.startScream();
                    }
                }
            }
        },
        {
            key: "startScream",
            value: function startScream() {
                var _this = this;
                if (!this.active || this.getData('isDying') || this.getData('isCorpse') || this.getData('isScreaming')) {
                    console.log("Cannot start scream - zombie is not in valid state");
                    return;
                }
                console.log("=== Starting Zombie 7 Scream ===");
                this.setData('isScreaming', true);
                if (this.body) {
                    this.body.setVelocity(0, 0); // Stop movement
                }
                
                // Play scream sound
                if (this.scene.soundManager) {
                    console.log("Playing scream sound");
                    this.scene.soundManager.playZombie7Scream();
                }
                
                // Play scream animation
                console.log("Playing scream animation");
                this.anims.play('zombie7_scream', true).once('animationcomplete', function() {
                    console.log("Scream animation complete");
                    // Spawn zombies after the scream animation completes
                    console.log("Spawning zombies after scream...");
                    _this.spawnRandomZombies();
                    
                    // Only resume walking if still active and not interrupted by death/hurt
                    if (_this.active && !_this.getData('isDying') && !_this.getData('isCorpse')) {
                        _this.setData('isScreaming', false);
                        _this.anims.play('zombie7_walk', true);
                        // Set a cooldown before the zombie can scream again
                        _this.startScreamCooldown();
                    } else {
                        // Ensure scream state is false if interrupted
                        _this.setData('isScreaming', false);
                        // Cooldown might not be necessary if interrupted by death, but start it anyway for safety
                        _this.startScreamCooldown();
                    }
                });
                
                // Handle case where animation might not exist or fail to play
                if (!this.anims.get('zombie7_scream')) {
                    console.warn("Zombie 7 scream animation not found!");
                    this.setData('isScreaming', false); // Reset state if anim fails
                    this.startScreamCooldown();
                }
                console.log("=== Zombie 7 Scream Process Complete ===");
            }
        },
        {
            key: "startScreamCooldown",
            value: function startScreamCooldown() {
                var _this = this;
                // Clear existing timer if any
                if (this.screamCooldownTimer) {
                    this.screamCooldownTimer.remove(false);
                }
                // Set cooldown (e.g., 5-10 seconds)
                var cooldownDuration = Phaser.Math.Between(5000, 10000);
                this.screamCooldownTimer = this.scene.time.delayedCall(cooldownDuration, function() {
                    _this.screamCooldownTimer = null; // Clear the timer variable when cooldown ends
                }, [], this);
            }
        },
        {
            // Override takeDamage to use Zombie 7 animations and handle scream interruption
            key: "takeDamage",
            value: function takeDamage(amount) {
                var _this = this;
                if (this.getData('isDying') || this.getData('isCorpse')) return;
                var currentHealth = this.getData('health') || 0;
                currentHealth -= amount;
                this.setData('health', currentHealth);
                console.log("Zombie 7 health: ".concat(currentHealth));
                // Interrupt scream if currently screaming
                if (this.getData('isScreaming')) {
                    this.setData('isScreaming', false);
                    // Ensure cooldown starts even if scream is interrupted by damage
                    if (!this.screamCooldownTimer) {
                        this.startScreamCooldown();
                    }
                // Stop the scream animation immediately if needed, or let hurt/death anim override
                // this.anims.stop(); // Consider if needed
                }
                if (this.body) {
                    this.body.setVelocity(0, 0); // Stop movement briefly when hit
                }
                if (currentHealth > 0) {
                    var _this_anims_currentAnim;
                    // Play Hurt Animation (use zombie7_hurt)
                    if (this.active && this.anims && ((_this_anims_currentAnim = this.anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) !== 'zombie7_hurt' && !this.getData('isDying')) {
                        this.anims.play('zombie7_hurt', true).once('animationcomplete', function() {
                            if (_this.active && !_this.getData('isDying') && !_this.getData('isScreaming')) {
                                _this.anims.play('zombie7_walk', true);
                            } else if (_this.active && _this.getData('isScreaming')) {
                                // If it was screaming before being hurt, maybe resume scream? Or just walk? Let's default to walk.
                                _this.setData('isScreaming', false); // Ensure scream state is false after hurt
                                _this.anims.play('zombie7_walk', true);
                            }
                        });
                    }
                } else {
                    // Play Death Sequence (use zombie7_dead)
                    this.die(); // Use a dedicated die method
                }
            }
        },
        {
            // Override attack to use Zombie 7 animations and handle scream interruption
            key: "attack",
            value: function attack(target) {
                var _this = this;
                var _this_anims_currentAnim, _this_anims;
                if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage') || this.getData('isScreaming')) {
                    // Also prevent attack if screaming
                    return;
                }
                console.log("Zombie 7 attacking ".concat(_instanceof(target, Phaser.GameObjects.Sprite) ? target.texture.key : 'block'));
                this.setData('canDealDamage', false);
                if (this.body) {
                    this.body.setVelocity(0, 0);
                }
                var currentAnimKey = (_this_anims = this.anims) === null || _this_anims === void 0 ? void 0 : (_this_anims_currentAnim = _this_anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key;
                if (this.anims && currentAnimKey !== 'zombie7_attack' && !this.getData('isDying')) {
                    this.anims.play('zombie7_attack', true).once('animationcomplete', function() {
                        if (_this.active && !_this.getData('isDying') && !_this.getData('isScreaming')) {
                            _this.anims.play('zombie7_walk', true);
                        }
                    });
                } else if (this.getData('isDying')) {
                    if (currentAnimKey === 'zombie7_walk') this.anims.stop();
                }
                var attackCooldown = 800; // Adjust cooldown for Zombie 7 if needed
                this.scene.time.delayedCall(attackCooldown, function() {
                    if (_this.active && !_this.getData('isDying') && !_this.getData('isCorpse')) {
                        _this.setData('canDealDamage', true);
                    } else {
                        if (!_this.active || _this.getData('isCorpse')) {
                            _this.setData('canDealDamage', false);
                        }
                    }
                });
            }
        },
        {
            // Override die method for specific death animation and final frame
            key: "die",
            value: function die() {
                var _this = this;
                if (this.getData('isDying')) return; // Already dying
                console.log("Zombie 7 dying...");
                this.setData('isDying', true);
                this.setData('isScreaming', false); // Ensure scream stops on death
                if (this.body) {
                    this.body.enable = false; // Disable physics body
                    this.body.setVelocity(0, 0);
                }
                // Clear scream cooldown timer on death
                if (this.screamCooldownTimer) {
                    this.screamCooldownTimer.remove(false);
                    this.screamCooldownTimer = null;
                }
                var onDeathAnimationComplete = function() {
                    if (_this.active) {
                        _this.anims.stop();
                        var lastFrameIndex = 4;
                        _this.setTexture('enemy_zombie7_dead', lastFrameIndex);
                        _this.setData('isCorpse', true);
                        _this.setActive(false);
                        _this.setDepth(-1);
                        if (_this.body) _this.body.enable = false;
                        console.log("Zombie 7 died and became a corpse.");
                        
                        // --- Add Blood Pool ---
                        var bloodPool = _this.scene.add.image(_this.x, _this.y + (_this.body.height / 2), 'red-ink-stains');
                        bloodPool.setDepth(_this.depth - 1);
                        bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                        bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                        bloodPool.setAngle(Phaser.Math.Between(0, 359));
                        bloodPool.setTint(0xAA0000);
                        // --- End Blood Pool ---
                        
                        if (_this.scene.uiManager) _this.scene.uiManager.update();
                    }
                };
                // Use the specific animation key for the event listener
                this.once('animationcomplete-zombie7_dead', onDeathAnimationComplete);
                // Play the specific death animation
                if (this.anims) {
                    this.anims.play('zombie7_dead', true);
                } else {
                    // Fallback if animations fail
                    onDeathAnimationComplete();
                }
            }
        },
        {
            // Cleanup timers on destroy
            key: "preDestroy",
            value: function preDestroy() {
                if (this.screamCooldownTimer) {
                    this.screamCooldownTimer.remove(false);
                    this.screamCooldownTimer = null;
                }
                // Call super.preDestroy if base class has one
                if (_get(_get_prototype_of(EnemyZombie7.prototype), "preDestroy", this)) {
                    _get(_get_prototype_of(EnemyZombie7.prototype), "preDestroy", this).call(this);
                }
            }
        },
        {
            key: "handleDeath",
            value: function handleDeath() {
                // Remove upgrade point award
                this.scene.addScore(this.scoreValue);
                this.scene.addMoney(this.moneyValue);
                this.scene.addKill();
                this.destroy();
            }
        },
        {
            key: "spawnRandomZombies",
            value: function spawnRandomZombies() {
                console.log("=== Starting Zombie Spawn Process ===");
                
                // Spawn 5 zombies in a wider formation around Zombie 7
                for (let i = 0; i < 5; i++) {
                    // Calculate position in a wider formation (40-80 units from Zombie 7)
                    const angle = (i / 5) * Math.PI * 2; // Evenly distribute in a circle
                    const distance = Phaser.Math.Between(40, 80);
                    const spawnX = this.x + Math.cos(angle) * distance;
                    const spawnY = this.y + Math.sin(angle) * distance;

                    // Choose a random zombie type (0-5, excluding Zombie 7 and Hulk)
                    const zombieType = Phaser.Math.Between(0, 5);
                    console.log(`Attempting to spawn zombie type ${zombieType} at (${spawnX}, ${spawnY})`);

                    // Create the zombie using the scene's createRegularZombie method
                    const newZombie = this.scene.createRegularZombie(zombieType, spawnX, spawnY);
                    if (newZombie) {
                        // Add the zombie to the scene's enemies group
                        this.scene.enemies.add(newZombie);
                        console.log(`Successfully spawned zombie type ${zombieType}`);
                    } else {
                        console.error(`Failed to spawn zombie type ${zombieType}`);
                    }
                }
            }
        }
    ]);
    return EnemyZombie7;
}(Enemy);
