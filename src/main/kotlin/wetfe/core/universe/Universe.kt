package wetfe.core.universe

enum class Realm {
    CONFLUENT,
    INFERNAL,
    CELESTIAL,
    EXOTIC;
}

enum class Vulnerability {
    NEGATIVE,
    POSITIVE,
    INVERSE,
    HYPER;
}

object Physics {
    fun vulnerabilityOf(causativeSystem: Realm, affectedSystem: Realm): Vulnerability {
        return when (causativeSystem) {
            Realm.INFERNAL -> when (affectedSystem) {
                Realm.INFERNAL -> Vulnerability.INVERSE
                Realm.CELESTIAL -> Vulnerability.HYPER
                Realm.EXOTIC -> Vulnerability.NEGATIVE
                else -> Vulnerability.POSITIVE
            }
            Realm.CELESTIAL -> when (affectedSystem) {
                Realm.CELESTIAL -> Vulnerability.INVERSE
                Realm.INFERNAL -> Vulnerability.HYPER
                Realm.EXOTIC -> Vulnerability.NEGATIVE
                else -> Vulnerability.POSITIVE
            }
            Realm.EXOTIC -> when (affectedSystem) {
                Realm.EXOTIC -> Vulnerability.HYPER
                else -> Vulnerability.POSITIVE
            }
            else -> Vulnerability.POSITIVE
        }
    }
}

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
