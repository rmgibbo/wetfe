package wetfe.core.universe

enum class Physicality {
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
    fun vulnerabilityOf(causativeSystem: Physicality, affectedSystem: Physicality): Vulnerability {
        return when (causativeSystem) {
            Physicality.INFERNAL -> when (affectedSystem) {
                Physicality.INFERNAL -> Vulnerability.INVERSE
                Physicality.CELESTIAL -> Vulnerability.HYPER
                Physicality.EXOTIC -> Vulnerability.NEGATIVE
                else -> Vulnerability.POSITIVE
            }
            Physicality.CELESTIAL -> when (affectedSystem) {
                Physicality.CELESTIAL -> Vulnerability.INVERSE
                Physicality.INFERNAL -> Vulnerability.HYPER
                Physicality.EXOTIC -> Vulnerability.NEGATIVE
                else -> Vulnerability.POSITIVE
            }
            Physicality.EXOTIC -> when (affectedSystem) {
                Physicality.EXOTIC -> Vulnerability.HYPER
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
