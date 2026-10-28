// 99 Names of Allah (Asma-ul-Husna) dataset with verified Dhivehi explanations

export interface AllahName {
  id: number;
  arabic: string;
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
    "dhivehiMeaning": "ތަނަވަސް ރަޙްމަތުގެ ވެރި އިލާހު"
  },
  {
    "id": 2,
    "arabic": "الرَّحِيمُ",
    "dhivehiMeaning": "ރަޙްމަތްވަންތަ އިލާހު"
  },
  {
    "id": 3,
    "arabic": "الْمَلِكُ",
    "dhivehiMeaning": "ރަސްވަންތަ އިލާހު"
  },
  {
    "id": 4,
    "arabic": "الْقُدُّوسُ",
    "dhivehiMeaning": "ހުސްޠާހިރުވަންތަ އިލާހު"
  },
  {
    "id": 5,
    "arabic": "السَّلَامُ",
    "dhivehiMeaning": "ސަލާމަތްކަން ލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 6,
    "arabic": "الْمُؤْمِنُ",
    "dhivehiMeaning": "އަމާންކަން ދެއްވާ އިލާހު"
  },
  {
    "id": 7,
    "arabic": "الْمُهَيْمِنُ",
    "dhivehiMeaning": "މޮޅަށް ބަލަހައްޓަވާ އިލާހު"
  },
  {
    "id": 8,
    "arabic": "الْعَزِيزُ",
    "dhivehiMeaning": "ގަދަކީރިތިވަންތަ އިލާހު"
  },
  {
    "id": 9,
    "arabic": "الْجَبَّارُ",
    "dhivehiMeaning": "ބަލިކަށިކަމެއްނެތް މަތިވެރި އިލާހު"
  },
  {
    "id": 10,
    "arabic": "الْمُتَكَبِّرُ",
    "dhivehiMeaning": "އެފަދައެއްނެތް ބޮޑު މަތިވެރި އިލާހު"
  },
  {
    "id": 11,
    "arabic": "الْخَالِقُ",
    "dhivehiMeaning": "ނެތުމުގެ ތެރެއިން އެންމެހާ ތަކެތި އުފައްދަވާ އިލާހު"
  },
  {
    "id": 12,
    "arabic": "الْبَارِئُ",
    "dhivehiMeaning": "ލާމަސީލު ގޮތެއްގައި އުފައްދަވާ އިލާހު"
  },
  {
    "id": 13,
    "arabic": "الْمُصَوِّرُ",
    "dhivehiMeaning": "ބުރުސޫރަ ކުރައްވާ އިލާހު"
  },
  {
    "id": 14,
    "arabic": "الْغَفَّارُ",
    "dhivehiMeaning": "ގިނަގިނައިން ފާފަފުއްސަވާ އިލާހު"
  },
  {
    "id": 15,
    "arabic": "الْقَهَّارُ",
    "dhivehiMeaning": "ބަލިކަށި ކުރައްވާ އިލާހު"
  },
  {
    "id": 16,
    "arabic": "الْوَهَّابُ",
    "dhivehiMeaning": "ދީލަތިކަމާއެކު ދެއްވާ އިލާހު"
  },
  {
    "id": 17,
    "arabic": "الرَّزَّاقُ",
    "dhivehiMeaning": "ގިނަގިނައިން ރޯދިދެއްވާ އިލާހު"
  },
  {
    "id": 18,
    "arabic": "الْفَتَّاحُ",
    "dhivehiMeaning": "ރޯއްޖާއި ރަޙްމަތުގެ ދޮރުތައް ހުޅުއްވައިދެއްވާ އިލާހު"
  },
  {
    "id": 19,
    "arabic": "الْعَلِيمُ",
    "dhivehiMeaning": "ސިއްރާއި ފާޅު ދެނެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 20,
    "arabic": "الْقَابِضُ",
    "dhivehiMeaning": "ރިޒްޤާއި ފުރާނަ ހިއްޕަވާ އިލާހު"
  },
  {
    "id": 21,
    "arabic": "الْبَاسِطُ",
    "dhivehiMeaning": "ރަޙްމަތާއި ރިޒްޤު ފަތުރުއްވާ އިލާހު"
  },
  {
    "id": 22,
    "arabic": "الْخَافِضُ",
    "dhivehiMeaning": "ދަށްކުރައްވާ އިލާހު"
  },
  {
    "id": 23,
    "arabic": "الرَّافِعُ",
    "dhivehiMeaning": "އުފުއްލަވާ އިލާހު"
  },
  {
    "id": 24,
    "arabic": "الْمُعِزُّ",
    "dhivehiMeaning": "ޢިއްޒަތްތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 25,
    "arabic": "الْمُذِلُّ",
    "dhivehiMeaning": "ނިކަމެތިކުރައްވާ އިލާހު"
  },
  {
    "id": 26,
    "arabic": "السَّمِيعُ",
    "dhivehiMeaning": "އައްސަވާވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 27,
    "arabic": "الْبَصِيرُ",
    "dhivehiMeaning": "ބައްލަވާވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 28,
    "arabic": "الْحَكَمُ",
    "dhivehiMeaning": "ޙުކުމްކުރައްވާ އިލާހު"
  },
  {
    "id": 29,
    "arabic": "الْعَدْلُ",
    "dhivehiMeaning": "ހަމަހަމަ ކުރައްވާ އިލާހު"
  },
  {
    "id": 30,
    "arabic": "اللَّطِيفُ",
    "dhivehiMeaning": "ޙަމްދަރުދީ ވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 31,
    "arabic": "الْخَبِيرُ",
    "dhivehiMeaning": "ޚަބަރުތައް ދެނެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 32,
    "arabic": "الْحَلِيمُ",
    "dhivehiMeaning": "ކޯފާމަޑު އިލާހު"
  },
  {
    "id": 33,
    "arabic": "الْعَظِيمُ",
    "dhivehiMeaning": "މާތް މަތިވެރި އިލާހު"
  },
  {
    "id": 34,
    "arabic": "الْغَفُورُ",
    "dhivehiMeaning": "ފާފަ ފުއްސަވާ އިލާހު"
  },
  {
    "id": 35,
    "arabic": "الشَّكُورُ",
    "dhivehiMeaning": "ޝުކުރު ދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 36,
    "arabic": "الْعَلِيُّ",
    "dhivehiMeaning": "މަތިވެރިވަންތަ އިލާހު"
  },
  {
    "id": 37,
    "arabic": "الْكَبِيرُ",
    "dhivehiMeaning": "ހުރިހާ އެއްޗަކާއި ކަމަކަށްވުރެ ބޮޑު އިލާހު"
  },
  {
    "id": 38,
    "arabic": "الْحَفِيظُ",
    "dhivehiMeaning": "ރައްކާތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 39,
    "arabic": "الْمُقِيتُ",
    "dhivehiMeaning": "ކާންބޯންދެއްވާ އިލާހު"
  },
  {
    "id": 40,
    "arabic": "الْحَسِيبُ",
    "dhivehiMeaning": "ޙިސާބުބައްލަވާ އިލާހު"
  },
  {
    "id": 41,
    "arabic": "الْجَلِيلُ",
    "dhivehiMeaning": "މާތްކަން ބޮޑު އިލާހު"
  },
  {
    "id": 42,
    "arabic": "الْكَرِيمُ",
    "dhivehiMeaning": "ދީލަތިވަންތަ އިލާހު"
  },
  {
    "id": 43,
    "arabic": "الرَّقِيبُ",
    "dhivehiMeaning": "ޣާފިލްވެވޮޑިގެންނުވާ އިލާހު"
  },
  {
    "id": 44,
    "arabic": "الْمُجِيبُ",
    "dhivehiMeaning": "އިޖާބަދެއްވާ އިލާހު"
  },
  {
    "id": 45,
    "arabic": "الْوَاسِعُ",
    "dhivehiMeaning": "ތަނަވަސްވަންތަ އިލާހު"
  },
  {
    "id": 46,
    "arabic": "الْحَكِيمُ",
    "dhivehiMeaning": "ޙިކުމަތްވަންތަ އިލާހު"
  },
  {
    "id": 47,
    "arabic": "الْوَدُودُ",
    "dhivehiMeaning": "ނުހަނު ބޮޑަށް ލޯބިވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 48,
    "arabic": "الْمَجِيدُ",
    "dhivehiMeaning": "އެންމެ ޝަރަފުމަތިވެރި އިލާހު"
  },
  {
    "id": 49,
    "arabic": "الْبَاعِثُ",
    "dhivehiMeaning": "އަލުން ދިރުއްވާ އިލާހު"
  },
  {
    "id": 50,
    "arabic": "الشَّهِيدُ",
    "dhivehiMeaning": "ހެކިވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 51,
    "arabic": "الْحَقُّ",
    "dhivehiMeaning": "ޙައްޤުވަންތަ އިލާހު"
  },
  {
    "id": 52,
    "arabic": "الْوَكِيلُ",
    "dhivehiMeaning": "ޙަވާލުވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 53,
    "arabic": "الْقَوِيُّ",
    "dhivehiMeaning": "ބާރުގަދަ އިލާހު"
  },
  {
    "id": 54,
    "arabic": "الْمَتِينُ",
    "dhivehiMeaning": "ގަދަފަދަވަންތަ އިލާހު"
  },
  {
    "id": 55,
    "arabic": "الْوَلِيُّ",
    "dhivehiMeaning": "ބަލަހައްޓަވާ އިލާހު"
  },
  {
    "id": 56,
    "arabic": "الْحَمِيدُ",
    "dhivehiMeaning": "ޙަމްދުލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 57,
    "arabic": "الْمُحْصِي",
    "dhivehiMeaning": "ޢަދަދުކުރައްވާ އިލާހު"
  },
  {
    "id": 58,
    "arabic": "الْمُبْدِئُ",
    "dhivehiMeaning": "ފެށުމެއްނެތި އަބަދުމެ ވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 59,
    "arabic": "الْمُعِيدُ",
    "dhivehiMeaning": "އެނބުރިގެންދަވާ އިލާހު"
  },
  {
    "id": 60,
    "arabic": "الْمُحْيِي",
    "dhivehiMeaning": "ދިރުއްވާ އިލާހު"
  },
  {
    "id": 61,
    "arabic": "الْمُمِيتُ",
    "dhivehiMeaning": "މަރުގަންނަވާ އިލާހު"
  },
  {
    "id": 62,
    "arabic": "الْحَيُّ",
    "dhivehiMeaning": "ދިރިދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 63,
    "arabic": "الْقَيُّومُ",
    "dhivehiMeaning": "އަވަހާރަފުޅު އައުމެއް، އަވަހާރަފުޅު ލެއްޕެވުމެއް ނެތި، ދާއިމަށް ދިރިދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 64,
    "arabic": "الْوَاجِدُ",
    "dhivehiMeaning": "އެދިވޮޑިގެންވާ ކޮންމެ އެއްޗަކާއި ކަމެއް ލިބިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 65,
    "arabic": "الْمَاجِدُ",
    "dhivehiMeaning": "ދީލަތިވަންތަކަން ފުޅާވެގެންވާ އިލާހު"
  },
  {
    "id": 66,
    "arabic": "الْوَاحِدُ",
    "dhivehiMeaning": "އެއްވެސް ފަރާތަކާއި އެއްފަދަވެގެން ނުވާ އިލާހު"
  },
  {
    "id": 67,
    "arabic": "الْأَحَدُ",
    "dhivehiMeaning": "އެއްކައުވަންތަ އިލާހު"
  },
  {
    "id": 68,
    "arabic": "الصَّمَدُ",
    "dhivehiMeaning": "އެއްވެސް އެއްޗަކަށް ބޭނުންވެވޮޑިގެންނުވާ އިލާހު"
  },
  {
    "id": 69,
    "arabic": "الْقَادِرُ",
    "dhivehiMeaning": "ކުޅަދުންވަންތަ އިލާހު"
  },
  {
    "id": 70,
    "arabic": "الْمُقْتَدِرُ",
    "dhivehiMeaning": "ކުޅަދުންވަންތަކަން ފާޅުކުރައްވާ އިލާހު"
  },
  {
    "id": 71,
    "arabic": "الْمُقَدِّمُ",
    "dhivehiMeaning": "އިސްކުރައްވާ އިލާހު"
  },
  {
    "id": 72,
    "arabic": "الْمُؤَخِّرُ",
    "dhivehiMeaning": "ފަސްކުރައްވާ އިލާހު"
  },
  {
    "id": 73,
    "arabic": "الْأَوَّلُ",
    "dhivehiMeaning": "އެންމެ ފުރަތަމަ (ފެށުމެއްނެތް) އިލާހު"
  },
  {
    "id": 74,
    "arabic": "الْآخِرُ",
    "dhivehiMeaning": "އެންމެ ފަހު (ނިމުމެއްނެތް) އިލާހު"
  },
  {
    "id": 75,
    "arabic": "الظَّاهِرُ",
    "dhivehiMeaning": "ފާޅުވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 76,
    "arabic": "الْبَاطِنُ",
    "dhivehiMeaning": "ވަންހަނާވެވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 77,
    "arabic": "الْوَالِي",
    "dhivehiMeaning": "އެންމެހާ ތަކެތީގެ ވެރިކަން ހިންގަވާ އިލާހު"
  },
  {
    "id": 78,
    "arabic": "الْمُتَعَالِي",
    "dhivehiMeaning": "މަތިވެރިކަން ބޮޑުވެގެންވާ އިލާހު"
  },
  {
    "id": 79,
    "arabic": "الْبَرُّ",
    "dhivehiMeaning": "ހެޔޮފުޅުވަންތަ އިލާހު"
  },
  {
    "id": 80,
    "arabic": "التَّوَّابُ",
    "dhivehiMeaning": "ގިނަގިނައިން ތައުބާ ޤަބޫލުކުރައްވާ އިލާހު"
  },
  {
    "id": 81,
    "arabic": "الْمُنْتَقِمُ",
    "dhivehiMeaning": "ބަދަލުހިއްޕަވާ އިލާހު"
  },
  {
    "id": 82,
    "arabic": "الْعَفُوُّ",
    "dhivehiMeaning": "ޢަފޫކުރައްވާ އިލާހު"
  },
  {
    "id": 83,
    "arabic": "الرَّءُوفُ",
    "dhivehiMeaning": "އޯގާވަންތަ އިލާހު"
  },
  {
    "id": 84,
    "arabic": "مَالِكُ الْمُلْكِ",
    "dhivehiMeaning": "ރަސްކަމުގެ ވެރި އިލާހު"
  },
  {
    "id": 85,
    "arabic": "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    "dhivehiMeaning": "މަތިވެރިވަންތަކަމާއި ދީލަތިވަންތަކަމުގެ ވެރި އިލާހު"
  },
  {
    "id": 86,
    "arabic": "الْمُقْسِطُ",
    "dhivehiMeaning": "އިންޞާފުވެރި އިލާހު"
  },
  {
    "id": 87,
    "arabic": "الْجَامِعُ",
    "dhivehiMeaning": "ޚަލްޤުތަކުން އެއްކުރައްވާ އިލާހު"
  },
  {
    "id": 88,
    "arabic": "الْغَنِيُّ",
    "dhivehiMeaning": "ފުދިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 89,
    "arabic": "الْمُغْنِي",
    "dhivehiMeaning": "ފުދުންތެރި ކުރައްވާ އިލާހު"
  },
  {
    "id": 90,
    "arabic": "الْمَانِعُ",
    "dhivehiMeaning": "ޙިމާޔަތްދެއްވާ އިލާހު"
  },
  {
    "id": 91,
    "arabic": "الضَّارُّ",
    "dhivehiMeaning": "ގެއްލުން މިންވަރުކުރައްވާ އިލާހު"
  },
  {
    "id": 92,
    "arabic": "النَّافِعُ",
    "dhivehiMeaning": "ފައިދާ މިންވަރުކުރައްވާ އިލާހު"
  },
  {
    "id": 93,
    "arabic": "النُّورُ",
    "dhivehiMeaning": "އަލިކަންދެއްވާ އިލާހު"
  },
  {
    "id": 94,
    "arabic": "الْهَادِي",
    "dhivehiMeaning": "ތެދުމަގުދައްކަވާ އިލާހު"
  },
  {
    "id": 95,
    "arabic": "الْبَدِيعُ",
    "dhivehiMeaning": "އަލަށް އީޖާދުކުރައްވާ އިލާހު"
  },
  {
    "id": 96,
    "arabic": "الْبَاقِي",
    "dhivehiMeaning": "އަބަދަށް ދެމިވޮޑިގެންވާ އިލާހު"
  },
  {
    "id": 97,
    "arabic": "الْوَارِثُ",
    "dhivehiMeaning": "ވާރުތަވެރިވަންތަ އިލާހު"
  },
  {
    "id": 98,
    "arabic": "الرَّشِيدُ",
    "dhivehiMeaning": "ހެޔޮމަގުދައްކަވާ އިލާހު"
  },
  {
    "id": 99,
    "arabic": "الصَّبُورُ",
    "dhivehiMeaning": "ކެތްތެރިވަންތަ އިލާހު"
  }
];
