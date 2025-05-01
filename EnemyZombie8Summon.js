import Phaser from 'https://esm.sh/phaser@3.60.0';
import { Enemy } from './Enemy.js';

const GRID_SIZE = 32;

export class EnemyZombie8Summon extends Enemy {
    constructor(scene, x, y, player, roundNumber) {
        // Call the parent constructor with the specific texture key for summon hulk
        super(scene, x, y, 'enemy_zombie8_summon', player, roundNumber);

        // Store player reference
        this.player = player;

        // Set Summon Hulk specific properties
        this.setData('health', 1);
        this.setData('attackRange', 100); // Attack range in pixels
        this.setData('attackCooldown', 5000); // 5 seconds cooldown
        this.setData('canDealDamage', true);
        
        // Store initial position
        this.initialX = x;
        this.initialY = y;
        
        // Make the summon completely static by destroying its physics body
        if (this.body) {
            this.body.destroy();
            this.body = null;
        }

        // Set animation keys
        this.summonAnimKey = 'zombie8_summon';
        this.hurtAnimKey = 'zombie8_summon';
        this.deadAnimKey = 'zombie8_summon';

        // Set default orientation
        this.setFlipX(true);

        // Start with summon animation
        this.anims.play(this.summonAnimKey, true);
    }

    update() {
        if (this.getData('isDying') || this.getData('isCorpse')) return;

        // Keep the summon in its initial position
        this.x = this.initialX;
        this.y = this.initialY;

        // Make the summon face the player
        this.setFlipX(this.player.x > this.x);

        // Check if we can attack
        if (this.getData('canDealDamage')) {
            const distance = Phaser.Math.Distance.Between(
                this.x, this.y,
                this.player.x, this.player.y
            );

            if (distance <= this.getData('attackRange')) {
                this.attack(this.player);
            }
        }
    }

    attack(target) {
        if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
            return;
        }

        this.setData('canDealDamage', false);
        
        // Deal damage to the player
        if (target && target.takeDamage) {
            target.takeDamage(1);
        }

        // Set cooldown
        this.scene.time.delayedCall(this.getData('attackCooldown'), () => {
            if (this.active && !this.getData('isDying') && !this.getData('isCorpse')) {
                this.setData('canDealDamage', true);
            }
        });
    }

    takeDamage(amount) {
        if (this.getData('isDying') || this.getData('isCorpse')) return;
        
        const currentHealth = this.getData('health') || 0;
        const newHealth = currentHealth - amount;
        this.setData('health', newHealth);

        if (newHealth <= 0) {
            this.die();
        } else {
            // Just flash the sprite when hurt
            this.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                this.clearTint();
            });
        }
    }

    die() {
        if (!this.getData('isDying')) {
            this.setData('isDying', true);
            
            // Ensure physics body is completely destroyed
            if (this.body) {
                this.body.destroy();
                this.body = null;
            }
            
            // Create reverse death animation
            if (this.anims) {
                this.anims.stop();
                
                // Create a new animation for the reverse death sequence
                this.scene.anims.create({
                    key: 'zombie8_summon_reverse_death',
                    frames: this.scene.anims.generateFrameNumbers('enemy_zombie8_summon', {
                        start: 17,
                        end: 12
                    }),
                    frameRate: 10,
                    repeat: 0
                });

                // Play the reverse death animation
                this.anims.play('zombie8_summon_reverse_death', true);
                
                // When animation completes, stay on frame 12
                this.once('animationcomplete-zombie8_summon_reverse_death', () => {
                    this.setTexture('enemy_zombie8_summon', 12);
                    this.setData('isCorpse', true);
                    this.setActive(false);
                    this.setDepth(-1);
                    
                    // Ensure position stays fixed at initial position
                    this.x = this.initialX;
                    this.y = this.initialY;
                    
                    // Add blood pool
                    const bloodPool = this.scene.add.image(this.x, this.y + (this.height / 2), 'red-ink-stains');
                    bloodPool.setDepth(this.depth - 1);
                    bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                    bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                    bloodPool.setAngle(Phaser.Math.Between(0, 359));
                    bloodPool.setTint(0xAA0000);
                });
            }
        }
    }
} 