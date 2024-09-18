/**
 * This file includes portions of code from the 'create-nx-workspace' package.
 * The original code can be found at:
 * https://github.com/nrwl/nx/blob/2c0a50c0d8f45f65c9a91e1426fc2e66a29af3bb/packages/create-nx-workspace/src/utils/child-process-utils.ts
 *
 * This code is licensed under the MIT License:
 * MIT License
 * Copyright (c) 2017-2024 Narwhal Technologies Inc.
 *
 * The full MIT License is available in the LICENSE file at the root of this repository.
 */
import { exec } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

export class CreateAppError extends Error {
  constructor(
    public logMessage: string,
    public code: number | null | undefined,
    public logFile: string,
  ) {
    super(logMessage)
    this.name = 'CreateAppError'
  }
}

export function execAndWait(command: string, cwd: string) {
  return new Promise<{ code: number; stdout: string }>((res, rej) => {
    exec(command, { cwd, env: { ...process.env } }, (error, stdout, stderr) => {
      if (error) {
        const logFile = join(cwd, 'error.log')
        writeFileSync(logFile, `${stdout}\n${stderr}`)
        const message = stderr && stderr.trim().length > 0 ? stderr : stdout
        rej(new CreateAppError(message, error.code, logFile))
      } else {
        res({ code: 0, stdout })
      }
    })
  })
}
