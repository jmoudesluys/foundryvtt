// VIEW AVAILABLE SPELL SLOTS

// Use token selected, or default character for the Actor if none is.
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;

let messageContent = `Spell slots:<br>`;
let maxLevel = 9;
let noSpellSlots = true;

for (let level = 1; level <= maxLevel; level++) {
    let availableSlots = s_actor.data.data.spells[`spell${level}`];
    if (availableSlots.value > 0) {
        messageContent += `lvl ${level}: ${availableSlots.value}/${availableSlots.max}<br>`;
        noSpellSlots = false;
    }
}

if (noSpellSlots) {
    messageContent = `No spell slots available.`
}

ui.notifications.info(messageContent);
