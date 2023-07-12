import { existsSync } from 'fs';

const convertToAbsolutePath = (relativePath, currentDirectory) => {
    let absolutePath;

    if (relativePath.includes('C:\\')) {
        absolutePath = relativePath;
    } else {
        let convertedCurrentDirectory = currentDirectory.split('\\');

        let formatedPath = relativePath.split('\\');

        for (let i = 0; i < formatedPath.length; i++) {
            if (formatedPath[i] == '..') {
                convertedCurrentDirectory.pop();
            } else if (formatedPath[i] == '.') {
            } else {
                convertedCurrentDirectory.push(formatedPath[i]);
            }
        }
        absolutePath = convertedCurrentDirectory.join('\\');
    }

    // if (existsSync(absolutePath)) {
    return absolutePath;
    // } else {
    //     console.log(`Path ${absolutePath} does not exist`);
    // }
};

export { convertToAbsolutePath };
