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

    // Spot FAB
    "fab.addSpot": "Add a spot",

    // Spot form
    "spotForm.title": "Drop a spot",
    "spotForm.stepLocationLabel": "Location",
    "spotForm.stepPhotosLabel": "Photos",
    "spotForm.stepDetailsLabel": "Details",
    "spotForm.stepPreviewLabel": "Preview",
    "spotForm.stepLocation": "Choose location",
    "spotForm.tapTheMap": "Tap anywhere on the map to place your spot",
    "spotForm.stepPhotos": "Add photos",
    "spotForm.photosHint": "Add 1–5 photos of the spot (JPEG, PNG or WebP, max 5 MB each)",
    "spotForm.photoRequired": "At least one photo is required",
    "spotForm.titleLabel": "Title",
    "spotForm.titlePlaceholder": "e.g. Hidden cove near Koh Larn",
    "spotForm.ratingLabel": "Rating",
    "spotForm.tagsLabel": "Tags",
    "spotForm.descriptionLabel": "Description (optional)",
    "spotForm.descriptionPlaceholder": "What makes this spot special?",
    "spotForm.stepPreview": "Preview your spot",
    "spotForm.untitled": "Untitled spot",
    "spotForm.back": "Back",
    "spotForm.next": "Next",
    "spotForm.publish": "Publish",
    "spotForm.publishing": "Publishing...",

    // Spot tags
    "tag.rocky_beach": "Rocky beach",
    "tag.sandy_beach": "Sandy beach",
    "tag.cove": "Cove",
    "tag.pier": "Pier",
    "tag.river_mouth": "River mouth",
    "tag.island": "Island",
    "tag.urban": "Urban",
    "tag.remote": "Remote",

    // Spot popup
    "spot.anonymous": "Anonymous",

    // Filters — community spots
    "filters.communitySpots": "Community spots",

    // Legend — community spot
    "legend.communitySpot": "Community spot",
    "legend.userSubmitted": "User-submitted",

    // Social — likes, comments, saves
    "social.like": "Like",
    "social.unlike": "Unlike",
    "social.comment": "Comment",
    "social.comments": "Comments",
    "social.save": "Save",
    "social.unsave": "Unsave",
    "social.share": "Share",
    "social.copyLink": "Copy link",
    "social.shareToLine": "Share to LINE",
    "social.copied": "Copied!",
    "social.signInToComment": "Sign in to comment",
    "social.signInToLike": "Sign in to like",
    "social.signInToSave": "Sign in to save",
    "social.noComments": "No comments yet",
    "social.addComment": "Add a comment...",
    "social.reply": "Reply",
    "social.delete": "Delete",
    "social.deleteConfirm": "Delete this comment?",

    // Recent finds
    "recentFinds.title": "Recent finds",
    "recentFinds.empty": "No spots yet",

    // Profile
    "profile.title": "Profile",
    "profile.memberSince": "Member since",
    "profile.spots": "Spots",
    "profile.likesReceived": "Likes received",
    "profile.photos": "Photos",
    "profile.daysActive": "Days active",
    "profile.collection": "My Collection",
    "profile.noSpots": "No spots yet",
    "profile.backToMap": "Back to map",
    "profile.shareProfile": "Share profile",
    "profile.linkCopied": "Profile link copied!",

    // Badges
    "badge.title": "Badges",
    "badge.earned": "Earned",
    "badge.locked": "Locked",
    "badge.first_drop": "First Drop",
    "badge.first_drop.desc": "Drop your first spot on the map",
    "badge.explorer": "Explorer",
    "badge.explorer.desc": "Drop 5 spots on the map",
    "badge.photographer": "Photographer",
    "badge.photographer.desc": "Upload 20 photos",
    "badge.local_expert": "Local Expert",
    "badge.local_expert.desc": "Drop 10 spots on the map",
    "badge.rare_find": "Rare Find",
    "badge.rare_find.desc": "Get 50 likes on a single spot",
    "badge.sea_glass_og": "Sea Glass OG",
    "badge.sea_glass_og.desc": "Be a member for 30 days",

    // Rarity
    "rarity.common": "Common",
    "rarity.rare": "Rare",
    "rarity.epic": "Epic",
    "rarity.legendary": "Legendary",

    // Leaderboard
    "leaderboard.title": "Leaderboard",
    "leaderboard.spots": "spots",
    "leaderboard.likes": "likes",
    "leaderboard.score": "score",
    "leaderboard.empty": "No contributors yet",
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

    // Spot FAB
    "fab.addSpot": "เพิ่มจุด",

    // Spot form
    "spotForm.title": "แชร์จุด",
    "spotForm.stepLocationLabel": "ตำแหน่ง",
    "spotForm.stepPhotosLabel": "รูปภาพ",
    "spotForm.stepDetailsLabel": "รายละเอียด",
    "spotForm.stepPreviewLabel": "ตัวอย่าง",
    "spotForm.stepLocation": "เลือกตำแหน่ง",
    "spotForm.tapTheMap": "แตะบนแผนที่เพื่อวางจุดของคุณ",
    "spotForm.stepPhotos": "เพิ่มรูปภาพ",
    "spotForm.photosHint": "เพิ่ม 1–5 รูปของจุดนี้ (JPEG, PNG หรือ WebP สูงสุด 5 MB)",
    "spotForm.photoRequired": "ต้องมีรูปภาพอย่างน้อย 1 รูป",
    "spotForm.titleLabel": "ชื่อ",
    "spotForm.titlePlaceholder": "เช่น อ่าวลับใกล้เกาะล้าน",
    "spotForm.ratingLabel": "คะแนน",
    "spotForm.tagsLabel": "แท็ก",
    "spotForm.descriptionLabel": "คำอธิบาย (ไม่บังคับ)",
    "spotForm.descriptionPlaceholder": "จุดนี้มีอะไรพิเศษ?",
    "spotForm.stepPreview": "ตัวอย่างจุดของคุณ",
    "spotForm.untitled": "จุดไม่มีชื่อ",
    "spotForm.back": "กลับ",
    "spotForm.next": "ถัดไป",
    "spotForm.publish": "เผยแพร่",
    "spotForm.publishing": "กำลังเผยแพร่...",

    // Spot tags
    "tag.rocky_beach": "หาดหิน",
    "tag.sandy_beach": "หาดทราย",
    "tag.cove": "อ่าว",
    "tag.pier": "ท่าเรือ",
    "tag.river_mouth": "ปากแม่น้ำ",
    "tag.island": "เกาะ",
    "tag.urban": "ในเมือง",
    "tag.remote": "ห่างไกล",

    // Spot popup
    "spot.anonymous": "ไม่ระบุชื่อ",

    // Filters — community spots
    "filters.communitySpots": "จุดจากชุมชน",

    // Legend — community spot
    "legend.communitySpot": "จุดจากชุมชน",
    "legend.userSubmitted": "ผู้ใช้แชร์",

    // Social — likes, comments, saves
    "social.like": "ถูกใจ",
    "social.unlike": "เลิกถูกใจ",
    "social.comment": "แสดงความคิดเห็น",
    "social.comments": "ความคิดเห็น",
    "social.save": "บันทึก",
    "social.unsave": "เลิกบันทึก",
    "social.share": "แชร์",
    "social.copyLink": "คัดลอกลิงก์",
    "social.shareToLine": "แชร์ไปยัง LINE",
    "social.copied": "คัดลอกแล้ว!",
    "social.signInToComment": "เข้าสู่ระบบเพื่อแสดงความคิดเห็น",
    "social.signInToLike": "เข้าสู่ระบบเพื่อถูกใจ",
    "social.signInToSave": "เข้าสู่ระบบเพื่อบันทึก",
    "social.noComments": "ยังไม่มีความคิดเห็น",
    "social.addComment": "เพิ่มความคิดเห็น...",
    "social.reply": "ตอบกลับ",
    "social.delete": "ลบ",
    "social.deleteConfirm": "ลบความคิดเห็นนี้?",

    // Recent finds
    "recentFinds.title": "พบล่าสุด",
    "recentFinds.empty": "ยังไม่มีจุด",

    // Profile
    "profile.title": "โปรไฟล์",
    "profile.memberSince": "สมาชิกตั้งแต่",
    "profile.spots": "จุด",
    "profile.likesReceived": "ยอดถูกใจ",
    "profile.photos": "รูปภาพ",
    "profile.daysActive": "วันที่ใช้งาน",
    "profile.collection": "คอลเลกชันของฉัน",
    "profile.noSpots": "ยังไม่มีจุด",
    "profile.backToMap": "กลับไปแผนที่",
    "profile.shareProfile": "แชร์โปรไฟล์",
    "profile.linkCopied": "คัดลอกลิงก์โปรไฟล์แล้ว!",

    // Badges
    "badge.title": "เหรียญตรา",
    "badge.earned": "ได้รับแล้ว",
    "badge.locked": "ล็อค",
    "badge.first_drop": "ดรอปแรก",
    "badge.first_drop.desc": "ดรอปจุดแรกบนแผนที่",
    "badge.explorer": "นักสำรวจ",
    "badge.explorer.desc": "ดรอป 5 จุดบนแผนที่",
    "badge.photographer": "ช่างภาพ",
    "badge.photographer.desc": "อัพโหลด 20 รูป",
    "badge.local_expert": "ผู้เชี่ยวชาญท้องถิ่น",
    "badge.local_expert.desc": "ดรอป 10 จุดบนแผนที่",
    "badge.rare_find": "ของหายาก",
    "badge.rare_find.desc": "ได้รับ 50 ถูกใจในจุดเดียว",
    "badge.sea_glass_og": "ซีกลาส OG",
    "badge.sea_glass_og.desc": "เป็นสมาชิก 30 วัน",

    // Rarity
    "rarity.common": "ธรรมดา",
    "rarity.rare": "หายาก",
    "rarity.epic": "มหากาพย์",
    "rarity.legendary": "ตำนาน",

    // Leaderboard
    "leaderboard.title": "กระดานผู้นำ",
    "leaderboard.spots": "จุด",
    "leaderboard.likes": "ถูกใจ",
    "leaderboard.score": "คะแนน",
    "leaderboard.empty": "ยังไม่มีผู้ร่วมสร้าง",
  },
};

export function useTranslation() {
  const locale = useMapStore((s) => s.locale);

  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  };

  return { t, locale };
}
