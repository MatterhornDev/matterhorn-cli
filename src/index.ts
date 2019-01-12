#!/usr/bin/env node
import chalk from 'chalk'
import * as figlet from 'figlet'

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Matterhorn CLI', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
}

const run = async () => {
  init()
}

run()