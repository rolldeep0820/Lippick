module.exports = {
    apps: [
        {
            name: "Lippick",
            script: "npm",
            args: "start",
            exec_mode: "cluster",
            ignore_watch: ["node_modules"],
        },
    ],
};
