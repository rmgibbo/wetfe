package wetfe.core.character

import wetfe.core.game.DataSource
import wetfe.core.game.PathType
import wetfe.core.universe.Event
import wetfe.core.universe.Realm
import kotlin.math.absoluteValue
import kotlin.random.Random

/**
 *  CoreParam
 *  -----------------------------------
 *  The core numerical parameters of a Character.
 */
enum class CoreParam(val key: String) {
    LEVEL("LVL"),
    EXPERIENCE("EXP"),
    SOULPOOL("SP"),
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

        fun lookup(key: String): CoreParam? {
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

        fun lookup(key: String): QuadStat? {
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
    NATURAL("="),
    ENHANCED("+"),
    ENFEEBLED("-");

    companion object {
        private val LOOKUP_MAP: Map<String, StatMode>

        init {
            val initMap: MutableMap<String, StatMode> = mutableMapOf()
            for (mode in values()) {
                initMap[mode.key] = mode
            }
            LOOKUP_MAP = initMap.toMap()
        }

        fun lookup(key: String): StatMode? {
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
    HEALTH("HEL"),
    DAMAGE("DMG"),
    FATIGUE("FTG"),
    POWER("PWR"),
    AFFLICTION("AFL"),
    TRAUMA("TRM"),
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

        fun lookup(key: String): StateParam? {
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
    NORMAL("=", 0),
    BLITZING("!", 30),
    TURTLING("@", 30),
    CHANNELING("^", 30),
    STAGGERED("$", 60),
    UNCONSCIOUS("*", 70),
    DYING("~", 80),
    DEAD("_", 90);

    companion object {
        private val lookupMap: Map<String, StateCondition>

        init {
            val initMap: MutableMap<String, StateCondition> = mutableMapOf()
            for (condition in values()) {
                initMap[condition.key] = condition
            }
            lookupMap = initMap.toMap()
        }

        fun lookup(key: String): StateCondition? {
            return lookupMap[key]
        }
    }
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

        fun coerce(n: Int): Int {
            return n.coerceAtLeast(min).coerceAtMost(max)
        }

        companion object {
            fun of(param: CoreParam): Limit {
                return when (param) {
                    CoreParam.LEVEL -> POS_UNBOUNDED
                    CoreParam.EXPERIENCE -> POS_UNBOUNDED
                    CoreParam.SOULPOOL -> POS_UNBOUNDED
                    CoreParam.CONSTITUTION -> CORE
                    CoreParam.DEXTERITY -> CORE
                    CoreParam.INTELLIGENCE -> CORE
                    CoreParam.WILLPOWER -> CORE
                }
            }

            fun of(param: StateParam): Limit {
                return when (param) {
                    StateParam.HEALTH -> CHIP
                    StateParam.DAMAGE -> CHIP
                    StateParam.FATIGUE -> CHIP
                    StateParam.POWER -> CHIP
                    StateParam.AFFLICTION -> CHIP
                    StateParam.TRAUMA -> CHIP
                    StateParam.MOMENTUM -> UNBOUNDED
                }
            }
        }
    }

    enum class Assessment(val label: String) {
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
            fun of(n: Int): Assessment {
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

    fun hasAssessment(n: Int): Boolean {
        return n in 0..20
    }

    fun hasLimit(key: String): Boolean {
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
    fun get(stat: QuadStat): StatMode {
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
 *  CharaPath
 *  -----------------------------------
 */
data class CharaPath(var pathType: PathType = PathType.CON_CON,
                     var tier: Int = 0)

/**
 *  CharaState
 *  ------------------------------------
 *  Captures the momentary state of a Character during encounters.
 */
data class CharaState(var health: Int = 0,
                      var damage: Int = 0,
                      var fatigue: Int = 0,
                      var power: Int = 0,
                      var affliction: Int = 0,
                      var trauma: Int = 0,
                      var momentum: Int = 0,
                      var modes: StatModeState = StatModeState(),
                      var condition: StateCondition = StateCondition.NORMAL,
                      var tapped: Boolean = false)

/**
 *  CharaRepertoire
 *  ------------------------------------
 *  The repertoire of all abilities known by a Character.
 */
data class CharaRepertoire(val general: MutableList<String> = mutableListOf(),
                           val archetypal: MutableList<String> = mutableListOf(),
                           val soulbound: MutableList<String> = mutableListOf(),
                           val exceptional: MutableList<String> = mutableListOf(),
                           val circumstantial: MutableList<String> = mutableListOf())

/**
 *  CharaData
 *  ------------------------------------
 *  The serializable data of a Character.
 *  Stored in a .chara.json file.
 */
data class CharaData(val id: String = newId(),
                     var source: DataSource = DataSource.PLAYER,
                     var realm: Realm = Realm.CONFLUENT,
                     var fullName: String = "Full Name",
                     var commonName: String = "Common Name",
                     var shortName: String = "Short Name",
                     var homeworld: String = "Homeworld",
                     var species: String = "Species",
                     var birthEvent: Event = Event(),
                     var properMass: Double = 1.0,
                     var properAge: Double = 1.0,
                     var livingAge: Double = 1.0,
                     var properHeight: Double = 1.0,
                     var commonHeight: Double = 1.0,
                     var commonCalendarAge: Int = 1,
                     var titles: MutableList<String> = mutableListOf(),
                     var renown: MutableList<String> = mutableListOf(),
                     var characteristics: MutableList<String> = mutableListOf(),
                     var paths: MutableList<CharaPath> = mutableListOf(),
                     var level: Int = 0,
                     var experience: Int = 0,
                     var soulpool: Int = 4,
                     var constitution: Int = 8,
                     var conScale: Int = 1,
                     var dexterity: Int = 8,
                     var dexScale: Int = 1,
                     var intelligence: Int = 8,
                     var intScale: Int = 1,
                     var willpower: Int = 8,
                     var wilScale: Int = 1,
                     var staggerThreshold: Int = 0,
                     var state: CharaState = CharaState(),
                     var repertoire: CharaRepertoire = CharaRepertoire(),
                     var rollsheetLayout: MutableList<String> = mutableListOf()) {

    companion object {
        fun newId(): String {
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

    fun getId(): String {
        return cdata.id
    }

    fun getName(): String {
        return if (cdata.shortName.isNotBlank()) cdata.shortName else
            if (cdata.commonName.isNotBlank()) cdata.commonName else cdata.fullName
    }

    fun getFullName(): String {
        return cdata.fullName
    }

    fun getCommonName(): String {
        return cdata.commonName
    }

    fun geShortName(): String {
        return cdata.shortName
    }

    fun getSource(): DataSource {
        return cdata.source
    }

    fun isPlayerSource(): Boolean {
        return cdata.source == DataSource.PLAYER
    }

    fun isOfficialSource(): Boolean {
        return cdata.source == DataSource.OFFICIAL
    }

    fun getStaggerThreshold(): Int {
        return cdata.staggerThreshold
    }

    /*
     *  Core Parameters
     */

    fun getSoulpool(): Int {
        return cdata.soulpool
    }

    fun setSoulpool(n: Int): Int {
        cdata.soulpool = Attribute.Limit.of(CoreParam.SOULPOOL).coerce(n)
        return cdata.soulpool
    }

    fun getLevel(): Int {
        return cdata.level
    }

    fun setLevel(n: Int): Int {
        cdata.level = Attribute.Limit.of(CoreParam.LEVEL).coerce(n)
        return cdata.level
    }

    fun getExperience(): Int {
        return cdata.experience
    }

    fun setExperience(n: Int): Int {
        cdata.experience = Attribute.Limit.of(CoreParam.EXPERIENCE).coerce(n)
        return cdata.experience
    }

    fun getConstitution(): Int {
        return cdata.constitution
    }

    fun setConstitution(n: Int): Int {
        cdata.constitution = Attribute.Limit.of(CoreParam.CONSTITUTION).coerce(n)
        return cdata.constitution
    }

    fun getDexterity(): Int {
        return cdata.dexterity
    }

    fun setDexterity(n: Int): Int {
        cdata.dexterity = Attribute.Limit.of(CoreParam.DEXTERITY).coerce(n)
        return cdata.dexterity
    }

    fun getIntelligence(): Int {
        return cdata.intelligence
    }

    fun setIntelligence(n: Int): Int {
        cdata.intelligence = Attribute.Limit.of(CoreParam.INTELLIGENCE).coerce(n)
        return cdata.intelligence
    }

    fun getWillpower(): Int {
        return cdata.willpower
    }

    fun setWillpower(n: Int): Int {
        cdata.willpower = Attribute.Limit.of(CoreParam.WILLPOWER).coerce(n)
        return cdata.willpower
    }

    fun getParam(param: CoreParam): Int {
        return when (param) {
            CoreParam.LEVEL -> getLevel()
            CoreParam.EXPERIENCE -> getExperience()
            CoreParam.SOULPOOL -> getSoulpool()
            CoreParam.CONSTITUTION -> getConstitution()
            CoreParam.DEXTERITY -> getDexterity()
            CoreParam.INTELLIGENCE -> getIntelligence()
            CoreParam.WILLPOWER -> getWillpower()
        }
    }

    fun setParam(param: CoreParam, n: Int): Int {
        return when (param) {
            CoreParam.LEVEL -> setLevel(n)
            CoreParam.EXPERIENCE -> setExperience(n)
            CoreParam.SOULPOOL -> setSoulpool(n)
            CoreParam.CONSTITUTION -> setConstitution(n)
            CoreParam.DEXTERITY -> setDexterity(n)
            CoreParam.INTELLIGENCE -> setIntelligence(n)
            CoreParam.WILLPOWER -> setWillpower(n)
        }
    }

    fun adjust(param: CoreParam, n: Int): Int {
        return when (param) {
            CoreParam.LEVEL -> setLevel(getLevel() + n)
            CoreParam.EXPERIENCE -> setExperience(getExperience() + n)
            CoreParam.SOULPOOL -> setSoulpool(getSoulpool() + n)
            CoreParam.CONSTITUTION -> setConstitution(getConstitution() + n)
            CoreParam.DEXTERITY -> setDexterity(getDexterity() + n)
            CoreParam.INTELLIGENCE -> setIntelligence(getIntelligence() + n)
            CoreParam.WILLPOWER -> setWillpower(getWillpower() + n)
        }
    }

    fun increment(param: CoreParam, n: Int = 1): Int {
        return adjust(param, n)
    }

    fun decrement(param: CoreParam, n: Int = 1): Int {
        return adjust(param, -n)
    }

    /*
     *  State Parameters
     */

    fun getHealth(): Int {
        return cdata.state.health
    }

    fun setHealth(n: Int): Int {
        cdata.state.health = Attribute.Limit.of(StateParam.HEALTH).coerce(n)
        return cdata.state.health
    }

    fun getDamage(): Int {
        return cdata.state.damage
    }

    fun setDamage(n: Int): Int {
        cdata.state.damage = Attribute.Limit.of(StateParam.DAMAGE).coerce(n)
        return cdata.state.damage
    }

    fun getFatigue(): Int {
        return cdata.state.fatigue
    }

    fun setFatigue(n: Int): Int {
        cdata.state.fatigue = Attribute.Limit.of(StateParam.FATIGUE).coerce(n)
        return cdata.state.fatigue
    }

    fun getPower(): Int {
        return cdata.state.power
    }

    fun setPower(n: Int): Int {
        cdata.state.power = Attribute.Limit.of(StateParam.POWER).coerce(n)
        return cdata.state.power
    }

    fun isTapped(): Boolean {
        return cdata.state.tapped
    }

    fun tap() {
        cdata.state.tapped = true
    }

    fun untap() {
        cdata.state.tapped = false
    }

    fun getAffliction(): Int {
        return cdata.state.affliction
    }

    fun getTrauma(): Int {
        return cdata.state.trauma
    }

    fun getMomentum(): Int {
        return cdata.state.momentum
    }

    fun getCondition(): StateCondition {
        return cdata.state.condition
    }

    fun setCondition(cond: StateCondition, force: Boolean = false): StateCondition {
        if (force || cond.priority >= cdata.state.condition.priority) {
            cdata.state.condition = cond
        }
        return cdata.state.condition
    }

    fun applyCondition(cond: StateCondition): StateCondition {
        return setCondition(cond, false)
    }

    fun forceCondition(cond: StateCondition): StateCondition {
        return setCondition(cond, true)
    }

    fun setAffliction(n: Int): Int {
        cdata.state.affliction = Attribute.Limit.of(StateParam.AFFLICTION).coerce(n)
        return cdata.state.affliction
    }

    fun setTrauma(n: Int): Int {
        cdata.state.trauma = Attribute.Limit.of(StateParam.TRAUMA).coerce(n)
        return cdata.state.trauma
    }

    fun setMomentum(n: Int): Int {
        cdata.state.momentum = Attribute.Limit.of(StateParam.MOMENTUM).coerce(n)
        return cdata.state.momentum
    }

    fun getParam(param: StateParam): Int {
        return when (param) {
            StateParam.HEALTH -> getHealth()
            StateParam.DAMAGE -> getDamage()
            StateParam.FATIGUE -> getFatigue()
            StateParam.POWER -> getPower()
            StateParam.AFFLICTION -> getAffliction()
            StateParam.TRAUMA -> getTrauma()
            StateParam.MOMENTUM -> getMomentum()
        }
    }

    fun setParam(param: StateParam, n: Int): Int {
        return when (param) {
            StateParam.HEALTH -> setHealth(n)
            StateParam.DAMAGE -> setDamage(n)
            StateParam.FATIGUE -> setFatigue(n)
            StateParam.POWER -> setPower(n)
            StateParam.AFFLICTION -> setAffliction(n)
            StateParam.TRAUMA -> setTrauma(n)
            StateParam.MOMENTUM -> setMomentum(n)
        }
    }

    fun adjust(param: StateParam, n: Int): Int {
        return when (param) {
            StateParam.HEALTH -> setHealth(cdata.state.health + n)
            StateParam.DAMAGE -> setDamage(cdata.state.damage + n)
            StateParam.FATIGUE -> setFatigue(cdata.state.fatigue + n)
            StateParam.POWER -> setPower(cdata.state.power + n)
            StateParam.AFFLICTION -> setAffliction(cdata.state.affliction + n)
            StateParam.TRAUMA -> setTrauma(cdata.state.trauma + n)
            StateParam.MOMENTUM -> setMomentum(cdata.state.momentum + n)
        }
    }

    fun increment(param: StateParam, n: Int = 1): Int {
        return adjust(param, n)
    }

    fun decrement(param: StateParam, n: Int = 1): Int {
        return adjust(param, -n)
    }

    /*
     *  Encounter State Transitions
     */

    /**
     * @return magnitude of damage effectively taken
     */
    fun takeDamage(n: Int): Int {
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
                    setCondition(StateCondition.DYING)
                }
            } else {
                setCondition(StateCondition.DEAD)
            }
        } else {
            cdata.state.tapped = true
            setPower(n1.absoluteValue)
        }
        return cdata.state.damage - dmg
    }

    /**
     * @return magnitude of damage effectively healed
     */
    fun healDamage(n: Int): Int {
        if (n < 1) return 0
        var n1 = n
        val afl = cdata.state.affliction
        if (afl > 0) {
            val b1 = afl - n
            setAffliction(b1.coerceAtLeast(0))
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
     * @return magnitude of fatigue effectively accumulated
     */
    fun accumulateFatigue(n: Int): Int {
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
                setCondition(StateCondition.DYING)
            }
        } else {
            setCondition(StateCondition.DEAD)
        }
        return f1
    }

    /**
     * @return magnitude of fatigue effectively restored
     */
    fun restoreFatigue(n: Int): Int {
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
                        cdn == StateCondition.DYING)) {
            setCondition(StateCondition.NORMAL, true)
        }
        return f2
    }

    /**
     * @return magnitude of power effectively gained
     */
    fun gainPower(n: Int): Int {
        if (n < 0) return 0
        val pwr = cdata.state.power
        val p1 = (pwr + n).coerceAtMost(cdata.soulpool)
        return setPower(p1) - pwr
    }

    /**
     * @return magnitude of power effectively consumed
     */
    fun consumePower(n: Int): Int {
        if (n < 0) return 0
        if (n > 0 && n < cdata.state.power) {
            cdata.state.tapped = true
        }
        val pwr = cdata.state.power
        val p1 = (pwr - n).coerceAtLeast(0)
        return pwr - setPower(p1)
    }

    /**
     * @return magnitude of affliction effectively sustained
     */
    fun sustainAffliction(n: Int): Int {
        if (n < 1) return 0
        val brk = cdata.state.affliction
        val max = cdata.soulpool
        val b2 = brk + n
        if (cdata.state.health < 1) {
            setAffliction(b2)
            fulminate()
        } else if (b2 > max) {
            setAffliction(max)
            takeDamage(b2 - max)
        } else {
            setAffliction(b2)
        }
        return b2 - brk
    }

    /**
     * @return magnitude of affliction effectively cured
     */
    fun cureAffliction(n: Int): Int {
        val afl = cdata.state.affliction
        if (n < 1 || afl < 1) return 0
        val b2 = (afl - n).coerceAtLeast(0)
        return afl - setAffliction(b2)
    }

    /**
     * @return magnitude of trauma effectively suffered
     */
    fun sufferTrauma(n: Int): Int {
        if (n < 1) return 0
        val max = cdata.soulpool
        val t2 = cdata.state.trauma + n
        return if (t2 > max) {
            setCondition(StateCondition.UNCONSCIOUS)
            setTrauma(max)
        } else {
            setTrauma(t2)
        }
    }

    /**
     * @return magnitude of trauma effectively alleviated
     */
    fun alleviateTrauma(n: Int): Int {
        val trm = cdata.state.trauma
        if (n < 1 || trm < 1) return 0
        val a1 = (trm - n).coerceAtLeast(0)
        setTrauma(a1)
        return trm - a1
    }

    /**
     * @return magnitude of fatigue accumulated as a result of the fulmination
     */
    fun fulminate(): Int {
        val afl = cdata.state.affliction
        if (afl < 1) return 0
        var ftg = 0
        for (i in 0 until afl) {
            if (Random.nextInt(4) < 1) ++ftg
        }
        setAffliction(0)
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
                setCondition(StateCondition.DYING)
            }
        }
        return ftg
    }

    /**
     * @return magnitude of momentum effectively increased
     */
    fun increaseMomentum(n: Int): Int {
        return if (n < 1) 0 else increment(StateParam.MOMENTUM, n)
    }

    /**
     * @return magnitude of momentum effectively decreased
     */
    fun decreaseMomentum(n: Int): Int {
        return if (n < 1) 0 else decrement(StateParam.MOMENTUM, n)
    }

    fun hasten(): Int {
        return increaseMomentum(1)
    }

    fun delay(): Int {
        return decreaseMomentum(1)
    }

    fun getConMode(): StatMode {
        return cdata.state.modes.conMode
    }

    fun getDexMode(): StatMode {
        return cdata.state.modes.dexMode
    }

    fun getIntMode(): StatMode {
        return cdata.state.modes.intMode
    }

    fun getWilMode(): StatMode {
        return cdata.state.modes.wilMode
    }

    private fun applyMode(mode: StatMode, currentMode: StatMode, force: Boolean): StatMode {
        return when (mode) {
            StatMode.ENHANCED -> when (currentMode) {
                StatMode.NATURAL -> StatMode.ENHANCED
                StatMode.ENHANCED -> {
                    healDamage(1)
                    StatMode.ENHANCED
                }
                StatMode.ENFEEBLED -> if (force) StatMode.ENHANCED else StatMode.NATURAL
            }
            StatMode.ENFEEBLED -> when (currentMode) {
                StatMode.NATURAL -> StatMode.ENFEEBLED
                StatMode.ENHANCED -> if (force) StatMode.ENFEEBLED else StatMode.NATURAL
                StatMode.ENFEEBLED -> {
                    takeDamage(1)
                    StatMode.ENFEEBLED
                }
            }
            else -> StatMode.NATURAL
        }
    }

    /**
     *  Workaround for Kotlin-to-Javascript transpilation bugs.
     *  Note that this directly sets the new mode, without any side-effects.
     */
    fun setConMode(mode: StatMode) {
        cdata.state.modes.conMode = mode
    }

    /**
     *  Workaround for Kotlin-to-Javascript transpilation bugs.
     *  Note that this directly sets the new mode, without any side-effects.
     */
    fun setDexMode(mode: StatMode) {
        cdata.state.modes.dexMode = mode
    }

    /**
     *  Workaround for Kotlin-to-Javascript transpilation bugs.
     *  Note that this directly sets the new mode, without any side-effects.
     */
    fun setIntMode(mode: StatMode) {
        cdata.state.modes.intMode = mode
    }

    /**
     *  Workaround for Kotlin-to-Javascript transpilation bugs.
     *  Note that this directly sets the new mode, without any side-effects.
     */
    fun setWilMode(mode: StatMode) {
        cdata.state.modes.wilMode = mode
    }

    /**
     * @return the new mode of operation for the given core parameter
     */
    fun getMode(stat: QuadStat): StatMode {
        return cdata.state.modes.get(stat)
    }

    /**
     * @return the new mode of operation for the given core parameter
     */
    fun setMode(stat: QuadStat, mode: StatMode, force: Boolean = false): StatMode {
        cdata.state.modes.set(stat, applyMode(mode,cdata.state.modes.get(stat), force))
        return cdata.state.modes.get(stat)
    }

    fun normalizeMode(stat: QuadStat): StatMode {
        return setMode(stat, StatMode.NATURAL)
    }

    fun enhanceMode(stat: QuadStat): StatMode {
        return setMode(stat, StatMode.ENHANCED)
    }

    fun enfeebleMode(stat: QuadStat): StatMode {
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
