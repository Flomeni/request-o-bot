const fs = require('fs')
const cmd = require('node-cmd');
const appRootPath = require('app-root-path').path;
const packageJSONPath = `${appRootPath}/package.json`;
const packageJSON = require(packageJSONPath);

const choices = {
    major: 'major',
    minor: 'minor',
    patch: 'patch'
};
const PROMPT_NAME = 'VERSIONS';

(function main() {
    cmd.runSync('npm version patch');
    //bump();
})();


async function prompt() {
    const inquirer = require('inquirer');

    return inquirer
        .prompt([
            {
                type: 'list',
                name: PROMPT_NAME,
                message: 'What version to bump?',
                choices: [
                    choices.patch,
                    choices.minor,
                    choices.major
                ]
            }
        ])
        .then(answers => {
            return answers[PROMPT_NAME];
        });
}

function incrementVersion(oldVersion, versionToIncrement) {
    const verArray = oldVersion.split('.');
    switch(versionToIncrement){
        case choices.patch:
            verArray[2] = `${++verArray[2]}`;
            break;
        case choices.minor:
            verArray[1] = `${++verArray[1]}`;
            break;
        case choices.major:
            verArray[0] = `${++verArray[0]}`
            break;
    }

    return verArray.join('.');
}

async function bump() {
    const versionToIncrement = await prompt();
    try {
        packageJSON.version = incrementVersion(packageJSON.version, versionToIncrement);
        fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, /*replacer*/null, /*space*/2));
    } catch (e) {
        console.error(e);
    }
}
