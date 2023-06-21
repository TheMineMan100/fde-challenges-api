<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./assets/style.css">
    <title>Spell Compendium - D&D</title>
    
</head>

<body>
    <h1 style="font-family: 'Bookman Old Style', sans-serif;">Spell Compendium (D&D 5e)</h1>
    <div>
        <div id="buttons-div" class="extra-padding-bottom">
            <h3 class="no-padding-bottom no-mb">Find spells by spell level</h3>
            <button class="spell-list-button" onclick="buttonPressed(0);">Cantrips</button>
            <button class="spell-list-button" onclick="buttonPressed(1);">Level 1 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(2);">Level 2 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(3);">Level 3 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(4);">Level 4 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(5);">Level 5 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(6);">Level 6 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(7);">Level 7 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(8);">Level 8 spells</button>
            <button class="spell-list-button" onclick="buttonPressed(9);">Level 9 spells</button>

            <h3 class="no-padding-bottom no-mb">Find spells by classes that can use them</h3>
            <button class="spell-list-button" onclick="buttonPressed('Bard')">Bard</button>
            <button class="spell-list-button" onclick="buttonPressed('Cleric')">Cleric</button>
            <button class="spell-list-button" onclick="buttonPressed('Druid')">Druid</button>
            <button class="spell-list-button" onclick="buttonPressed('Paladin')">Paladin</button>
            <button class="spell-list-button" onclick="buttonPressed('Ranger')">Ranger</button>
            <button class="spell-list-button" onclick="buttonPressed('Sorcerer')">Sorcerer</button>
            <button class="spell-list-button" onclick="buttonPressed('Warlock')">Warlock</button>
            <button class="spell-list-button" onclick="buttonPressed('Wizard')">Wizard</button>
        </div>
        <div>
            <p id="loading-text" style="display: none"><i>Loading...</i></p>
            <div id="myProgress" style="display: none">
                <div id="myBar" style="display: none;"></div>
            </div>
        </div>
        <ul id="spell-list" style="display: none"></ul>
    </div>
    <script src="./assets/app.js"></script>
</body>

</html>