import { ACCUEILS, DECORS, EXPERIENCES, LIEUX, LUMIERES, MUSIQUES, PALETTES, STYLES } from "../../src/components/heavent-city/donnees";
export const IDS = {
  lieux: LIEUX.map((x) => x.id as string), styles: STYLES.map((x) => x.id as string), palettes: PALETTES.map((x) => x.id as string), lumieres: LUMIERES.map((x) => x.id as string),
  musiques: MUSIQUES.map((x) => x.id as string), accueils: ACCUEILS.map((x) => x.id as string), options: [...DECORS, ...EXPERIENCES].map((x) => x.id as string),
};
