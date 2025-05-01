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
import { Enemy } from './Enemy.js'; // Import the base Enemy class
var GRID_SIZE = 32; // TODO: Import from constants or pass dynamically
export var EnemyZombie5 = /*#__PURE__*/ function(Enemy) {
    "use strict";
    _inherits(EnemyZombie5, Enemy);
    function EnemyZombie5(scene, x, y, player, roundNumber) {
        _class_call_check(this, EnemyZombie5);
        var _this;
        // Call the parent constructor with the specific texture key for walking
        _this = _call_super(this, EnemyZombie5, [
            scene,
            x,
            y,
            'enemy_zombie5_walk',
            player,
            roundNumber
        ]);
        // --- Set Zombie 5 Specific Properties ---
        // Adjust display size and physics body for the 96x96 frame size
        var enemyScale = GRID_SIZE * 6 / 96; // Scale based on desired size (6x grid size)
        _this.setDisplaySize(96 * enemyScale, 96 * enemyScale);
        // Use default Enemy health or set a different one
        _this.setData('health', 2 + Math.floor(roundNumber / 3)); // Slightly weaker base health, scales slower
        // Use default Enemy speed or set a different one
        // Example: Make it slightly faster
        _this.baseSpeed = 60 + roundNumber * 6; // Slightly faster base speed and scaling
        if (_this.body) {
            // Adjust body size relative to the 96x96 frame
            var hitboxWidth = 45 * enemyScale; // Increased from 35 to 45 for wider hitbox
            // Increase height significantly
            var originalHeight = 65 * enemyScale;
            var hitboxHeight = originalHeight * 0.5; // Increased from 0.125 to 0.5 for much taller hitbox
            _this.body.setSize(hitboxWidth, hitboxHeight);
            // Recalculate offset for the 96x96 frame using the NEW height
            var frameWidth = 96;
            var frameHeight = 96;
            var baseOffsetX = (frameWidth * enemyScale - hitboxWidth) / 2; // Centered X offset calculation remains similar
            // Recalculate Y offset based on the new, larger height to keep it centered vertically
            var offsetY = (frameHeight * enemyScale - hitboxHeight) / 2;
            // --- Manual Adjustment ---
            // Subtract a value to shift the hitbox left relative to the calculated center
            var manualAdjustX = 20 * enemyScale; // Further increased shift left
            var finalOffsetX = baseOffsetX - manualAdjustX;
            // Apply the final adjusted offset, shifting Y slightly down
            offsetY -= 5 * enemyScale; // Changed from -10 to -5 to move it down a bit
            _this.body.setOffset(finalOffsetX, offsetY);
            // Store the final calculated/adjusted values
            _this.setData('originalOffsetX', finalOffsetX); // Store the final X offset
            _this.setData('offsetY', offsetY); // Store the calculated Y offset
            _this.setData('enemyScale', enemyScale);
        }
        // --- Set Animation Keys ---
        // Ensure these keys match the ones defined in GameScene's create method later
        _this.walkAnimKey = 'zombie5_walk';
        _this.attackAnimKey = 'zombie5_attack';
        _this.hurtAnimKey = 'zombie5_hurt';
        _this.deadAnimKey = 'zombie5_dead';
        // Start the correct walk animation
        _this.anims.play(_this.walkAnimKey, true);
        return _this;
    }
    _create_class(EnemyZombie5, [
        {
            // Override update if specific behavior is needed, otherwise uses base Enemy update
            key: "update",
            value: function update(time, delta) {
                // Apply custom speed if defined
                if (this.active && this.body && !this.getData('isDying') && !this.getData('isCorpse')) {
                    var angle = Phaser.Math.Angle.Between(this.x, this.y, this.playerTarget.x, this.playerTarget.y);
                    var speed = this.baseSpeed || 50 + this.roundNumber * 5; // Use baseSpeed if set
                    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
                    this.flipX = this.playerTarget.x < this.x;
                // No need to re-apply offset here unless hitbox is asymmetrical
                } else if (this.body && (this.getData('isDying') || this.getData('isCorpse'))) {
                    this.body.setVelocity(0, 0);
                }
            }
        },
        {
            // Override takeDamage to use the correct animation keys
            key: "takeDamage",
            value: function takeDamage(amount) {
                var _this = this;
                if (this.getData('isDying') || this.getData('isCorpse')) return;
                var currentHealth = this.getData('health') || 0;
                currentHealth -= amount;
                this.setData('health', currentHealth);
                console.log("Enemy5 health: ".concat(currentHealth));
                if (this.body) this.body.setVelocity(0, 0); // Stop briefly
                if (currentHealth > 0) {
                    var _this_anims_currentAnim;
                    if (this.active && this.anims && ((_this_anims_currentAnim = this.anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) !== this.hurtAnimKey && !this.getData('isDying')) {
                        this.anims.play(this.hurtAnimKey, true).once('animationcomplete', function() {
                            if (_this.active && !_this.getData('isDying')) {
                                _this.anims.play(_this.walkAnimKey, true);
                            }
                        });
                    }
                } else {
                    if (!this.getData('isDying')) {
                        this.setData('isDying', true);
                        if (this.body) this.body.enable = false;
                        var onDeathAnimationComplete = function() {
                            if (_this.active) {
                                _this.anims.stop();
                                // Use the correct spritesheet texture key and last frame index for Zombie 5 dead
                                var lastFrameIndex = 4; // Zombie 5 dead has 5 frames (0-4)
                                var deadTextureKey = 'enemy_zombie5_dead'; // Correct spritesheet key from preload
                                _this.setTexture(deadTextureKey, lastFrameIndex);
                                _this.setData('isCorpse', true);
                                _this.setActive(false);
                                _this.setDepth(-1);
                                if (_this.body) _this.body.enable = false;
                                console.log("Enemy5 died and became a corpse.");
                                // --- Add Blood Pool ---
                                // Use the preloaded 'red-ink-stains' image
                                var bloodPool = _this.scene.add.image(_this.x, _this.y, 'red-ink-stains');
                                bloodPool.setDepth(_this.depth - 1); // Place it just below the corpse
                                bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05)); // Randomize size significantly smaller (original 2000x2000)
                                bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9)); // Randomize transparency
                                bloodPool.setAngle(Phaser.Math.Between(0, 359)); // Random rotation
                                // Optional: Tint slightly darker red
                                bloodPool.setTint(0xAA0000);
                                // Add to a group later if needed for management (e.g., this.scene.bloodPools.add(bloodPool))
                                // --- End Blood Pool ---
                                // Emit event or add score
                                _this.scene.events.emit('enemyDied', _this); // Example event
                            }
                        };
                        // Listen for the specific animation complete event
                        this.once("animationcomplete-".concat(this.deadAnimKey), onDeathAnimationComplete);
                        if (this.anims) {
                            this.anims.play(this.deadAnimKey, true);
                        }
                        if (this.body) this.body.setVelocity(0, 0);
                    }
                }
            }
        },
        {
            // Override attack to use the correct animation keys
            key: "attack",
            value: function attack(target) {
                var _this = this;
                var _this_anims_currentAnim, _this_anims;
                if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
                    return;
                }
                console.log("Enemy5 attacking ".concat(_instanceof(target, Phaser.GameObjects.Sprite) ? target.texture.key : 'block'));
                this.setData('canDealDamage', false);
                if (this.body) this.body.setVelocity(0, 0);
                var currentAnimKey = (_this_anims = this.anims) === null || _this_anims === void 0 ? void 0 : (_this_anims_currentAnim = _this_anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key;
                if (this.anims && currentAnimKey !== this.attackAnimKey && !this.getData('isDying')) {
                    this.anims.play(this.attackAnimKey, true).once('animationcomplete', function() {
                        if (_this.active && !_this.getData('isDying')) {
                            _this.anims.play(_this.walkAnimKey, true);
                        }
                    });
                } else if (this.getData('isDying')) {
                    if (currentAnimKey === this.walkAnimKey) this.anims.stop();
                }
                var attackCooldown = 600; // Slightly faster attack cooldown? Adjust as needed
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
        }
    ]);
    return EnemyZombie5;
}(Enemy);
