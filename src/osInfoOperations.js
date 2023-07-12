import os from 'os';

const osInfoOperations = ['os'];

const execOsInfoOperation = (command, argumentsArray) => {
    const key = argumentsArray[1];
    if (command == 'os') {
        if (key == '--EOL') {
            if (os.EOL == '\r\n') {
                console.log('\\r\\n');
            } else {
                console.log('\\n');
            }
        } else if (key == '--cpus') {
            console.log(os.cpus());
        } else if (key == '--username') {
            console.log(os.userInfo().username);
        } else if (key == '--homedir') {
            console.log(os.homedir());
        } else if (key == '--architecture') {
            console.log(os.arch());
        }
    }
};

export { execOsInfoOperation, osInfoOperations };
