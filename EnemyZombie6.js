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
var GRID_SIZE = 32; // Assuming same grid size, adjust if needed or import
export var EnemyZombie6 = /*#__PURE__*/ function(Enemy) {
    "use strict";
    _inherits(EnemyZombie6, Enemy);
    function EnemyZombie6(scene, x, y, player, roundNumber) {
        _class_call_check(this, EnemyZombie6);
        var _this;
        // Pass the initial texture key for walking animation
        _this = _call_super(this, EnemyZombie6, [
            scene,
            x,
            y,
            'enemy_zombie6_walk',
            player,
            roundNumber
        ]);
        // --- Customize Zombie 6 Specifics ---
        // Adjust display size and physics body for 96x96 frames
        // Increase size by 50% (4 * 1.5 = 6)
        var enemyScale = GRID_SIZE * 6 / 96; // Scale based on desired size (e.g., 6x grid size)
        _this.setDisplaySize(96 * enemyScale, 96 * enemyScale);
        if (_this.body) {
            // Adjust hitbox size (smaller relative to visual)
            // These values might need tweaking based on the actual sprite look
            var hitboxWidth = 25 * enemyScale;
            var hitboxHeight = 40 * enemyScale; // Decrease height
            _this.body.setSize(hitboxWidth, hitboxHeight);
            // Calculate offset to center the hitbox within the 96x96 frame
            var frameWidth = 96;
            var frameHeight = 96;
            var offsetX = (frameWidth * enemyScale - hitboxWidth) / 2;
            var offsetY = (frameHeight * enemyScale - hitboxHeight) / 2;
            // Fine-tune offset if needed (move hitbox relative to sprite center)
            offsetX -= 20 * enemyScale; // Keep the horizontal adjustment
            // Adjust vertical offset to keep the top edge in the same place after height change
            offsetY -= 17 * enemyScale; // Nudge hitbox upwards just a bit more
            _this.body.setOffset(offsetX, offsetY);
            // Store calculated values if needed for flipping logic later
            _this.setData('originalOffsetX', offsetX);
            _this.setData('offsetY', offsetY);
            _this.setData('enemyScale', enemyScale);
        }
        // Specific stats for Zombie 6 (adjust as desired)
        _this.setData('health', 2); // Example: Lower health than Zombie 1
        _this.setData('speed', 60 + _this.roundNumber * 6); // Example: Slightly faster
        // Ensure the correct walk animation plays initially
        _this.anims.play('zombie6_walk', true);
        return _this;
    }
    _create_class(EnemyZombie6, [
        {
            // Override update if Zombie 6 has unique movement behavior (optional)
            // update(time, delta) {
            //     super.update(time, delta); // Call base update first
            //     // Add any Zombie 6 specific logic here
            // }
            // Override takeDamage to use Zombie 6 specific animations
            key: "takeDamage",
            value: function takeDamage(amount) {
                var _this = this;
                if (this.getData('isDying') || this.getData('isCorpse')) return;
                var currentHealth = this.getData('health') || 0;
                currentHealth -= amount;
                this.setData('health', currentHealth);
                console.log("Zombie 6 health: ".concat(currentHealth));
                if (this.body) {
                    this.body.setVelocity(0, 0); // Stop briefly
                }
                if (currentHealth > 0) {
                    var _this_anims_currentAnim;
                    // Play Zombie 6 Hurt Animation
                    if (this.active && this.anims && ((_this_anims_currentAnim = this.anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key) !== 'zombie6_hurt' && !this.getData('isDying')) {
                        this.anims.play('zombie6_hurt', true).once('animationcomplete', function() {
                            if (_this.active && !_this.getData('isDying')) {
                                _this.anims.play('zombie6_walk', true); // Resume walking anim
                            }
                        });
                    }
                } else {
                    // Play Zombie 6 Death Sequence
                    if (!this.getData('isDying')) {
                        this.setData('isDying', true);
                        if (this.body) {
                            this.body.enable = false;
                        }
                        var onDeathAnimationComplete = function() {
                            if (_this.active) {
                                _this.anims.stop();
                                // Set texture to the last frame of the dead animation (index 4 for 5 frames)
                                var lastFrameIndex = 4; // Assuming 5 frames (0-4)
                                _this.setTexture('enemy_zombie6_dead', lastFrameIndex);
                                _this.setData('isCorpse', true);
                                _this.setActive(false);
                                _this.setDepth(-1);
                                if (_this.body) _this.body.enable = false;
                                console.log("Zombie 6 died and became a corpse.");
                                
                                // --- Add Blood Pool ---
                                var bloodPool = _this.scene.add.image(_this.x, _this.y + (_this.body.height / 2), 'red-ink-stains');
                                bloodPool.setDepth(_this.depth - 1);
                                bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                                bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                                bloodPool.setAngle(Phaser.Math.Between(0, 359));
                                bloodPool.setTint(0xAA0000);
                                // --- End Blood Pool ---
                            }
                        };
                        // Use the specific animation complete event key
                        this.once('animationcomplete-zombie6_dead', onDeathAnimationComplete);
                        if (this.anims) {
                            this.anims.play('zombie6_dead', true);
                        }
                        if (this.body) {
                            this.body.setVelocity(0, 0);
                        }
                    }
                }
            }
        },
        {
            // Override attack to use Zombie 6 specific animations
            key: "attack",
            value: function attack(target) {
                var _this = this;
                var _this_anims_currentAnim, _this_anims;
                if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
                    return;
                }
                console.log("Zombie 6 attacking ".concat(_instanceof(target, Phaser.GameObjects.Sprite) ? target.texture.key : 'block'));
                this.setData('canDealDamage', false);
                if (this.body) {
                    this.body.setVelocity(0, 0);
                }
                var currentAnimKey = (_this_anims = this.anims) === null || _this_anims === void 0 ? void 0 : (_this_anims_currentAnim = _this_anims.currentAnim) === null || _this_anims_currentAnim === void 0 ? void 0 : _this_anims_currentAnim.key;
                if (this.anims && currentAnimKey !== 'zombie6_attack' && !this.getData('isDying')) {
                    this.anims.play('zombie6_attack', true).once('animationcomplete', function() {
                        if (_this.active && !_this.getData('isDying')) {
                            _this.anims.play('zombie6_walk', true); // Resume walk anim after attack anim completes
                        }
                    });
                } else if (this.getData('isDying')) {
                    if (currentAnimKey === 'zombie6_walk') this.anims.stop();
                }
                // Cooldown (adjust time based on animation length)
                var attackCooldown = 600; // Example: slightly faster cooldown for 4-frame attack
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
    return EnemyZombie6;
}(Enemy);
