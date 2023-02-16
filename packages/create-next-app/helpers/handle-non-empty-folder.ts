/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk'
import { emptyDirSync } from 'fs-extra'
import prompts from 'prompts'

export async function handleNonEmptyFolder(
  root: string,
  appName: string,
  clearDirIfExists: boolean | undefined
): Promise<void> {
  const { handleNonEmpty } = await prompts({
    type: 'select',
    name: 'handleNonEmpty',
    message: 'What do you want to do?',
    choices: [
      { title: 'Abort', value: 'abort' },
      { title: 'Clear the folder', value: 'empty' },
    ],
    initial: clearDirIfExists ? 1 : 0,
  })

  if (handleNonEmpty === 'empty') {
    const { confirmDelete } = await prompts({
      type: 'toggle',
      name: 'confirmDelete',
      message: `Are you sure you want to ${chalk.red(`clear '/${appName}'`)}?`,
      initial: clearDirIfExists ? true : false,
      active: 'Yes',
      inactive: 'No',
    })

    if (confirmDelete) {
      console.log()
      emptyDirSync(root)
      return
    }
  }

  console.log()
  console.log('Aborting....')

  process.exit(0)
}
