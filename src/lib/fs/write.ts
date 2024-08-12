
import { TaggedError } from "effect/Data"
import * as E from "effect/Effect"
import {writeFile} from "node:fs/promises"

class WriteError extends TaggedError("WriteError")<{error: unknown}> {
    static new = (error: unknown) => new WriteError({error})
}

type WriteFileParams = Parameters<typeof writeFile>
export const write = (fullpath: WriteFileParams[0], content: WriteFileParams[1]) => E.tryPromise({
    try: () => writeFile(fullpath, content),
    catch: WriteError.new
})