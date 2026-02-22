import { useMapStore } from "@/store/useMapStore";

export type Locale = "en" | "th";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Header
    "header.title": "Sea Glass Interactive Map",
    "header.badge": "BETA",
    "header.thailandOnly": "Thailand only",
    "header.openPanel": "Open panel",
    "header.closePanel": "Close panel",

    // Filters
    "filters.title": "Filters",
    "filters.highVeryHigh": "High / Very high",
    "filters.moderate": "Moderate",
    "filters.low": "Low",
    "filters.protectedAreas": "Protected areas",
    "filters.rivers": "Rivers",
    "filters.minScore": "Minimum score",

    // Legend
    "legend.title": "Legend",
    "legend.veryHigh": "Very high",
    "legend.high": "High",
    "legend.moderate": "Moderate",
    "legend.low": "Low",
    "legend.veryLow": "Very low",
    "legend.protectedArea": "Protected area",
    "legend.collectionForbidden": "Collection forbidden",
    "legend.riverMouth": "River mouth",
    "legend.glassSource": "Glass source",

    // Stats
    "stats.zonesDisplayed": "Zones displayed",
    "stats.highProbability": "High probability",
    "stats.protectedAreas": "Protected areas",
    "stats.coastlineKm": "Km of coastline",

    // Methodology
    "methodology.title": "Methodology",
    "methodology.dataSources": "Data sources",
    "methodology.dataSourcesDesc":
      "Estimates based on oceanographic (OSCAR), geomorphological (Sentinel-2), hydrological (HydroSHEDS), historical (OSM), and legal (WDPA, DNP Thailand) data.",
    "methodology.historical.name": "Historical (M_hist)",
    "methodology.historical.desc":
      "Proximity to historical landfills and industries, former port sites.",
    "methodology.morphology.name": "Morphology (M_morpho)",
    "methodology.morphology.desc":
      "Favorable coastline type for accumulation: rocky beaches, sheltered coves, headlands.",
    "methodology.river.name": "Fluvial (M_river)",
    "methodology.river.desc":
      "Proximity to a river mouth and upstream population (glass input).",
    "methodology.ocean.name": "Oceanic (M_ocean)",
    "methodology.ocean.desc":
      "Exposure to dominant currents and waves favoring coastal deposition.",
    "methodology.population.name": "Population (M_pop)",
    "methodology.population.desc":
      "Historical coastal population density (source of discarded glass).",

    // Top spots
    "topSpots.title": "Top spots",

    // Zone popup
    "popup.loadingPhotos": "Loading photos...",
    "popup.noPhotos": "No photos available",
    "popup.nearbyProtected": "Nearby protected area",
    "popup.collectionProhibited": "collection strictly prohibited",
    "popup.collectionRestricted": "collection restricted",

    // Subscores
    "subscore.historical": "Historical",
    "subscore.morphology": "Morphology",
    "subscore.river": "Fluvial",
    "subscore.ocean": "Oceanic",
    "subscore.population": "Population",

    // Score labels
    "score.veryHigh": "Very high",
    "score.high": "High",
    "score.moderate": "Moderate",
    "score.low": "Low",
    "score.veryLow": "Very low",

    // Categories
    "category.river_delta": "River delta",
    "category.industrial": "Industrial zone",
    "category.urban_coast": "Urban coast",
    "category.island": "Island",
    "category.river_mouth": "River mouth",
    "category.natural": "Natural area",

    // Protected popup
    "protected.prohibited": "Collection prohibited",
    "protected.restricted": "Collection restricted",
    "protected.prohibitedDesc":
      "Collection of any material — natural or otherwise — is strictly prohibited in this national park. Violators face fines up to 100,000 THB and/or imprisonment.",
    "protected.restrictedDesc":
      "Collection requires prior authorization from the park. Check local conditions with park administration before any activity.",
    "protected.protectionRadius": "Protection radius:",
    "protected.legalBasis": "Legal basis:",

    // River popup
    "river.upstreamPopulation": "Upstream population:",
    "river.majorCity": "Major city:",

    // Auth
    "auth.signIn": "Sign in",
    "auth.signOut": "Sign out",

    // Loading
    loading: "Loading data...",
  },
  th: {
    // Header
    "header.title": "แผนที่แบบโต้ตอบซีกลาส",
    "header.badge": "เบต้า",
    "header.thailandOnly": "เฉพาะประเทศไทย",
    "header.openPanel": "เปิดแผง",
    "header.closePanel": "ปิดแผง",

    // Filters
    "filters.title": "ตัวกรอง",
    "filters.highVeryHigh": "สูง / สูงมาก",
    "filters.moderate": "ปานกลาง",
    "filters.low": "ต่ำ",
    "filters.protectedAreas": "พื้นที่คุ้มครอง",
    "filters.rivers": "แม่น้ำ",
    "filters.minScore": "คะแนนขั้นต่ำ",

    // Legend
    "legend.title": "คำอธิบาย",
    "legend.veryHigh": "สูงมาก",
    "legend.high": "สูง",
    "legend.moderate": "ปานกลาง",
    "legend.low": "ต่ำ",
    "legend.veryLow": "ต่ำมาก",
    "legend.protectedArea": "พื้นที่คุ้มครอง",
    "legend.collectionForbidden": "ห้ามเก็บ",
    "legend.riverMouth": "ปากแม่น้ำ",
    "legend.glassSource": "แหล่งแก้ว",

    // Stats
    "stats.zonesDisplayed": "โซนที่แสดง",
    "stats.highProbability": "ความน่าจะเป็นสูง",
    "stats.protectedAreas": "พื้นที่คุ้มครอง",
    "stats.coastlineKm": "กม. ชายฝั่ง",

    // Methodology
    "methodology.title": "วิธีการ",
    "methodology.dataSources": "แหล่งข้อมูล",
    "methodology.dataSourcesDesc":
      "การประมาณการจากข้อมูลสมุทรศาสตร์ (OSCAR) ธรณีสัณฐาน (Sentinel-2) อุทกวิทยา (HydroSHEDS) ประวัติศาสตร์ (OSM) และกฎหมาย (WDPA, DNP Thailand)",
    "methodology.historical.name": "ประวัติศาสตร์ (M_hist)",
    "methodology.historical.desc":
      "ความใกล้เคียงกับหลุมฝังกลบและอุตสาหกรรมในอดีต ท่าเรือเดิม",
    "methodology.morphology.name": "สัณฐานวิทยา (M_morpho)",
    "methodology.morphology.desc":
      "ประเภทชายฝั่งที่เอื้อต่อการสะสม: หาดหิน อ่าวที่กำบัง แหลม",
    "methodology.river.name": "แม่น้ำ (M_river)",
    "methodology.river.desc":
      "ความใกล้เคียงกับปากแม่น้ำและประชากรต้นน้ำ (แหล่งแก้ว)",
    "methodology.ocean.name": "มหาสมุทร (M_ocean)",
    "methodology.ocean.desc":
      "การเปิดรับกระแสน้ำและคลื่นที่ส่งเสริมการทับถมชายฝั่ง",
    "methodology.population.name": "ประชากร (M_pop)",
    "methodology.population.desc":
      "ความหนาแน่นประชากรชายฝั่งในอดีต (แหล่งแก้วที่ถูกทิ้ง)",

    // Top spots
    "topSpots.title": "จุดยอดนิยม",

    // Zone popup
    "popup.loadingPhotos": "กำลังโหลดรูปภาพ...",
    "popup.noPhotos": "ไม่มีรูปภาพ",
    "popup.nearbyProtected": "พื้นที่คุ้มครองใกล้เคียง",
    "popup.collectionProhibited": "ห้ามเก็บอย่างเด็ดขาด",
    "popup.collectionRestricted": "การเก็บถูกจำกัด",

    // Subscores
    "subscore.historical": "ประวัติศาสตร์",
    "subscore.morphology": "สัณฐานวิทยา",
    "subscore.river": "แม่น้ำ",
    "subscore.ocean": "มหาสมุทร",
    "subscore.population": "ประชากร",

    // Score labels
    "score.veryHigh": "สูงมาก",
    "score.high": "สูง",
    "score.moderate": "ปานกลาง",
    "score.low": "ต่ำ",
    "score.veryLow": "ต่ำมาก",

    // Categories
    "category.river_delta": "สามเหลี่ยมปากแม่น้ำ",
    "category.industrial": "เขตอุตสาหกรรม",
    "category.urban_coast": "ชายฝั่งเมือง",
    "category.island": "เกาะ",
    "category.river_mouth": "ปากแม่น้ำ",
    "category.natural": "พื้นที่ธรรมชาติ",

    // Protected popup
    "protected.prohibited": "ห้ามเก็บ",
    "protected.restricted": "การเก็บถูกจำกัด",
    "protected.prohibitedDesc":
      "การเก็บวัสดุใดๆ ไม่ว่าจะเป็นธรรมชาติหรือไม่ เป็นสิ่งต้องห้ามอย่างเด็ดขาดในอุทยานแห่งชาตินี้ ผู้ฝ่าฝืนมีโทษปรับสูงสุด 100,000 บาท และ/หรือจำคุก",
    "protected.restrictedDesc":
      "การเก็บต้องได้รับอนุญาตล่วงหน้าจากอุทยาน ตรวจสอบเงื่อนไขท้องถิ่นกับฝ่ายบริหารอุทยานก่อนทำกิจกรรมใดๆ",
    "protected.protectionRadius": "รัศมีคุ้มครอง:",
    "protected.legalBasis": "ฐานทางกฎหมาย:",

    // River popup
    "river.upstreamPopulation": "ประชากรต้นน้ำ:",
    "river.majorCity": "เมืองหลัก:",

    // Auth
    "auth.signIn": "เข้าสู่ระบบ",
    "auth.signOut": "ออกจากระบบ",

    // Loading
    loading: "กำลังโหลดข้อมูล...",
  },
};

export function useTranslation() {
  const locale = useMapStore((s) => s.locale);

  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  };

  return { t, locale };
}
