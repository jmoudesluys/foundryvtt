//------------------------------------------------------
// SPELL AND FEATURE USE TRACKER
// Spawns a dialog displaying available spell slots and
// remaining uses for limited-use class features.
//------------------------------------------------------

// Use token selected, or default character for the Actor if none is.
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;

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

    <span><p><i class="fas fa-magic"> Spells</i><br/>
    `;

const maxLevel = 9;
let noSpellSlots = true;

// spell slots
for (let level = 1; level <= maxLevel; level++) {
    let spellSlots = s_actor.data.data.spells[`spell${level}`];

    // only show spell levels the character actually has
    if (spellSlots.max > 0) {
        noSpellSlots = false;
        content += `lvl ${level}: `;

        // available slots
        content += `<span class="available">`;
        for (let i = 0; i < spellSlots.value; i++) {
            content += `&#x25cf;`;
        }
        content += `</span>`;

        // used slots
        content += `<span class="unavailable">`;
        let usedSlots = spellSlots.max - spellSlots.value;
        for (let i = 0; i < usedSlots; i++) {
            content += `&#x25cf;`;
        }
        
        content += `</span><br/>`;
    }
}

if (noSpellSlots) {
    content += "n/a";
}

// features
content += `</p><p><i class="fas fa-medal"> Features</i><br/>`;

let features = s_actor.items.filter(item => {
    return item.labels.featType === "Action" && item.data.data.uses.max > 0;
});

for (const feature of features) {
    content += `${feature.data.name}: `;
    let uses = feature.data.data.uses;

    // available slots
    content += `<span class="available">`;
    for (let i = 0; i < uses.value; i++) {
        content += `&#x25cf;`;
    }
    content += `</span>`;

    // used slots
    content += `<span class="unavailable">`;
    let usedSlots = uses.max - uses.value;
    for (let i = 0; i < usedSlots; i++) {
        content += `&#x25cf;`;
    }
    
    content += `</span><br/>`;
}

content += "</p></span>";

new Dialog({
    title: "Spell and Feature Slots",
  content: content,
  buttons: {}
}).render(true);
