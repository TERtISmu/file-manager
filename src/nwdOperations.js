import { promises as fsPromises } from 'fs';
import { convertToAbsolutePath as convAbs } from './parseCommand.js';

const nwdOperations = ['ls', 'up', 'cd'];

const list = async (folderPath) => {
    try {
        let dirContent = await fsPromises.readdir(folderPath);

        const alphabetSortedArray = dirContent.sort();

        const typeSortedArray = alphabetSortedArray.sort((a, b) => {
            var isDirectoryA = a.includes('.', 1);

            var isDirectoryB = b.includes('.', 1);

            if (isDirectoryA && !isDirectoryB) {
                return 1;
            } else if (!isDirectoryA && isDirectoryB) {
                return -1;
            } else {
                return 0;
            }
        });

        const addedTypeArray = typeSortedArray.map((item) => [
            item,
            item.includes('.', 1) ? 'file' : 'directory',
        ]);

        const columnNames = ['Name', 'Type'];

        const formattedToObject = addedTypeArray.map((row) => {
            const obj = {};
            columnNames.forEach((columnName, index) => {
                obj[columnName] = row[index];
            });
            return obj;
        });

        console.table(formattedToObject);
    } catch {
        throw new Error('Error while reading directory');
    }
};

const changeDirectory = (newPath, currentDirectory) => {
    if (newPath == undefined) {
        return currentDirectory;
    }
    return newPath;
};

const execNwdOperation = (command, argumentsArray, currentDirectory) => {
    const path = argumentsArray[1];
    if (command == 'up') {
        if (currentDirectory != 'C:') {
            let temp = currentDirectory.split('\\');
            temp.pop();
            currentDirectory = temp.join('\\');
        }
    } else if (command == 'cd') {
        currentDirectory = changeDirectory(
            convAbs(path, currentDirectory),
            currentDirectory
        );
    } else if (command == 'ls') {
        list(currentDirectory);
    }
    return currentDirectory;
};

export { execNwdOperation, nwdOperations };
