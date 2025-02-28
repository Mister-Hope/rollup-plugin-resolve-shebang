import MagicString from "magic-string";
import type {
  Plugin,
  RenderedChunk,
  SourceMapInput,
  TransformResult,
} from "rollup";

const SHE_BANG_REG = /^\s*(#!.*)/;

export const shebang = (): Plugin => {
  const shebangMap = new Map<string, string>();

  return {
    name: "resolve-shebang",

    transform(code: string, id: string): TransformResult | null {
      const match = SHE_BANG_REG.exec(code);

      if (match) {
        const str = new MagicString(code);

        str.remove(match.index, match[1].length);
        shebangMap.set(id, match[1]);

        return { code: str.toString(), map: str.generateMap({ hires: true }) };
      }

      return null;
    },

    renderChunk(
      code: string,
      chunk: RenderedChunk,
    ): { code: string; map?: SourceMapInput } | null {
      if (chunk.isEntry) {
        const key = Array.from(shebangMap.keys()).find((id) =>
          chunk.facadeModuleId?.includes(id),
        );

        if (key) {
          const str = new MagicString(code);

          str.prepend(`${shebangMap.get(key)!}\n`);

          return {
            code: str.toString(),
            map: str.generateMap({ hires: true }),
          };
        }
      }

      return null;
    },
  };
};
