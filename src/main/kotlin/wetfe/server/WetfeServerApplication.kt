package wetfe.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WetfeServerApplication

fun main(args: Array<String>) {
    runApplication<WetfeServerApplication>(*args)
}
