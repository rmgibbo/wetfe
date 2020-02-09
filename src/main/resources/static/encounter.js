/*
 * !THIS FILE MUST BE LOADED AFTER kotlin.js AND wetfe.js
 */
if (typeof wetfe === 'undefined') {
    throw new Error("Error loading script 'encounter.js'. Its dependency 'wetfe' was not found. Please, check whether 'wetfe' is loaded prior to 'encounter.js'.");
}

let data = null;
let unselected_hidden = true;

const CORE = wetfe.wetfe.core;
const QuadStat = CORE.character.QuadStat;
const CoreParam = CORE.character.CoreParam;
const CharaData = CORE.character.CharaData;
const Encounter = CORE.encounter.Encounter;
const EncounterType = CORE.encounter.EncounterType;
const ParticipantStatus = CORE.encounter.ParticipantStatus;
const CharacterParticipant = CORE.encounter.CharacterParticipant;

let encounter = new Encounter(EncounterType.COMBAT);

const StateCondition = CORE.character.StateCondition;
const condition_map = {
    'NORMAL': { icon: 'd-none', tooltip: '= Normal' },
    'BLITZING': { icon: 'fa-bolt', tooltip: '! Blitzing' },
    'TURTLING': { icon: 'fa-chess-rook', tooltip: '@ Turtling' },
    'CHANNELING': { icon: 'fa-hat-wizard', tooltip: '^ Channeling' },
    'STAGGERED': { icon: 'fa-haykal', tooltip: '$ Staggered' },
    'UNCONSCIOUS': { icon: 'fa-dizzy', tooltip: '* Unconscious' },
    'COMATOSE': { icon: 'fa-user-injured', tooltip: '~ Comatose' },
    'DEAD': { icon: 'fa-skull', tooltip: '_ Dead' }
};

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function focusKeyModListener() {
    if (!$('#key-mod-muter-input').is(':checked')) {
        $('#key-mod-listener').click();
    }
}

function setTpi(i) {
    encounter.targetParticipantIndex = i;
    let targetKey = encounter.getTargetParticipant().key;

    // update participant toolbar
    let $cur_tbtn = $('.we-target-pbtn');
    $cur_tbtn.removeClass('we-target-pbtn').addClass('we-unselected-pbtn');
    let $new_tbtn = $('.we-pbtn[data-pkey="' + targetKey + '"]');
    $new_tbtn.removeClass('we-unselected-prow').addClass('we-target-pbtn');

    // update participant table
    let $cur_tprow = $('.we-target-prow');
    $cur_tprow.removeClass('we-target-prow').addClass('we-unselected-prow');
    if (unselected_hidden) $cur_tprow.addClass('d-none');
    let $new_tprow = $('.we-prow[data-pkey="' + targetKey + '"]');
    $new_tprow.removeClass('we-unselected-prow d-none').addClass('we-target-prow');
}

function addPlayerParticipant(pmk) {
    let cdata = data.playermap[pmk];
    if (cdata) {
        const participant = new CharacterParticipant(cdata);
        encounter.addParticipant_qgd5te$(participant);
        $('.we-player-dditem[data-playermap-key="' + pmk + '"]').addClass('d-none');
    }
}

function addBeingState(bmk) {
    const cdata = data.beingmap[bmk];
    if (cdata) {
        const participant = new CharacterParticipant(clone(cdata));
        encounter.addParticipant_qgd5te$(participant);
    }
}

function addPlayerParticipants(element) {
    if (!data || !data.playermap) return;
    let pmk = (typeof element === 'string') ? element :
        element.getAttribute('data-playermap-key');
    if (pmk === '*') {
        Object.keys(data.playermap).forEach(function(k) {
            addPlayerParticipant(k);
        });
    } else {
        addPlayerParticipant(pmk);
    }
    drawParticipantsTable();
}

function addBeingParticipant(element) {
    if (!data || !data.beingmap) return;
    const bmk = (typeof element === 'string') ? element : element.getAttribute('data-beingmap-key');
    addBeingState(bmk);
    drawParticipantsTable();
}

function removeParticipant(element) {
    const $prow = $(element).parents('tr');
    const pkey = $prow.attr('data-pkey');
    const max = encounter.participantOrder.length;
    for (let i = 0; i < max; ++i) {
        let participant = encounter.participantOrder[i];
        if (participant.key === pkey) {
            if (participant.status === ParticipantStatus.FRIEND) {
                $('.we-player-dditem[data-playermap-key="' + participant.getId() + '"]').removeClass('d-none');
            }
            if (encounter.activeParticipantIndex === (max - 1)) {
                encounter.activeParticipantIndex--;
            }
            encounter.targetParticipantIndex = encounter.activeParticipantIndex;
            encounter.participantOrder.splice(i, 1);
            drawParticipantsTable();
            break;
        }
    }
}

function toggleUnselectedParticipants() {
//var $unselected_prows = $('.we-unselected-prow');
    const $unselected_prows = $('.we-prow').not('.we-clone-element, .we-target-prow');
    const num_unselected = $unselected_prows.length;
    if (unselected_hidden) {
        $unselected_prows.removeClass('d-none');
        unselected_hidden = false;
    } else {
        $unselected_prows.addClass('d-none');
        unselected_hidden = true;
    }
    $('.we-part-toggle-btn-txt')
        .html((unselected_hidden ? 'Show ' : 'Hide ') + ('(' + num_unselected + ')'))
        .siblings('i').removeClass('fa-eye-slash fa-eye')
        .addClass(unselected_hidden ? 'fa-eye' : 'fa-eye-slash');
    focusKeyModListener();
}

function drawParticipantState($prow, participant) {
    $prow.find('[data-pstate-key="health"]').html(participant.getHealth());
    $prow.find('[data-pstate-key="damage"]').html(participant.getDamage());
    $prow.find('[data-pstate-key="fatigue"]').html(participant.getFatigue());
    $prow.find('[data-pstate-key="power"]').html(participant.getPower());
    $prow.find('[data-pstate-key="affliction"]').html(participant.getAffliction());
    $prow.find('[data-pstate-key="trauma"]').html(participant.getTrauma());
    $prow.find('[data-pstate-key="momentum"]').html(participant.getMomentum());
    drawCoreAttributes($prow, participant);
    drawCondition($prow, participant.getCondition());
}

// function incrementPartParam($prow, pstate, key, val) {
//     if (typeof val !== 'number') val = 1;
//     pstate[key] += val;
//     $prow.find('[data-pstate-key="' + key + '"]').html(pstate[key]);
// }
//
// function decrementPartParam($prow, pstate, key, val) {
//     if (typeof val !== 'number') val = 1;
//     incrementPartParam($prow, pstate, key, (-1 * val));
// }

function getFaClasses(i, str) {
    const classes = str.split(' ');
    let fa_classes = 'd-none';
    for (let c of classes) {
        if (c.indexOf('fa-') === 0) {
            fa_classes += (' ' + c);
        }
    }
    return fa_classes;
}

function drawCondition($prow, condition) {
    const c = condition_map[condition.name$] || {icon: '', tooltip: '? Unknown Condition'};
    $prow.find('.we-prow-condition-i')
        .removeClass(getFaClasses)
        .addClass(c.icon)
        .attr('title', c.tooltip);
}

function addPartCondition($prow, participant, condition) {
    participant.applyCondition_jwjpbp$(condition);
    drawCondition($prow, condition);
}

function gainPower($prow, participant, qty) {
    participant.gainPower_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function consumePower($prow, participant, qty) {
    participant.consumePower_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function sustainAffliction($prow, participant, qty) {
    participant.sustainAffliction_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function fulminate($prow, participant) {
    participant.fulminate();
    drawParticipantState($prow, participant);
}

function cureAffliction($prow, participant, qty) {
    participant.cureAffliction_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function sufferTrauma($prow, participant, qty) {
    participant.sufferTrauma_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function alleviateTrauma($prow, participant, qty) {
    participant.alleviateTrauma_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function takeDamage($prow, participant, qty) {
    participant.takeDamage_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function healDamage($prow, participant, qty) {
    participant.healDamage_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function accumulateFatigue($prow, participant, qty) {
    participant.accumulateFatigue_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function restoreFatigue($prow, participant, qty) {
    participant.restoreFatigue_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function modifyCoreAttribute($prow, participant, mod, qstat) {
    if (mod === '+') {
        participant.enhanceMode_f4ewii$(qstat);
    } else if (mod === '-') {
        participant.enfeebleMode_f4ewii$(qstat);
    } else if (mod === '=') {
        participant.normalizeMode_f4ewii$(qstat);
    } else {
        console.log('[EncScript] ERROR: Unable to modify core attribute by mod "' + mod + '"');
        return;
    }
    drawParticipantState($prow, participant);
}

function flowMomentum($prow, participant, qty) {
    participant.flowMomentum_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function ebbMomentum($prow, participant, qty) {
    participant.ebbMomentum_za3lpa$(qty);
    drawParticipantState($prow, participant);
}

function modifyParticipant(qty, param) {
    const $prow = $('.we-target-prow');
    //TODO: Loop through all $prow elements and modify each backing participant
    const pkey = $prow.attr('data-pkey');
    if (!encounter || !encounter.participants || !pkey) return;
    const participant = encounter.getParticipant_61zpoe$(pkey);
    let updated = false;
    if (participant) {
        updated = true;
        switch (param) {
            case "flow":
                flowMomentum($prow, participant, qty);
                break;
            case "ebb":
                ebbMomentum($prow, participant, qty);
                break;
            case "power":
                gainPower($prow, participant, qty);
                break;
            case "consumption":
                consumePower($prow, participant, qty);
                break;
            case "affliction":
                sustainAffliction($prow, participant, qty);
                break;
            case "cure":
                cureAffliction($prow, participant, qty);
                break;
            case "damage":
                takeDamage($prow, participant, qty);
                break;
            case "healing":
                healDamage($prow, participant, qty);
                break;
            case "trauma":
                sufferTrauma($prow, participant, qty);
                break;
            case "alleviation":
                alleviateTrauma($prow, participant, qty);
                break;
            case "fatigue":
                accumulateFatigue($prow, participant, qty);
                break;
            case "restoration":
                restoreFatigue($prow, participant, qty);
                break;
            case "con":
            case "dex":
            case "int":
            case "wil":
                modifyCoreAttribute($prow, participant, qty, param);
                break;
            case "blitzing":
                addPartCondition($prow, participant, StateCondition.BLITZING);
                break;
            case "turtling":
                addPartCondition($prow, participant, StateCondition.TURTLING);
                break;
            case "channeling":
                addPartCondition($prow, participant, StateCondition.CHANNELING);
                break;
            default:
                updated = false;
                break;
        }
    }

    if (!updated) {
        console.log('[EncScript::modifyParticipant] WARN: Failed to modify participant-key "' + pkey + '" with "' + qty + ' ' + param + '". Participant=\n'+JSON.stringify(participant)+'\n----\npartmap keys=\n'+JSON.stringify(Object.keys(encounter.participants)));
    }
}

function populatePlayerDropdown() {
    if (data.playermap && typeof data.playermap === 'object') {
        $('.we-player-dditem').not('.we-clone-element').remove();
        Object.keys(data.playermap).forEach(function(pmk) {
            const p = data.playermap[pmk];
            $('.we-player-dditem.we-clone-element').clone()
                .attr('data-playermap-key', pmk)
                .removeClass('we-clone-element d-none')
                .html(p.commonName)
                .appendTo('.we-player-ddmenu');
        });
    }
}

function populateBeingDropdown() {
    if (data.beingmap && typeof data.beingmap === 'object') {
        $('.we-being-dditem').not('.we-clone-element').remove();
        Object.keys(data.beingmap).forEach(function(bmk) {
            const b = data.beingmap[bmk];
            $('.we-being-dditem.we-clone-element').clone()
                .attr('data-beingmap-key', bmk)
                .removeClass('we-clone-element d-none')
                .html(b.commonName)
                .appendTo('.we-being-ddmenu');
        });
    }
}

function updateTurnButton() {
    const $active = $('.we-active-prow');
    let btn_html = 'ERR';
    if (encounter.round > 0 && $active.length > 0) {
        // const pkey = $active.attr('data-pkey');
        btn_html = 'End ' + encounter.getActiveParticipant().getName() + '\'s Turn';
        if (encounter.activeParticipantIndex === (encounter.participantOrder.length - 1)) {
            btn_html += '&nbsp;&nbsp;(Begin Round ' + (encounter.round + 1) + ')';
        }
    } else {
        btn_html = 'Begin Round 1';
    }
    $('#next-turn-btn').children('span').html(btn_html);
}

function drawParticipantToolbar() {
    $('.we-part-toggle-btn-txt')
        .html((unselected_hidden ? 'Show ' : 'Hide ') + ('(' + $('.we-unselected-prow').length + ')'))
        .siblings('i').addClass(unselected_hidden ? 'fa-eye' : 'fa-eye-slash');
    const $part_buttons = $('.we-pbtngrp');
    $part_buttons.empty();
    for (let i = 0; i < encounter.participantOrder.length; ++i) {
        let participant = encounter.participantOrder[i];
        let $pbtn = $('.we-pbtn.we-clone-element').clone()
            .attr('data-pkey', participant.key)
            .removeClass('we-clone-element d-none')
            .addClass('we-' + participant.status.name + '-btn');
        if (i === encounter.activeParticipantIndex) $pbtn.addClass('we-active-pbtn');
        if (i === encounter.targetParticipantIndex) $pbtn.addClass('we-target-pbtn');
        $pbtn.children('.we-pbtn-txt').html(participant.key);
        $pbtn.appendTo($part_buttons);
    }
}

function getModeKey(participant, qstat) {
    return participant.getMode_f4ewii$(qstat).key;
}

function getCoreVal(participant, param) {
    return participant.getCoreParam_qosqn7$(param);
}

function drawCoreAttributes($prow, participant) {
    $prow.find('.we-prow-con')
        .attr('data-attr-state', participant.getConMode().key)
        .html(getCoreVal(participant, CoreParam.CONSTITUTION));
    $prow.find('.we-prow-dex')
        .attr('data-attr-state', participant.getDexMode().key)
        .html(getCoreVal(participant, CoreParam.DEXTERITY));
    $prow.find('.we-prow-int')
        .attr('data-attr-state', participant.getIntMode())
        .html(getCoreVal(participant, CoreParam.INTELLIGENCE));
    $prow.find('.we-prow-wil')
        .attr('data-attr-state', participant.getWilMode())
        .html(getCoreVal(participant, CoreParam.WILLPOWER));
}

function drawParticipantsTable() {
    if (!Array.isArray(encounter.participantOrder)) {
        return;
    }
    const $parts_tbody = $('.we-ptbody');
    $parts_tbody.empty();
    for (let i = 0; i < encounter.participantOrder.length; ++i) {
        let participant = encounter.participantOrder[i];
        let $prow = $('.we-prow.we-clone-element').clone()
            .attr('data-pkey', participant.key)
            .removeClass('we-clone-element d-none');

        if (i === encounter.activeParticipantIndex) {
            $prow.addClass('we-active-prow');
        }
        if (i === encounter.targetParticipantIndex) {
            $prow.addClass('we-target-prow');
        } else {
            $prow.addClass('we-unselected-prow' + (unselected_hidden ? ' d-none' : ''));
        }

        $prow.children('.we-prow-order')
            .attr('title', participant.initiative.toFixed(2))
            .html(i + 1);
        $prow.find('.we-prow-momentum').html(participant.getMomentum());
        $prow.find('.we-prow-name').html(participant.getName());
        $prow.find('.we-prow-power').html(participant.getPower());
        $prow.find('.we-prow-health').html(participant.getHealth());
        $prow.find('.we-prow-affliction').html(participant.getAffliction());
        $prow.find('.we-prow-damage').html(participant.getDamage());
        $prow.find('.we-prow-trauma').html(participant.getTrauma());
        $prow.find('.we-prow-fatigue').html(participant.getFatigue());
        $prow.find('.we-prow-pool').html(participant.getSoulpool());
        $prow.find('.we-prow-stagger').html(participant.getStaggerThreshold() > 0 ? participant.getStaggerThreshold() : '');
        $prow.find('.fa-trash').parent().removeClass('d-none');
        drawCondition($prow, participant.getCondition());
        drawCoreAttributes($prow, participant);

        $prow.appendTo($parts_tbody);
    }
    drawParticipantToolbar();
    updateTurnButton();
}

function onNameSearch(e) {
    $('#name-search-add-btn').html('NO!');
}

function createCharaData(entity) {
    const cd = new CharaData();
    entity.property;
    Object.getOwnPropertyNames(entity).forEach(function(p) {
        if (cd.hasOwnProperty(p)) {
            cd[p] = entity[p];
        }
    });

    return cd;
}

function onFileLoad(event) {
    const json = JSON.parse(event.target.result);
    if (!json) return;
    const entities = Array.isArray(json) ? json : [json];
    for (let i = 0; i < entities.length; ++i) {
        let entity = entities[i];
        if (!entity || !entity.id) continue;
        let datamap = (entity.source === 'PLAYER') ? data.playermap : data.beingmap;
        if (!datamap[entity.id]) {
            console.log(`Loading character data for [${entity.id}]`);
            datamap[entity.id] = createCharaData(entity);
        }
    }
}

function onFileLoadEnd(event) {
    console.log(`Finished loading all data files.`);
    populatePlayerDropdown();
    populateBeingDropdown();
    $('#num-loaded-players').html(data.playermap ? Object.keys(data.playermap).length : 'ERR');
    $('#num-loaded-beings').html(data.beingmap ? Object.keys(data.beingmap).length : 'ERR');
    $('#data-serialization-text').val(JSON.stringify(data));
}

function onDataFilesChanged(event) {
    const files = event.target.files; // FileList object
    const n = files.length;
    if (n > 0) {
        if (!data) {
            data = {playermap: {}, beingmap: {}};
        }

        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.onloadend = onFileLoadEnd;

        const $label = $('#load-data-input-label');
        const label = $label.html().split(' &bull; ');
        for (let i = 0; i < n; ++i) {
            let f = files[i];
            reader.readAsText(f);
            console.log("file #" + i + ": " + f.name);
            label.push(f.name);
        }
        $label.html(label.join(' &bull; '));
    }
}

function selectParticipant(element) {
    const pkey = $(element).attr('data-pkey');
    for (let i = 0; i < encounter.participantOrder.length; ++i) {
        if (encounter.participantOrder[i].key === pkey) {
            setTpi(i);
            break;
        }
    }
    focusKeyModListener();
}

function activateNextParticipant() {
    if (!Array.isArray(encounter.participantOrder) || encounter.participantOrder.length < 1) {
        console.log('WTF happened to the participant order list?')
        return;
    }

    // END-OF-TURN BOOKKEEPING
    for (let i = 0; i < encounter.participantOrder.length; ++i) {
        let participant = encounter.participantOrder[i];
        if (participant.isTapped()) {
            participant.setPower_za3lpa$(0);
            participant.untap();
        }
        if (participant.getCondition().key === StateCondition.STAGGERED) {
            participant.forceCondition_jwjpbp$(StateCondition.NORMAL);
        }
    }

    encounter.activeParticipantIndex++;
    if (encounter.activeParticipantIndex >= encounter.participantOrder.length || encounter.round === 0) {
        encounter.startNewRound();
    }
    if (encounter.activeParticipantIndex < 0) encounter.activeParticipantIndex = 0;
    encounter.targetParticipantIndex = encounter.activeParticipantIndex;

    // START-OF-TURN BOOKKEEPING
    let participant = encounter.getActiveParticipant();
    if (participant.getCondition() === StateCondition.BLITZING ||
        participant.getCondition() === StateCondition.TURTLING) {
        participant.forceCondition_jwjpbp$(StateCondition.NORMAL);
    }
    if (participant.getCondition() === StateCondition.CHANNELING) {
        participant.forceCondition_jwjpbp$(StateCondition.NORMAL);
        participant.gainPower_za3lpa$(participant.health);
    }

    drawParticipantsTable();
    focusKeyModListener();
}

function resetParticipantList() {
    encounter = new Encounter(EncounterType.COMBAT);
    $('[data-pkey]').removeClass('d-none');
    unselected_hidden = true;
    drawParticipantsTable();
}

function onClickKeyModBtn(element) {
    const $clicked_element = $(element);
    if ($clicked_element.is('#key-mod-listener')) {
        const $muter = $('#key-mod-muter');
        $clicked_element.removeClass('btn-outline-success').addClass('btn-success active')
            .children('input').prop('checked', true);
        $muter.removeClass('btn-dark active').addClass('btn-outline-dark')
            .children('input').prop('checked', false);
    } else {
        const $listener = $('#key-mod-listener');
        $listener.removeClass('btn-success active').addClass('btn-outline-success')
            .children('input').prop('checked', false);
        $clicked_element.removeClass('btn-outline-dark').addClass('btn-dark active')
            .children('input').prop('checked', true);
    }
}

const keymodmap = {
    // Momentum
    "m": "flow",
    "M": "ebb",

    /* Chips & Deques */
    // Health[]
    "p": "power",
    "P": "consumption",
    "c": "consumption",
    // Damage[]
    "a": "affliction",
    "A": "cure",
    "u": "cure",
    "d": "damage",
    "h": "healing",
    // Fatigue[]
    "t": "trauma",
    "T": "alleviation",
    "v": "alleviation",
    "f": "fatigue",
    "F": "restoration",
    "r": "restoration",

    // Core Attributes
    "D": "dex",
    "C": "con",
    "I": "int",
    "W": "wil",

    // Conditions
    "!": "blitzing",
    "@": "turtling",
    "^": "channeling"
};

let modcache = null;

function resetModCache() {
    if (!modcache) modcache = {};
    modcache.qty = 0;
    modcache.param = null;
    modcache.submitted = false;
}

function onKeyup(event) {
    //console.log('Received KEY_UP event: "'+event.key+'" (altKey='+event.altKey+', shiftKey='+event.shiftKey+', ctrlKey='+event.ctrlKey+')');
    event.preventDefault();
    const k = event.key;
    let updated = true;
    switch (k) {
        case "Escape":
        case "Backspace":
            resetModCache();
            break;
        case "Enter":
            //TODO: What should this do?
            break;
        case " ":
            resetModCache();
            if (event.shiftKey) {
                //TODO: What should this do?
            } else {
                $('#next-turn-btn').click();
            }
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (modcache.submitted || (typeof modcache.qty !== 'number')) {
                resetModCache();
            }
            modcache.qty *= 10;
            modcache.qty += parseInt(k, 10);
            break;
        case "p":
        case "P":
        case "c":
        case "b":
        case "B":
        case "k":
        case "K":
        case "d":
        case "h":
        case "a":
        case "A":
        case "e":
        case "f":
        case "F":
        case "r":
        case "m":
        case "M":
            if (modcache.submitted) {
                resetModCache();
            }
            if (typeof modcache.qty !== 'number') {
                resetModCache();
                break;
            }
            if (modcache.qty < 1) modcache.qty = 1;
            modcache.param = keymodmap[k];
            modifyParticipant(modcache.qty, modcache.param);
            modcache.submitted = true;
            break;
        case "C":
        case "D":
        case "I":
        case "W":
            if (modcache.submitted || (typeof modcache.qty === 'number')) {
                modcache.qty = 'normalize';
            }
            modcache.param = keymodmap[k];
            modifyParticipant(modcache.qty, modcache.param);
            modcache.submitted = true;
            break;
        case "+":
        case "=":
            resetModCache();
            modcache.qty = "+";
            break;
        case "-":
        case "_":
            resetModCache();
            modcache.qty = "-";
            break;
        case "!":
        case "@":
        case "^":
            modcache.qty = 'condition';
            modcache.param = keymodmap[k];
            modifyParticipant(modcache.qty, modcache.param);
            modcache.submitted = true;
            break;
        case ",":
            setTpi(encounter.targetParticipantIndex - 1);
            break;
        case "<":
            setTpi(0);
            break;
        case ".":
            setTpi(encounter.targetParticipantIndex + 1);
            break;
        case ">":
            setTpi(encounter.participantOrder.length - 1);
            break;
        case "/":
        case "?":
            setTpi(encounter.activeParticipantIndex);
            break;
        default:
            updated = false;
            break;
    }
    if (updated) {
        drawKeyModCache();
    }
}

function drawKeyModCache() {
    $('#key-mod-qty').html(modcache.qty ? modcache.qty : ' ');
    $('#key-mod-param').html(modcache.param ? modcache.param : ' ');
}

$(function () {
    resetModCache();
    $('[data-toggle="tooltip"]').tooltip();
    $('#key-mod-listener-input').keyup(onKeyup);
    $('#load-data-input').change(onDataFilesChanged);
});
