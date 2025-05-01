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
var GRID_SIZE = 32; // TODO: Import from constants or pass dynamically
export var Enemy = /*#__PURE__*/ function(_Phaser_Physics_Arcade_Sprite) {
    "use strict";
    _inherits(Enemy, _Phaser_Physics_Arcade_Sprite);
    function Enemy(scene, x, y, textureKey, player, roundNumber) {
        _class_call_check(this, Enemy);
        var _this;
        _this = _call_super(this, Enemy, [
            scene,
            x,
            y,
            textureKey
        ]);
        _this.playerTarget = player;
        _this.roundNumber = roundNumber;
        _this.scene = scene; // Store scene reference
        scene.add.existing(_this); // Add this Enemy object to the scene
        scene.physics.add.existing(_this); // Enable physics for this Enemy object
        _this.setCollideWorldBounds(false); // Allow spawning outside bounds initially
        _this.setDepth(4); // Set depth below placed blocks (5)
        // Adjust display size and physics body
        var enemyScale = GRID_SIZE * 5 / 128; // Scale based on desired size (5x grid size)
        _this.setDisplaySize(128 * enemyScale, 128 * enemyScale);
        if (_this.body) {
            // Adjust body size to be smaller relative to the visual
            var hitboxWidth = 30 * enemyScale;
            var hitboxHeight = 60 * enemyScale;
            _this.body.setSize(hitboxWidth, hitboxHeight);
            // Calculate offset to center the hitbox within the 128x128 frame
            var frameWidth = 128;
            var frameHeight = 128;
            var offsetX = (frameWidth * enemyScale - hitboxWidth) / 2;
            var offsetY = (frameHeight * enemyScale - hitboxHeight) / 2;
            // Fine-tune: Move more left and slightly up from the exact center
            offsetX -= 10 * enemyScale;
            // offsetY += 10 * enemyScale; // Original downward shift
            offsetY += 0 * enemyScale; // Remove downward shift to raise the bottom
            _this.body.setOffset(offsetX, offsetY);
            // Store these calculated values for potential future use (e.g., flipping offset)
            _this.setData('originalOffsetX', offsetX);
            _this.setData('offsetY', offsetY);
            _this.setData('enemyScale', enemyScale);
        }
        _this.setData('health', 3); // Give enemy 3 health points
        _this.setData('isDying', false);
        _this.setData('isCorpse', false);
        _this.setData('canDealDamage', true); // Can the enemy deal damage right now?
        _this.setData('isStunned', false); // Add stunned state
        _this.anims.play('zombie_walk', true); // Start the walk animation
        return _this;
    }
    _create_class(Enemy, [
        {
            key: "update",
            value: function update(time, delta) {
                // Only move if enemy is active, has a body, and is NOT dying, corpse, or stunned
                if (this.active && this.body && !this.getData('isDying') && !this.getData('isCorpse') && !this.getData('isStunned')) {
                    // Calculate angle towards the player target
                    var angle = Phaser.Math.Angle.Between(this.x, this.y, this.playerTarget.x, this.playerTarget.y);
                    // Calculate speed based on round number
                    var speed = 50 + this.roundNumber * 5;
                    // Apply velocity
                    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
                    // Flip sprite based on horizontal direction towards player
                    this.flipX = this.playerTarget.x < this.x;
                } else if (this.body && (this.getData('isDying') || this.getData('isCorpse'))) {
                    // Ensure dying or corpse enemies stop moving completely
                    this.body.setVelocity(0, 0);
                }
            }
        },
        {
            key: "takeDamage",
            value: function takeDamage(amount) {
                var _this = this;
                // Ignore damage if already dying or a corpse
                if (this.getData('isDying') || this.getData('isCorpse')) return;
                var currentHealth = this.getData('health') || 0;
                currentHealth -= amount;
                this.setData('health', currentHealth);
                console.log("Enemy health: ".concat(currentHealth));
                
                if (currentHealth > 0) {
                    var _this_anims_currentAnim;
                    // --- Play Hurt Animation ---
                    // Only play if active and not already playing hurt or dying
                    if (this.active && this.anims && ((_this_anims_currentAnim = this.anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) !== 'zombie_hurt' && !this.getData('isDying')) {
                        this.anims.play('zombie_hurt', true).once('animationcomplete', function() {
                            // After hurt animation, if still active and not dying, resume walking
                            if (_this.active && !_this.getData('isDying')) {
                                _this.anims.play('zombie_walk', true);
                                // Only remove stunned state if it was set (by rocket launcher)
                                if (_this.getData('isStunned')) {
                                    _this.setData('isStunned', false);
                                }
                            }
                        });
                    }
                } else {
                    // --- Play Death Sequence ---
                    if (!this.getData('isDying')) {
                        this.setData('isDying', true); // Mark as dying
                        // Disable physics body immediately
                        if (this.body) {
                            this.body.enable = false;
                        }
                        // Define the listener function for animation completion
                        var onDeathAnimationComplete = function() {
                            // Make sure enemy still exists and wasn't destroyed prematurely
                            if (_this.active) {
                                _this.anims.stop(); // Stop any further animation attempts
                                // Set texture to the last frame of the dead animation (index 4)
                                var lastFrameIndex = 4;
                                _this.setTexture('enemy_zombie_dead', lastFrameIndex);
                                _this.setData('isCorpse', true); // Mark as a permanent corpse
                                _this.setActive(false); // *** Explicitly set inactive ***
                                _this.setDepth(-1); // Place corpse below active units
                                // Ensure physics body remains disabled
                                if (_this.body) _this.body.enable = false;

                                // --- Add Blood Pool ---
                                console.log("Creating blood pool at", _this.x, _this.y); // Debug log
                                var bloodPool = _this.scene.add.image(_this.x, _this.y + (_this.body.height / 2), 'red-ink-stains');
                                bloodPool.setDepth(_this.depth - 1);
                                bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                                bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                                bloodPool.setAngle(Phaser.Math.Between(0, 359));
                                bloodPool.setTint(0xAA0000);
                                // --- End Blood Pool ---

                                console.log("Enemy died and became a corpse.");
                            }
                        };

                        // Listen for the specific animation complete event
                        this.once('animationcomplete-zombie_dead', onDeathAnimationComplete);

                        // Play the death animation
                        if (this.anims) {
                            this.anims.play('zombie_dead', true);
                        }

                        // Ensure movement stops
                        if (this.body) {
                            this.body.setVelocity(0, 0);
                        }
                    }
                }
            }
        },
        {
            // Placeholder for attack method - will be added later
            key: "attack",
            value: function attack(target) {
                var _this = this;
                var _this_anims_currentAnim, _this_anims;
                // Ignore if dying, corpse, inactive, or already cooling down
                if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
                    // console.log(`Attack ignored: dying=${this.getData('isDying')}, corpse=${this.getData('isCorpse')}, active=${this.active}, canDamage=${this.getData('canDealDamage')}`);
                    return;
                }
                // --- Start Attack Sequence ---
                console.log("Enemy attacking ".concat(_instanceof(target, Phaser.GameObjects.Sprite) ? target.texture.key : 'block'));
                // 1. Disable further damage immediately
                this.setData('canDealDamage', false);
                // 2. Stop movement
                if (this.body) {
                    this.body.setVelocity(0, 0);
                }
                // 3. Play attack animation (if not already playing it and not dying)
                var currentAnimKey = (_this_anims = this.anims) === null || _this_anims === void 0 ? void 0 : (_this_anims_currentAnim = _this_anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key;
                if (this.anims && currentAnimKey !== 'zombie_attack' && !this.getData('isDying')) {
                    this.anims.play('zombie_attack', true).once('animationcomplete', function() {
                        // After attack *animation* finishes, if still active and not dying, resume walking animation
                        // Cooldown is handled by the timer below, not here.
                        if (_this.active && !_this.getData('isDying')) {
                            _this.anims.play('zombie_walk', true);
                        // Movement will resume naturally in the next update cycle if conditions are met
                        }
                    });
                } else if (this.getData('isDying')) {
                    // If dying, ensure walk animation doesn't accidentally restart
                    if (currentAnimKey === 'zombie_walk') this.anims.stop();
                }
                // 4. Set a timer to re-enable damage dealing after cooldown
                var attackCooldown = 700; // ms - Adjust this value (animation is 5 frames @ 10fps = 500ms)
                this.scene.time.delayedCall(attackCooldown, function() {
                    // Only re-enable if the enemy still exists and is not a corpse/dying
                    if (_this.active && !_this.getData('isDying') && !_this.getData('isCorpse')) {
                        // console.log("Attack cooldown finished, re-enabling damage.");
                        _this.setData('canDealDamage', true);
                    } else {
                        // console.log("Attack cooldown finished, but enemy inactive/dead. Damage stays disabled.");
                        // Optionally ensure it's false if the enemy died mid-cooldown
                        if (!_this.active || _this.getData('isCorpse')) {
                            _this.setData('canDealDamage', false);
                        }
                    }
                });
            }
        }
    ]);
    return Enemy;
}(Phaser.Physics.Arcade.Sprite);
