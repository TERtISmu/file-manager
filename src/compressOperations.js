import { createUnzip, createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { convertToAbsolutePath as convAbs } from './parseCommand.js';

const compressOperations = ['compress', 'decompress'];

const decompress = async (filePath) => {
    const rs = createReadStream(filePath);
    const ws = createWriteStream(filePath.substring(0, filePath.length - 3));
    const gs = createUnzip();
    rs.pipe(gs).pipe(ws);
};

const compress = async (filePath) => {
    const rs = createReadStream(filePath);
    const ws = createWriteStream(`${filePath}.gz`);
    const gs = createGzip();
    rs.pipe(gs).pipe(ws);
};

const execCompressOperation = (command, argumentsArray, currentDirectory) => {
    const path = convAbs(argumentsArray[1], currentDirectory);
    if (command == 'compress') {
        compress(path);
    } else if ((command = 'decompress')) {
        decompress(path);
    }
};

export { execCompressOperation, compressOperations };
