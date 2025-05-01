import Phaser from 'https://esm.sh/phaser@3.60.0';
import { NetworkManager } from './NetworkManager.js';

export class JoinGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'JoinGameScene' });
        this.roomCode = '';
        this.inputField = null;
        this.networkManager = null;
    }

    create() {
        const { width, height } = this.scale;
        
        // Add background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(0.8);

        // Add title
        this.add.text(width / 2, height * 0.2, 'Join Game', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: '"Arial Black", Gadget, sans-serif'
        }).setOrigin(0.5);

        // Add instruction text
        this.add.text(width / 2, height * 0.35, 'Enter Room Code:', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Create input field background
        const inputBg = this.add.rectangle(width / 2, height * 0.45, 400, 80, 0x333333)
            .setOrigin(0.5)
            .setInteractive();

        // Create input field text
        this.inputField = this.add.text(width / 2, height * 0.45, '', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        // Make the input field interactive
        inputBg.on('pointerdown', () => {
            // Remove the showKeyboard call since we're using regular keyboard input
        });

        // Add join button
        const joinButton = this.add.text(width / 2, height * 0.6, 'Join Game', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.roomCode.length === 6) {
                this.joinGame();
            } else {
                this.showError('Please enter a valid room code');
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
            if (this.networkManager) {
                this.networkManager.disconnect();
            }
            this.scene.start('TitleScene');
        });

        // Add keyboard input handling
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
    }

    async joinGame() {
        this.networkManager = new NetworkManager();
        try {
            // Get the player's name from the registry
            const playerName = this.registry.get('playerName') || 'Unknown Player';
            
            await this.networkManager.initialize(false, this.roomCode, playerName);
            
            // Set up connection handler
            this.networkManager.setOnConnection(() => {
                console.log('Connected to host');
            });

            // Set up data handler
            this.networkManager.setOnData((data) => {
                console.log('Received data:', data);
                if (data.type === 'startGame') {
                    this.scene.start('GameScene', { isMultiplayer: true, isHost: false });
                }
            });
        } catch (error) {
            console.error('Failed to join game:', error);
            this.showError('Failed to join game. Please check the room code and try again.');
            if (this.networkManager) {
                this.networkManager.disconnect();
            }
        }
    }

    handleKeyDown(event) {
        const key = event.key.toUpperCase();
        if (key === 'BACKSPACE' || key === 'DELETE') {
            this.roomCode = this.roomCode.slice(0, -1);
            this.updateInputField();
        } else if (key.match(/[A-Z0-9]/) && this.roomCode.length < 6) {
            this.roomCode += key;
            this.updateInputField();
        }
    }

    updateInputField() {
        this.inputField.setText(this.roomCode);
    }

    showError(message) {
        if (this.errorText) {
            this.errorText.destroy();
        }
        
        this.errorText = this.add.text(this.scale.width / 2, this.scale.height * 0.5 + 50, message, {
            fontSize: '24px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Remove error message after 2 seconds
        this.time.delayedCall(2000, () => {
            if (this.errorText) {
                this.errorText.destroy();
                this.errorText = null;
            }
        });
    }

    shutdown() {
        // Clean up keyboard input
        this.input.keyboard.off('keydown', this.handleKeyDown, this);
        if (this.networkManager) {
            this.networkManager.disconnect();
        }
    }
} 