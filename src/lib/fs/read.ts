import {readFile} from "node:fs/promises"
import * as E from "effect/Effect"
import { TaggedError } from "effect/Data"

class ReadError extends TaggedError("ReadError")<{error: unknown}> {
    static new = (error: unknown) => new ReadError({error})
}
export const read = (fullpath: string) => E.tryPromise({
    try: () => readFile(fullpath, "utf-8"),
    catch: ReadError.new
}) 