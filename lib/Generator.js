const util = require("util");
const path = require("path");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async download() {
    const requestUrl = "github:lucky-bob/webpack-react-template";
    try {
      console.log(this.targetDir)
      const res = await this.downloadGitRepo(requestUrl, this.targetDir);
    } catch (err) {
      console.log(err)
    }
  }
  async create() {
    await this.download();

    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
