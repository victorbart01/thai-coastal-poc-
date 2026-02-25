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
      title: "Best Sea Glass Beaches in Thailand: Top 10 Hunting Spots for Beachcombers",
      excerpt:
        "Discover the best sea glass beaches in Thailand — from the Gulf of Thailand to the Andaman Sea. Our guide reveals the top 10 sea glass hunting spots where beachcombers find rare colors and polished treasures.",
      metaDescription:
        "Discover the best sea glass beaches in Thailand. Top 10 sea glass hunting spots along the Gulf and Andaman coasts, with tips on where to find rare sea glass colors.",
      content: [
        "Thailand's 3,219 kilometers of coastline hide some of the best sea glass hunting spots in Southeast Asia. Whether you're a seasoned sea glass collector or a curious beginner exploring beachcombing in Thailand, the mix of historical trade routes, urban coastlines, and powerful monsoon currents creates ideal conditions for finding polished glass treasures on Thai beaches.",
        "![Sea glass pieces scattered on Thai sand at golden hour](/images/blog/sea-glass-on-sand.jpg)",
        "## 1. Koh Larn, Chonburi",
        "Just a short ferry ride from Pattaya, Koh Larn's western beaches — especially Tawaen and Samae — are popular among sea glass collectors. Decades of tourism and nearby urban development have fed a steady supply of glass into the currents. Visit after the monsoon season (November–February) for the best sea glass finds.",
        "## 2. Bang Saen Beach, Chonburi",
        "This local favorite north of Pattaya offers surprisingly good sea glass pickings, particularly near the rocky outcrops at the southern end. The mix of fishing activity and nearby river mouths brings a variety of sea glass colors, making it a rewarding spot for beachcombing.",
        "## 3. Hua Hin South Beach",
        "The stretch south of Hua Hin town, toward Khao Takiab, catches glass carried by longshore drift from the upper Gulf. Early mornings at low tide are best for sea glass hunting, especially after storms when new pieces wash ashore.",
        "## 4. Koh Sichang, Chonburi",
        "This lesser-known island near Sri Racha has a long maritime history. The port side of the island collects fragments from decades of shipping activity. Rare cobalt blue and amber sea glass pieces have been reported here — a must-visit for anyone hunting rare sea glass colors in Thailand.",
        "## 5. Laem Chabang Area",
        "The beaches around Thailand's largest commercial port see a lot of deposited material. While not the most scenic, dedicated sea glass hunters can find unusual industrial glass colors not seen elsewhere.",
        "![Tropical Thai coastline with turquoise water and rocky shore](/images/blog/thai-coastline.jpg)",
        "## 6. Koh Phangan — Haad Rin",
        "Famous for the Full Moon Party, Haad Rin's beach also rewards patient sea glass hunters. Years of beachside activity have left a colorful legacy now polished by the waves. This is one of the best sea glass beaches in Southeast Asia.",
        "## 7. Koh Lanta — Old Town Side",
        "The eastern, mangrove-fringed side of Koh Lanta near the old town has rocky stretches where glass from the former trading port accumulates. Look among the coral rubble at low tide for well-tumbled sea glass pieces.",
        "## 8. Songkhla — Samila Beach",
        "Southern Thailand's historic port city generates excellent sea glass finds. The long sandy beach backed by a lake creates a natural trap for debris washing in from the Gulf — a hidden gem for beachcombing in Thailand.",
        "## 9. Rayong Coast",
        "The coastline between Ban Phe and Mae Ramphueng offers multiple small coves where sea glass collects. River mouths along this stretch deposit glass from inland sources, making each cove a potential treasure trove of sea glass colors.",
        "## 10. Phuket — Kamala Beach (North End)",
        "After the southwest monsoon, the rocky northern end of Kamala traps wave-tumbled glass from the Andaman Sea. Green and brown beer-bottle glass is common, but patient hunters find rarer whites, aquas, and occasionally cobalt blue pieces.",
        "## Tips for Sea Glass Hunting in Thailand",
        "**Best season:** November through February, after the monsoon has churned up the sea floor and deposited new material. **Best time of day:** Early morning at low tide, before other beachgoers arrive. **What to bring:** A mesh bag or small bucket, sunscreen, and a keen eye — Thai sea glass tends to be smaller than North American or European pieces due to warmer water and faster tumbling cycles. **Track your finds:** Use [Sea Glass Map](https://seaglassmap.com) to pin your discoveries and see where other collectors have found sea glass in Thailand.",
      ],
    },
    th: {
      title: "ชายหาดซีกลาสที่ดีที่สุดในไทย: 10 จุดยอดนิยมสำหรับนักล่า",
      excerpt:
        "ค้นพบชายหาดซีกลาสที่ดีที่สุดในไทย — ตั้งแต่อ่าวไทยถึงทะเลอันดามัน คู่มือเผยจุดล่าซีกลาส 10 อันดับแรกที่นักสะสมพบสีหายากและสมบัติล้ำค่า",
      metaDescription:
        "ค้นหาชายหาดซีกลาสที่ดีที่สุดในไทย 10 จุดล่าซีกลาสยอดนิยมตามชายฝั่งอ่าวไทยและอันดามัน พร้อมเคล็ดลับการค้นหาสีหายาก",
      content: [
        "แนวชายฝั่งยาว 3,219 กิโลเมตรของประเทศไทยซ่อนจุดล่าซีกลาสที่ดีที่สุดในเอเชียตะวันออกเฉียงใต้ ไม่ว่าคุณจะเป็นนักสะสมผู้มีประสบการณ์หรือมือใหม่ที่สนใจการเดินตามชายหาดล่าซีกลาสในไทย การผสมผสานของเส้นทางการค้าประวัติศาสตร์ ชายฝั่งเมือง และกระแสน้ำมรสุมที่ทรงพลังสร้างสภาพแวดล้อมที่เหมาะสมสำหรับการค้นหาสมบัติแก้วที่ถูกขัดเงา",
        "![เศษซีกลาสบนทรายไทยยามพระอาทิตย์ตก](/images/blog/sea-glass-on-sand.jpg)",
        "## 1. เกาะล้าน, ชลบุรี",
        "อยู่ห่างจากพัทยาเพียงเรือข้ามฟาก ชายหาดฝั่งตะวันตกของเกาะล้าน โดยเฉพาะหาดตาแหวนและหาดเสม็ด เป็นที่นิยมในหมู่นักสะสมซีกลาส การท่องเที่ยวหลายทศวรรษและการพัฒนาเมืองใกล้เคียงทำให้มีแก้วไหลเข้าสู่กระแสน้ำอย่างต่อเนื่อง มาเยือนหลังฤดูมรสุม (พฤศจิกายน–กุมภาพันธ์) เพื่อผลลัพธ์ที่ดีที่สุด",
        "## 2. หาดบางแสน, ชลบุรี",
        "หาดยอดนิยมของคนท้องถิ่นทางเหนือของพัทยามีซีกลาสให้เก็บได้ดีอย่างน่าประหลาดใจ โดยเฉพาะบริเวณโขดหินทางด้านใต้ กิจกรรมประมงและปากแม่น้ำใกล้เคียงนำมาซึ่งสีซีกลาสที่หลากหลาย",
        "## 3. หาดหัวหินตอนใต้",
        "แนวหาดทางใต้ของตัวเมืองหัวหิน ไปทางเขาตะเกียบ รับแก้วที่ถูกพัดพามาโดยกระแสน้ำชายฝั่งจากอ่าวไทยตอนบน เช้าตรู่ตอนน้ำลงเหมาะที่สุดสำหรับการล่าซีกลาส",
        "## 4. เกาะสีชัง, ชลบุรี",
        "เกาะที่ไม่ค่อยเป็นที่รู้จักใกล้ศรีราชามีประวัติศาสตร์ทางทะเลยาวนาน ด้านท่าเรือของเกาะสะสมเศษแก้วจากกิจกรรมการเดินเรือหลายทศวรรษ มีรายงานพบซีกลาสสีน้ำเงินโคบอลต์และอำพันที่หายาก",
        "## 5. บริเวณแหลมฉบัง",
        "ชายหาดรอบท่าเรือพาณิชย์ที่ใหญ่ที่สุดของไทยมีวัสดุที่ถูกทับถมมาก นักล่าที่ทุ่มเทสามารถพบสีแก้วอุตสาหกรรมที่ไม่พบที่อื่น",
        "![ชายฝั่งเขตร้อนไทยกับน้ำสีฟ้าครามและแนวหิน](/images/blog/thai-coastline.jpg)",
        "## 6. เกาะพะงัน — หาดริ้น",
        "มีชื่อเสียงจากฟูลมูนปาร์ตี้ หาดริ้นยังให้รางวัลแก่นักล่าซีกลาสที่อดทน กิจกรรมริมชายหาดหลายปีทิ้งมรดกหลากสีที่ถูกคลื่นขัดเงา",
        "## 7. เกาะลันตา — ฝั่งเมืองเก่า",
        "ฝั่งตะวันออกของเกาะลันตาใกล้เมืองเก่ามีแนวหินที่แก้วจากท่าเรือค้าขายเดิมสะสมอยู่ มองหาตามเศษปะการังเมื่อน้ำลง",
        "## 8. สงขลา — หาดสมิหลา",
        "เมืองท่าประวัติศาสตร์ของภาคใต้ให้ผลลัพธ์ซีกลาสที่ยอดเยี่ยม หาดทรายยาวที่มีทะเลสาบอยู่ด้านหลังสร้างกับดักธรรมชาติสำหรับเศษวัสดุ — อัญมณีซ่อนเร้นสำหรับนักล่าซีกลาสในไทย",
        "## 9. ชายฝั่งระยอง",
        "แนวชายฝั่งระหว่างบ้านเพและแม่รำพึงมีอ่าวเล็กๆ หลายแห่งที่แก้วสะสม ปากแม่น้ำตามแนวนี้พัดพาแก้วจากแหล่งในแผ่นดิน ทำให้แต่ละอ่าวเป็นขุมทรัพย์ของสีซีกลาส",
        "## 10. ภูเก็ต — หาดกมลา (ปลายเหนือ)",
        "หลังมรสุมตะวันตกเฉียงใต้ ปลายเหนือที่เป็นหินของกมลาดักแก้วที่ถูกคลื่นกลิ้งจากทะเลอันดามัน แก้วสีเขียวและน้ำตาลจากขวดเบียร์พบได้ทั่วไป แต่นักล่าที่อดทนจะพบสีขาว อะความารีน และบางครั้งสีน้ำเงินโคบอลต์ที่หายาก",
        "## เคล็ดลับการล่าซีกลาสในไทย",
        "**ฤดูกาลที่ดีที่สุด:** พฤศจิกายนถึงกุมภาพันธ์ หลังมรสุมกวนพื้นทะเลและทับถมวัสดุใหม่ **เวลาที่ดีที่สุด:** เช้าตรู่เมื่อน้ำลง ก่อนนักท่องเที่ยวคนอื่นมาถึง **สิ่งที่ควรนำ:** ถุงตาข่ายหรือถังเล็ก ครีมกันแดด และสายตาที่แหลมคม — ซีกลาสในไทยมักมีขนาดเล็กกว่าในอเมริกาเหนือหรือยุโรป **บันทึกการค้นพบ:** ใช้ [Sea Glass Map](https://seaglassmap.com) เพื่อปักหมุดสิ่งที่คุณค้นพบและดูว่านักสะสมคนอื่นพบซีกลาสที่ไหนในไทย",
      ],
    },
  },
  "what-is-sea-glass-complete-guide": {
    en: {
      title: "What Is Sea Glass? The Complete Guide to Colors, Rarity & How to Find It",
      excerpt:
        "Everything you need to know about sea glass — how it forms over decades in the ocean, the complete sea glass color rarity chart from common whites to ultra-rare reds, and expert tips on where to find sea glass on beaches worldwide.",
      metaDescription:
        "What is sea glass and how does it form? Complete guide covering the sea glass color rarity chart, best beaches for sea glass hunting, and tips to start your collection.",
      content: [
        "Sea glass is one of nature's most beautiful recycling projects. Born from discarded bottles, jars, and tableware, these frosted fragments are tumbled by ocean waves and sand over decades until they become smooth, jewel-like treasures prized by sea glass collectors worldwide. If you've ever wondered how to find sea glass or what makes certain sea glass colors so valuable, this guide covers everything you need to know.",
        "![Colorful sea glass collection sorted by color rarity](/images/blog/sea-glass-colors.jpg)",
        "## How Sea Glass Forms",
        "The journey from trash to treasure takes between 20 and 50 years, sometimes longer. When glass enters the ocean — from a broken bottle tossed off a ship, a seaside dump, or a river carrying urban waste — the transformation begins. Saltwater chemically etches the surface through a process called hydration, while sand and rocks physically abrade the edges. The result is the signature frosted, pitted texture that distinguishes genuine sea glass from craft imitations. Understanding this process is key for anyone interested in beachcombing and sea glass collecting.",
        "## Sea Glass Colors and Rarity Chart",
        "Not all sea glass is created equal. Color rarity depends on the original glass source — here's the definitive sea glass rarity chart:",
        "**Common colors (easy to find):** White/clear (from bottles and windows), brown (beer bottles), and green (wine and soda bottles) make up about 75% of all sea glass found worldwide. These are perfect for beginners just starting their sea glass collection.",
        "**Uncommon colors:** Seafoam green, soft blue (from old medicine and ink bottles), and olive green are less common but regularly found at productive sea glass beaches.",
        "**Rare sea glass colors:** Cobalt blue (from Noxzema jars, Milk of Magnesia bottles), aqua (from old Ball mason jars and insulators), and amber/golden make up less than 5% of finds.",
        "**Ultra-rare colors:** Red (from vintage car taillights, nautical lanterns, and Anchor Hocking tableware), orange (from decorative art glass), yellow (from Depression-era tableware), and black (from very old bottles, often appearing dark olive or deep amber when held to light) are the holy grail for sea glass collectors. These represent less than 1% of all sea glass — finding one is a once-in-a-lifetime thrill.",
        "## Where to Find Sea Glass: Best Beaches",
        "The best sea glass beaches share a few key characteristics that every beachcomber should look for:",
        "**Proximity to historical glass sources** — old dumps, ports, fishing villages, and areas with decades of human coastal activity generate the raw material. **Rocky or pebbly shorelines** tend to trap and tumble glass more effectively than smooth, flat sand beaches. **Strong wave action and currents** accelerate the tumbling process. **River mouths** carry glass from inland sources and deposit it along nearby coasts. Use [Sea Glass Map](https://seaglassmap.com) to discover sea glass hunting spots shared by collectors worldwide.",
        "![Sandy beach at low tide, ideal conditions for sea glass hunting](/images/blog/beach-low-tide.jpg)",
        "## How to Start Sea Glass Collecting",
        "Getting started with sea glass collecting is simple: visit a beach, look down, and start picking. But a few sea glass hunting tips will dramatically improve your success:",
        "**Go at low tide.** More beach is exposed, and glass that normally sits in shallow water becomes accessible. **Walk the tide line.** Sea glass concentrates along the wrack line where waves deposit material. **Look after storms.** Rough seas churn up glass from the sea floor and deposit fresh pieces on shore. **Bring a small mesh bag.** It lets sand fall through while you keep collecting. **Be patient and systematic.** Walk slowly, scan methodically, and check among pebbles and shell hash — sea glass often hides in plain sight.",
        "## The Sea Glass Collector Community",
        "Sea glass collecting has grown from a casual beach pastime into a vibrant global community. Online platforms like [Sea Glass Map](https://seaglassmap.com) let collectors share locations, compare finds, and connect across borders. Festivals, Facebook groups, and dedicated forums bring sea glass enthusiasts together. Some collectors focus on building color-complete collections, while others hunt for rare historical pieces or create sea glass jewelry and art from their finds.",
        "## Is Collecting Sea Glass Legal?",
        "In most places, picking up sea glass from public beaches is perfectly legal. However, some protected areas — national parks, marine reserves, and heritage coastlines — prohibit removing any natural or man-made material. Always check local regulations before collecting, and respect signage at the beach. Sea Glass Map marks protected areas on the map so you can plan your beachcombing trips accordingly.",
      ],
    },
    th: {
      title: "ซีกลาสคืออะไร? คู่มือฉบับสมบูรณ์ — สี ความหายาก และวิธีค้นหา",
      excerpt:
        "ทุกสิ่งที่ต้องรู้เกี่ยวกับซีกลาส — มันเกิดขึ้นอย่างไรในมหาสมุทร ตารางความหายากสีซีกลาสจากสีขาวทั่วไปถึงสีแดงหายากมาก และเคล็ดลับจากผู้เชี่ยวชาญว่าจะหาซีกลาสได้ที่ไหน",
      metaDescription:
        "ซีกลาสคืออะไรและเกิดขึ้นได้อย่างไร? คู่มือฉบับสมบูรณ์ครอบคลุมตารางความหายากสีซีกลาส ชายหาดที่ดีที่สุด และเคล็ดลับในการเริ่มสะสม",
      content: [
        "ซีกลาสเป็นหนึ่งในโปรเจกต์รีไซเคิลที่สวยงามที่สุดของธรรมชาติ เกิดจากขวด ไห และเครื่องใช้บนโต๊ะอาหารที่ถูกทิ้ง เศษแก้วฝ้าเหล่านี้ถูกคลื่นทะเลและทรายกลิ้งตลอดหลายทศวรรษจนกลายเป็นสมบัติเรียบลื่นคล้ายอัญมณีที่นักสะสมซีกลาสทั่วโลกหวงแหน หากคุณเคยสงสัยว่าจะหาซีกลาสได้อย่างไรหรืออะไรทำให้สีซีกลาสบางสีมีค่า คู่มือนี้ครอบคลุมทุกสิ่งที่คุณต้องรู้",
        "![คอลเลกชันซีกลาสหลากสีเรียงตามความหายาก](/images/blog/sea-glass-colors.jpg)",
        "## ซีกลาสเกิดขึ้นได้อย่างไร",
        "การเดินทางจากขยะสู่สมบัติใช้เวลาระหว่าง 20 ถึง 50 ปี บางครั้งนานกว่านั้น เมื่อแก้วเข้าสู่มหาสมุทร น้ำเค็มจะกัดกร่อนพื้นผิวผ่านกระบวนการที่เรียกว่าไฮเดรชัน ในขณะที่ทรายและหินจะขัดขอบทางกายภาพ ผลลัพธ์คือพื้นผิวฝ้าและเป็นหลุมที่เป็นเอกลักษณ์ของซีกลาสแท้ การเข้าใจกระบวนการนี้สำคัญสำหรับทุกคนที่สนใจการเดินตามชายหาดและสะสมซีกลาส",
        "## ตารางสีซีกลาสและความหายาก",
        "ไม่ใช่ซีกลาสทุกชิ้นจะเท่ากัน ความหายากของสีขึ้นอยู่กับแหล่งแก้วดั้งเดิม — นี่คือตารางความหายากซีกลาสฉบับสมบูรณ์:",
        "**สีทั่วไป (หาง่าย):** ขาว/ใส (จากขวดและหน้าต่าง) น้ำตาล (ขวดเบียร์) และเขียว (ขวดไวน์และน้ำอัดลม) คิดเป็นประมาณ 75% ของซีกลาสทั้งหมดที่พบทั่วโลก เหมาะสำหรับมือใหม่ที่เริ่มสะสม",
        "**สีไม่ธรรมดา:** เขียวทะเล ฟ้าอ่อน (จากขวดยาและหมึกเก่า) และเขียวมะกอก พบได้น้อยกว่าแต่พบเป็นประจำที่ชายหาดซีกลาสที่ดี",
        "**สีซีกลาสหายาก:** น้ำเงินโคบอลต์ อะความารีน และอำพัน/ทอง คิดเป็นน้อยกว่า 5% ของการค้นพบ",
        "**สีหายากมาก:** แดง ส้ม เหลือง และดำ เป็นสิ่งที่นักสะสมซีกลาสตามหามากที่สุด สีเหล่านี้คิดเป็นน้อยกว่า 1% ของซีกลาสทั้งหมด — การพบหนึ่งชิ้นเป็นความตื่นเต้นที่หาได้ยากในชีวิต",
        "## จะหาซีกลาสได้ที่ไหน: ชายหาดที่ดีที่สุด",
        "ชายหาดซีกลาสที่ดีที่สุดมีลักษณะร่วมกันหลายอย่างที่นักเดินชายหาดควรมองหา: ใกล้แหล่งแก้วทางประวัติศาสตร์ แนวหินหรือกรวด คลื่นและกระแสน้ำที่แรง และปากแม่น้ำ ใช้ [Sea Glass Map](https://seaglassmap.com) เพื่อค้นพบจุดล่าซีกลาสที่นักสะสมทั่วโลกแชร์ไว้",
        "![หาดทรายตอนน้ำลง สภาพเหมาะสมสำหรับล่าซีกลาส](/images/blog/beach-low-tide.jpg)",
        "## วิธีเริ่มสะสมซีกลาส",
        "**ไปตอนน้ำลง** จะมีชายหาดมากขึ้นให้สำรวจ **เดินตามแนวน้ำขึ้น** ซีกลาสจะกระจุกตัวตามแนวที่คลื่นทับถมวัสดุ **ดูหลังพายุ** ทะเลที่ปั่นป่วนจะกวนแก้วจากพื้นทะเล **นำถุงตาข่าย** ทรายจะร่วงผ่านขณะที่คุณเก็บต่อไป **อดทนและเป็นระบบ** เดินช้าๆ สแกนอย่างเป็นระบบ และตรวจดูตามกรวดและเศษเปลือกหอย",
        "## ชุมชนนักสะสมซีกลาส",
        "การสะสมซีกลาสเติบโตจากกิจกรรมชายหาดทั่วไปเป็นชุมชนระดับโลกที่มีชีวิตชีวา แพลตฟอร์มออนไลน์อย่าง [Sea Glass Map](https://seaglassmap.com) ช่วยให้นักสะสมแชร์สถานที่ เปรียบเทียบการค้นพบ และเชื่อมต่อข้ามพรมแดน นักสะสมบางคนมุ่งสร้างคอลเลกชันครบทุกสี คนอื่นล่าชิ้นประวัติศาสตร์หายากหรือทำเครื่องประดับซีกลาสจากสิ่งที่เก็บได้",
        "## การสะสมซีกลาสถูกกฎหมายหรือไม่?",
        "ในที่ส่วนใหญ่ การเก็บซีกลาสจากชายหาดสาธารณะเป็นเรื่องถูกกฎหมาย อย่างไรก็ตาม พื้นที่คุ้มครองบางแห่งห้ามนำวัสดุใดๆ ออก ตรวจสอบกฎระเบียบท้องถิ่นก่อนเก็บเสมอ Sea Glass Map ทำเครื่องหมายพื้นที่คุ้มครองบนแผนที่เพื่อให้คุณวางแผนการเดินชายหาดได้",
      ],
    },
  },
  "sea-glass-jewelry-diy-guide": {
    en: {
      title: "How to Make Sea Glass Jewelry: Wire Wrapping, Drilling & DIY Techniques",
      excerpt:
        "Turn your beach finds into wearable art with this beginner-friendly DIY guide. Learn sea glass wire wrapping, drilling techniques, and bezel setting to create stunning sea glass necklaces, earrings, and rings at home.",
      metaDescription:
        "Learn how to make sea glass jewelry at home. Beginner DIY guide to sea glass wire wrapping, drilling, and bezel setting for necklaces, earrings, and rings.",
      content: [
        "You've spent hours beachcombing and built a beautiful sea glass collection. Now what? Turning your finds into handcrafted sea glass jewelry is one of the most rewarding ways to showcase your treasures — and it's easier than you might think. Whether you want to make sea glass necklaces, earrings, or rings, this guide covers every technique you need.",
        "![Handcrafted jewelry tools and supplies for sea glass projects](/images/blog/wire-wrapping.jpg)",
        "## Choosing the Right Sea Glass Pieces",
        "Not every piece of sea glass makes great jewelry. Look for these qualities when selecting pieces from your collection:",
        "**Well-frosted surface** — the thick, frosty patina that develops over decades is what makes sea glass beautiful. Shiny or partially frosted pieces haven't been tumbled long enough. **Pleasing shape** — triangular, oval, and teardrop shapes work best for pendants. Flat, rounded pieces are ideal for rings and earrings. **Good size** — pendant pieces should be roughly 2–4 cm. Earring pieces should be small and well-matched in size and color. **No cracks** — cracked glass may break during drilling or sea glass wire wrapping.",
        "## Method 1: Sea Glass Wire Wrapping (Easiest)",
        "Wire wrapping is the easiest way to start making sea glass jewelry — and the most popular technique among sea glass collectors. You don't need to drill the glass, and the materials cost just a few dollars.",
        "**What you need:** 20-gauge craft wire (silver, gold, or copper), round-nose pliers, flat-nose pliers, wire cutters, and your sea glass.",
        "**Steps:** Cut about 30 cm of wire. Create a small loop at one end using round-nose pliers — this will be your bail (where the chain goes through). Place your sea glass piece against the wire, just below the loop. Wrap the wire around the glass, crossing at the back to create tension. Continue wrapping 2–3 times, keeping the wire snug but not too tight. Tuck the end of the wire neatly against the back of the piece. Thread a chain or cord through the bail loop.",
        "## Method 2: Drilling Sea Glass",
        "Drilling opens up many more design possibilities — drilled pieces can be hung directly, linked together, or attached to findings with jump rings.",
        "**What you need:** A rotary tool (Dremel) with a diamond-coated drill bit (1.5–2 mm), a shallow dish of water, masking tape, and safety glasses.",
        "**Steps:** Place masking tape on both sides of the glass where you want to drill — this prevents chipping and marks your spot. Submerge the glass in about 1 cm of water in your dish. Start drilling at a 45-degree angle to create a small notch, then straighten to 90 degrees. Use light, steady pressure — let the drill do the work. Keep the glass submerged; the water cools the bit and prevents cracking. A single hole takes 2–5 minutes depending on glass thickness.",
        "![Beachcomber searching for sea glass on a sandy shore](/images/blog/beachcombing.jpg)",
        "## Method 3: Bezel Setting",
        "For a more polished, professional look, bezel settings frame the sea glass in metal. You can buy pre-made bezel cups or cut bezel wire to custom-fit your sea glass pieces.",
        "**What you need:** Bezel cups or bezel wire (fine silver is easiest to work with), E6000 adhesive or two-part epoxy, a burnishing tool, and earring posts or pendant bails.",
        "**Steps:** Select a bezel cup that fits your glass snugly with 1–2 mm of metal extending above the glass edge. Clean both the glass and the cup with rubbing alcohol. Apply a thin layer of adhesive to the cup interior. Press the glass firmly into the cup. Once dry, use a burnishing tool to gently push the bezel wall against the glass edge. Attach your finding (earring post, bail, etc.).",
        "## Care Tips for Sea Glass Jewelry",
        "Sea glass jewelry lasts a long time with basic care. Avoid exposing wire-wrapped pieces to water — this tarnishes copper and silver wire over time. Store pieces individually to prevent scratching. Clean gently with a soft cloth. If the sea glass loses its frosty look, a very light sanding with 600-grit sandpaper restores the matte finish.",
        "## Selling Your Sea Glass Jewelry Creations",
        "Handmade sea glass jewelry is popular on Etsy, at craft markets, and in beach-town boutiques. Pieces made from rare sea glass colors (cobalt blue, red, lavender) command premium prices. Always disclose if glass is genuine sea glass versus tumbled craft glass — sea glass collectors and buyers value authenticity. Include the story of where you found the glass to add personal value. Share your creations on [Sea Glass Map](https://seaglassmap.com) to connect with the sea glass community worldwide.",
      ],
    },
    th: {
      title: "วิธีทำเครื่องประดับซีกลาส: พันลวด เจาะ และเทคนิค DIY",
      excerpt:
        "เปลี่ยนสิ่งที่เก็บจากชายหาดเป็นงานศิลปะที่สวมใส่ได้ เรียนรู้เทคนิคพันลวดซีกลาส การเจาะ และเซ็ตเบเซลเพื่อสร้างสร้อยคอ ต่างหู และแหวนซีกลาสที่สวยงามที่บ้าน",
      metaDescription:
        "เรียนรู้วิธีทำเครื่องประดับซีกลาสที่บ้าน คู่มือ DIY สำหรับมือใหม่ครอบคลุมเทคนิคพันลวด เจาะ และเซ็ตเบเซลสำหรับสร้อยคอ ต่างหู และแหวน",
      content: [
        "คุณใช้เวลาหลายชั่วโมงเดินตามชายหาดและสร้างคอลเลกชันซีกลาสที่สวยงาม ตอนนี้จะทำอย่างไรต่อ? การเปลี่ยนสิ่งที่คุณเก็บได้เป็นเครื่องประดับซีกลาสทำมือเป็นวิธีที่คุ้มค่าที่สุดในการโชว์สมบัติของคุณ ไม่ว่าจะทำสร้อยคอ ต่างหู หรือแหวนซีกลาส คู่มือนี้ครอบคลุมทุกเทคนิคที่ต้องการ",
        "![เครื่องมือทำเครื่องประดับและอุปกรณ์สำหรับโปรเจกต์ซีกลาส](/images/blog/wire-wrapping.jpg)",
        "## เลือกชิ้นซีกลาสที่เหมาะสม",
        "ไม่ใช่ซีกลาสทุกชิ้นที่เหมาะทำเครื่องประดับ มองหาคุณสมบัติเหล่านี้: **พื้นผิวฝ้าดี** — เกิดจากการถูกคลื่นกลิ้งหลายทศวรรษ **รูปร่างสวย** — สามเหลี่ยม รี และหยดน้ำเหมาะสำหรับจี้ **ขนาดเหมาะสม** — 2-4 ซม. สำหรับจี้ **ไม่มีรอยแตก** — อาจแตกระหว่างเจาะหรือพันลวด",
        "## วิธีที่ 1: พันลวดซีกลาส (ง่ายที่สุด)",
        "การพันลวดเป็นวิธีที่ง่ายที่สุดในการเริ่มทำเครื่องประดับซีกลาส และเป็นเทคนิคที่นิยมที่สุดในหมู่นักสะสม คุณไม่ต้องเจาะแก้ว และวัสดุมีราคาเพียงไม่กี่บาท",
        "**สิ่งที่ต้องการ:** ลวดงานฝีมือ 20-gauge คีมปากกลม คีมปากแบน คีมตัดลวด และซีกลาสของคุณ",
        "**ขั้นตอน:** ตัดลวดยาวประมาณ 30 ซม. สร้างห่วงเล็กที่ปลายด้านหนึ่ง วางซีกลาสบนลวดใต้ห่วง พันลวดรอบแก้ว 2-3 รอบ ซ่อนปลายลวดไว้ด้านหลัง ร้อยโซ่หรือเชือกผ่านห่วง",
        "## วิธีที่ 2: เจาะซีกลาส",
        "การเจาะเปิดโอกาสการออกแบบมากขึ้น ชิ้นที่เจาะแล้วสามารถแขวนโดยตรง เชื่อมต่อกัน หรือติดกับอุปกรณ์ด้วยห่วง",
        "**สิ่งที่ต้องการ:** เครื่องมือโรตารี (Dremel) กับดอกสว่านเคลือบเพชร จานน้ำตื้น เทปกาว และแว่นตานิรภัย",
        "**ขั้นตอน:** ติดเทปทั้งสองด้านของแก้วตรงจุดที่ต้องการเจาะ จุ่มแก้วในน้ำลึกประมาณ 1 ซม. เริ่มเจาะที่มุม 45 องศาแล้วตั้งตรงเป็น 90 องศา ใช้แรงกดเบาๆ สม่ำเสมอ",
        "![นักเดินชายหาดค้นหาซีกลาสบนหาดทราย](/images/blog/beachcombing.jpg)",
        "## วิธีที่ 3: เซ็ตเบเซล",
        "สำหรับลุคที่เรียบหรูกว่า เบเซลเซ็ตจะกรอบซีกลาสด้วยโลหะ คุณสามารถซื้อถ้วยเบเซลสำเร็จรูปหรือตัดลวดเบเซลให้พอดีกับชิ้นซีกลาสของคุณ",
        "**สิ่งที่ต้องการ:** ถ้วยเบเซลหรือลวดเบเซล (เงินบริสุทธิ์ใช้ง่ายที่สุด) กาว E6000 หรืออีพ็อกซี่สองส่วน เครื่องมือขัดเงา และขาต่างหูหรือห่วงจี้",
        "**ขั้นตอน:** เลือกถ้วยเบเซลที่พอดีกับแก้ว ทำความสะอาดทั้งแก้วและถ้วยด้วยแอลกอฮอล์ ทากาวบางๆ กดแก้วลงในถ้วย เมื่อแห้งแล้วใช้เครื่องมือดันผนังเบเซลให้แนบขอบแก้ว",
        "## เคล็ดลับการดูแลเครื่องประดับซีกลาส",
        "เครื่องประดับซีกลาสทนทานด้วยการดูแลพื้นฐาน หลีกเลี่ยงการสัมผัสน้ำกับชิ้นที่พันลวด เก็บแยกชิ้นเพื่อป้องกันรอยขีดข่วน ทำความสะอาดเบาๆ ด้วยผ้านุ่ม",
        "## ขายผลงานเครื่องประดับซีกลาสของคุณ",
        "เครื่องประดับซีกลาสทำมือเป็นที่นิยมในตลาดออนไลน์และงานคราฟต์ ชิ้นงานจากสีซีกลาสหายาก (น้ำเงินโคบอลต์ แดง ลาเวนเดอร์) มีราคาสูงกว่า เปิดเผยเสมอว่าเป็นซีกลาสแท้เพื่อสร้างความน่าเชื่อถือ แชร์ผลงานของคุณบน [Sea Glass Map](https://seaglassmap.com) เพื่อเชื่อมต่อกับชุมชนซีกลาสทั่วโลก",
      ],
    },
  },
};

const postMeta: BlogPost[] = [
  {
    slug: "best-sea-glass-beaches-thailand",
    image: "/images/blog/thailand-beach-hero.jpg",
    date: "2026-02-20",
    readingTime: 8,
  },
  {
    slug: "what-is-sea-glass-complete-guide",
    image: "/images/blog/sea-glass-collection-hero.jpg",
    date: "2026-02-15",
    readingTime: 10,
  },
  {
    slug: "sea-glass-jewelry-diy-guide",
    image: "/images/blog/sea-glass-jewelry-hero.jpg",
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
