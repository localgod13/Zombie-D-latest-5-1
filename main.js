// Remove React imports, import Phaser scenes and initGame
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { App } from './App.js'; // Assuming App initializes Phaser, remove this
import { initGame } from './GameScene.js'; // Import the helper
import { PreloadScene } from './PreloadScene.js'; // Import the PreloadScene
import { TitleScene } from './TitleScene.js';
import { GameScene } from './GameScene.js';
import { PauseScene } from './PauseScene.js';
import { GameOverScene } from './GameOverScene.js'; // Import the GameOver scene
import { LobbyScene } from './LobbyScene.js'; // Import the LobbyScene
import { JoinGameScene } from './JoinGameScene.js'; // Import the JoinGameScene
import { NameInputScene } from './NameInputScene.js';
import { MultiplayerMenuScene } from './MultiplayerMenuScene.js';
import { ChangeNotesScene } from './ChangeNotesScene.js'; // Import the ChangeNotesScene

// Ensure the renderDiv exists
var container = document.getElementById('renderDiv');
if (!container) {
    console.error("ERROR: renderDiv not found. Creating one.");
    container = document.createElement('div');
    container.id = 'renderDiv';
    container.style.width = '100%'; // Ensure it takes full space
    container.style.height = '100%';
    container.style.margin = '0';
    document.body.appendChild(container);
} else {
    // Clear any existing React content if needed
    container.innerHTML = '';
}

// Initialize Phaser with all scenes, starting with PreloadScene
initGame('renderDiv', [
    PreloadScene,
    TitleScene,
    GameScene,
    PauseScene,
    GameOverScene,
    LobbyScene,
    JoinGameScene,
    NameInputScene,
    MultiplayerMenuScene,
    ChangeNotesScene
]); // Add ChangeNotesScene to the scene list
