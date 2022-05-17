module.exports = {
    apps: [
        {
            name: "server",
            script: "./server/index.js",
            ignore_watch: ["node_modules"],
        },
        {
            name: "client",
            script: "./lippick/src/index.js",
            exec_mode: "cluster",
        },
    ],
};
