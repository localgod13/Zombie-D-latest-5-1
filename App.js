var _this = this;
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef } from 'react';
import { initGame, GameScene } from './GameScene.js'; // Import from new GameScene file
export var App = function() {
    var gameRef = useRef(null);
    var gameInstance = useRef(null);
    useEffect(function() {
        // Initialize the game with GameScene
        if (gameRef.current && !gameInstance.current) {
            // Pass the GameScene class to initGame
            gameInstance.current = initGame(gameRef.current, GameScene);
        }
        return function() {
            if (gameInstance.current) {
                gameInstance.current.destroy(true);
                gameInstance.current = null;
            }
        };
    }, []);
    // No specific styles needed here now, focus is on the Phaser container
    var styles = {
        gameContainer: {
            width: '100%',
            height: '100%'
        }
    };
    return(// The outer div can be removed or simplified if not needed
    // The div with ref='gameRef' will be filled by Phaser
    /*#__PURE__*/ _jsxDEV("div", {
        ref: gameRef,
        style: styles.gameContainer,
        id: "phaser-game"
    }, void 0, false, {
        fileName: "App.js",
        lineNumber: 33,
        columnNumber: 5
    }, _this));
};
