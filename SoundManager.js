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
// Define sound keys (should match those loaded in GameScene.js preload)
var SOUND_KEYS = {
    SHOOT: 'shoot',
    RELOAD: 'reload',
    SHOTGUN_SHOOT: 'shotgun_shoot',
    SHOTGUN_RELOAD: 'shotgun_reload',
    ENEMY_HIT: 'enemy_hit',
    PLAYER_HIT: 'player_hit',
    BLOCK_DESTROYED: 'block_destroyed',
    BACKGROUND_MUSIC: 'bg_music',
    ZOMBIE_MOAN: 'zombie_moan',
    ZOMBIE_GROWL: 'zombie_growl',
    ZOMBIE_GRUNT: 'zombie_grunt',
    ZOMBIE_7_SCREAM: 'zombie7_scream',
    RIFLE_SHOOT: 'rifle_shoot', // Key for auto rifle sound
    ZOMBIE_ROUND_ALARM: 'zombie_round_alarm', // Add this line
    HULK_DEATH: 'hulk_death' // Add hulk death sound key
};
export var SoundManager = /*#__PURE__*/ function() {
    "use strict";
    function SoundManager(scene) {
        _class_call_check(this, SoundManager);
        this.scene = scene;
        this.backgroundMusic = null;
        this.rifleSoundInstance = null; // To hold the looping rifle sound instance
    }
    _create_class(SoundManager, [
        {
            // --- Play Specific Sound Effects ---
            key: "playShoot",
            value: function playShoot() {
                this.scene.sound.play(SOUND_KEYS.SHOOT, {
                    volume: 0.10
                }); // Reduced from 0.15
            }
        },
        {
            key: "playReload",
            value: function playReload() {
                this.scene.sound.play(SOUND_KEYS.RELOAD, {
                    volume: 0.12
                }); // Reduced from 0.19
            }
        },
        {
            // Removed extra closing brace from previous line 30
            key: "playShotgunShoot",
            value: function playShotgunShoot() {
                this.scene.sound.play(SOUND_KEYS.SHOTGUN_SHOOT, {
                    volume: 0.15
                }); // Adjust volume as needed
            }
        },
        {
            key: "playShotgunReload",
            value: function playShotgunReload() {
                this.scene.sound.play(SOUND_KEYS.SHOTGUN_RELOAD, {
                    volume: 0.18
                }); // Adjust volume as needed
            }
        },
        {
            key: "playEnemyHit",
            value: function playEnemyHit() {
                // Play the actual enemy hit sound
                this.scene.sound.play(SOUND_KEYS.ENEMY_HIT, {
                    volume: 0.08
                }); // Volume adjusted from previous steps
            }
        },
        {
            key: "playPlayerHit",
            value: function playPlayerHit() {
                // Example: Play a player hurt sound if available (volume adjusted)
                // this.scene.sound.play(SOUND_KEYS.PLAYER_HIT, { volume: 0.15 }); // Reduced from 0.23
                console.log("SoundManager: TODO - Play player hit sound");
            }
        },
        {
            key: "playBlockDestroyed",
            value: function playBlockDestroyed() {
                // Example: Play a crumble/break sound if available (volume adjusted)
                // this.scene.sound.play(SOUND_KEYS.BLOCK_DESTROYED, { volume: 0.12 }); // Reduced from 0.19
                console.log("SoundManager: TODO - Play block destroyed sound");
            }
        },
        {
            // --- Background Music Control ---
            key: "playBackgroundMusic",
            value: function playBackgroundMusic() {
                // Stop existing music first to prevent overlap
                if (this.backgroundMusic) {
                    this.backgroundMusic.stop();
                }
                // Play new music and loop
                this.backgroundMusic = this.scene.sound.add(SOUND_KEYS.BACKGROUND_MUSIC, {
                    loop: true,
                    volume: 0.2 // Adjust volume as needed
                });
                this.backgroundMusic.play();
            }
        },
        {
            key: "stopBackgroundMusic",
            value: function stopBackgroundMusic() {
                if (this.backgroundMusic) {
                    this.backgroundMusic.destroy(); // Use destroy() instead of stop()
                    this.backgroundMusic = null;
                }
            }
        },
        {
            // --- Play Random Ambient Sounds ---
            key: "playRandomZombieSound",
            value: function playRandomZombieSound() {
                var zombieSounds = [
                    SOUND_KEYS.ZOMBIE_MOAN,
                    SOUND_KEYS.ZOMBIE_GROWL,
                    SOUND_KEYS.ZOMBIE_GRUNT
                ];
                var randomSoundKey = Phaser.Math.RND.pick(zombieSounds);
                var volume = 0.15; // Default volume for moan/grunt
                // Make the growl louder
                if (randomSoundKey === SOUND_KEYS.ZOMBIE_GROWL) {
                    volume = 0.25; // Increased volume specifically for growl
                }
                // Play the sound with the determined volume
                this.scene.sound.play(randomSoundKey, {
                    volume: volume
                });
            }
        },
        {
            key: "playZombie7Scream",
            value: function playZombie7Scream() {
                // Play the specific scream sound for Zombie 7
                this.scene.sound.play(SOUND_KEYS.ZOMBIE_7_SCREAM, {
                    volume: 0.3
                }); // Adjust volume as needed
            }
        },
        {
            key: "playRifleShoot",
            value: function playRifleShoot() {
                // Play the single rifle shot sound
                this.scene.sound.play(SOUND_KEYS.RIFLE_SHOOT, {
                    volume: 0.15
                }); // Adjust volume as needed
            }
        },
        {
            key: "playRifleShootLoop",
            value: function playRifleShootLoop() {
                // Play the rifle sound on loop if it's not already playing
                if (!this.rifleSoundInstance || !this.rifleSoundInstance.isPlaying) {
                    // If an old instance exists but stopped, remove it first
                    if (this.rifleSoundInstance) {
                        this.rifleSoundInstance.destroy();
                    }
                    this.rifleSoundInstance = this.scene.sound.add(SOUND_KEYS.RIFLE_SHOOT, {
                        loop: true,
                        volume: 0.12 // Adjust volume as needed
                    });
                    this.rifleSoundInstance.play();
                    console.log("Starting rifle loop sound");
                }
            }
        },
        {
            key: "stopRifleShootLoop",
            value: function stopRifleShootLoop() {
                // Stop and remove the looping rifle sound instance if it exists and is playing
                if (this.rifleSoundInstance && this.rifleSoundInstance.isPlaying) {
                    this.rifleSoundInstance.stop();
                    this.rifleSoundInstance.destroy();
                    this.rifleSoundInstance = null;
                    console.log("Stopping rifle loop sound");
                }
            }
        },
        {
            key: "playZombieRoundAlarm",
            value: function playZombieRoundAlarm() {
                this.scene.sound.play(SOUND_KEYS.ZOMBIE_ROUND_ALARM, {
                    volume: 0.3
                });
            }
        },
        {
            key: "playHulkDeath",
            value: function playHulkDeath() {
                // Play the hulk death sound
                this.scene.sound.play(SOUND_KEYS.HULK_DEATH, {
                    volume: 0.168 // Reduced from 0.198 by another 15%
                });
            }
        },
        {
            // --- Optional: Master Volume/Mute ---
            // setMasterVolume(volume) {
            //     this.scene.sound.volume = Phaser.Math.Clamp(volume, 0, 1);
            // }
            // muteAll(muted) {
            //     this.scene.sound.mute = muted;
            // }
            // --- Cleanup ---
            key: "destroy",
            value: function destroy() {
                console.log("SoundManager destroying...");
                this.stopBackgroundMusic();
                this.stopRifleShootLoop();
            // Stop any other persistent sounds if added later
            // Note: One-shot sounds don't usually need explicit stopping here
            // as they finish on their own.
            // Setting scene to null helps garbage collection, though not strictly necessary
            // if the scene itself is being destroyed.
            // this.scene = null;
            }
        }
    ]);
    return SoundManager;
}();
// Export keys for easy access in GameScene preload
export { SOUND_KEYS };
