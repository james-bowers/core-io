const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const request = require('request')
const http = require('http');

module.exports = {
    fullPath: (path) => {
        return `${process.cwd()}/${path}`
    },
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
    fileExists: (filePath) => {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    },
    printTitle: (color, title) => {
        console.log(
            chalk[color](
                figlet.textSync(title, { horizontalLayout: 'full' })
            )
        );
    },
    print: (color, title) => {
        console.log( chalk[color](title) );
    },
    ask: (questions) => inquirer.prompt(questions),
    readFile: (path) => fs.readFileSync(path),
    writeFile: (path, content) => new Promise(function (resolve, reject) {
        fs.writeFile(path, content, 'UTF-8', function (err) {
            if (err) reject(err);
            resolve(content);
        });
    }),
    fetch: (uri, options, certificate) => {

        options.agentOptions = {
            rejectUnauthorized: false,
            passphrase: certificate.passphrase,
            pfx: fs.readFileSync(certificate.p12Path)
        }

        return new Promise((resolve, reject) => {
            request(uri, options, (err, response) => {
                if (err) reject(err)
                resolve(response)
            })
        }).then(response => response.toJSON())
    }
};