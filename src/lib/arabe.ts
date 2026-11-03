/* Prénoms et lieux écrits en lettres arabes. Un dictionnaire des prénoms et mots courants,
   puis une translittération par règles pour le reste. Les mariés peuvent corriger le résultat
   (champs « en arabe » de l'éditeur) : cette traduction n'est qu'une suggestion de départ. */

const sans = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const PRENOMS: Record<string, string> = {
  mohamed: "محمد", mohammed: "محمد", muhammad: "محمد", ahmed: "أحمد", ahmad: "أحمد", yassin: "ياسين", yassine: "ياسين", imane: "إيمان", iman: "إيمان",
  sara: "سارة", sarah: "سارة", hind: "هند", amal: "أمل", karim: "كريم", salma: "سلمى", fatima: "فاطمة", fatimazahra: "فاطمة الزهراء", zineb: "زينب",
  khadija: "خديجة", aicha: "عائشة", aisha: "عائشة", meryem: "مريم", maryam: "مريم", mariam: "مريم", youssef: "يوسف", yousef: "يوسف", omar: "عمر", ali: "علي",
  hassan: "حسن", hasna: "حسناء", hamza: "حمزة", ayoub: "أيوب", anas: "أنس", mehdi: "مهدي", mahdi: "مهدي", reda: "رضا", rida: "رضا", nada: "ندى", lina: "لينا",
  rim: "ريم", reem: "ريم", soukaina: "سكينة", sokaina: "سكينة", hajar: "هاجر", asmae: "أسماء", asma: "أسماء", ghita: "غيثة", kenza: "كنزة", lamia: "لمياء",
  nawal: "نوال", samira: "سميرة", said: "سعيد", rachid: "رشيد", hicham: "هشام", hisham: "هشام", tarik: "طارق", tariq: "طارق", walid: "وليد", adil: "عادل",
  bilal: "بلال", ilyas: "إلياس", elias: "إلياس", zakaria: "زكرياء", zakariae: "زكرياء", ismail: "إسماعيل", ibrahim: "إبراهيم", mustapha: "مصطفى", moustapha: "مصطفى",
  abdellah: "عبد الله", abdallah: "عبد الله", abdelkrim: "عبد الكريم", abdelkarim: "عبد الكريم", abderrahmane: "عبد الرحمان", abderrahman: "عبد الرحمان",
  abdelaziz: "عبد العزيز", abdelilah: "عبد الإله", abdelhak: "عبد الحق", abdelmajid: "عبد المجيد", abdelghani: "عبد الغني", abdelhamid: "عبد الحميد",
  abdelmalek: "عبد المالك", abdessamad: "عبد الصمد", abdelouahed: "عبد الواحد", abdelwahab: "عبد الوهاب", abdelfattah: "عبد الفتاح", abdelati: "عبد العالي",
  khalid: "خالد", khaled: "خالد", fouad: "فؤاد", driss: "إدريس", idriss: "إدريس", jamal: "جمال", kamal: "كمال", nabil: "نبيل", noureddine: "نور الدين",
  salah: "صلاح", samir: "سمير", soufiane: "سفيان", sofian: "سفيان", othmane: "عثمان", osman: "عثمان", ayman: "أيمن", amine: "أمين", yahya: "يحيى", younes: "يونس",
  zakia: "زكية", latifa: "لطيفة", naima: "نعيمة", najat: "نجاة", nadia: "نادية", loubna: "لبنى", houda: "هدى", hanane: "حنان", hanan: "حنان", ilham: "إلهام",
  jihane: "جيهان", wafae: "وفاء", wafa: "وفاء", widad: "وداد", yasmine: "ياسمين", yasmin: "ياسمين", rajae: "رجاء", rania: "رانيا", sanaa: "سناء", sana: "سناء",
  sofia: "صوفيا", soumaya: "سمية", souad: "سعاد", safae: "صفاء", chaimae: "شيماء", chaima: "شيماء", meriem: "مريم", ikram: "إكرام", oumaima: "أميمة", oumayma: "أميمة",
  hajar_: "هاجر", abir: "عبير", dounia: "دنيا", douae: "دعاء", doha: "ضحى", lamiae: "لمياء", btissam: "ابتسام", ibtissam: "ابتسام", kawtar: "كوثر", kaoutar: "كوثر",
  alaoui: "العلوي", idrissi: "الإدريسي", benani: "بناني", tazi: "التازي", fassi: "الفاسي", bennis: "بنيس", berrada: "برادة", lahlou: "لحلو", amrani: "العمراني",
  ben: "بن", bin: "بن", ibn: "ابن", el: "ال", al: "ال", zahra: "الزهراء", mohamedamine: "محمد أمين",
};

const MOTS_LIEU: Record<string, string> = {
  hotel: "فندق", palais: "قصر", chateau: "قصر", fetes: "الأفراح", fete: "الحفلات", reception: "الحفلات", receptions: "الحفلات", riad: "رياض", villa: "فيلا", salle: "قاعة",
  salles: "قاعات", jardin: "حديقة", jardins: "حدائق", domaine: "ضيعة", ferme: "ضيعة", maison: "دار", dar: "دار", restaurant: "مطعم", club: "نادي", plage: "شاطئ", beach: "شاطئ",
  casino: "كازينو", royal: "الملكي", royale: "الملكية", grand: "الكبير", grande: "الكبرى", mariage: "الأعراس", mariages: "الأعراس", salon: "صالون", espace: "فضاء", resort: "منتجع",
  golf: "غولف", spa: "سبا", kasbah: "قصبة", medina: "المدينة", centre: "مركز", complexe: "مركب", residence: "إقامة", terrasse: "تراس", pavillon: "جناح", theatre: "مسرح",
  tanger: "طنجة", tangier: "طنجة", casablanca: "الدار البيضاء", casa: "الدار البيضاء", rabat: "الرباط", marrakech: "مراكش", marrakesh: "مراكش", fes: "فاس", fez: "فاس",
  agadir: "أكادير", meknes: "مكناس", oujda: "وجدة", tetouan: "تطوان", kenitra: "القنيطرة", sale: "سلا", essaouira: "الصويرة", mohammedia: "المحمدية", jadida: "الجديدة",
  nador: "الناظور", temara: "تمارة", ifrane: "إفران", chefchaouen: "شفشاون", dakhla: "الداخلة", laayoune: "العيون", safi: "آسفي", settat: "سطات", berrechid: "برشيد",
  taza: "تازة", larache: "العرائش", asilah: "أصيلة", mdiq: "المضيق", fnideq: "الفنيدق", saidia: "السعيدية", ouarzazate: "ورزازات", errachidia: "الرشيدية",
  khouribga: "خريبكة", azrou: "أزرو", skhirat: "الصخيرات", bouznika: "بوزنيقة", bouazza: "بوعزة", slimane: "سليمان", midelt: "ميدلت", taroudant: "تارودانت",
  batouta: "بطوطة", amane: "أمان", atlas: "الأطلس", mamounia: "المامونية", palmeraie: "النخيل", anfa: "أنفا", hassan: "الحسن", mohammed: "محمد", mohamed: "محمد",
  ben: "بن", bin: "بن", ibn: "ابن", el: "ال", al: "ال", sidi: "سيدي", moulay: "مولاي", oulad: "أولاد", ait: "آيت", bou: "بو", abou: "أبو",
  de: "", du: "", des: "", la: "", le: "", les: "", l: "", d: "", a: "", au: "", aux: "", en: "", sur: "", in: "", of: "", the: "", at: "",
  et: "و", and: "و",
};

const CONS: Record<string, string> = {
  b: "ب", c: "ك", d: "د", f: "ف", g: "غ", h: "ه", j: "ج", k: "ك", l: "ل", m: "م", n: "ن", p: "ب", q: "ق", r: "ر", s: "س", t: "ت", v: "ف", w: "و", x: "كس", z: "ز",
};
const DIGRAPHES: [string, string][] = [["ch", "ش"], ["kh", "خ"], ["gh", "غ"], ["sh", "ش"], ["th", "ث"], ["dh", "ذ"], ["ph", "ف"], ["ts", "تس"], ["ss", "س"], ["tt", "ت"], ["ll", "ل"], ["mm", "م"], ["nn", "ن"], ["rr", "ر"], ["bb", "ب"], ["dd", "د"], ["zz", "ز"], ["ff", "ف"], ["kk", "ك"], ["qu", "ك"]];

/** Translittération par règles d'un mot latin (suggestion à corriger). */
function translitMot(mot: string): string {
  const w = sans(mot).replace(/[^a-z]/g, "");
  if (!w) return mot;
  let out = "";
  let i = 0;
  while (i < w.length) {
    const debut = i === 0;
    const reste = w.slice(i);
    const dg = DIGRAPHES.find(([k]) => reste.startsWith(k));
    if (dg) { out += dg[1]; i += dg[0].length; continue; }
    if (reste.startsWith("ou") || reste.startsWith("oo")) { out += debut ? "أو" : "و"; i += 2; continue; }
    const c = w[i];
    if ("aeiouy".includes(c)) {
      const fin = i === w.length - 1;
      if (c === "a") out += debut ? "أ" : fin ? "ا" : (reste[1] === "a" ? "" : "");
      else if (c === "i") out += debut ? "إ" : "ي";
      else if (c === "e") out += debut ? "إ" : "";
      else if (c === "o") out += debut ? "أ" : "و";
      else if (c === "u") out += debut ? "أ" : "و";
      else out += "ي"; // y
      i++; continue;
    }
    out += CONS[c] ?? ""; i++;
  }
  return out || mot;
}

const PREFIXE_ABD = /^(abd(?:el|al|ul|er|es|en|e)?)(.+)$/;

function translitNom(mot: string): string {
  const k = sans(mot).replace(/[^a-z]/g, "");
  if (!k) return mot;
  if (PRENOMS[k]) return PRENOMS[k];
  const m = PREFIXE_ABD.exec(k);
  if (m && m[2].length > 2) return `عبد ${PRENOMS[m[2]] ? (PRENOMS[m[2]].startsWith("ال") ? PRENOMS[m[2]] : "ال" + PRENOMS[m[2]]) : "ال" + translitMot(m[2])}`;
  return translitMot(mot);
}

const estArabe = (s: string) => /[؀-ۿ]/.test(s);

/** « Hind & Abdellah » → « هند و عبد الله ». Texte déjà arabe : laissé tel quel. */
export function noms_ar(noms: string): string {
  if (!noms || estArabe(noms)) return noms;
  return noms
    .split(/(\s*&\s*|\s+(?:et|and)\s+)/i)
    .map((part) => (/^\s*(&|et|and)\s*$/i.test(part) ? " و " : part.split(/\s+/).filter(Boolean).map(translitNom).join(" ")))
    .join("")
    .replace(/\s+/g, " ").trim();
}

/** Nom d'un invité (prénom + nom) en lettres arabes. */
export function nomInvite_ar(nom: string): string {
  if (!nom || estArabe(nom)) return nom;
  return nom.split(/\s+/).filter(Boolean).map(translitNom).join(" ");
}

/** « Hôtel & Palais de fêtes Ben Batouta, Tanger » → « فندق و قصر الأفراح بن بطوطة، طنجة ». */
export function lieu_ar(lieu: string): string {
  if (!lieu || estArabe(lieu)) return lieu;
  return lieu
    .split(/(,|;)/)
    .map((seg) => (seg === "," || seg === ";" ? "،" : seg.replace(/&/g, " et ").split(/[\s'’-]+/).filter(Boolean).map((m) => {
      const k = sans(m).replace(/[^a-z]/g, "");
      if (/^\d+$/.test(m)) return m;
      if (k in MOTS_LIEU) return MOTS_LIEU[k];
      if (k in PRENOMS) return PRENOMS[k];
      return translitMot(m);
    }).filter(Boolean).join(" ")))
    .join(" ").replace(/\s+،/g, "،").replace(/\s+/g, " ").trim();
}

/** « 19h30 » → « 19:30 » (chiffres latins, sans la lettre h). */
export function heure_ar(h: string): string {
  return h.replace(/\s*[hH]\s*(\d{1,2})?/, (_m, mm) => `:${mm ?? "00"}`);
}

const MOTS_PROGRAMME: Record<string, string> = {
  accueil: "استقبال", invites: "الضيوف", invite: "الضيف", entree: "دخول", maries: "العروسين", mariee: "العروس", marie: "العريس", diner: "عشاء", dejeuner: "غداء",
  soiree: "سهرة", dansante: "راقصة", ceremonie: "حفل", cocktail: "كوكتيل", gateau: "كعكة", danse: "رقص", photos: "صور", photo: "صور", henne: "الحناء", buffet: "بوفيه",
  ouverture: "افتتاح", fin: "نهاية", mariage: "الزفاف", religieuse: "دينية", spectacle: "عرض", musique: "موسيقى", discours: "كلمات", premiere: "الأولى", ouverturebal: "افتتاح الرقص",
  the: "شاي", gouter: "وجبة خفيفة", pause: "استراحة", negafa: "النگافة", amariya: "العمارية", lancement: "انطلاق", arrivee: "وصول", depart: "مغادرة", fiancailles: "الخطوبة",
  signature: "توقيع", contrat: "العقد", priere: "دعاء", feux: "ألعاب", artifice: "نارية", animation: "فقرات", dj: "دي جي", orchestre: "أوركسترا", groupe: "فرقة",
};

/** Libellé d'un moment du programme, en arabe (suggestion). */
export function titre_ar(titre: string): string {
  if (!titre || estArabe(titre)) return titre;
  return titre.split(/[\s'’-]+/).filter(Boolean).map((m) => {
    const k = sans(m).replace(/[^a-z]/g, "");
    if (/^\d+$/.test(m)) return m;
    if (k in MOTS_PROGRAMME) return MOTS_PROGRAMME[k];
    if (k in MOTS_LIEU) return MOTS_LIEU[k];
    if (k in PRENOMS) return PRENOMS[k];
    return translitMot(m);
  }).filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
