package wetfe.core.enc

import wetfe.core.chara.*

interface Participant {
    var key: String // unique key of this participant within an encounter
    var initiative: Double // initiative for the round, calculated from momentum
    ////
    fun getName() : String
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
    fun getAffliction() : Int
    fun setAffliction(n: Int) : Int
    fun sustainAffliction(n: Int) : Int
    fun cureAffliction(n: Int) : Int
    ////
    fun getTrauma() : Int
    fun setTrauma(n: Int) : Int
    fun sufferTrauma(n: Int) : Int
    fun relieveTrauma(n: Int) : Int
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
    fun getParam(param: StateParam) : Int
    fun setParam(param: StateParam, n: Int) : Int
    fun adjustBy(param: StateParam, n: Int) : Int
    fun increment(param: StateParam) : Int
    fun decrement(param: StateParam) : Int
    ////
    fun getParam(param: CoreParam) : Int
    fun evalCoreParam(param: CoreParam) : Int
    fun getCoreHistory(param: CoreParam) : ModHistory<Int>
    fun addCoreMod(param: CoreParam, mod: Modification<Int>) : Int
    ////
    fun setMode(stat: QuadStat, mode: StatMode, force: Boolean) : StatMode
    fun normalizeMode(stat: QuadStat) : StatMode
    fun enhanceMode(stat: QuadStat) : StatMode
    fun enfeebleMode(stat: QuadStat) : StatMode
}

class CharacterParticipant(data: CharaData = CharaData()) : Character(data), Participant {
    override var key: String = ""
    override var initiative: Double = 0.00
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
//class ConfluxMonsterParticipant : MonsterParticipant {
//
//}
//

enum class EncounterType(val key: String) {
    COMBAT("COMBAT"),
    SOCIAL("SOCIAL"),
    ENVIRONMENTAL("ENVIRONMENTAL");
}

class Encounter(type: EncounterType) {
    val type: EncounterType = type
    var round: Int = 0
    val keymap: MutableMap<String, Int> = mutableMapOf()
    val participants: MutableMap<String, Participant> = mutableMapOf()
    val participantOrder: ArrayList<Participant> = arrayListOf()
    var activeParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }
    var targetParticipantIndex: Int = 0
        set(i) {
            field = coerceIndex(i)
        }

    fun generateKey(p: Participant) : String {
        val name = p.getName()
        var key = if (name.isNullOrBlank()) "Unk" else
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
        participantOrder.add(p)
        return this
    }
}
