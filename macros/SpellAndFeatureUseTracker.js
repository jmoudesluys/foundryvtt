//------------------------------------------------------
// SPELL AND FEATURE USE TRACKER
// Spawns a dialog displaying available spell slots and
// remaining uses for limited-use class features.
//------------------------------------------------------

class Consumable {
    constructor(name, max, available) {
        this.name = name;
        this.max = max;
        this.available = available;
    }
}

// Use token selected, or default character for the Actor if none is.
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;

const maxLevel = 9;
let characterSpells = [];
let characterFeatures = [];

// spell slots
for (let level = 1; level <= maxLevel; level++) {

    let spellSlots = s_actor.data.data.spells[`spell${level}`];

    // only show spell levels the character actually has
    if (spellSlots.max > 0) {
        let consumable = new Consumable(`lvl ${level}: `, spellSlots.max, spellSlots.value);
        characterSpells.push(consumable);
    }
}

// features
let features = s_actor.items.filter(item => {
    return item.labels.featType === "Action" && item.data.data.uses.max > 0;
});

for (const feature of features) {
    let uses = feature.data.data.uses;
    let consumable = new Consumable(feature.data.name, uses.max, uses.value);
    characterFeatures.push(consumable);
}

let renderedSpells = renderConsumables(characterSpells);
let renderedFeatures = renderConsumables(characterFeatures);

let content = `
    <style>
    span {
        font-size: 1.2em
    }
    .available {
        color:  #2ecc71
    }
    .unavailable {
        color: grey
    }
    </style>

    <span>
        <p>
            <i class="fas fa-magic"> Spells</i><br/>
            ${renderedSpells}
        </p>
        <p>
            <i class="fas fa-medal"> Features</i><br/>
            ${renderedFeatures}
        </p>
    </span>
    `;

new Dialog({
    title: "Spell and Feature Slots",
  content: content,
  buttons: {}
}).render(true);

function renderConsumables(consumables) {

    if (consumables.length == 0) {
        return "n/a";
    }

    let result = '';

    for (const consumable of consumables) {
        result += `${consumable.name}: <span class="available">`;

        for (let i=1; i <= consumable.max; i++) {
            if (i > consumable.available) {
                result += `</span><span class="unavailable">`;
            }

            result += `&#x25cf;`;
        }

        result += '</span><br/>';
    }

    return result;
}