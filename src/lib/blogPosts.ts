import type { Locale } from "./i18n";

export interface BlogPost {
  slug: string;
  image: string;
  date: string;
  readingTime: number;
}

export interface BlogPostContent extends BlogPost {
  title: string;
  excerpt: string;
  content: string[];
  metaDescription: string;
}

const posts: Record<string, Record<Locale, Omit<BlogPostContent, keyof BlogPost>>> = {
  "best-sea-glass-beaches-thailand": {
    en: {
      title: "Best Sea Glass Beaches in Thailand: Top 10 Spots",
      excerpt:
        "Discover the most rewarding beaches for sea glass hunting across Thailand's coastline, from the Gulf of Thailand to the Andaman Sea.",
      metaDescription:
        "Find the best sea glass beaches in Thailand. Our guide covers top spots along the Gulf and Andaman coasts where collectors find the most sea glass.",
      content: [
        "Thailand's 3,219 kilometers of coastline hide some of the best sea glass hunting spots in Southeast Asia. Whether you're a seasoned collector or a curious beginner, the mix of historical trade routes, urban coastlines, and powerful monsoon currents creates ideal conditions for finding polished glass treasures.",
        "## 1. Koh Larn, Chonburi",
        "Just a short ferry ride from Pattaya, Koh Larn's western beaches — especially Tawaen and Samae — are popular among collectors. Decades of tourism and nearby urban development have fed a steady supply of glass into the currents. Visit after the monsoon season (November–February) for the best finds.",
        "## 2. Bang Saen Beach, Chonburi",
        "This local favorite north of Pattaya offers surprisingly good sea glass pickings, particularly near the rocky outcrops at the southern end. The mix of fishing activity and nearby river mouths brings a variety of colors.",
        "## 3. Hua Hin South Beach",
        "The stretch south of Hua Hin town, toward Khao Takiab, catches glass carried by longshore drift from the upper Gulf. Early mornings at low tide are best, especially after storms.",
        "## 4. Koh Sichang, Chonburi",
        "This lesser-known island near Sri Racha has a long maritime history. The port side of the island collects fragments from decades of shipping activity. Rare cobalt blue and amber pieces have been reported here.",
        "## 5. Laem Chabang Area",
        "The beaches around Thailand's largest commercial port see a lot of deposited material. While not the most scenic, dedicated hunters can find unusual industrial glass colors not seen elsewhere.",
        "## 6. Koh Phangan — Haad Rin",
        "Famous for the Full Moon Party, Haad Rin's beach also rewards patient sea glass hunters. Years of beachside activity have left a colorful legacy now polished by the waves.",
        "## 7. Koh Lanta — Old Town Side",
        "The eastern, mangrove-fringed side of Koh Lanta near the old town has rocky stretches where glass from the former trading port accumulates. Look among the coral rubble at low tide.",
        "## 8. Songkhla — Samila Beach",
        "Southern Thailand's historic port city generates excellent finds. The long sandy beach backed by a lake creates a natural trap for debris washing in from the Gulf.",
        "## 9. Rayong Coast",
        "The coastline between Ban Phe and Mae Ramphueng offers multiple small coves where glass collects. River mouths along this stretch deposit glass from inland sources.",
        "## 10. Phuket — Kamala Beach (North End)",
        "After the southwest monsoon, the rocky northern end of Kamala traps wave-tumbled glass from the Andaman Sea. Green and brown beer-bottle glass is common, but patient hunters find rarer whites and aquas.",
        "## Tips for Sea Glass Hunting in Thailand",
        "**Best season:** November through February, after the monsoon has churned up the sea floor and deposited new material. **Best time of day:** Early morning at low tide, before other beachgoers arrive. **What to bring:** A mesh bag or small bucket, sunscreen, and a keen eye — Thai sea glass tends to be smaller than North American or European pieces due to warmer water and faster tumbling cycles.",
      ],
    },
    th: {
      title: "ชายหาดซีกลาสที่ดีที่สุดในไทย: 10 จุดยอดนิยม",
      excerpt:
        "ค้นพบชายหาดที่ดีที่สุดสำหรับการล่าซีกลาสตลอดแนวชายฝั่งของไทย ตั้งแต่อ่าวไทยถึงทะเลอันดามัน",
      metaDescription:
        "ค้นหาชายหาดซีกลาสที่ดีที่สุดในไทย คู่มือของเราครอบคลุมจุดยอดนิยมตามชายฝั่งอ่าวไทยและอันดามัน",
      content: [
        "แนวชายฝั่งยาว 3,219 กิโลเมตรของประเทศไทยซ่อนจุดล่าซีกลาสที่ดีที่สุดในเอเชียตะวันออกเฉียงใต้ ไม่ว่าคุณจะเป็นนักสะสมผู้มีประสบการณ์หรือมือใหม่ การผสมผสานของเส้นทางการค้าประวัติศาสตร์ ชายฝั่งเมือง และกระแสน้ำมรสุมที่ทรงพลังสร้างสภาพแวดล้อมที่เหมาะสมสำหรับการค้นหาสมบัติแก้วที่ถูกขัดเงา",
        "## 1. เกาะล้าน, ชลบุรี",
        "อยู่ห่างจากพัทยาเพียงเรือข้ามฟาก ชายหาดฝั่งตะวันตกของเกาะล้าน โดยเฉพาะหาดตาแหวนและหาดเสม็ด เป็นที่นิยมในหมู่นักสะสม การท่องเที่ยวหลายทศวรรษและการพัฒนาเมืองใกล้เคียงทำให้มีแก้วไหลเข้าสู่กระแสน้ำอย่างต่อเนื่อง",
        "## 2. หาดบางแสน, ชลบุรี",
        "หาดยอดนิยมของคนท้องถิ่นทางเหนือของพัทยามีซีกลาสให้เก็บได้ดีอย่างน่าประหลาดใจ โดยเฉพาะบริเวณโขดหินทางด้านใต้",
        "## 3. หาดหัวหินตอนใต้",
        "แนวหาดทางใต้ของตัวเมืองหัวหิน ไปทางเขาตะเกียบ รับแก้วที่ถูกพัดพามาโดยกระแสน้ำชายฝั่งจากอ่าวไทยตอนบน",
        "## 4. เกาะสีชัง, ชลบุรี",
        "เกาะที่ไม่ค่อยเป็นที่รู้จักใกล้ศรีราชามีประวัติศาสตร์ทางทะเลยาวนาน ด้านท่าเรือของเกาะสะสมเศษแก้วจากกิจกรรมการเดินเรือหลายทศวรรษ",
        "## 5. บริเวณแหลมฉบัง",
        "ชายหาดรอบท่าเรือพาณิชย์ที่ใหญ่ที่สุดของไทยมีวัสดุที่ถูกทับถมมาก นักล่าที่ทุ่มเทสามารถพบสีแก้วอุตสาหกรรมที่ไม่พบที่อื่น",
        "## 6. เกาะพะงัน — หาดริ้น",
        "มีชื่อเสียงจากฟูลมูนปาร์ตี้ หาดริ้นยังให้รางวัลแก่นักล่าซีกลาสที่อดทน กิจกรรมริมชายหาดหลายปีทิ้งมรดกหลากสีที่ถูกคลื่นขัดเงา",
        "## 7. เกาะลันตา — ฝั่งเมืองเก่า",
        "ฝั่งตะวันออกของเกาะลันตาใกล้เมืองเก่ามีแนวหินที่แก้วจากท่าเรือค้าขายเดิมสะสมอยู่ มองหาตามเศษปะการังเมื่อน้ำลง",
        "## 8. สงขลา — หาดสมิหลา",
        "เมืองท่าประวัติศาสตร์ของภาคใต้ให้ผลลัพธ์ที่ยอดเยี่ยม หาดทรายยาวที่มีทะเลสาบอยู่ด้านหลังสร้างกับดักธรรมชาติสำหรับเศษวัสดุ",
        "## 9. ชายฝั่งระยอง",
        "แนวชายฝั่งระหว่างบ้านเพและแม่รำพึงมีอ่าวเล็กๆ หลายแห่งที่แก้วสะสม ปากแม่น้ำตามแนวนี้พัดพาแก้วจากแหล่งในแผ่นดิน",
        "## 10. ภูเก็ต — หาดกมลา (ปลายเหนือ)",
        "หลังมรสุมตะวันตกเฉียงใต้ ปลายเหนือที่เป็นหินของกมลาดักแก้วที่ถูกคลื่นกลิ้งจากทะเลอันดามัน แก้วสีเขียวและน้ำตาลจากขวดเบียร์พบได้ทั่วไป",
        "## เคล็ดลับการล่าซีกลาสในไทย",
        "**ฤดูกาลที่ดีที่สุด:** พฤศจิกายนถึงกุมภาพันธ์ หลังมรสุมกวนพื้นทะเลและทับถมวัสดุใหม่ **เวลาที่ดีที่สุด:** เช้าตรู่เมื่อน้ำลง ก่อนนักท่องเที่ยวคนอื่นมาถึง **สิ่งที่ควรนำ:** ถุงตาข่ายหรือถังเล็ก ครีมกันแดด และสายตาที่แหลมคม",
      ],
    },
  },
  "what-is-sea-glass-complete-guide": {
    en: {
      title: "What Is Sea Glass? A Complete Beginner's Guide",
      excerpt:
        "Learn everything about sea glass — how it forms, where to find it, the rarest colors, and why collectors around the world treasure these ocean gems.",
      metaDescription:
        "What is sea glass and how does it form? This complete guide covers sea glass colors, rarity, where to find it, and tips for starting your collection.",
      content: [
        "Sea glass is one of nature's most beautiful recycling projects. Born from discarded bottles, jars, and tableware, these frosted fragments are tumbled by waves and sand over decades until they become smooth, jewel-like treasures prized by collectors worldwide.",
        "## How Sea Glass Forms",
        "The journey from trash to treasure takes between 20 and 50 years, sometimes longer. When glass enters the ocean — from a broken bottle tossed off a ship, a seaside dump, or a river carrying urban waste — the process begins. Saltwater chemically etches the surface through a process called hydration, while sand and rocks physically abrade the edges. The result is the signature frosted, pitted texture that distinguishes genuine sea glass from craft imitations.",
        "## Sea Glass Colors and Rarity",
        "Not all sea glass is created equal. Color rarity depends on the original glass source:",
        "**Common colors (easy to find):** White/clear (from bottles and windows), brown (beer bottles), and green (wine and soda bottles) make up about 75% of all sea glass found worldwide.",
        "**Uncommon colors:** Seafoam green, soft blue (from old medicine and ink bottles), and olive green are less common but regularly found at productive beaches.",
        "**Rare colors:** Cobalt blue (from Noxzema jars, Milk of Magnesia bottles), aqua (from old Ball mason jars and insulators), and amber/golden make up less than 5% of finds.",
        "**Ultra-rare colors:** Red (from vintage car taillights, nautical lanterns, and Anchor Hocking tableware), orange (from decorative art glass), yellow (from Depression-era tableware), and black (from very old bottles, often appearing dark olive or deep amber when held to light) are the holy grail for collectors. These represent less than 1% of all sea glass.",
        "## Where to Find Sea Glass",
        "The best sea glass beaches share a few key characteristics:",
        "**Proximity to historical glass sources** — old dumps, ports, fishing villages, and areas with decades of human coastal activity generate the raw material. **Rocky or pebbly shorelines** tend to trap and tumble glass more effectively than smooth, flat sand beaches. **Strong wave action and currents** accelerate the tumbling process. **River mouths** carry glass from inland sources and deposit it along nearby coasts.",
        "## How to Start Collecting",
        "Getting started with sea glass collecting is simple: visit a beach, look down, and start picking. But a few tips will dramatically improve your success:",
        "**Go at low tide.** More beach is exposed, and glass that normally sits in shallow water becomes accessible. **Walk the tide line.** Sea glass concentrates along the wrack line where waves deposit material. **Look after storms.** Rough seas churn up glass from the sea floor and deposit fresh pieces on shore. **Bring a small mesh bag.** It lets sand fall through while you keep collecting. **Be patient and systematic.** Walk slowly, scan methodically, and check among pebbles and shell hash — sea glass often hides in plain sight.",
        "## The Collector Community",
        "Sea glass collecting has grown from a casual beach pastime into a global community. Online platforms like Sea Glass Map let collectors share locations, compare finds, and connect across borders. Festivals, Facebook groups, and dedicated forums bring enthusiasts together. Some collectors focus on building color-complete collections, while others hunt for rare historical pieces or create jewelry and art from their finds.",
        "## Is Collecting Sea Glass Legal?",
        "In most places, picking up sea glass from public beaches is perfectly legal. However, some protected areas — national parks, marine reserves, and heritage coastlines — prohibit removing any natural or man-made material. Always check local regulations before collecting, and respect signage at the beach. Sea Glass Map marks protected areas on the map so you can plan accordingly.",
      ],
    },
    th: {
      title: "ซีกลาสคืออะไร? คู่มือฉบับสมบูรณ์สำหรับมือใหม่",
      excerpt:
        "เรียนรู้ทุกอย่างเกี่ยวกับซีกลาส — มันเกิดขึ้นได้อย่างไร หาได้ที่ไหน สีที่หายากที่สุด และทำไมนักสะสมทั่วโลกถึงหวงแหนอัญมณีจากมหาสมุทรเหล่านี้",
      metaDescription:
        "ซีกลาสคืออะไรและเกิดขึ้นได้อย่างไร? คู่มือฉบับสมบูรณ์ครอบคลุมสีซีกลาส ความหายาก แหล่งค้นหา และเคล็ดลับในการเริ่มสะสม",
      content: [
        "ซีกลาสเป็นหนึ่งในโปรเจกต์รีไซเคิลที่สวยงามที่สุดของธรรมชาติ เกิดจากขวด ไห และเครื่องใช้บนโต๊ะอาหารที่ถูกทิ้ง เศษแก้วฝ้าเหล่านี้ถูกคลื่นและทรายกลิ้งตลอดหลายทศวรรษจนกลายเป็นสมบัติเรียบลื่นคล้ายอัญมณีที่นักสะสมทั่วโลกหวงแหน",
        "## ซีกลาสเกิดขึ้นได้อย่างไร",
        "การเดินทางจากขยะสู่สมบัติใช้เวลาระหว่าง 20 ถึง 50 ปี บางครั้งนานกว่านั้น เมื่อแก้วเข้าสู่มหาสมุทร น้ำเค็มจะกัดกร่อนพื้นผิวผ่านกระบวนการที่เรียกว่าไฮเดรชัน ในขณะที่ทรายและหินจะขัดขอบทางกายภาพ ผลลัพธ์คือพื้นผิวฝ้าและเป็นหลุมที่เป็นเอกลักษณ์ของซีกลาสแท้",
        "## สีซีกลาสและความหายาก",
        "ไม่ใช่ซีกลาสทุกชิ้นจะเท่ากัน ความหายากของสีขึ้นอยู่กับแหล่งแก้วดั้งเดิม:",
        "**สีทั่วไป:** ขาว/ใส (จากขวดและหน้าต่าง) น้ำตาล (ขวดเบียร์) และเขียว (ขวดไวน์และน้ำอัดลม) คิดเป็นประมาณ 75% ของซีกลาสทั้งหมดที่พบทั่วโลก",
        "**สีไม่ธรรมดา:** เขียวทะเล ฟ้าอ่อน และเขียวมะกอก พบได้น้อยกว่าแต่พบเป็นประจำที่ชายหาดที่มีผลผลิตดี",
        "**สีหายาก:** น้ำเงินโคบอลต์ อะความารีน และอำพัน/ทอง คิดเป็นน้อยกว่า 5% ของการค้นพบ",
        "**สีหายากมาก:** แดง ส้ม เหลือง และดำ เป็นสิ่งที่นักสะสมตามหามากที่สุด สีเหล่านี้คิดเป็นน้อยกว่า 1% ของซีกลาสทั้งหมด",
        "## จะหาซีกลาสได้ที่ไหน",
        "ชายหาดซีกลาสที่ดีที่สุดมีลักษณะร่วมกันหลายอย่าง: ใกล้แหล่งแก้วทางประวัติศาสตร์ แนวหินหรือกรวด คลื่นและกระแสน้ำที่แรง และปากแม่น้ำ",
        "## วิธีเริ่มสะสม",
        "**ไปตอนน้ำลง** จะมีชายหาดมากขึ้นให้สำรวจ **เดินตามแนวน้ำขึ้น** ซีกลาสจะกระจุกตัวตามแนวที่คลื่นทับถมวัสดุ **ดูหลังพายุ** ทะเลที่ปั่นป่วนจะกวนแก้วจากพื้นทะเล **อดทนและเป็นระบบ** เดินช้าๆ สแกนอย่างเป็นระบบ",
        "## ชุมชนนักสะสม",
        "การสะสมซีกลาสเติบโตจากกิจกรรมชายหาดทั่วไปเป็นชุมชนระดับโลก แพลตฟอร์มออนไลน์อย่าง Sea Glass Map ช่วยให้นักสะสมแชร์สถานที่ เปรียบเทียบการค้นพบ และเชื่อมต่อข้ามพรมแดน",
        "## การสะสมซีกลาสถูกกฎหมายหรือไม่?",
        "ในที่ส่วนใหญ่ การเก็บซีกลาสจากชายหาดสาธารณะเป็นเรื่องถูกกฎหมาย อย่างไรก็ตาม พื้นที่คุ้มครองบางแห่งห้ามนำวัสดุใดๆ ออก ตรวจสอบกฎระเบียบท้องถิ่นก่อนเก็บเสมอ Sea Glass Map ทำเครื่องหมายพื้นที่คุ้มครองบนแผนที่เพื่อให้คุณวางแผนได้",
      ],
    },
  },
  "sea-glass-jewelry-diy-guide": {
    en: {
      title: "How to Make Sea Glass Jewelry: A DIY Guide for Beginners",
      excerpt:
        "Turn your beach finds into wearable art. Step-by-step instructions for creating sea glass necklaces, earrings, and rings at home.",
      metaDescription:
        "Learn how to make sea glass jewelry at home. This beginner DIY guide covers wire wrapping, drilling, and setting techniques for necklaces, earrings, and rings.",
      content: [
        "You've spent hours combing the beach and built a beautiful sea glass collection. Now what? Turning your finds into handcrafted jewelry is one of the most rewarding ways to showcase your treasures — and it's easier than you might think.",
        "## Choosing the Right Pieces",
        "Not every piece of sea glass makes great jewelry. Look for these qualities when selecting pieces from your collection:",
        "**Well-frosted surface** — the thick, frosty patina that develops over decades is what makes sea glass beautiful. Shiny or partially frosted pieces haven't been tumbled long enough. **Pleasing shape** — triangular, oval, and teardrop shapes work best for pendants. Flat, rounded pieces are ideal for rings and earrings. **Good size** — pendant pieces should be roughly 2–4 cm. Earring pieces should be small and well-matched in size and color. **No cracks** — cracked glass may break during drilling or wire wrapping.",
        "## Method 1: Wire Wrapping (No Tools Required)",
        "Wire wrapping is the easiest way to start making sea glass jewelry. You don't need to drill the glass, and the materials cost just a few dollars.",
        "**What you need:** 20-gauge craft wire (silver, gold, or copper), round-nose pliers, flat-nose pliers, wire cutters, and your sea glass.",
        "**Steps:** Cut about 30 cm of wire. Create a small loop at one end using round-nose pliers — this will be your bail (where the chain goes through). Place your sea glass piece against the wire, just below the loop. Wrap the wire around the glass, crossing at the back to create tension. Continue wrapping 2–3 times, keeping the wire snug but not too tight. Tuck the end of the wire neatly against the back of the piece. Thread a chain or cord through the bail loop.",
        "## Method 2: Drilling Sea Glass",
        "Drilling opens up many more design possibilities — drilled pieces can be hung directly, linked together, or attached to findings with jump rings.",
        "**What you need:** A rotary tool (Dremel) with a diamond-coated drill bit (1.5–2 mm), a shallow dish of water, masking tape, and safety glasses.",
        "**Steps:** Place masking tape on both sides of the glass where you want to drill — this prevents chipping and marks your spot. Submerge the glass in about 1 cm of water in your dish. Start drilling at a 45-degree angle to create a small notch, then straighten to 90 degrees. Use light, steady pressure — let the drill do the work. Keep the glass submerged; the water cools the bit and prevents cracking. A single hole takes 2–5 minutes depending on glass thickness.",
        "## Method 3: Bezel Setting",
        "For a more polished, professional look, bezel settings frame the sea glass in metal. You can buy pre-made bezel cups or cut bezel wire to custom-fit your pieces.",
        "**What you need:** Bezel cups or bezel wire (fine silver is easiest to work with), E6000 adhesive or two-part epoxy, a burnishing tool, and earring posts or pendant bails.",
        "**Steps:** Select a bezel cup that fits your glass snugly with 1–2 mm of metal extending above the glass edge. Clean both the glass and the cup with rubbing alcohol. Apply a thin layer of adhesive to the cup interior. Press the glass firmly into the cup. Once dry, use a burnishing tool to gently push the bezel wall against the glass edge. Attach your finding (earring post, bail, etc.).",
        "## Care Tips for Sea Glass Jewelry",
        "Sea glass jewelry lasts a long time with basic care. Avoid exposing wire-wrapped pieces to water — this tarnishes copper and silver wire over time. Store pieces individually to prevent scratching. Clean gently with a soft cloth. If the sea glass loses its frosty look, a very light sanding with 600-grit sandpaper restores the matte finish.",
        "## Selling Your Creations",
        "Handmade sea glass jewelry is popular on Etsy, at craft markets, and in beach-town boutiques. Pieces made from rare colors (cobalt blue, red, lavender) command premium prices. Always disclose if glass is genuine sea glass versus tumbled craft glass — collectors and buyers value authenticity. Include the story of where you found the glass to add personal value.",
      ],
    },
    th: {
      title: "วิธีทำเครื่องประดับซีกลาส: คู่มือ DIY สำหรับมือใหม่",
      excerpt:
        "เปลี่ยนสิ่งที่เก็บจากชายหาดเป็นงานศิลปะที่สวมใส่ได้ คำแนะนำทีละขั้นตอนสำหรับการทำสร้อยคอ ต่างหู และแหวนซีกลาสที่บ้าน",
      metaDescription:
        "เรียนรู้วิธีทำเครื่องประดับซีกลาสที่บ้าน คู่มือ DIY สำหรับมือใหม่ครอบคลุมเทคนิคการพันลวด เจาะ และเซ็ตสำหรับสร้อยคอ ต่างหู และแหวน",
      content: [
        "คุณใช้เวลาหลายชั่วโมงเดินตามชายหาดและสร้างคอลเลกชันซีกลาสที่สวยงาม ตอนนี้จะทำอย่างไรต่อ? การเปลี่ยนสิ่งที่คุณเก็บได้เป็นเครื่องประดับทำมือเป็นวิธีที่คุ้มค่าที่สุดในการโชว์สมบัติของคุณ",
        "## เลือกชิ้นที่เหมาะสม",
        "ไม่ใช่ซีกลาสทุกชิ้นที่เหมาะทำเครื่องประดับ มองหาคุณสมบัติเหล่านี้: พื้นผิวฝ้าดี รูปร่างสวย ขนาดเหมาะสม และไม่มีรอยแตก",
        "## วิธีที่ 1: พันลวด (ไม่ต้องใช้เครื่องมือมาก)",
        "การพันลวดเป็นวิธีที่ง่ายที่สุดในการเริ่มทำเครื่องประดับซีกลาส คุณไม่ต้องเจาะแก้ว และวัสดุมีราคาเพียงไม่กี่บาท",
        "**สิ่งที่ต้องการ:** ลวดงานฝีมือ 20-gauge คีมปากกลม คีมปากแบน คีมตัดลวด และซีกลาสของคุณ",
        "**ขั้นตอน:** ตัดลวดยาวประมาณ 30 ซม. สร้างห่วงเล็กที่ปลายด้านหนึ่ง วางซีกลาสบนลวดใต้ห่วง พันลวดรอบแก้ว 2-3 รอบ ซ่อนปลายลวดไว้ด้านหลัง ร้อยโซ่หรือเชือกผ่านห่วง",
        "## วิธีที่ 2: เจาะซีกลาส",
        "การเจาะเปิดโอกาสการออกแบบมากขึ้น ชิ้นที่เจาะแล้วสามารถแขวนโดยตรง เชื่อมต่อกัน หรือติดกับอุปกรณ์ด้วยห่วง",
        "**สิ่งที่ต้องการ:** เครื่องมือโรตารี (Dremel) กับดอกสว่านเคลือบเพชร จานน้ำตื้น เทปกาว และแว่นตานิรภัย",
        "**ขั้นตอน:** ติดเทปทั้งสองด้านของแก้วตรงจุดที่ต้องการเจาะ จุ่มแก้วในน้ำลึกประมาณ 1 ซม. เริ่มเจาะที่มุม 45 องศาแล้วตั้งตรงเป็น 90 องศา ใช้แรงกดเบาๆ สม่ำเสมอ",
        "## วิธีที่ 3: เซ็ตเบเซล",
        "สำหรับลุคที่เรียบหรูกว่า เบเซลเซ็ตจะกรอบซีกลาสด้วยโลหะ คุณสามารถซื้อถ้วยเบเซลสำเร็จรูปหรือตัดลวดเบเซลให้พอดีกับชิ้นงาน",
        "## เคล็ดลับการดูแลเครื่องประดับซีกลาส",
        "เครื่องประดับซีกลาสทนทานด้วยการดูแลพื้นฐาน หลีกเลี่ยงการสัมผัสน้ำกับชิ้นที่พันลวด เก็บแยกชิ้นเพื่อป้องกันรอยขีดข่วน ทำความสะอาดเบาๆ ด้วยผ้านุ่ม",
        "## ขายผลงานของคุณ",
        "เครื่องประดับซีกลาสทำมือเป็นที่นิยมในตลาดออนไลน์และงานคราฟต์ ชิ้นงานจากสีหายากมีราคาสูงกว่า เปิดเผยเสมอว่าเป็นซีกลาสแท้เพื่อสร้างความน่าเชื่อถือ",
      ],
    },
  },
};

const postMeta: BlogPost[] = [
  {
    slug: "best-sea-glass-beaches-thailand",
    image: "🏖️",
    date: "2026-02-20",
    readingTime: 8,
  },
  {
    slug: "what-is-sea-glass-complete-guide",
    image: "🔍",
    date: "2026-02-15",
    readingTime: 10,
  },
  {
    slug: "sea-glass-jewelry-diy-guide",
    image: "💎",
    date: "2026-02-10",
    readingTime: 7,
  },
];

export function getBlogPosts(locale: Locale): BlogPostContent[] {
  return postMeta.map((meta) => ({
    ...meta,
    ...posts[meta.slug][locale],
  }));
}

export function getBlogPost(
  slug: string,
  locale: Locale
): BlogPostContent | null {
  const meta = postMeta.find((p) => p.slug === slug);
  if (!meta || !posts[slug]) return null;
  return { ...meta, ...posts[slug][locale] };
}

export function getAllSlugs(): string[] {
  return postMeta.map((p) => p.slug);
}
