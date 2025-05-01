import Phaser from 'https://esm.sh/phaser@3.60.0';
import { NetworkManager } from './NetworkManager.js';

export class LobbyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LobbyScene' });
        this.roomCode = null;
        this.networkManager = null;
        this.connectedPlayers = new Set();
    }

    create() {
        const { width, height } = this.scale;
        
        // Add background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(0.8);

        // Add title
        this.add.text(width / 2, height * 0.2, 'Multiplayer Lobby', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: '"Arial Black", Gadget, sans-serif'
        }).setOrigin(0.5);

        // Generate a random 6-character room code
        this.roomCode = this.generateRoomCode();
        
        // Display room code
        this.add.text(width / 2, height * 0.4, 'Room Code:', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.roomCodeText = this.add.text(width / 2, height * 0.5, this.roomCode, {
            fontSize: '64px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        // Add player count text
        this.playerCountText = this.add.text(width / 2, height * 0.6, 'Players: 1', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add start game button
        const startButton = this.add.text(width / 2, height * 0.8, 'Start Game', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.networkManager) {
                // Send start game signal to all connected players
                this.networkManager.sendData({ type: 'startGame' });
                this.scene.start('GameScene', { isMultiplayer: true, isHost: true });
            }
        });

        // Add back button
        const backButton = this.add.text(width / 2, height * 0.9, 'Back', {
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

        // Initialize network manager
        this.initializeNetwork();
    }

    async initializeNetwork() {
        this.networkManager = new NetworkManager();
        try {
            await this.networkManager.initialize(true, this.roomCode);
            
            // Set up connection handler
            this.networkManager.setOnConnection((peerId, playerName) => {
                console.log('Player connected:', peerId, 'Name:', playerName);
                this.connectedPlayers.add(peerId);
                this.updatePlayerCount();
                
                // Show join message with the player's name
                this.showMessage(`${playerName} has joined the game!`);
            });

            // Set up data handler
            this.networkManager.setOnData((data, peerId) => {
                console.log('Received data from player:', peerId, data);
                // Handle any incoming data from players
            });
        } catch (error) {
            console.error('Failed to initialize network:', error);
            this.showError('Failed to create game room. Please try again.');
        }
    }

    updatePlayerCount() {
        const totalPlayers = this.connectedPlayers.size + 1; // +1 for host
        this.playerCountText.setText(`Players: ${totalPlayers}`);
    }

    generateRoomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
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
        
        // Remove error message after 2 seconds
        this.time.delayedCall(2000, () => {
            if (this.errorText) {
                this.errorText.destroy();
                this.errorText = null;
            }
        });
    }

    showMessage(message) {
        // Create message text
        const messageText = this.add.text(this.scale.width / 2, this.scale.height * 0.7, message, {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
        
        // Remove message after 3 seconds
        this.time.delayedCall(3000, () => {
            messageText.destroy();
        });
    }

    shutdown() {
        if (this.networkManager) {
            this.networkManager.disconnect();
        }
    }
} 