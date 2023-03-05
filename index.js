const fs = require('fs');
const readline = require('readline');
const core = require('@actions/core');

async function run() {
    try {
        const filePath = './pubspec.yaml';
        const regex = /^version: ([0-9]+)\.([0-9]+)\.([0-9]+)\+([0-9]+)/;

        const stream = fs.createReadStream(filePath, (err, data) => {
            if (err) throw err;
            return data;
        });

        const rl = readline.createInterface({
            input: stream,
        });

        for await (const line of rl) {
            core.debug(line);
            const match = line.match(regex);
            if (match) {
                core.debug(match);
                core.setOutput('major', Number(match[1]));
                core.setOutput('minor', Number(match[2]));
                core.setOutput('patch', Number(match[3]));
                core.setOutput('build', Number(match[4]));
                break;
            }
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();