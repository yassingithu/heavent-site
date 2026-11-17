// node --experimental-strip-types tests/beta/pointage-instant.mts : heure retenue pour un pointage (en ligne, hors ligne, futur, tardif, trop ancien)
import { instantPointage } from "../../supabase/functions/_shared/pointage.ts";
const now = new Date("2026-11-20T10:00:00Z");
const iso = (ms:number)=>new Date(now.getTime()+ms).toISOString();
const cas:[string,any][]=[
 ["en ligne",{}],
 ["hors ligne il y a 2 h",{hors_ligne:true,heure_appareil:iso(-2*3600e3)}],
 ["hors ligne dans le futur (+1 h)",{hors_ligne:true,heure_appareil:iso(3600e3)}],
 ["hors ligne +3 min (toléré)",{hors_ligne:true,heure_appareil:iso(3*60e3)}],
 ["hors ligne il y a 30 h",{hors_ligne:true,heure_appareil:iso(-30*3600e3)}],
 ["hors ligne il y a 8 jours",{hors_ligne:true,heure_appareil:iso(-8*86400e3)}],
 ["hors ligne heure illisible",{hors_ligne:true,heure_appareil:"abc"}],
 ["heure fournie mais pas hors_ligne (ignorée)",{hors_ligne:false,heure_appareil:iso(-3600e3)}],
];
for(const [n,c] of cas){const r=instantPointage(c,now);console.log(n.padEnd(44),r.instant.toISOString(),"horsLigne="+r.horsLigne,"tardif="+r.tardif,r.refus?("REFUS: "+r.refus):"");}
