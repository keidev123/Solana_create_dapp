import { log } from '@clack/prompts'
import { GetArgsResult } from './get-args-result'
import { Task, taskFail } from './vendor/clack-tasks'
import { initializeGitRepo } from './vendor/git'

export function createAppTaskInitializeGit(args: GetArgsResult): Task {
  return {
    enabled: !args.skipGit,
    title: 'Initializing git',
    task: async (result) => {
      try {
        if (args.verbose) {
          log.warn(`Initializing git repo`)
        }
        await initializeGitRepo(args.targetDirectory, {
          commit: { email: '', name: '', message: 'chore: initial commit' },
        })
        return result({ message: 'Initialized git repo' })
      } catch (error) {
        if (args.verbose) {
          log.error(`Error initializing git repo: ${error}`)
          console.error(error)
        }
        log.error(`${error}`)
        taskFail(`init: Error initializing git: ${error}`)
      }
    },
  }
}
