import { execFileSync } from "node:child_process";

const repo = "jiamo-coder/leego-design-ppt";
const run = (command, args) => execFileSync(command, args, { cwd: process.cwd(), stdio: "inherit" });
run("gh", ["repo", "view", repo]);
run("git", ["add", ".", ":!latest.json", ":!public/latest.json"]);
run("git", ["commit", "-m", "release: publish Leego Design PPT resources"]);
run("git", ["push", "origin", "HEAD:main"]);
run("git", ["add", "latest.json", "public/latest.json"]);
run("git", ["commit", "-m", "release: update trusted manifest"]);
run("git", ["push", "origin", "HEAD:main"]);
console.log("Published resources first and latest.json last.");
