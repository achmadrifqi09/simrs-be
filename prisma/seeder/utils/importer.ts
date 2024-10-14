import fs from 'fs';
import path from 'path';

export const readJsonFile = <T>(filename: string): T[] => {
  const result = fs.readFileSync(
    path.resolve(__dirname, `../data${filename}`),
    'utf8',
  );
  return JSON.parse(result);
};
