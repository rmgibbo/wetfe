var data = null; // data loaded from the cloud: player, being, etc.
// var encdata = {}; // encounter data, webapp state info
// var round = 0; // current round number
// var api = 0; // active participant index (in encdata.parts)
// var tpi = 0; // target participant index (in encdata.parts)
var unselected_hidden = true;

let encounter = new Encounter(EncounterType.COMBAT);

// var condition_map = {
//     'NORMAL': { key: 'NORMAL', priority: 0, class: 'd-none', tooltip: '' },
//     'BLITZING': { key: 'BLITZING', class: 'fa-bolt', priority: 30, tooltip: 'Blitzing' },
//     'TURTLING': { key: 'TURTLING', class: 'fa-chess-rook', priority: 30, tooltip: 'Turtling' },
//     'CHANNELING': { key: 'CHANNELING', class: 'fa-hat-wizard', priority: 30, tooltip: 'Channeling' },
//     'STAGGERED': { key: 'STAGGERED', priority: 70, class: 'fa-haykal', tooltip: 'Staggered' },
//     'UNCONSCIOUS': { key: 'UNCONSCIOUS', priority: 80, class: 'fa-dizzy', tooltip: 'Unconscious' },
//     'COMATOSE': { key: 'COMATOSE', priority: 90, class: 'fa-user-injured', tooltip: 'Comatose' },
//     'DEAD': { key: 'DEAD', class: 'fa-skull', priority: 100, tooltip: 'Dead' }
// };

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

    // update particpant toolbar
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

// function getParticipantKey(name) {
//     if (!encdata.keymap) encdata.keymap = {};
//     var tmap = encdata.keymap;
//     var n = name;
//     var t = n.charAt(0) + n.charAt(1) + n.charAt(2);
//     if (!t) t = 'Unk';
//     if (!tmap[t]) {
//         tmap[t] = 1;
//     } else {
//         var i = ++tmap[t];
//         t = t.substring(0, (i > 9 ? 1 : 2)) + i;
//     }
//     return t;
// }

// function newParticipant(p, k, is_player) {
//     const pstate = {};
//     pstate.k = k; // key into the original data map
//     pstate.key = getParticipantKey(p.short_name); // unique id for this encounter
//     pstate.status = is_player ? 'friend' : 'foe';
//     pstate.init = 0.00;
//     pstate.momentum = 0;
//     pstate.condition = {};
//     pstate.name = p.short_name;
//     pstate.pool = is_player ?
//         (p.soul_pool.base + p.soul_pool.racial + p.soul_pool.class + p.soul_pool.level + p.soul_pool.invested) :
//         (p.soul_pool);
//     pstate.power = 0;
//     pstate.health = pstate.pool; //TODO: minus chips reserved in fonts
//     pstate.break = 0;
//     pstate.damage = 0;
//     pstate.affliction = 0;
//     pstate.fatigue = 0;
//     pstate.stagger = is_player ? null : p.stagger_threshold;
//     for (var a of ['con', 'dex', 'int', 'wil']) {
//         pstate[a] = { state: '' };
//         pstate[a].val = is_player ?
//             (p.core_attributes[a].base + p.core_attributes[a].racial + p.core_attributes[a].class + p.core_attributes[a].invested) :
//             (p.core_attributes[a]);
//     }
//     pstate.consumed = false;
//     return pstate;
// }

function addPlayerParticipant(pmk) {
    let cdata = data.playermap[pmk];
    if (cdata) {
        encounter.addParticipant(new CharacterParticipant(cdata));
        $('.we-player-dditem[data-playermap-key="' + pmk + '"]').addClass('d-none');
    }
}

// function addBeingState(bmk) {
//     var b = data.beingmap[bmk];
//     if (b) {
//         var pstate = newParticipant(b, bmk,false);
//         encdata.parts.push(pstate);
//         encdata.partmap[pstate.key] = pstate;
//     }
// }

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
    drawPartsTable();
}

function addBeingParticipant(element) {
    if (!data || !data.beingmap) return;
    if (!Array.isArray(encdata.parts)) encdata.parts = [];
    if (!encdata.partmap || typeof encdata.partmap !== 'object') encdata.partmap = {};
    var bmk = (typeof element === 'string') ? element : element.getAttribute('data-beingmap-key');
    addBeingState(bmk);
    drawPartsTable();
}

function removeParticipant(element) {
    var $prow = $(element).parents('tr');
    var pkey = $prow.attr('data-pkey');
    var max = encdata.parts.length;
    for (i = 0; i < max; ++i) {
        var pstate = encdata.parts[i];
        if (pstate.key === pkey) {
            if (pstate.status === 'friend') {
                $('.we-player-dditem[data-playermap-key="' + pstate.k + '"]').removeClass('d-none');
            }
            if (api === (max - 1)) api--;
            tpi = api;
            encdata.parts.splice(i, 1);
            drawPartsTable();
            break;
        }
    }
}

function toggleUnselectedParticipants() {
//var $unselected_prows = $('.we-unselected-prow');
    var $unselected_prows = $('.we-prow').not('.we-clone-element, .we-target-prow');
    var num_unselected = $unselected_prows.length;
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
    $prow.find('[data-pstate-key="break"]').html(participant.getBreakage());
    $prow.find('[data-pstate-key="afflication"]').html(participant.getAffliction());
    $prow.find('[data-pstate-key="momentum"]').html(participant.getMomentum());
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
    var classes = str.split(' ');
    var fa_classes = 'd-none';
    for (var c of classes) {
        if (c.indexOf('fa-') === 0) {
            fa_classes += (' ' + c);
        }
    }
    return fa_classes;
}

function drawCondition($prow, condition) {
    $prow.find('.we-prow-condition-i')
        .removeClass(getFaClasses)
        .addClass(condition.class)
        .attr('title', condition.tooltip);
}

function addPartCondition($prow, pstate, ckey, force) {
    var condition = condition_map[ckey];
    if (!condition) {
        console.log('[EncScript] ERROR: Unknown condition key "' + ckey + '"');
        return;
    }
    var ccur = pstate.condition;
    if (ccur.priority > condition.priority) {
        console.log('[EncScript] INFO: The current condition of participant "' + pstate.name +
            '" is higher priority "' + ccur.key + ':' + ccur.priority +
            '" than the given condition "' + condition.key + ':' + condition.priority + '"');
        if (!force) return;
    }
    pstate.condition = condition;
    drawCondition($prow, condition);
}

function gainPower($prow, participant, qty) {
    participant.gainPower(qty);
    drawParticipantState($prow, participant);
}

function consumePower($prow, participant, qty) {
    participant.consumePower(qty);
    drawParticipantState($prow, participant);
}

function sufferBreak($prow, participant, qty) {
    participant.sufferBreak(qty);
    drawParticipantState($prow, participant);
}

function fulminate($prow, participant) {
    participant.fulminate();
    drawParticipantState($prow, participant);
}

function mendBreak($prow, participant, qty) {
    participant.mendBreak(qty);
    drawParticipantState($prow, participant);
}

function contractAffliction($prow, participant, qty) {
    participant.contractAffliction(qty);
    drawParticipantState($prow, participant);
}

function eradicateAffliction($prow, participant, qty) {
    participant.eradicateAffliction(qty);
    drawParticipantState($prow, participant);
}

function takeDamage($prow, participant, qty) {
    participant.takeDamage(qty);
    drawParticipantState($prow, participant);
}

function healDamage($prow, participant, qty) {
    participant.healDamage(qty);
    drawParticipantState($prow, participant);
}

function accumulateFatigue($prow, participant, qty) {
    participant.accumulateFatigue(qty);
    drawParticipantState($prow, participant);
}

function restoreFatigue($prow, participant, qty) {
    participant.restoreFatigue(qty);
    drawParticipantState($prow, participant);
}

function modifyCoreAttribute($prow, pstate, qty, param) {
    if (typeof qty !== 'string' || (qty !== '+' && qty !== '-' && qty !== 'normalize')) {
        console.log('[EncScript] ERROR: Unable to modify core attribute by qty "' + qty + '"');
        return;
    }
    var $attr = $prow.find('[data-pstate-key="' + param + '"]');
    if ($attr.length !== 1) {
        console.log('[EncScript] ERROR: Unable to modify core attribute "' + param + '"');
        return;
    }
    var pattr = pstate[param];
    if (!pattr) {
        console.log('[EncScript] ERROR: Unable to modify core attribute "' + param + '" for participant "' + pstate.name + '"');
        return;
    }
    var enhance = (qty === '+');
    var enfeeble = (qty === '-');
    var attr_state = $attr.attr('data-attr-state');
    if (attr_state === '+') {
        if (enhance) {
            healDamage($prow, pstate, 1);
        } else {
            $attr.attr('data-attr-state', '');
            pattr.state = '';
        }
    } else if (attr_state === '-') {
        if (enfeeble) {
            takeDamage($prow, pstate, 1);
        } else {
            $attr.attr('data-attr-state', '');
            pattr.state = '';
        }
    } else {
        if (enhance) {
            $attr.attr('data-attr-state', '+');
            pattr.state = '+';
        } else if (enfeeble) {
            $attr.attr('data-attr-state', '-');
            pattr.state = '-';
        } else {
            console.log('[EncScript] WARN: Attempting to normalize a core attr in a neutral state: NO-OP.');
        }
    }
}

function flowMomentum($prow, participant, qty) {
    participant.flowMomentum(qty);
    drawParticipantState($prow, participant);
}

function ebbMomentum($prow, participant, qty) {
    participant.ebbMomentum(qty);
    drawParticipantState($prow, participant);
}

function modifyParticipant(qty, param) {
    var $prow = $('.we-target-prow');
    //TODO: Loop through all $prow elements and modify each backing participant
    var pkey = $prow.attr('data-pkey');
    if (!encdata || !encdata.partmap || !pkey) return;
    var pstate = encdata.partmap[pkey];
    var updated = false;
    if (pstate) {
        updated = true;
        switch (param) {
            case "flow":
                flowMomentum($prow, pstate, qty);
                break;
            case "ebb":
                ebbMomentum($prow, pstate, qty);
                break;
            case "power":
                gainPower($prow, pstate, qty);
                break;
            case "consumption":
                consumePower($prow, pstate, qty);
                break;
            case "breakage":
                sufferBreak($prow, pstate, qty);
                break;
            case "mending":
                mendBreak($prow, pstate, qty);
                break;
            case "damage":
                takeDamage($prow, pstate, qty);
                break;
            case "healing":
                healDamage($prow, pstate, qty);
                break;
            case "affliction":
                contractAffliction($prow, pstate, qty);
                break;
            case "eradication":
                eradicateAffliction($prow, pstate, qty);
                break;
            case "fatigue":
                accumulateFatigue($prow, pstate, qty);
                break;
            case "restoration":
                restoreFatigue($prow, pstate, qty);
                break;
            case "con":
            case "dex":
            case "int":
            case "wil":
                modifyCoreAttribute($prow, pstate, qty, param);
                break;
            case "blitzing":
                addPartCondition($prow, pstate, 'BLITZING');
                break;
            case "turtling":
                addPartCondition($prow, pstate, 'TURTLING');
                break;
            case "channeling":
                addPartCondition($prow, pstate, 'CHANNELING');
                break;
            default:
                updated = false;
                break;
        }
    }

    if (!updated) {
        console.log('[EncScript::modifyParticipant] WARN: Failed to modify participant-key "' + pkey + '" with "' + qty + ' ' + param + '". pstate=\n'+JSON.stringify(pstate)+'\n----\npartmap keys=\n'+JSON.stringify(Object.keys(encdata.partmap)));
    }
}

function populatePlayerDropdown() {
    if (data.playermap && typeof data.playermap === 'object') {
        $('.we-player-dditem').not('.we-clone-element').remove();
        Object.keys(data.playermap).forEach(function(pmk) {
            var p = data.playermap[pmk];
            $('.we-player-dditem.we-clone-element').clone()
                .attr('data-playermap-key', pmk)
                .removeClass('we-clone-element d-none')
                .html(p.common_name)
                .appendTo('.we-player-ddmenu');
        });
    }
}

function populateBeingDropdown() {
    if (data.beingmap && typeof data.beingmap === 'object') {
        $('.we-being-dditem').not('.we-clone-element').remove();
        Object.keys(data.beingmap).forEach(function(bmk) {
            var b = data.beingmap[bmk];
            $('.we-being-dditem.we-clone-element').clone()
                .attr('data-beingmap-key', bmk)
                .removeClass('we-clone-element d-none')
                .html(b.common_name)
                .appendTo('.we-being-ddmenu');
        });
    }
}

function onDataLoaded(d) {
    data = d;
    populatePlayerDropdown();
    populateBeingDropdown();
    $('#num-loaded-players').html(data.playermap ? Object.keys(data.playermap).length : 'ERR');
    $('#num-loaded-beings').html(data.beingmap ? Object.keys(data.beingmap).length : 'ERR');
    //$('#data-serialization-text').val(JSON.stringify(data));
}

function startNewRound() {
    api = 0;
    if (!Array.isArray(encdata.parts) || encdata.parts.length < 1) {
        return;
    }
    for (var i = 0; i < encdata.parts.length; ++i) {
        var pstate = encdata.parts[i];
        var x = (typeof pstate.momentum === 'number') ? pstate.momentum : 0;
        var min = 50;
        if (x > 0) {
            min += 50 * (x / (2 + x));
        } else if (x < 0) {
            x = Math.abs(x);
            min -= 50 * (x / (2 + x));
        }
        pstate.init = rand(min, 100);
        pstate.momentum = 0;
    }
    encdata.parts.sort(function(p1, p2) {
        return p2.init - p1.init;
    });
    round++;
    return encdata.parts;
}

function updateTurnButton() {
    var $active = $('.we-active-prow');
    var btn_html = 'ERR';
    if (round > 0 && $active.length > 0) {
        var k = $active.attr('data-pkey');
        btn_html = 'End ' + encdata.parts[api].name + '\'s Turn';
        if (api === (encdata.parts.length - 1)) {
            btn_html += '&nbsp;&nbsp;(Begin Round ' + (round+1) + ')';
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
    var $part_buttons = $('.we-pbtngrp');
    $part_buttons.empty();
    for (var i = 0; i < encdata.parts.length; ++i) {
        var pstate = encdata.parts[i];
        var $pbtn = $('.we-pbtn.we-clone-element').clone()
            .attr('data-pkey', pstate.key)
            .removeClass('we-clone-element d-none')
            .addClass('we-' + pstate.status + '-btn');
        if (i === api) $pbtn.addClass('we-active-pbtn');
        if (i === tpi) $pbtn.addClass('we-target-pbtn');
        $pbtn.children('.we-pbtn-txt').html(pstate.key);
        $pbtn.appendTo($part_buttons);
    }
}

function drawCoreAttributes($prow, pstate) {
    $prow.find('.we-prow-con').attr('data-attr-state', pstate.con.state).html(pstate.con.val);
    $prow.find('.we-prow-dex').attr('data-attr-state', pstate.dex.state).html(pstate.dex.val);
    $prow.find('.we-prow-int').attr('data-attr-state', pstate.int.state).html(pstate.int.val);
    $prow.find('.we-prow-wil').attr('data-attr-state', pstate.wil.state).html(pstate.wil.val);
}

function drawPartsTable() {
    if (!Array.isArray(encdata.parts)) {
        return;
    }
    var $parts_tbody = $('.we-ptbody');
    $parts_tbody.empty();
    for (var i = 0; i < encdata.parts.length; ++i) {
        var pstate = encdata.parts[i];
        if (typeof pstate.init !== 'number') pstate.init = 0.00;
        var $prow = $('.we-prow.we-clone-element').clone()
            .attr('data-pkey', pstate.key)
            .removeClass('we-clone-element d-none');

        if (i === api) $prow.addClass('we-active-prow');
        if (i === tpi) $prow.addClass('we-target-prow');
        else $prow.addClass('we-unselected-prow' + (unselected_hidden ? ' d-none' : ''));

        $prow.children('.we-prow-order')
            .attr('title', pstate.init.toFixed(2))
            .html(i + 1);
        $prow.find('.we-prow-momentum').html(pstate.momentum);
        $prow.find('.we-prow-name').html(pstate.name);
        $prow.find('.we-prow-power').html(pstate.power);
        $prow.find('.we-prow-health').html(pstate.health);
        $prow.find('.we-prow-break').html(pstate.break);
        $prow.find('.we-prow-damage').html(pstate.damage);
        $prow.find('.we-prow-affliction').html(pstate.affliction);
        $prow.find('.we-prow-fatigue').html(pstate.fatigue);
        $prow.find('.we-prow-pool').html(pstate.pool);
        $prow.find('.we-prow-stagger').html(pstate.stagger ? pstate.stagger : '');
        $prow.find('.fa-trash').parent().removeClass('d-none');
        drawCondition($prow, pstate.condition);
        drawCoreAttributes($prow, pstate);

        $prow.appendTo($parts_tbody);
    }
    drawParticipantToolbar();
    updateTurnButton();
}

function onNameSearch(e) {
    $('#name-search-add-btn').html('NO!');
}

function loadData() {
    google.script.run.withSuccessHandler(onDataLoaded).getData();
}

function loadTestData() {
    onDataLoaded(getTestData());
}

function selectParticipant(element) {
    var pkey = $(element).attr('data-pkey');
    for (i = 0; i < encdata.parts.length; ++i) {
        if (encdata.parts[i].key === pkey) {
            setTpi(i);
            break;
        }
    }
    focusKeyModListener();
}

function activateNextParticipant() {
    if (!Array.isArray(encdata.parts) || encdata.parts.length < 1) {
        return;
    }

    // END-OF-TURN BOOKKEEPING
    for (var i = 0; i < encdata.parts.length; ++i) {
        var pstate = encdata.parts[i];
        if (pstate.consumed) {
            pstate.power = 0;
            pstate.consumed = false;
        }
        if (pstate.condition.key === 'STAGGERED') {
            pstate.condition = condition_map['NORMAL'];
        }
    }

    api++;
    if (api >= encdata.parts.length || round === 0) {
        startNewRound();
    }
    if (api < 0) api = 0;
    tpi = api;

    // START-OF-TURN BOOKKEEPING
    pstate = encdata.parts[api];
    if (pstate.condition.key === 'BLITZING' || pstate.condition.key === 'TURTLING') {
        pstate.condition = condition_map['NORMAL'];
    }
    if (pstate.condition.key === 'CHANNELING') {
        pstate.condition = condition_map['NORMAL'];
        pstate.power = Math.min(pstate.pool, (pstate.power + pstate.health));
    }

    drawPartsTable();
    focusKeyModListener();
}

function resetParticipantList() {
    if (!encdata) encdata = {};
    encdata.parts = [];
    encdata.partmap = {};
    encdata.keymap = {};
    round = 0;
    api = 0;
    tpi = 0;
    $('[data-pkey]').removeClass('d-none');
    unselected_hidden = true;
    drawPartsTable();
}

function onClickKeyModBtn(element) {
    var $clicked_element = $(element);
    if ($clicked_element.is('#key-mod-listener')) {
        var $muter = $('#key-mod-muter');
        $clicked_element.removeClass('btn-outline-success').addClass('btn-success active')
            .children('input').prop('checked', true);
        $muter.removeClass('btn-dark active').addClass('btn-outline-dark')
            .children('input').prop('checked', false);
    } else {
        var $listener = $('#key-mod-listener');
        $listener.removeClass('btn-success active').addClass('btn-outline-success')
            .children('input').prop('checked', false);
        $clicked_element.removeClass('btn-outline-dark').addClass('btn-dark active')
            .children('input').prop('checked', true);
    }
}

var keymodmap = {
    // momentum
    "m": "flow",
    "M": "ebb",

    // chips & stack ops
    "p": "power",
    "P": "consumption",
    "c": "consumption",
    "b": "breakage",
    "B": "mending",
    "k": "breakage",
    "K": "mending",
    "d": "damage",
    "h": "healing",
    "a": "affliction",
    "A": "eradication",
    "e": "eradication",
    "f": "fatigue",
    "F": "restoration",
    "r": "restoration",

    // core attributes
    "D": "dex",
    "C": "con",
    "I": "int",
    "W": "wil",

    // conditions
    "!": "blitzing",
    "@": "turtling",
    "#": "channeling"
};

var modcache = null;

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
    var updated = true;
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
        case "#":
            modcache.qty = 'condition';
            modcache.param = keymodmap[k];
            modifyParticipant(modcache.qty, modcache.param);
            modcache.submitted = true;
            break;
        case ",":
            setTpi(tpi - 1);
            break;
        case "<":
            setTpi(0);
            break;
        case ".":
            setTpi(tpi + 1);
            break;
        case ">":
            setTpi(encdata.parts.length - 1);
            break;
        case "/":
        case "?":
            setTpi(api);
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
});
