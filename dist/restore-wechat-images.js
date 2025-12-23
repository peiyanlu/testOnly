import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { basename, join } from 'path';
import { globSync } from 'tinyglobby';
const getFileType = (buffer) => {
    const jpg = Buffer.from([0xff, 0xd8, 0xff]);
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    const sub = (s, e) => buffer.subarray(s, e);
    if (sub(0, 3).equals(jpg)) {
        return 'jpg';
    }
    if (sub(0, 4).equals(png)) {
        return 'png';
    }
    if (['GIF87a', 'GIF89a'].includes(sub(0, 6).toString())) {
        return 'gif';
    }
};
const readDatFiles = (dir) => {
    return globSync(['**/*.dat'], { cwd: dir })
        .map((file) => join(dir, file));
};
const restoreDatImages = (files, output) => {
    files.forEach(async (filepath) => {
        const buffer = readFileSync(filepath);
        const ext = getFileType(buffer);
        if (ext) {
            const filename = basename(filepath).replace(/\.dat$/, `.${ext}`);
            const newFilepath = join(output, filename);
            await writeFile(newFilepath, buffer);
            console.log(`✔ Restored: ${filepath} -> ${filename}`);
        }
        else {
            console.warn(`✖ Unknown type file: ${filepath}`);
        }
    });
};
const root = 'C:\\Users\\ASUS\\Documents';
restoreDatImages(readDatFiles(root), 'E:\\ts-run-test\\cache');
