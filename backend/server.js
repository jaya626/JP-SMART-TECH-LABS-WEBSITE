
const env = require("./src/config/env");
const app = require("./src/app");

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    console.log("---------------------------------------");
    console.log("JP SMART TECH LABS");
    console.log("Backend server started successfully");
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`API Version: ${env.API_VERSION}`);
    console.log(`Health: http://localhost:${PORT}/api/${env.API_VERSION}/health`);
    console.log("---------------------------------------");
});

module.exports = server;
