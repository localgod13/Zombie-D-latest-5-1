import Phaser from 'https://esm.sh/phaser@3.60.0';
import { Enemy } from './Enemy.js';
import { EnemyZombie8Summon } from './EnemyZombie8Summon.js';

const GRID_SIZE = 32;

export class EnemyZombie8 extends Enemy {
    constructor(scene, x, y, player, roundNumber) {
        // Call the parent constructor with the specific texture key for hulk zombie
        super(scene, x, y, 'enemy_zombie8_walk', player, roundNumber);

        // Set Hulk Zombie specific properties
        this.setData('health', 30); // Increased from 15 to 30
        
        // Adjust hitbox for hulk
        if (this.body) {
            const enemyScale = this.getData('enemyScale');
            const hitboxWidth = 31 * enemyScale; // Reduced from 36 to 31 (15% smaller)
            const hitboxHeight = 54 * enemyScale; // Reduced from 63 to 54 (15% smaller)
            this.body.setSize(hitboxWidth, hitboxHeight);
            
            // Center the hitbox and adjust left
            const frameWidth = 96; // Hulk sprite width
            const frameHeight = 96; // Hulk sprite height
            const offsetX = (frameWidth * enemyScale - hitboxWidth) / 2 - 15 * enemyScale; // Move 15 units left
            const offsetY = (frameHeight * enemyScale - hitboxHeight) / 2;
            this.body.setOffset(offsetX, offsetY);
        }
        
        // Ensure correct initial animation
        this.anims.stop();
        this.anims.play('zombie8_walk', true);

        // Set animation keys
        this.walkAnimKey = 'zombie8_walk';
        this.attackAnimKey = 'zombie8_attack';
        this.hurtAnimKey = 'zombie8_hurt';
        this.deadAnimKey = 'zombie8_dead';
    }

    takeDamage(amount) {
        if (this.getData('isDying') || this.getData('isCorpse')) return;

        let currentHealth = this.getData('health') || 0;
        currentHealth -= amount;
        this.setData('health', currentHealth);
        console.log(`EnemyZombie8 health: ${currentHealth}`);

        if (this.body) this.body.setVelocity(0, 0);

        if (currentHealth > 0) {
            // Play hurt animation and resume walking when done
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

                // Play death sound
                if (this.scene.soundManager) {
                    this.scene.soundManager.playHulkDeath();
                }

                // Kill all summoned enemies
                this.scene.enemies.getChildren().forEach(enemy => {
                    if (enemy.texture && enemy.texture.key === 'enemy_zombie8_summon') {
                        enemy.die();
                    }
                });

                // Stop the summoning timer
                if (this.scene.summonTimer) {
                    this.scene.summonTimer.remove();
                    this.scene.summonTimer = null;
                }

                // Play death animation
                if (this.anims) {
                    this.anims.play(this.deadAnimKey, true).once('animationcomplete', () => {
                        if (this.active) {
                            this.anims.stop();
                            // Set texture to the last frame of the death animation
                            this.setTexture('enemy_zombie8_dead', 21);
                            this.setData('isCorpse', true);
                            this.setActive(false);
                            this.setDepth(-1);
                            
                            // Add blood pool
                            const bloodPool = this.scene.add.image(this.x, this.y + (this.body.height / 2), 'red-ink-stains');
                            bloodPool.setDepth(this.depth - 1);
                            bloodPool.setScale(Phaser.Math.FloatBetween(0.03, 0.05));
                            bloodPool.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
                            bloodPool.setAngle(Phaser.Math.Between(0, 359));
                            bloodPool.setTint(0xAA0000);
                        }
                    });
                }
            }
        }
    }

    attack(target) {
        if (this.getData('isDying') || this.getData('isCorpse') || !this.active || !this.getData('canDealDamage')) {
            return;
        }

        console.log(`EnemyZombie8 attacking ${target instanceof Phaser.GameObjects.Sprite ? target.texture.key : 'block'}`);
        this.setData('canDealDamage', false);
        if (this.body) this.body.setVelocity(0, 0);

        // Play attack animation and resume walking when done
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