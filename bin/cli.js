#! /usr/bin/env node --experimental-json-modules

import chalk from "chalk";
import commander from "commander";
import createMethod from "../lib/create.js";
import pkgJSON from "../package.json"

const { program } = commander;

console.log(chalk.green("webpack-react-cli-easy start..."));

program
  .command("create <app-name>")
  .description("create a new project")
  .action((name, options) => {
    createMethod(name, options);
  });

// 配置版本号信息
program.version(chalk.green(`v${pkgJSON.version}`), "-v, --vision");

program.parse(process.argv);
