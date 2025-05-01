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
var GRID_SIZE = 32; // TODO: Consider passing this in or importing from a constants file
export var BlockChoiceUI = /*#__PURE__*/ function() {
    "use strict";
    function BlockChoiceUI(scene, shapeChoices, onChoiceMade, onSelectionComplete) {
        _class_call_check(this, BlockChoiceUI);
        this.scene = scene;
        this.shapeChoices = shapeChoices; // The available shapes
        this.onChoiceMade = onChoiceMade; // Callback when a choice is selected/deselected
        this.onSelectionComplete = onSelectionComplete; // Callback when 2 are chosen
        this.chosenIndices = new Set(); // Store indices of chosen shapes
        this.uiContainer = null;
        this.titleText = null;
        this.barricadeText = null; // Add text for barricade count
    }
    _create_class(BlockChoiceUI, [
        {
            key: "display",
            value: function display() {
                var _this = this;
                if (this.uiContainer) {
                    this.uiContainer.destroy(); // Clear previous UI if any
                }
                var width = this.scene.sys.game.config.width;
                var choiceBoxWidth = 80; // Width of each choice box
                var choiceBoxHeight = 80; // Height of each choice box
                var padding = 10;
                var totalWidth = this.shapeChoices.length * choiceBoxWidth + (this.shapeChoices.length - 1) * padding;
                var startX = (width - totalWidth) / 2;
                var startY = 50; // Position near the top
                this.uiContainer = this.scene.add.container(startX, startY);
                // Add background/title text
                this.titleText = this.scene.add.text(totalWidth / 2, -20, "Choose 2 Block(s)", {
                    fontSize: '18px',
                    fill: '#fff',
                    align: 'center'
                }).setOrigin(0.5);
                this.uiContainer.add(this.titleText);
                // Add barricade count text
                var barricadeCount = this.scene.blockManager.availableBarricades;
                this.barricadeText = this.scene.add.text(totalWidth / 2, 100, `Available Barricades: ${barricadeCount}`, {
                    fontSize: '16px',
                    fill: '#8B4513', // Saddle brown color
                    align: 'center'
                }).setOrigin(0.5);
                this.uiContainer.add(this.barricadeText);
                this.shapeChoices.forEach(function(blockDef, index) {
                    var choiceContainer = _this.scene.add.container(index * (choiceBoxWidth + padding), 0);
                    var background = _this.scene.add.graphics();
                    background.fillStyle(0x555555, 0.8); // Semi-transparent dark grey background
                    background.fillRect(0, 0, choiceBoxWidth, choiceBoxHeight);
                    choiceContainer.add(background);
                    choiceContainer.setData('background', background); // Store background ref
                    
                    // Draw mini shape preview OR barricade image
                    if (blockDef.type === 'barricade') {
                        // Add the wooden barricade image
                        var barricadeImage = _this.scene.add.image(choiceBoxWidth / 2, choiceBoxHeight / 2, 'wooden_barricade');
                        // Scale the image to fit nicely within the box
                        var scale = Math.min(choiceBoxWidth * 0.8 / barricadeImage.width, choiceBoxHeight * 0.8 / barricadeImage.height);
                        barricadeImage.setScale(scale);
                        choiceContainer.add(barricadeImage);
                    } else {
                        // Calculate bounds of the shape to center it
                        var minX = 0, maxX = 0, minY = 0, maxY = 0;
                        blockDef.shape.forEach(function(pos) {
                            minX = Math.min(minX, pos.x);
                            maxX = Math.max(maxX, pos.x);
                            minY = Math.min(minY, pos.y);
                            maxY = Math.max(maxY, pos.y);
                        });
                        var shapeWidth = (maxX - minX + 1) * (GRID_SIZE / 2);
                        var shapeHeight = (maxY - minY + 1) * (GRID_SIZE / 2);
                        var offsetX = (choiceBoxWidth - shapeWidth) / 2 - minX * (GRID_SIZE / 2);
                        var offsetY = (choiceBoxHeight - shapeHeight) / 2 - minY * (GRID_SIZE / 2);
                        // Draw block segments
                        blockDef.shape.forEach(function(pos) {
                            var segment = _this.scene.add.sprite(offsetX + pos.x * (GRID_SIZE / 2), offsetY + pos.y * (GRID_SIZE / 2), 'block_segment');
                            segment.setDisplaySize(GRID_SIZE / 2, GRID_SIZE / 2); // Scale down
                            segment.setOrigin(0, 0);
                            choiceContainer.add(segment);
                        });
                    }
                    
                    // Make the background graphic clickable instead of the container
                    background.setInteractive(new Phaser.Geom.Rectangle(0, 0, choiceBoxWidth, choiceBoxHeight), Phaser.Geom.Rectangle.Contains);
                    choiceContainer.setData('choiceIndex', index);
                    // Visual feedback for selection (initially none)
                    var border = _this.scene.add.graphics();
                    border.lineStyle(2, 0xffffff, 0); // Initially invisible border
                    border.strokeRect(0, 0, choiceBoxWidth, choiceBoxHeight);
                    choiceContainer.add(border);
                    choiceContainer.setData('border', border); // Store ref to toggle visibility
                    // Attach click listener to the background
                    background.on('pointerdown', function() {
                        _this._handleShapeChoiceClick(index, choiceContainer, background, border);
                    });
                    // Add hover listeners TO THE BACKGROUND
                    background.on('pointerover', function() {
                        if (!_this.chosenIndices.has(index)) {
                            background.clear().fillStyle(0x777777, 0.9).fillRect(0, 0, choiceBoxWidth, choiceBoxHeight);
                        }
                    });
                    background.on('pointerout', function() {
                        if (!_this.chosenIndices.has(index)) {
                            background.clear().fillStyle(0x555555, 0.8).fillRect(0, 0, choiceBoxWidth, choiceBoxHeight);
                        }
                    });
                    _this.uiContainer.add(choiceContainer);
                });
            }
        },
        {
            key: "_handleShapeChoiceClick",
            value: function _handleShapeChoiceClick(index, choiceContainer, background, border) {
                var clickedDefinition = this.shapeChoices[index];
                var choiceBoxWidth = choiceContainer.width; // Assuming container size is reliable
                var choiceBoxHeight = choiceContainer.height;
                if (this.chosenIndices.has(index)) {
                    // --- Deselect ---
                    this.chosenIndices.delete(index);
                    if (border) border.clear().lineStyle(2, 0xffffff, 0).strokeRect(0, 0, choiceBoxWidth, choiceBoxHeight); // Hide border
                    if (background) background.clear().fillStyle(0x555555, 0.8).fillRect(0, 0, choiceBoxWidth, choiceBoxHeight); // Reset background
                    this.onChoiceMade(clickedDefinition, false); // Notify scene: deselected
                    console.log("Deselected:", clickedDefinition);
                } else if (this.chosenIndices.size < 2) {
                    // --- Select ---
                    this.chosenIndices.add(index);
                    if (border) border.clear().lineStyle(3, 0x00ff00, 1).strokeRect(0, 0, choiceBoxWidth, choiceBoxHeight); // Show green border
                    if (background) background.clear().fillStyle(0x555555, 0.8).fillRect(0, 0, choiceBoxWidth, choiceBoxHeight); // Reset background (in case hover was active)
                    this.onChoiceMade(clickedDefinition, true); // Notify scene: selected
                    console.log("Selected:", clickedDefinition);
                    // --- Check if selection complete ---
                    if (this.chosenIndices.size === 2) {
                        this.updateTitleText(); // Update text one last time
                        this.onSelectionComplete(); // Notify scene
                    }
                } else {
                    console.log("Already selected 2 blocks."); // Ignore click
                }
                // Update title text
                this.updateTitleText();
            }
        },
        {
            key: "updateTitleText",
            value: function updateTitleText() {
                if (this.titleText) {
                    var remaining = 2 - this.chosenIndices.size;
                    this.titleText.setText(remaining > 0 ? "Choose ".concat(remaining, " Block(s)") : 'Selection Complete!');
                }
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                if (this.uiContainer) {
                    this.uiContainer.destroy();
                    this.uiContainer = null;
                }
                this.titleText = null; // Clear reference
                this.chosenIndices.clear(); // Clear the selection set
            }
        },
        {
            key: "selectByIndex",
            value: function selectByIndex(index) {
                if (!this.uiContainer || index < 0 || index >= this.shapeChoices.length) {
                    console.warn("Invalid index ".concat(index, " for selection."));
                    return;
                }
                // Find the correct container - skip the title text (index 0)
                var choiceContainer = this.uiContainer.getAt(index + 1); // +1 because title is at index 0
                if (!choiceContainer) {
                    console.warn("Could not find choice container at index ".concat(index + 1));
                    return;
                }
                // Retrieve stored references
                var background = choiceContainer.getData('background');
                var border = choiceContainer.getData('border');
                if (!background || !border) {
                    console.warn("Missing background or border reference for choice index ".concat(index));
                    return;
                }
                // Simulate the click
                this._handleShapeChoiceClick(index, choiceContainer, background, border);
            }
        }
    ]);
    return BlockChoiceUI;
}();
