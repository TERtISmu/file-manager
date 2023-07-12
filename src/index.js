import {
    execBasicFileOperation,
    filesBasicOperations,
} from './filesOperations.js';
import { execNwdOperation, nwdOperations } from './nwdOperations.js';
import { execHashOperation, hashOperations } from './hashOperations.js';
import {
    execCompressOperation,
    compressOperations,
} from './compressOperations.js';
import { execOsInfoOperation, osInfoOperations } from './osInfoOperations.js';
import {
    showCurrentDirectory,
    showStartGreeting,
    showExitMessage,
} from './messageToConsole.js';

const filesManger = async () => {
    const userName = process.argv[2].substring(11);

    // let currentDirectory = os.homedir();
    let currentDirectory = 'C:\\Users\\user\\Desktop\\file manager';

    showStartGreeting(userName);
    showCurrentDirectory(currentDirectory);

    process.stdin.on('data', (chunk) => {
        const argumentsArray = chunk.toString().trim().split(' ');

        const command = argumentsArray[0];

        if (command == 'help') {
            console.log(nwdOperations);
        } else if (osInfoOperations.includes(command)) {
            execOsInfoOperation(command, argumentsArray);
        } else if (nwdOperations.includes(command)) {
            currentDirectory = execNwdOperation(
                command,
                argumentsArray,
                currentDirectory
            );
        } else if (filesBasicOperations.includes(command)) {
            execBasicFileOperation(command, argumentsArray, currentDirectory);
        } else if (hashOperations.includes(command)) {
            execHashOperation(command, argumentsArray, currentDirectory);
        } else if (compressOperations.includes(command)) {
            execCompressOperation(command, argumentsArray, currentDirectory);
        } else if (command == '.exit') {
            showExitMessage(userName);
            process.exit();
        } else {
            console.log(`Command ${command} does not exist`);
        }

        showCurrentDirectory(currentDirectory);
    });

    process.on('SIGINT', function () {
        showExitMessage(userName);
        process.exit();
    });
};

await filesManger();
