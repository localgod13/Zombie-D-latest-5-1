import Phaser from 'https://esm.sh/phaser@3.60.0';
import { Enemy } from './Enemy.js';

const GRID_SIZE = 32;

export class EnemyZombie1 extends Enemy {
    constructor(scene, x, y, player, roundNumber) {
        // Call the parent constructor with the specific texture key for zombie 1
        super(scene, x, y, 'enemy_zombie1_walk', player, roundNumber);

        // Set Zombie 1 specific properties
        this.setData('health', 3); // Base health for Zombie 1
        
        // Ensure correct initial animation
        this.anims.stop();
        this.anims.play('zombie1_walk', true);

        // Set animation keys
        this.walkAnimKey = 'zombie1_walk';
        this.attackAnimKey = 'zombie1_attack';
        this.hurtAnimKey = 'zombie1_hurt';
        this.deadAnimKey = 'zombie1_dead';
    }

    takeDamage(amount) {
        if (this.getData('isDying') || this.getData('isCorpse')) return;

        let currentHealth = this.getData('health') || 0;
        currentHealth -= amount;
        this.setData('health', currentHealth);
        console.log(`EnemyZombie1 health: ${currentHealth}`);

        if (this.body) this.body.setVelocity(0, 0);

        if (currentHealth > 0) {
            if (this.active && this.anims && this.anims.currentAnim?.key !== this.hurtAnimKey && !this.getData('isDying')) {
                this.anims.play(this.hurtAnimKey, true).once('animationcomplete', () => {
                    if (this.active && !this.getData('isDying')) {
                        this.anims.play(this.walkAnimKey, true);
                    }
                });
            }
        } else {
            if (!this.getData('isDying')) {
                this.setData('isDying', true);
                if (this.body) this.body.enable = false;

                const onDeathAnimationComplete = () => {
                    if (this.active) {
                        this.anims.stop();
                        const lastFrameIndex = 4;
                        this.setTexture('enemy_zombie1_dead', lastFrameIndex);
                        this.setData('isCorpse', true);
                        this.setActive(false);
                        this.setDepth(-1);
                        if (this.body) this.body.enable = false;
                        console.log("EnemyZombie1 died and became a corpse.");
                        
                        // --- Add Blood Pool ---
                        const bloodPool = this.scene.add.image(this.x, this.y + (this.body.height / 2), 'red-ink-stains');
                        bloodPool.setDepth(this.depth - 1);
                        bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                        bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                        bloodPool.setAngle(Phaser.Math.Between(0, 359));
                        bloodPool.setTint(0xAA0000);
                        // --- End Blood Pool ---
                    }
                };

                this.once(`animationcomplete-${this.deadAnimKey}`, onDeathAnimationComplete);
                if (this.anims) {
                    this.anims.play(this.deadAnimKey, true);
                }
                if (this.body) this.body.setVelocity(0, 0);
            }
        }
    }

    attack(target) {
        if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
            return;
        }

        console.log(`EnemyZombie1 attacking ${target instanceof Phaser.GameObjects.Sprite ? target.texture.key : 'block'}`);
        this.setData('canDealDamage', false);
        if (this.body) this.body.setVelocity(0, 0);

        if (this.anims && this.anims.currentAnim?.key !== this.attackAnimKey && !this.getData('isDying')) {
            this.anims.play(this.attackAnimKey, true).once('animationcomplete', () => {
                if (this.active && !this.getData('isDying')) {
                    this.anims.play(this.walkAnimKey, true);
                }
            });
        }

        const attackCooldown = 500;
        this.scene.time.delayedCall(attackCooldown, () => {
            if (this.active && !this.getData('isDying') && !this.getData('isCorpse')) {
                this.setData('canDealDamage', true);
            } else {
                if (!this.active || this.getData('isCorpse')) {
                    this.setData('canDealDamage', false);
                }
            }
        });
    }
} 