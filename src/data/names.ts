// 99 Names of Allah (Asma-ul-Husna) dataset with verified Dhivehi transliterations and explanations

export interface AllahName {
  id: number;
  arabic: string;
  transliteration: string;
  dhivehiMeaning: string;
}

/**
 * Normalizes Arabic text for searching by removing tashkeel (diacritics/harakat),
 * tatweel, and normalizing alef/hamza forms.
 */
export function normalizeArabic(text: string): string {
  return text
    // Remove Arabic diacritics / tashkeel
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Remove Tatweel (kashida)
    .replace(/\u0640/g, '')
    // Normalize forms of Alef
    .replace(/[إأآٱ]/g, 'ا')
    // Normalize Taa Marbuta to Haa
    .replace(/ة/g, 'ه')
    // Normalize Alef Maksura to Yaa
    .replace(/ى/g, 'ي')
    .trim()
    .toLowerCase();
}

/**
 * Normalizes Dhivehi (Thaana) text for searching.
 */
export function normalizeThaana(text: string): string {
  return text.trim().toLowerCase();
}

export const ALLAH_NAMES: AllahName[] = [
  {
    "id": 1,
    "arabic": "الرَّحْمَنُ",
    "transliteration": "އައް ރަޙްމާނު",
    "dhivehiMeaning": "ތަނަވަސް ރަޙްމަތުގެ ވެރި އިލާހު"
  },
  {
    "id": 2,
    "arabic": "الرَّحِيمُ",
    "transliteration": "އައް ރަޙީމު",
    "dhivehiMeaning": "ރަޙްމަތްވަންތަ އިލާހު"
  },
  {
    "id": 3,
    "arabic": "الْمَلِكُ",
    "transliteration": "އަލް މަލިކު",
    "dhivehiMeaning": "ރަސްވަންތަ އިލާހު"
  },
  {
    "id": 4,
    "arabic": "الْقُدُّوسُ",
    "transliteration": "އަލް ޤުއްދޫސު",
    "dhivehiMeaning": "ހުސްޠާހިރުވަންތަ އިލާހު"
  },
  {
    "id": 5,
    "arabic": "السَّلَامُ",
    "transliteration": "އައް ސަލާމު",
    "dhivehiMeaning": "ސަލާމަތްކަން ލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 6,
    "arabic": "الْمُؤْمِنُ",
    "transliteration": "އަލް މުއުމިނު",
    "dhivehiMeaning": "އަމާންކަން ދެއްވާ އިލާހު"
  },
  {
    "id": 7,
    "arabic": "الْمُهَيْمِنُ",
    "transliteration": "އަލް މުހައިމިނު",
    "dhivehiMeaning": "މޮޅަށް ބަލަހައްޓަވާ އިލާހު"
  },
  {
    "id": 8,
    "arabic": "الْعَزِيزُ",
    "transliteration": "އަލް ޢަޒީޒު",
    "dhivehiMeaning": "ގަދަކީރިތިވަންތަ އިލާހު"
  },
  {
    "id": 9,
    "arabic": "الْجَبَّارُ",
    "transliteration": "އަލް ޖައްބާރު",
    "dhivehiMeaning": "ބަލިކަށިކަމެއްނެތް މަތިވެރި އިލާހު"
  },
  {
    "id": 10,
    "arabic": "الْمُتَكَبِّرُ",
    "transliteration": "އަލް މުތަކައްބިރު",
    "dhivehiMeaning": "އެފަދައެއްނެތް ބޮޑު މަތިވެރި އިލާހު"
  },
  {
    "id": 11,
    "arabic": "الْخَالِقُ",
    "transliteration": "އަލް ޚާލިޤު",
    "dhivehiMeaning": "ނެތުމުގެ ތެރެއިން އެންމެހާ ތަކެތި އުފައްދަވާ އިލާހު"
  },
  {
    "id": 12,
    "arabic": "الْبَارِئُ",
    "transliteration": "އަލް ބާރިއު",
    "dhivehiMeaning": "ލާމަސީލު ގޮތެއްގައި އުފައްދަވާ އިލާހު"
  },
  {
    "id": 13,
    "arabic": "الْمُصَوِّرُ",
    "transliteration": "އަލް މުޞައްވިރު",
    "dhivehiMeaning": "ބުރުސޫރަ ކުރައްވާ އިލާހު"
  },
  {
    "id": 14,
    "arabic": "الْغَفَّارُ",
    "transliteration": "އަލް ޣައްފާރު",
    "dhivehiMeaning": "ގިނަގިނައިން ފާފަފުއްސަވާ އިލާހު"
  },
  {
    "id": 15,
    "arabic": "الْقَهَّارُ",
    "transliteration": "އަލް ޤައްހާރު",
    "dhivehiMeaning": "ބަލިކަށި ކުރައްވާ އިލާހު"
  },
  {
    "id": 16,
    "arabic": "الْوَهَّابُ",
    "transliteration": "އަލް ވައްހާބު",
    "dhivehiMeaning": "ދީލަތިކަމާއެކު ދެއްވާ އިލާހު"
  },
  {
    "id": 17,
    "arabic": "الرَّزَّاقُ",
    "transliteration": "އައް ރައްޒާޤު",
    "dhivehiMeaning": "ގިނަގިނައިން ރޯދިދެއްވާ އިލާހު"
  },
  {
    "id": 18,
    "arabic": "الْفَتَّاحُ",
    "transliteration": "އަލް ފައްތާޙު",
    "dhivehiMeaning": "ރޯއްޖާއި ރަޙްމަތުގެ ދޮރުތައް ހުޅުއްވައިދެއްވާ އިލާހު"
  },
  {
    "id": 19,
    "arabic": "الْعَلِيمُ",
    "transliteration": "އަލް ޢަލީމު",
    "dhivehiMeaning": "ސިއްރާއި ފާޅު ދެނެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 20,
    "arabic": "الْقَابِضُ",
    "transliteration": "އަލް ޤާބިޟު",
    "dhivehiMeaning": "ރިޒްޤާއި ފުރާނަ ހިއްޕަވާ އިލާހު"
  },
  {
    "id": 21,
    "arabic": "الْبَاسِطُ",
    "transliteration": "އަލް ބާސިޠު",
    "dhivehiMeaning": "ރަޙްމަތާއި ރިޒްޤު ފަތުރުއްވާ އިލާހު"
  },
  {
    "id": 22,
    "arabic": "الْخَافِضُ",
    "transliteration": "އަލް ޚާފިޟު",
    "dhivehiMeaning": "ދަށްކުރައްވާ އިލާހު"
  },
  {
    "id": 23,
    "arabic": "الرَّافِعُ",
    "transliteration": "އައް ރާފިޢު",
    "dhivehiMeaning": "އުފުއްލަވާ އިލާހު"
  },
  {
    "id": 24,
    "arabic": "الْمُعِزُّ",
    "transliteration": "އަލް މުޢިއްޒު",
    "dhivehiMeaning": "ޢިއްޒަތްތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 25,
    "arabic": "الْمُذِلُّ",
    "transliteration": "އަލް މުޛިއްލު",
    "dhivehiMeaning": "ނިކަމެތިކުރައްވާ އިލާހު"
  },
  {
    "id": 26,
    "arabic": "السَّمِيعُ",
    "transliteration": "އައް ސަމީޢު",
    "dhivehiMeaning": "އައްސަވާވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 27,
    "arabic": "الْبَصِيرُ",
    "transliteration": "އަލް ބަޞީރު",
    "dhivehiMeaning": "ބައްލަވާވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 28,
    "arabic": "الْحَكَمُ",
    "transliteration": "އަލް ޙަކަމު",
    "dhivehiMeaning": "ޙުކުމްކުރައްވާ އިލާހު"
  },
  {
    "id": 29,
    "arabic": "الْعَدْلُ",
    "transliteration": "އަލް ޢަދުލު",
    "dhivehiMeaning": "ހަމަހަމަ ކުރައްވާ އިލާހު"
  },
  {
    "id": 30,
    "arabic": "اللَّطِيفُ",
    "transliteration": "އައް ލަޠީފު",
    "dhivehiMeaning": "ޙަމްދަރުދީ ވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 31,
    "arabic": "الْخَبِيرُ",
    "transliteration": "އަލް ޚަބީރު",
    "dhivehiMeaning": "ޚަބަރުތައް ދެނެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 32,
    "arabic": "الْحَلِيمُ",
    "transliteration": "އަލް ޙަލީމު",
    "dhivehiMeaning": "ކޯފާމަޑު އިލާހު"
  },
  {
    "id": 33,
    "arabic": "الْعَظِيمُ",
    "transliteration": "އަލް ޢަޡީމު",
    "dhivehiMeaning": "މާތް މަތިވެރި އިލާހު"
  },
  {
    "id": 34,
    "arabic": "الْغَفُورُ",
    "transliteration": "އަލް ޣަފޫރު",
    "dhivehiMeaning": "ފާފަ ފުއްސަވާ އިލާހު"
  },
  {
    "id": 35,
    "arabic": "الشَّكُورُ",
    "transliteration": "އައް ޝަކޫރު",
    "dhivehiMeaning": "ޝުކުރު ދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 36,
    "arabic": "الْعَلِيُّ",
    "transliteration": "އަލް ޢަލިއްޔު",
    "dhivehiMeaning": "މަތިވެރިވަންތަ އިލާހު"
  },
  {
    "id": 37,
    "arabic": "الْكَبِيرُ",
    "transliteration": "އަލް ކަބީރު",
    "dhivehiMeaning": "ހުރިހާ އެއްޗަކާއި ކަމަކަށްވުރެ ބޮޑު އިލާހު"
  },
  {
    "id": 38,
    "arabic": "الْحَفِيظُ",
    "transliteration": "އަލް ޙަފީޡު",
    "dhivehiMeaning": "ރައްކާތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 39,
    "arabic": "الْمُقِيتُ",
    "transliteration": "އަލް މުޤީތު",
    "dhivehiMeaning": "ކާންބޯންދެއްވާ އިލާހު"
  },
  {
    "id": 40,
    "arabic": "الْحَسِيبُ",
    "transliteration": "އަލް ޙަސީބު",
    "dhivehiMeaning": "ޙިސާބުބައްލަވާ އިލާހު"
  },
  {
    "id": 41,
    "arabic": "الْجَلِيلُ",
    "transliteration": "އަލް ޖަލީލު",
    "dhivehiMeaning": "މާތްކަން ބޮޑު އިލާހު"
  },
  {
    "id": 42,
    "arabic": "الْكَرِيمُ",
    "transliteration": "އަލް ކަރީމު",
    "dhivehiMeaning": "ދީލަތިވަންތަ އިލާހު"
  },
  {
    "id": 43,
    "arabic": "الرَّقِيبُ",
    "transliteration": "އައް ރަޤީބު",
    "dhivehiMeaning": "ޣާފިލްވެވޮޑިގެންނުވާ އިލާހު"
  },
  {
    "id": 44,
    "arabic": "الْمُجِيبُ",
    "transliteration": "އަލް މުޖީބު",
    "dhivehiMeaning": "އިޖާބަދެއްވާ އިލާހު"
  },
  {
    "id": 45,
    "arabic": "الْوَاسِعُ",
    "transliteration": "އަލް ވާސިޢު",
    "dhivehiMeaning": "ތަނަވަސްވަންތަ އިލާހު"
  },
  {
    "id": 46,
    "arabic": "الْحَكِيمُ",
    "transliteration": "އަލް ޙަކީމު",
    "dhivehiMeaning": "ޙިކުމަތްވަންތަ އިލާހު"
  },
  {
    "id": 47,
    "arabic": "الْوَدُودُ",
    "transliteration": "އަލް ވަދޫދު",
    "dhivehiMeaning": "ނުހަނު ބޮޑަށް ލޯބިވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 48,
    "arabic": "الْمَجِيدُ",
    "transliteration": "އަލް މަޖީދު",
    "dhivehiMeaning": "އެންމެ ޝަރަފުމަތިވެރި އިލާހު"
  },
  {
    "id": 49,
    "arabic": "الْبَاعِثُ",
    "transliteration": "އަލް ބާޢިޘު",
    "dhivehiMeaning": "އަލުން ދިރުއްވާ އިލާހު"
  },
  {
    "id": 50,
    "arabic": "الشَّهِيدُ",
    "transliteration": "އައް ޝަހީދު",
    "dhivehiMeaning": "ހެކިވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 51,
    "arabic": "الْحَقُّ",
    "transliteration": "އަލް ޙައްޤު",
    "dhivehiMeaning": "ޙައްޤުވަންތަ އިލާހު"
  },
  {
    "id": 52,
    "arabic": "الْوَكِيلُ",
    "transliteration": "އަލް ވަކީލު",
    "dhivehiMeaning": "ޙަވާލުވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 53,
    "arabic": "الْقَوِيُّ",
    "transliteration": "އަލް ޤަވިއްޔު",
    "dhivehiMeaning": "ބާރުގަދަ އިލާހު"
  },
  {
    "id": 54,
    "arabic": "الْمَتِينُ",
    "transliteration": "އަލް މަތީނު",
    "dhivehiMeaning": "ގަދަފަދަވަންތަ އިލާހު"
  },
  {
    "id": 55,
    "arabic": "الْوَلِيُّ",
    "transliteration": "އަލް ވަލިއްޔު",
    "dhivehiMeaning": "ބަލަހައްޓަވާ އިލާހު"
  },
  {
    "id": 56,
    "arabic": "الْحَمِيدُ",
    "transliteration": "އަލް ޙަމީދު",
    "dhivehiMeaning": "ޙަމްދުލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 57,
    "arabic": "الْمُحْصِي",
    "transliteration": "އަލް މުޙްޞީ",
    "dhivehiMeaning": "ޢަދަދުކުރައްވާ އިލާހު"
  },
  {
    "id": 58,
    "arabic": "الْمُبْدِئُ",
    "transliteration": "އަލް މުބްދިއު",
    "dhivehiMeaning": "ފެށުމެއްނެތި އަބަދުމެ ވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 59,
    "arabic": "الْمُعِيدُ",
    "transliteration": "އަލް މުޢީދު",
    "dhivehiMeaning": "އެނބުރިގެންދަވާ އިލާހު"
  },
  {
    "id": 60,
    "arabic": "الْمُحْيِي",
    "transliteration": "އަލް މުޙްޔީ",
    "dhivehiMeaning": "ދިރުއްވާ އިލާހު"
  },
  {
    "id": 61,
    "arabic": "الْمُمِيتُ",
    "transliteration": "އަލް މުމީތު",
    "dhivehiMeaning": "މަރުގަންނަވާ އިލާހު"
  },
  {
    "id": 62,
    "arabic": "الْحَيُّ",
    "transliteration": "އަލް ޙައްޔު",
    "dhivehiMeaning": "ދިރިދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 63,
    "arabic": "الْقَيُّومُ",
    "transliteration": "އަލް ޤައްޔޫމު",
    "dhivehiMeaning": "އަވަހާރަފުޅު އައުމެއް، އަވަހާރަފުޅު ލެއްޕެވުމެއް ނެތި، ދާއިމަށް ދިރިދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 64,
    "arabic": "الْوَاجِدُ",
    "transliteration": "އަލް ވާޖިދު",
    "dhivehiMeaning": "އެދިވޮޑިގެންވާ ކޮންމެ އެއްޗަކާއި ކަމެއް ލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 65,
    "arabic": "الْمَاجِدُ",
    "transliteration": "އަލް މާޖިދު",
    "dhivehiMeaning": "ދީލަތިވަންތަކަން ފުޅާވެގެންވާ އިލާހު"
  },
  {
    "id": 66,
    "arabic": "الْوَاحِدُ",
    "transliteration": "އަލް ވާޙިދު",
    "dhivehiMeaning": "އެއްވެސް ފަރާތަކާއި އެއްފަދަވެގެން ނުވާ އިލާހު"
  },
  {
    "id": 67,
    "arabic": "الْأَحَدُ",
    "transliteration": "އަލް އަޙަދު",
    "dhivehiMeaning": "އެއްކައުވަންތަ އިލާހު"
  },
  {
    "id": 68,
    "arabic": "الصَّمَدُ",
    "transliteration": "އައް ޞަމަދު",
    "dhivehiMeaning": "އެއްވެސް އެއްޗަކަށް ބޭނުންވެވޮޑިގެންނުވާ އިލާހު"
  },
  {
    "id": 69,
    "arabic": "الْقَادِرُ",
    "transliteration": "އަލް ޤާދިރު",
    "dhivehiMeaning": "ކުޅަދުންވަންތަ އިލާހު"
  },
  {
    "id": 70,
    "arabic": "الْمُقْتَدِرُ",
    "transliteration": "އަލް މުޤްތަދިރު",
    "dhivehiMeaning": "ކުޅަދުންވަންތަކަން ފާޅުކުރައްވާ އިލާހު"
  },
  {
    "id": 71,
    "arabic": "الْمُقَدِّمُ",
    "transliteration": "އަލް މުޤައްދިމު",
    "dhivehiMeaning": "އިސްކުރައްވާ އިލާހު"
  },
  {
    "id": 72,
    "arabic": "الْمُؤَخِّرُ",
    "transliteration": "އަލް މުއައްޚިރު",
    "dhivehiMeaning": "ފަސްކުރައްވާ އިލާހު"
  },
  {
    "id": 73,
    "arabic": "الْأَوَّلُ",
    "transliteration": "އަލް އައްވަލު",
    "dhivehiMeaning": "އެންމެ ފުރަތަމަ (ފެށުމެއްނެތް) އިލާހު"
  },
  {
    "id": 74,
    "arabic": "الْآخِرُ",
    "transliteration": "އަލް އާޚިރު",
    "dhivehiMeaning": "އެންމެ ފަހު (ނިމުމެއްނެތް) އިލާހު"
  },
  {
    "id": 75,
    "arabic": "الظَّاهِرُ",
    "transliteration": "އައް ޡާހިރު",
    "dhivehiMeaning": "ފާޅުވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 76,
    "arabic": "الْبَاطِنُ",
    "transliteration": "އަލް ބާޠިނު",
    "dhivehiMeaning": "ވަންހަނާވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 77,
    "arabic": "الْوَالِي",
    "transliteration": "އަލް ވާލީ",
    "dhivehiMeaning": "އެންމެހާ ތަކެތީގެ ވެރިކަން ހިންގަވާ އިލާހު"
  },
  {
    "id": 78,
    "arabic": "الْمُتَعَالِي",
    "transliteration": "އަލް މުތަޢާލީ",
    "dhivehiMeaning": "މަތިވެރިކަން ބޮޑުވެގެންވާ އިލާހު"
  },
  {
    "id": 79,
    "arabic": "الْبَرُّ",
    "transliteration": "އަލް ބައްރު",
    "dhivehiMeaning": "ހެޔޮފުޅުވަންތަ އިލާހު"
  },
  {
    "id": 80,
    "arabic": "التَّوَّابُ",
    "transliteration": "އައް ތައްވާބު",
    "dhivehiMeaning": "ގިނަގިނައިން ތައުބާ ޤަބޫލުކުރައްވާ އިލާހު"
  },
  {
    "id": 81,
    "arabic": "الْمُنْتَقِمُ",
    "transliteration": "އަލް މުންތަޤިމު",
    "dhivehiMeaning": "ބަދަލުހިއްޕަވާ އިލާހު"
  },
  {
    "id": 82,
    "arabic": "الْعَفُوُّ",
    "transliteration": "އަލް ޢަފުއްވު",
    "dhivehiMeaning": "ޢަފޫކުރައްވާ އިލާހު"
  },
  {
    "id": 83,
    "arabic": "الرَّءُوفُ",
    "transliteration": "އައް ރައޫފު",
    "dhivehiMeaning": "އޯގާވަންތަ އިލާހު"
  },
  {
    "id": 84,
    "arabic": "مَالِكُ الْمُلْكِ",
    "transliteration": "މާލިކުލް މުލްކި",
    "dhivehiMeaning": "ރަސްކަމުގެ ވެރި އިލާހު"
  },
  {
    "id": 85,
    "arabic": "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    "transliteration": "ޛުލްޖަލާލި ވަލްއިކްރާމި",
    "dhivehiMeaning": "މަތިވެރިވަންތަކަމާއި ދީލަތިވަންތަކަމުގެ ވެރި އިލާހު"
  },
  {
    "id": 86,
    "arabic": "الْمُقْسِطُ",
    "transliteration": "އަލް މުޤްސިޠު",
    "dhivehiMeaning": "އިންޞާފުވެރި އިލާހު"
  },
  {
    "id": 87,
    "arabic": "الْجَامِعُ",
    "transliteration": "އަލް ޖާމިޢު",
    "dhivehiMeaning": "ޚަލްޤުތަކުން އެއްކުރައްވާ އިލާހު"
  },
  {
    "id": 88,
    "arabic": "الْغَنِيُّ",
    "transliteration": "އަލް ޣަނިއްޔު",
    "dhivehiMeaning": "ފުދިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 89,
    "arabic": "الْمُغْنِي",
    "transliteration": "އަލް މުޣްނީ",
    "dhivehiMeaning": "ފުދުންތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 90,
    "arabic": "الْمَانِعُ",
    "transliteration": "އަލް މާނިޢު",
    "dhivehiMeaning": "ޙިމާޔަތްދެއްވާ އިލާހު"
  },
  {
    "id": 91,
    "arabic": "الضَّارُّ",
    "transliteration": "އައް ޟާއްރު",
    "dhivehiMeaning": "ގެއްލުން މިންވަރުކުރައްވާ އިލާހު"
  },
  {
    "id": 92,
    "arabic": "النَّافِعُ",
    "transliteration": "އައް ނާފިޢު",
    "dhivehiMeaning": "ފައިދާ މިންވަރުކުރައްވާ އިލާހު"
  },
  {
    "id": 93,
    "arabic": "النُّورُ",
    "transliteration": "އައް ނޫރު",
    "dhivehiMeaning": "އަލިކަންދެއްވާ އިލާހު"
  },
  {
    "id": 94,
    "arabic": "الْهَادِي",
    "transliteration": "އަލް ހާދީ",
    "dhivehiMeaning": "ތެދުމަގުދައްކަވާ އިލާހު"
  },
  {
    "id": 95,
    "arabic": "الْبَدِيعُ",
    "transliteration": "އަލް ބަދީޢު",
    "dhivehiMeaning": "އަލަށް އީޖާދުކުރައްވާ އިލާހު"
  },
  {
    "id": 96,
    "arabic": "الْبَاقِي",
    "transliteration": "އަލް ބާޤީ",
    "dhivehiMeaning": "އަބަދަށް ދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 97,
    "arabic": "الْوَارِثُ",
    "transliteration": "އަލް ވާރިޘު",
    "dhivehiMeaning": "ވާރުތަވެރިވަންތަ އިލާހު"
  },
  {
    "id": 98,
    "arabic": "الرَّشِيدُ",
    "transliteration": "އައް ރަޝީދު",
    "dhivehiMeaning": "ހެޔޮމަގުދައްކަވާ އިލާހު"
  },
  {
    "id": 99,
    "arabic": "الصَّبُورُ",
    "transliteration": "އައް ޞަބޫރު",
    "dhivehiMeaning": "ކެތްތެރިވަންތަ އިލާހު"
  }
];
