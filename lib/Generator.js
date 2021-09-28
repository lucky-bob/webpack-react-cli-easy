import util from "util";
import downloadGitRepo from "download-git-repo";
import chalk from "chalk";
import ora from "ora";
import fs from "fs";
import inquirer from "inquirer";

class Generator {
  constructor(name, targetDir) {
    this.projectName = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  download() {
    inquirer
      .prompt([
        {
          name: "description",
          message: "Please enter the project description: ",
        },
        {
          name: "author",
          message: "Please enter the author name: ",
        },
      ])
      .then(async (answer) => {
        const requestUrl = "github:lucky-bob/webpack-react-template";
        const spinner = ora("Loading Template");
        spinner.start();
        try {
          await this.downloadGitRepo(requestUrl, this.targetDir);
          spinner.succeed();
          const fileName = `${this.projectName}/package.json`;
          const data = fs.readFileSync(fileName).toString();
          let parsedData = JSON.parse(data);
          parsedData.name = this.projectName;
          parsedData.author = answer.author;
          parsedData.description = answer.description;
          fs.writeFileSync(fileName, JSON.stringify(parsedData, null, "\t"));
          ora(`Successfully created project ${chalk.cyan(this.projectName)}`).succeed();
        } catch (err) {
          console.log(err);
          spinner.fail("Request failed");
        }
      });
  }
  async create() {
    await this.download();
  }
}

export default Generator;
