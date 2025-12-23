import gh from 'github-url-to-object';


console.log(gh('git@github.com:peiyanlu/svgoify.git'))

console.log(gh('git+git@github.com:peiyanlu/svgoify.git'))

console.log(gh('git+https://github.com/vitejs/vite.git'))


gh('github:monkey/business')
gh('https://github.com/monkey/business')
gh('https://github.com/monkey/business/tree/master')
gh('https://github.com/monkey/business/tree/master/nested/file.js')
gh('https://github.com/monkey/business.git')
gh('http://github.com/monkey/business')
gh('git://github.com/monkey/business.git')
gh('git+https://github.com/monkey/business.git')
gh('git+git@github.com:peiyanlu/svgoify.git')
