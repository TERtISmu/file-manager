const showStartGreeting = (userName) => {
    console.log(`Welcome to the File Manager, ${userName}!\n`);
};

const showExitMessage = (userName) => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

const showCurrentDirectory = (currentDirectory) => {
    console.log(`\nYou are currently in ${currentDirectory}\n`);
};

export { showCurrentDirectory, showStartGreeting, showExitMessage };
