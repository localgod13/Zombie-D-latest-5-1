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
import Phaser from 'https://esm.sh/phaser@3.60.0';
export var UIManager = /*#__PURE__*/ function() {
    "use strict";
    function UIManager(scene) {
        _class_call_check(this, UIManager);
        this.scene = scene;
        // Removed: this.uiText = null;
        this.healthIcon = null;
        this.healthText = null;
        this.ammoIcon = null;
        this.ammoText = null;
        this.weaponIcon = null; // Add weapon icon property
        this.roundText = null; // Add round text property
        this.create();
    }
    _create_class(UIManager, [
        {
            key: "create",
            value: function create() {
                // Removed: UI Text display creation
                // const { width } = this.scene.sys.game.config;
                // this.uiText = this.scene.add.text(10, 10, '', { fontSize: '16px', fill: '#ffffff', align: 'left' });
                // this.uiText.setDepth(100);
                // --- Create Health UI ---
                var iconScale = 0.5; // Increased icon scale
                var padding = 10;
                var textStyle = {
                    fontSize: '30px',
                    fill: '#ffffff',
                    fontStyle: 'bold'
                }; // Increased font size
                // --- Create Health UI (Top-Left) ---
                this.healthIcon = this.scene.add.image(padding, padding, 'health_ui').setOrigin(0, 0) // Top-left origin
                .setScale(iconScale).setDepth(100);
                this.healthText = this.scene.add.text(this.healthIcon.x + this.healthIcon.displayWidth + padding / 2, this.healthIcon.y + this.healthIcon.displayHeight / 2, '', textStyle).setOrigin(0, 0.5).setDepth(100);
                // --- Create Ammo UI (Below Health, Top-Left) ---
                var ammoOffsetY = this.healthIcon.displayHeight + padding / 2; // Position below health icon
                this.ammoIcon = this.scene.add.image(padding, padding + ammoOffsetY, 'ammo_ui').setOrigin(0, 0) // Top-left origin
                .setScale(iconScale).setDepth(100);
                this.ammoText = this.scene.add.text(this.ammoIcon.x + this.ammoIcon.displayWidth + padding / 2, this.ammoIcon.y + this.ammoIcon.displayHeight / 2, '', textStyle).setOrigin(0, 0.5).setDepth(100);
                // --- Create Weapon Indicator UI (Top-Right) ---
                // Position below ammo icon
                var weaponOffsetY = (this.ammoIcon ? this.ammoIcon.y + this.ammoIcon.displayHeight : padding + ammoOffsetY) + padding / 2;
                this.weaponIcon = this.scene.add.image(padding, weaponOffsetY, 'pistol_icon') // Use preloaded pistol icon key
                .setOrigin(0, 0) // Top-left origin
                .setScale(0.125) // Adjust scale as needed
                .setDepth(100);
                // Add round indicator (top-right)
                this.roundText = this.scene.add.text(
                    this.scene.sys.game.config.width - padding,
                    padding,
                    `Round ${this.scene.roundNumber}`,
                    {
                        fontSize: '36px',
                        fill: '#ffffff',
                        fontStyle: 'bold',
                        stroke: '#000000',
                        strokeThickness: 4
                    }
                ).setOrigin(1, 0).setDepth(100);
                this.update(); // Initial update for all UI elements
            }
        },
        {
            key: "update",
            value: function update() {
                if (!this.scene || !this.scene.player || this.scene.isGameOver) return; // Check necessary scene/player refs
                // Removed: Update general UI text call
                // if (this.uiText) this.updateGeneralText();
                // Update Health and Ammo text if they exist
                if (this.healthText) this.updateHealthText();
                if (this.ammoText) this.updateAmmoText();
                // Update Weapon Icon if it exists
                if (this.weaponIcon) this.updateWeaponIcon();
                if (this.roundText) this.updateRoundText();
            }
        },
        {
            // Removed: updateGeneralText() method
            key: "updateHealthText",
            value: function updateHealthText() {
                if (!this.healthText || !this.scene.player) return;
                this.healthText.setText("".concat(this.scene.player.health));
            }
        },
        {
            key: "updateAmmoText",
            value: function updateAmmoText() {
                if (!this.ammoText || !this.scene.player) return;
                this.ammoText.setText("".concat(this.scene.player.currentAmmo, "/").concat(this.scene.player.maxAmmo));
            }
        },
        {
            key: "updateWeaponIcon",
            value: function updateWeaponIcon() {
                if (!this.weaponIcon || !this.scene.player) return;
                var weaponKey = this.scene.player.currentWeapon;
                var iconKey;
                switch(weaponKey){
                    case 'handgun':
                        iconKey = 'pistol_icon';
                        break;
                    case 'shotgun':
                        iconKey = 'shotgun_icon';
                        break;
                    case 'auto_rifle':
                        iconKey = 'rifle_icon';
                        break;
                    case 'rocket_launcher':
                        iconKey = 'rocket_launcher_icon';
                        break;
                    default:
                        iconKey = 'pistol_icon';
                }
                this.weaponIcon.setTexture(iconKey);
            }
        },
        {
            key: "updateRoundText",
            value: function updateRoundText() {
                if (!this.roundText || !this.scene) return;
                this.roundText.setText(`Round ${this.scene.roundNumber}`);
            }
        },
        {
            // Method to handle resizing, repositioning UI elements
            key: "handleResize",
            value: function handleResize(gameSize) {
                var width = gameSize.width, height = gameSize.height;
                var padding = 10;
                // Removed: Reposition general text
                // if (this.uiText) {
                // this.uiText.setPosition(padding, padding);
                // }
                // Update round text position
                if (this.roundText) {
                    this.roundText.setPosition(width - padding, padding);
                }
                // Reposition Health UI (top-left)
                if (this.healthIcon) {
                    this.healthIcon.setPosition(padding, padding); // Move to top-left
                }
                if (this.healthText && this.healthIcon) {
                    this.healthText.setPosition(this.healthIcon.x + this.healthIcon.displayWidth + padding / 2, this.healthIcon.y + this.healthIcon.displayHeight / 2 // Align vertically center
                    );
                }
                // Reposition Ammo UI (below health, top-left)
                // Re-calculate offset with potentially new icon size for accurate positioning during resize
                var ammoOffsetY = this.healthIcon ? this.healthIcon.displayHeight + padding : padding; // Use full padding for better spacing
                if (this.ammoIcon) {
                    this.ammoIcon.setPosition(padding, padding + ammoOffsetY); // Move below health
                }
                if (this.ammoText && this.ammoIcon) {
                    this.ammoText.setPosition(this.ammoIcon.x + this.ammoIcon.displayWidth + padding / 2, this.ammoIcon.y + this.ammoIcon.displayHeight / 2 // Align vertically center
                    );
                }
                // Reposition Weapon UI (below ammo, top-left)
                var weaponOffsetY = (this.ammoIcon ? this.ammoIcon.y + this.ammoIcon.displayHeight : padding + ammoOffsetY) + padding / 2;
                if (this.weaponIcon) {
                    this.weaponIcon.setPosition(padding, weaponOffsetY); // Align left, below ammo
                }
            }
        },
        {
            // Method to clean up UI elements
            key: "destroy",
            value: function destroy() {
                // Removed: Destroy general text
                // if (this.uiText) {
                // this.uiText.destroy();
                // this.uiText = null;
                // }
                if (this.healthIcon) {
                    this.healthIcon.destroy();
                    this.healthIcon = null;
                }
                if (this.healthText) {
                    this.healthText.destroy();
                    this.healthText = null;
                }
                if (this.ammoIcon) {
                    this.ammoIcon.destroy();
                    this.ammoIcon = null;
                }
                if (this.ammoText) {
                    this.ammoText.destroy();
                    this.ammoText = null;
                }
                if (this.weaponIcon) {
                    this.weaponIcon.destroy();
                    this.weaponIcon = null;
                }
                if (this.roundText) {
                    this.roundText.destroy();
                    this.roundText = null;
                }
                console.log("UIManager destroyed.");
            }
        }
    ]);
    return UIManager;
}();
