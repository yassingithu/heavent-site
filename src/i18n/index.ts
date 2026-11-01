import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationFR from './locales/fr.json';
import { chargerTextes } from './textes';

const resources = {
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      // Français par défaut (site et Google) ; le visiteur peut changer de langue avec le sélecteur
      order: ['localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
  });


/** Anglais et arabe sont chargés seulement quand on en a besoin (français : rien à télécharger de plus). */
async function chargerLangue(lng?: string) {
  const l = lng?.startsWith('ar') ? 'ar' : lng?.startsWith('en') ? 'en' : null;
  if (!l || i18n.hasResourceBundle(l, 'translation')) { if (l) await chargerTextes(); return; }
  const [m] = await Promise.all([l === 'ar' ? import('./locales/ar.json') : import('./locales/en.json'), chargerTextes()]);
  i18n.addResourceBundle(l, 'translation', m.default, true, true);
}
const changer = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = (async (lng?: string, cb?: any) => { await chargerLangue(lng); return changer(lng, cb); }) as typeof i18n.changeLanguage;
// Visiteur déjà en anglais/arabe (langue mémorisée) : on charge puis on réaffiche
void chargerLangue(i18n.language).then(() => { if (i18n.language && i18n.language !== 'fr') void changer(i18n.language); });

export default i18n;
