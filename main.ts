// News-image entry: copy the rendered poster to /output/entry.png.
// Node 22, standard library only. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(dir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(dir, 'entry.png'));
