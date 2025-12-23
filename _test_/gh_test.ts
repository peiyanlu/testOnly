interface GhResult {
  owner: string;
  repo: string;
  branch?: string;
}

function gh(input: string): GhResult {
  input = input.trim();
  
  // 去掉 github: 伪协议
  if (input.startsWith('github:')) {
    input = input.slice('github:'.length);
  }
  
  // 处理 git+git@github.com:owner/repo.git 形式
  input = input.replace(/^git\+git@github\.com:/, '');
  
  // 处理 git@github.com:owner/repo.git 形式
  input = input.replace(/^git@github\.com:/, '');
  
  // 去掉协议+域名
  input = input.replace(/^((git\+)?(https?|git|ssh):\/\/)?(www\.)?github\.com\//, '');
  
  // 去掉 .git 后缀
  input = input.replace(/\.git$/, '');
  
  // 现在 input 形如: owner/repo[/tree/branch[/...]]
  const parts = input.split('/');
  
  if (parts.length < 2) {
    throw new Error('Invalid GitHub repo string');
  }
  
  const owner = parts[0];
  const repo = parts[1];
  
  // 寻找分支名（branch）
  // 规则：如果第三段是 "tree"，第四段即为 branch 名
  let branch: string | undefined;
  if (parts.length >= 4 && parts[2] === 'tree') {
    branch = parts[3];
  }
  
  return {
    owner,
    repo,
    branch,
  };
}

console.log(gh('github:monkey/business'))
console.log(gh('https://github.com/monkey/business'))
console.log(gh('https://github.com/monkey/business/tree/master'))
console.log(gh('https://github.com/monkey/business/tree/master/nested/file.js'))
console.log(gh('https://github.com/monkey/business.git'))
console.log(gh('http://github.com/monkey/business'))
console.log(gh('git://github.com/monkey/business.git'))
console.log(gh('git+https://github.com/monkey/business.git'))
console.log(gh('git+git@github.com:peiyanlu/svgoify.git'))


console.log(crypto.randomUUID())
console.log(crypto.randomUUID())


import {
  setInterval,
} from 'node:timers/promises';


// const inte = 200;
// console.log(Date.now(),123)
// for await (const startTime of setInterval(inte, Date.now())) {
//   const now = Date.now();
//   console.log(now);
//   if ((now - startTime) > 1000)
//     break;
// }
// console.log(Date.now());


const interval =async (ms: number, count: number, cb: any) => {
  for await (const startTime of setInterval(ms, Date.now())) {
    const now = Date.now();
    cb(now)
    if ((now - startTime) > ms * count)
      break;
  }
}

await interval(200, 5, (n) => {
  console.log(n);
})
