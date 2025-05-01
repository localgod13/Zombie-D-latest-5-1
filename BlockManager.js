function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import Phaser from 'https://esm.sh/phaser@3.60.0';
import { BlockSegment } from './BlockSegment.js';
import { BlockChoiceUI } from './BlockChoiceUI.js'; // Import the UI class
var GRID_SIZE = 32;
// Define Tetris-like shapes (relative grid coordinates from origin 0,0)
export var BLOCK_SHAPES = [
    // I-shape - Pivot around the second block (index 1)
    {
        shape: [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 2,
                y: 0
            },
            {
                x: 3,
                y: 0
            }
        ],
        color: 0x00ffff,
        pivotIndex: 1
    },
    // O-shape - Pivot around top-left (index 0), rotation doesn't change it visually
    {
        shape: [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            }
        ],
        color: 0xffff00,
        pivotIndex: 0
    },
    // T-shape - Pivot around the middle bottom block (index 1)
    {
        shape: [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 2,
                y: 0
            },
            {
                x: 1,
                y: 1
            }
        ],
        color: 0x800080,
        pivotIndex: 1
    },
    // S-shape - Pivot around the bottom-right block (index 3)
    {
        shape: [
            {
                x: 1,
                y: 0
            },
            {
                x: 2,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            }
        ],
        color: 0x00ff00,
        pivotIndex: 3
    },
    // Z-shape - Pivot around the top-right block (index 1)
    {
        shape: [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 1,
                y: 1
            },
            {
                x: 2,
                y: 1
            }
        ],
        color: 0xff0000,
        pivotIndex: 1
    },
    // J-shape - Pivot around the middle block in the long arm (index 2)
    {
        shape: [
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            },
            {
                x: 2,
                y: 1
            }
        ],
        color: 0x0000ff,
        pivotIndex: 2
    },
    // L-shape - Pivot around the middle block in the long arm (index 2)
    {
        shape: [
            {
                x: 2,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            },
            {
                x: 2,
                y: 1
            }
        ],
        color: 0xffa500,
        pivotIndex: 2
    },
    // Wooden Barricade (Single block) - Pivot is the block itself (index 0)
    {
        shape: [
            {
                x: 0,
                y: 0
            }
        ],
        color: 0x8B4513,
        type: 'barricade',
        pivotIndex: 0
    } // Saddle Brown
];
export var BlockManager = /*#__PURE__*/ function() {
    "use strict";
    function BlockManager(scene) {
        _class_call_check(this, BlockManager);
        this.scene = scene;
        this.placementIndicator = null;
        this.shapeChoices = [];
        this.chosenShapes = [];
        this.selectedShapeIndex = -1;
        this.isChoosingBlocks = false;
        this.blockChoiceHandler = null;
        this.availableBarricades = 0; // Track available barricades
    }
    _create_class(BlockManager, [
        {
            // --- Methods for Block Choice Phase ---
            key: "startChoicePhase",
            value: function startChoicePhase(bonusBlocks = 0, bonusBarricades = 0) {
                console.log("Starting block choice phase with bonus blocks:", bonusBlocks, "and barricades:", bonusBarricades);
                this.isChoosingBlocks = true;
                
                // Clear existing choices
                this.shapeChoices = [];
                this.chosenShapes = [];
                this.selectedShapeIndex = -1;

                // Generate regular block choices (excluding barricades)
                for (var i = 0; i < 3; i++) {
                    var randomShape = Phaser.Math.RND.pick(Object.values(BLOCK_SHAPES).filter(shape => !shape.type || shape.type !== 'barricade'));
                    this.shapeChoices.push(randomShape);
                }

                // Add bonus blocks if any
                for (var i = 0; i < bonusBlocks; i++) {
                    var randomShape = Phaser.Math.RND.pick(Object.values(BLOCK_SHAPES).filter(shape => !shape.type || shape.type !== 'barricade'));
                    this.shapeChoices.push(randomShape);
                }

                // Add barricade choices
                for (var i = 0; i < 2; i++) {
                    this.shapeChoices.push({
                        type: 'barricade',
                        shape: [{x: 0, y: 0}], // Single block shape for barricade
                        color: 0x8B4513 // Saddle brown color
                    });
                }

                // Add bonus barricades if any
                for (var i = 0; i < bonusBarricades; i++) {
                    this.shapeChoices.push({
                        type: 'barricade',
                        shape: [{x: 0, y: 0}], // Single block shape for barricade
                        color: 0x8B4513 // Saddle brown color
                    });
                }

                // Set available barricades (2 base + bonus)
                this.availableBarricades = 2 + bonusBarricades;

                console.log("Generated block choices:", this.shapeChoices);
                console.log("Available barricades:", this.availableBarricades);

                // Create and show the block choice UI
                this.blockChoiceHandler = new BlockChoiceUI(
                    this.scene,
                    this.shapeChoices,
                    this.handleShapeChoiceMade.bind(this),
                    this.finishBlockSelection.bind(this)
                );
                this.blockChoiceHandler.display();

                // Update UI text if available
                if (typeof this.scene.updateUIText === 'function') {
                    this.scene.updateUIText();
                }
            }
        },
        {
            key: "generateNewBlockChoices",
            value: function generateNewBlockChoices(bonusBlocks = 0, bonusBarricades = 0) {
                // Clear existing choices
                this.shapeChoices = [];
                this.chosenShapes = [];
                this.selectedShapeIndex = -1;

                // Generate regular block choices
                for (var i = 0; i < 3; i++) {
                    var randomShape = Phaser.Math.RND.pick(Object.values(BLOCK_SHAPES));
                    this.shapeChoices.push(randomShape);
                }

                // Add bonus blocks if any
                for (var i = 0; i < bonusBlocks; i++) {
                    var randomShape = Phaser.Math.RND.pick(Object.values(BLOCK_SHAPES));
                    this.shapeChoices.push(randomShape);
                }

                // Add bonus barricades if any
                for (var i = 0; i < bonusBarricades; i++) {
                    this.shapeChoices.push('barricade');
                }

                console.log("Generated block choices:", this.shapeChoices);
            }
        },
        {
            key: "handleShapeChoiceMade",
            value: function handleShapeChoiceMade(shapeDefinition, isSelected) {
                if (isSelected) {
                    this.chosenShapes.push(shapeDefinition);
                } else {
                    var indexToRemove = this.chosenShapes.findIndex(function(def) {
                        return def === shapeDefinition;
                    });
                    if (indexToRemove !== -1) {
                        this.chosenShapes.splice(indexToRemove, 1);
                    }
                }
                if (typeof this.scene.updateUIText === 'function') {
                    this.scene.updateUIText();
                }
            }
        },
        {
            key: "finishBlockSelection",
            value: function finishBlockSelection() {
                var _this = this;
                var scene = this.scene;
                console.log("BlockManager: Block selection complete:", this.chosenShapes);
                this.isChoosingBlocks = false;
                
                // Add available barricades to chosen shapes
                var barricadeDefinition = BLOCK_SHAPES.find(function(def) {
                    return def.type === 'barricade';
                });
                
                if (barricadeDefinition) {
                    for (var i = 0; i < this.availableBarricades; i++) {
                        this.chosenShapes.push(barricadeDefinition);
                    }
                    console.log("Added", this.availableBarricades, "barricades. Current chosen shapes:", this.chosenShapes);
                } else {
                    console.warn("Could not find barricade definition to add automatically.");
                }

                scene.isSelectionGracePeriodActive = true;
                if (this.blockChoiceHandler) {
                    scene.time.delayedCall(500, function() {
                        if (_this.blockChoiceHandler) {
                            _this.blockChoiceHandler.destroy();
                            _this.blockChoiceHandler = null;
                        }
                    });
                }
                if (scene.phaseTimer) scene.phaseTimer.remove();
                scene.phaseTimer = scene.time.delayedCall(scene.buildTime, scene.startDefendPhase, [], scene);
                if (this.chosenShapes.length > 0) {
                    this.selectChosenShape(0);
                } else {
                    console.warn("Selection finished but no blocks chosen.");
                    this.generateNewBlock(null);
                    this.updatePlacementIndicator(0, 0);
                }
                if (typeof scene.updateUIText === 'function') {
                    scene.updateUIText();
                }
                scene.time.delayedCall(250, function() {
                    scene.isSelectionGracePeriodActive = false;
                    console.log("Grace period ended.");
                });
            }
        },
        {
            key: "selectChosenShape",
            value: function selectChosenShape(index) {
                if (index < 0 || index >= this.chosenShapes.length) {
                    console.warn("Invalid shape index: ".concat(index, ", available: ").concat(this.chosenShapes.length));
                    return;
                }
                this.selectedShapeIndex = index;
                var blockDefinition = this.chosenShapes[this.selectedShapeIndex];
                this.generateNewBlock(blockDefinition);
                var pointer = this.scene.input.activePointer;
                this.updatePlacementIndicator(pointer.worldX, pointer.worldY);
            }
        },
        {
            key: "handleChoiceSelectionByKey",
            value: function handleChoiceSelectionByKey(index) {
                if (this.isChoosingBlocks && this.blockChoiceHandler) {
                    this.blockChoiceHandler.selectByIndex(index);
                }
            }
        },
        {
            // --- Core Block Management Methods ---
            key: "generateNewBlock",
            value: function generateNewBlock(blockDefinition) {
                var _this = this;
                var scene = this.scene;
                if (!blockDefinition) {
                    console.warn("generateNewBlock called without definition, picking random.");
                    blockDefinition = Phaser.Utils.Array.GetRandom(BLOCK_SHAPES);
                }
                var shape = blockDefinition.shape;
                var color = blockDefinition.color;
                if (this.placementIndicator) {
                    this.placementIndicator.removeAll(true);
                    this.placementIndicator.destroy();
                    this.placementIndicator = null;
                }
                if (scene.gameState === 'BUILDING' && !this.isChoosingBlocks && this.chosenShapes.length > 0) {
                    this.placementIndicator = scene.add.container(0, 0);
                    this.placementIndicator.setData('shape', shape);
                    this.placementIndicator.setData('color', color);
                    this.placementIndicator.setData('type', blockDefinition.type);
                    this.placementIndicator.setData('pivotIndex', blockDefinition.pivotIndex); // Store pivot index
                    shape.forEach(function(pos) {
                        var textureKey = blockDefinition.type === 'barricade' ? 'wooden_barricade' : 'block_segment';
                        var segment;
                        if (blockDefinition.type === 'barricade') {
                            segment = scene.add.sprite(GRID_SIZE / 2, GRID_SIZE / 2, textureKey);
                            segment.setOrigin(0.5, 0.5);
                        } else {
                            segment = scene.add.sprite(pos.x * GRID_SIZE, pos.y * GRID_SIZE, textureKey);
                            segment.setOrigin(0, 0);
                        }
                        // --- Scale the preview segment (make barricade preview larger too) ---
                        var displaySize = textureKey === 'wooden_barricade' ? GRID_SIZE * 1.8 : GRID_SIZE; // Increased from 1.5
                        segment.setDisplaySize(displaySize, displaySize);
                        _this.placementIndicator.add(segment);
                    });
                    this.placementIndicator.setActive(true).setVisible(true);
                    this.placementIndicator.setAlpha(0.7);
                    scene.drawGrid();
                } else {
                    if (this.placementIndicator) {
                        this.placementIndicator.destroy();
                        this.placementIndicator = null;
                    }
                    if (scene.gridGraphics) scene.gridGraphics.clear();
                }
            }
        },
        {
            key: "rotateBlock",
            value: function rotateBlock() {
                var scene = this.scene;
                if (!this.placementIndicator || !this.placementIndicator.active || scene.gameState !== 'BUILDING') return;
                var originalShape = this.placementIndicator.getData('shape');
                var blockType = this.placementIndicator.getData('type');
                var pivotIndex = this.placementIndicator.getData('pivotIndex');
                if (!originalShape || typeof pivotIndex === 'undefined') {
                    console.warn("Cannot rotate: Placement indicator missing shape or pivot data.");
                    return;
                }
                // Handle simple rotation for single-block barricades
                if (blockType === 'barricade') {
                    this.placementIndicator.list.forEach(function(segment) {
                        segment.angle = (segment.angle + 90) % 360; // Ensure angle stays within 0-359
                    });
                    this.updatePlacementIndicator(this.placementIndicator.x, this.placementIndicator.y, true);
                    return; // Rotation done for barricade
                }
                // --- Pivot-based rotation for multi-segment blocks ---
                var pivotRelPos = originalShape[pivotIndex];
                var rotatedShape = originalShape.map(function(pos) {
                    // Calculate position relative to pivot
                    var relX = pos.x - pivotRelPos.x;
                    var relY = pos.y - pivotRelPos.y;
                    // Rotate 90 degrees clockwise: (x, y) -> (y, -x)
                    var rotatedRelX = relY;
                    var rotatedRelY = -relX;
                    // Convert back to absolute grid coordinates relative to the shape's origin
                    return {
                        x: pivotRelPos.x + rotatedRelX,
                        y: pivotRelPos.y + rotatedRelY
                    };
                });
                // --- Validate the rotated shape ---
                var currentGridX = this.placementIndicator.x;
                var currentGridY = this.placementIndicator.y;
                var isValidRotation = true;
                var playerExists = !!(scene.player && scene.player.active);
                var placedBlocksExist = !!scene.placedBlocks;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    var _loop = function() {
                        var pos = _step.value;
                        var checkX = currentGridX + pos.x * GRID_SIZE;
                        var checkY = currentGridY + pos.y * GRID_SIZE;
                        var overlaps = false;
                        // Check player overlap
                        if (playerExists && checkX === scene.player.x - GRID_SIZE / 2 && checkY === scene.player.y - GRID_SIZE / 2) {
                            overlaps = true;
                        }
                        // Check overlap with placed blocks
                        if (!overlaps && placedBlocksExist) {
                            scene.placedBlocks.children.iterate(function(placedSegment) {
                                // Check center points for better accuracy with potentially rotated placed segments
                                if (Math.abs(checkX + GRID_SIZE / 2 - placedSegment.x) < 1 && Math.abs(checkY + GRID_SIZE / 2 - placedSegment.y) < 1) {
                                    overlaps = true;
                                    return false; // Stop iteration for this segment
                                }
                            });
                        }
                        // Check basic bounds (optional, adjust as needed)
                        // if (checkX < 0 || checkX + GRID_SIZE > scene.scale.width || checkY < 0 || checkY + GRID_SIZE > scene.scale.height) {
                        //     overlaps = true;
                        // }
                        if (overlaps) {
                            isValidRotation = false;
                            return "break" // No need to check further if one segment overlaps
                            ;
                        }
                    };
                    for(var _iterator = rotatedShape[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _ret = _loop();
                        if (_ret === "break") break;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                // --- Apply rotation if valid ---
                if (isValidRotation) {
                    this.placementIndicator.setData('shape', rotatedShape);
                    // Update visual positions of segments
                    this.placementIndicator.list.forEach(function(segment, index) {
                        if (rotatedShape[index]) {
                            segment.setPosition(rotatedShape[index].x * GRID_SIZE, rotatedShape[index].y * GRID_SIZE);
                        } else {
                            console.warn("Mismatch between segment count and rotated shape length at index ".concat(index));
                        }
                    });
                    console.log("Rotated block successfully.");
                } else {
                    console.log("Rotation blocked: Invalid position.");
                // Optional: Play a 'blocked' sound or flash the indicator red briefly
                }
                // Always re-validate the indicator's current position/state after attempting rotation
                this.updatePlacementIndicator(this.placementIndicator.x, this.placementIndicator.y, true);
            }
        },
        {
            key: "updatePlacementIndicator",
            value: function updatePlacementIndicator(pointerX, pointerY) {
                var isRotation = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var scene = this.scene;
                // Ensure grid exists before trying to clear it
                var gridExists = !!scene.gridGraphics;
                // Hide placement indicator if not BUILDING, or if currently CHOOSING blocks
                if (!this.placementIndicator || scene.gameState !== 'BUILDING' || this.isChoosingBlocks) {
                    if (this.placementIndicator) this.placementIndicator.setVisible(false);
                    // If indicator becomes invisible, clear the grid too
                    if (gridExists) scene.gridGraphics.clear();
                    return;
                }
                // If indicator exists and we are building, make sure it's visible
                this.placementIndicator.setVisible(true);
                // Ensure grid is drawn when indicator is visible (and grid exists)
                if (gridExists) scene.drawGrid();
                // Snap indicator position to grid
                var gridX = isRotation ? this.placementIndicator.x : Math.floor(pointerX / GRID_SIZE) * GRID_SIZE;
                var gridY = isRotation ? this.placementIndicator.y : Math.floor(pointerY / GRID_SIZE) * GRID_SIZE;
                this.placementIndicator.setPosition(gridX, gridY);
                var shape = this.placementIndicator.getData('shape');
                var overlapsPlayer = false;
                var overlapsPlacedBlock = false;
                if (!shape) {
                    console.warn("Placement indicator missing shape data during validation.");
                    this.placementIndicator.setData('isValid', false);
                    this.placementIndicator.list.forEach(function(segment) {
                        return segment.setTint(0xff0000);
                    }); // Tint red
                    return;
                }
                // Ensure player and placedBlocks exist before checking overlap
                var playerExists = !!(scene.player && scene.player.active);
                var placedBlocksExist = !!scene.placedBlocks;
                shape.forEach(function(pos) {
                    var checkX = gridX + pos.x * GRID_SIZE;
                    var checkY = gridY + pos.y * GRID_SIZE;
                    // Check player overlap
                    if (playerExists && checkX === scene.player.x - GRID_SIZE / 2 && checkY === scene.player.y - GRID_SIZE / 2) {
                        overlapsPlayer = true;
                    }
                    // Check overlap with placed blocks
                    if (!overlapsPlayer && placedBlocksExist) {
                        scene.placedBlocks.children.iterate(function(placedSegment) {
                            // Check center points for better accuracy with potentially rotated placed segments
                            if (Math.abs(checkX + GRID_SIZE / 2 - placedSegment.x) < 1 && Math.abs(checkY + GRID_SIZE / 2 - placedSegment.y) < 1) {
                                overlapsPlacedBlock = true;
                                return false; // Stop iteration for this segment
                            }
                        });
                    }
                    if (overlapsPlacedBlock) return false; // Stop checking shape segments if overlap found
                });
                var isValid = !overlapsPlayer && !overlapsPlacedBlock;
                var displayTint = isValid ? 0xffffff : 0xff0000; // White if valid, red if invalid
                this.placementIndicator.list.forEach(function(segment) {
                    return segment.setTint(displayTint);
                });
                this.placementIndicator.setData('isValid', isValid);
            }
        },
        {
            key: "placeBlock",
            value: function placeBlock(pointerX, pointerY) {
                var scene = this.scene;
                // Accessing scene properties directly for now
                if (scene.isSelectionGracePeriodActive) {
                    console.log("Grace period active, ignoring placeBlock.");
                    return;
                }
                if (scene.gameState !== 'BUILDING' || !this.placementIndicator || !this.placementIndicator.active) {
                    console.log("Cannot place block now (wrong state or no indicator)!");
                    return;
                }
                // Use the indicator's current position for validation, not the raw pointer
                this.updatePlacementIndicator(this.placementIndicator.x, this.placementIndicator.y, true); // Force validation based on indicator pos
                if (!this.placementIndicator.getData('isValid')) {
                    console.log("Cannot place block: Placement invalid.");
                    return; // Can't place if invalid
                }
                // Use validated indicator position for placement
                var gridX = this.placementIndicator.x;
                var gridY = this.placementIndicator.y;
                var shape = this.placementIndicator.getData('shape');
                var color = this.placementIndicator.getData('color'); // Get color for potential tinting
                var blockType = this.placementIndicator.getData('type'); // Get the block type
                if (!shape || typeof color === 'undefined') {
                    console.error("Placement failed: Indicator data missing shape or color.");
                    return;
                }
                // Check if placedBlocks group exists before trying to add to it
                if (!scene.placedBlocks) {
                    console.error("Placement failed: placedBlocks group does not exist.");
                    return;
                }
                // Get the rotation angle from the first segment of the indicator (assuming all segments have the same angle)
                var indicatorRotationAngle = this.placementIndicator.list.length > 0 ? this.placementIndicator.list[0].angle : 0;
                shape.forEach(function(pos) {
                    var segmentX = gridX + pos.x * GRID_SIZE + GRID_SIZE / 2;
                    var segmentY = gridY + pos.y * GRID_SIZE + GRID_SIZE / 2;
                    // Determine texture based on type
                    var textureKey = blockType === 'barricade' ? 'wooden_barricade' : 'block_segment';
                    // Create using BlockSegment constructor directly, passing the correct texture
                    var placedSegment = new BlockSegment(scene, segmentX, segmentY, textureKey, scene.wallHealthLevel);
                    // Apply the rotation angle from the indicator
                    placedSegment.angle = indicatorRotationAngle;
                    // Add the manually created segment to the static group
                    scene.placedBlocks.add(placedSegment, true); // true makes it static
                    // Ensure physics body updates after rotation (important for static bodies)
                    // Phaser's StaticGroup's add() with 'true' should handle refreshing the body,
                    // but explicitly calling it ensures size/offset are correct post-rotation if needed.
                    // placedSegment.refreshBody(); // May not be strictly needed, test first.
                    if (placedSegment) {
                        placedSegment.setActive(true).setVisible(true);
                    // Optional: Tint placed blocks - keep them default white for now
                    // placedSegment.setTint(color);
                    } else {
                        console.error("Failed to create BlockSegment instance.");
                    }
                });
                // --- Logic after placing a block (still uses scene methods/properties) ---
                // Remove the used shape from the manager's list
                if (this.selectedShapeIndex >= 0 && this.selectedShapeIndex < this.chosenShapes.length) {
                    this.chosenShapes.splice(this.selectedShapeIndex, 1);
                } else {
                    console.warn("Could not remove placed shape from chosenShapes (index issue).");
                }
                this.selectedShapeIndex = -1; // Reset selected index
                if (this.chosenShapes.length > 0) {
                    this.selectChosenShape(0); // Select the next available shape
                    // Update indicator position immediately
                    this.updatePlacementIndicator(pointerX, pointerY);
                    // Ensure grid is drawn
                    if (scene.gridGraphics) scene.drawGrid();
                } else {
                    // No shapes left
                    console.log("No shapes left to choose.");
                    if (this.placementIndicator) {
                        this.placementIndicator.destroy();
                        this.placementIndicator = null;
                    }
                    if (scene.gridGraphics) {
                        scene.gridGraphics.clear();
                    }
                    console.log("Last block placed! Starting 2s countdown to Defend Phase.");
                    if (scene.phaseTimer) {
                        scene.phaseTimer.remove();
                        scene.phaseTimer = null;
                    }
                    // Ensure startDefendPhase exists before scheduling
                    if (typeof scene.startDefendPhase === 'function') {
                        scene.phaseTimer = scene.time.delayedCall(2000, scene.startDefendPhase, [], scene);
                    } else {
                        console.error("scene.startDefendPhase is not a function!");
                    }
                }
                // Ensure updateUIText exists before calling
                if (typeof scene.updateUIText === 'function') {
                    scene.updateUIText(); // Update UI
                }
            }
        },
        {
            // Add a method to safely get the indicator reference
            key: "getIndicator",
            value: function getIndicator() {
                return this.placementIndicator;
            }
        },
        {
            // Add a cleanup method
            key: "destroy",
            value: function destroy() {
                if (this.placementIndicator) {
                    this.placementIndicator.destroy();
                    this.placementIndicator = null;
                }
                if (this.blockChoiceHandler) {
                    this.blockChoiceHandler.destroy(); // Clean up choice UI if it exists
                    this.blockChoiceHandler = null;
                }
                this.scene = null; // Remove scene reference
                console.log("BlockManager destroyed.");
            }
        },
        {
            // Add method to reposition Choice UI on resize
            key: "handleResize",
            value: function handleResize(newWidth) {
                if (this.isChoosingBlocks && this.blockChoiceHandler && this.blockChoiceHandler.uiContainer) {
                    // Recalculate position based on new width
                    var choiceBoxWidth = 80;
                    var padding = 10;
                    var totalWidth = this.shapeChoices.length * choiceBoxWidth + (this.shapeChoices.length - 1) * padding;
                    var startX = (newWidth - totalWidth) / 2;
                    this.blockChoiceHandler.uiContainer.setPosition(startX, 50); // Keep Y fixed
                }
            }
        }
    ]);
    return BlockManager;
}();
