const clear = require('clear');
const utils = require('./Utils')
const clui = require('clui');

const argv = require('minimist')(process.argv.slice(2));

clear();


utils.printTitle('yellow', 'core-io')

// run the action
argv.pathToAction = './actions/' + argv._.join('/')

let host = 'https://localhost:5000'

require('./start')(argv)
    .then((params) => require(argv.pathToAction)(host, params))
    .catch((e) => {
        utils.print('red', 'An error occured')
        utils.print('red', e)
    })