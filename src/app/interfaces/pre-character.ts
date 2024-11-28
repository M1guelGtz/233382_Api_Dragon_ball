import { Character } from "./character"
import { Links } from "./links"
import { Meta } from "./meta"

export interface PreCharacter {
    items: Character[]
    links: Links
    meta: Meta
}
