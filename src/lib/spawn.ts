
import * as E from "effect/Effect"
import {spawn} from "child_process"

const spawnAsync = (command: string, args: string[] = []) =>
    new Promise<void>((resolve, reject) => {
        const child = spawn(command, args, {stdio: "inherit"})
    })

export const spawnEffect = (command: string, args: string[] = []) => E.async<void, never,never>((resume) => {
    spawn(command, args, {stdio: "inherit", shell: true}).on("close", () => {
        resume(E.void)
    })
}) 
