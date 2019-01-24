#!/usr/bin/env node
import matterhorn_cli from './index'
import * as yargsParser from 'yargs-parser'
import * as fs from 'fs'
import * as path from 'path'

const argv = yargsParser(process.argv.slice(2))

const getVersion = () => {
  fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (err, data) => {
    if (err) throw err

    if (typeof data === 'string') {
      const packageJson = JSON.parse(data)
      console.log(packageJson.version)
    } else {
      console.log('im a buffer')
    }
  })
}

const run = () => {
  if (argv.version) {
    getVersion()
  } else {
    matterhorn_cli()
  }
}

run()