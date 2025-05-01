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
import { NameInputScene } from './NameInputScene.js';
export var TitleScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(TitleScene, _Phaser_Scene);
    function TitleScene() {
        _class_call_check(this, TitleScene);
        var _this;
        _this = _call_super(this, TitleScene, [
            {
                key: './TitleScene.js'
            }
        ]);
        _this.backgroundImage = null;
        _this.titleText = null;
        _this.startText = null;
        _this.backgroundMusic = null; // Add property for music instance
        _this.inkStain = null; // Property for the ink stain image
        return _this;
    }
    _create_class(TitleScene, [
        {
            key: "preload",
            value: function preload() {
                // Load title screen background
                this.load.image('titleBackground', 'assets/images/title_screen.png');
                
                // Load title music
                this.load.audio('titleMusic', 'assets/audio/title_music.mp3');
                
                // Load start sound
                this.load.audio('startSound', 'assets/audio/start_sound.mp3');
                
                // Load ink stain effect
                this.load.image('inkStain', 'assets/images/red_ink_stains.png');
            }
        },
        {
            key: "create",
            value: function create() {
                var _this = this;
                var _this_scale = this.scale, width = _this_scale.width, height = _this_scale.height;
                // Add background image
                this.backgroundImage = this.add.image(width / 2, height / 2, 'titleBackground');
                this.handleResize({
                    width: width,
                    height: height
                }); // Initial scale adjustment

                // Add title text
                this.titleText = this.add.text(width / 2, height * 0.15, 'Zombie Defense', {
                    fontSize: '64px',
                    fill: '#ff0000',
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    stroke: '#000000',
                    strokeThickness: 5
                }).setOrigin(0.5);

                // Create menu container
                this.menuContainer = this.add.container(width / 2, height * 0.4);
                
                // Menu options
                const menuOptions = [
                    { text: 'Single Player', scene: './GameScene.js' },
                    { text: 'Multiplayer', scene: null, disabled: true, tooltip: 'Coming Soon!' },
                    { text: 'Options', scene: null }
                ];

                // Create menu items
                this.menuItems = menuOptions.map((option, index) => {
                    const y = index * 80; // Space between menu items
                    const text = this.add.text(0, y, option.text, {
                        fontSize: '48px',
                        fill: option.disabled ? '#666666' : '#ffffff',
                        fontFamily: 'Arial, sans-serif',
                        stroke: '#000000',
                        strokeThickness: 3
                    }).setOrigin(0.5);

                    // Make text interactive if not disabled
                    if (!option.disabled) {
                        text.setInteractive();
                        
                        // Hover effects
                        text.on('pointerover', () => {
                            text.setScale(1.1);
                            text.setFill('#ff0000');
                        });
                        
                        text.on('pointerout', () => {
                            text.setScale(1);
                            text.setFill('#ffffff');
                        });

                        // Click handler
                        text.on('pointerdown', () => {
                            if (option.scene) {
                                // Play the start sound
                                this.sound.play('startSound', { volume: 0.6 });
                                
                                // Disable input during transition
                                this.input.enabled = false;

                                // Show ink stain effect
                                this.inkStain = this.add.image(width / 2, height / 2, 'inkStain');
                                const inkScale = height / this.inkStain.height * 0.8;
                                this.inkStain.setScale(inkScale);
                                this.inkStain.setAlpha(0);
                                this.inkStain.setDepth(100);

                                // Animate transition
                                this.tweens.add({
                                    targets: this.inkStain,
                                    alpha: 1,
                                    scale: inkScale * 1.1,
                                    duration: 300,
                                    ease: 'Power2',
                                    onComplete: () => {
                                        // Fade out music
                                        this.tweens.add({
                                            targets: this.backgroundMusic,
                                            volume: 0,
                                            duration: 500,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                if (this.backgroundMusic) {
                                                    this.backgroundMusic.stop();
                                                }
                                                // Start the selected scene
                                                this.scene.start(option.scene);
                                            }
                                        });
                                    }
                                });
                            } else if (option.submenu) {
                                // Check if player name exists in registry
                                const playerName = this.registry.get('playerName');
                                if (!playerName) {
                                    // If no name exists, go to name input scene
                                    this.scene.start('NameInputScene');
                                } else {
                                    // If name exists, show submenu
                                    this.menuItems.forEach(item => item.setVisible(false));
                                    
                                    // Create submenu items
                                    this.submenuItems = option.submenu.map((submenuOption, subIndex) => {
                                        const subY = subIndex * 80;
                                        const subText = this.add.text(0, subY, submenuOption.text, {
                                            fontSize: '48px',
                                            fill: '#ffffff',
                                            fontFamily: 'Arial, sans-serif',
                                            stroke: '#000000',
                                            strokeThickness: 3
                                        }).setOrigin(0.5);

                                        subText.setInteractive();

                                        // Hover effects for submenu
                                        subText.on('pointerover', () => {
                                            subText.setScale(1.1);
                                            subText.setFill('#ff0000');
                                        });
                                        
                                        subText.on('pointerout', () => {
                                            subText.setScale(1);
                                            subText.setFill('#ffffff');
                                        });

                                        // Click handler for submenu items
                                        subText.on('pointerdown', () => {
                                            if (submenuOption.scene) {
                                                // Play the start sound
                                                this.sound.play('startSound', { volume: 0.6 });
                                                
                                                // Disable input during transition
                                                this.input.enabled = false;

                                                // Show ink stain effect
                                                this.inkStain = this.add.image(width / 2, height / 2, 'inkStain');
                                                const inkScale = height / this.inkStain.height * 0.8;
                                                this.inkStain.setScale(inkScale);
                                                this.inkStain.setAlpha(0);
                                                this.inkStain.setDepth(100);

                                                // Animate transition
                                                this.tweens.add({
                                                    targets: this.inkStain,
                                                    alpha: 1,
                                                    scale: inkScale * 1.1,
                                                    duration: 300,
                                                    ease: 'Power2',
                                                    onComplete: () => {
                                                        // Fade out music
                                                        this.tweens.add({
                                                            targets: this.backgroundMusic,
                                                            volume: 0,
                                                            duration: 500,
                                                            ease: 'Linear',
                                                            onComplete: () => {
                                                                if (this.backgroundMusic) {
                                                                    this.backgroundMusic.stop();
                                                                }
                                                                // Start the selected scene
                                                                this.scene.start(submenuOption.scene);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });

                                        return subText;
                                    });

                                    // Add back button
                                    const backButton = this.add.text(0, this.submenuItems.length * 80, 'Back', {
                                        fontSize: '36px',
                                        fill: '#ffffff',
                                        fontFamily: 'Arial, sans-serif',
                                        stroke: '#000000',
                                        strokeThickness: 3
                                    }).setOrigin(0.5);

                                    backButton.setInteractive();

                                    // Hover effects for back button
                                    backButton.on('pointerover', () => {
                                        backButton.setScale(1.1);
                                        backButton.setFill('#ff0000');
                                    });
                                    
                                    backButton.on('pointerout', () => {
                                        backButton.setScale(1);
                                        backButton.setFill('#ffffff');
                                    });

                                    // Back button click handler
                                    backButton.on('pointerdown', () => {
                                        // Remove submenu items
                                        this.submenuItems.forEach(item => item.destroy());
                                        backButton.destroy();
                                        // Show main menu items
                                        this.menuItems.forEach(item => item.setVisible(true));
                                    });

                                    // Add submenu items to the menu container
                                    this.menuContainer.add([...this.submenuItems, backButton]);
                                }
                            }
                        });
                    } else {
                        // For disabled items, show tooltip on hover
                        text.setInteractive();
                        text.on('pointerover', () => {
                            if (option.tooltip) {
                                const tooltip = this.add.text(0, y, option.tooltip, {
                                    fontSize: '36px',
                                    fill: '#ff0000',
                                    fontFamily: 'Arial, sans-serif',
                                    stroke: '#000000',
                                    strokeThickness: 2
                                }).setOrigin(0.5);
                                
                                // Add tooltip to the menu container
                                this.menuContainer.add(tooltip);
                                
                                // Store tooltip reference for cleanup
                                text.tooltip = tooltip;
                            }
                        });
                        
                        text.on('pointerout', () => {
                            if (text.tooltip) {
                                this.menuContainer.remove(text.tooltip);
                                text.tooltip.destroy();
                                text.tooltip = null;
                            }
                        });
                    }

                    return text;
                });

                // Add menu items to container
                this.menuContainer.add(this.menuItems);

                // Play background music only if it's not already playing
                if (!this.sound.get('titleMusic')) {
                    this.backgroundMusic = this.sound.add('titleMusic', {
                        loop: true,
                        volume: 0.3
                    });
                    this.backgroundMusic.play();
                }

                // Listen for resize events
                this.scale.on('resize', this.handleResize, this);

                // Add Change Notes button in bottom right
                const changeNotesButton = this.add.text(this.scale.width - 20, this.scale.height - 20, 'Change Notes', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    fontFamily: 'Arial',
                    backgroundColor: '#aa0000',
                    padding: { x: 15, y: 8 }
                })
                .setOrigin(1, 1)
                .setInteractive()
                .on('pointerover', () => {
                    changeNotesButton.setScale(1.1);
                    changeNotesButton.setFill('#ff0000');
                })
                .on('pointerout', () => {
                    changeNotesButton.setScale(1);
                    changeNotesButton.setFill('#ffffff');
                })
                .on('pointerdown', () => {
                    this.scene.start('ChangeNotesScene');
                });
            }
        },
        {
            key: "handleResize",
            value: function handleResize(gameSize) {
                var width = gameSize.width, height = gameSize.height;
                // Scale and center background
                if (this.backgroundImage) {
                    var scaleX = width / this.backgroundImage.width;
                    var scaleY = height / this.backgroundImage.height;
                    var scale = Math.max(scaleX, scaleY);
                    this.backgroundImage.setPosition(width / 2, height / 2).setScale(scale);
                }
                // Reposition text
                if (this.titleText) {
                    this.titleText.setPosition(width / 2, height * 0.15);
                }
                // Reposition menu container
                if (this.menuContainer) {
                    this.menuContainer.setPosition(width / 2, height * 0.4);
                }
                // Reposition ink stain if it exists
                if (this.inkStain) {
                    this.inkStain.setPosition(width / 2, height / 2);
                    var inkScale = height / this.inkStain.height * 0.8;
                    this.inkStain.setScale(inkScale);
                }
            }
        },
        {
            // Override shutdown method to clean up listeners and objects
            key: "shutdown",
            value: function shutdown() {
                this.scale.off('resize', this.handleResize, this);
                this.input.enabled = true; // Re-enable input
                // Safely stop music if it's still playing (tween might not have finished)
                if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                    this.backgroundMusic.stop();
                }
                this.backgroundMusic = null;
                // Destroy ink stain if it exists
                if (this.inkStain) {
                    this.inkStain.destroy();
                    this.inkStain = null;
                }
                // Remove tweens associated with this scene to prevent errors
                this.tweens.killAll();
                _get(_get_prototype_of(TitleScene.prototype), "shutdown", this).call(this);
            }
        }
    ]);
    return TitleScene;
}(Phaser.Scene);
