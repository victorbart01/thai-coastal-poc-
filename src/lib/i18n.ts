import { useMapStore } from "@/store/useMapStore";

export type Locale = "en" | "th";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Header
    "header.title": "Sea Glass Map",
    "header.openPanel": "Open panel",
    "header.closePanel": "Close panel",

    // Tagline
    "tagline.main": "The world's sea glass community.",

    // Search
    "search.placeholder": "Find a beach, spot or collector...",
    "search.noResults": "No results found",
    "search.showingNear": "Showing spots near",
    "search.clearSearch": "Clear search",
    "search.locateMe": "Locate me",
    "search.nearYou": "Spots near your location",
    "search.locationError": "Unable to get your location",

    // Navigation
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.shop": "Shop",
    "nav.forum": "Forum",
    "nav.signUp": "Sign up",
    "nav.dashboard": "Dashboard",

    // Popular countries
    "countries.title": "Popular countries",

    // Popular spots
    "popularSpots.title": "Popular spots",

    // Activity feed
    "activity.title": "Recent activity",
    "activity.addedSpot": "added a new spot:",

    // Top contributors
    "contributors.title": "Top contributors",

    // Map toggles
    "toggles.title": "Map layers",
    "toggles.zones": "Probability zones",

    // Filters (kept for toggles)
    "filters.protectedAreas": "Protected areas",
    "filters.rivers": "Rivers",
    "filters.communitySpots": "Community spots",

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
    "auth.profile": "My profile",

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
    "spotForm.searchPlaceholder": "Search for a place...",

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
    "spot.coordinates": "Coordinates",

    // Legend — community spot
    "legend.communitySpot": "Community spot",
    "legend.userSubmitted": "User-submitted",

    // Social — likes, comments, saves
    "social.like": "Like",
    "social.likes": "likes",
    "social.likedBy": "Liked by",
    "social.member": "member",
    "social.members": "members",
    "social.unlike": "Unlike",
    "social.comment": "Comment",
    "social.comments": "Comments",

    "social.save": "Save",
    "social.unsave": "Unsave",
    "social.share": "Share",
    "social.copyLink": "Copy link",
    "social.shareToLine": "LINE",
    "social.shareToFacebook": "Facebook",
    "social.copied": "Copied!",
    "social.signInToComment": "Sign in to comment",
    "social.signInToLike": "Sign in to like",
    "social.signInToSave": "Sign in to save",
    "social.noComments": "No comments yet",
    "social.addComment": "Add a comment...",
    "social.reply": "Reply",
    "social.delete": "Delete",
    "social.deleteConfirm": "Delete this comment?",

    // Recent finds (kept for empty state)
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
    "profile.savedSpots": "Saved Spots",
    "profile.noSavedSpots": "No saved spots yet",

    // Badges
    "badge.title": "Badges",
    "badge.earned": "Earned",
    "badge.locked": "Locked",
    "badge.progress": "earned",
    // Common
    "badge.first_drop": "First Drop",
    "badge.first_drop.desc": "Drop your first spot on the map",
    "badge.first_snap": "First Snap",
    "badge.first_snap.desc": "Upload your first photo",
    "badge.warm_welcome": "Warm Welcome",
    "badge.warm_welcome.desc": "Receive your first like",
    "badge.good_eye": "Good Eye",
    "badge.good_eye.desc": "Like 5 spots",
    "badge.collector": "Collector",
    "badge.collector.desc": "Save 3 spots",
    "badge.first_words": "First Words",
    "badge.first_words.desc": "Post your first comment",
    "badge.new_member": "New Member",
    "badge.new_member.desc": "Be a member for 7 days",
    "badge.tagger": "Tagger",
    "badge.tagger.desc": "Use 3 different tags",
    // Rare
    "badge.explorer": "Explorer",
    "badge.explorer.desc": "Drop 5 spots on the map",
    "badge.photographer": "Photographer",
    "badge.photographer.desc": "Upload 20 photos",
    "badge.crowd_pleaser": "Crowd Pleaser",
    "badge.crowd_pleaser.desc": "Receive 25 likes",
    "badge.curator": "Curator",
    "badge.curator.desc": "Save 15 spots",
    "badge.social_butterfly": "Social Butterfly",
    "badge.social_butterfly.desc": "Post 10 comments",
    "badge.supporter": "Supporter",
    "badge.supporter.desc": "Like 25 spots",
    // Epic
    "badge.local_expert": "Local Expert",
    "badge.local_expert.desc": "Drop 10 spots on the map",
    "badge.paparazzi": "Paparazzi",
    "badge.paparazzi.desc": "Upload 50 photos",
    "badge.influencer": "Influencer",
    "badge.influencer.desc": "Receive 100 likes",
    "badge.storyteller": "Storyteller",
    "badge.storyteller.desc": "Post 50 comments",
    "badge.seasoned": "Seasoned",
    "badge.seasoned.desc": "Be a member for 90 days",
    // Legendary
    "badge.rare_find": "Rare Find",
    "badge.rare_find.desc": "Get 50 likes on a single spot",
    "badge.sea_glass_og": "Sea Glass OG",
    "badge.sea_glass_og.desc": "Be a member for 30 days",
    "badge.cartographer": "Cartographer",
    "badge.cartographer.desc": "Drop 30 spots on the map",
    "badge.hall_of_fame": "Hall of Fame",
    "badge.hall_of_fame.desc": "Receive 500 likes",
    "badge.veteran": "Veteran",
    "badge.veteran.desc": "Be a member for 365 days",

    // Trophies
    "trophy.title": "Trophies",
    "trophy.spots_count": "Spots",
    "trophy.photos_count": "Photos",
    "trophy.total_likes_received": "Likes",
    "trophy.comments_count": "Comments",
    "trophy.saves_count": "Saves",
    "trophy.likes_given": "Generosity",
    "trophy.member_days": "Seniority",
    "trophy.unique_tags_used": "Tags",
    "trophy.max_likes_on_spot": "Viral",
    "trophy.completed": "MAX",
    "trophy.next": "Next:",

    // Rarity
    "rarity.common": "Common",
    "rarity.rare": "Rare",
    "rarity.epic": "Epic",
    "rarity.legendary": "Legendary",

    // Leaderboard
    "leaderboard.spots": "spots",
    "leaderboard.likes": "likes",
    "leaderboard.empty": "No contributors yet",

    // Placeholder pages
    "about.title": "About Sea Glass Map",
    "blog.title": "Blog",
    "blog.subtitle": "Tips, guides, and stories from the sea glass community.",
    "blog.readMore": "Read more",
    "blog.minRead": "min read",
    "blog.backToBlog": "Back to blog",
    "shop.title": "Shop",
    "shop.comingSoon": "Coming soon — stay tuned!",
    "forum.title": "Forum",
    "forum.comingSoon": "Coming soon — stay tuned!",

    // Tab bar
    "tab.discover": "Discover",
    "tab.contribute": "Contribute",
    "tab.profile": "Profile",

    // Onboarding coach marks
    "onboarding.step1":
      "This is the community map. Each pink dot is a sea glass spot shared by a collector.",
    "onboarding.step2":
      "Here you'll find recent discoveries, popular spots, and the leaderboard.",
    "onboarding.step3": "Ready to share? Tap here to drop your first spot!",
    "onboarding.next": "Next",
    "onboarding.skip": "Skip",
    "onboarding.done": "Got it!",

    // Admin
    "admin.editPosition": "Edit position",
    "admin.save": "Save",
    "admin.cancel": "Cancel",
    "admin.saving": "Saving...",
    "admin.deleteSpot": "Delete spot",
    "admin.deleting": "Deleting...",
    "admin.confirmDelete": "Are you sure you want to delete this spot? This cannot be undone.",

    // Signup
    "signup.title": "Join the Sea Glass Community",
    "signup.subtitle": "Share your spots, save your favorites, and connect with collectors worldwide.",
    "signup.valueShare": "Share your best spots with the community",
    "signup.valueSave": "Save & bookmark your favorites",
    "signup.valueComment": "Comment & exchange with collectors",
    "signup.valueBadges": "Earn badges & climb the leaderboard",
    "signup.firstName": "First name",
    "signup.lastName": "Last name",
    "signup.email": "Email address",
    "signup.sendMagicLink": "Send me a magic link",
    "signup.sending": "Sending...",
    "signup.or": "or",
    "signup.continueWithGoogle": "Continue with Google",
    "signup.alreadyMember": "Already a member?",
    "signup.signIn": "Sign in",
    "signup.checkEmail": "Check your email!",
    "signup.checkEmailDesc": "We sent a magic link to {email}. Click it to join.",
    "signup.resend": "Resend link",
    "signup.tryAnother": "Use another email",
  },
  th: {
    // Header
    "header.title": "แผนที่ซีกลาส",
    "header.openPanel": "เปิดแผง",
    "header.closePanel": "ปิดแผง",

    // Tagline
    "tagline.main": "ชุมชนซีกลาสของโลก",

    // Search
    "search.placeholder": "ค้นหาชายหาด จุด หรือนักสะสม...",
    "search.noResults": "ไม่พบผลลัพธ์",
    "search.showingNear": "แสดงจุดใกล้",
    "search.clearSearch": "ล้างการค้นหา",
    "search.locateMe": "ค้นหาตำแหน่งของฉัน",
    "search.nearYou": "จุดใกล้ตำแหน่งของคุณ",
    "search.locationError": "ไม่สามารถระบุตำแหน่งของคุณได้",

    // Navigation
    "nav.about": "เกี่ยวกับ",
    "nav.blog": "บล็อก",
    "nav.shop": "ร้านค้า",
    "nav.forum": "ฟอรัม",
    "nav.signUp": "สมัคร",
    "nav.dashboard": "แดชบอร์ด",

    // Popular countries
    "countries.title": "ประเทศยอดนิยม",

    // Popular spots
    "popularSpots.title": "จุดยอดนิยม",

    // Activity feed
    "activity.title": "กิจกรรมล่าสุด",
    "activity.addedSpot": "เพิ่มจุดใหม่:",

    // Top contributors
    "contributors.title": "ผู้ร่วมสร้างอันดับต้น",

    // Map toggles
    "toggles.title": "เลเยอร์แผนที่",
    "toggles.zones": "โซนความน่าจะเป็น",

    // Filters (kept for toggles)
    "filters.protectedAreas": "พื้นที่คุ้มครอง",
    "filters.rivers": "แม่น้ำ",
    "filters.communitySpots": "จุดจากชุมชน",

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
    "auth.profile": "โปรไฟล์",

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
    "spotForm.searchPlaceholder": "ค้นหาสถานที่...",

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
    "spot.coordinates": "พิกัด",

    // Legend — community spot
    "legend.communitySpot": "จุดจากชุมชน",
    "legend.userSubmitted": "ผู้ใช้แชร์",

    // Social — likes, comments, saves
    "social.like": "ถูกใจ",
    "social.likes": "ถูกใจ",
    "social.likedBy": "ถูกใจโดย",
    "social.member": "สมาชิก",
    "social.members": "สมาชิก",
    "social.unlike": "เลิกถูกใจ",
    "social.comment": "แสดงความคิดเห็น",
    "social.comments": "ความคิดเห็น",

    "social.save": "บันทึก",
    "social.unsave": "เลิกบันทึก",
    "social.share": "แชร์",
    "social.copyLink": "คัดลอกลิงก์",
    "social.shareToLine": "LINE",
    "social.shareToFacebook": "Facebook",
    "social.copied": "คัดลอกแล้ว!",
    "social.signInToComment": "เข้าสู่ระบบเพื่อแสดงความคิดเห็น",
    "social.signInToLike": "เข้าสู่ระบบเพื่อถูกใจ",
    "social.signInToSave": "เข้าสู่ระบบเพื่อบันทึก",
    "social.noComments": "ยังไม่มีความคิดเห็น",
    "social.addComment": "เพิ่มความคิดเห็น...",
    "social.reply": "ตอบกลับ",
    "social.delete": "ลบ",
    "social.deleteConfirm": "ลบความคิดเห็นนี้?",

    // Recent finds (kept for empty state)
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
    "profile.savedSpots": "จุดที่บันทึก",
    "profile.noSavedSpots": "ยังไม่มีจุดที่บันทึก",

    // Badges
    "badge.title": "เหรียญตรา",
    "badge.earned": "ได้รับแล้ว",
    "badge.locked": "ล็อค",
    "badge.progress": "ได้รับ",
    // Common
    "badge.first_drop": "ดรอปแรก",
    "badge.first_drop.desc": "ดรอปจุดแรกบนแผนที่",
    "badge.first_snap": "ภาพแรก",
    "badge.first_snap.desc": "อัพโหลดรูปแรก",
    "badge.warm_welcome": "ต้อนรับอบอุ่น",
    "badge.warm_welcome.desc": "ได้รับถูกใจแรก",
    "badge.good_eye": "สายตาดี",
    "badge.good_eye.desc": "ถูกใจ 5 จุด",
    "badge.collector": "นักสะสม",
    "badge.collector.desc": "บันทึก 3 จุด",
    "badge.first_words": "คำแรก",
    "badge.first_words.desc": "โพสต์ความคิดเห็นแรก",
    "badge.new_member": "สมาชิกใหม่",
    "badge.new_member.desc": "เป็นสมาชิก 7 วัน",
    "badge.tagger": "นักแท็ก",
    "badge.tagger.desc": "ใช้ 3 แท็กที่ต่างกัน",
    // Rare
    "badge.explorer": "นักสำรวจ",
    "badge.explorer.desc": "ดรอป 5 จุดบนแผนที่",
    "badge.photographer": "ช่างภาพ",
    "badge.photographer.desc": "อัพโหลด 20 รูป",
    "badge.crowd_pleaser": "ขวัญใจมหาชน",
    "badge.crowd_pleaser.desc": "ได้รับ 25 ถูกใจ",
    "badge.curator": "ภัณฑารักษ์",
    "badge.curator.desc": "บันทึก 15 จุด",
    "badge.social_butterfly": "ผีเสื้อสังคม",
    "badge.social_butterfly.desc": "โพสต์ 10 ความคิดเห็น",
    "badge.supporter": "ผู้สนับสนุน",
    "badge.supporter.desc": "ถูกใจ 25 จุด",
    // Epic
    "badge.local_expert": "ผู้เชี่ยวชาญท้องถิ่น",
    "badge.local_expert.desc": "ดรอป 10 จุดบนแผนที่",
    "badge.paparazzi": "ปาปารัซซี่",
    "badge.paparazzi.desc": "อัพโหลด 50 รูป",
    "badge.influencer": "อินฟลูเอนเซอร์",
    "badge.influencer.desc": "ได้รับ 100 ถูกใจ",
    "badge.storyteller": "นักเล่าเรื่อง",
    "badge.storyteller.desc": "โพสต์ 50 ความคิดเห็น",
    "badge.seasoned": "ผู้มากประสบการณ์",
    "badge.seasoned.desc": "เป็นสมาชิก 90 วัน",
    // Legendary
    "badge.rare_find": "ของหายาก",
    "badge.rare_find.desc": "ได้รับ 50 ถูกใจในจุดเดียว",
    "badge.sea_glass_og": "ซีกลาส OG",
    "badge.sea_glass_og.desc": "เป็นสมาชิก 30 วัน",
    "badge.cartographer": "นักทำแผนที่",
    "badge.cartographer.desc": "ดรอป 30 จุดบนแผนที่",
    "badge.hall_of_fame": "หอเกียรติยศ",
    "badge.hall_of_fame.desc": "ได้รับ 500 ถูกใจ",
    "badge.veteran": "ทหารผ่านศึก",
    "badge.veteran.desc": "เป็นสมาชิก 365 วัน",

    // Trophies
    "trophy.title": "ถ้วยรางวัล",
    "trophy.spots_count": "จุด",
    "trophy.photos_count": "รูปภาพ",
    "trophy.total_likes_received": "ถูกใจ",
    "trophy.comments_count": "ความคิดเห็น",
    "trophy.saves_count": "บันทึก",
    "trophy.likes_given": "ความใจกว้าง",
    "trophy.member_days": "อาวุโส",
    "trophy.unique_tags_used": "แท็ก",
    "trophy.max_likes_on_spot": "ไวรัล",
    "trophy.completed": "สูงสุด",
    "trophy.next": "ถัดไป:",

    // Rarity
    "rarity.common": "ธรรมดา",
    "rarity.rare": "หายาก",
    "rarity.epic": "มหากาพย์",
    "rarity.legendary": "ตำนาน",

    // Leaderboard
    "leaderboard.spots": "จุด",
    "leaderboard.likes": "ถูกใจ",
    "leaderboard.empty": "ยังไม่มีผู้ร่วมสร้าง",

    // Placeholder pages
    "about.title": "เกี่ยวกับ Sea Glass Map",
    "blog.title": "บล็อก",
    "blog.subtitle": "เคล็ดลับ คู่มือ และเรื่องราวจากชุมชนซีกลาส",
    "blog.readMore": "อ่านต่อ",
    "blog.minRead": "นาทีอ่าน",
    "blog.backToBlog": "กลับไปบล็อก",
    "shop.title": "ร้านค้า",
    "shop.comingSoon": "เร็วๆ นี้ — รอติดตาม!",
    "forum.title": "ฟอรัม",
    "forum.comingSoon": "เร็วๆ นี้ — รอติดตาม!",

    // Tab bar
    "tab.discover": "ค้นพบ",
    "tab.contribute": "แชร์จุด",
    "tab.profile": "โปรไฟล์",

    // Onboarding coach marks
    "onboarding.step1":
      "นี่คือแผนที่ชุมชน จุดสีชมพูแต่ละจุดคือจุดซีกลาสที่นักสะสมแชร์ไว้",
    "onboarding.step2":
      "ที่นี่คุณจะพบการค้นพบล่าสุด จุดยอดนิยม และลีดเดอร์บอร์ด",
    "onboarding.step3": "พร้อมแชร์หรือยัง? แตะที่นี่เพื่อดรอปจุดแรกของคุณ!",
    "onboarding.next": "ถัดไป",
    "onboarding.skip": "ข้าม",
    "onboarding.done": "เข้าใจแล้ว!",

    // Admin
    "admin.editPosition": "แก้ไขตำแหน่ง",
    "admin.save": "บันทึก",
    "admin.cancel": "ยกเลิก",
    "admin.saving": "กำลังบันทึก...",
    "admin.deleteSpot": "ลบจุด",
    "admin.deleting": "กำลังลบ...",
    "admin.confirmDelete": "คุณแน่ใจหรือไม่ว่าต้องการลบจุดนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้",

    // Signup
    "signup.title": "เข้าร่วมชุมชนซีกลาส",
    "signup.subtitle": "แชร์จุดของคุณ บันทึกรายการโปรด และเชื่อมต่อกับนักสะสมทั่วโลก",
    "signup.valueShare": "แชร์จุดที่ดีที่สุดกับชุมชน",
    "signup.valueSave": "บันทึกและบุ๊กมาร์กรายการโปรด",
    "signup.valueComment": "แสดงความคิดเห็นและแลกเปลี่ยนกับนักสะสม",
    "signup.valueBadges": "รับเหรียญตราและไต่อันดับลีดเดอร์บอร์ด",
    "signup.firstName": "ชื่อ",
    "signup.lastName": "นามสกุล",
    "signup.email": "อีเมล",
    "signup.sendMagicLink": "ส่งลิงก์วิเศษให้ฉัน",
    "signup.sending": "กำลังส่ง...",
    "signup.or": "หรือ",
    "signup.continueWithGoogle": "ดำเนินการต่อด้วย Google",
    "signup.alreadyMember": "เป็นสมาชิกอยู่แล้ว?",
    "signup.signIn": "เข้าสู่ระบบ",
    "signup.checkEmail": "ตรวจสอบอีเมลของคุณ!",
    "signup.checkEmailDesc": "เราส่งลิงก์วิเศษไปที่ {email} คลิกเพื่อเข้าร่วม",
    "signup.resend": "ส่งลิงก์อีกครั้ง",
    "signup.tryAnother": "ใช้อีเมลอื่น",
  },
};

export function useTranslation() {
  const locale = useMapStore((s) => s.locale);

  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  };

  return { t, locale };
}
