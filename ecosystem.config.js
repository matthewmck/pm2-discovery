const path = require("path");
const appInfo = require("./package.json");

module.exports = {
  apps: [{
    // Alias for pm2 instance
    //name: appInfo.name,
    name: appInfo.name,
    // Script path relative to pm2 start
    //script: appInfo.main,
    script: appInfo.main,
    /*
      Cluster mode allows the app to be scaled across all CPU's available
       - set exec_mode to cluster
       - set instances to max to auto detect the number of available CPU's 
         and run as many processes as possible
    */
    exec_mode: "cluster",
    instances: "max",
    // If a file changes the app will get reloaded
    watch: true,
    // Ignores watching these files
    ignore_watch: ["logs", "node_modules"],
    // Will restart app if it exceeds the amount of memory specified
    max_memory_restart: '150M',
    // send error and out logs to specified path
    error_file: path.join(__dirname, "/logs/error.log"),
    out_file: path.join(__dirname, "/logs/out.log"),
    // Avoids seperating logs for each instance of the same app
    combine_logs: true,
    // time in ms before forcing a relead if app not listening
    listen_timeout: 8000,
    /*
      PM2 allows you to set environment variables that you can access
      with the node app. By default it will load in the env variables
      (i.e. port will be 3000 and node_env will be development). By
      specifing '--env production' when starting pm2 it will load in
      the variables set under env_production.
    */
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 8000,
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    // can set deployment for production, staging, and development
    production: {
      user: 'node',
      host: '212.83.163.1',
      // ref is the branch you want to pull from
      ref: 'origin/master',
      // repo to clone
      repo: 'git@github.com:repo.git',
      // path of the application on the server
      path: '/var/www/production',
      // commands to be executed on the server after the repo has been cloned
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
      /*
        Can also set other executable exceptions:
        * pre-setup - run commands before setup process starts
        * post-setup - This will be executed on the host after cloning the repo
        * pre-deploy-local - will execute things locally (on the same machine you 
          deploy things to)
      */
    }
  }
};
