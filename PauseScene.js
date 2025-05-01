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
export var PauseScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(PauseScene, _Phaser_Scene);
    function PauseScene() {
        _class_call_check(this, PauseScene);
        return _call_super(this, PauseScene, [
            {
                key: './PauseScene.js'
            }
        ]);
    }
    _create_class(PauseScene, [
        {
            key: "create",
            value: function create() {
                var _this = this;
                var _this_scale = this.scale, width = _this_scale.width, height = _this_scale.height;
                // Semi-transparent overlay
                this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
                // "Paused" text
                this.add.text(width / 2, height / 2 - 50, 'Paused', {
                    fontSize: '48px',
                    fill: '#ffffff',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setOrigin(0.5);
                // "Resume" button text
                var resumeText = this.add.text(width / 2, height / 2 + 50, 'Resume', {
                    fontSize: '32px',
                    fill: '#00ff00',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000000',
                    strokeThickness: 3
                }).setOrigin(0.5).setInteractive({
                    useHandCursor: true
                });
                // "Retry" button text
                var retryText = this.add.text(width / 2, height / 2 + 110, 'Retry', {
                    fontSize: '32px',
                    fill: '#ffff00',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000000',
                    strokeThickness: 3
                }).setOrigin(0.5).setInteractive({
                    useHandCursor: true
                });
                // "Quit to Title" button text (adjust Y position)
                var quitText = this.add.text(width / 2, height / 2 + 170, 'Quit to Title', {
                    fontSize: '32px',
                    fill: '#ff4444',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000000',
                    strokeThickness: 3
                }).setOrigin(0.5).setInteractive({
                    useHandCursor: true
                });
                // --- Hover Effects ---
                var addHoverEffect = function(textObject) {
                    var originalScale = textObject.scale; // Store original scale if needed, assuming 1
                    textObject.on('pointerover', function() {
                        _this.tweens.add({
                            targets: textObject,
                            scale: originalScale * 1.1,
                            duration: 100,
                            ease: 'Power1'
                        });
                    // Optional: Change color on hover
                    // textObject.setFill('#ffff00'); // Example: Yellow on hover
                    });
                    textObject.on('pointerout', function() {
                        _this.tweens.add({
                            targets: textObject,
                            scale: originalScale,
                            duration: 100,
                            ease: 'Power1'
                        });
                    // Optional: Revert color
                    // textObject.setFill(textObject === resumeText ? '#00ff00' : '#ff4444'); // Revert to original color
                    });
                };
                addHoverEffect(resumeText);
                addHoverEffect(retryText); // Add hover effect for retry button
                addHoverEffect(quitText);
                // --- End Hover Effects ---
                // Resume action
                resumeText.on('pointerdown', function() {
                    _this.resumeGame();
                });
                // Retry action
                retryText.on('pointerdown', function() {
                    _this.retryGame();
                });
                // Quit action
                quitText.on('pointerdown', function() {
                    _this.quitToTitle();
                });
                // Add listener for Escape key to resume as well
                this.input.keyboard.on('keydown-ESC', this.resumeGame, this);
                // Prevent GameScene keys from triggering while paused
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
                // Prevent mouse clicks from passing through to GameScene
                this.input.setTopOnly(true);
            }
        },
        {
            key: "resumeGame",
            value: function resumeGame() {
                // Resume the GameScene
                this.scene.resume('./GameScene.js');
                // Stop this PauseScene
                this.scene.stop();
            }
        },
        {
            key: "quitToTitle",
            value: function quitToTitle() {
                // Refresh the entire page to go back to the initial state (Title Screen)
                window.location.reload();
            }
        },
        {
            key: "retryGame",
            value: function retryGame() {
                console.log("Retry button clicked from Pause. Stopping music, PauseScene, and restarting GameScene...");
                // --- Stop Background Music Globally ---
                this.sound.stopAll(); // Stop sounds specific to this scene first
                this.sys.game.sound.stopByKey('bg_music'); // Access global manager and stop by key
                // --- Stop Scenes ---
                this.scene.stop(); // Stop this PauseScene
                this.scene.stop('./GameScene.js'); // Ensure the old GameScene instance is fully stopped
                // --- Start New GameScene ---
                this.scene.start('./GameScene.js'); // GameScene's create will restart the music
            }
        },
        {
            // Clean up listeners on shutdown
            key: "shutdown",
            value: function shutdown() {
                this.input.keyboard.off('keydown-ESC', this.resumeGame, this);
                // Remove tweens targeting the text objects to prevent errors if scene is shut down mid-tween
                this.tweens.killAll();
            // Pointer listeners are removed automatically when the scene shuts down.
            }
        }
    ]);
    return PauseScene;
}(Phaser.Scene);
