// account
const utils = require('./../../Utils')

let displayActionHelp = actionHelp => {

    let paramaterConfig = require('./../' + actionHelp.action.split(' ').join('/') + '/paramaters.json')

    let paramaters = Object.keys(paramaterConfig).map(param => {
        return `--${param}=\"value\"`
    }).join(' ')

    utils.print('green', actionHelp.description)
    utils.print('white', actionHelp.action + ' ' + paramaters)

    console.log('\n')
}

module.exports = (host, params) => {
    
    let help = [
        {
            action: 'sign-up',
            description: 'Create a new account'
        },
        {
            action: 'account',
            description: 'View your account information'
        },
        {
            action: 'project list',
            description: 'List your projects'
        },
        {
            action: 'project new',
            description: 'Start a new project'
        },
        {
            action: 'project get-current',
            description: 'Get the current project as set in the configuration file'
        },
        {
            action: 'project tag new',
            description: 'New tag for a project'
        },
        {
            action: 'project tag list',
            description: 'List tags for current project'
        },
        {
            action: 'project tag get',
            description: 'Get specified tag configuration'
        },
        {
            action: 'project tag deploy',
            description: 'Deploy a specified tag'
        }
    ].forEach(displayActionHelp)

    utils.print('yellow', 'NOTE: If paramaters are omitted, you will be prompted for values as they are required.\n')

    return Promise.resolve()
}