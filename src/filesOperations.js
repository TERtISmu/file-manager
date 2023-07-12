import {
    existsSync,
    createReadStream,
    createWriteStream,
    promises as fsPromises,
} from 'fs';
import { convertToAbsolutePath as convAbs } from './parseCommand.js';

const filesBasicOperations = ['cat', 'add', 'rn', 'cp', 'mv', 'rm'];

const showError = (name, message) => {
    console.log('name: ', name);
    console.log('message: ', message);
};

const remove = async (filePath) => {
    try {
        await fsPromises.rm(filePath);
        console.log(`${filePath} has being deleted`);
    } catch (e) {
        showError(e.name, e.message);
    }
};

const copy = async (filePath, pathToNewDirectory) => {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(
        `${pathToNewDirectory}\\${filePath.split('\\').at(-1)}`
    );
    readStream.pipe(writeStream);
};

const move = async (filePath, pathToNewDirectory) => {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(
        `${pathToNewDirectory}\\${filePath.split('\\').at(-1)}`
    );
    readStream.pipe(writeStream);
    remove(filePath);
};

const renameFile = async (filePath, newFilePath) => {
    try {
        await fsPromises.rename(filePath, newFilePath);
    } catch (e) {
        showError(e.name, e.message);
    }
};

const read = async (filePath) => {
    const readStream = createReadStream(filePath);
    readStream.pipe(process.stdout);
};

const create = async (filePath) => {
    try {
        await fsPromises.writeFile(filePath, '');
        console.log('New file created successfully!');
    } catch (error) {
        console.log(error.name, ':', error.message);
    }
};

const execBasicFileOperation = (command, argumentsArray, currentDirectory) => {
    let path1;
    let path2;
    if (argumentsArray.length == 1) {
        console.log('there are no arguments');
    } else if (argumentsArray.length == 2) {
        path1 = convAbs(argumentsArray[1], currentDirectory);
    } else if (argumentsArray.length == 3) {
        path1 = convAbs(argumentsArray[1], currentDirectory);
        path2 = convAbs(argumentsArray[2], currentDirectory);
    }

    if (command == 'cat') {
        read(path1);
    } else if (command == 'add') {
        create(path1);
    } else if (command == 'rn') {
        renameFile(path1, path2);
    } else if (command == 'cp') {
        copy(path1, path2);
    } else if (command == 'rm') {
        remove(path1);
    } else if (command == 'mv') {
        move(path1, path2);
    }
};

export { execBasicFileOperation, filesBasicOperations };
