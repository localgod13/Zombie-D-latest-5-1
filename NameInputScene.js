export class NameInputScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NameInputScene' });
    }

    create() {
        const { width, height } = this.scale;
        
        // Add background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(0.8);

        // Add title
        this.add.text(width / 2, height * 0.2, 'Enter Your Name', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: '"Arial Black", Gadget, sans-serif'
        }).setOrigin(0.5);

        // Create input field background
        const inputBg = this.add.rectangle(width / 2, height * 0.4, 400, 80, 0x333333)
            .setOrigin(0.5)
            .setInteractive();

        // Create input field text
        this.inputField = this.add.text(width / 2, height * 0.4, '', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        // Make the input field interactive
        inputBg.on('pointerdown', () => {
            // Remove the showKeyboard call since keyboard input is already handled
            // by the handleKeyDown method
        });

        // Add continue button
        const continueButton = this.add.text(width / 2, height * 0.6, 'Continue', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.playerName && this.playerName.length > 0) {
                // Store the player name in the game registry
                this.registry.set('playerName', this.playerName);
                // Go to the multiplayer menu scene
                this.scene.start('MultiplayerMenuScene');
            } else {
                this.showError('Please enter your name');
            }
        });

        // Add back button
        const backButton = this.add.text(width / 2, height * 0.8, 'Back', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#aa0000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('TitleScene');
        });

        // Add keyboard input handling
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
    }

    handleKeyDown(event) {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            if (this.playerName) {
                this.playerName = this.playerName.slice(0, -1);
                this.inputField.setText(this.playerName);
            }
        } else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {
            if (!this.playerName) {
                this.playerName = '';
            }
            if (this.playerName.length < 15) { // Limit name length to 15 characters
                this.playerName += key;
                this.inputField.setText(this.playerName);
            }
        }
    }

    showError(message) {
        if (this.errorText) {
            this.errorText.destroy();
        }
        this.errorText = this.add.text(this.scale.width / 2, this.scale.height * 0.7, message, {
            fontSize: '24px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    createMultiplayerSubmenu() {
        const { width, height } = this.scale;
        
        // Clear all existing elements
        this.children.list.forEach(child => {
            if (child) {
                child.destroy();
            }
        });
        
        // Clear any existing error text
        if (this.errorText) {
            this.errorText.destroy();
            this.errorText = null;
        }
        
        // Clear the input field reference
        this.inputField = null;
        
        // Add background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(0.8);

        // Add title
        this.add.text(width / 2, height * 0.2, 'Multiplayer', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: '"Arial Black", Gadget, sans-serif'
        }).setOrigin(0.5);

        // Create submenu items
        const submenuOptions = [
            { text: 'Host Game', scene: 'LobbyScene' },
            { text: 'Join Game', scene: 'JoinGameScene' }
        ];

        // Create submenu items
        submenuOptions.forEach((option, index) => {
            const y = height * 0.4 + (index * 100);
            const text = this.add.text(width / 2, y, option.text, {
                fontSize: '48px',
                fill: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);

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
                    this.scene.start(option.scene);
                }
            });
        });

        // Add back button
        const backButton = this.add.text(width / 2, height * 0.8, 'Back', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#aa0000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('TitleScene');
        });
    }
} 