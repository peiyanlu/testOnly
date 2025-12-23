import { execSync } from 'node:child_process';
console.log(process.env.npm_config_user_agent);
console.log(execSync(`npm view typescript version --json`, { encoding: 'utf8' }).trim());
