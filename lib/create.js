import path from "path";
import Generator from "./Generator.js";

export default function (name, options) {
  // 当前命令行执行的目录
  const cwd = process.cwd();
  // 待创建的目录地址
  const targetDir = path.resolve(cwd, name);
  // 创建项目实例
  const generator = new Generator(name, targetDir);
  // 开始创建
  generator.create();
}
