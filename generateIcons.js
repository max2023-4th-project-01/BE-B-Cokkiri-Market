import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, 'src/assets/icon');
const files = fs.readdirSync(iconsDir);

const imports = files
  .filter(file => file.endsWith('.svg'))
  .map(file => {
    const iconName = file
      .replace('.svg', '')
      .split('-')
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join('');
    return `import { ReactComponent as ${iconName} } from '../../assets/icon/${file}';`;
  })
  .join('\n');

const iconNames = files
  .filter(file => file.endsWith('.svg'))
  .map(file =>
    file
      .replace('.svg', '')
      .split('-')
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join('')
  );

const iconNamesWithSpaces = iconNames.map(name => `  ${name}`);
const exportStatement = `export const icons = {\n${iconNamesWithSpaces.join(
  ',\n'
)},\n};`;

const types = `export type IconsType = keyof typeof icons;\n`;

const newContent = `${imports}\n\n${exportStatement}\n\n${types}`;
const iconFilePath = path.resolve(__dirname, 'src/components/icon/icons.ts');

const existingContent = fs.existsSync(iconFilePath)
  ? fs.readFileSync(iconFilePath, 'utf-8')
  : '';

if (existingContent != newContent) {
  fs.writeFileSync(iconFilePath, newContent);
}
