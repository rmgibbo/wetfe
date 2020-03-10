/*
* !THIS FILE MUST BE LOADED AFTER kotlin.js AND wetfe.js
*/
if (typeof wetfe === 'undefined') {
    throw new Error("Error loading script 'character-manager.js'. Its dependency 'wetfe' was not found. Please, check whether 'wetfe' is loaded prior to 'encounter.js'.");
}

let charaMap = {};
let character = null; // the current character

const CORE = wetfe.wetfe.core;
const QuadStat = CORE.character.QuadStat;
const CoreParam = CORE.character.CoreParam;
const StateParam = CORE.character.StateParam;
const StatMode = CORE.character.StatMode;
const Attribute = CORE.character.Attribute;
const CharaData = CORE.character.CharaData;
const Character = CORE.character.Character;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setEditMode(on) {
    if (on) {
        $('.we-edit-mode').removeClass('d-none');
        $('#edit-mode-btn').addClass('d-none');
    } else {
        $('.we-edit-mode').addClass('d-none');
        $('#edit-mode-btn').removeClass('d-none');
    }
    const $form = $('#we-chara-edit-form');
    $form.empty();
    Object.getOwnPropertyNames(character.cdata_wnkotf$_0).forEach(function(p) {
        const v = character.cdata_wnkotf$_0[p];
        if (v === null) return;
        if (typeof v === 'string') {
            const newId = 'we-chara-field-text-' + p;
            const $newField = $('.we-chara-edit-text.we-clone-element').clone();
            $newField.children('label').attr('for', newId).text(p);
            $newField.children('div').children('textarea').attr('id', newId).text(v);
            $newField.removeClass('we-clone-element d-none').appendTo($form);
        } else {
            console.log(`TODO: handle character field "${p}" of type "${typeof v}"`)
        }
    });
}

function toggleEditModeNavSpan() {
    var $emns = $('#edit-mode-nav-span');
    if ($emns.is('.d-none')) $emns.removeClass('d-none');
    else $emns.addClass('d-none');
}

function toggleEditMode() {
    var $em_elements = $('.we-edit-mode');
    if ($em_elements.is('.d-none')) $em_elements.removeClass('d-none');
    else $em_elements.addClass('d-none');
}

function INC(k, n, is_state) {
    if (typeof is_state === 'undefined' || is_state === null) is_state = isSTATE(k);
    var data_prefix = is_state  ? 'data-state-' : 'data-param-';
    var val = is_state ? STATE[k](character) : CHAR[k](character);
    if (typeof val === 'number') {
        var max = MAX(k);
        var wal = BOUND(k, val + n);
        if (wal === val) return;
        if (is_state) {
            STATE[k](character, wal);
        } else {
            var mod = {
                type: "FREE EDIT",
                level: CHAR.LVL(character),
                val: (wal - val)
            };
            CHAR[k](character, mod);
            if (wal >= 0 && wal < NATURES.length) $('.we-nature[data-nature-of="' + k + '"]').html(NATURES[wal]);
        }
        $('[' + data_prefix + 'key="' + k + '"]').html(wal);
        var $linked_pbars = $('.progress-bar[' + data_prefix + 'link="' + k + '"]');
        if ($linked_pbars.length > 0 && isPOS(max)) $linked_pbars.css('width', '' + (100*wal/max).toFixed(0) + '%');
    }
}

function increment(element, n) {
    if (!character) return;
    if (typeof n !== 'number') n = 1;
    var $element = $(element);
    var is_state = $element.is('.we-state-change');
    var key = is_state ? $element.attr('data-state-target') : $element.attr('data-param-target');
    return INC(key, n, is_state);
}

function decrement(element, n) {
    if (typeof n !== 'number') n = 1;
    increment(element, -n);
}

function DEC(k, n, is_state) {
    INC(k, -n, is_state);
}

function reallocate(src_key, dst_key, n) {
    if (!(character && character.state)) return;
    if (!src_key && !dst_key) return;
    if (typeof n !== 'number') n = 1;
    if (n < 1) return;
    if (typeof src_key === 'string') {
        var src_val = STATE[src_key](character);
        if (src_val < 1) return;
        if (n > src_val) n = src_val;
        DEC(src_key, n, true);
    }
    if (typeof dst_key === 'string') {
        INC(dst_key, n, true);
    }
}

function takeDamage(n) {
    reallocate('HEL', 'DMG', n);
}

function healDamage(n) {
    reallocate('DMG', 'HEL', n);
}

function accumulateFatigue(src_key, n) {
    if (typeof src_key !== 'string') src_key = 'HEL';
    reallocate(src_key, 'FTG', n);
}

function restoreFatigue(n) {
    reallocate('FTG', 'HEL', n);
}

function showCharPicker() {
    $('.we-char-picker').removeClass('d-none');
}

function hideCharPicker() {
    $('.we-char-picker').addClass('d-none');
}

function drawLoadingHud(msg) {
    hideCharPicker();
    $('.we-loading-spinner').addClass('fa-spin');
    $('.we-loading-txt').html(msg);
    $('.we-loading-hud').removeClass('d-none');
}

function clearLoadingHud() {
    $('.we-loading-spinner').removeClass('fa-spin');
    $('.we-loading-hud').addClass('d-none');
    showCharPicker();
}

var $char_dditem_ce = null;
function addCharDropdownItem(char) {
    if ($char_dditem_ce === null) $char_dditem_ce = $('.we-char-dditem.we-clone-element');
    $char_dditem_ce.clone()
        .attr('data-chara-id', char.getId())
        .removeClass('we-clone-element d-none')
        .html(char.getName())
        .appendTo('.we-char-ddmenu');
}

function repopulateCharDropdown() {
    $('.we-char-ddmenu>.we-char-dditem').remove();
    if (Array.isArray(CHARS)) {
        for (var char of CHARS) {
            addCharDropdownItem(char);
        }
    }
}

// function onCharacterCreated(char) {
//     STATE.newState(char.data);
//     console.log('[PCMScript::onCharacterCreated] INFO: Created character "' + char.getId() + '"');
//     addCharacter(char);
//     clearLoadingHud();
//     $('.we-char-dditem[data-chara-id="' + char.getId() + '"]').click();
// }

// function createCharacter(element) {
//     drawLoadingHud('Creating New Character');
//     google.script.run.withSuccessHandler(onCharacterCreated).createCharacter();
// }

function createCharacter(element) {
        let newCharacter = new Character();
        console.log('[character-manager.js] INFO: Created character "' + newCharacter.getId() + '"');
        addCharacter(newCharacter);
        $('.we-character-name').text(newCharacter.getName());
        $('.we-char-dditem[data-chara-id="' + newCharacter.getId() + '"]').click();
}

function onDataSaved() {
    setEditMode(false);
    clearLoadingHud();
    $('#navbar-toggler').click();
}

function saveCurrentData() {
    if (!character) return;
    // drawLoadingHud('Saving Character');
    console.log(`TODO: Save the following string of character data:\n${JSON.stringify(character)}`)
}

function addCharacter(char) {
    if (!char) {
        console.error('[character-manager.js] ERROR: The given character was null.');
        return;
    }
    if (!charaMap || typeof charaMap !== 'object') charaMap = {};
    charaMap[char.getId()] = char;
    addCharDropdownItem(char);
}

function drawCharacter() {
    if (!character) return;
    $('.we-character-name').html(character.getFullName());
    for (let cparam of CoreParam.values()) {
        let val = character.getParam_qosqn7$(cparam);
        let pk = cparam.key;
        console.log(`Drawing character core param ${pk} with val of ${val}`);
        $('[data-param-key="' + pk + '"]').html(val);
        if (typeof val === 'number') {
            let $linked_pbars = $('.progress-bar[data-param-link="' + pk + '"]');
            if ($linked_pbars.length > 0) {
                let max = Attribute.Limit.Companion.of_qosqn7$(cparam).max;
                if (max > 0) $linked_pbars.css('width', '' + (100*val/max).toFixed(0) + '%');
            }
            let $natures = $('.we-nature[data-nature-of="' + pk + '"]');
            if ($natures.length > 0) {
                $natures.html(Attribute.Assessment.Companion.of_za3lpa$(val));
            }
        }
    }
    for (let sparam of StateParam.values()) {
        let val = character.getParam_alacmf$(sparam);
        let sk = sparam.key;
        console.log(`Drawing character state param ${sk} with val of ${val}`);
        $('[data-state-key="' + sk + '"]').html(val);
        let $linked_pbars = $('.progress-bar[data-state-link="' + sk + '"]');
        if ($linked_pbars.length > 0) {
            let max = Attribute.Limit.Companion.of_alacmf$(sparam);
            if (max > 0) $linked_pbars.css('width', '' + (100*val/max).toFixed(0) + '%');
        }
    }
}

function selectCharacter(element) {
    $cdditem = $(element);
    const cid = $cdditem.attr('data-chara-id');
    if (typeof cid !== 'string') {
        console.log('[character-manager.js] ERROR: char dditem missing attribute "data-chara-id"');
        return;
    }
    character = new Character(clone(charaMap[cid]).cdata_wnkotf$_0);
    if (!character) {
        console.log('[character-manager.js] ERROR: Unable to lookup character with id "' + cid + '"');
        return;
    }
    drawCharacter();
}

// function onDataLoaded(chars) {
//     CHARS = [];
//     if (Array.isArray(chars)) {
//         for (var c of chars) {
//             addCharacter(c);
//         }
//     }
//     clearLoadingHud();
//     //$('#data-serialization-text').val(JSON.stringify(CHARS));
// }

// function loadData() {
//     google.script.run.withSuccessHandler(onDataLoaded).getCharacters();
// }

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


///

// CHARACTER OPERATORS
// const PARAM_KEYS = Object.freeze([
//     "LVL", "EXP", "SP", "CON", "DEX", "INT", "WIL"
// ]);
//
// function isPARAM(key) {
//     return PARAM_KEYS.includes(key);
// }

///



// CHARACTER STATE OPERATORS
// const STATE_KEYS = Object.freeze([
//     "CDN", "PWR", "HEL", "BRK", "DMG", "AFL", "FTG"
// ]);
//
// function isSTATE(key) {
//     return STATE_KEYS.includes(key);
// }
//
// function newState(cdata) {
//     cdata.state = {
//         condition: "NORMAL",
//         power: 0,
//         //health: CHAR.SP(cdata), //TODO: subtract soulbound chips
//         breakage: 0,
//         damage: 0,
//         affliction: 0,
//         fatigue: 0
//     };
// }
