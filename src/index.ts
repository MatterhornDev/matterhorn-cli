#!/usr/bin/env node
import chalk from 'chalk'
import * as figlet from 'figlet'
import * as inquirer from 'inquirer'
import * as shell from 'shelljs'

const init = () => {
  shell.echo(
    chalk.green(
      figlet.textSync('Matterhorn CLI', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
}

const getProjectName = (): Promise<{ project_name: string }> => {
  return inquirer.prompt([{
    type: 'input',
    name: 'project_name',
    message: 'Enter project name',
  }])
}

const createDirectory = (project_name: string) => {
  shell.echo(
    chalk.blueBright(`Creating project directory ${project_name}`)
  )
  if (!shell.test('-d', project_name)) {
    shell.mkdir(project_name)
  } else {
    shell.echo(chalk.red(`${project_name} already exists`))
    shell.exit(1)
  }
}

const gitClone = (project_name: string) => {
  shell.echo(
    chalk.blueBright(`Cloning Matterhorn project into ${project_name}`)
  )
  shell.exec(`git clone https://github.com/Ethan-Arrowood/matterhorn.git ${project_name}`)
}

const replace = (project_name: string) => {
  shell.cd(project_name)
  shell.ls('-R').forEach(fileName => {
    if (!shell.test('-d', fileName)) {
      shell.sed('-i', 'matterhorn', project_name, fileName)
    }
  })
  shell.cd('..')
}

const run = async () => {
  init()

  const { project_name } = await getProjectName()
  createDirectory(project_name)
  gitClone(project_name)
  replace(project_name)

  shell.echo(
    chalk.green(`Your project is ready to go! Run \`cd ${project_name}\` then \`npm install\` to get started.`)
  )
}

run()