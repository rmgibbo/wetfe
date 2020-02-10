package wetfe.core.encounter

import wetfe.core.character.*
import wetfe.core.game.DataSource
import kotlin.math.absoluteValue
import kotlin.random.Random

enum class ParticipantStatus {
    FRIEND,
    FOE;
}

interface Participant : Comparable<Participant> {
    var key: String // unique key of this participant within an encounter
    var status: ParticipantStatus
    var initiative: Double // initiative for the round, calculated from momentum
    fun initalize(key: String): Participant

    fun getName(): String
    fun getSource(): DataSource
    fun isPlayerSource(): Boolean
    fun isOfficialSource(): Boolean
    fun getStaggerThreshold(): Int

    fun isTapped(): Boolean
    fun tap()
    fun untap()

    fun fulminate(): Int

    fun getHealth(): Int
    fun setHealth(n: Int): Int
    fun getDamage(): Int
    fun setDamage(n: Int): Int
    fun takeDamage(n: Int): Int
    fun healDamage(n: Int): Int

    fun getFatigue(): Int
    fun setFatigue(n: Int): Int
    fun accumulateFatigue(n: Int): Int
    fun restoreFatigue(n: Int): Int

    fun getPower(): Int
    fun setPower(n: Int): Int
    fun gainPower(n: Int): Int
    fun consumePower(n: Int): Int

    fun getAffliction(): Int
    fun setAffliction(n: Int): Int
    fun sustainAffliction(n: Int): Int
    fun cureAffliction(n: Int): Int

    fun getTrauma(): Int
    fun setTrauma(n: Int): Int
    fun sufferTrauma(n: Int): Int
    fun alleviateTrauma(n: Int): Int

    fun getMomentum(): Int
    fun setMomentum(n: Int): Int
    fun increaseMomentum(n: Int): Int
    fun decreaseMomentum(n: Int): Int
    fun hasten(): Int
    fun delay(): Int

    fun getCondition(): StateCondition
    fun applyCondition(cond: StateCondition): StateCondition
    fun forceCondition(cond: StateCondition): StateCondition

    fun getStateParam(param: StateParam): Int
    fun setStateParam(param: StateParam, n: Int): Int
    fun adjustStateParam(param: StateParam, n: Int): Int
    fun incrementStateParam(param: StateParam): Int
    fun decrementStateParam(param: StateParam): Int

    fun getCoreParam(param: CoreParam): Int
    fun setCoreParam(param: CoreParam, n: Int): Int
    fun adjustCoreParam(param: CoreParam, n: Int): Int
    fun incrementCoreParam(param: CoreParam): Int
    fun decrementCoreParam(param: CoreParam): Int

    fun getConMode(): StatMode
    fun getDexMode(): StatMode
    fun getIntMode(): StatMode
    fun getWilMode(): StatMode
    fun getMode(stat: QuadStat): StatMode
    fun setMode(stat: QuadStat, mode: StatMode, force: Boolean): StatMode
    fun normalizeMode(stat: QuadStat): StatMode
    fun enhanceMode(stat: QuadStat): StatMode
    fun enfeebleMode(stat: QuadStat): StatMode

    /*
     *  Workarounds for Kotlin-to-Javascript transpilation bugs.
     */
    fun applyModeKey(mode: String, currentMode: String, force: Boolean): String
    fun setConMode(mode: StatMode)
    fun setDexMode(mode: StatMode)
    fun setIntMode(mode: StatMode)
    fun setWilMode(mode: StatMode)
}

class CharacterParticipant(data: CharaData = CharaData()) : Character(data), Participant {
    override var key: String = ""
    override var status: ParticipantStatus = ParticipantStatus.FRIEND
    override var initiative: Double = 0.00
    override fun initalize(key: String): Participant {
        this.key = key
        setHealth(getSoulpool())
        setDamage(0)
        setFatigue(0)
        setPower(0)
        setAffliction(0)
        setTrauma(0)
        setMomentum(0)
        setCondition(StateCondition.NORMAL)
        setConMode(StatMode.NATURAL)
        setDexMode(StatMode.NATURAL)
        setIntMode(StatMode.NATURAL)
        setWilMode(StatMode.NATURAL)
        untap()
        return this
    }

    override fun getStateParam(param: StateParam): Int {
        return getParam(param)
    }

    override fun setStateParam(param: StateParam, n: Int): Int {
        return setParam(param, n)
    }

    override fun adjustStateParam(param: StateParam, n: Int): Int {
        return adjust(param, n)
    }

    override fun incrementStateParam(param: StateParam): Int {
        return increment(param)
    }

    override fun decrementStateParam(param: StateParam): Int {
        return decrement(param)
    }

    override fun getCoreParam(param: CoreParam): Int {
        return getParam(param)
    }

    override fun setCoreParam(param: CoreParam, n: Int): Int {
        return setParam(param, n)
    }

    override fun adjustCoreParam(param: CoreParam, n: Int): Int {
        return adjust(param, n)
    }

    override fun incrementCoreParam(param: CoreParam): Int {
        return increment(param)
    }

    override fun decrementCoreParam(param: CoreParam): Int {
        return decrement(param)
    }

    override fun compareTo(other: Participant): Int {
        return other.initiative.toInt() - this.initiative.toInt()
    }

    /**
     *  String-based workaround for Kotlin-to-Javascript transpilation bugs.
     */
    override fun applyModeKey(mode: String, currentMode: String, force: Boolean): String {
        return when (mode) {
            "+" -> when (currentMode) {
                "=" -> "+"
                "+" -> {
                    healDamage(1)
                    "+"
                }
                "-" -> if (force) "+" else "="
                else -> "="
            }
            "-" -> when (currentMode) {
                "=" -> "-"
                "+" -> if (force) "-" else "="
                "-" -> {
                    takeDamage(1)
                    "-"
                }
                else -> "="
            }
            else -> "="
        }
    }
}

//class MonsterParticipant : Monster(), Participant {
//
//}


//
//class InfernalMonsterParticipant : MonsterParticipant {
//
//}
//
//class CelestialMonsterParticipant : MonsterParticipant {
//
//}
//
//class ExoticMonsterParticipant : MonsterParticipant {
//
//}
//
//class ConfluentMonsterParticipant : MonsterParticipant {
//
//}
//

enum class EncounterType {
    COMBAT,
    SOCIAL,
    ENVIRONMENTAL
}

class Encounter(val type: EncounterType) {
    var round: Int = 0
    val nameMap: MutableMap<String, Int> = mutableMapOf()
    val participants: MutableMap<String, Participant> = mutableMapOf()
    var participantOrder: Array<Participant> = arrayOf()
    var activeParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }
    var targetParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }

    private fun generateKey(name: String, i: Int, b: Boolean): String {
        return if (b)
            name.substring(0, 3.coerceAtMost(name.length)) + if (i > 1) i else ""
        else
            "" + name.first() + name.last() + i
    }

    private fun generateKey(p: Participant): String {
        val name = if (p.getName().isBlank()) "Unknown" else p.getName()
        var i: Int = nameMap[name] ?: 0
        nameMap[name] = ++i
        return generateKey(name, i, p.isPlayerSource())
    }

    private fun coerceIndex(i: Int): Int {
        return if (participantOrder.isEmpty() || i < 0)
            0
        else
            if (i >= participantOrder.size) participantOrder.size - 1 else i
    }

    private fun indexIsValid(i: Int): Boolean {
        return i >= 0 && i < participantOrder.size
    }

    fun getParticipant(key: String): Participant? {
        return participants[key]
    }

    fun getActiveParticipant(): Participant? {
        return if (indexIsValid(activeParticipantIndex))
            participantOrder[activeParticipantIndex]
        else
            null
    }

    fun getTargetParticipant(): Participant? {
        return if (indexIsValid(targetParticipantIndex))
            participantOrder[targetParticipantIndex]
        else
            null
    }

    fun addParticipant(p: Participant): Encounter {
        val pkey = generateKey(p)
        p.initalize(pkey)
        participants[pkey] = p
        participantOrder[participantOrder.size] = p
        return this
    }

    fun removeParticipant(pkey: String): Encounter {
        val participant = participants[pkey]
        if (participant != null) {
            participants.remove(pkey)
            val pList = participantOrder.filter {
                it.key != participant.key
            }
            participantOrder = pList.toTypedArray()
            if (activeParticipantIndex == (participantOrder.size - 1)) {
                --activeParticipantIndex
            }
            targetParticipantIndex = activeParticipantIndex
        }
        return this
    }

    fun targetNext(): Encounter {
        ++activeParticipantIndex
        return this
    }

    fun activateNext(): Encounter {
        ++targetParticipantIndex
        return this
    }

    companion object {
        /*
         *  The "initiative roll" base constant.
         *  Must be in the range [0.000, 49.999].
         *  Higher values make haste and delay effects more pronounced.
         */
        val irollFactor = 35.000.coerceIn(0.000, 49.999)
        fun irollAdjustment(p: Int): Double {
            return irollFactor * p / 
                    if (p < 0) p - 2.236 else p + 2.236
        }
        val irollMin = irollFactor
        val irollMax = 100.000 - irollFactor
    }
    
    fun startNewRound(): Encounter {
        activeParticipantIndex = 0
        if (participantOrder.isNotEmpty()) {
            for (participant in participantOrder) {
                participant.initiative = Random.nextDouble(irollMin, irollMax) + 
                        irollAdjustment(participant.getMomentum())
                participant.setMomentum(0)
            }
            participantOrder.sort()
        }
        ++round
        return this
    }
}
