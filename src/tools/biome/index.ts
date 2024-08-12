import path from "path"
import * as FsRead from "../../lib/fs/read"

export const command = {
    install: "add --save-dev --save-exact @biomejs/biome".split(" "),
    init: "biome init".split(" ")
}
const biomeJsonPath = path.resolve(__dirname, "biome.json")
export const readBiomeJson = () => FsRead.read(biomeJsonPath)