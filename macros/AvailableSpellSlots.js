//------------------------------------------------------------
// SPELL SLOT TRACKER
// Pops up a quick notification showing available spell slots.
//------------------------------------------------------------

// Use token selected, or default character for the Actor if none is.
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;

let messageContent = `<span style="font-size: 1.5em"><strong>Spell Slots</strong><br>`;
let maxLevel = 9;

for (let level = 1; level <= maxLevel; level++) {
    let spellSlots = s_actor.data.data.spells[`spell${level}`];

    // only show spell levels the character actually has
    if (spellSlots.max > 0) {
        messageContent += `lvl ${level}:`;

        // available slots
        messageContent += `<span style="color:lime">`;
        for (let i = 0; i < spellSlots.value; i++) {
            messageContent += `&#x25cf;`;
        }
        messageContent += `</span>`;

        // used slots
        messageContent += `<span style="color:white">`;
        let usedSlots = spellSlots.max - spellSlots.value;
        for (let i = 0; i < usedSlots; i++) {
            messageContent += `&#x25cf;`;
        }
        
        messageContent += `</span><br/>`;
    }
}

messageContent += "</span>";

ui.notifications.info(messageContent);
