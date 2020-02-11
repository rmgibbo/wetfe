if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'wetfe'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'wetfe'.");
}
var wetfe = function (_, Kotlin) {
  'use strict';
  var toMap = Kotlin.kotlin.collections.toMap_abgq59$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var coerceAtLeast = Kotlin.kotlin.ranges.coerceAtLeast_dqglrj$;
  var coerceAtMost = Kotlin.kotlin.ranges.coerceAtMost_dqglrj$;
  var Random = Kotlin.kotlin.random.Random;
  var L1000 = Kotlin.Long.fromInt(1000);
  var L1000000 = Kotlin.Long.fromInt(1000000);
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var isBlank = Kotlin.kotlin.text.isBlank_gw00vp$;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Comparable = Kotlin.kotlin.Comparable;
  var numberToInt = Kotlin.numberToInt;
  var toString = Kotlin.toString;
  var first = Kotlin.kotlin.text.first_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var last = Kotlin.kotlin.text.last_gw00vp$;
  var equals = Kotlin.equals;
  var coerceIn = Kotlin.kotlin.ranges.coerceIn_nig4hr$;
  var coerceAtLeast_0 = Kotlin.kotlin.ranges.coerceAtLeast_38ydlf$;
  var sort = Kotlin.kotlin.collections.sort_pbinho$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  CoreParam.prototype = Object.create(Enum.prototype);
  CoreParam.prototype.constructor = CoreParam;
  QuadStat.prototype = Object.create(Enum.prototype);
  QuadStat.prototype.constructor = QuadStat;
  StatMode.prototype = Object.create(Enum.prototype);
  StatMode.prototype.constructor = StatMode;
  StateParam.prototype = Object.create(Enum.prototype);
  StateParam.prototype.constructor = StateParam;
  StateCondition.prototype = Object.create(Enum.prototype);
  StateCondition.prototype.constructor = StateCondition;
  Attribute$Limit.prototype = Object.create(Enum.prototype);
  Attribute$Limit.prototype.constructor = Attribute$Limit;
  Attribute$Nature.prototype = Object.create(Enum.prototype);
  Attribute$Nature.prototype.constructor = Attribute$Nature;
  ParticipantStatus.prototype = Object.create(Enum.prototype);
  ParticipantStatus.prototype.constructor = ParticipantStatus;
  CharacterParticipant.prototype = Object.create(Character.prototype);
  CharacterParticipant.prototype.constructor = CharacterParticipant;
  EncounterType.prototype = Object.create(Enum.prototype);
  EncounterType.prototype.constructor = EncounterType;
  DataSource.prototype = Object.create(Enum.prototype);
  DataSource.prototype.constructor = DataSource;
  Physicality.prototype = Object.create(Enum.prototype);
  Physicality.prototype.constructor = Physicality;
  Vulnerability.prototype = Object.create(Enum.prototype);
  Vulnerability.prototype.constructor = Vulnerability;
  function CoreParam(name, ordinal, key) {
    Enum.call(this);
    this.key = key;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function CoreParam_initFields() {
    CoreParam_initFields = function () {
    };
    CoreParam$LEVEL_instance = new CoreParam('LEVEL', 0, 'LVL');
    CoreParam$EXPERIENCE_instance = new CoreParam('EXPERIENCE', 1, 'EXP');
    CoreParam$SOULPOOL_instance = new CoreParam('SOULPOOL', 2, 'SP');
    CoreParam$CONSTITUTION_instance = new CoreParam('CONSTITUTION', 3, 'CON');
    CoreParam$DEXTERITY_instance = new CoreParam('DEXTERITY', 4, 'DEX');
    CoreParam$INTELLIGENCE_instance = new CoreParam('INTELLIGENCE', 5, 'INT');
    CoreParam$WILLPOWER_instance = new CoreParam('WILLPOWER', 6, 'WIL');
    CoreParam$Companion_getInstance();
  }
  var CoreParam$LEVEL_instance;
  function CoreParam$LEVEL_getInstance() {
    CoreParam_initFields();
    return CoreParam$LEVEL_instance;
  }
  var CoreParam$EXPERIENCE_instance;
  function CoreParam$EXPERIENCE_getInstance() {
    CoreParam_initFields();
    return CoreParam$EXPERIENCE_instance;
  }
  var CoreParam$SOULPOOL_instance;
  function CoreParam$SOULPOOL_getInstance() {
    CoreParam_initFields();
    return CoreParam$SOULPOOL_instance;
  }
  var CoreParam$CONSTITUTION_instance;
  function CoreParam$CONSTITUTION_getInstance() {
    CoreParam_initFields();
    return CoreParam$CONSTITUTION_instance;
  }
  var CoreParam$DEXTERITY_instance;
  function CoreParam$DEXTERITY_getInstance() {
    CoreParam_initFields();
    return CoreParam$DEXTERITY_instance;
  }
  var CoreParam$INTELLIGENCE_instance;
  function CoreParam$INTELLIGENCE_getInstance() {
    CoreParam_initFields();
    return CoreParam$INTELLIGENCE_instance;
  }
  var CoreParam$WILLPOWER_instance;
  function CoreParam$WILLPOWER_getInstance() {
    CoreParam_initFields();
    return CoreParam$WILLPOWER_instance;
  }
  function CoreParam$Companion() {
    CoreParam$Companion_instance = this;
    this.lookupMap_0 = null;
    var tmp$, tmp$_0;
    var initMap = LinkedHashMap_init();
    tmp$ = CoreParam$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var param = tmp$[tmp$_0];
      var key = param.key;
      initMap.put_xwzc9p$(key, param);
    }
    this.lookupMap_0 = toMap(initMap);
  }
  CoreParam$Companion.prototype.lookup_61zpoe$ = function (key) {
    return this.lookupMap_0.get_11rb$(key);
  };
  CoreParam$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var CoreParam$Companion_instance = null;
  function CoreParam$Companion_getInstance() {
    CoreParam_initFields();
    if (CoreParam$Companion_instance === null) {
      new CoreParam$Companion();
    }
    return CoreParam$Companion_instance;
  }
  CoreParam.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CoreParam',
    interfaces: [Enum]
  };
  function CoreParam$values() {
    return [CoreParam$LEVEL_getInstance(), CoreParam$EXPERIENCE_getInstance(), CoreParam$SOULPOOL_getInstance(), CoreParam$CONSTITUTION_getInstance(), CoreParam$DEXTERITY_getInstance(), CoreParam$INTELLIGENCE_getInstance(), CoreParam$WILLPOWER_getInstance()];
  }
  CoreParam.values = CoreParam$values;
  function CoreParam$valueOf(name) {
    switch (name) {
      case 'LEVEL':
        return CoreParam$LEVEL_getInstance();
      case 'EXPERIENCE':
        return CoreParam$EXPERIENCE_getInstance();
      case 'SOULPOOL':
        return CoreParam$SOULPOOL_getInstance();
      case 'CONSTITUTION':
        return CoreParam$CONSTITUTION_getInstance();
      case 'DEXTERITY':
        return CoreParam$DEXTERITY_getInstance();
      case 'INTELLIGENCE':
        return CoreParam$INTELLIGENCE_getInstance();
      case 'WILLPOWER':
        return CoreParam$WILLPOWER_getInstance();
      default:throwISE('No enum constant wetfe.core.character.CoreParam.' + name);
    }
  }
  CoreParam.valueOf_61zpoe$ = CoreParam$valueOf;
  function QuadStat(name, ordinal, key) {
    Enum.call(this);
    this.key = key;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function QuadStat_initFields() {
    QuadStat_initFields = function () {
    };
    QuadStat$CONSTITUTION_instance = new QuadStat('CONSTITUTION', 0, 'CON');
    QuadStat$DEXTERITY_instance = new QuadStat('DEXTERITY', 1, 'DEX');
    QuadStat$INTELLIGENCE_instance = new QuadStat('INTELLIGENCE', 2, 'INT');
    QuadStat$WILLPOWER_instance = new QuadStat('WILLPOWER', 3, 'WIL');
    QuadStat$Companion_getInstance();
  }
  var QuadStat$CONSTITUTION_instance;
  function QuadStat$CONSTITUTION_getInstance() {
    QuadStat_initFields();
    return QuadStat$CONSTITUTION_instance;
  }
  var QuadStat$DEXTERITY_instance;
  function QuadStat$DEXTERITY_getInstance() {
    QuadStat_initFields();
    return QuadStat$DEXTERITY_instance;
  }
  var QuadStat$INTELLIGENCE_instance;
  function QuadStat$INTELLIGENCE_getInstance() {
    QuadStat_initFields();
    return QuadStat$INTELLIGENCE_instance;
  }
  var QuadStat$WILLPOWER_instance;
  function QuadStat$WILLPOWER_getInstance() {
    QuadStat_initFields();
    return QuadStat$WILLPOWER_instance;
  }
  function QuadStat$Companion() {
    QuadStat$Companion_instance = this;
    this.lookupMap_0 = null;
    var tmp$, tmp$_0;
    var initMap = LinkedHashMap_init();
    tmp$ = QuadStat$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var stat = tmp$[tmp$_0];
      var key = stat.key;
      initMap.put_xwzc9p$(key, stat);
    }
    this.lookupMap_0 = toMap(initMap);
  }
  QuadStat$Companion.prototype.lookup_61zpoe$ = function (key) {
    return this.lookupMap_0.get_11rb$(key);
  };
  QuadStat$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var QuadStat$Companion_instance = null;
  function QuadStat$Companion_getInstance() {
    QuadStat_initFields();
    if (QuadStat$Companion_instance === null) {
      new QuadStat$Companion();
    }
    return QuadStat$Companion_instance;
  }
  QuadStat.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'QuadStat',
    interfaces: [Enum]
  };
  function QuadStat$values() {
    return [QuadStat$CONSTITUTION_getInstance(), QuadStat$DEXTERITY_getInstance(), QuadStat$INTELLIGENCE_getInstance(), QuadStat$WILLPOWER_getInstance()];
  }
  QuadStat.values = QuadStat$values;
  function QuadStat$valueOf(name) {
    switch (name) {
      case 'CONSTITUTION':
        return QuadStat$CONSTITUTION_getInstance();
      case 'DEXTERITY':
        return QuadStat$DEXTERITY_getInstance();
      case 'INTELLIGENCE':
        return QuadStat$INTELLIGENCE_getInstance();
      case 'WILLPOWER':
        return QuadStat$WILLPOWER_getInstance();
      default:throwISE('No enum constant wetfe.core.character.QuadStat.' + name);
    }
  }
  QuadStat.valueOf_61zpoe$ = QuadStat$valueOf;
  function StatMode(name, ordinal, key) {
    Enum.call(this);
    this.key = key;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function StatMode_initFields() {
    StatMode_initFields = function () {
    };
    StatMode$NATURAL_instance = new StatMode('NATURAL', 0, '=');
    StatMode$ENHANCED_instance = new StatMode('ENHANCED', 1, '+');
    StatMode$ENFEEBLED_instance = new StatMode('ENFEEBLED', 2, '-');
    StatMode$Companion_getInstance();
  }
  var StatMode$NATURAL_instance;
  function StatMode$NATURAL_getInstance() {
    StatMode_initFields();
    return StatMode$NATURAL_instance;
  }
  var StatMode$ENHANCED_instance;
  function StatMode$ENHANCED_getInstance() {
    StatMode_initFields();
    return StatMode$ENHANCED_instance;
  }
  var StatMode$ENFEEBLED_instance;
  function StatMode$ENFEEBLED_getInstance() {
    StatMode_initFields();
    return StatMode$ENFEEBLED_instance;
  }
  function StatMode$Companion() {
    StatMode$Companion_instance = this;
    this.LOOKUP_MAP_0 = null;
    var tmp$, tmp$_0;
    var initMap = LinkedHashMap_init();
    tmp$ = StatMode$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var mode = tmp$[tmp$_0];
      var key = mode.key;
      initMap.put_xwzc9p$(key, mode);
    }
    this.LOOKUP_MAP_0 = toMap(initMap);
  }
  StatMode$Companion.prototype.lookup_61zpoe$ = function (key) {
    return this.LOOKUP_MAP_0.get_11rb$(key);
  };
  StatMode$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var StatMode$Companion_instance = null;
  function StatMode$Companion_getInstance() {
    StatMode_initFields();
    if (StatMode$Companion_instance === null) {
      new StatMode$Companion();
    }
    return StatMode$Companion_instance;
  }
  StatMode.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StatMode',
    interfaces: [Enum]
  };
  function StatMode$values() {
    return [StatMode$NATURAL_getInstance(), StatMode$ENHANCED_getInstance(), StatMode$ENFEEBLED_getInstance()];
  }
  StatMode.values = StatMode$values;
  function StatMode$valueOf(name) {
    switch (name) {
      case 'NATURAL':
        return StatMode$NATURAL_getInstance();
      case 'ENHANCED':
        return StatMode$ENHANCED_getInstance();
      case 'ENFEEBLED':
        return StatMode$ENFEEBLED_getInstance();
      default:throwISE('No enum constant wetfe.core.character.StatMode.' + name);
    }
  }
  StatMode.valueOf_61zpoe$ = StatMode$valueOf;
  function StateParam(name, ordinal, key) {
    Enum.call(this);
    this.key = key;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function StateParam_initFields() {
    StateParam_initFields = function () {
    };
    StateParam$HEALTH_instance = new StateParam('HEALTH', 0, 'HEL');
    StateParam$DAMAGE_instance = new StateParam('DAMAGE', 1, 'DMG');
    StateParam$FATIGUE_instance = new StateParam('FATIGUE', 2, 'FTG');
    StateParam$POWER_instance = new StateParam('POWER', 3, 'PWR');
    StateParam$AFFLICTION_instance = new StateParam('AFFLICTION', 4, 'AFL');
    StateParam$TRAUMA_instance = new StateParam('TRAUMA', 5, 'TRM');
    StateParam$MOMENTUM_instance = new StateParam('MOMENTUM', 6, 'MTM');
    StateParam$Companion_getInstance();
  }
  var StateParam$HEALTH_instance;
  function StateParam$HEALTH_getInstance() {
    StateParam_initFields();
    return StateParam$HEALTH_instance;
  }
  var StateParam$DAMAGE_instance;
  function StateParam$DAMAGE_getInstance() {
    StateParam_initFields();
    return StateParam$DAMAGE_instance;
  }
  var StateParam$FATIGUE_instance;
  function StateParam$FATIGUE_getInstance() {
    StateParam_initFields();
    return StateParam$FATIGUE_instance;
  }
  var StateParam$POWER_instance;
  function StateParam$POWER_getInstance() {
    StateParam_initFields();
    return StateParam$POWER_instance;
  }
  var StateParam$AFFLICTION_instance;
  function StateParam$AFFLICTION_getInstance() {
    StateParam_initFields();
    return StateParam$AFFLICTION_instance;
  }
  var StateParam$TRAUMA_instance;
  function StateParam$TRAUMA_getInstance() {
    StateParam_initFields();
    return StateParam$TRAUMA_instance;
  }
  var StateParam$MOMENTUM_instance;
  function StateParam$MOMENTUM_getInstance() {
    StateParam_initFields();
    return StateParam$MOMENTUM_instance;
  }
  function StateParam$Companion() {
    StateParam$Companion_instance = this;
    this.lookupMap_0 = null;
    var tmp$, tmp$_0;
    var initMap = LinkedHashMap_init();
    tmp$ = StateParam$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var param = tmp$[tmp$_0];
      var key = param.key;
      initMap.put_xwzc9p$(key, param);
    }
    this.lookupMap_0 = toMap(initMap);
  }
  StateParam$Companion.prototype.lookup_61zpoe$ = function (key) {
    return this.lookupMap_0.get_11rb$(key);
  };
  StateParam$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var StateParam$Companion_instance = null;
  function StateParam$Companion_getInstance() {
    StateParam_initFields();
    if (StateParam$Companion_instance === null) {
      new StateParam$Companion();
    }
    return StateParam$Companion_instance;
  }
  StateParam.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StateParam',
    interfaces: [Enum]
  };
  function StateParam$values() {
    return [StateParam$HEALTH_getInstance(), StateParam$DAMAGE_getInstance(), StateParam$FATIGUE_getInstance(), StateParam$POWER_getInstance(), StateParam$AFFLICTION_getInstance(), StateParam$TRAUMA_getInstance(), StateParam$MOMENTUM_getInstance()];
  }
  StateParam.values = StateParam$values;
  function StateParam$valueOf(name) {
    switch (name) {
      case 'HEALTH':
        return StateParam$HEALTH_getInstance();
      case 'DAMAGE':
        return StateParam$DAMAGE_getInstance();
      case 'FATIGUE':
        return StateParam$FATIGUE_getInstance();
      case 'POWER':
        return StateParam$POWER_getInstance();
      case 'AFFLICTION':
        return StateParam$AFFLICTION_getInstance();
      case 'TRAUMA':
        return StateParam$TRAUMA_getInstance();
      case 'MOMENTUM':
        return StateParam$MOMENTUM_getInstance();
      default:throwISE('No enum constant wetfe.core.character.StateParam.' + name);
    }
  }
  StateParam.valueOf_61zpoe$ = StateParam$valueOf;
  function StateCondition(name, ordinal, key, priority) {
    Enum.call(this);
    this.key = key;
    this.priority = priority;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function StateCondition_initFields() {
    StateCondition_initFields = function () {
    };
    StateCondition$NORMAL_instance = new StateCondition('NORMAL', 0, '=', 0);
    StateCondition$BLITZING_instance = new StateCondition('BLITZING', 1, '!', 30);
    StateCondition$TURTLING_instance = new StateCondition('TURTLING', 2, '@', 30);
    StateCondition$CHANNELING_instance = new StateCondition('CHANNELING', 3, '^', 30);
    StateCondition$STAGGERED_instance = new StateCondition('STAGGERED', 4, '$', 60);
    StateCondition$UNCONSCIOUS_instance = new StateCondition('UNCONSCIOUS', 5, '*', 70);
    StateCondition$COMATOSE_instance = new StateCondition('COMATOSE', 6, '~', 80);
    StateCondition$DEAD_instance = new StateCondition('DEAD', 7, '_', 90);
    StateCondition$Companion_getInstance();
  }
  var StateCondition$NORMAL_instance;
  function StateCondition$NORMAL_getInstance() {
    StateCondition_initFields();
    return StateCondition$NORMAL_instance;
  }
  var StateCondition$BLITZING_instance;
  function StateCondition$BLITZING_getInstance() {
    StateCondition_initFields();
    return StateCondition$BLITZING_instance;
  }
  var StateCondition$TURTLING_instance;
  function StateCondition$TURTLING_getInstance() {
    StateCondition_initFields();
    return StateCondition$TURTLING_instance;
  }
  var StateCondition$CHANNELING_instance;
  function StateCondition$CHANNELING_getInstance() {
    StateCondition_initFields();
    return StateCondition$CHANNELING_instance;
  }
  var StateCondition$STAGGERED_instance;
  function StateCondition$STAGGERED_getInstance() {
    StateCondition_initFields();
    return StateCondition$STAGGERED_instance;
  }
  var StateCondition$UNCONSCIOUS_instance;
  function StateCondition$UNCONSCIOUS_getInstance() {
    StateCondition_initFields();
    return StateCondition$UNCONSCIOUS_instance;
  }
  var StateCondition$COMATOSE_instance;
  function StateCondition$COMATOSE_getInstance() {
    StateCondition_initFields();
    return StateCondition$COMATOSE_instance;
  }
  var StateCondition$DEAD_instance;
  function StateCondition$DEAD_getInstance() {
    StateCondition_initFields();
    return StateCondition$DEAD_instance;
  }
  function StateCondition$Companion() {
    StateCondition$Companion_instance = this;
    this.lookupMap_0 = null;
    var tmp$, tmp$_0;
    var initMap = LinkedHashMap_init();
    tmp$ = StateCondition$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var condition = tmp$[tmp$_0];
      var key = condition.key;
      initMap.put_xwzc9p$(key, condition);
    }
    this.lookupMap_0 = toMap(initMap);
  }
  StateCondition$Companion.prototype.lookup_61zpoe$ = function (key) {
    return this.lookupMap_0.get_11rb$(key);
  };
  StateCondition$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var StateCondition$Companion_instance = null;
  function StateCondition$Companion_getInstance() {
    StateCondition_initFields();
    if (StateCondition$Companion_instance === null) {
      new StateCondition$Companion();
    }
    return StateCondition$Companion_instance;
  }
  StateCondition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StateCondition',
    interfaces: [Enum]
  };
  function StateCondition$values() {
    return [StateCondition$NORMAL_getInstance(), StateCondition$BLITZING_getInstance(), StateCondition$TURTLING_getInstance(), StateCondition$CHANNELING_getInstance(), StateCondition$STAGGERED_getInstance(), StateCondition$UNCONSCIOUS_getInstance(), StateCondition$COMATOSE_getInstance(), StateCondition$DEAD_getInstance()];
  }
  StateCondition.values = StateCondition$values;
  function StateCondition$valueOf(name) {
    switch (name) {
      case 'NORMAL':
        return StateCondition$NORMAL_getInstance();
      case 'BLITZING':
        return StateCondition$BLITZING_getInstance();
      case 'TURTLING':
        return StateCondition$TURTLING_getInstance();
      case 'CHANNELING':
        return StateCondition$CHANNELING_getInstance();
      case 'STAGGERED':
        return StateCondition$STAGGERED_getInstance();
      case 'UNCONSCIOUS':
        return StateCondition$UNCONSCIOUS_getInstance();
      case 'COMATOSE':
        return StateCondition$COMATOSE_getInstance();
      case 'DEAD':
        return StateCondition$DEAD_getInstance();
      default:throwISE('No enum constant wetfe.core.character.StateCondition.' + name);
    }
  }
  StateCondition.valueOf_61zpoe$ = StateCondition$valueOf;
  var MAX_INT;
  var MIN_INT;
  function Attribute() {
    Attribute_instance = this;
  }
  function Attribute$Limit(name, ordinal, min, max) {
    Enum.call(this);
    this.min = min;
    this.max = max;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Attribute$Limit_initFields() {
    Attribute$Limit_initFields = function () {
    };
    Attribute$Limit$UNBOUNDED_instance = new Attribute$Limit('UNBOUNDED', 0, -65535, 65535);
    Attribute$Limit$POS_UNBOUNDED_instance = new Attribute$Limit('POS_UNBOUNDED', 1, 1, 65535);
    Attribute$Limit$CHIP_instance = new Attribute$Limit('CHIP', 2, 0, 65535);
    Attribute$Limit$CORE_instance = new Attribute$Limit('CORE', 3, 0, 20);
    Attribute$Limit$D20_instance = new Attribute$Limit('D20', 4, 1, 20);
    Attribute$Limit$Companion_getInstance();
  }
  var Attribute$Limit$UNBOUNDED_instance;
  function Attribute$Limit$UNBOUNDED_getInstance() {
    Attribute$Limit_initFields();
    return Attribute$Limit$UNBOUNDED_instance;
  }
  var Attribute$Limit$POS_UNBOUNDED_instance;
  function Attribute$Limit$POS_UNBOUNDED_getInstance() {
    Attribute$Limit_initFields();
    return Attribute$Limit$POS_UNBOUNDED_instance;
  }
  var Attribute$Limit$CHIP_instance;
  function Attribute$Limit$CHIP_getInstance() {
    Attribute$Limit_initFields();
    return Attribute$Limit$CHIP_instance;
  }
  var Attribute$Limit$CORE_instance;
  function Attribute$Limit$CORE_getInstance() {
    Attribute$Limit_initFields();
    return Attribute$Limit$CORE_instance;
  }
  var Attribute$Limit$D20_instance;
  function Attribute$Limit$D20_getInstance() {
    Attribute$Limit_initFields();
    return Attribute$Limit$D20_instance;
  }
  Attribute$Limit.prototype.coerce_za3lpa$ = function (n) {
    return coerceAtMost(coerceAtLeast(n, this.min), this.max);
  };
  function Attribute$Limit$Companion() {
    Attribute$Limit$Companion_instance = this;
  }
  Attribute$Limit$Companion.prototype.of_qosqn7$ = function (param) {
    var tmp$;
    switch (param.name) {
      case 'LEVEL':
        tmp$ = Attribute$Limit$POS_UNBOUNDED_getInstance();
        break;
      case 'EXPERIENCE':
        tmp$ = Attribute$Limit$POS_UNBOUNDED_getInstance();
        break;
      case 'SOULPOOL':
        tmp$ = Attribute$Limit$POS_UNBOUNDED_getInstance();
        break;
      case 'CONSTITUTION':
        tmp$ = Attribute$Limit$CORE_getInstance();
        break;
      case 'DEXTERITY':
        tmp$ = Attribute$Limit$CORE_getInstance();
        break;
      case 'INTELLIGENCE':
        tmp$ = Attribute$Limit$CORE_getInstance();
        break;
      case 'WILLPOWER':
        tmp$ = Attribute$Limit$CORE_getInstance();
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Attribute$Limit$Companion.prototype.of_alacmf$ = function (param) {
    var tmp$;
    switch (param.name) {
      case 'HEALTH':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'DAMAGE':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'FATIGUE':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'POWER':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'AFFLICTION':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'TRAUMA':
        tmp$ = Attribute$Limit$CHIP_getInstance();
        break;
      case 'MOMENTUM':
        tmp$ = Attribute$Limit$UNBOUNDED_getInstance();
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Attribute$Limit$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Attribute$Limit$Companion_instance = null;
  function Attribute$Limit$Companion_getInstance() {
    Attribute$Limit_initFields();
    if (Attribute$Limit$Companion_instance === null) {
      new Attribute$Limit$Companion();
    }
    return Attribute$Limit$Companion_instance;
  }
  Attribute$Limit.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Limit',
    interfaces: [Enum]
  };
  function Attribute$Limit$values() {
    return [Attribute$Limit$UNBOUNDED_getInstance(), Attribute$Limit$POS_UNBOUNDED_getInstance(), Attribute$Limit$CHIP_getInstance(), Attribute$Limit$CORE_getInstance(), Attribute$Limit$D20_getInstance()];
  }
  Attribute$Limit.values = Attribute$Limit$values;
  function Attribute$Limit$valueOf(name) {
    switch (name) {
      case 'UNBOUNDED':
        return Attribute$Limit$UNBOUNDED_getInstance();
      case 'POS_UNBOUNDED':
        return Attribute$Limit$POS_UNBOUNDED_getInstance();
      case 'CHIP':
        return Attribute$Limit$CHIP_getInstance();
      case 'CORE':
        return Attribute$Limit$CORE_getInstance();
      case 'D20':
        return Attribute$Limit$D20_getInstance();
      default:throwISE('No enum constant wetfe.core.character.Attribute.Limit.' + name);
    }
  }
  Attribute$Limit.valueOf_61zpoe$ = Attribute$Limit$valueOf;
  function Attribute$Nature(name, ordinal, label) {
    Enum.call(this);
    this.label = label;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Attribute$Nature_initFields() {
    Attribute$Nature_initFields = function () {
    };
    Attribute$Nature$UNDEFINED_instance = new Attribute$Nature('UNDEFINED', 0, 'Undefined');
    Attribute$Nature$ABSENT_instance = new Attribute$Nature('ABSENT', 1, 'Absent');
    Attribute$Nature$PALTRY_instance = new Attribute$Nature('PALTRY', 2, 'Paltry');
    Attribute$Nature$RUDIMENTARY_instance = new Attribute$Nature('RUDIMENTARY', 3, 'Rudimentary');
    Attribute$Nature$INFERIOR_instance = new Attribute$Nature('INFERIOR', 4, 'Inferior');
    Attribute$Nature$UNREMARKABLE_instance = new Attribute$Nature('UNREMARKABLE', 5, 'Unremarkable');
    Attribute$Nature$RESPECTABLE_instance = new Attribute$Nature('RESPECTABLE', 6, 'Respectable');
    Attribute$Nature$CONSIDERABLE_instance = new Attribute$Nature('CONSIDERABLE', 7, 'Considerable');
    Attribute$Nature$FORMIDABLE_instance = new Attribute$Nature('FORMIDABLE', 8, 'Formidable');
    Attribute$Nature$PHENOMENAL_instance = new Attribute$Nature('PHENOMENAL', 9, 'Phenomenal');
    Attribute$Nature$PRODIGIOUS_instance = new Attribute$Nature('PRODIGIOUS', 10, 'Prodigious');
    Attribute$Nature$MIRACULOUS_instance = new Attribute$Nature('MIRACULOUS', 11, 'Miraculous');
    Attribute$Nature$Companion_getInstance();
  }
  var Attribute$Nature$UNDEFINED_instance;
  function Attribute$Nature$UNDEFINED_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$UNDEFINED_instance;
  }
  var Attribute$Nature$ABSENT_instance;
  function Attribute$Nature$ABSENT_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$ABSENT_instance;
  }
  var Attribute$Nature$PALTRY_instance;
  function Attribute$Nature$PALTRY_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$PALTRY_instance;
  }
  var Attribute$Nature$RUDIMENTARY_instance;
  function Attribute$Nature$RUDIMENTARY_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$RUDIMENTARY_instance;
  }
  var Attribute$Nature$INFERIOR_instance;
  function Attribute$Nature$INFERIOR_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$INFERIOR_instance;
  }
  var Attribute$Nature$UNREMARKABLE_instance;
  function Attribute$Nature$UNREMARKABLE_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$UNREMARKABLE_instance;
  }
  var Attribute$Nature$RESPECTABLE_instance;
  function Attribute$Nature$RESPECTABLE_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$RESPECTABLE_instance;
  }
  var Attribute$Nature$CONSIDERABLE_instance;
  function Attribute$Nature$CONSIDERABLE_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$CONSIDERABLE_instance;
  }
  var Attribute$Nature$FORMIDABLE_instance;
  function Attribute$Nature$FORMIDABLE_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$FORMIDABLE_instance;
  }
  var Attribute$Nature$PHENOMENAL_instance;
  function Attribute$Nature$PHENOMENAL_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$PHENOMENAL_instance;
  }
  var Attribute$Nature$PRODIGIOUS_instance;
  function Attribute$Nature$PRODIGIOUS_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$PRODIGIOUS_instance;
  }
  var Attribute$Nature$MIRACULOUS_instance;
  function Attribute$Nature$MIRACULOUS_getInstance() {
    Attribute$Nature_initFields();
    return Attribute$Nature$MIRACULOUS_instance;
  }
  function Attribute$Nature$Companion() {
    Attribute$Nature$Companion_instance = this;
  }
  Attribute$Nature$Companion.prototype.of_za3lpa$ = function (n) {
    var tmp$;
    switch (n) {
      case 0:
        tmp$ = Attribute$Nature$ABSENT_getInstance();
        break;
      case 1:
      case 2:
        tmp$ = Attribute$Nature$PALTRY_getInstance();
        break;
      case 3:
      case 4:
        tmp$ = Attribute$Nature$RUDIMENTARY_getInstance();
        break;
      case 5:
      case 6:
        tmp$ = Attribute$Nature$INFERIOR_getInstance();
        break;
      case 7:
      case 8:
        tmp$ = Attribute$Nature$UNREMARKABLE_getInstance();
        break;
      case 9:
      case 10:
        tmp$ = Attribute$Nature$RESPECTABLE_getInstance();
        break;
      case 11:
      case 12:
        tmp$ = Attribute$Nature$CONSIDERABLE_getInstance();
        break;
      case 13:
      case 14:
        tmp$ = Attribute$Nature$FORMIDABLE_getInstance();
        break;
      case 15:
      case 16:
        tmp$ = Attribute$Nature$PHENOMENAL_getInstance();
        break;
      case 17:
      case 18:
      case 19:
        tmp$ = Attribute$Nature$PRODIGIOUS_getInstance();
        break;
      case 20:
        tmp$ = Attribute$Nature$MIRACULOUS_getInstance();
        break;
      default:tmp$ = Attribute$Nature$UNDEFINED_getInstance();
        break;
    }
    return tmp$;
  };
  Attribute$Nature$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Attribute$Nature$Companion_instance = null;
  function Attribute$Nature$Companion_getInstance() {
    Attribute$Nature_initFields();
    if (Attribute$Nature$Companion_instance === null) {
      new Attribute$Nature$Companion();
    }
    return Attribute$Nature$Companion_instance;
  }
  Attribute$Nature.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Nature',
    interfaces: [Enum]
  };
  function Attribute$Nature$values() {
    return [Attribute$Nature$UNDEFINED_getInstance(), Attribute$Nature$ABSENT_getInstance(), Attribute$Nature$PALTRY_getInstance(), Attribute$Nature$RUDIMENTARY_getInstance(), Attribute$Nature$INFERIOR_getInstance(), Attribute$Nature$UNREMARKABLE_getInstance(), Attribute$Nature$RESPECTABLE_getInstance(), Attribute$Nature$CONSIDERABLE_getInstance(), Attribute$Nature$FORMIDABLE_getInstance(), Attribute$Nature$PHENOMENAL_getInstance(), Attribute$Nature$PRODIGIOUS_getInstance(), Attribute$Nature$MIRACULOUS_getInstance()];
  }
  Attribute$Nature.values = Attribute$Nature$values;
  function Attribute$Nature$valueOf(name) {
    switch (name) {
      case 'UNDEFINED':
        return Attribute$Nature$UNDEFINED_getInstance();
      case 'ABSENT':
        return Attribute$Nature$ABSENT_getInstance();
      case 'PALTRY':
        return Attribute$Nature$PALTRY_getInstance();
      case 'RUDIMENTARY':
        return Attribute$Nature$RUDIMENTARY_getInstance();
      case 'INFERIOR':
        return Attribute$Nature$INFERIOR_getInstance();
      case 'UNREMARKABLE':
        return Attribute$Nature$UNREMARKABLE_getInstance();
      case 'RESPECTABLE':
        return Attribute$Nature$RESPECTABLE_getInstance();
      case 'CONSIDERABLE':
        return Attribute$Nature$CONSIDERABLE_getInstance();
      case 'FORMIDABLE':
        return Attribute$Nature$FORMIDABLE_getInstance();
      case 'PHENOMENAL':
        return Attribute$Nature$PHENOMENAL_getInstance();
      case 'PRODIGIOUS':
        return Attribute$Nature$PRODIGIOUS_getInstance();
      case 'MIRACULOUS':
        return Attribute$Nature$MIRACULOUS_getInstance();
      default:throwISE('No enum constant wetfe.core.character.Attribute.Nature.' + name);
    }
  }
  Attribute$Nature.valueOf_61zpoe$ = Attribute$Nature$valueOf;
  Attribute.prototype.hasNature_za3lpa$ = function (n) {
    return 0 <= n && n <= 20;
  };
  Attribute.prototype.hasLimit_61zpoe$ = function (key) {
    return StateParam$Companion_getInstance().lookup_61zpoe$(key) != null || CoreParam$Companion_getInstance().lookup_61zpoe$(key) != null;
  };
  Attribute.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Attribute',
    interfaces: []
  };
  var Attribute_instance = null;
  function Attribute_getInstance() {
    if (Attribute_instance === null) {
      new Attribute();
    }
    return Attribute_instance;
  }
  function StatModeState(conMode, dexMode, intMode, wilMode) {
    if (conMode === void 0)
      conMode = StatMode$NATURAL_getInstance();
    if (dexMode === void 0)
      dexMode = StatMode$NATURAL_getInstance();
    if (intMode === void 0)
      intMode = StatMode$NATURAL_getInstance();
    if (wilMode === void 0)
      wilMode = StatMode$NATURAL_getInstance();
    this.conMode = conMode;
    this.dexMode = dexMode;
    this.intMode = intMode;
    this.wilMode = wilMode;
  }
  StatModeState.prototype.get_f4ewii$ = function (stat) {
    var tmp$;
    switch (stat.name) {
      case 'CONSTITUTION':
        tmp$ = this.conMode;
        break;
      case 'DEXTERITY':
        tmp$ = this.dexMode;
        break;
      case 'INTELLIGENCE':
        tmp$ = this.intMode;
        break;
      case 'WILLPOWER':
        tmp$ = this.wilMode;
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  StatModeState.prototype.set_sdu2kk$ = function (stat, mode) {
    var tmp$;
    switch (stat.name) {
      case 'CONSTITUTION':
        tmp$ = this.conMode = mode;
        break;
      case 'DEXTERITY':
        tmp$ = this.dexMode = mode;
        break;
      case 'INTELLIGENCE':
        tmp$ = this.intMode = mode;
        break;
      case 'WILLPOWER':
        tmp$ = this.wilMode = mode;
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  StatModeState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StatModeState',
    interfaces: []
  };
  StatModeState.prototype.component1 = function () {
    return this.conMode;
  };
  StatModeState.prototype.component2 = function () {
    return this.dexMode;
  };
  StatModeState.prototype.component3 = function () {
    return this.intMode;
  };
  StatModeState.prototype.component4 = function () {
    return this.wilMode;
  };
  StatModeState.prototype.copy_bqrrb0$ = function (conMode, dexMode, intMode, wilMode) {
    return new StatModeState(conMode === void 0 ? this.conMode : conMode, dexMode === void 0 ? this.dexMode : dexMode, intMode === void 0 ? this.intMode : intMode, wilMode === void 0 ? this.wilMode : wilMode);
  };
  StatModeState.prototype.toString = function () {
    return 'StatModeState(conMode=' + Kotlin.toString(this.conMode) + (', dexMode=' + Kotlin.toString(this.dexMode)) + (', intMode=' + Kotlin.toString(this.intMode)) + (', wilMode=' + Kotlin.toString(this.wilMode)) + ')';
  };
  StatModeState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.conMode) | 0;
    result = result * 31 + Kotlin.hashCode(this.dexMode) | 0;
    result = result * 31 + Kotlin.hashCode(this.intMode) | 0;
    result = result * 31 + Kotlin.hashCode(this.wilMode) | 0;
    return result;
  };
  StatModeState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.conMode, other.conMode) && Kotlin.equals(this.dexMode, other.dexMode) && Kotlin.equals(this.intMode, other.intMode) && Kotlin.equals(this.wilMode, other.wilMode)))));
  };
  function CharaSpec(tier, name, customName) {
    if (customName === void 0)
      customName = '';
    this.tier = tier;
    this.name = name;
    this.customName = customName;
  }
  CharaSpec.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharaSpec',
    interfaces: []
  };
  CharaSpec.prototype.component1 = function () {
    return this.tier;
  };
  CharaSpec.prototype.component2 = function () {
    return this.name;
  };
  CharaSpec.prototype.component3 = function () {
    return this.customName;
  };
  CharaSpec.prototype.copy_s4fhmi$ = function (tier, name, customName) {
    return new CharaSpec(tier === void 0 ? this.tier : tier, name === void 0 ? this.name : name, customName === void 0 ? this.customName : customName);
  };
  CharaSpec.prototype.toString = function () {
    return 'CharaSpec(tier=' + Kotlin.toString(this.tier) + (', name=' + Kotlin.toString(this.name)) + (', customName=' + Kotlin.toString(this.customName)) + ')';
  };
  CharaSpec.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.tier) | 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.customName) | 0;
    return result;
  };
  CharaSpec.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.tier, other.tier) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.customName, other.customName)))));
  };
  function CharaState(health, damage, fatigue, power, affliction, trauma, momentum, modes, condition, tapped) {
    if (health === void 0)
      health = 0;
    if (damage === void 0)
      damage = 0;
    if (fatigue === void 0)
      fatigue = 0;
    if (power === void 0)
      power = 0;
    if (affliction === void 0)
      affliction = 0;
    if (trauma === void 0)
      trauma = 0;
    if (momentum === void 0)
      momentum = 0;
    if (modes === void 0)
      modes = new StatModeState();
    if (condition === void 0)
      condition = StateCondition$NORMAL_getInstance();
    if (tapped === void 0)
      tapped = false;
    this.health = health;
    this.damage = damage;
    this.fatigue = fatigue;
    this.power = power;
    this.affliction = affliction;
    this.trauma = trauma;
    this.momentum = momentum;
    this.modes = modes;
    this.condition = condition;
    this.tapped = tapped;
  }
  CharaState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharaState',
    interfaces: []
  };
  CharaState.prototype.component1 = function () {
    return this.health;
  };
  CharaState.prototype.component2 = function () {
    return this.damage;
  };
  CharaState.prototype.component3 = function () {
    return this.fatigue;
  };
  CharaState.prototype.component4 = function () {
    return this.power;
  };
  CharaState.prototype.component5 = function () {
    return this.affliction;
  };
  CharaState.prototype.component6 = function () {
    return this.trauma;
  };
  CharaState.prototype.component7 = function () {
    return this.momentum;
  };
  CharaState.prototype.component8 = function () {
    return this.modes;
  };
  CharaState.prototype.component9 = function () {
    return this.condition;
  };
  CharaState.prototype.component10 = function () {
    return this.tapped;
  };
  CharaState.prototype.copy_8kcr9h$ = function (health, damage, fatigue, power, affliction, trauma, momentum, modes, condition, tapped) {
    return new CharaState(health === void 0 ? this.health : health, damage === void 0 ? this.damage : damage, fatigue === void 0 ? this.fatigue : fatigue, power === void 0 ? this.power : power, affliction === void 0 ? this.affliction : affliction, trauma === void 0 ? this.trauma : trauma, momentum === void 0 ? this.momentum : momentum, modes === void 0 ? this.modes : modes, condition === void 0 ? this.condition : condition, tapped === void 0 ? this.tapped : tapped);
  };
  CharaState.prototype.toString = function () {
    return 'CharaState(health=' + Kotlin.toString(this.health) + (', damage=' + Kotlin.toString(this.damage)) + (', fatigue=' + Kotlin.toString(this.fatigue)) + (', power=' + Kotlin.toString(this.power)) + (', affliction=' + Kotlin.toString(this.affliction)) + (', trauma=' + Kotlin.toString(this.trauma)) + (', momentum=' + Kotlin.toString(this.momentum)) + (', modes=' + Kotlin.toString(this.modes)) + (', condition=' + Kotlin.toString(this.condition)) + (', tapped=' + Kotlin.toString(this.tapped)) + ')';
  };
  CharaState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.health) | 0;
    result = result * 31 + Kotlin.hashCode(this.damage) | 0;
    result = result * 31 + Kotlin.hashCode(this.fatigue) | 0;
    result = result * 31 + Kotlin.hashCode(this.power) | 0;
    result = result * 31 + Kotlin.hashCode(this.affliction) | 0;
    result = result * 31 + Kotlin.hashCode(this.trauma) | 0;
    result = result * 31 + Kotlin.hashCode(this.momentum) | 0;
    result = result * 31 + Kotlin.hashCode(this.modes) | 0;
    result = result * 31 + Kotlin.hashCode(this.condition) | 0;
    result = result * 31 + Kotlin.hashCode(this.tapped) | 0;
    return result;
  };
  CharaState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.health, other.health) && Kotlin.equals(this.damage, other.damage) && Kotlin.equals(this.fatigue, other.fatigue) && Kotlin.equals(this.power, other.power) && Kotlin.equals(this.affliction, other.affliction) && Kotlin.equals(this.trauma, other.trauma) && Kotlin.equals(this.momentum, other.momentum) && Kotlin.equals(this.modes, other.modes) && Kotlin.equals(this.condition, other.condition) && Kotlin.equals(this.tapped, other.tapped)))));
  };
  function CharaRepertoire(general, specialty, growth, soulbound, exceptional) {
    if (general === void 0) {
      general = ArrayList_init();
    }
    if (specialty === void 0) {
      specialty = ArrayList_init();
    }
    if (growth === void 0) {
      growth = ArrayList_init();
    }
    if (soulbound === void 0) {
      soulbound = ArrayList_init();
    }
    if (exceptional === void 0) {
      exceptional = ArrayList_init();
    }
    this.general = general;
    this.specialty = specialty;
    this.growth = growth;
    this.soulbound = soulbound;
    this.exceptional = exceptional;
  }
  CharaRepertoire.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharaRepertoire',
    interfaces: []
  };
  CharaRepertoire.prototype.component1 = function () {
    return this.general;
  };
  CharaRepertoire.prototype.component2 = function () {
    return this.specialty;
  };
  CharaRepertoire.prototype.component3 = function () {
    return this.growth;
  };
  CharaRepertoire.prototype.component4 = function () {
    return this.soulbound;
  };
  CharaRepertoire.prototype.component5 = function () {
    return this.exceptional;
  };
  CharaRepertoire.prototype.copy_3gjsvu$ = function (general, specialty, growth, soulbound, exceptional) {
    return new CharaRepertoire(general === void 0 ? this.general : general, specialty === void 0 ? this.specialty : specialty, growth === void 0 ? this.growth : growth, soulbound === void 0 ? this.soulbound : soulbound, exceptional === void 0 ? this.exceptional : exceptional);
  };
  CharaRepertoire.prototype.toString = function () {
    return 'CharaRepertoire(general=' + Kotlin.toString(this.general) + (', specialty=' + Kotlin.toString(this.specialty)) + (', growth=' + Kotlin.toString(this.growth)) + (', soulbound=' + Kotlin.toString(this.soulbound)) + (', exceptional=' + Kotlin.toString(this.exceptional)) + ')';
  };
  CharaRepertoire.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.general) | 0;
    result = result * 31 + Kotlin.hashCode(this.specialty) | 0;
    result = result * 31 + Kotlin.hashCode(this.growth) | 0;
    result = result * 31 + Kotlin.hashCode(this.soulbound) | 0;
    result = result * 31 + Kotlin.hashCode(this.exceptional) | 0;
    return result;
  };
  CharaRepertoire.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.general, other.general) && Kotlin.equals(this.specialty, other.specialty) && Kotlin.equals(this.growth, other.growth) && Kotlin.equals(this.soulbound, other.soulbound) && Kotlin.equals(this.exceptional, other.exceptional)))));
  };
  function CharaData(id, source, physicality, fullName, commonName, shortName, homeworld, species, birthEvent, properMass, properAge, livingAge, properHeight, commonHeight, commonCalendarAge, titles, renown, characteristics, specialties, level, experience, soulpool, constitution, dexterity, intelligence, willpower, staggerThreshold, state, repertoire, rollsheetLayout) {
    CharaData$Companion_getInstance();
    if (id === void 0)
      id = CharaData$Companion_getInstance().newId();
    if (source === void 0)
      source = DataSource$PLAYER_getInstance();
    if (physicality === void 0)
      physicality = Physicality$CONFLUENT_getInstance();
    if (fullName === void 0)
      fullName = 'Full Name';
    if (commonName === void 0)
      commonName = 'Common Name';
    if (shortName === void 0)
      shortName = 'Short Name';
    if (homeworld === void 0)
      homeworld = 'Homeworld';
    if (species === void 0)
      species = 'Species';
    if (birthEvent === void 0)
      birthEvent = new Event();
    if (properMass === void 0)
      properMass = 1.0;
    if (properAge === void 0)
      properAge = 1.0;
    if (livingAge === void 0)
      livingAge = 1.0;
    if (properHeight === void 0)
      properHeight = 1.0;
    if (commonHeight === void 0)
      commonHeight = 1.0;
    if (commonCalendarAge === void 0)
      commonCalendarAge = 1;
    if (titles === void 0) {
      titles = ArrayList_init();
    }
    if (renown === void 0) {
      renown = ArrayList_init();
    }
    if (characteristics === void 0) {
      characteristics = ArrayList_init();
    }
    if (specialties === void 0) {
      specialties = ArrayList_init();
    }
    if (level === void 0)
      level = 1;
    if (experience === void 0)
      experience = 0;
    if (soulpool === void 0)
      soulpool = 5;
    if (constitution === void 0)
      constitution = 10;
    if (dexterity === void 0)
      dexterity = 10;
    if (intelligence === void 0)
      intelligence = 10;
    if (willpower === void 0)
      willpower = 10;
    if (staggerThreshold === void 0)
      staggerThreshold = 0;
    if (state === void 0)
      state = new CharaState();
    if (repertoire === void 0)
      repertoire = new CharaRepertoire();
    if (rollsheetLayout === void 0) {
      rollsheetLayout = ArrayList_init();
    }
    this.id = id;
    this.source = source;
    this.physicality = physicality;
    this.fullName = fullName;
    this.commonName = commonName;
    this.shortName = shortName;
    this.homeworld = homeworld;
    this.species = species;
    this.birthEvent = birthEvent;
    this.properMass = properMass;
    this.properAge = properAge;
    this.livingAge = livingAge;
    this.properHeight = properHeight;
    this.commonHeight = commonHeight;
    this.commonCalendarAge = commonCalendarAge;
    this.titles = titles;
    this.renown = renown;
    this.characteristics = characteristics;
    this.specialties = specialties;
    this.level = level;
    this.experience = experience;
    this.soulpool = soulpool;
    this.constitution = constitution;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.willpower = willpower;
    this.staggerThreshold = staggerThreshold;
    this.state = state;
    this.repertoire = repertoire;
    this.rollsheetLayout = rollsheetLayout;
  }
  function CharaData$Companion() {
    CharaData$Companion_instance = this;
  }
  CharaData$Companion.prototype.newId = function () {
    return 'NewCharacter-' + Random.Default.nextLong_3pjtqy$(L1000, L1000000).toString();
  };
  CharaData$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var CharaData$Companion_instance = null;
  function CharaData$Companion_getInstance() {
    if (CharaData$Companion_instance === null) {
      new CharaData$Companion();
    }
    return CharaData$Companion_instance;
  }
  CharaData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharaData',
    interfaces: []
  };
  CharaData.prototype.component1 = function () {
    return this.id;
  };
  CharaData.prototype.component2 = function () {
    return this.source;
  };
  CharaData.prototype.component3 = function () {
    return this.physicality;
  };
  CharaData.prototype.component4 = function () {
    return this.fullName;
  };
  CharaData.prototype.component5 = function () {
    return this.commonName;
  };
  CharaData.prototype.component6 = function () {
    return this.shortName;
  };
  CharaData.prototype.component7 = function () {
    return this.homeworld;
  };
  CharaData.prototype.component8 = function () {
    return this.species;
  };
  CharaData.prototype.component9 = function () {
    return this.birthEvent;
  };
  CharaData.prototype.component10 = function () {
    return this.properMass;
  };
  CharaData.prototype.component11 = function () {
    return this.properAge;
  };
  CharaData.prototype.component12 = function () {
    return this.livingAge;
  };
  CharaData.prototype.component13 = function () {
    return this.properHeight;
  };
  CharaData.prototype.component14 = function () {
    return this.commonHeight;
  };
  CharaData.prototype.component15 = function () {
    return this.commonCalendarAge;
  };
  CharaData.prototype.component16 = function () {
    return this.titles;
  };
  CharaData.prototype.component17 = function () {
    return this.renown;
  };
  CharaData.prototype.component18 = function () {
    return this.characteristics;
  };
  CharaData.prototype.component19 = function () {
    return this.specialties;
  };
  CharaData.prototype.component20 = function () {
    return this.level;
  };
  CharaData.prototype.component21 = function () {
    return this.experience;
  };
  CharaData.prototype.component22 = function () {
    return this.soulpool;
  };
  CharaData.prototype.component23 = function () {
    return this.constitution;
  };
  CharaData.prototype.component24 = function () {
    return this.dexterity;
  };
  CharaData.prototype.component25 = function () {
    return this.intelligence;
  };
  CharaData.prototype.component26 = function () {
    return this.willpower;
  };
  CharaData.prototype.component27 = function () {
    return this.staggerThreshold;
  };
  CharaData.prototype.component28 = function () {
    return this.state;
  };
  CharaData.prototype.component29 = function () {
    return this.repertoire;
  };
  CharaData.prototype.component30 = function () {
    return this.rollsheetLayout;
  };
  CharaData.prototype.copy_rw29mb$ = function (id, source, physicality, fullName, commonName, shortName, homeworld, species, birthEvent, properMass, properAge, livingAge, properHeight, commonHeight, commonCalendarAge, titles, renown, characteristics, specialties, level, experience, soulpool, constitution, dexterity, intelligence, willpower, staggerThreshold, state, repertoire, rollsheetLayout) {
    return new CharaData(id === void 0 ? this.id : id, source === void 0 ? this.source : source, physicality === void 0 ? this.physicality : physicality, fullName === void 0 ? this.fullName : fullName, commonName === void 0 ? this.commonName : commonName, shortName === void 0 ? this.shortName : shortName, homeworld === void 0 ? this.homeworld : homeworld, species === void 0 ? this.species : species, birthEvent === void 0 ? this.birthEvent : birthEvent, properMass === void 0 ? this.properMass : properMass, properAge === void 0 ? this.properAge : properAge, livingAge === void 0 ? this.livingAge : livingAge, properHeight === void 0 ? this.properHeight : properHeight, commonHeight === void 0 ? this.commonHeight : commonHeight, commonCalendarAge === void 0 ? this.commonCalendarAge : commonCalendarAge, titles === void 0 ? this.titles : titles, renown === void 0 ? this.renown : renown, characteristics === void 0 ? this.characteristics : characteristics, specialties === void 0 ? this.specialties : specialties, level === void 0 ? this.level : level, experience === void 0 ? this.experience : experience, soulpool === void 0 ? this.soulpool : soulpool, constitution === void 0 ? this.constitution : constitution, dexterity === void 0 ? this.dexterity : dexterity, intelligence === void 0 ? this.intelligence : intelligence, willpower === void 0 ? this.willpower : willpower, staggerThreshold === void 0 ? this.staggerThreshold : staggerThreshold, state === void 0 ? this.state : state, repertoire === void 0 ? this.repertoire : repertoire, rollsheetLayout === void 0 ? this.rollsheetLayout : rollsheetLayout);
  };
  CharaData.prototype.toString = function () {
    return 'CharaData(id=' + Kotlin.toString(this.id) + (', source=' + Kotlin.toString(this.source)) + (', physicality=' + Kotlin.toString(this.physicality)) + (', fullName=' + Kotlin.toString(this.fullName)) + (', commonName=' + Kotlin.toString(this.commonName)) + (', shortName=' + Kotlin.toString(this.shortName)) + (', homeworld=' + Kotlin.toString(this.homeworld)) + (', species=' + Kotlin.toString(this.species)) + (', birthEvent=' + Kotlin.toString(this.birthEvent)) + (', properMass=' + Kotlin.toString(this.properMass)) + (', properAge=' + Kotlin.toString(this.properAge)) + (', livingAge=' + Kotlin.toString(this.livingAge)) + (', properHeight=' + Kotlin.toString(this.properHeight)) + (', commonHeight=' + Kotlin.toString(this.commonHeight)) + (', commonCalendarAge=' + Kotlin.toString(this.commonCalendarAge)) + (', titles=' + Kotlin.toString(this.titles)) + (', renown=' + Kotlin.toString(this.renown)) + (', characteristics=' + Kotlin.toString(this.characteristics)) + (', specialties=' + Kotlin.toString(this.specialties)) + (', level=' + Kotlin.toString(this.level)) + (', experience=' + Kotlin.toString(this.experience)) + (', soulpool=' + Kotlin.toString(this.soulpool)) + (', constitution=' + Kotlin.toString(this.constitution)) + (', dexterity=' + Kotlin.toString(this.dexterity)) + (', intelligence=' + Kotlin.toString(this.intelligence)) + (', willpower=' + Kotlin.toString(this.willpower)) + (', staggerThreshold=' + Kotlin.toString(this.staggerThreshold)) + (', state=' + Kotlin.toString(this.state)) + (', repertoire=' + Kotlin.toString(this.repertoire)) + (', rollsheetLayout=' + Kotlin.toString(this.rollsheetLayout)) + ')';
  };
  CharaData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.physicality) | 0;
    result = result * 31 + Kotlin.hashCode(this.fullName) | 0;
    result = result * 31 + Kotlin.hashCode(this.commonName) | 0;
    result = result * 31 + Kotlin.hashCode(this.shortName) | 0;
    result = result * 31 + Kotlin.hashCode(this.homeworld) | 0;
    result = result * 31 + Kotlin.hashCode(this.species) | 0;
    result = result * 31 + Kotlin.hashCode(this.birthEvent) | 0;
    result = result * 31 + Kotlin.hashCode(this.properMass) | 0;
    result = result * 31 + Kotlin.hashCode(this.properAge) | 0;
    result = result * 31 + Kotlin.hashCode(this.livingAge) | 0;
    result = result * 31 + Kotlin.hashCode(this.properHeight) | 0;
    result = result * 31 + Kotlin.hashCode(this.commonHeight) | 0;
    result = result * 31 + Kotlin.hashCode(this.commonCalendarAge) | 0;
    result = result * 31 + Kotlin.hashCode(this.titles) | 0;
    result = result * 31 + Kotlin.hashCode(this.renown) | 0;
    result = result * 31 + Kotlin.hashCode(this.characteristics) | 0;
    result = result * 31 + Kotlin.hashCode(this.specialties) | 0;
    result = result * 31 + Kotlin.hashCode(this.level) | 0;
    result = result * 31 + Kotlin.hashCode(this.experience) | 0;
    result = result * 31 + Kotlin.hashCode(this.soulpool) | 0;
    result = result * 31 + Kotlin.hashCode(this.constitution) | 0;
    result = result * 31 + Kotlin.hashCode(this.dexterity) | 0;
    result = result * 31 + Kotlin.hashCode(this.intelligence) | 0;
    result = result * 31 + Kotlin.hashCode(this.willpower) | 0;
    result = result * 31 + Kotlin.hashCode(this.staggerThreshold) | 0;
    result = result * 31 + Kotlin.hashCode(this.state) | 0;
    result = result * 31 + Kotlin.hashCode(this.repertoire) | 0;
    result = result * 31 + Kotlin.hashCode(this.rollsheetLayout) | 0;
    return result;
  };
  CharaData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.source, other.source) && Kotlin.equals(this.physicality, other.physicality) && Kotlin.equals(this.fullName, other.fullName) && Kotlin.equals(this.commonName, other.commonName) && Kotlin.equals(this.shortName, other.shortName) && Kotlin.equals(this.homeworld, other.homeworld) && Kotlin.equals(this.species, other.species) && Kotlin.equals(this.birthEvent, other.birthEvent) && Kotlin.equals(this.properMass, other.properMass) && Kotlin.equals(this.properAge, other.properAge) && Kotlin.equals(this.livingAge, other.livingAge) && Kotlin.equals(this.properHeight, other.properHeight) && Kotlin.equals(this.commonHeight, other.commonHeight) && Kotlin.equals(this.commonCalendarAge, other.commonCalendarAge) && Kotlin.equals(this.titles, other.titles) && Kotlin.equals(this.renown, other.renown) && Kotlin.equals(this.characteristics, other.characteristics) && Kotlin.equals(this.specialties, other.specialties) && Kotlin.equals(this.level, other.level) && Kotlin.equals(this.experience, other.experience) && Kotlin.equals(this.soulpool, other.soulpool) && Kotlin.equals(this.constitution, other.constitution) && Kotlin.equals(this.dexterity, other.dexterity) && Kotlin.equals(this.intelligence, other.intelligence) && Kotlin.equals(this.willpower, other.willpower) && Kotlin.equals(this.staggerThreshold, other.staggerThreshold) && Kotlin.equals(this.state, other.state) && Kotlin.equals(this.repertoire, other.repertoire) && Kotlin.equals(this.rollsheetLayout, other.rollsheetLayout)))));
  };
  function Character(charaData) {
    if (charaData === void 0)
      charaData = new CharaData();
    this.cdata_wnkotf$_0 = charaData;
    this.valcache_est45l$_0 = LinkedHashMap_init();
    var tmp$, tmp$_0;
    tmp$ = CoreParam$values();
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var param = tmp$[tmp$_0];
      this.valcache_est45l$_0.put_xwzc9p$(param, null);
    }
  }
  Character.prototype.getId = function () {
    return this.cdata_wnkotf$_0.id;
  };
  Character.prototype.getName = function () {
    return !isBlank(this.cdata_wnkotf$_0.shortName) ? this.cdata_wnkotf$_0.shortName : !isBlank(this.cdata_wnkotf$_0.commonName) ? this.cdata_wnkotf$_0.commonName : this.cdata_wnkotf$_0.fullName;
  };
  Character.prototype.getFullName = function () {
    return this.cdata_wnkotf$_0.fullName;
  };
  Character.prototype.getCommonName = function () {
    return this.cdata_wnkotf$_0.commonName;
  };
  Character.prototype.geShortName = function () {
    return this.cdata_wnkotf$_0.shortName;
  };
  Character.prototype.getSource = function () {
    return this.cdata_wnkotf$_0.source;
  };
  Character.prototype.isPlayerSource = function () {
    return this.cdata_wnkotf$_0.source === DataSource$PLAYER_getInstance();
  };
  Character.prototype.isOfficialSource = function () {
    return this.cdata_wnkotf$_0.source === DataSource$OFFICIAL_getInstance();
  };
  Character.prototype.getStaggerThreshold = function () {
    return this.cdata_wnkotf$_0.staggerThreshold;
  };
  Character.prototype.getSoulpool = function () {
    return this.cdata_wnkotf$_0.soulpool;
  };
  Character.prototype.setSoulpool_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.soulpool = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$SOULPOOL_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.soulpool;
  };
  Character.prototype.getLevel = function () {
    return this.cdata_wnkotf$_0.level;
  };
  Character.prototype.setLevel_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.level = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$LEVEL_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.level;
  };
  Character.prototype.getExperience = function () {
    return this.cdata_wnkotf$_0.experience;
  };
  Character.prototype.setExperience_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.experience = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$EXPERIENCE_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.experience;
  };
  Character.prototype.getConstitution = function () {
    return this.cdata_wnkotf$_0.constitution;
  };
  Character.prototype.setConstitution_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.constitution = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$CONSTITUTION_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.constitution;
  };
  Character.prototype.getDexterity = function () {
    return this.cdata_wnkotf$_0.dexterity;
  };
  Character.prototype.setDexterity_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.dexterity = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$DEXTERITY_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.dexterity;
  };
  Character.prototype.getIntelligence = function () {
    return this.cdata_wnkotf$_0.intelligence;
  };
  Character.prototype.setIntelligence_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.intelligence = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$INTELLIGENCE_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.intelligence;
  };
  Character.prototype.getWillpower = function () {
    return this.cdata_wnkotf$_0.willpower;
  };
  Character.prototype.setWillpower_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.willpower = Attribute$Limit$Companion_getInstance().of_qosqn7$(CoreParam$WILLPOWER_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.willpower;
  };
  Character.prototype.getParam_qosqn7$ = function (param) {
    var tmp$;
    switch (param.name) {
      case 'LEVEL':
        tmp$ = this.getLevel();
        break;
      case 'EXPERIENCE':
        tmp$ = this.getExperience();
        break;
      case 'SOULPOOL':
        tmp$ = this.getSoulpool();
        break;
      case 'CONSTITUTION':
        tmp$ = this.getConstitution();
        break;
      case 'DEXTERITY':
        tmp$ = this.getDexterity();
        break;
      case 'INTELLIGENCE':
        tmp$ = this.getIntelligence();
        break;
      case 'WILLPOWER':
        tmp$ = this.getWillpower();
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.setParam_n8b7wr$ = function (param, n) {
    var tmp$;
    switch (param.name) {
      case 'LEVEL':
        tmp$ = this.setLevel_za3lpa$(n);
        break;
      case 'EXPERIENCE':
        tmp$ = this.setExperience_za3lpa$(n);
        break;
      case 'SOULPOOL':
        tmp$ = this.setSoulpool_za3lpa$(n);
        break;
      case 'CONSTITUTION':
        tmp$ = this.setConstitution_za3lpa$(n);
        break;
      case 'DEXTERITY':
        tmp$ = this.setDexterity_za3lpa$(n);
        break;
      case 'INTELLIGENCE':
        tmp$ = this.setIntelligence_za3lpa$(n);
        break;
      case 'WILLPOWER':
        tmp$ = this.setWillpower_za3lpa$(n);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.adjust_n8b7wr$ = function (param, n) {
    var tmp$;
    switch (param.name) {
      case 'LEVEL':
        tmp$ = this.setLevel_za3lpa$(this.getLevel() + n | 0);
        break;
      case 'EXPERIENCE':
        tmp$ = this.setExperience_za3lpa$(this.getExperience() + n | 0);
        break;
      case 'SOULPOOL':
        tmp$ = this.setSoulpool_za3lpa$(this.getSoulpool() + n | 0);
        break;
      case 'CONSTITUTION':
        tmp$ = this.setConstitution_za3lpa$(this.getConstitution() + n | 0);
        break;
      case 'DEXTERITY':
        tmp$ = this.setDexterity_za3lpa$(this.getDexterity() + n | 0);
        break;
      case 'INTELLIGENCE':
        tmp$ = this.setIntelligence_za3lpa$(this.getIntelligence() + n | 0);
        break;
      case 'WILLPOWER':
        tmp$ = this.setWillpower_za3lpa$(this.getWillpower() + n | 0);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.increment_n8b7wr$ = function (param, n) {
    if (n === void 0)
      n = 1;
    return this.adjust_n8b7wr$(param, n);
  };
  Character.prototype.decrement_n8b7wr$ = function (param, n) {
    if (n === void 0)
      n = 1;
    return this.adjust_n8b7wr$(param, -n | 0);
  };
  Character.prototype.getHealth = function () {
    return this.cdata_wnkotf$_0.state.health;
  };
  Character.prototype.setHealth_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.health = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$HEALTH_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.health;
  };
  Character.prototype.getDamage = function () {
    return this.cdata_wnkotf$_0.state.damage;
  };
  Character.prototype.setDamage_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.damage = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$DAMAGE_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.damage;
  };
  Character.prototype.getFatigue = function () {
    return this.cdata_wnkotf$_0.state.fatigue;
  };
  Character.prototype.setFatigue_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.fatigue = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$FATIGUE_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.fatigue;
  };
  Character.prototype.getPower = function () {
    return this.cdata_wnkotf$_0.state.power;
  };
  Character.prototype.setPower_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.power = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$POWER_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.power;
  };
  Character.prototype.isTapped = function () {
    return this.cdata_wnkotf$_0.state.tapped;
  };
  Character.prototype.tap = function () {
    this.cdata_wnkotf$_0.state.tapped = true;
  };
  Character.prototype.untap = function () {
    this.cdata_wnkotf$_0.state.tapped = false;
  };
  Character.prototype.getAffliction = function () {
    return this.cdata_wnkotf$_0.state.affliction;
  };
  Character.prototype.getTrauma = function () {
    return this.cdata_wnkotf$_0.state.trauma;
  };
  Character.prototype.getMomentum = function () {
    return this.cdata_wnkotf$_0.state.momentum;
  };
  Character.prototype.getCondition = function () {
    return this.cdata_wnkotf$_0.state.condition;
  };
  Character.prototype.setCondition_5crjny$ = function (cond, force) {
    if (force === void 0)
      force = false;
    if (force || cond.priority >= this.cdata_wnkotf$_0.state.condition.priority) {
      this.cdata_wnkotf$_0.state.condition = cond;
    }
    return this.cdata_wnkotf$_0.state.condition;
  };
  Character.prototype.applyCondition_jwjpbp$ = function (cond) {
    return this.setCondition_5crjny$(cond, false);
  };
  Character.prototype.forceCondition_jwjpbp$ = function (cond) {
    return this.setCondition_5crjny$(cond, true);
  };
  Character.prototype.setAffliction_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.affliction = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$AFFLICTION_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.affliction;
  };
  Character.prototype.setTrauma_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.trauma = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$TRAUMA_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.trauma;
  };
  Character.prototype.setMomentum_za3lpa$ = function (n) {
    this.cdata_wnkotf$_0.state.momentum = Attribute$Limit$Companion_getInstance().of_alacmf$(StateParam$MOMENTUM_getInstance()).coerce_za3lpa$(n);
    return this.cdata_wnkotf$_0.state.momentum;
  };
  Character.prototype.getParam_alacmf$ = function (param) {
    var tmp$;
    switch (param.name) {
      case 'HEALTH':
        tmp$ = this.getHealth();
        break;
      case 'DAMAGE':
        tmp$ = this.getDamage();
        break;
      case 'FATIGUE':
        tmp$ = this.getFatigue();
        break;
      case 'POWER':
        tmp$ = this.getPower();
        break;
      case 'AFFLICTION':
        tmp$ = this.getAffliction();
        break;
      case 'TRAUMA':
        tmp$ = this.getTrauma();
        break;
      case 'MOMENTUM':
        tmp$ = this.getMomentum();
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.setParam_hek9tz$ = function (param, n) {
    var tmp$;
    switch (param.name) {
      case 'HEALTH':
        tmp$ = this.setHealth_za3lpa$(n);
        break;
      case 'DAMAGE':
        tmp$ = this.setDamage_za3lpa$(n);
        break;
      case 'FATIGUE':
        tmp$ = this.setFatigue_za3lpa$(n);
        break;
      case 'POWER':
        tmp$ = this.setPower_za3lpa$(n);
        break;
      case 'AFFLICTION':
        tmp$ = this.setAffliction_za3lpa$(n);
        break;
      case 'TRAUMA':
        tmp$ = this.setTrauma_za3lpa$(n);
        break;
      case 'MOMENTUM':
        tmp$ = this.setMomentum_za3lpa$(n);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.adjust_hek9tz$ = function (param, n) {
    var tmp$;
    switch (param.name) {
      case 'HEALTH':
        tmp$ = this.setHealth_za3lpa$(this.cdata_wnkotf$_0.state.health + n | 0);
        break;
      case 'DAMAGE':
        tmp$ = this.setDamage_za3lpa$(this.cdata_wnkotf$_0.state.damage + n | 0);
        break;
      case 'FATIGUE':
        tmp$ = this.setFatigue_za3lpa$(this.cdata_wnkotf$_0.state.fatigue + n | 0);
        break;
      case 'POWER':
        tmp$ = this.setPower_za3lpa$(this.cdata_wnkotf$_0.state.power + n | 0);
        break;
      case 'AFFLICTION':
        tmp$ = this.setAffliction_za3lpa$(this.cdata_wnkotf$_0.state.affliction + n | 0);
        break;
      case 'TRAUMA':
        tmp$ = this.setTrauma_za3lpa$(this.cdata_wnkotf$_0.state.trauma + n | 0);
        break;
      case 'MOMENTUM':
        tmp$ = this.setMomentum_za3lpa$(this.cdata_wnkotf$_0.state.momentum + n | 0);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  Character.prototype.increment_hek9tz$ = function (param, n) {
    if (n === void 0)
      n = 1;
    return this.adjust_hek9tz$(param, n);
  };
  Character.prototype.decrement_hek9tz$ = function (param, n) {
    if (n === void 0)
      n = 1;
    return this.adjust_hek9tz$(param, -n | 0);
  };
  Character.prototype.takeDamage_za3lpa$ = function (n) {
    if (n < 1)
      return 0;
    var pwr = this.cdata_wnkotf$_0.state.power;
    var hel = this.cdata_wnkotf$_0.state.health;
    var dmg = this.cdata_wnkotf$_0.state.damage;
    var stg = this.cdata_wnkotf$_0.staggerThreshold;
    var n1 = n - pwr | 0;
    if (n1 > 0) {
      if (pwr > 0) {
        this.setPower_za3lpa$(0);
      }
      if (hel > 0) {
        if (1 <= stg && stg <= n1) {
          this.setCondition_5crjny$(StateCondition$STAGGERED_getInstance());
        }
        var n2 = coerceAtMost(n1, hel);
        var h2 = hel - n2 | 0;
        this.setHealth_za3lpa$(h2);
        if (h2 > 0) {
          this.increment_hek9tz$(StateParam$DAMAGE_getInstance(), n2);
        }
         else {
          if (n2 > 1) {
            this.increment_hek9tz$(StateParam$DAMAGE_getInstance(), n2 - 1 | 0);
          }
          this.increment_hek9tz$(StateParam$FATIGUE_getInstance());
          this.setCondition_5crjny$(StateCondition$UNCONSCIOUS_getInstance());
          this.fulminate();
        }
      }
       else if (dmg > 0) {
        var n2_0 = coerceAtMost(n1, dmg);
        var d1 = dmg - n2_0 | 0;
        this.increment_hek9tz$(StateParam$FATIGUE_getInstance(), n2_0);
        this.setDamage_za3lpa$(d1);
        if (d1 <= 0) {
          this.setCondition_5crjny$(StateCondition$COMATOSE_getInstance());
        }
      }
       else {
        this.setCondition_5crjny$(StateCondition$DEAD_getInstance());
      }
    }
     else {
      this.cdata_wnkotf$_0.state.tapped = true;
      this.setPower_za3lpa$(abs(n1));
    }
    return this.cdata_wnkotf$_0.state.damage - dmg | 0;
  };
  Character.prototype.healDamage_za3lpa$ = function (n) {
    if (n < 1)
      return 0;
    var n1 = n;
    var afl = this.cdata_wnkotf$_0.state.affliction;
    if (afl > 0) {
      var b1 = afl - n | 0;
      this.setAffliction_za3lpa$(coerceAtLeast(b1, 0));
      n1 = b1 >= 0 ? 0 : abs(b1);
    }
    if (n1 < 1)
      return 0;
    var dmg = this.cdata_wnkotf$_0.state.damage;
    n1 = coerceAtMost(n1, dmg);
    var d1 = dmg - n1 | 0;
    this.setDamage_za3lpa$(d1);
    this.increment_hek9tz$(StateParam$HEALTH_getInstance(), n1);
    if (this.cdata_wnkotf$_0.state.health > 0 && this.cdata_wnkotf$_0.state.condition === StateCondition$UNCONSCIOUS_getInstance()) {
      this.setCondition_5crjny$(StateCondition$NORMAL_getInstance());
    }
    return n1;
  };
  Character.prototype.accumulateFatigue_za3lpa$ = function (n) {
    if (n < 1)
      return 0;
    var f1 = n;
    var pwr = this.cdata_wnkotf$_0.state.power;
    if (pwr > 0) {
      this.setPower_za3lpa$(0);
      f1 = f1 - 1 | 0;
    }
    if (f1 < 1)
      return 0;
    var hel = this.cdata_wnkotf$_0.state.health;
    if (hel > 0) {
      var h1 = coerceAtMost(f1, hel);
      var h2 = hel - h1 | 0;
      this.setHealth_za3lpa$(h2);
      this.increment_hek9tz$(StateParam$FATIGUE_getInstance(), h1);
      if (h2 === 0) {
        this.fulminate();
        this.setCondition_5crjny$(StateCondition$UNCONSCIOUS_getInstance());
      }
      f1 = f1 - h1 | 0;
    }
    if (f1 < 1)
      return 0;
    var dmg = this.cdata_wnkotf$_0.state.damage;
    if (dmg > 0) {
      f1 = coerceAtMost(f1, dmg);
      var d1 = dmg - f1 | 0;
      this.setDamage_za3lpa$(d1);
      this.increment_hek9tz$(StateParam$FATIGUE_getInstance(), f1);
      if (d1 === 0) {
        this.setCondition_5crjny$(StateCondition$COMATOSE_getInstance());
      }
    }
     else {
      this.setCondition_5crjny$(StateCondition$DEAD_getInstance());
    }
    return f1;
  };
  Character.prototype.restoreFatigue_za3lpa$ = function (n) {
    if (n < 1)
      return 0;
    var ftg = this.cdata_wnkotf$_0.state.fatigue;
    var afl = this.cdata_wnkotf$_0.state.affliction;
    if (ftg < 1 || afl >= ftg)
      return 0;
    var hel = this.cdata_wnkotf$_0.state.health;
    var cdn = this.cdata_wnkotf$_0.state.condition;
    var f1 = ftg - afl | 0;
    var f2 = coerceAtMost(f1, f1);
    this.decrement_hek9tz$(StateParam$FATIGUE_getInstance(), f2);
    this.increment_hek9tz$(StateParam$HEALTH_getInstance(), f2);
    if (hel > 0 && (cdn === StateCondition$UNCONSCIOUS_getInstance() || cdn === StateCondition$COMATOSE_getInstance())) {
      this.setCondition_5crjny$(StateCondition$NORMAL_getInstance(), true);
    }
    return f2;
  };
  Character.prototype.gainPower_za3lpa$ = function (n) {
    if (n < 0)
      return 0;
    var pwr = this.cdata_wnkotf$_0.state.power;
    var p1 = coerceAtMost(pwr + n | 0, this.cdata_wnkotf$_0.soulpool);
    return this.setPower_za3lpa$(p1) - pwr | 0;
  };
  Character.prototype.consumePower_za3lpa$ = function (n) {
    if (n < 0)
      return 0;
    if (n > 0 && n < this.cdata_wnkotf$_0.state.power) {
      this.cdata_wnkotf$_0.state.tapped = true;
    }
    var pwr = this.cdata_wnkotf$_0.state.power;
    var p1 = coerceAtLeast(pwr - n | 0, 0);
    return pwr - this.setPower_za3lpa$(p1) | 0;
  };
  Character.prototype.sustainAffliction_za3lpa$ = function (n) {
    if (n < 1)
      return 0;
    var brk = this.cdata_wnkotf$_0.state.affliction;
    var max = this.cdata_wnkotf$_0.soulpool;
    var b2 = brk + n | 0;
    if (this.cdata_wnkotf$_0.state.health < 1) {
      this.setAffliction_za3lpa$(b2);
      this.fulminate();
    }
     else if (b2 > max) {
      this.setAffliction_za3lpa$(max);
      this.takeDamage_za3lpa$(b2 - max | 0);
    }
     else {
      this.setAffliction_za3lpa$(b2);
    }
    return b2 - brk | 0;
  };
  Character.prototype.cureAffliction_za3lpa$ = function (n) {
    var afl = this.cdata_wnkotf$_0.state.affliction;
    if (n < 1 || afl < 1)
      return 0;
    var b2 = coerceAtLeast(afl - n | 0, 0);
    return afl - this.setAffliction_za3lpa$(b2) | 0;
  };
  Character.prototype.sufferTrauma_za3lpa$ = function (n) {
    var tmp$;
    if (n < 1)
      return 0;
    var max = this.cdata_wnkotf$_0.soulpool;
    var t2 = this.cdata_wnkotf$_0.state.trauma + n | 0;
    if (t2 > max) {
      this.setCondition_5crjny$(StateCondition$UNCONSCIOUS_getInstance());
      tmp$ = this.setTrauma_za3lpa$(max);
    }
     else {
      tmp$ = this.setTrauma_za3lpa$(t2);
    }
    return tmp$;
  };
  Character.prototype.alleviateTrauma_za3lpa$ = function (n) {
    var trm = this.cdata_wnkotf$_0.state.trauma;
    if (n < 1 || trm < 1)
      return 0;
    var a1 = coerceAtLeast(trm - n | 0, 0);
    this.setTrauma_za3lpa$(a1);
    return trm - a1 | 0;
  };
  Character.prototype.fulminate = function () {
    var afl = this.cdata_wnkotf$_0.state.affliction;
    if (afl < 1)
      return 0;
    var ftg = 0;
    for (var i = 0; i < afl; i++) {
      if (Random.Default.nextInt_za3lpa$(4) < 1)
        ftg = ftg + 1 | 0;
    }
    this.setAffliction_za3lpa$(0);
    if (ftg < 1)
      return 0;
    var dmg = this.cdata_wnkotf$_0.state.damage;
    if (dmg < 1) {
      this.setCondition_5crjny$(StateCondition$DEAD_getInstance());
    }
     else {
      ftg = coerceAtMost(ftg, dmg);
      var d2 = dmg - ftg | 0;
      this.increment_hek9tz$(StateParam$FATIGUE_getInstance(), ftg);
      this.setDamage_za3lpa$(d2);
      if (d2 < 1) {
        this.setCondition_5crjny$(StateCondition$COMATOSE_getInstance());
      }
    }
    return ftg;
  };
  Character.prototype.increaseMomentum_za3lpa$ = function (n) {
    return n < 1 ? 0 : this.increment_hek9tz$(StateParam$MOMENTUM_getInstance(), n);
  };
  Character.prototype.decreaseMomentum_za3lpa$ = function (n) {
    return n < 1 ? 0 : this.decrement_hek9tz$(StateParam$MOMENTUM_getInstance(), n);
  };
  Character.prototype.hasten = function () {
    return this.increaseMomentum_za3lpa$(1);
  };
  Character.prototype.delay = function () {
    return this.decreaseMomentum_za3lpa$(1);
  };
  Character.prototype.getConMode = function () {
    return this.cdata_wnkotf$_0.state.modes.conMode;
  };
  Character.prototype.getDexMode = function () {
    return this.cdata_wnkotf$_0.state.modes.dexMode;
  };
  Character.prototype.getIntMode = function () {
    return this.cdata_wnkotf$_0.state.modes.intMode;
  };
  Character.prototype.getWilMode = function () {
    return this.cdata_wnkotf$_0.state.modes.wilMode;
  };
  Character.prototype.applyMode_p8xhwo$_0 = function (mode, currentMode, force) {
    var tmp$;
    switch (mode.name) {
      case 'ENHANCED':
        switch (currentMode.name) {
          case 'NATURAL':
            tmp$ = StatMode$ENHANCED_getInstance();
            break;
          case 'ENHANCED':
            this.healDamage_za3lpa$(1);
            tmp$ = StatMode$ENHANCED_getInstance();
            break;
          case 'ENFEEBLED':
            tmp$ = force ? StatMode$ENHANCED_getInstance() : StatMode$NATURAL_getInstance();
            break;
          default:tmp$ = Kotlin.noWhenBranchMatched();
            break;
        }

        break;
      case 'ENFEEBLED':
        switch (currentMode.name) {
          case 'NATURAL':
            tmp$ = StatMode$ENFEEBLED_getInstance();
            break;
          case 'ENHANCED':
            tmp$ = force ? StatMode$ENFEEBLED_getInstance() : StatMode$NATURAL_getInstance();
            break;
          case 'ENFEEBLED':
            this.takeDamage_za3lpa$(1);
            tmp$ = StatMode$ENFEEBLED_getInstance();
            break;
          default:tmp$ = Kotlin.noWhenBranchMatched();
            break;
        }

        break;
      default:tmp$ = StatMode$NATURAL_getInstance();
        break;
    }
    return tmp$;
  };
  Character.prototype.setConMode_s34jb6$ = function (mode) {
    this.cdata_wnkotf$_0.state.modes.conMode = mode;
  };
  Character.prototype.setDexMode_s34jb6$ = function (mode) {
    this.cdata_wnkotf$_0.state.modes.dexMode = mode;
  };
  Character.prototype.setIntMode_s34jb6$ = function (mode) {
    this.cdata_wnkotf$_0.state.modes.intMode = mode;
  };
  Character.prototype.setWilMode_s34jb6$ = function (mode) {
    this.cdata_wnkotf$_0.state.modes.wilMode = mode;
  };
  Character.prototype.getMode_f4ewii$ = function (stat) {
    return this.cdata_wnkotf$_0.state.modes.get_f4ewii$(stat);
  };
  Character.prototype.setMode_j9df3p$ = function (stat, mode, force) {
    if (force === void 0)
      force = false;
    this.cdata_wnkotf$_0.state.modes.set_sdu2kk$(stat, this.applyMode_p8xhwo$_0(mode, this.cdata_wnkotf$_0.state.modes.get_f4ewii$(stat), force));
    return this.cdata_wnkotf$_0.state.modes.get_f4ewii$(stat);
  };
  Character.prototype.normalizeMode_f4ewii$ = function (stat) {
    return this.setMode_j9df3p$(stat, StatMode$NATURAL_getInstance());
  };
  Character.prototype.enhanceMode_f4ewii$ = function (stat) {
    return this.setMode_j9df3p$(stat, StatMode$ENHANCED_getInstance());
  };
  Character.prototype.enfeebleMode_f4ewii$ = function (stat) {
    return this.setMode_j9df3p$(stat, StatMode$ENFEEBLED_getInstance());
  };
  Character.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Character',
    interfaces: []
  };
  function CharacterDocument(character, fileId, folderId) {
    this.character = character;
    this.fileId = fileId;
    this.folderId = folderId;
  }
  CharacterDocument.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharacterDocument',
    interfaces: []
  };
  CharacterDocument.prototype.component1 = function () {
    return this.character;
  };
  CharacterDocument.prototype.component2 = function () {
    return this.fileId;
  };
  CharacterDocument.prototype.component3 = function () {
    return this.folderId;
  };
  CharacterDocument.prototype.copy_pc1a4e$ = function (character, fileId, folderId) {
    return new CharacterDocument(character === void 0 ? this.character : character, fileId === void 0 ? this.fileId : fileId, folderId === void 0 ? this.folderId : folderId);
  };
  CharacterDocument.prototype.toString = function () {
    return 'CharacterDocument(character=' + Kotlin.toString(this.character) + (', fileId=' + Kotlin.toString(this.fileId)) + (', folderId=' + Kotlin.toString(this.folderId)) + ')';
  };
  CharacterDocument.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.character) | 0;
    result = result * 31 + Kotlin.hashCode(this.fileId) | 0;
    result = result * 31 + Kotlin.hashCode(this.folderId) | 0;
    return result;
  };
  CharacterDocument.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.character, other.character) && Kotlin.equals(this.fileId, other.fileId) && Kotlin.equals(this.folderId, other.folderId)))));
  };
  function ParticipantStatus(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ParticipantStatus_initFields() {
    ParticipantStatus_initFields = function () {
    };
    ParticipantStatus$FRIEND_instance = new ParticipantStatus('FRIEND', 0);
    ParticipantStatus$FOE_instance = new ParticipantStatus('FOE', 1);
  }
  var ParticipantStatus$FRIEND_instance;
  function ParticipantStatus$FRIEND_getInstance() {
    ParticipantStatus_initFields();
    return ParticipantStatus$FRIEND_instance;
  }
  var ParticipantStatus$FOE_instance;
  function ParticipantStatus$FOE_getInstance() {
    ParticipantStatus_initFields();
    return ParticipantStatus$FOE_instance;
  }
  ParticipantStatus.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ParticipantStatus',
    interfaces: [Enum]
  };
  function ParticipantStatus$values() {
    return [ParticipantStatus$FRIEND_getInstance(), ParticipantStatus$FOE_getInstance()];
  }
  ParticipantStatus.values = ParticipantStatus$values;
  function ParticipantStatus$valueOf(name) {
    switch (name) {
      case 'FRIEND':
        return ParticipantStatus$FRIEND_getInstance();
      case 'FOE':
        return ParticipantStatus$FOE_getInstance();
      default:throwISE('No enum constant wetfe.core.encounter.ParticipantStatus.' + name);
    }
  }
  ParticipantStatus.valueOf_61zpoe$ = ParticipantStatus$valueOf;
  function Participant() {
  }
  Participant.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Participant',
    interfaces: [Comparable]
  };
  function CharacterParticipant(data) {
    if (data === void 0)
      data = new CharaData();
    Character.call(this, data);
    this.key_gyfqhu$_0 = '';
    this.status_9mj45$_0 = ParticipantStatus$FRIEND_getInstance();
    this.initiative_2wbsph$_0 = 0.0;
  }
  Object.defineProperty(CharacterParticipant.prototype, 'key', {
    get: function () {
      return this.key_gyfqhu$_0;
    },
    set: function (key) {
      this.key_gyfqhu$_0 = key;
    }
  });
  Object.defineProperty(CharacterParticipant.prototype, 'status', {
    get: function () {
      return this.status_9mj45$_0;
    },
    set: function (status) {
      this.status_9mj45$_0 = status;
    }
  });
  Object.defineProperty(CharacterParticipant.prototype, 'initiative', {
    get: function () {
      return this.initiative_2wbsph$_0;
    },
    set: function (initiative) {
      this.initiative_2wbsph$_0 = initiative;
    }
  });
  CharacterParticipant.prototype.initalize_61zpoe$ = function (key) {
    this.key = key;
    this.setHealth_za3lpa$(this.getSoulpool());
    this.setDamage_za3lpa$(0);
    this.setFatigue_za3lpa$(0);
    this.setPower_za3lpa$(0);
    this.setAffliction_za3lpa$(0);
    this.setTrauma_za3lpa$(0);
    this.setMomentum_za3lpa$(0);
    this.setCondition_5crjny$(StateCondition$NORMAL_getInstance());
    this.setConMode_s34jb6$(StatMode$NATURAL_getInstance());
    this.setDexMode_s34jb6$(StatMode$NATURAL_getInstance());
    this.setIntMode_s34jb6$(StatMode$NATURAL_getInstance());
    this.setWilMode_s34jb6$(StatMode$NATURAL_getInstance());
    this.untap();
    return this;
  };
  CharacterParticipant.prototype.getStateParam_alacmf$ = function (param) {
    return this.getParam_alacmf$(param);
  };
  CharacterParticipant.prototype.setStateParam_hek9tz$ = function (param, n) {
    return this.setParam_hek9tz$(param, n);
  };
  CharacterParticipant.prototype.adjustStateParam_hek9tz$ = function (param, n) {
    return this.adjust_hek9tz$(param, n);
  };
  CharacterParticipant.prototype.incrementStateParam_alacmf$ = function (param) {
    return this.increment_hek9tz$(param);
  };
  CharacterParticipant.prototype.decrementStateParam_alacmf$ = function (param) {
    return this.decrement_hek9tz$(param);
  };
  CharacterParticipant.prototype.getCoreParam_qosqn7$ = function (param) {
    return this.getParam_qosqn7$(param);
  };
  CharacterParticipant.prototype.setCoreParam_n8b7wr$ = function (param, n) {
    return this.setParam_n8b7wr$(param, n);
  };
  CharacterParticipant.prototype.adjustCoreParam_n8b7wr$ = function (param, n) {
    return this.adjust_n8b7wr$(param, n);
  };
  CharacterParticipant.prototype.incrementCoreParam_qosqn7$ = function (param) {
    return this.increment_n8b7wr$(param);
  };
  CharacterParticipant.prototype.decrementCoreParam_qosqn7$ = function (param) {
    return this.decrement_n8b7wr$(param);
  };
  CharacterParticipant.prototype.compareTo_11rb$ = function (other) {
    return numberToInt(other.initiative) - numberToInt(this.initiative) | 0;
  };
  CharacterParticipant.prototype.applyModeKey_qz9155$ = function (mode, currentMode, force) {
    var tmp$;
    switch (mode) {
      case '+':
        switch (currentMode) {
          case '=':
            tmp$ = '+';
            break;
          case '+':
            this.healDamage_za3lpa$(1);
            tmp$ = '+';
            break;
          case '-':
            tmp$ = force ? '+' : '=';
            break;
          default:tmp$ = '=';
            break;
        }

        break;
      case '-':
        switch (currentMode) {
          case '=':
            tmp$ = '-';
            break;
          case '+':
            tmp$ = force ? '-' : '=';
            break;
          case '-':
            this.takeDamage_za3lpa$(1);
            tmp$ = '-';
            break;
          default:tmp$ = '=';
            break;
        }

        break;
      default:tmp$ = '=';
        break;
    }
    return tmp$;
  };
  CharacterParticipant.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CharacterParticipant',
    interfaces: [Participant, Character]
  };
  function EncounterType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function EncounterType_initFields() {
    EncounterType_initFields = function () {
    };
    EncounterType$COMBAT_instance = new EncounterType('COMBAT', 0);
    EncounterType$SOCIAL_instance = new EncounterType('SOCIAL', 1);
    EncounterType$ENVIRONMENTAL_instance = new EncounterType('ENVIRONMENTAL', 2);
  }
  var EncounterType$COMBAT_instance;
  function EncounterType$COMBAT_getInstance() {
    EncounterType_initFields();
    return EncounterType$COMBAT_instance;
  }
  var EncounterType$SOCIAL_instance;
  function EncounterType$SOCIAL_getInstance() {
    EncounterType_initFields();
    return EncounterType$SOCIAL_instance;
  }
  var EncounterType$ENVIRONMENTAL_instance;
  function EncounterType$ENVIRONMENTAL_getInstance() {
    EncounterType_initFields();
    return EncounterType$ENVIRONMENTAL_instance;
  }
  EncounterType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EncounterType',
    interfaces: [Enum]
  };
  function EncounterType$values() {
    return [EncounterType$COMBAT_getInstance(), EncounterType$SOCIAL_getInstance(), EncounterType$ENVIRONMENTAL_getInstance()];
  }
  EncounterType.values = EncounterType$values;
  function EncounterType$valueOf(name) {
    switch (name) {
      case 'COMBAT':
        return EncounterType$COMBAT_getInstance();
      case 'SOCIAL':
        return EncounterType$SOCIAL_getInstance();
      case 'ENVIRONMENTAL':
        return EncounterType$ENVIRONMENTAL_getInstance();
      default:throwISE('No enum constant wetfe.core.encounter.EncounterType.' + name);
    }
  }
  EncounterType.valueOf_61zpoe$ = EncounterType$valueOf;
  function Encounter(type) {
    Encounter$Companion_getInstance();
    this.type = type;
    this.round = 0;
    this.nameMap = LinkedHashMap_init();
    this.participants = LinkedHashMap_init();
    this.participantOrder = [];
    this.activeParticipantIndex_224cm1$_0 = 0;
    this.targetParticipantIndex_v11q5q$_0 = 0;
  }
  Object.defineProperty(Encounter.prototype, 'activeParticipantIndex', {
    get: function () {
      return this.activeParticipantIndex_224cm1$_0;
    },
    set: function (i) {
      this.activeParticipantIndex_224cm1$_0 = this.coerceIndex_0(i);
    }
  });
  Object.defineProperty(Encounter.prototype, 'targetParticipantIndex', {
    get: function () {
      return this.targetParticipantIndex_v11q5q$_0;
    },
    set: function (i) {
      this.targetParticipantIndex_v11q5q$_0 = this.coerceIndex_0(i);
    }
  });
  Encounter.prototype.generateKey_0 = function (name, i, b) {
    var tmp$;
    if (b) {
      var endIndex = coerceAtMost(3, name.length);
      tmp$ = name.substring(0, endIndex) + toString(i > 1 ? i : '');
    }
     else
      tmp$ = '' + String.fromCharCode(toBoxedChar(first(name))) + String.fromCharCode(toBoxedChar(last(name))) + toString(i);
    return tmp$;
  };
  Encounter.prototype.generateKey_1 = function (p) {
    var tmp$;
    var name = isBlank(p.getName()) ? 'Unknown' : p.getName();
    var i = (tmp$ = this.nameMap.get_11rb$(name)) != null ? tmp$ : 0;
    var $receiver = this.nameMap;
    var value = (i = i + 1 | 0, i);
    $receiver.put_xwzc9p$(name, value);
    return this.generateKey_0(name, i, p.isPlayerSource());
  };
  Encounter.prototype.coerceIndex_0 = function (i) {
    return this.participantOrder.length === 0 || i < 0 ? 0 : i >= this.participantOrder.length ? this.participantOrder.length - 1 | 0 : i;
  };
  Encounter.prototype.indexIsValid_0 = function (i) {
    return i >= 0 && i < this.participantOrder.length;
  };
  Encounter.prototype.getParticipant_61zpoe$ = function (key) {
    return this.participants.get_11rb$(key);
  };
  Encounter.prototype.getActiveParticipant = function () {
    return this.indexIsValid_0(this.activeParticipantIndex) ? this.participantOrder[this.activeParticipantIndex] : null;
  };
  Encounter.prototype.getTargetParticipant = function () {
    return this.indexIsValid_0(this.targetParticipantIndex) ? this.participantOrder[this.targetParticipantIndex] : null;
  };
  Encounter.prototype.addParticipant_qgd5te$ = function (p) {
    var pkey = this.generateKey_1(p);
    p.initalize_61zpoe$(pkey);
    this.participants.put_xwzc9p$(pkey, p);
    this.participantOrder[this.participantOrder.length] = p;
    return this;
  };
  Encounter.prototype.removeParticipant_61zpoe$ = function (pkey) {
    var participant = this.participants.get_11rb$(pkey);
    if (participant != null) {
      this.participants.remove_11rb$(pkey);
      var $receiver = this.participantOrder;
      var destination = ArrayList_init();
      var tmp$;
      for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
        var element = $receiver[tmp$];
        if (!equals(element.key, participant.key))
          destination.add_11rb$(element);
      }
      var pList = destination;
      this.participantOrder = copyToArray(pList);
      if (this.activeParticipantIndex === (this.participantOrder.length - 1 | 0)) {
        this.activeParticipantIndex = this.activeParticipantIndex - 1 | 0;
      }
      this.targetParticipantIndex = this.activeParticipantIndex;
    }
    return this;
  };
  Encounter.prototype.targetNext = function () {
    this.activeParticipantIndex = this.activeParticipantIndex + 1 | 0;
    return this;
  };
  Encounter.prototype.activateNext = function () {
    this.targetParticipantIndex = this.targetParticipantIndex + 1 | 0;
    return this;
  };
  function Encounter$Companion() {
    Encounter$Companion_instance = this;
    this.irollBase_0 = coerceIn(35.0, 0.0, 49.999);
    this.irollFactor_0 = coerceAtLeast_0(2.236, 0.001);
    this.irollMin = this.irollBase_0;
    this.irollMax = 100.0 - this.irollBase_0;
  }
  Encounter$Companion.prototype.irollAdjustment_za3lpa$ = function (p) {
    return this.irollBase_0 * p / (p < 0 ? p - this.irollFactor_0 : p + this.irollFactor_0);
  };
  Encounter$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Encounter$Companion_instance = null;
  function Encounter$Companion_getInstance() {
    if (Encounter$Companion_instance === null) {
      new Encounter$Companion();
    }
    return Encounter$Companion_instance;
  }
  Encounter.prototype.startNewRound = function () {
    var tmp$, tmp$_0;
    this.activeParticipantIndex = 0;
    if (!(this.participantOrder.length === 0)) {
      tmp$ = this.participantOrder;
      for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
        var participant = tmp$[tmp$_0];
        participant.initiative = Random.Default.nextDouble_lu1900$(Encounter$Companion_getInstance().irollMin, Encounter$Companion_getInstance().irollMax) + Encounter$Companion_getInstance().irollAdjustment_za3lpa$(participant.getMomentum());
        participant.setMomentum_za3lpa$(0);
      }
      sort(this.participantOrder);
    }
    this.round = this.round + 1 | 0;
    return this;
  };
  Encounter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Encounter',
    interfaces: []
  };
  function DataSource(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function DataSource_initFields() {
    DataSource_initFields = function () {
    };
    DataSource$PLAYER_instance = new DataSource('PLAYER', 0);
    DataSource$OFFICIAL_instance = new DataSource('OFFICIAL', 1);
    DataSource$PUBLISHED_instance = new DataSource('PUBLISHED', 2);
    DataSource$HOMEBREW_instance = new DataSource('HOMEBREW', 3);
  }
  var DataSource$PLAYER_instance;
  function DataSource$PLAYER_getInstance() {
    DataSource_initFields();
    return DataSource$PLAYER_instance;
  }
  var DataSource$OFFICIAL_instance;
  function DataSource$OFFICIAL_getInstance() {
    DataSource_initFields();
    return DataSource$OFFICIAL_instance;
  }
  var DataSource$PUBLISHED_instance;
  function DataSource$PUBLISHED_getInstance() {
    DataSource_initFields();
    return DataSource$PUBLISHED_instance;
  }
  var DataSource$HOMEBREW_instance;
  function DataSource$HOMEBREW_getInstance() {
    DataSource_initFields();
    return DataSource$HOMEBREW_instance;
  }
  DataSource.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DataSource',
    interfaces: [Enum]
  };
  function DataSource$values() {
    return [DataSource$PLAYER_getInstance(), DataSource$OFFICIAL_getInstance(), DataSource$PUBLISHED_getInstance(), DataSource$HOMEBREW_getInstance()];
  }
  DataSource.values = DataSource$values;
  function DataSource$valueOf(name) {
    switch (name) {
      case 'PLAYER':
        return DataSource$PLAYER_getInstance();
      case 'OFFICIAL':
        return DataSource$OFFICIAL_getInstance();
      case 'PUBLISHED':
        return DataSource$PUBLISHED_getInstance();
      case 'HOMEBREW':
        return DataSource$HOMEBREW_getInstance();
      default:throwISE('No enum constant wetfe.core.game.DataSource.' + name);
    }
  }
  DataSource.valueOf_61zpoe$ = DataSource$valueOf;
  function Physicality(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Physicality_initFields() {
    Physicality_initFields = function () {
    };
    Physicality$CONFLUENT_instance = new Physicality('CONFLUENT', 0);
    Physicality$INFERNAL_instance = new Physicality('INFERNAL', 1);
    Physicality$CELESTIAL_instance = new Physicality('CELESTIAL', 2);
    Physicality$EXOTIC_instance = new Physicality('EXOTIC', 3);
  }
  var Physicality$CONFLUENT_instance;
  function Physicality$CONFLUENT_getInstance() {
    Physicality_initFields();
    return Physicality$CONFLUENT_instance;
  }
  var Physicality$INFERNAL_instance;
  function Physicality$INFERNAL_getInstance() {
    Physicality_initFields();
    return Physicality$INFERNAL_instance;
  }
  var Physicality$CELESTIAL_instance;
  function Physicality$CELESTIAL_getInstance() {
    Physicality_initFields();
    return Physicality$CELESTIAL_instance;
  }
  var Physicality$EXOTIC_instance;
  function Physicality$EXOTIC_getInstance() {
    Physicality_initFields();
    return Physicality$EXOTIC_instance;
  }
  Physicality.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Physicality',
    interfaces: [Enum]
  };
  function Physicality$values() {
    return [Physicality$CONFLUENT_getInstance(), Physicality$INFERNAL_getInstance(), Physicality$CELESTIAL_getInstance(), Physicality$EXOTIC_getInstance()];
  }
  Physicality.values = Physicality$values;
  function Physicality$valueOf(name) {
    switch (name) {
      case 'CONFLUENT':
        return Physicality$CONFLUENT_getInstance();
      case 'INFERNAL':
        return Physicality$INFERNAL_getInstance();
      case 'CELESTIAL':
        return Physicality$CELESTIAL_getInstance();
      case 'EXOTIC':
        return Physicality$EXOTIC_getInstance();
      default:throwISE('No enum constant wetfe.core.universe.Physicality.' + name);
    }
  }
  Physicality.valueOf_61zpoe$ = Physicality$valueOf;
  function Vulnerability(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Vulnerability_initFields() {
    Vulnerability_initFields = function () {
    };
    Vulnerability$NEGATIVE_instance = new Vulnerability('NEGATIVE', 0);
    Vulnerability$POSITIVE_instance = new Vulnerability('POSITIVE', 1);
    Vulnerability$INVERSE_instance = new Vulnerability('INVERSE', 2);
    Vulnerability$HYPER_instance = new Vulnerability('HYPER', 3);
  }
  var Vulnerability$NEGATIVE_instance;
  function Vulnerability$NEGATIVE_getInstance() {
    Vulnerability_initFields();
    return Vulnerability$NEGATIVE_instance;
  }
  var Vulnerability$POSITIVE_instance;
  function Vulnerability$POSITIVE_getInstance() {
    Vulnerability_initFields();
    return Vulnerability$POSITIVE_instance;
  }
  var Vulnerability$INVERSE_instance;
  function Vulnerability$INVERSE_getInstance() {
    Vulnerability_initFields();
    return Vulnerability$INVERSE_instance;
  }
  var Vulnerability$HYPER_instance;
  function Vulnerability$HYPER_getInstance() {
    Vulnerability_initFields();
    return Vulnerability$HYPER_instance;
  }
  Vulnerability.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vulnerability',
    interfaces: [Enum]
  };
  function Vulnerability$values() {
    return [Vulnerability$NEGATIVE_getInstance(), Vulnerability$POSITIVE_getInstance(), Vulnerability$INVERSE_getInstance(), Vulnerability$HYPER_getInstance()];
  }
  Vulnerability.values = Vulnerability$values;
  function Vulnerability$valueOf(name) {
    switch (name) {
      case 'NEGATIVE':
        return Vulnerability$NEGATIVE_getInstance();
      case 'POSITIVE':
        return Vulnerability$POSITIVE_getInstance();
      case 'INVERSE':
        return Vulnerability$INVERSE_getInstance();
      case 'HYPER':
        return Vulnerability$HYPER_getInstance();
      default:throwISE('No enum constant wetfe.core.universe.Vulnerability.' + name);
    }
  }
  Vulnerability.valueOf_61zpoe$ = Vulnerability$valueOf;
  function Physics() {
    Physics_instance = this;
  }
  Physics.prototype.vulnerabilityOf_c8hzt0$ = function (causativeSystem, affectedSystem) {
    var tmp$;
    switch (causativeSystem.name) {
      case 'INFERNAL':
        switch (affectedSystem.name) {
          case 'INFERNAL':
            tmp$ = Vulnerability$INVERSE_getInstance();
            break;
          case 'CELESTIAL':
            tmp$ = Vulnerability$HYPER_getInstance();
            break;
          case 'EXOTIC':
            tmp$ = Vulnerability$NEGATIVE_getInstance();
            break;
          default:tmp$ = Vulnerability$POSITIVE_getInstance();
            break;
        }

        break;
      case 'CELESTIAL':
        switch (affectedSystem.name) {
          case 'CELESTIAL':
            tmp$ = Vulnerability$INVERSE_getInstance();
            break;
          case 'INFERNAL':
            tmp$ = Vulnerability$HYPER_getInstance();
            break;
          case 'EXOTIC':
            tmp$ = Vulnerability$NEGATIVE_getInstance();
            break;
          default:tmp$ = Vulnerability$POSITIVE_getInstance();
            break;
        }

        break;
      case 'EXOTIC':
        if (equals(affectedSystem, Physicality$EXOTIC_getInstance()))
          tmp$ = Vulnerability$HYPER_getInstance();
        else
          tmp$ = Vulnerability$POSITIVE_getInstance();
        break;
      default:tmp$ = Vulnerability$POSITIVE_getInstance();
        break;
    }
    return tmp$;
  };
  Physics.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Physics',
    interfaces: []
  };
  var Physics_instance = null;
  function Physics_getInstance() {
    if (Physics_instance === null) {
      new Physics();
    }
    return Physics_instance;
  }
  function Event(x, y, z, t) {
    if (x === void 0)
      x = 0;
    if (y === void 0)
      y = 0;
    if (z === void 0)
      z = 0;
    if (t === void 0)
      t = 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
  }
  Event.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Event',
    interfaces: []
  };
  Event.prototype.component1 = function () {
    return this.x;
  };
  Event.prototype.component2 = function () {
    return this.y;
  };
  Event.prototype.component3 = function () {
    return this.z;
  };
  Event.prototype.component4 = function () {
    return this.t;
  };
  Event.prototype.copy_tjonv8$ = function (x, y, z, t) {
    return new Event(x === void 0 ? this.x : x, y === void 0 ? this.y : y, z === void 0 ? this.z : z, t === void 0 ? this.t : t);
  };
  Event.prototype.toString = function () {
    return 'Event(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', z=' + Kotlin.toString(this.z)) + (', t=' + Kotlin.toString(this.t)) + ')';
  };
  Event.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.z) | 0;
    result = result * 31 + Kotlin.hashCode(this.t) | 0;
    return result;
  };
  Event.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.z, other.z) && Kotlin.equals(this.t, other.t)))));
  };
  Object.defineProperty(CoreParam, 'LEVEL', {
    get: CoreParam$LEVEL_getInstance
  });
  Object.defineProperty(CoreParam, 'EXPERIENCE', {
    get: CoreParam$EXPERIENCE_getInstance
  });
  Object.defineProperty(CoreParam, 'SOULPOOL', {
    get: CoreParam$SOULPOOL_getInstance
  });
  Object.defineProperty(CoreParam, 'CONSTITUTION', {
    get: CoreParam$CONSTITUTION_getInstance
  });
  Object.defineProperty(CoreParam, 'DEXTERITY', {
    get: CoreParam$DEXTERITY_getInstance
  });
  Object.defineProperty(CoreParam, 'INTELLIGENCE', {
    get: CoreParam$INTELLIGENCE_getInstance
  });
  Object.defineProperty(CoreParam, 'WILLPOWER', {
    get: CoreParam$WILLPOWER_getInstance
  });
  Object.defineProperty(CoreParam, 'Companion', {
    get: CoreParam$Companion_getInstance
  });
  var package$wetfe = _.wetfe || (_.wetfe = {});
  var package$core = package$wetfe.core || (package$wetfe.core = {});
  var package$character = package$core.character || (package$core.character = {});
  package$character.CoreParam = CoreParam;
  Object.defineProperty(QuadStat, 'CONSTITUTION', {
    get: QuadStat$CONSTITUTION_getInstance
  });
  Object.defineProperty(QuadStat, 'DEXTERITY', {
    get: QuadStat$DEXTERITY_getInstance
  });
  Object.defineProperty(QuadStat, 'INTELLIGENCE', {
    get: QuadStat$INTELLIGENCE_getInstance
  });
  Object.defineProperty(QuadStat, 'WILLPOWER', {
    get: QuadStat$WILLPOWER_getInstance
  });
  Object.defineProperty(QuadStat, 'Companion', {
    get: QuadStat$Companion_getInstance
  });
  package$character.QuadStat = QuadStat;
  Object.defineProperty(StatMode, 'NATURAL', {
    get: StatMode$NATURAL_getInstance
  });
  Object.defineProperty(StatMode, 'ENHANCED', {
    get: StatMode$ENHANCED_getInstance
  });
  Object.defineProperty(StatMode, 'ENFEEBLED', {
    get: StatMode$ENFEEBLED_getInstance
  });
  Object.defineProperty(StatMode, 'Companion', {
    get: StatMode$Companion_getInstance
  });
  package$character.StatMode = StatMode;
  Object.defineProperty(StateParam, 'HEALTH', {
    get: StateParam$HEALTH_getInstance
  });
  Object.defineProperty(StateParam, 'DAMAGE', {
    get: StateParam$DAMAGE_getInstance
  });
  Object.defineProperty(StateParam, 'FATIGUE', {
    get: StateParam$FATIGUE_getInstance
  });
  Object.defineProperty(StateParam, 'POWER', {
    get: StateParam$POWER_getInstance
  });
  Object.defineProperty(StateParam, 'AFFLICTION', {
    get: StateParam$AFFLICTION_getInstance
  });
  Object.defineProperty(StateParam, 'TRAUMA', {
    get: StateParam$TRAUMA_getInstance
  });
  Object.defineProperty(StateParam, 'MOMENTUM', {
    get: StateParam$MOMENTUM_getInstance
  });
  Object.defineProperty(StateParam, 'Companion', {
    get: StateParam$Companion_getInstance
  });
  package$character.StateParam = StateParam;
  Object.defineProperty(StateCondition, 'NORMAL', {
    get: StateCondition$NORMAL_getInstance
  });
  Object.defineProperty(StateCondition, 'BLITZING', {
    get: StateCondition$BLITZING_getInstance
  });
  Object.defineProperty(StateCondition, 'TURTLING', {
    get: StateCondition$TURTLING_getInstance
  });
  Object.defineProperty(StateCondition, 'CHANNELING', {
    get: StateCondition$CHANNELING_getInstance
  });
  Object.defineProperty(StateCondition, 'STAGGERED', {
    get: StateCondition$STAGGERED_getInstance
  });
  Object.defineProperty(StateCondition, 'UNCONSCIOUS', {
    get: StateCondition$UNCONSCIOUS_getInstance
  });
  Object.defineProperty(StateCondition, 'COMATOSE', {
    get: StateCondition$COMATOSE_getInstance
  });
  Object.defineProperty(StateCondition, 'DEAD', {
    get: StateCondition$DEAD_getInstance
  });
  Object.defineProperty(StateCondition, 'Companion', {
    get: StateCondition$Companion_getInstance
  });
  package$character.StateCondition = StateCondition;
  Object.defineProperty(package$character, 'MAX_INT', {
    get: function () {
      return MAX_INT;
    }
  });
  Object.defineProperty(package$character, 'MIN_INT', {
    get: function () {
      return MIN_INT;
    }
  });
  Object.defineProperty(Attribute$Limit, 'UNBOUNDED', {
    get: Attribute$Limit$UNBOUNDED_getInstance
  });
  Object.defineProperty(Attribute$Limit, 'POS_UNBOUNDED', {
    get: Attribute$Limit$POS_UNBOUNDED_getInstance
  });
  Object.defineProperty(Attribute$Limit, 'CHIP', {
    get: Attribute$Limit$CHIP_getInstance
  });
  Object.defineProperty(Attribute$Limit, 'CORE', {
    get: Attribute$Limit$CORE_getInstance
  });
  Object.defineProperty(Attribute$Limit, 'D20', {
    get: Attribute$Limit$D20_getInstance
  });
  Object.defineProperty(Attribute$Limit, 'Companion', {
    get: Attribute$Limit$Companion_getInstance
  });
  Attribute.prototype.Limit = Attribute$Limit;
  Object.defineProperty(Attribute$Nature, 'UNDEFINED', {
    get: Attribute$Nature$UNDEFINED_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'ABSENT', {
    get: Attribute$Nature$ABSENT_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'PALTRY', {
    get: Attribute$Nature$PALTRY_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'RUDIMENTARY', {
    get: Attribute$Nature$RUDIMENTARY_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'INFERIOR', {
    get: Attribute$Nature$INFERIOR_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'UNREMARKABLE', {
    get: Attribute$Nature$UNREMARKABLE_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'RESPECTABLE', {
    get: Attribute$Nature$RESPECTABLE_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'CONSIDERABLE', {
    get: Attribute$Nature$CONSIDERABLE_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'FORMIDABLE', {
    get: Attribute$Nature$FORMIDABLE_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'PHENOMENAL', {
    get: Attribute$Nature$PHENOMENAL_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'PRODIGIOUS', {
    get: Attribute$Nature$PRODIGIOUS_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'MIRACULOUS', {
    get: Attribute$Nature$MIRACULOUS_getInstance
  });
  Object.defineProperty(Attribute$Nature, 'Companion', {
    get: Attribute$Nature$Companion_getInstance
  });
  Attribute.prototype.Nature = Attribute$Nature;
  Object.defineProperty(package$character, 'Attribute', {
    get: Attribute_getInstance
  });
  package$character.StatModeState = StatModeState;
  package$character.CharaSpec = CharaSpec;
  package$character.CharaState = CharaState;
  package$character.CharaRepertoire = CharaRepertoire;
  Object.defineProperty(CharaData, 'Companion', {
    get: CharaData$Companion_getInstance
  });
  package$character.CharaData = CharaData;
  package$character.Character = Character;
  package$character.CharacterDocument = CharacterDocument;
  Object.defineProperty(ParticipantStatus, 'FRIEND', {
    get: ParticipantStatus$FRIEND_getInstance
  });
  Object.defineProperty(ParticipantStatus, 'FOE', {
    get: ParticipantStatus$FOE_getInstance
  });
  var package$encounter = package$core.encounter || (package$core.encounter = {});
  package$encounter.ParticipantStatus = ParticipantStatus;
  package$encounter.Participant = Participant;
  package$encounter.CharacterParticipant = CharacterParticipant;
  Object.defineProperty(EncounterType, 'COMBAT', {
    get: EncounterType$COMBAT_getInstance
  });
  Object.defineProperty(EncounterType, 'SOCIAL', {
    get: EncounterType$SOCIAL_getInstance
  });
  Object.defineProperty(EncounterType, 'ENVIRONMENTAL', {
    get: EncounterType$ENVIRONMENTAL_getInstance
  });
  package$encounter.EncounterType = EncounterType;
  Object.defineProperty(Encounter, 'Companion', {
    get: Encounter$Companion_getInstance
  });
  package$encounter.Encounter = Encounter;
  Object.defineProperty(DataSource, 'PLAYER', {
    get: DataSource$PLAYER_getInstance
  });
  Object.defineProperty(DataSource, 'OFFICIAL', {
    get: DataSource$OFFICIAL_getInstance
  });
  Object.defineProperty(DataSource, 'PUBLISHED', {
    get: DataSource$PUBLISHED_getInstance
  });
  Object.defineProperty(DataSource, 'HOMEBREW', {
    get: DataSource$HOMEBREW_getInstance
  });
  var package$game = package$core.game || (package$core.game = {});
  package$game.DataSource = DataSource;
  Object.defineProperty(Physicality, 'CONFLUENT', {
    get: Physicality$CONFLUENT_getInstance
  });
  Object.defineProperty(Physicality, 'INFERNAL', {
    get: Physicality$INFERNAL_getInstance
  });
  Object.defineProperty(Physicality, 'CELESTIAL', {
    get: Physicality$CELESTIAL_getInstance
  });
  Object.defineProperty(Physicality, 'EXOTIC', {
    get: Physicality$EXOTIC_getInstance
  });
  var package$universe = package$core.universe || (package$core.universe = {});
  package$universe.Physicality = Physicality;
  Object.defineProperty(Vulnerability, 'NEGATIVE', {
    get: Vulnerability$NEGATIVE_getInstance
  });
  Object.defineProperty(Vulnerability, 'POSITIVE', {
    get: Vulnerability$POSITIVE_getInstance
  });
  Object.defineProperty(Vulnerability, 'INVERSE', {
    get: Vulnerability$INVERSE_getInstance
  });
  Object.defineProperty(Vulnerability, 'HYPER', {
    get: Vulnerability$HYPER_getInstance
  });
  package$universe.Vulnerability = Vulnerability;
  Object.defineProperty(package$universe, 'Physics', {
    get: Physics_getInstance
  });
  package$universe.Event = Event;
  MAX_INT = 65535;
  MIN_INT = -65535;
  Kotlin.defineModule('wetfe', _);
  return _;
}(typeof wetfe === 'undefined' ? {} : wetfe, kotlin);
