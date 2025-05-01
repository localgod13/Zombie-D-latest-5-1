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
import { GameScene } from './GameScene.js'; // Import GameScene to restart it
import { TitleScene } from './TitleScene.js'; // Import TitleScene for potential future use
export var GameOverScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(GameOverScene, _Phaser_Scene);
    function GameOverScene() {
        _class_call_check(this, GameOverScene);
        var _this;
        _this = _call_super(this, GameOverScene, [
            {
                key: './GameOverScene.js'
            }
        ]);
        // Initialize stats with default values
        _this.stats = {
            roundNumber: 0,
            totalKills: 0,
            shotsFired: 0,
            shotsLanded: 0,
            damageTaken: 0
        };
        return _this;
    }
    _create_class(GameOverScene, [
        {
            key: "init",
            value: function init(data) {
                console.log("GameOverScene received data:", data);
                // Merge received stats with defaults, prioritizing received data
                this.stats = _object_spread({}, this.stats, data);
            }
        },
        {
            key: "create",
            value: function create() {
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                // Background Overlay
                this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
                // --- Title ---
                this.add.text(width / 2, height * 0.15, 'GAME OVER', {
                    fontSize: '64px',
                    fill: '#ff0000',
                    fontStyle: 'bold',
                    align: 'center'
                }).setOrigin(0.5);
                // --- Stats Display ---
                this.displayStats(width / 2, height * 0.35); // Position stats below title
                // --- Buttons ---
                var buttonY = height * 0.8;
                var buttonSpacing = 200;
                // Retry Button
                var retryButton = this.add.text(width / 2 - buttonSpacing / 2, buttonY, 'Retry', {
                    fontSize: '32px',
                    fill: '#00ff00',
                    backgroundColor: '#333333',
                    padding: {
                        x: 10,
                        y: 5
                    }
                }).setOrigin(0.5).setInteractive({
                    useHandCursor: true
                });
                retryButton.on('pointerdown', this.retryGame, this);
                retryButton.on('pointerover', function() {
                    return retryButton.setBackgroundColor('#555555');
                });
                retryButton.on('pointerout', function() {
                    return retryButton.setBackgroundColor('#333333');
                });
                // Main Menu Button
                var menuButton = this.add.text(width / 2 + buttonSpacing / 2, buttonY, 'Main Menu', {
                    fontSize: '32px',
                    fill: '#ffffff',
                    backgroundColor: '#333333',
                    padding: {
                        x: 10,
                        y: 5
                    }
                }).setOrigin(0.5).setInteractive({
                    useHandCursor: true
                });
                menuButton.on('pointerdown', this.goToMainMenu, this);
                menuButton.on('pointerover', function() {
                    return menuButton.setBackgroundColor('#555555');
                });
                menuButton.on('pointerout', function() {
                    return menuButton.setBackgroundColor('#333333');
                });
            }
        },
        {
            key: "displayStats",
            value: function displayStats(x, y) {
                var _this = this;
                var accuracy = this.stats.shotsFired > 0 ? (this.stats.shotsLanded / this.stats.shotsFired * 100).toFixed(1) : 0;
                var statsTextStyle = {
                    fontSize: '24px',
                    fill: '#ffffff',
                    align: 'center'
                };
                var statsText = [
                    "Round Reached: ".concat(this.stats.roundNumber),
                    "Zombies Killed: ".concat(this.stats.totalKills),
                    "Shots Fired: ".concat(this.stats.shotsFired),
                    "Shots Landed: ".concat(this.stats.shotsLanded),
                    "Accuracy: ".concat(accuracy, "%"),
                    "Damage Taken: ".concat(this.stats.damageTaken)
                ];
                // Create a container or just add text lines with spacing
                var currentY = y;
                statsText.forEach(function(line) {
                    _this.add.text(x, currentY, line, statsTextStyle).setOrigin(0.5);
                    currentY += 35; // Spacing between lines
                });
            }
        },
        {
            key: "retryGame",
            value: function retryGame() {
                console.log("Retry button clicked from GameOver. Stopping music and restarting GameScene...");
                // --- Stop Background Music Globally ---
                this.sound.stopAll(); // Stop sounds specific to this scene first
                this.sys.game.sound.stopByKey('bg_music'); // Access global manager and stop by key
                // --- Stop This Scene ---
                this.scene.stop(); // Stop the current scene (GameOverScene)
                // --- Start New GameScene ---
                // Starting a new GameScene implicitly stops any existing one with the same key.
                this.scene.start('./GameScene.js'); // GameScene's create will restart the music
            }
        },
        {
            key: "goToMainMenu",
            value: function goToMainMenu() {
                console.log("Main Menu button clicked. Stopping music and returning to TitleScene...");
                // --- Stop Background Music Globally ---
                this.sound.stopAll();
                this.sys.game.sound.stopByKey('bg_music');
                // --- Stop Scenes ---
                // Stop the current scene (GameOverScene)
                this.scene.stop();
                // Stop GameScene if it's paused or running (just in case)
                if (this.scene.get('./GameScene.js')) {
                    this.scene.stop('./GameScene.js');
                }
                // --- Start Title Scene ---
                this.scene.start('./TitleScene.js'); // TitleScene likely has its own music logic
            }
        }
    ]);
    return GameOverScene;
}(Phaser.Scene);
