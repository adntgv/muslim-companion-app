const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sourceFile = path.join(__dirname, '..', 'messages', 'en.json');
const targetLocales = ['ru', 'kk'];

function scanForTranslations() {
  const files = glob.sync(path.join(__dirname, '..', '**/*.{tsx,ts}'), {
    ignore: ['**/node_modules/**', '**/.next/**']
  });

  const translations = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const sectionsLines = content.match(/const t = useTranslations\(['"]([\w.]+)['"]\)/g);
    const matches = content.match(/t\(['"]([\w.]+)['"]\)/g);
    if (matches && sectionsLines) {
      const sectionLine = sectionsLines[0];
      const prefix = sectionLine.match(/const t = useTranslations\(['"]([\w.]+)['"]\)/)[1];

      matches.forEach(match => {
        const key = match.match(/t\(['"]([\w.]+)['"]\)/)[1];
        const fullKey = `${prefix}.${key}`;
        const parts = fullKey.split('.');
        
        let current = translations;

        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }

        if (!current[parts[parts.length - 1]]) {
          current[parts[parts.length - 1]] = `[${key}]`;
        }
      });
    }
  });

  fs.writeFileSync(sourceFile, JSON.stringify(translations, null, 2), 'utf8');
}

function generateTranslations() {
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

  targetLocales.forEach(locale => {
    const targetFile = path.join(__dirname, '..', 'messages', `${locale}.json`);
    let targetContent = {};

    if (fs.existsSync(targetFile)) {
      targetContent = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    }

    const mergedContent = mergeTranslations(sourceContent, targetContent);
    fs.writeFileSync(targetFile, JSON.stringify(mergedContent, null, 2), 'utf8');
    console.log(`Generated translations for ${locale}`);
  });
}

function mergeTranslations(source, target, prefix = '') {
  const result = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      result[key] = mergeTranslations(value, target[key] || {}, fullKey);
    } else if (!(key in result)) {
      result[key] = `[${fullKey}]`;
    }
  }

  return result;
}

scanForTranslations();
generateTranslations();