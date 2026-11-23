// One Emoji, One Smile
// Writes exactly one emoji — people hugging (U+1FAC2), a single code point —
// and nothing else to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1FAC2}"; // 🫂 PEOPLE HUGGING — two figures in an embrace.

// Gate: exactly one emoji, one code point, 1 to 8 characters per the rules.
// Also assert it is a single 4-byte UTF-8 sequence, so no hidden variation
// selector, skin tone or ZWJ sequence can sneak in.
import { Buffer } from "node:buffer";
if ([...EMOJI].length !== 1 || Buffer.byteLength(EMOJI, "utf8") !== 4) {
  throw new Error(
    `Entry ${JSON.stringify(EMOJI)} is not exactly one emoji (one code point).`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
