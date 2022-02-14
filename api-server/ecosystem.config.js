module.exports = {
  apps: [
    {
      name: "api-server",
      script: "./lib/server.js",
      instances: -3,
      exec_mode: "cluster",
    },
    {
      name: "rotate worker",
      script: "./worker.js",
      args: "rotate",
    },
  ],
};
