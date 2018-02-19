// account
const utils = require('./../../Utils')

module.exports = (host, params) => {

    utils.print('blue', 'Action\t\tDescription')
    
    let help = [
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
            action: 'project tag new',
            description: 'New tag for a project'
        },
    ].map(actionHelp => {
        console.log(actionHelp.action + '\t\t' + actionHelp.description)
    })
    

    return Promise.resolve()
}