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
export var UpgradeScene = /*#__PURE__*/ function(_Phaser_Scene) {
    "use strict";
    _inherits(UpgradeScene, _Phaser_Scene);
    function UpgradeScene() {
        _class_call_check(this, UpgradeScene);
        var _this;
        _this = _call_super(this, UpgradeScene, [
            {
                key: './UpgradeScene.js'
            }
        ]);
        _this.gameScene = null; // Reference to the main game scene
        _this.upgradePoints = 0;
        // Store stat *levels* passed from GameScene
        _this.statLevels = {
            reloadSpeedLevel: 0,
            fireRateLevel: 0,
            attackDamageLevel: 0,
            moveSpeedLevel: 0,
            wallHealthLevel: 0 // Higher level = more block health
        };
        _this.costs = {
            reloadSpeed: 1,
            fireRate: 1,
            attackDamage: 1,
            moveSpeed: 1,
            wallHealth: 1
        };
        _this.upgradeButtons = {}; // To store button references
        _this.upgradeButtons = {}; // To store button references
        _this.bgImage = null; // Reference for background image
        _this.titleText = null; // Reference for title text
        return _this;
    }
    _create_class(UpgradeScene, [
        {
            key: "init",
            value: function init(data) {
                console.log("UpgradeScene init:", data);
                this.gameScene = this.scene.get('./GameScene.js'); // Get reference to GameScene
                // Receive data from GameScene (upgrade points, current stats)
                this.upgradePoints = data.upgradePoints || 0;
                // Receive current stat levels from GameScene
                this.statLevels = _object_spread({}, data.currentStats) || this.statLevels; // Use defaults if nothing passed
                // Recalculate initial costs based on received levels
                for(var key in this.statLevels){
                    // Example: 'reloadSpeedLevel' -> 'reloadSpeed'
                    var costKey = key.replace('Level', '');
                    this.costs[costKey] = Math.max(1, Math.pow(2, this.statLevels[key])); // Cost = 2^level (min 1)
                }
            }
        },
        {
            key: "create",
            value: function create() {
                var _this = this;
                console.log("Creating UpgradeScene");
                var _this_sys_game_config = this.sys.game.config, width = _this_sys_game_config.width, height = _this_sys_game_config.height;
                // Add the red ink stain background, slightly transparent
                this.bgImage = this.add.image(width / 2, height / 2, 'red-ink-stains');
                this.bgImage.setAlpha(0.4); // Make it subtle
                this.bgImage.setDepth(-1); // Ensure it's behind everything
                // Scale background (similar to GameScene)
                var scaleX = width / this.bgImage.width;
                var scaleY = height / this.bgImage.height;
                var scale = Math.max(scaleX, scaleY);
                this.bgImage.setScale(scale);
                // Semi-transparent dark overlay on top of the background but below UI
                this.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0).setDepth(0);
                // Title - More thematic font style
                this.titleText = this.add.text(width / 2, 70, 'UPGRADE STATION', {
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontSize: '48px',
                    fill: '#e74c3c',
                    stroke: '#000000',
                    strokeThickness: 4,
                    shadow: {
                        offsetX: 2,
                        offsetY: 2,
                        color: '#000',
                        blur: 5,
                        stroke: true,
                        fill: true
                    }
                }).setOrigin(0.5).setDepth(1);
                // Display Upgrade Points - Improved style
                this.pointsText = this.add.text(width / 2, 140, "Upgrade Points: ".concat(this.upgradePoints), {
                    fontFamily: 'Verdana, sans-serif',
                    fontSize: '28px',
                    fill: '#f1c40f',
                    stroke: '#000000',
                    strokeThickness: 3,
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: '#000',
                        blur: 3,
                        fill: true
                    }
                }).setOrigin(0.5).setDepth(1);
                // --- Placeholder Upgrade Buttons ---
                // Adjust button starting position and spacing
                var buttonYStart = 220; // Lowered to accommodate larger title/points
                var buttonSpacing = 65; // Slightly increased spacing
                // --- Upgrade Buttons ---
                this.upgradeButtons.reloadSpeed = this.createUpgradeButton(width / 2, buttonYStart, 'Reload Speed', 'reloadSpeed');
                this.upgradeButtons.fireRate = this.createUpgradeButton(width / 2, buttonYStart + buttonSpacing, 'Fire Rate', 'fireRate');
                this.upgradeButtons.attackDamage = this.createUpgradeButton(width / 2, buttonYStart + buttonSpacing * 2, 'Attack Damage', 'attackDamage');
                this.upgradeButtons.moveSpeed = this.createUpgradeButton(width / 2, buttonYStart + buttonSpacing * 3, 'Movement Speed', 'moveSpeed');
                this.upgradeButtons.wallHealth = this.createUpgradeButton(width / 2, buttonYStart + buttonSpacing * 4, 'Wall Health', 'wallHealth');
                // --- Start Next Round Button ---
                var startButtonY = height - 80; // Adjusted Y position
                var startButton = this.add.text(width / 2, startButtonY, 'Start Next Round', {
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontSize: '32px',
                    fill: '#2ecc71',
                    backgroundColor: '#2c3e50',
                    padding: {
                        x: 15,
                        y: 8
                    },
                    stroke: '#000000',
                    strokeThickness: 3,
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: '#000',
                        blur: 3,
                        fill: true
                    }
                }).setOrigin(0.5).setInteractive().setDepth(1); // Ensure it's above overlay
                startButton.on('pointerdown', function() {
                    console.log("Starting next round...");
                    // Pass the updated stat *levels* back to GameScene
                    var updatedStats = _object_spread({}, _this.statLevels);
                    // Stop this scene
                    _this.scene.stop('./UpgradeScene.js');
                    // Resume GameScene and trigger its next round logic
                    if (_this.gameScene) {
                        // Resume GameScene *before* emitting the event
                        _this.gameScene.scene.resume();
                        _this.gameScene.events.emit('upgradesComplete', updatedStats);
                    }
                });
                // Add improved hover effect for Start button
                startButton.on('pointerover', function() {
                    startButton.setStyle({
                        fill: '#58d68d'
                    }); // Lighter green
                    startButton.setScale(1.05); // Slightly enlarge
                });
                startButton.on('pointerout', function() {
                    startButton.setStyle({
                        fill: '#2ecc71'
                    }); // Back to original green
                    startButton.setScale(1.0); // Back to original size
                });
                // Display current stat levels - Improved Styling
                this.statTexts = {};
                var statLevelX = width * 0.78; // Adjust position slightly
                var statLevelStyle = {
                    fontFamily: 'Verdana, sans-serif',
                    fontSize: '20px',
                    fill: '#cccccc',
                    stroke: '#000000',
                    strokeThickness: 2
                };
                this.statTexts.reloadSpeed = this.add.text(statLevelX, buttonYStart, "Level: ".concat(this.statLevels.reloadSpeedLevel), statLevelStyle).setOrigin(0.5).setDepth(1);
                this.statTexts.fireRate = this.add.text(statLevelX, buttonYStart + buttonSpacing, "Level: ".concat(this.statLevels.fireRateLevel), statLevelStyle).setOrigin(0.5).setDepth(1);
                this.statTexts.attackDamage = this.add.text(statLevelX, buttonYStart + buttonSpacing * 2, "Level: ".concat(this.statLevels.attackDamageLevel), statLevelStyle).setOrigin(0.5).setDepth(1);
                this.statTexts.moveSpeed = this.add.text(statLevelX, buttonYStart + buttonSpacing * 3, "Level: ".concat(this.statLevels.moveSpeedLevel), statLevelStyle).setOrigin(0.5).setDepth(1);
                this.statTexts.wallHealth = this.add.text(statLevelX, buttonYStart + buttonSpacing * 4, "Level: ".concat(this.statLevels.wallHealthLevel), statLevelStyle).setOrigin(0.5).setDepth(1);
                this.updateAllButtonAffordability(); // Set initial button states
                this.events.on('resize', this.handleResize, this); // Add resize handler
                this.handleResize(this.scale.gameSize); // Initial resize call
            }
        },
        {
            key: "createUpgradeButton",
            value: function createUpgradeButton(x, y, label, costKey) {
                var _this = this;
                var cost = this.costs[costKey] || 1; // Get cost based on costKey
                var buttonText = "".concat(label, " (Cost: ").concat(cost, ")");
                var button = this.add.text(x, y, buttonText, {
                    fontFamily: 'Verdana, sans-serif',
                    fontSize: '22px',
                    // Initial fill/bg depends on affordability, set below
                    padding: {
                        x: 12,
                        y: 8
                    },
                    stroke: '#000000',
                    strokeThickness: 2
                }).setOrigin(0.5).setInteractive() // Interactivity controlled by affordability logic
                .setDepth(1);
                // Set initial state based on affordability
                if (this.upgradePoints < cost) {
                    button.disableInteractive();
                    button.setStyle({
                        fill: '#888888',
                        backgroundColor: '#444444' // Darker grey background
                    });
                } else {
                    // Style for affordable button
                    button.setStyle({
                        fill: '#ffffff',
                        backgroundColor: '#555599' // Purplish background
                    });
                }
                button.setData('costKey', costKey); // Store the key used for costs object
                // Store the corresponding level key (e.g., 'reloadSpeed' -> 'reloadSpeedLevel')
                var levelKey = "".concat(costKey, "Level"); // Simplify level key generation
                button.setData('levelKey', levelKey);
                button.on('pointerdown', function() {
                    // The button won't receive 'pointerdown' if disableInteractive() was called
                    _this.attemptUpgrade(costKey, levelKey, button);
                });
                button.on('pointerover', function() {
                    // Check affordability *again* on hover, in case points changed
                    var currentCost = _this.costs[button.getData('costKey')];
                    if (_this.upgradePoints >= currentCost) {
                        button.setStyle({
                            fill: '#ffffff',
                            backgroundColor: '#7777bb' // Brighter purple background
                        });
                        button.setScale(1.05); // Slightly enlarge
                    } else {
                        // Hover effect for disabled button (optional, subtle brightness change)
                        button.setStyle({
                            fill: '#999999',
                            backgroundColor: '#555555' // Slightly lighter grey background
                        });
                    }
                });
                button.on('pointerout', function() {
                    var currentCost = _this.costs[button.getData('costKey')];
                    if (_this.upgradePoints >= currentCost) {
                        button.setStyle({
                            fill: '#ffffff',
                            backgroundColor: '#555599' // Back to original purple
                        });
                    } else {
                        // Back to original disabled style
                        button.setStyle({
                            fill: '#888888',
                            backgroundColor: '#444444'
                        });
                    }
                    button.setScale(1.0); // Back to original size
                });
                // Store button reference if needed later to update its state/text
                // this.upgradeButtons[statKey] = button;
                return button; // Return the created button
            }
        },
        {
            key: "attemptUpgrade",
            value: function attemptUpgrade(costKey, levelKey, button) {
                var currentCost = this.costs[costKey];
                if (this.upgradePoints >= currentCost) {
                    this.upgradePoints -= currentCost;
                    this.statLevels[levelKey]++; // Increment the stat level
                    // Update cost for the next level (exponential increase)
                    this.costs[costKey] = Math.pow(2, this.statLevels[levelKey]);
                    var newCost = this.costs[costKey];
                    console.log("Upgraded ".concat(levelKey, ". New Level: ").concat(this.statLevels[levelKey], ", Points Left: ").concat(this.upgradePoints, ", Next Cost: ").concat(newCost));
                    // Update UI
                    this.pointsText.setText("Upgrade Points: ".concat(this.upgradePoints));
                    // Find the correct statText key (e.g., 'reloadSpeedLevel' -> 'reloadSpeed')
                    var statTextKey = costKey; // Assuming costKey matches statText key base
                    if (this.statTexts[statTextKey]) {
                        this.statTexts[statTextKey].setText("Level: ".concat(this.statLevels[levelKey]));
                    }
                    // Update this button's text immediately
                    button.setText("".concat(button.text.split(' (')[0], " (Cost: ").concat(newCost, ")"));
                    // Update affordability for ALL buttons
                    this.updateAllButtonAffordability();
                    // Add visual feedback for successful purchase
                    this.tweens.add({
                        targets: button,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        duration: 100,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        onStart: function() {
                            button.setStyle({
                                backgroundColor: '#2ecc71'
                            }); // Flash green briefly
                        },
                        onComplete: function() {
                        // Style is reset by updateAllButtonAffordability, no need to reset here unless update is delayed
                        }
                    });
                } else {
                    console.log("Not enough points to upgrade ".concat(costKey));
                    // Optional: Add visual feedback for failure (e.g., shake)
                    this.tweens.add({
                        targets: button,
                        x: button.x + 3,
                        duration: 50,
                        ease: 'Power1',
                        yoyo: true,
                        repeat: 3
                    });
                }
            }
        },
        {
            key: "updateAllButtonAffordability",
            value: function updateAllButtonAffordability() {
                // Iterate through the stored upgrade buttons
                for(var key in this.upgradeButtons){
                    var btn = this.upgradeButtons[key];
                    if (!btn) continue; // Skip if button doesn't exist (safety check)
                    var costKey = btn.getData('costKey');
                    var cost = this.costs[costKey];
                    var levelKey = btn.getData('levelKey'); // Get level key if needed for max level check later
                    // Update button text to show current cost
                    btn.setText("".concat(btn.text.split(' (')[0], " (Cost: ").concat(cost, ")"));
                    if (this.upgradePoints >= cost) {
                        // Set style for affordable
                        btn.setStyle({
                            fill: '#ffffff',
                            backgroundColor: '#555599'
                        });
                        btn.setInteractive();
                    } else {
                        // Set style for unaffordable
                        btn.setStyle({
                            fill: '#888888',
                            backgroundColor: '#444444'
                        });
                        btn.disableInteractive();
                    }
                    // Ensure scale is reset if needed (e.g., if player rapidly bought/sold)
                    btn.setScale(1.0);
                }
            }
        },
        {
            // --- Resize Handler ---
            key: "handleResize",
            value: function handleResize(gameSize) {
                var width = gameSize.width, height = gameSize.height;
                // Resize background image
                if (this.bgImage) {
                    this.bgImage.setPosition(width / 2, height / 2);
                    var scaleX = width / this.bgImage.width;
                    var scaleY = height / this.bgImage.height;
                    var scale = Math.max(scaleX, scaleY);
                    this.bgImage.setScale(scale);
                }
                // Resize overlay - Already covers full screen via width/height
                // Reposition elements (buttons, text) based on new width/height
                if (this.titleText) this.titleText.setPosition(width / 2, 70);
                if (this.pointsText) this.pointsText.setPosition(width / 2, 140);
                // Reposition buttons and stat levels
                var buttonYStart = 220;
                var buttonSpacing = 65;
                var statLevelX = width * 0.78;
                if (this.upgradeButtons.reloadSpeed) this.upgradeButtons.reloadSpeed.setPosition(width / 2, buttonYStart);
                if (this.statTexts.reloadSpeed) this.statTexts.reloadSpeed.setPosition(statLevelX, buttonYStart);
                if (this.upgradeButtons.fireRate) this.upgradeButtons.fireRate.setPosition(width / 2, buttonYStart + buttonSpacing);
                if (this.statTexts.fireRate) this.statTexts.fireRate.setPosition(statLevelX, buttonYStart + buttonSpacing);
                if (this.upgradeButtons.attackDamage) this.upgradeButtons.attackDamage.setPosition(width / 2, buttonYStart + buttonSpacing * 2);
                if (this.statTexts.attackDamage) this.statTexts.attackDamage.setPosition(statLevelX, buttonYStart + buttonSpacing * 2);
                if (this.upgradeButtons.moveSpeed) this.upgradeButtons.moveSpeed.setPosition(width / 2, buttonYStart + buttonSpacing * 3);
                if (this.statTexts.moveSpeed) this.statTexts.moveSpeed.setPosition(statLevelX, buttonYStart + buttonSpacing * 3);
                if (this.upgradeButtons.wallHealth) this.upgradeButtons.wallHealth.setPosition(width / 2, buttonYStart + buttonSpacing * 4);
                if (this.statTexts.wallHealth) this.statTexts.wallHealth.setPosition(statLevelX, buttonYStart + buttonSpacing * 4);
                // Find and reposition start button (assuming it's the last text object added or uniquely identifiable)
                // A more robust way would be to store a reference to it. For now, we assume it's findable.
                // Find and reposition start button - Store reference for robustness
                if (!this.startButtonRef) {
                    this.startButtonRef = this.children.list.find(function(child) {
                        return child.text === 'Start Next Round';
                    });
                }
                if (this.startButtonRef) {
                    this.startButtonRef.setPosition(width / 2, height - 80);
                }
            }
        },
        {
            // Preload required assets within the scene itself
            key: "preload",
            value: function preload() {
                // Load ink stain effect
                this.load.image('red-ink-stains', 'assets/images/red_ink_stains.png');
            }
        }
    ]);
    return UpgradeScene;
}(Phaser.Scene);
