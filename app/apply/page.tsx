"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://axxwwqxypggpuhbbiwfy.supabase.co",
  "sb_publishable_IyUS3VaU0Ywyr0jGfgyiRA_xepjaEad"
)


type Lang = "ko" | "ne" | "lo" | "bn" | "km" | "th" | "vi"

const translations = {
  ko: {
    langLabel: "한국어",
    title: "다문화센터 신청",
    subtitle: "이름, 국적, 전화번호, 메시지를 입력해주세요.",
    free: "무료 신청",
    welcome: "외국인 누구나 환영합니다",
    first: "처음 오셔도 괜찮습니다",
    easy: "편하게 문의하세요",
    phoneButton: "전화하기",
    mapButton: "오시는 길",
    kakaoButton: "카카오톡 문의",
    infoTitle: "센터 안내",
    addressLabel: "주소",
    classLabel: "한국어 수업",
    address: "경기도 파주시 문산읍 독산로35번길 26",
    classTime: "매주 토요일 오후 2시 ~ 5시",
    name: "이름",
    nationality: "국적",
    phone: "전화번호",
    message: "메시지",
    submit: "신청하기",
    required: "모든 항목을 입력해주세요.",
    successTitle: "신청이 완료되었습니다",
    successDesc: "곧 연락드리겠습니다. 감사합니다.",
    again: "다시 신청하기",
    fail: "신청 실패",
  },
  ne: {
    langLabel: "नेपाली",
    title: "बहुसांस्कृतिक केन्द्र आवेदन",
    subtitle: "कृपया आफ्नो नाम, देश, फोन नम्बर र सन्देश लेख्नुहोस्।",
    free: "निःशुल्क आवेदन",
    welcome: "सबै विदेशीलाई स्वागत छ",
    first: "पहिलो पटक आए पनि ठीक छ",
    easy: "आरामसँग सोध्नुहोस्",
    phoneButton: "फोन गर्नुहोस्",
    mapButton: "नक्सा",
    kakaoButton: "काकाओटोक सोधपुछ",
    infoTitle: "केन्द्र जानकारी",
    addressLabel: "ठेगाना",
    classLabel: "कोरियन कक्षा",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "हरेक शनिबार दिउँसो 2 बजे ~ 5 बजे",
    name: "नाम",
    nationality: "देश",
    phone: "फोन नम्बर",
    message: "सन्देश",
    submit: "पठाउनुहोस्",
    required: "कृपया सबै जानकारी भर्नुहोस्।",
    successTitle: "आवेदन सफल भयो",
    successDesc: "हामी तपाईंलाई चाँडै सम्पर्क गर्नेछौं। धन्यवाद।",
    again: "फेरि आवेदन गर्नुहोस्",
    fail: "आवेदन असफल भयो",
  },
  lo: {
    langLabel: "ລາວ",
    title: "ສະໝັກສູນຫຼາຍວັດທະນະທຳ",
    subtitle: "ກະລຸນາປ້ອນຊື່, ປະເທດ, ເບີໂທ ແລະ ຂໍ້ຄວາມ",
    free: "ສະໝັກຟຣີ",
    welcome: "ຍິນດີຕ້ອນຮັບຄົນຕ່າງຊາດທຸກຄົນ",
    first: "ມາຄັ້ງທຳອິດກໍໄດ້",
    easy: "ສາມາດສອບຖາມໄດ້ຢ່າງສະບາຍ",
    phoneButton: "ໂທຫາ",
    mapButton: "ແຜນທີ່",
    kakaoButton: "ສອບຖາມ KakaoTalk",
    infoTitle: "ຂໍ້ມູນສູນ",
    addressLabel: "ທີ່ຢູ່",
    classLabel: "ຫ້ອງຮຽນພາສາເກົາຫຼີ",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "ທຸກວັນເສົາ 2 ໂມງແລງ ~ 5 ໂມງແລງ",
    name: "ຊື່",
    nationality: "ປະເທດ",
    phone: "ເບີໂທ",
    message: "ຂໍ້ຄວາມ",
    submit: "ສົ່ງ",
    required: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ.",
    successTitle: "ສົ່ງສຳເລັດແລ້ວ",
    successDesc: "ພວກເຮົາຈະຕິດຕໍ່ຫາທ່ານໃນໄວໆນີ້. ຂອບໃຈ.",
    again: "ສະໝັກອີກຄັ້ງ",
    fail: "ສົ່ງບໍ່ສຳເລັດ",
  },
  bn: {
    langLabel: "বাংলা",
    title: "বহুসাংস্কৃতিক কেন্দ্র আবেদন",
    subtitle: "আপনার নাম, দেশ, ফোন নম্বর এবং বার্তা লিখুন।",
    free: "ফ্রি আবেদন",
    welcome: "সব বিদেশিকে স্বাগতম",
    first: "প্রথমবার এলেও সমস্যা নেই",
    easy: "আরামে যোগাযোগ করুন",
    phoneButton: "ফোন করুন",
    mapButton: "মানচিত্র",
    kakaoButton: "কাকাওটক যোগাযোগ",
    infoTitle: "কেন্দ্রের তথ্য",
    addressLabel: "ঠিকানা",
    classLabel: "কোরিয়ান ক্লাস",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "প্রতি শনিবার দুপুর ২টা ~ ৫টা",
    name: "নাম",
    nationality: "দেশ",
    phone: "ফোন নম্বর",
    message: "বার্তা",
    submit: "পাঠান",
    required: "সব তথ্য পূরণ করুন।",
    successTitle: "আবেদন সম্পন্ন হয়েছে",
    successDesc: "আমরা শীঘ্রই যোগাযোগ করব। ধন্যবাদ।",
    again: "আবার আবেদন করুন",
    fail: "আবেদন ব্যর্থ হয়েছে",
  },
  km: {
    langLabel: "ខ្មែរ",
    title: "ពាក្យស្នើសុំមជ្ឈមណ្ឌលពហុវប្បធម៌",
    subtitle: "សូមបញ្ចូលឈ្មោះ ប្រទេស លេខទូរស័ព្ទ និងសារ។",
    free: "ដាក់ពាក្យឥតគិតថ្លៃ",
    welcome: "ស្វាគមន៍ជនបរទេសទាំងអស់",
    first: "មកលើកដំបូងក៏បាន",
    easy: "អាចសួរបានដោយសេរី",
    phoneButton: "ហៅទូរស័ព្ទ",
    mapButton: "ផែនទី",
    kakaoButton: "សួរតាម KakaoTalk",
    infoTitle: "ព័ត៌មានមជ្ឈមណ្ឌល",
    addressLabel: "អាសយដ្ឋាន",
    classLabel: "ថ្នាក់ភាសាកូរ៉េ",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "រៀងរាល់ថ្ងៃសៅរ៍ ម៉ោង 2 រសៀល ~ 5 ល្ងាច",
    name: "ឈ្មោះ",
    nationality: "ប្រទេស",
    phone: "លេខទូរស័ព្ទ",
    message: "សារ",
    submit: "ដាក់ស្នើ",
    required: "សូមបំពេញព័ត៌មានទាំងអស់។",
    successTitle: "ការដាក់ពាក្យបានជោគជ័យ",
    successDesc: "យើងនឹងទាក់ទងអ្នកឆាប់ៗនេះ។ សូមអរគុណ។",
    again: "ដាក់ពាក្យម្តងទៀត",
    fail: "ការដាក់ពាក្យបរាជ័យ",
  },
  th: {
    langLabel: "ไทย",
    title: "สมัครศูนย์พหุวัฒนธรรม",
    subtitle: "กรุณากรอกชื่อ ประเทศ เบอร์โทร และข้อความ",
    free: "สมัครฟรี",
    welcome: "ยินดีต้อนรับชาวต่างชาติทุกคน",
    first: "มาเป็นครั้งแรกก็ได้",
    easy: "สอบถามได้อย่างสบายใจ",
    phoneButton: "โทรหาเรา",
    mapButton: "แผนที่",
    kakaoButton: "สอบถาม KakaoTalk",
    infoTitle: "ข้อมูลศูนย์",
    addressLabel: "ที่อยู่",
    classLabel: "เรียนภาษาเกาหลี",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "ทุกวันเสาร์ เวลา 14:00 ~ 17:00 น.",
    name: "ชื่อ",
    nationality: "ประเทศ",
    phone: "เบอร์โทร",
    message: "ข้อความ",
    submit: "ส่ง",
    required: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
    successTitle: "ส่งใบสมัครเรียบร้อยแล้ว",
    successDesc: "เราจะติดต่อกลับโดยเร็ว ขอบคุณค่ะ/ครับ",
    again: "สมัครอีกครั้ง",
    fail: "ส่งใบสมัครไม่สำเร็จ",
  },
  vi: {
    langLabel: "Tiếng Việt",
    title: "Đăng ký trung tâm đa văn hóa",
    subtitle: "Vui lòng nhập tên, quốc gia, số điện thoại và nội dung.",
    free: "Đăng ký miễn phí",
    welcome: "Chào mừng tất cả người nước ngoài",
    first: "Lần đầu đến cũng không sao",
    easy: "Hãy liên hệ thoải mái",
    phoneButton: "Gọi điện",
    mapButton: "Bản đồ",
    kakaoButton: "Liên hệ KakaoTalk",
    infoTitle: "Thông tin trung tâm",
    addressLabel: "Địa chỉ",
    classLabel: "Lớp tiếng Hàn",
    address: "26, Doksan-ro 35beon-gil, Munsan-eup, Paju-si, Gyeonggi-do",
    classTime: "Mỗi thứ Bảy, 2 giờ chiều ~ 5 giờ chiều",
    name: "Tên",
    nationality: "Quốc gia",
    phone: "Số điện thoại",
    message: "Nội dung",
    submit: "Gửi",
    required: "Vui lòng điền đầy đủ thông tin.",
    successTitle: "Đăng ký đã hoàn tất",
    successDesc: "Chúng tôi sẽ sớm liên hệ với bạn. Xin cảm ơn.",
    again: "Đăng ký lại",
    fail: "Gửi đăng ký thất bại",
  },
} as const

const flags: Record<Lang, string> = {
  ko: "🇰🇷",
  ne: "🇳🇵",
  lo: "🇱🇦",
  bn: "🇧🇩",
  km: "🇰🇭",
  th: "🇹🇭",
  vi: "🇻🇳",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  marginBottom: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "14px",
  fontSize: "17px",
  boxSizing: "border-box",
  outline: "none",
  backgroundColor: "#ffffff",
}

export default function ApplyPage() {
  const [lang, setLang] = useState<Lang>("ko")
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    nationality: "",
    phone: "",
    message: "",
  })

  const t = translations[lang]

  const handleSubmit = async () => {
    if (!form.name || !form.nationality || !form.phone || !form.message) {
      alert(t.required)
      return
    }

    const { error } = await supabase.from("applications").insert([form])

    if (error) {
      alert(`${t.fail}: ${error.message}`)
    } else {
      setSubmitted(true)
      setForm({
        name: "",
        nationality: "",
        phone: "",
        message: "",
      })
    }
  }

  const langButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: "12px 14px",
    borderRadius: "14px",
    border: active ? "1px solid #2563eb" : "1px solid #d1d5db",
    backgroundColor: active ? "#2563eb" : "#ffffff",
    color: active ? "#ffffff" : "#111827",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: "112px",
    boxShadow: active ? "0 8px 18px rgba(37,99,235,0.25)" : "none",
  })

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f8fafc, #eef2f7)", padding: "24px 14px 40px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "26px", padding: "28px", boxShadow: "0 14px 40px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: "54px", marginBottom: "14px" }}>✅</div>
          <h1 style={{ fontSize: "34px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>
            {t.successTitle}
          </h1>
          <p style={{ fontSize: "18px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
            {t.successDesc}
          </p>

          <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "18px", padding: "16px", marginBottom: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#1d4ed8", marginBottom: "10px" }}>
              {t.infoTitle}
            </div>
            <div style={{ fontSize: "15px", color: "#1e3a8a", lineHeight: 1.7 }}>
              <div><strong>{t.addressLabel}:</strong> {t.address}</div>
              <div><strong>{t.classLabel}:</strong> {t.classTime}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <a
              href="tel:010-2313-4714"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "14px 12px",
                backgroundColor: "#111827",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              📞 사무국 010-2313-4714
            </a>

            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "14px 12px",
                backgroundColor: "#FEE500",
                color: "#111827",
                textDecoration: "none",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              💬 {t.kakaoButton}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            style={{
              width: "100%",
              padding: "15px",
              background: "linear-gradient(to right, #2563eb, #1d4ed8)",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {t.again}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc, #eef2f7)",
        padding: "24px 14px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "26px",
          padding: "22px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
          {(["ko", "ne", "lo", "bn", "km", "th", "vi"] as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              style={langButtonStyle(lang === code)}
              onClick={() => setLang(code)}
            >
              {flags[code]} {translations[code].langLabel}
            </button>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "18px",
            padding: "14px 16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1d4ed8", marginBottom: "6px" }}>
            {t.free}
          </div>
          <div style={{ fontSize: "14px", color: "#1e3a8a", lineHeight: 1.5 }}>
            {t.welcome} · {t.first} · {t.easy}
          </div>
        </div>

        <h1
          style={{
            fontSize: "42px",
            lineHeight: 1.15,
            fontWeight: 800,
            margin: "0 0 10px 0",
            color: "#0f172a",
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            fontSize: "19px",
            color: "#6b7280",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          {t.subtitle}
        </p>

        <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "18px", padding: "16px", marginBottom: "18px" }}>
          <div style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>
            {t.infoTitle}
          </div>
          <div style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.7 }}>
            <div><strong>{t.addressLabel}:</strong> {t.address}</div>
            <div><strong>{t.classLabel}:</strong> {t.classTime}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
          <a
            href="tel:010-2313-4714"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "13px 12px",
              backgroundColor: "#111827",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            📞 사무국 010-2313-4714
          </a>

          <a
            href="https://maps.google.com/?q=경기도 파주시 문산읍 독산로35번길 26"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "13px 12px",
              backgroundColor: "#ffffff",
              color: "#111827",
              textDecoration: "none",
              border: "1px solid #d1d5db",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            📍 {t.mapButton}
          </a>
        </div>

        <a
          href="https://pf.kakao.com/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            padding: "14px 12px",
            backgroundColor: "#FEE500",
            color: "#111827",
            textDecoration: "none",
            borderRadius: "14px",
            fontSize: "16px",
            fontWeight: 800,
            marginBottom: "18px",
            boxSizing: "border-box",
          }}
        >
          💬 {t.kakaoButton}
        </a>

        <input
          placeholder={t.name}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder={t.nationality}
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder={t.phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={inputStyle}
        />

        <textarea
          placeholder={t.message}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{
            ...inputStyle,
            minHeight: "130px",
            resize: "vertical",
          }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "16px",
            background: "linear-gradient(to right, #2563eb, #1d4ed8)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            fontSize: "18px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(37,99,235,0.28)",
          }}
        >
          {t.submit}
        </button>
      </div>
    </div>
  )
}