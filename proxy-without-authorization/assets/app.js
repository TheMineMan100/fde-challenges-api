async function buttonPressed(value) {
  // Remove the buttons and add "Loading..."
  const spellList = document.getElementById('spell-list');
  const spellButtonsDiv = document.getElementById('buttons-div')
  const loadingText = document.getElementById('loading-text');
  const progressBarBack = document.getElementById('myProgress');
  const progressBar = document.getElementById('myBar');
  spellButtonsDiv.style.display = 'none'
  spellList.style.display = 'none';
  loadingText.style.display = 'inline-block';
  progressBarBack.style.display = 'block';
  progressBar.style.width = '1%';
  progressBar.style.display = 'block';

  // Load the data from the API
  let allSpells = await getAllSpells();
  let foundSpells = [];
  if (typeof value === 'number') {
    foundSpells = await getSpellsByLevel(allSpells.results, value);
  } else if (typeof value === 'string') {
    foundSpells = await getSpellsByClass(allSpells.results, value);
    foundSpells.sort((spell1, spell2) =>
        (spell1.level > spell2.level) ? 1 : (spell1.level < spell2.level) ? -1 : 0
    );
  }

  // Return the buttons and remove "Loading..."
  spellButtonsDiv.style.display = 'inline-block';
  spellList.style.display = 'inline-block';
  loadingText.style.display = 'none';
  progressBarBack.style.display = 'none';
  progressBar.style.display = 'none';

  // Display found data
  displayFoundData(foundSpells);
}

async function getAllSpells() {
  try {
    let response = await fetch('https://www.dnd5eapi.co/api/spells');
    let data = await response.json();
    return data;
  } catch (err) {
    console.warn("warning", err);
  }
}

async function getSpecificSpell(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    console.warn("warning", err);
  }
}

async function getSpellsByLevel(spells, level) {
  try {
    let spellsByLevelArray = [];
    let progressBarPercentage = 0;
    for (let i = 0; i < spells.length; i++) {
      let foundSpell = await getSpecificSpell('https://www.dnd5eapi.co' + spells[i].url);
      console.log('current progress: ', i + 1, "/ 319")
      progressBarPercentage = ((i + 1) / 319) * 100;
      setProgressBarPercentage(progressBarPercentage);
      if (foundSpell.level === level) {
        spellsByLevelArray.push(await foundSpell);
      }
    }
    return spellsByLevelArray;
  } catch (err) {
    console.warn("warning", err);
  }
}

async function getSpellsByClass(spells, dndClass) {
  try {
    let spellsByClassArray = [];
    let progressBarPercentage = 0;
    for (let i = 0; i < spells.length; i++) {
      let foundSpell = await getSpecificSpell('https://www.dnd5eapi.co' + spells[i].url);
      console.log('current progress: ', i + 1, "/ 319")
      console.log(foundSpell.classes)
      progressBarPercentage = ((i + 1) / 319) * 100;
      setProgressBarPercentage(progressBarPercentage);
      for (let j = 0; j < foundSpell.classes.length; j++) {
        if (foundSpell.classes[j].name === dndClass) {
          spellsByClassArray.push(await foundSpell);
        }
      }
    }
    console.log('spell array: ', spellsByClassArray)
    return spellsByClassArray;
  } catch (err) {
    console.warn("warning", err);
  }
}

function displayFoundData(spellsToDisplay) {
  // Get <ul> to display in
  const spellList = document.getElementById('spell-list');
  spellList.innerHTML = '';

  // Actually display data
  for (let i = 0; i < spellsToDisplay.length; i++) {
    spellList.innerHTML += `<li class="spell-name">${spellsToDisplay[i].name}</li>`;
    if (spellsToDisplay[i].level === 0) {
      spellList.innerHTML += `<li>Level: Cantrip</li>`;
    } else {
      spellList.innerHTML += `<li>Level: ${spellsToDisplay[i].level}</li>`;
    }
    spellList.innerHTML += `<li>Casting time: ${spellsToDisplay[i].casting_time}</li>`;
    spellList.innerHTML += `<li>Range: ${spellsToDisplay[i].range}</li>`;
    let components = '';
    for (let j = 0; j < spellsToDisplay[i].components.length; j++) {
      if (spellsToDisplay[i].components.length > 1) {
        if (j < spellsToDisplay[i].components.length - 1) {
          components += `${spellsToDisplay[i].components[j]}, `;
        } else {
          components += `${spellsToDisplay[i].components[j]}`;
        }
      } else {
        components += `${spellsToDisplay[i].components[j]}`;
      }
    }
    spellList.innerHTML += `<li>Components: ${components}</li>`;
    spellList.innerHTML += `<li>Duration: ${spellsToDisplay[i].duration}</li>`;
    let classes = '';
    for (let j = 0; j < spellsToDisplay[i].classes.length; j++) {
      if (spellsToDisplay[i].classes.length > 1) {
        if (j < spellsToDisplay[i].classes.length - 1) {
          classes += `${spellsToDisplay[i].classes[j].name}, `;
        } else {
          classes += `${spellsToDisplay[i].classes[j].name}`;
        }
      } else {
        classes += `${spellsToDisplay[i].classes[j].name}`;
      }
    }
    spellList.innerHTML += `<li class="extra-padding-bottom">Available to: ${classes}</li>`;
    spellList.innerHTML += `<li><b>Description:</b></li>`;
    for (let j = 0; j < spellsToDisplay[i].desc.length; j++) {
      spellList.innerHTML += `<li class="no-bullets">${spellsToDisplay[i].desc[j]}</li>`;
    }
    spellList.innerHTML += `<br>`;
  }
}

function setProgressBarPercentage(percentage) {
  const progressBar = document.getElementById('myBar');
  progressBar.style.width = percentage + '%';
}
