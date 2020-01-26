var CHARS = null; // character files loaded from user's WETFE/Character folder
var CHARMAP = {};
var CDATA = null; // the data of the current character

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
    var val = is_state ? STATE[k](CDATA) : CHAR[k](CDATA);
    if (typeof val === 'number') {
        var max = MAX(k);
        var wal = BOUND(k, val + n);
        if (wal === val) return;
        if (is_state) {
            STATE[k](CDATA, wal);
        } else {
            var mod = {
                type: "FREE EDIT",
                level: CHAR.LVL(CDATA),
                val: (wal - val)
            };
            CHAR[k](CDATA, mod);
            if (wal >= 0 && wal < NATURES.length) $('.we-nature[data-nature-of="' + k + '"]').html(NATURES[wal]);
        }
        $('[' + data_prefix + 'key="' + k + '"]').html(wal);
        var $linked_pbars = $('.progress-bar[' + data_prefix + 'link="' + k + '"]');
        if ($linked_pbars.length > 0 && isPOS(max)) $linked_pbars.css('width', '' + (100*wal/max).toFixed(0) + '%');
    }
}

function increment(element, n) {
    if (!CDATA) return;
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
    if (!(CDATA && CDATA.state)) return;
    if (!src_key && !dst_key) return;
    if (typeof n !== 'number') n = 1;
    if (n < 1) return;
    if (typeof src_key === 'string') {
        var src_val = STATE[src_key](CDATA);
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
        .attr('data-char-key', char.key)
        .removeClass('we-clone-element d-none')
        .html(char.data.common_name)
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

function onCharacterCreated(char) {
    STATE.newState(char.data);
    console.log('[PCMScript::onCharacterCreated] INFO: Created character "' + char.key + '"');
    addCharacter(char);
    clearLoadingHud();
    $('.we-char-dditem[data-char-key="' + char.key + '"]').click();
}

function createCharacter(element) {
    drawLoadingHud('Creating New Character');
    google.script.run.withSuccessHandler(onCharacterCreated).createCharacter();
}

function onDataSaved() {
    setEditMode(false);
    clearLoadingHud();
    $('#navbar-toggler').click();
}

function saveCurrentData() {
    if (!CDATA) return;
    drawLoadingHud('Saving Character');
    var char = CHARMAP[CDATA.key];
    if (!char) {
        console.error('FAILED TO SAVE CURRENT DATA. Unable to find Character for key "' + CDATA.key + '"');
    }
    google.script.run.withSuccessHandler(onDataSaved).saveCharacter(char);
}

function addCharacter(char) {
    if (!char) {
        console.error('[PCMScript::addCharacter] ERROR: The given character "char" was null.');
        return;
    }
    char.data.key = char.key; // enable reverse lookups
    if (!Array.isArray(CHARS)) CHARS = [];
    CHARS.push(char);
    if (!CHARMAP || typeof CHARMAP !== 'object') CHARMAP = {};
    CHARMAP[char.key] = char;
    addCharDropdownItem(char);
}

function drawCharacter() {
    if (!CDATA) return;
    $('.we-character-name').html(CDATA.full_name);
    for (var pk of PARAM_KEYS) {
        var val = CHAR[pk](CDATA);
        $('[data-param-key="' + pk + '"]').html(val);
        if (typeof val === 'number') {
            var $linked_pbars = $('.progress-bar[data-param-link="' + pk + '"]');
            if ($linked_pbars.length > 0) {
                var max = MAX(pk);
                if (isPOS(max)) $linked_pbars.css('width', '' + (100*val/max).toFixed(0) + '%');
            }
            var $natures = $('.we-nature[data-nature-of="' + pk + '"]');
            if ($natures.length > 0 && val >= 0 && val < NATURES.length) {
                $natures.html(NATURES[val]);
            }
        }
    }
    if (!CDATA.state) STATE.newState(CDATA);
    for (var sk of STATE_KEYS) {
        var val = STATE[sk](CDATA);
        $('[data-state-key="' + sk + '"]').html(val);
        var $linked_pbars = $('.progress-bar[data-state-link="' + sk + '"]');
        if ($linked_pbars.length > 0) {
            var max = MAX(sk);
            if (isPOS(max)) $linked_pbars.css('width', '' + (100*val/max).toFixed(0) + '%');
        }
    }
}

function selectCharacter(element) {
    $cdditem = $(element);
    var ckey = $cdditem.attr('data-char-key');
    if (typeof ckey !== 'string') {
        console.log('[PCMScript::selectCharacter] ERROR: char dditem missing attribute "data-char-key"');
        return;
    }
    CDATA = CHARMAP[ckey].data;
    if (!CDATA) {
        console.log('[PCMScript::selectCharacter] ERROR: Unable to lookup character with key "' + ckey + '"');
        return;
    }
    drawCharacter();
}

function onDataLoaded(chars) {
    CHARS = [];
    if (Array.isArray(chars)) {
        for (var c of chars) {
            addCharacter(c);
        }
    }
    clearLoadingHud();
    //$('#data-serialization-text').val(JSON.stringify(CHARS));
}

function loadData() {
    google.script.run.withSuccessHandler(onDataLoaded).getCharacters();
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    loadData();  //TODO: Use this line after testing
    drawLoadingHud(new Character(new CharData()).condition());
    //onDataLoaded(getTestChars()); //TODO: Remove this line after testing
});


///

// CHARACTER OPERATORS
const PARAM_KEYS = Object.freeze([
    "LVL", "EXP", "TIER", "SP", "CON", "DEX", "INT", "WIL"
]);

function isPARAM(key) {
    return PARAM_KEYS.includes(key);
}

///



// CHARACTER STATE OPERATORS
const STATE_KEYS = Object.freeze([
    "CDN", "PWR", "HEL", "BRK", "DMG", "AFL", "FTG"
]);

function isSTATE(key) {
    return STATE_KEYS.includes(key);
}

function newState(cdata) {
    cdata.state = {
        condition: "NORMAL",
        power: 0,
        //health: CHAR.SP(cdata), //TODO: subtract soulbound chips
        breakage: 0,
        damage: 0,
        affliction: 0,
        fatigue: 0
    };
}
