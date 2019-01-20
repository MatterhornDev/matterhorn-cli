import chalk from 'chalk'
import * as figlet from 'figlet'
import * as inquirer from 'inquirer'
import * as shell from 'shelljs'

const matterhorn_cli = async () => {
  // Intro Text
  shell.echo(
    chalk.green(
      figlet.textSync('Matterhorn CLI', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    ),
    chalk.red(
      '\n⚠️  Warning ⚠️',
      '\nThis project is currently in beta.',
      '\nIt is not intended for production use.',
      '\nReport all bugs at: https://github.com/Ethan-Arrowood/matterhorn-cli/issues/new'
    )
  )

  // Get the users desired projectName
  const { projectName } = await inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: 'Enter project name:',
    validate: value => !shell.test('-d', value) || 'Directory already exists.'
  }])

  // Create directory (its guaranteed not to exist via validate function in inquirer prompt)
  shell.echo(chalk.blueBright(`Creating project directory ${projectName}`))
  shell.mkdir(projectName)

  // clone matterhorn git repo into new project dir
  shell.echo(chalk.blueBright(`Cloning Matterhorn project into ${projectName}`))
  let code = shell.exec(`git clone https://github.com/Ethan-Arrowood/matterhorn.git ${projectName}`).code
  shell.echo(code === 0 ? chalk.green('Git clone successful') : chalk.red('Error: Git clone failed'))
  code !== 0 && shell.exit(1)

  // Move into project directory to perform cleanup and install steps
  shell.cd(projectName)

  // remove .git directory
  shell.echo(chalk.blueBright('Deleting .git directory'))
  shell.rm('-rf', '.git')

  // replace 'matterhorn' with users projectName
  shell.echo(chalk.blueBright('Replacing \'matterhorn\' with your project name'))
  shell.ls('-R').forEach(fileName => {
    if (!shell.test('-d', fileName)) {
      shell.sed('-i', 'matterhorn', projectName, fileName)
    }
  })

  // npm install dependencies
  shell.echo(chalk.blueBright('Installing project dependencies. . .'))
  shell.exec('npm install', { silent: true })

  shell.cd('..')

  shell.echo(
    chalk.green(
      `Your project is ready to go! Run \`cd ${projectName}\` then \`npm run dev\` to get started.`
    )
  )
}

export default matterhorn_cli
export { matterhorn_cli }