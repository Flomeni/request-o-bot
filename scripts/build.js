const cmd = require('node-cmd');

(function main() {
    bump();
})();

async function bump() {
    const version = await prompt();
    
    if (!version) {
        throw new Error('Your some how managed to not input a version');
    }

    cmd.runSync(`npm version ${version}`);
}

async function prompt() {
    const PROMPT_NAME = 'VERSIONS';
    const choices = {
        major: 'major',
        minor: 'minor',
        patch: 'patch'
    };
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
