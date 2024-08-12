
import * as Command from "@effect/cli/Command"
import * as Prompt from "@effect/cli/Prompt"
import * as Args from "@effect/cli/Args"
import * as NodeContext from "@effect/platform-node/NodeContext"
import * as Runtime from "@effect/platform-node/NodeRuntime"
import * as Effect from "effect/Effect"
import * as Spawn from "./lib/spawn"
import * as Biome from "./tools/biome"


const toolsPrompt = Prompt.select({
    message: "select tool to install",
    choices: [
        {title: "corepack", value: "corepack", description: "install corepack for nodejs"},
        {title: "biome", value: "biome", description: "install biomejs for TS || JS project"}
    ]
})

  const prompt = Prompt.all({tool: toolsPrompt}).pipe(
    Prompt.map(d => d)
  )

  const command = Command.prompt("mise-preconfig", prompt, ({tool}) => {
    if (tool === "biome") {
        return Spawn.spawnEffect("pnpm", Biome.command.install).pipe(
            Effect.map(() => Spawn.spawnEffect("pnpm", Biome.command.init))
        )
    }
    return Effect.void
  })

  const cli = Command.run(command, {
    name: "Mise preconfig",
    version: "0.0.1"
  })

  Effect.suspend(() => cli(process.env as unknown as ReadonlyArray<string>)).pipe(
    Effect.provide(NodeContext.layer),
    Runtime.runMain
  )