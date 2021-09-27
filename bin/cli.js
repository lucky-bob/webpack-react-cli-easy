#! /usr/bin/env node

const chalk = require("chalk");
const { program } = require("commander");

console.log(chalk.green("webpack-react-cli-easy start"));

program
  .command("create <app-name>")
  .description("create a new project")
  .action((name, options) => {
    require("../lib/create.js")(name, options);
  });

// 配置版本号信息
program.version(chalk.green(`v${require("../package.json").version}`), "-v, --vision");

program.parse(process.argv);
