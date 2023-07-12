import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { convertToAbsolutePath as convAbs } from './parseCommand.js';

const hashOperations = ['hash'];

const calculateHash = async (filePath) => {
    const fileStream = createReadStream(filePath);
    const hash = createHash('sha256');
    fileStream.pipe(hash);
    hash.on('data', (chunk) => {
        process.stdout.write(chunk.toString('hex'));
    });
};

const execHashOperation = (command, argumentsArray, currentDirectory) => {
    const path = convAbs(argumentsArray[1], currentDirectory);
    if (command == 'hash') {
        calculateHash(path);
    }
};

export { execHashOperation, hashOperations };
