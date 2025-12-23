import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'


interface TextFormatOptions {
  convertEnglishPunctuationToChinese?: boolean;
  convertFullWidthToHalfWidth?: boolean;
}

export function formatText(text: string, options: TextFormatOptions = {}): string {
  const {
    convertEnglishPunctuationToChinese = false,
    convertFullWidthToHalfWidth = true,
  } = options;
  
  // 全角转半角
  if (convertFullWidthToHalfWidth) {
    text = text.replace(/[\uFF01-\uFF5E]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
    ).replace(/\u3000/g, ' '); // 全角空格转半角
  }
  
  // 英文标点转中文标点
  if (convertEnglishPunctuationToChinese) {
    const punctuationMap: Record<string, string> = {
      ',': '，',
      '.': '。',
      ':': '：',
      ';': '；',
      '?': '？',
      '!': '！',
      '(': '（',
      ')': '）',
      '[': '【',
      ']': '】',
      '"': '“',
      "'": '‘'
    };
    
    text = text.replace(/[.,:;?!()\[\]"']/g, m => punctuationMap[m] || m);
  }
  
  // 插入中英文之间的空格，排除中英文标点之间
  // 汉字与英文/数字
  text = text
    .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9@#&\-_])/g, '$1 $2') // 中文后面是英文/数字
    .replace(/([a-zA-Z0-9@#&\-_])([\u4e00-\u9fa5])/g, '$1 $2'); // 英文/数字后面是中文
  
  // 删除标点符号周围的多余空格（中文标点）
  text = text.replace(/([\u3002\uff0c\uff01\uff1f\uff1a\uff1b\uff08\uff09\u3001\u201c\u201d\u2018\u2019])\s+/g, '$1');
  text = text.replace(/\s+([\u3002\uff0c\uff01\uff1f\uff1a\uff1b\uff08\uff09\u3001\u201c\u201d\u2018\u2019])/g, '$1');
  
  // 多空格合并为1个空格
  // text = text.replace(/\s{2,}/g, ' ');
  
  return text.trim();
}

export function insertSpaceBetweenChineseAndEnglish(text: string): string {
  return text
    // 中文与英文/数字之间插入空格（中文在前）
    .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2')
    // 英文/数字与中文之间插入空格（中文在后）
    .replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1 $2')
    // 去除重复空格（如已有空格再插入避免变成两个）
    .replace(/ {2,}/g, ' ')
    .trim()
}


const raw = '你好world！这是a测试，数字123和符号@#要处理。';
const result = insertSpaceBetweenChineseAndEnglish(raw);

console.log(result);
// 输出：你好 world！这是 a 测试，数字 123 和符号 @# 要处理。

const txt = readFileSync('./vue_interview_21_50.md', 'utf-8')

const res = insertSpaceBetweenChineseAndEnglish(txt);

console.log(res.replace(/第 (\d+) 题：/g, '$1. '))

await writeFile('./vue_i.md', res.replace(/第 (\d+) 题：/g, '$1. '));
