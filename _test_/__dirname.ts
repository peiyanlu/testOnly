import { dirname } from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__filename, __dirname)


const encoder = new TextEncoder();
const bytes = encoder.encode('前端');
let binary = "";
for (let i = 0; i < bytes.length; i++) {
  binary += String.fromCharCode(bytes[i]);
}
console.log(btoa(binary));
