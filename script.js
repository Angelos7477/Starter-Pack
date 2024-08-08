let exp = 0;
let gold = 0;
let upgradeCost = 10;
let progress = 0;
let progressRate = 1; // Rate at which the progress bar fills, in percentage per tick
let tickInterval = 100; // Time between each tick in milliseconds (100ms = 0.1s)
let baseEnemyHealth = 5; // Base health for the first enemy
let enemyHealth = baseEnemyHealth; // Current enemy health
let attackDamage = 1; // Damage per attack
let expPerDefeat = 10; // EXP dropped when an enemy is defeated
let goldPerDefeat = 5; // Gold dropped when an enemy is defeated
let level = 1;
let baseExpToLevelUp = 10; // Base EXP required to level up
let expToLevelUp = baseExpToLevelUp; // Current EXP required to level up

const expDisplay = document.getElementById('resource-display');
const progressBar = document.getElementById('progress-bar');
const upgradeButton = document.getElementById('upgrade-button');
const rateDisplay = document.getElementById('rate-display');
const enemyHealthDisplay = document.getElementById('enemy-health-display');
const messageDisplay = document.getElementById('message-display'); // New message display element

function updateProgress() {
    progress += progressRate;

    if (progress >= 100) {
        progress = 0;
        attackEnemy(); // Attack the enemy when the bar fills
        updateDisplay();
    }

    progressBar.style.width = progress + '%';
}

function updateDisplay() {
    expDisplay.textContent = `EXP: ${exp}/${expToLevelUp} / Gold: ${gold} / Level: ${level}`;
    rateDisplay.textContent = `Attack Damage: ${attackDamage}`;
    enemyHealthDisplay.textContent = `Enemy Health: ${enemyHealth}`;
}

function displayMessage(message) {
    messageDisplay.textContent = message; // Update the message display
    setTimeout(() => {
        messageDisplay.textContent = ''; // Clear the message after a short delay
    }, 3000);
}

function attackEnemy() {
    enemyHealth -= attackDamage;
    if (enemyHealth <= 0) {
        exp += expPerDefeat; // Add EXP when the enemy is defeated
        gold += goldPerDefeat; // Add Gold when the enemy is defeated
        displayMessage(`You've defeated the enemy! Gained ${expPerDefeat} EXP and ${goldPerDefeat} Gold.`);
        checkLevelUp();
        resetEnemy();
    }
}

function checkLevelUp() {
    while (exp >= expToLevelUp) {
        exp -= expToLevelUp; // Deduct the EXP for leveling up
        level++;
        attackDamage += 1; // Increase damage upon leveling up
        expToLevelUp = Math.floor(baseExpToLevelUp * Math.pow(1.5, level - 1)); // Increase EXP required for next level
        displayMessage(`Congratulations! You've leveled up to Level ${level}. Your attack damage is now ${attackDamage}.`);
    }
}

function resetEnemy() {
    enemyHealth = baseEnemyHealth + level * 5; // Increase enemy health with each level
    baseEnemyHealth = enemyHealth; // Update the base health for the next round
}

// Upgrade Attack Damage functionality
upgradeButton.textContent = `Upgrade Attack (Cost: ${upgradeCost} Gold)`;
upgradeButton.addEventListener('click', () => {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        attackDamage++;
        upgradeCost *= 2; // Increase the cost for the next upgrade
        updateDisplay();
        upgradeButton.textContent = `Upgrade Attack (Cost: ${upgradeCost} Gold)`;
        displayMessage('Attack Damage upgraded!');
    } else {
        displayMessage('Not enough Gold to upgrade attack.');
    }
});

// Start the game loop
setInterval(updateProgress, tickInterval);

updateDisplay();
