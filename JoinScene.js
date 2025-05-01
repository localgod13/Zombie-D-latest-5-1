import Phaser from 'https://esm.sh/phaser@3.60.0';
import { NetworkManager } from './NetworkManager.js';

export class JoinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'JoinScene' });
        this.networkManager = null;
        this.roomCodeInput = null;
        this.errorText = null;
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

        // Add room code input label
        this.add.text(width / 2, height * 0.4, 'Enter Room Code:', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Create room code input
        this.roomCodeInput = this.add.text(width / 2, height * 0.5, '', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Add join button
        const joinButton = this.add.rectangle(width / 2, height * 0.7, 200, 60, 0x00aa00)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Join button clicked');
                this.joinGame();
            })
            .on('pointerover', () => {
                joinButton.setFillStyle(0x00ff00);
            })
            .on('pointerout', () => {
                joinButton.setFillStyle(0x00aa00);
            });

        this.add.text(width / 2, height * 0.7, 'Join Game', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add back button
        const backButton = this.add.rectangle(width / 2, height * 0.9, 150, 50, 0xaa0000)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Back button clicked');
                if (this.networkManager) {
                    this.networkManager.disconnect();
                }
                this.scene.start('TitleScene');
            })
            .on('pointerover', () => {
                backButton.setFillStyle(0xff0000);
            })
            .on('pointerout', () => {
                backButton.setFillStyle(0xaa0000);
            });

        this.add.text(width / 2, height * 0.9, 'Back', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Set up keyboard input
        this.input.keyboard.on('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (key.length === 1 && /[A-Z0-9]/.test(key)) {
                if (this.roomCodeInput.text.length < 6) {
                    this.roomCodeInput.setText(this.roomCodeInput.text + key);
                }
            } else if (key === 'BACKSPACE' || key === 'DELETE') {
                const currentText = this.roomCodeInput.text;
                if (currentText.length > 0) {
                    this.roomCodeInput.setText(currentText.slice(0, -1));
                }
            }
        });
    }

    async joinGame() {
        console.log('Attempting to join game with code:', this.roomCodeInput.text);
        const roomCode = this.roomCodeInput.text.toUpperCase();
        if (roomCode.length !== 6) {
            console.log('Invalid room code length:', roomCode.length);
            this.showError('Please enter a valid 6-character room code');
            return;
        }

        this.networkManager = new NetworkManager();
        try {
            console.log('Initializing network manager...');
            await this.networkManager.initialize(false, roomCode);
            
            // Set up data handler
            this.networkManager.setOnData((data) => {
                console.log('Received data from host:', data);
                if (data.type === 'startGame') {
                    this.scene.start('GameScene', { isMultiplayer: true, isHost: false });
                }
            });

            // Show success message
            this.showError('Successfully joined game!', '#00ff00');
        } catch (error) {
            console.error('Failed to join game:', error);
            this.showError('Failed to join game. Please check the room code and try again.');
        }
    }

    showError(message, color = '#ff0000') {
        if (this.errorText) {
            this.errorText.destroy();
        }
        
        this.errorText = this.add.text(this.scale.width / 2, this.scale.height * 0.8, message, {
            fontSize: '24px',
            fill: color,
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
        if (this.networkManager) {
            this.networkManager.disconnect();
        }
    }
} 