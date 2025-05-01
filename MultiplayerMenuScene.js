export class MultiplayerMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MultiplayerMenuScene' });
    }

    create() {
        const { width, height } = this.scale;
        
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