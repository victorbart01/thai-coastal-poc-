"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Users, Compass, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AboutClient() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-ocean-950">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-ocean-950/80 px-4 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("profile.backToMap")}
        </Link>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("about.title")}
        </h2>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary">
          {locale === "th" ? "เกี่ยวกับ Sea Glass Map" : "About Sea Glass Map"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-body">
          {locale === "th"
            ? "Sea Glass Map เป็นแพลตฟอร์มชุมชนระดับโลกสำหรับนักสะสมซีกลาสและนักเดินชายหาด แชร์จุดล่าซีกลาสที่คุณค้นพบ สำรวจชายหาดที่ดีที่สุดสำหรับหาซีกลาส และเชื่อมต่อกับชุมชนนักสะสมที่กำลังเติบโตจากทั่วทุกมุมโลก"
            : "Sea Glass Map is the global community platform for sea glass collectors and beachcombers. Share your sea glass hunting spots, explore the best beaches for sea glass, and connect with a growing community of collectors from around the world."}
        </p>

        <div className="mt-10 space-y-8">
          {/* What is Sea Glass Map */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-glass-500" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary">
                {locale === "th" ? "Sea Glass Map คืออะไร?" : "What Is Sea Glass Map?"}
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-text-body">
              <p>
                {locale === "th"
                  ? "Sea Glass Map เป็นแผนที่เชิงโต้ตอบที่ขับเคลื่อนโดยชุมชน ซึ่งนักสะสมซีกลาสจากทั่วโลกแชร์ชายหาดและจุดล่าซีกลาสที่พวกเขาชื่นชอบ แผนที่ทุกจุดคือจุดจริงที่ยืนยันโดยนักสะสม — พร้อมรูปภาพ คะแนน และเคล็ดลับเพื่อช่วยให้คุณค้นพบสถานที่ใหม่ๆ สำหรับหาซีกลาส"
                  : "Sea Glass Map is a community-driven interactive map where sea glass collectors from around the world share their favorite beaches and sea glass hunting spots. Every pin on the map is a real location verified by a collector — complete with photos, ratings, and tips to help you discover new places to find sea glass."}
              </p>
              <p>
                {locale === "th"
                  ? "ไม่ว่าคุณจะเป็นนักเดินชายหาดผู้มีประสบการณ์หรือเพิ่งเริ่มต้น Sea Glass Map ช่วยให้คุณค้นหาชายหาดซีกลาสที่ดีที่สุดใกล้บ้านหรือวางแผนทริปถัดไปที่จุดหมายปลายทางของนักล่าซีกลาสที่ยอดเยี่ยม"
                  : "Whether you're an experienced beachcomber or just getting started, Sea Glass Map helps you find the best sea glass beaches near you or plan your next trip to a world-class sea glass hunting destination."}
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-glass-500" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary">
                {locale === "th" ? "พันธกิจของเรา" : "Our Mission"}
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-text-body">
              <p>
                {locale === "th"
                  ? "พันธกิจของเราคือการเชื่อมต่อนักสะสมซีกลาส อนุรักษ์ความรู้เกี่ยวกับสถานที่ซีกลาสที่ดีที่สุด และเฉลิมฉลองศิลปะแห่งการเดินตามชายหาด เราเชื่อว่าทุกชิ้นส่วนของซีกลาสมีเรื่องราว — และทุกนักสะสมสมควรมีชุมชนเพื่อแชร์ด้วย"
                  : "Our mission is to connect sea glass collectors, preserve knowledge about the best sea glass locations, and celebrate the art of beachcombing. We believe every piece of sea glass has a story — and every collector deserves a community to share it with."}
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Compass className="h-5 w-5 text-glass-500" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary">
                {locale === "th" ? "ใช้งานอย่างไร" : "How It Works"}
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-text-body">
              <p>
                {locale === "th"
                  ? "ปักหมุดบนแผนที่เพื่อแชร์จุดซีกลาสของคุณ อัปโหลดรูปถ่ายสิ่งที่คุณเก็บได้ และค้นพบจุดใหม่ๆ ที่เพื่อนนักสะสมแชร์ไว้ ยิ่งชุมชนร่วมสร้างมากเท่าไหร่ แผนที่ก็ยิ่งมีคุณค่าสำหรับทุกคน"
                  : "Drop pins on the map to share your sea glass spots, upload photos of your finds, and discover new locations shared by fellow collectors. The more the community contributes, the richer the map becomes for everyone."}
              </p>
              <p>
                {locale === "th"
                  ? "นอกจากจุดจากชุมชนแล้ว Sea Glass Map ยังมีโซนความน่าจะเป็นจากข้อมูลทางสมุทรศาสตร์ ธรณีสัณฐาน อุทกวิทยา และประวัติศาสตร์ การประมาณเชิงอัลกอริทึมเหล่านี้ช่วยชี้พื้นที่ชายฝั่งที่ซีกลาสน่าจะสะสมตามธรรมชาติ — เปิดใช้โซนความน่าจะเป็นผ่านตัวควบคุมแผนที่"
                  : "In addition to community spots, Sea Glass Map features probability zones based on oceanographic, geomorphological, hydrological, and historical data. These algorithmic estimates highlight coastal areas where sea glass is more likely to accumulate naturally — toggle probability zones on via the map controls to explore these data-driven insights alongside real community finds."}
              </p>
            </div>
          </section>

          {/* Join the Community */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-glass-500" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary">
                {locale === "th" ? "เข้าร่วมชุมชน" : "Join the Sea Glass Community"}
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-text-body">
              <p>
                {locale === "th"
                  ? "สร้างบัญชีฟรีเพื่อเริ่มแชร์จุดล่าซีกลาสของคุณ บันทึกสถานที่โปรด แสดงความคิดเห็น และปีนอันดับลีดเดอร์บอร์ด ไม่ว่าคุณจะกำลังสำรวจชายหาดซีกลาสในไทย เดินตามชายหาดในยุโรป หรือล่าสีหายากในอเมริกาเหนือ — ชุมชน Sea Glass Map ยินดีต้อนรับคุณ"
                  : "Create a free account to start sharing your sea glass hunting spots, save favorite locations, comment on finds, and climb the leaderboard. Whether you're exploring sea glass beaches in Thailand, beachcombing across Europe, or hunting rare colors in North America — the Sea Glass Map community welcomes you."}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
