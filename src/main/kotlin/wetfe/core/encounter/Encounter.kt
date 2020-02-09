package wetfe.core.encounter

import wetfe.core.character.*
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
    ////
    fun getName() : String
    fun getStaggerThreshold() : Int
    ////
    fun getHealth() : Int
    fun setHealth(n: Int) : Int
    ////
    fun getDamage() : Int
    fun setDamage(n: Int) : Int
    fun takeDamage(n: Int) : Int
    fun healDamage(n: Int) : Int
    ////
    fun getFatigue() : Int
    fun setFatigue(n: Int) : Int
    fun accumulateFatigue(n: Int) : Int
    fun restoreFatigue(n: Int) : Int
    ////
    fun getPower() : Int
    fun setPower(n: Int) : Int
    fun gainPower(n: Int) : Int
    fun consumePower(n: Int) : Int
    ////
    fun isTapped() : Boolean
    fun tap()
    fun untap()
    ////
    fun getAffliction() : Int
    fun setAffliction(n: Int) : Int
    fun sustainAffliction(n: Int) : Int
    fun cureAffliction(n: Int) : Int
    ////
    fun getTrauma() : Int
    fun setTrauma(n: Int) : Int
    fun sufferTrauma(n: Int) : Int
    fun alleviateTrauma(n: Int) : Int
    ////
    fun fulminate() : Int
    ////
    fun getMomentum() : Int
    fun setMomentum(n: Int) : Int
    fun flowMomentum(n: Int) : Int
    fun ebbMomentum(n: Int) : Int
    ////
    fun getCondition() : StateCondition
    fun applyCondition(cond: StateCondition) : StateCondition
    fun forceCondition(cond: StateCondition) : StateCondition
    ////
    fun getStateParam(param: StateParam) : Int
    fun setStateParam(param: StateParam, n: Int) : Int
    fun adjustStateParam(param: StateParam, n: Int) : Int
    fun incrementStateParam(param: StateParam) : Int
    fun decrementStateParam(param: StateParam) : Int
    ////
    fun getCoreParam(param: CoreParam) : Int
    fun setCoreParam(param: CoreParam, n: Int) : Int
    fun adjustCoreParam(param: CoreParam, n: Int) : Int
    fun incrementCoreParam(param: CoreParam) : Int
    fun decrementCoreParam(param: CoreParam) : Int
    ////
    fun getConMode() : StatMode
    fun getDexMode() : StatMode
    fun getIntMode() : StatMode
    fun getWilMode() : StatMode
    fun getMode(stat: QuadStat) : StatMode
    fun setMode(stat: QuadStat, mode: StatMode, force: Boolean) : StatMode
    fun normalizeMode(stat: QuadStat) : StatMode
    fun enhanceMode(stat: QuadStat) : StatMode
    fun enfeebleMode(stat: QuadStat) : StatMode
}

class CharacterParticipant(data: CharaData = CharaData()) : Character(data), Participant {
    override var key: String = ""
    override var status: ParticipantStatus = ParticipantStatus.FRIEND
    override var initiative: Double = 0.00

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
    val keymap: MutableMap<String, Int> = mutableMapOf()
    val participants: MutableMap<String, Participant> = mutableMapOf()
    val participantOrder: Array<Participant> = arrayOf()
    var activeParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }
    var targetParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }

    private fun generateKey(p: Participant) : String {
        val name = p.getName()
        var key = if (name.isBlank()) "Unk" else
            name.substring(0..3.coerceAtMost(name.length))
        var i = keymap[key]
        if (i == null) {
            keymap[key] = 1
        } else {
            keymap[key] = ++i
            key = key.substring(0..(if (i > 9) 1 else 2)) + i
        }
        return key
    }

    private fun coerceIndex(i: Int) : Int {
        return if (participantOrder.isEmpty() || i < 0) 0 else
            if (i >= participantOrder.size) participantOrder.size - 1 else i
    }

    private fun indexIsValid(i: Int) : Boolean {
        return i >= 0 && i < participantOrder.size
    }

    fun getParticipant(key: String) : Participant? {
        return participants[key]
    }

    fun getActiveParticipant() : Participant? {
        return if (indexIsValid(activeParticipantIndex))
            participantOrder[activeParticipantIndex] else
            null
    }

    fun getTargetParticipant() : Participant? {
        return if (indexIsValid(targetParticipantIndex))
            participantOrder[targetParticipantIndex] else
            null
    }

    fun targetNext() : Encounter {
        ++activeParticipantIndex
        return this
    }

    fun activateNext() : Encounter {
        ++targetParticipantIndex
        return this
    }

    fun addParticipant(p: Participant) : Encounter {
        val pkey = generateKey(p)
        p.key = pkey
        participants[pkey] = p
        participantOrder[participantOrder.size] = p
        return this
    }

    fun startNewRound() : Encounter {
        activeParticipantIndex = 0
        if (participantOrder.isNotEmpty()) {
            for (p in participantOrder) {
                var x = p.getMomentum()
                var min = 50.0
                if (x > 0) {
                    min += 50.0 * (x / (x + 2))
                } else if (x < 0) {
                    x = x.absoluteValue
                    min -= 50.0 * (x / (x + 2))
                }
                p.initiative = Random.nextDouble(min, 100.0)
                p.setMomentum(0)
            }
            participantOrder.sort()
            ++round
        }
        return this
    }
}
