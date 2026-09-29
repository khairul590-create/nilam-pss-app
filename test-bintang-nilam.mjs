import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const source = html.match(/function bintangNilam\(jumlah\)\{[^}]+\}/)?.[0];
assert.ok(source, 'fungsi bintangNilam mesti wujud dalam index.html');

const context = {};
vm.runInNewContext(`${source}; result = bintangNilam`, context);
const bintangNilam = context.result;

const cases = [
  [0, 0], [143, 0],
  [144, 1], [287, 1],
  [288, 2], [431, 2],
  [432, 3], [575, 3],
  [576, 4], [719, 4],
  [720, 5], [9999, 5],
];

for (const [jumlah, expected] of cases) {
  assert.equal(bintangNilam(jumlah), expected, `${jumlah} rekod sepatutnya ${expected} bintang`);
}

console.log('bintang NILAM boundaries: pass');
