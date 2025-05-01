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
var GRID_SIZE = 32; // Assuming GRID_SIZE is globally constant for now
export var BlockSegment = /*#__PURE__*/ function(_Phaser_Physics_Arcade_Sprite) {
    "use strict";
    _inherits(BlockSegment, _Phaser_Physics_Arcade_Sprite);
    function BlockSegment(scene, x, y) {
        var texture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 'block_segment', health = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 3;
        _class_call_check(this, BlockSegment);
        var _this;
        _this = _call_super(this, BlockSegment, [
            scene,
            x,
            y,
            texture
        ]);
        _this.scene = scene; // Store scene reference
        _this.maxHealth = health;
        _this.health = health;
        // Add to scene and physics group (managed by the group creation)
        // scene.add.existing(this); // Scene.add is handled by group.create
        // scene.physics.add.existing(this); // Physics enabling is handled by group.create
        // --- Set Visual Size ---
        // Make barricades visually larger
        var displaySize = texture === 'wooden_barricade' ? GRID_SIZE * 1.8 : GRID_SIZE; // Increased from 1.5
        _this.setDisplaySize(displaySize, displaySize);
        // Store original tint (assuming it's white initially or set elsewhere if needed)
        // If you have specific base colors for block types, set them here.
        // For now, assume default (white)
        _this.baseTint = 0xffffff;
        _this.setData('health', _this.health); // Keep data for compatibility if needed elsewhere
        _this.setData('maxHealth', _this.maxHealth);
        // Set depth based on type: barricades slightly *in front* of regular blocks
        _this.setDepth(texture === 'wooden_barricade' ? 6 : 5); // Barricades (6) on top of regular (5)
        return _this;
    }
    _create_class(BlockSegment, [
        {
            key: "takeDamage",
            value: function takeDamage(amount) {
                if (this.health <= 0) return; // Already destroyed
                this.health -= amount;
                this.setData('health', this.health); // Update data store
                if (this.health <= 0) {
                    // Destroy block segment
                    console.log("Block segment destroyed");
                    if (this.scene.soundManager) {
                        this.scene.soundManager.playBlockDestroyed();
                    }
                    this.destroy(); // Removes from scene, physics, and group
                } else {
                    // Update tint to show damage (interpolate towards a damaged color like dark grey)
                    var healthRatio = this.health / this.maxHealth;
                    var damagedColor = 0x666666; // Dark grey for damage indication
                    var newColor = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(damagedColor), Phaser.Display.Color.ValueToColor(this.baseTint), 100, Math.floor(healthRatio * 100) // Current step based on health
                    );
                    this.setTint(Phaser.Display.Color.GetColor(newColor.r, newColor.g, newColor.b));
                }
            }
        }
    ]);
    return BlockSegment;
}(Phaser.Physics.Arcade.Sprite);
