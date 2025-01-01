module.exports = {
    transform: {
        "^.+\\.jsx?$": ["@swc/jest"],
    },
    moduleFileExtensions: ["js", "jsx"],
    testMatch: ["**/?(*.)+(spec|test).js"],
};