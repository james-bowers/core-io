const clear = require('clear');
const utils = require('./Utils')
const clui = require('clui');

const argv = require('minimist')(process.argv.slice(2));

clear();


utils.printTitle('yellow', 'core-io')

// run the action
let pathToAction = './actions/' + argv._.join('/')
let host = 'https://localhost:5000'


// start a loading spinner to show something is happening
// const status = new clui.Spinner('Authenticating you, please wait...');
// status.start();

// TODO: load config if exists
// & ask for password to .p12 it
require('./start')(argv)
    .then((params) => require(pathToAction)(host, params))
    .then(() => status.stop())
    .catch((e) => {
        // status.stop()
        utils.print('red', 'An error occured')
        utils.print('red', e)
    })