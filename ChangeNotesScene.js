import Phaser from 'https://esm.sh/phaser@3.60.0';

export class ChangeNotesScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChangeNotesScene' });
    }

    create() {
        const { width, height } = this.scale;
        
        // Add semi-transparent black background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(0.8);

        // Add title
        this.add.text(width / 2, height * 0.1, 'Change Notes', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: '"Arial Black", Gadget, sans-serif',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Add change notes content
        const notes = [
            'Latest Updates:',
            '',
            '• Added barricade choices during block selection phase',
            '• Players can now select up to 2 barricades during the build phase',
            '• Added Boss Tentacles to the boss round!',
            '• Added boss rounds every 10 rounds',
            '• Boss health scales with round number (20x)',
            '• Screaming Zombie now spawns 5 random zombies when it screams',
            '• Fixed hitbox size for Zombie 5',
            '• Adjusted upgrade points to 5 per round',
            '• Added change notes feature',
            '',
            'More updates coming soon!'
        ];

        // Create text object for notes
        const notesText = this.add.text(width / 2, height * 0.25, notes, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5, 0);

        // Add back button
        const backButton = this.add.text(width / 2, height * 0.9, 'Back', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#aa0000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => {
            backButton.setScale(1.1);
            backButton.setFill('#ff0000');
        })
        .on('pointerout', () => {
            backButton.setScale(1);
            backButton.setFill('#ffffff');
        })
        .on('pointerdown', () => {
            // Simply transition back to title screen
            this.scene.start('./TitleScene.js');
        });
    }
} 