package wetfe.core.chara

import kotlin.math.absoluteValue
import kotlin.random.Random

/**
 *  Modification
 *  ------------------------------------
 */
data class Modification<T>(val value: T, val type: String, val notes: String = "", val timestamp: Long)

/**
 *  ModHistory
 *  ------------------------------------
 */
abstract class ModHistory<T> {
    open val mods: MutableList<Modification<T>> = mutableListOf()

    open fun add(mod: Modification<T>) {
        mods.add(mod)
    }

    open fun history() : Iterator<Modification<T>> {
        return mods.iterator()
    }

    abstract fun evaluate() : T
}

/**
 *  Evolution
 *  ------------------------------------
 */
class Evolution<T> : ModHistory<T>() {
    override fun evaluate() : T {
        return mods.last().value
    }
}

/**
 *  Summation
 *  ------------------------------------
 */
class Summation : ModHistory<Int>() {
    override fun evaluate() : Int {
        var total = 0
        for (mod: Modification<Int> in mods) {
            total += mod.value
        }
        return total
    }
}

/**
 *  CharaSpec
 *  -----------------------------------
 */
data class CharaSpec(var tier: Int, var name: String, var custom_name: String = "")

/**
 *  CoreParam
 *  -----------------------------------
 *  The core numerical parameters of a Character.
 */
enum class CoreParam(val key: String) {
    SOUL_POOL("SP"),
    LEVEL("LVL"),
    EXPERIENCE("EXP"),
    CONSTITUTION("CON"),
    DEXTERITY("DEX"),
    INTELLIGENCE("INT"),
    WILLPOWER("WIL");

    companion object {
        private val lookupMap: Map<String, CoreParam>
        init {
            val initMap: MutableMap<String, CoreParam> = mutableMapOf()
            for (param in values()) {
                initMap[param.key] = param
            }
            lookupMap = initMap.toMap()
        }

        fun lookup(key: String) : CoreParam? {
            return lookupMap[key]
        }
    }
}

/**
 *  QuadStat
 *  -----------------------------------
 *  The four fundamental character statistics that govern their actions in encounters.
 */
enum class QuadStat(val key: String) {
    CONSTITUTION("CON"),
    DEXTERITY("DEX"),
    INTELLIGENCE("INT"),
    WILLPOWER("WIL");

    companion object {
        private val lookupMap: Map<String, QuadStat>
        init {
            val initMap: MutableMap<String, QuadStat> = mutableMapOf()
            for (stat in values()) {
                initMap[stat.key] = stat
            }
            lookupMap = initMap.toMap()
        }

        fun lookup(key: String) : QuadStat? {
            return lookupMap[key]
        }
    }
}

/**
 *  StatMode
 *  -----------------------------------
 *  The modes that affect the operation of a Character's core parameters.
 */
enum class StatMode(val key: String) {
    NATURAL("NATURAL"),
    ENHANCED("ENHANCED"),
    ENFEEBLED("ENFEEBLED");

    companion object {
        private val LOOKUP_MAP: Map<String, StatMode>
        init {
            val initMap: MutableMap<String, StatMode> = mutableMapOf()
            for (mode in values()) {
                initMap[mode.key] = mode
            }
            LOOKUP_MAP = initMap.toMap()
        }

        fun lookup(key: String) : StatMode? {
            return LOOKUP_MAP[key]
        }
    }
}

/**
 *  StateParam
 *  -----------------------------------
 *  The numerical parameters of a Character's (temporary) state.
 */
enum class StateParam(val key: String) {
    POWER("PWR"),
    HEALTH("HEL"),
    BREAKAGE("BRK"),
    DAMAGE("DMG"),
    AFFLICTION("AFL"),
    FATIGUE("FTG"),
    MOMENTUM("MTM");

    companion object {
        private val lookupMap: Map<String, StateParam>
        init {
            val initMap: MutableMap<String, StateParam> = mutableMapOf()
            for (param in values()) {
                initMap[param.key] = param
            }
            lookupMap = initMap.toMap()
        }

        fun lookup(key: String) : StateParam? {
            return lookupMap[key]
        }
    }
}

/**
 *  StateCondition
 *  -----------------------------------
 *  The priority-based conditions that affect Characters.
 */
enum class StateCondition(val key: String, val priority: Int) {
    NORMAL("NORMAL", 0),
    BLITZING("BLITZING", 30),
    TURTLING("TURTLING", 30),
    CHANNELING("CHANNELING", 30),
    STAGGERED("STAGGERED", 60),
    UNCONSCIOUS("UNCONSCIOUS", 70),
    COMATOSE("COMATOSE", 80),
    DEAD("DEAD", 90);
}

const val MAX_INT = 65535
const val MIN_INT = -65535

/**
 *  Attribute
 *  -----------------------------------
 *  Character attribute related definitions and functions.
 */
object Attribute {
    enum class Limit(val min: Int, val max: Int) {
        UNBOUNDED(MIN_INT, MAX_INT),
        POS_UNBOUNDED(1, MAX_INT),
        CHIP(0, MAX_INT),
        CORE(0, 20),
        D20(1, 20);

        fun coerce(n: Int) : Int {
            return n.coerceAtLeast(min).coerceAtMost(max)
        }

        companion object {
            fun of(param: CoreParam) : Limit {
                return when (param) {
                    CoreParam.SOUL_POOL -> POS_UNBOUNDED
                    CoreParam.LEVEL -> POS_UNBOUNDED
                    CoreParam.EXPERIENCE -> POS_UNBOUNDED
                    CoreParam.CONSTITUTION -> CORE
                    CoreParam.DEXTERITY -> CORE
                    CoreParam.INTELLIGENCE -> CORE
                    CoreParam.WILLPOWER -> CORE
                }
            }

            fun of(param: StateParam) : Limit {
                return when (param) {
                    StateParam.POWER -> CHIP
                    StateParam.HEALTH -> CHIP
                    StateParam.BREAKAGE -> CHIP
                    StateParam.DAMAGE -> CHIP
                    StateParam.AFFLICTION -> CHIP
                    StateParam.FATIGUE -> CHIP
                    StateParam.MOMENTUM -> UNBOUNDED
                }
            }
        }
    }

    enum class Nature(val label: String) {
        UNDEFINED("Undefined"), // N/A
        ABSENT("Absent"), // 0
        PALTRY("Paltry"), // 1, 2
        RUDIMENTARY("Rudimentary"), // 3, 4
        INFERIOR("Inferior"), // 5, 6
        UNREMARKABLE("Unremarkable"), // 7, 8
        RESPECTABLE("Respectable"), // 9, 10
        CONSIDERABLE("Considerable"), // 11, 12
        FORMIDABLE("Formidable"), // 13, 14
        PHENOMENAL("Phenomenal"), // 15, 16
        PRODIGIOUS("Prodigious"), // 17, 18, 19
        MIRACULOUS("Miraculous"); // 20

        companion object {
            fun of(n: Int) : Nature {
                return when (n) {
                    0 -> ABSENT
                    1, 2 -> PALTRY
                    3, 4 -> RUDIMENTARY
                    5, 6 -> INFERIOR
                    7, 8 -> UNREMARKABLE
                    9, 10 -> RESPECTABLE
                    11, 12 -> CONSIDERABLE
                    13, 14 -> FORMIDABLE
                    15, 16 -> PHENOMENAL
                    17, 18, 19 -> PRODIGIOUS
                    20 -> MIRACULOUS
                    else -> UNDEFINED
                }
            }
        }
    }

    fun hasNature(n: Int) : Boolean {
        return n in 0..20
    }

    fun hasLimit(key: String) : Boolean {
        return StateParam.lookup(key) != null || CoreParam.lookup(key) != null
    }
}

/**
 *  StatModeState
 *  -----------------------------------
 *  The set of all (four) StatModes of a Character.
 */
data class StatModeState(var conMode: StatMode = StatMode.NATURAL,
                         var dexMode: StatMode = StatMode.NATURAL,
                         var intMode: StatMode = StatMode.NATURAL,
                         var wilMode: StatMode = StatMode.NATURAL) {
    fun of(stat: QuadStat) : StatMode {
        return when (stat) {
            QuadStat.CONSTITUTION -> conMode
            QuadStat.DEXTERITY -> dexMode
            QuadStat.INTELLIGENCE -> intMode
            QuadStat.WILLPOWER -> wilMode
        }
    }

    fun set(stat: QuadStat, mode: StatMode) {
        return when (stat) {
            QuadStat.CONSTITUTION -> conMode = mode
            QuadStat.DEXTERITY -> dexMode = mode
            QuadStat.INTELLIGENCE -> intMode = mode
            QuadStat.WILLPOWER -> wilMode = mode
        }
    }
}

/**
 *  CharaState
 *  ------------------------------------
 *  Captures the momentary state of a Character during encounters.
 */
data class CharaState(var health: Int = 5,
                      var damage: Int = 0,
                      var fatigue: Int = 0,
                      var power: Int = 0,
                      var breakage: Int = 0,
                      var affliction: Int = 0,
                      var momentum: Int = 0,
                      var modes: StatModeState = StatModeState(),
                      var condition: StateCondition = StateCondition.NORMAL,
                      var recentlyConsumedPower: Boolean = false)
/**
 *  CharaRepertoire
 *  ------------------------------------
 *  The repertoire of all abilities known by a Character.
 */
data class CharaRepertoire(val general: MutableList<String> = mutableListOf(),
                           val specialty: MutableList<String> = mutableListOf(),
                           val growth: MutableList<String> = mutableListOf(),
                           val soulbound: MutableList<String> = mutableListOf(),
                           val exceptional: MutableList<String> = mutableListOf())

/**
 * Events are given by a "displacement 4-vector from origin", where the origin
 *   is the "Big Bang" = [0 0 0 0]. This simplifies to a 4-position in the
 *   appropriate spacetime manifold.
 *   I guess.
 *   This needs work.
 */
data class Event(val x: Int = 0,
                 val y: Int = 0,
                 val z: Int = 0,
                 val t: Int = 0)

/**
 *  CharaData
 *  ------------------------------------
 *  The serializable data of a Character.
 *  Stored in a .chara.json file.
 */
data class CharaData(val id: String = newId(),
                     var fullName: String = "Full Name",
                     var commonName: String = "Common Name",
                     var shortName: String = "Short Name",
                     var homeworld: String = "Homeworld",
                     var species: String = "Species",
                     var birthEvent: Event = Event(),
                     var properMass: Number = 1,
                     var properAge: Number = 1,
                     var livingAge: Number = 1,
                     var properHeight: Number = 1,
                     var commonHeight: Number = 1,
                     var commonCalendarAge: Number = 1,
                     var titles: MutableList<String> = mutableListOf(),
                     var renown: MutableList<String> = mutableListOf(),
                     var level: Evolution<Int> = Evolution(),
                     var specialty: Evolution<CharaSpec> = Evolution(), // "class"
                     var experience: Summation = Summation(),
                     var soulpool: Summation = Summation(),
                     var constitution: Summation = Summation(),
                     var dexterity: Summation = Summation(),
                     var intelligence: Summation = Summation(),
                     var willpower: Summation = Summation(),
                     var staggerThreshold: Int = 0,
                     var state: CharaState = CharaState(),
                     var repertoire: CharaRepertoire = CharaRepertoire(),
                     var rollsheetLayout: MutableList<String> = mutableListOf()) {

    companion object {
        fun newId() : String {
            return "NewCharacter-" + Random.nextLong(1000, 1000000).toString()
        }

//        /**
//         * Deserialize json string into new CharData
//         * @param json The string to deserialize
//         */
//        fun deserialize(json: String) : CharaData {
//            //return jacksonObjectMapper().readValue(json)
//            return JSON.parse(json)
//        }
    }
}

/**
 *  Character
 *  ------------------------------------
 *  The RPG mainstay object.
 *  Wraps CharaData to provide the meat to the bones.
 */
open class Character(charaData: CharaData = CharaData()) {
    private val cdata: CharaData = charaData

    private val valcache: MutableMap<CoreParam, Int?> = mutableMapOf()
    init {
        for (param in CoreParam.values()) {
            valcache[param] = null
        }
    }

    fun getId() : String {
        return cdata.id
    }

    fun getName() : String {
        return if (!cdata.shortName.isNullOrBlank()) cdata.shortName else
            if (!cdata.commonName.isNullOrBlank()) cdata.commonName else cdata.fullName
    }

    fun getFullName() : String {
        return cdata.fullName
    }

    fun getCommonName() : String {
        return cdata.commonName
    }

    fun geShortName() : String {
        return cdata.shortName
    }

    fun getTier() : Int {
        return cdata.specialty.evaluate().tier
    }

    fun getPower() : Int {
        return cdata.state.power
    }

    fun getHealth() : Int {
        return cdata.state.health
    }

    fun getBreakage() : Int {
        return cdata.state.breakage
    }

    fun getDamage() : Int {
        return cdata.state.damage
    }

    fun getAffliction() : Int {
        return cdata.state.affliction
    }

    fun getFatigue() : Int {
        return cdata.state.fatigue
    }

    fun getMomentum() : Int {
        return cdata.state.momentum
    }

    fun getCondition() : StateCondition {
        return cdata.state.condition
    }

    fun setCondition(cond: StateCondition, force: Boolean = false) : StateCondition {
        if (force || cond.priority >= cdata.state.condition.priority) {
            cdata.state.condition = cond
        }
        return cdata.state.condition
    }

    fun applyCondition(cond: StateCondition) : StateCondition {
        return setCondition(cond, false)
    }

    fun forceCondition(cond: StateCondition) : StateCondition {
        return setCondition(cond, true)
    }

    fun setPower(n: Int) : Int {
        cdata.state.power = Attribute.Limit.of(StateParam.POWER).coerce(n)
        return cdata.state.power
    }

    fun setHealth(n: Int) : Int {
        cdata.state.health = Attribute.Limit.of(StateParam.HEALTH).coerce(n)
        return cdata.state.health
    }

    fun setBreakage(n: Int) : Int {
        cdata.state.breakage = Attribute.Limit.of(StateParam.BREAKAGE).coerce(n)
        return cdata.state.breakage
    }

    fun setDamage(n: Int) : Int {
        cdata.state.damage = Attribute.Limit.of(StateParam.DAMAGE).coerce(n)
        return cdata.state.damage
    }

    fun setAffliction(n: Int) : Int {
        cdata.state.affliction = Attribute.Limit.of(StateParam.AFFLICTION).coerce(n)
        return cdata.state.affliction
    }

    fun setFatigue(n: Int) : Int {
        cdata.state.fatigue = Attribute.Limit.of(StateParam.FATIGUE).coerce(n)
        return cdata.state.fatigue
    }

    fun setMomentum(n: Int) : Int {
        cdata.state.momentum = Attribute.Limit.of(StateParam.MOMENTUM).coerce(n)
        return cdata.state.momentum
    }

    fun adjustBy(param: StateParam, n: Int) : Int {
        return when (param) {
            StateParam.POWER -> setPower(cdata.state.power + n)
            StateParam.HEALTH -> setPower(cdata.state.health + n)
            StateParam.BREAKAGE -> setPower(cdata.state.breakage + n)
            StateParam.DAMAGE -> setPower(cdata.state.damage + n)
            StateParam.AFFLICTION -> setPower(cdata.state.affliction + n)
            StateParam.FATIGUE -> setPower(cdata.state.fatigue + n)
            StateParam.MOMENTUM -> setMomentum(cdata.state.momentum + n)
        }
    }

    fun increment(param: StateParam) : Int {
        return adjustBy(param, 1)
    }

    fun decrement(param: StateParam) : Int {
        return adjustBy(param, -1)
    }

    fun increment(param: StateParam, n: Int) : Int {
        return adjustBy(param, n)
    }

    fun decrement(param: StateParam, n: Int) : Int {
        return adjustBy(param, -n)
    }

    fun getParam(param: StateParam) : Int {
        return when (param) {
            StateParam.POWER -> getPower()
            StateParam.HEALTH -> getHealth()
            StateParam.BREAKAGE -> getBreakage()
            StateParam.DAMAGE -> getDamage()
            StateParam.AFFLICTION -> getAffliction()
            StateParam.FATIGUE -> getFatigue()
            StateParam.MOMENTUM -> getMomentum()
        }
    }

    fun getParam(param: CoreParam) : Int {
        return evalCoreParam(param)
    }

    fun setParam(param: StateParam, n: Int) : Int {
        return when (param) {
            StateParam.POWER -> setPower(n)
            StateParam.HEALTH -> setHealth(n)
            StateParam.BREAKAGE -> setBreakage(n)
            StateParam.DAMAGE -> setDamage(n)
            StateParam.AFFLICTION -> setAffliction(n)
            StateParam.FATIGUE -> setFatigue(n)
            StateParam.MOMENTUM -> setMomentum(n)
        }
    }

    fun evalCoreParam(param: CoreParam) : Int {
        var v = valcache[param]
        if (v === null) {
            v = getCoreHistory(param).evaluate()
            valcache[param] = v
        }
        return v
    }

    fun getCoreHistory(param: CoreParam) : ModHistory<Int> {
        return when (param) {
            CoreParam.SOUL_POOL -> cdata.soulpool
            CoreParam.LEVEL -> cdata.level
            CoreParam.EXPERIENCE -> cdata.experience
            CoreParam.CONSTITUTION -> cdata.constitution
            CoreParam.DEXTERITY -> cdata.dexterity
            CoreParam.INTELLIGENCE -> cdata.intelligence
            CoreParam.WILLPOWER -> cdata.willpower
        }
    }

    fun addCoreMod(param: CoreParam, mod: Modification<Int>) : Int {
        getCoreHistory(param).add(mod)
        valcache[param] = null
        return evalCoreParam(param)
    }

    /*
     * Common Encounter Functions
     */

    /**
     * @return Quantity of fatigue accumulated as a result of the fulmination
     */
    fun fulminate() : Int {
        val brk = cdata.state.breakage
        if (brk < 1) return 0
        var ftg = 0
        for (i in 0 until brk) {
            if (Random.nextInt(4) < 1) ++ftg
        }
        setBreakage(0)
        //log.info('Fulminated all (' + b +') of ' + pstate.name + '\'s wounds, incurring ' + ftg + ' fatigue.');
        if (ftg < 1) return 0
        val dmg = cdata.state.damage
        if (dmg < 1) {
            setCondition(StateCondition.DEAD)
        } else {
            ftg = ftg.coerceAtMost(dmg)
            val d2 = dmg - ftg
            increment(StateParam.FATIGUE, ftg)
            setDamage(d2)
            if (d2 < 1) {
                setCondition(StateCondition.COMATOSE)
            }
        }
        return ftg
    }

    /**
     * @return quantity of power effectively gained
     */
    fun gainPower(n: Int) : Int {
        if (n < 0) return 0
        val pwr = cdata.state.power
        val p1 = (pwr + n).coerceAtMost(cdata.soulpool.evaluate())
        return setPower(p1) - pwr
    }

    /**
     * @return quantity of power effectively consumed
     */
    fun consumePower(n: Int) : Int {
        if (n < 0) return 0
        if (n > 0 && n < cdata.state.power) {
            cdata.state.recentlyConsumedPower = true
        }
        val pwr = cdata.state.power
        val p1 = (pwr - n).coerceAtLeast(0)
        return pwr - setPower(p1)
    }

    /**
     * @return quantity of damage effectively taken
     */
    fun takeDamage(n: Int) : Int {
        if (n < 1) return 0
        val pwr = cdata.state.power
        val hel = cdata.state.health
        val dmg = cdata.state.damage
        val stg = cdata.staggerThreshold
        val n1 = n - pwr
        if (n1 > 0) {
            if (pwr > 0) {
                setPower(0)
            }
            if (hel > 0) {
                if (stg in 1..n1) {
                    setCondition(StateCondition.STAGGERED)
                }
                val n2 = n1.coerceAtMost(hel)
                val h2 = hel - n2
                setHealth(h2)
                if (h2 > 0) {
                    increment(StateParam.DAMAGE, n2)
                } else {
                    if (n2 > 1) {
                        increment(StateParam.DAMAGE, n2 - 1)
                    }
                    increment(StateParam.FATIGUE)
                    setCondition(StateCondition.UNCONSCIOUS)
                    fulminate()
                }
            } else if (dmg > 0) {
                val n2 = n1.coerceAtMost(dmg)
                val d1 = dmg - n2
                increment(StateParam.FATIGUE, n2)
                setDamage(d1)
                if (d1 <= 0) {
                    setCondition(StateCondition.COMATOSE)
                }
            } else {
                setCondition(StateCondition.DEAD)
            }
        } else {
            cdata.state.recentlyConsumedPower = true
            setPower(n1.absoluteValue)
        }
        return cdata.state.damage - dmg
    }

    /**
     * @return quantity of damage effectively healed
     */
    fun healDamage(n: Int) : Int {
        if (n < 1) return 0
        var n1 = n
        val brk = cdata.state.breakage
        if (brk > 0) {
            val b1 = brk - n
            setBreakage(b1.coerceAtLeast(0))
            n1 = if (b1 >= 0) 0 else b1.absoluteValue
        }
        if (n1 < 1) return 0
        val dmg = cdata.state.damage
        n1 = n1.coerceAtMost(dmg)
        val d1 = dmg - n1
        setDamage(d1)
        increment(StateParam.HEALTH, n1)
        if (cdata.state.health > 0 && cdata.state.condition == StateCondition.UNCONSCIOUS) {
            setCondition(StateCondition.NORMAL)
        }
        return n1
    }

    /**
     * @return quantity of breakage effectively suffered
     */
    fun sufferBreak(n: Int) : Int {
        if (n < 1) return 0
        val brk = cdata.state.breakage
        val max = cdata.soulpool.evaluate()
        val b2 = brk + n
        if (cdata.state.health < 1) {
            setBreakage(b2)
            fulminate()
        } else if (b2 > max) {
            setBreakage(max)
            takeDamage(b2 - max)
        } else {
            setBreakage(b2)
        }
        return b2 - brk
    }

    /**
     * @return quantity of breakage effectively mended
     */
    fun mendBreak(n: Int) : Int {
        val brk = cdata.state.breakage
        if (n < 1 || brk < 1) return 0
        val b2 = (brk - n).coerceAtLeast(0)
        return brk - setBreakage(b2)
    }

    /**
     * @return quantity of afflictions effectively contracted
     */
    fun contractAffliction(n: Int) : Int {
        if (n < 1) return 0
        val max = cdata.soulpool.evaluate()
        val a2 = cdata.state.affliction + n
        return if (a2 > max) {
            setCondition(StateCondition.UNCONSCIOUS)
            setAffliction(max)
        } else {
            setAffliction(a2)
        }
    }

    /**
     * @return quantity of afflictions effectively eradicated
     */
    fun eradicateAffliction(n: Int) : Int {
        val afl = cdata.state.affliction
        if (n < 1 || afl < 1) return 0
        val a1 = (afl - n).coerceAtLeast(0)
        setAffliction(a1)
        return afl - a1
    }

    /**
     * @return quantity of fatigue effectively accumulated
     */
    fun accumulateFatigue(n: Int) : Int {
        if (n < 1) return 0
        var f1 = n
        val pwr = cdata.state.power
        if (pwr > 0) {
            setPower(0)
            f1--
        }
        if (f1 < 1) return 0
        val hel = cdata.state.health
        if (hel > 0) {
            val h1 = f1.coerceAtMost(hel)
            val h2 = hel - h1
            setHealth(h2)
            increment(StateParam.FATIGUE, h1)
            if (h2 == 0) {
                fulminate()
                setCondition(StateCondition.UNCONSCIOUS)
            }
            f1 -= h1
        }
        if (f1 < 1) return 0
        val dmg = cdata.state.damage
        if (dmg > 0) {
            f1 = f1.coerceAtMost(dmg)
            val d1 = dmg - f1
            setDamage(d1)
            increment(StateParam.FATIGUE, f1)
            if (d1 == 0) {
                setCondition(StateCondition.COMATOSE)
            }
        } else {
            setCondition(StateCondition.DEAD)
        }
        return f1
    }

    /**
     * @return quantity of fatigue effectively restored
     */
    fun restoreFatigue(n: Int) : Int {
        if (n < 1) return 0
        val ftg = cdata.state.fatigue
        val afl = cdata.state.affliction
        if (ftg < 1 || afl >= ftg) return 0
        val hel = cdata.state.health
        val cdn = cdata.state.condition
        val f1 = ftg - afl
        val f2 = f1.coerceAtMost(f1)
        decrement(StateParam.FATIGUE, f2)
        increment(StateParam.HEALTH, f2)
        if (hel > 0 && (cdn == StateCondition.UNCONSCIOUS ||
                        cdn == StateCondition.COMATOSE)) {
            setCondition(StateCondition.NORMAL, true)
        }
        return f2
    }

    /**
     * @return quantity of momentum effectively flowed
     */
    fun flowMomentum(n: Int) : Int {
        return if (n < 1) 0 else increment(StateParam.MOMENTUM, n)
    }

    /**
     * @return quantity of momentum effectively ebbed
     */
    fun ebbMomentum(n: Int) : Int {
        return if (n < 1) 0 else decrement(StateParam.MOMENTUM, n)
    }

    /**
     * @return the new mode of operation for the given core parameter
     */
    fun setMode(stat: QuadStat, mode: StatMode, force: Boolean = false) : StatMode {
        val currentMode = cdata.state.modes.of(stat)
        when (mode) {
            StatMode.NATURAL -> when (currentMode) {
                StatMode.NATURAL -> Unit
                StatMode.ENHANCED -> cdata.state.modes.set(stat, StatMode.NATURAL)
                StatMode.ENFEEBLED -> cdata.state.modes.set(stat, StatMode.NATURAL)
            }
            StatMode.ENHANCED -> when (currentMode) {
                StatMode.NATURAL -> cdata.state.modes.set(stat, StatMode.ENHANCED)
                StatMode.ENHANCED -> healDamage(1)
                StatMode.ENFEEBLED -> if (force) cdata.state.modes.set(stat, StatMode.ENHANCED) else cdata.state.modes.set(stat, StatMode.NATURAL)
            }
            StatMode.ENFEEBLED -> when (currentMode) {
                StatMode.NATURAL -> cdata.state.modes.set(stat, StatMode.ENFEEBLED)
                StatMode.ENHANCED -> if (force) cdata.state.modes.set(stat, StatMode.ENFEEBLED) else cdata.state.modes.set(stat, StatMode.NATURAL)
                StatMode.ENFEEBLED -> takeDamage(1)
            }
        }
        return cdata.state.modes.of(stat)
    }

    fun normalizeMode(stat: QuadStat) : StatMode {
        return setMode(stat, StatMode.NATURAL)
    }

    fun enhanceMode(stat: QuadStat) : StatMode {
        return setMode(stat, StatMode.ENHANCED)
    }

    fun enfeebleMode(stat: QuadStat) : StatMode {
        return setMode(stat, StatMode.ENFEEBLED)
    }

}

/**
 *  CharacterDocument
 *  ------------------------------------
 *  Encapsulates a Character, as well as metadata the specifies where it's persisted.
 */
data class CharacterDocument(val character: Character,
                             val fileId: String,
                             val folderId: String)
