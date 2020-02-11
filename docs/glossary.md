# Glossary

ability
: Something a given character can do -- or a passive characteristic they may exhibit -- to affect combat, social, or environmental encounters. The four types of abilities are: skills, feats, reactions, and traits.

ability list/sheet
: The list of abilities that are available to a given player character during encounters. Due to the extensible nature of feats, there are necessarily many available abilities that will not appear in this list.

ability point, AP
: Awarded every even level to player characters. Used to acquire abilities from the ability tree.

ability tree
: The set of abilities -- skills, reactions, and traits -- arranged by their requirements, that all player characters may acquire with ability points.

above/below
: Refers to the placement of chips (Ⓢ, Ⓟ, Ⓐ, or Ⓣ) in a deque, relative to a different type of chip.

affliction
: Short-term deleterious effects, such as poisons, bleeding wounds, confusion or panic attacks. Affliction is only maintained during encounters, where it retards healing.

affliction chip, Ⓐ
: The unit and representation of affliction. They accumulate above soul chips Ⓢ on the damage deque, where each affliction chip dissipates after absorbing one point of healing. They are only maintained during encounters.

being
: A broad term used to identify creatures and constructs of various levels of sentience. Typically, one or more core attributes aptly characterize a being.

below/above
: Refers to the placement of chips (Ⓢ, Ⓟ, Ⓐ, or Ⓣ) in a deque, relative to a different type of chip.

bloodfont
: A type of font found on equipment that typically augments or grants physical abilities.

buff, _enhance_
: To cause the enhancement of one or more core attributes.

channelling, _channel_
: The state of heightened focus a being must enter to resolve skills that require more power chips Ⓟ than are currently available. Once channelling, the caster or performer immediately ends their turn, though their skill is not considered resolved yet. Immediately upon their next turn, they cease channelling, gain a number of power chips Ⓟ equal to their number of healthy soul chips Ⓢ, and resume the skill they began on their previous turn.

character
: A being of some significance to an adventure or the game at large. Player characters (PCs) are controlled by the players, whereas non-player characters (NPCs) are generally controlled by the game master.

combatant
: A being involved in a combat encounter.

condition, ℂ
: TODO. NORMAL("=", 0), BLITZING("!", 30), TURTLING("@", 30), CHANNELING("^", 30), STAGGERED("$", 60), UNCONSCIOUS("*", 70), COMATOSE("~", 80), DEAD("_", 90)

contingent effect
: An additional effect of a skill that occurs if and only if the opponent is unable to completely negate the damage the primary effect causes.

constitution, CON
: The quality encompassing a being’s physical health, strength, endurance, and tolerance to alcohol and other bodily poisons.

core attribute
: An element of the set of four qualities {CON, DEX, INT, WIL} that characterize most beings. Measured (anthropomorphically) on a scale from 1 to 20, where 10 roughly indicates a capable adventurer.

core natures
: `0 absent` • `1..2 paltry` • `3..4 rudimentary` • `5..6 inferior` • `7..8 unremarkable` • `9..10 respectable` • `11..12 considerable` • `13..14 formidable` • `15..16 phenomenal` • `17..19 prodigious` • `20 miraculous`

damage, dmg
: The unit of harm suffered by souls. Generally, each point of damage is resolved by transferring one soul chip Ⓢ from the affected being’s health deque to their damage deque. This process is automatically reversed once sufficient time has elapsed between encounters. Damage comes in five types: anatomical, psychological, infernal, celestial, and exotic.

damage deque, Damage[]
: The deque of soul chips Ⓢ and affliction chips Ⓐ that represents wounded lifeforce and other impairments. The chips of this deque can be readily restored by the abilities of adventurers, and therefore do not generally persist between encounters.

debuff, _enfeeble_
: To cause the enfeeblement of one or more core attributes.

defense roll
: A d20 roll against the hardiness or mettle table that determines the magnitude of mitigation of incoming damage. Generally, all anatomical damage is mitigated with a defense roll governed by constitution; all psychological damage is mitigated with a defense roll governed by willpower; and the remaining damage types—infernal, celestial, and exotic—bypass defenses. Overrolls result in the minimum level of the defense table.

deque
: _Pronounced "deck."_ A vertical column of chips. The position of the different types of chips in a deque is directly relevant to resolving many game effects. For example, power chips Ⓟ accumulate above soul chips Ⓢ, indicating that incoming damage is first applied to (and absorbed by) the power chips before the underlying soul chips.

dexterity, DEX
: The quality encompassing a being’s physical agility, reflexes, acrobatics, and finesse with tools and weapons.

encounter
: Any combat, social, or environmental event that challenges the wit, prowess, and the luck of an adventuring party.

enfeeblement, enfeebled attribute
: An effect that temporarily weakens one or more core attributes of a being. Any skills governed by an enfeebled attribute are penalized by rolling an additional d6 against the enfeeblement table, which is applied to the accompanying d20 result ℜ.

enhancement, enhanced attribute
: An effect that temporarily intensifies one or more core attributes of a being. Any skills governed by an enhanced attribute are augmented by rolling an additional d6 against the enhancement table, which is applied to the accompanying d20 result ℜ.

experience, EXP
: Acquired by the characters in an adventuring party after completing an encounter. Typical encounters award one, two, or three experience points. TODO: Describe the loosely-coupled exp/level system here.

fatigue, ftg
: Represents the temporary loss of soul chips Ⓢ due to extreme exertion of physical and mental faculties. Accumulates during the stressful events that occur between peaceful periods of adventuring. Automatically restored after each sound rest.

fatigue deque, Fatigue[]
: The deque of soul chips Ⓢ and trauma chips Ⓣ that represents exhausted lifeforce and long-term maladies. The chips of this deque persist in between encounters, and require specific conditions to cure: the soul chips are generally restored by enjoying a sound rest; and the trauma chips must be explicitly cured by specialized means.

feat, Ғ
: An action accomplished by winning a contest, or overcoming a challenge. Feats are meant to be a flexible and extensible mechanic in the game, that cover anything characters may try to accomplish in a given situation, including combat, social, and environmental encounters. There are four types of feats that may be utilized at any time: 1) feats of strength & endurance, which are governed by constitution; 2) feats of subtlety & finesse, which are governed by dexterity; 3) feats of perception & logic, which are governed by intelligence; and 4) feats of charisma & courage, which are governed by willpower.

feats of strength & endurance, Ғ:CON
: A character’s attempt to win a contest, or overcome a challenge using their strength and endurance. For example, a character may attempt to pin an opponent by grappling them. The character would roll a CON check, as would their opponent. Overrolls result in ℜ = 0. The character wins the contest if and only if their result is higher than their opponent’s. [TODO: Give one example of an Ғ:CON challenge.]

feats of subtlety & finesse, Ғ:DEX
: A character’s attempt to win a contest, or overcome a challenge using their subtlety and finesse. For example, a character may attempt to pickpocket another being. The character would roll a DEX check, while their opponent would roll an INT check to test their perception of the theft. Overrolls result in ℜ = 0. The character wins the contest if and only if their result is higher than their opponent’s. [TODO: Give one example of an Ғ:DEX challenge.]

feats of perception & logic, Ғ:INT
: A character’s attempt to win a contest, or overcome a challenge using their perception and logic. For example, a character may to eavesdrop on a conversation that is rich in jargon, or even held in a foreign tongue that the character has but studied academically. The character would roll an INT check, while the GM would roll a state check against a set challenge score. Overrolls result in ℜ = 0. The character wins the challenge if and only if their result is higher than their opponent’s. [TODO: Give one example of an Ғ:INT contest.]

feats of charisma & courage, Ғ:WIL
: A character’s attempt to win a contest, or overcome a challenge using their charisma and courage. For example, a character may attempt to intimidate another being. The character would roll a WIL check, while their opponent would also roll a WIL check to test their mettle against the intimidation. Overrolls result in ℜ = 0. The character wins the contest if and only if their result is higher than their opponent’s. [TODO: Give one example of an Ғ:WIL challenge.]

font
: Vessels of untapped energy that can be found on equipment. Powerful beings may use part of their soul to innervate a font, thereby tapping into its energy and harnessing its effects.

healing, _heal_
: The process of restoring damaged soul chips (Ⓢ in the damage deque) to the health deque. Healing affects the chips of the damage deque point-per-chip, from the top down, and according to their type. Affliction chips Ⓐ simply pop, whereas soul chips pop and queue into the health deque.

health deque, Health[]
: The deque of soul chips Ⓢ and power chips Ⓟ that represents healthy or empowered lifeforce. Generally, characters begin every encounter with all of their soul chips in this deque, and may temporarily accumulate one or more power chips above them.

_innervate_
: When a being uses the energy of their soul to unlock the power of a font, thereby binding with it.

intelligence, INT
: The quality encompassing a being’s mental agility, perception, insight, logic, and detailed memory.

manafont
: A type of font found on some equipment that typically augments or grants mental abilities.

momentum, 𝓂
: TODO. Integer. (-, 0, +). Haste, delay. Round order.

overkill
: A killing blow that would have otherwise staggered its target. Overkills grant the same morale-based healing as staggers, and the killer is hastened; and there may be other circumstantial ramifications, such as inspiring fear in the allies of the overkilled being.

overroll
: A d20 roll that is higher than the being’s score in their governing attribute. Typically, overrolls result in the minimum level of a skill or reaction table; or they represent a marginal attempt at a feat.

player character, PC
: Any character controlled by a player, as opposed to the game master.

power, power field
: The manifestation of a heightened soul, capable of absorbing incoming damage, as well as fueling abilities that require bursts of intense energy. This field is potent, but ephemeral. Power is only maintained momentarily during encounters, and once consumed in any amount from any source, it entirely dissipates at the end of the current turn. The magnitude of power is measured with power chips Ⓟ, and is limited by the empowered being’s power limit.

power chip, Ⓟ
: The unit and representation of power. They accumulate above soul chips Ⓢ on the health deque, where each power chip dissipates after absorbing one point of damage, and at the end of any turn in which any power chips were consumed. They are only maintained during encounters. A being may only accumulate as many power chips as their power limit.

power limit
: The maximum number of power chips Ⓟ a being may accumulate. Generally, every being’s power limit is equal to the size of their soulpool.

_queue_
: The act of adding a soul chip Ⓢ to the bottom of a deque. Soul chips always accumulate in this manner; i.e. they never stack.

reaction
: A type of ability, governed by dexterity or intelligence, that may be attempted any time its trigger occurs in an encounter.

reaction roll
: A d20 roll against the reaction table that determines the success of a reaction. Overrolls yield the minimum level of the table.

skill
: A practiced ability executed by beings in combat, social, or environmental encounters. Skills are resolved with a roll against a result table.

skill roll
: A d20 roll that determines the results ℜ of a skill, based on the skill’s result table. Overrolls (rolls that are higher than the actor’s score in the governing attribute) set ℜ to the minimum level of the table.

soul, soulpool
: A being’s overall lifeforce. Measured by a number of soul chips Ⓢ, where more chips represent a more formidable being with greater reserves of physical and mental energy. Generally, the size of a being’s soulpool directly sets its power limit.

soul chip, Ⓢ
: The unit and representation of lifeforce. A number of soul chips comprises a being’s soulpool, which is distributed among their three deques (health, damage, fatigue), as well as any fonts they have innervated. For example, soul chips in the health deque represent an amount of physical and mental energy available to a being, whereas multiple chips in the fatigue deque indicate a critical state of enervation.

soulbinding
: The process whereby a character innervates a font with their soul: they remove soul chips Ⓢ from their health deque and dedicate them to a bloodfont or a manafont found within their equipment. Once innervated, each font typically grants power to the character, who becomes thus specially bound to their equipment.

sound rest
: A period of peace and relaxation sufficient to recuperate a being's mental and physical reserves. Generally, it restores all soul chips Ⓢ to the being's health deque. A sound rest for a human being typically involves eight hours of "good" sleep.

_stack_
: The act of adding a chip to the top of a deque. Power chips Ⓟ, affliction chips Ⓐ, and trauma chips Ⓣ always accumulate in this manner; i.e. they never queue.

staggered, _stagger_
: The state an NPC combatant enters upon suffering damage equal to or greater than its stagger threshold in a single turn. It is delayed, and suffers a +1 vulnerability to its anatomical and psychological damage adjustments. Additionally, all opponents that are aware of the staggering receive a morale boost in the form of 1 healing.

stagger threshold, Ḡ
: A property of NPC combatants that sets how much damage they must suffer on a single turn to become staggered.

trait
: A type of ability that grants a passive effect to a character. Traits are not rolled (as skills and reactions are), and typically modify other abilities -- or the general rules of the game -- for a character.

trauma
: Long-term crippling effects, such as from grave injuries or overwhelmingly stressful events. Trauma prevents a character from enjoying the full recuperating effects of sound rests, and are typically difficult to alleviate.

trauma chip, Ⓣ
: The unit and representation of trauma. They accumulate above soul chips Ⓢ on the fatigue deque, where each trauma chip prevents one soul chip from being recovered after any sound rest the character takes. They persist until explicitly relieved by an ability, or special effect.

willpower, WIL
: The quality encompassing a being’s mental health, mettle, and strength of character and convictions.
  
  
  
Copyright © 2020 Ryan Gibbons
