package wetfe.core.character

//
//class CharacterDocumentManager {
//    private _documents: CharacterDocument[] = [];
//    private _map: Map<string, CharacterDocument> = new Map();
//    private _active_cdoc: CharacterDocument;
//    private _target_cdoc: CharacterDocument;
//
//    constructor() {
//        this._active_cdoc = new CharacterDocument("a_id", "a_folder_id", new Character(new CharData()));
//        this._target_cdoc = new CharacterDocument("t_id", "t_folder_id", new Character(new CharData()));
//    }
//
//    get docs() {
//        return this._documents;
//    }
//
//    get active() {
//        return this._active_cdoc.character;
//    }
//
//    get target() {
//        return this._target_cdoc.character;
//    }
//
//    get a_cdoc() {
//        return this._active_cdoc;
//    }
//
//    get t_cdoc() {
//        return this._target_cdoc;
//    }
//
//    get a_char() {
//        return this.active;
//    }
//
//    get t_char() {
//        return this.target;
//    }
//
//    get a_data() {
//        return this._active_cdoc.data;
//    }
//
//    get t_data() {
//        return this._target_cdoc.data;
//    }
//
//    get a_state() {
//        return this._active_cdoc.state;
//    }
//
//    get t_state() {
//        return this._target_cdoc.state;
//    }
//
//    getCharacterDocuments() {
//        return this.docs;
//    }
//
//    getActiveCharacterDocument() {
//        return this.a_cdoc;
//    }
//
//    getTargetCharacterDocument() {
//        return this.t_cdoc;
//    }
//
//    getActiveCharacter() {
//        return this.active;
//    }
//
//    getTargetCharacter() {
//        return this.target;
//    }
//
//    getActiveData() {
//        return this.a_data;
//    }
//
//    getTargetData() {
//        return this.t_data;
//    }
//
//    getActiveState() {
//        return this.a_state;
//    }
//
//    getTargetState() {
//        return this.t_state;
//    }
//
//    setActive(c: CharacterDocument | Character | CharData | string) {
//        const ckey = typeof c === 'string' ? c : c.key;
//        const cdoc = this._map.get(ckey);
//        if (cdoc) {
//            this._active_cdoc = cdoc;
//        }
//        return this._active_cdoc.character;
//    }
//
//    setTarget(c: CharacterDocument | Character | CharData | string) {
//        const ckey = typeof c === 'string' ? c : c.key;
//        const cdoc = this._map.get(ckey);
//        if (cdoc) {
//            this._target_cdoc = cdoc;
//        }
//        return this._target_cdoc.character;
//    }
//
//    add(cdoc: CharacterDocument) {
//        if (!this._map.has(cdoc.key)) {
//            this._documents.push(cdoc);
//            this._map.set(cdoc.key, cdoc);
//        }
//    }
//}
//const CDM = new CharacterDocumentManager();
//
//function setEditMode(on: boolean) {
//    if (on) {
//        $('.we-edit-mode').removeClass('d-none');
//        $('#edit-mode-btn').addClass('d-none');
//    } else {
//        $('.we-edit-mode').addClass('d-none');
//        $('#edit-mode-btn').removeClass('d-none');
//    }
//}
//
//function toggleEditModeNavSpan() {
//    const $emns = $('#edit-mode-nav-span');
//    if ($emns.is('.d-none')) {
//        $emns.removeClass('d-none');
//    } else {
//        $emns.addClass('d-none');
//    }
//}
//
//function toggleEditMode() {
//    const $em_elements = $('.we-edit-mode');
//    if ($em_elements.is('.d-none')) {
//        $em_elements.removeClass('d-none');
//    } else {
//        $em_elements.addClass('d-none');
//    }
//}
//
//function increment(k: string, n: number, is_state = STATE_PARAM_MAP.has(k)) {
//    let val: number;
//    let stateparam: StateParam;
//    let charparam: CoreParam;
//    if (is_state) {
//        const sparam = STATE_PARAM_MAP.get(k);
//        if (sparam === undefined)
//            throw new Error('Unable to lookup StateParam for type ' + k);
//        val = CDM.active.getStateVal(sparam);
//        stateparam = sparam;
//        charparam = DEFAULT_CORE_PARAM;
//    } else {
//        const cparam = CORE_PARAM_MAP.get(k);
//        if (cparam === undefined)
//            throw new Error('Unable to lookup CharParam for type ' + k);
//        val = CDM.active.getCoreVal(cparam);
//        charparam = cparam;
//        stateparam = DEFAULT_STATE_PARAM;
//    }
//    const data_prefix = is_state ? 'data-state-' : 'data-param-';
//    if (typeof val === 'number') {
//        let max = ATTR.max(k);
//        let wal = ATTR.bound(k, val + n);
//        if (wal === val) return;
//        if (is_state) {
//            CDM.active.setStateVal(stateparam, wal);
//        } else {
//            CDM.active.addCoreMod(charparam, new Modification((wal - val), 'FREE EDIT'));
//            if (wal >= 0 && wal < ATTR.NATURES.length)
//            $('.we-nature[data-nature-of="' + k + '"]').html(ATTR.natureOf(wal));
//        }
//        $('[' + data_prefix + 'key="' + k + '"]').html(String(wal));
//        let $linked_pbars = $('.progress-bar[' + data_prefix + 'link="' + k + '"]');
//        if ($linked_pbars.length > 0 && max > 0)
//        $linked_pbars.css('width', '' + (100 * wal / max).toFixed(0) + '%');
//    }
//}
//
//function incrementElement(element: Element, n = 1) {
//    let $element = $(element);
//    let is_state = $element.is('.we-state-change');
//    let key = is_state ?
//    $element.attr('data-state-target') :
//    $element.attr('data-param-target');
//    if (key === undefined)
//        throw new Error('Unable to extract a state or param target key from the given element.');
//    return increment(key, n, is_state);
//}
//
//function decrementElement(element: Element, n = 1) {
//    incrementElement(element, -n);
//}
//
//function decrement(k: string, n: number, is_state: boolean) {
//    increment(k, -n, is_state);
//}
//
//function reallocate(src_key?: string, dst_key?: string, n = 1) {
//    if (!src_key && !dst_key) return;
//    if (n < 1) return;
//    if (src_key) {
//        const srcparam = STATE_PARAM_MAP.get(src_key);
//        if (srcparam === undefined)
//            throw new Error('Unable to lookup state parameter for key ' + src_key);
//        let src_val = CDM.active.getStateVal(srcparam);
//        if (src_val < 1) return;
//        if (n > src_val) n = src_val;
//        decrement(src_key, n, true);
//    }
//    if (dst_key) {
//        increment(dst_key, n, true);
//    }
//}
//
//function takeDamage(n: number) {
//    reallocate('HEL', 'DMG', n);
//}
//
//function healDamage(n: number) {
//    reallocate('DMG', 'HEL', n);
//}
//
//function accumulateFatigue(src_key: string, n: number) {
//    if (typeof src_key !== 'string') src_key = 'HEL';
//    reallocate(src_key, 'FTG', n);
//}
//
//function restoreFatigue(n: number) {
//    reallocate('FTG', 'HEL', n);
//}
//
//function showCharPicker() {
//    $('.we-char-picker').removeClass('d-none');
//}
//
//function hideCharPicker() {
//    $('.we-char-picker').addClass('d-none');
//}
//
//function drawLoadingHud(msg: string) {
//    hideCharPicker();
//    $('.we-loading-spinner').addClass('fa-spin');
//    $('.we-loading-txt').html(msg);
//    $('.we-loading-hud').removeClass('d-none');
//}
//
//function clearLoadingHud() {
//    $('.we-loading-spinner').removeClass('fa-spin');
//    $('.we-loading-hud').addClass('d-none');
//    showCharPicker();
//}
//
//let $char_dditem_ce: JQuery | null = null;
//function addCharDropdownItem(char: Character) {
//    if ($char_dditem_ce === null) {
//        $char_dditem_ce = $('.we-char-dditem.we-clone-element');
//    }
//    $char_dditem_ce.clone()
//    .attr('data-char-key', char.key)
//            .removeClass('we-clone-element d-none')
//            .html(char.data.common_name)
//            .appendTo('.we-char-ddmenu');
//}
//
//function repopulateCharDropdown() {
//    $('.we-char-ddmenu>.we-char-dditem').remove();
//    for (let cdoc of CDM.docs) {
//        addCharDropdownItem(cdoc.character);
//    }
//}
//
//function handleCharacterCreated(cdoc: CharacterDocument) {
//    console.log('[CharManager::onCharacterCreated] INFO: Created character "' + cdoc.key + '"');
//    addCharacter(cdoc);
//    clearLoadingHud();
//    $('.we-char-dditem[data-char-key="' + cdoc.key + '"]').click();
//}
//
//function createCharacter(element: HTMLElement) {
//    //@ts-ignore
//    google.script.run.withSuccessHandler(handleCharacterCreated).createCharacter();
//    drawLoadingHud('Creating New Character');
//}
//
//function handleDataSaved() {
//    setEditMode(false);
//    clearLoadingHud();
//    $('#navbar-toggler').click();
//}
//
//function saveCurrentData() {
//    //@ts-ignore
//    google.script.run.withSuccessHandler(handleDataSaved).saveCharacter(CDM.a_cdoc);
//    drawLoadingHud('Saving Character');
//}
//
//function addCharacter(cdoc: CharacterDocument) {
//    if (!cdoc) {
//        console.error('[CharManager::addCharacter] ERROR: The given character "char" was null.');
//        return;
//    }
//    CDM.add(cdoc);
//    addCharDropdownItem(cdoc.character);
//}
//
//function drawCharacter() {
//    const chara = CDM.active;
//    const cstate = CDM.a_state;
//    $('.we-character-name').html(chara.data.full_name);
//    for (let [ck, cv] of CORE_PARAM_MAP) {
//        let val = chara.getCoreVal(cv);
//        $('[data-param-key="' + ck + '"]').html(val.toString());
//        if (typeof val === 'number') {
//        let $linked_pbars = $('.progress-bar[data-param-link="' + ck + '"]');
//        if ($linked_pbars.length > 0) {
//        let max = ATTR.max(ck);
//        $linked_pbars.css('width', '' + (100 * val / max).toFixed(0) + '%');
//    }
//        let $natures = $('.we-nature[data-nature-of="' + ck + '"]');
//        if ($natures.length > 0) {
//        $natures.html(ATTR.natureOf(val));
//    }
//    }
//    }
//    for (let [sk, sv] of STATE_PARAM_MAP) {
//        let val = cstate.of(sv);
//        $('[data-state-key="' + sk + '"]').html(val.toString());
//        let $linked_pbars = $('.progress-bar[data-state-link="' + sk + '"]');
//        if ($linked_pbars.length > 0) {
//        let max = ATTR.max(sk);
//        $linked_pbars.css('width', '' + (100 * val / max).toFixed(0) + '%');
//    }
//    }
//    // TODO: display the active character's condition (cstate.condition)
//}
//
//function selectCharacter(element: HTMLElement) {
//    let $cdditem = $(element);
//    let ckey = $cdditem.attr('data-char-key');
//    if (typeof ckey !== 'string') {
//        console.log('[CharManager::selectCharacter] ERROR: char dditem missing attribute "data-char-key"');
//        return;
//    }
//    CDM.setActive(ckey);
//    drawCharacter();
//}
//
//function handleLoadedCharacterDocuments(cdocs: CharacterDocument[]) {
//    if (Array.isArray(cdocs)) {
//        for (let c of cdocs) {
//            addCharacter(c);
//        }
//    }
//    clearLoadingHud();
//    //$('#data-serialization-text').val(JSON.stringify(CHARS));
//}
//
//function loadCharacterDocuments() {
//    //@ts-ignore
//    google.script.run.withSuccessHandler(handleLoadedCharacterDocuments).getCharacterDocuments();
//    drawLoadingHud(`Loading Character Documents`);
//}
//
//$(function () {
//    $('[data-toggle="tooltip"]').tooltip();
//    loadCharacterDocuments();
//});
