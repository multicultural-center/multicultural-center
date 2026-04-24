"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://axxwwqxypggpuhbbiwfy.supabase.co",
  "sb_publishable_IyUS3VaU0Ywyr0jGfgyiRA_xepjaEad"
)

type ContentMap = Record<string, string>

export default function HistoryPage() {
  const [content, setContent] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("site_content").select("*")

      if (error) {
        console.log(error)
        setLoading(false)
        return
      }

      const obj: ContentMap = {}
      data?.forEach((item: any) => {
        obj[item.key] = item.value
      })

      setContent(obj)
      setLoading(false)
    }

    fetchContent()
  }, [])

  const history =
    content.history ||
    "2026.03.03. 사단법인 설립 허가 (허가번호: 2026-02-03)\n2026.03.17. 법인 성립\n2026.05. 무료 한국어교실 개설 예정\n2026.05. 다문화 지원 사업 확대"

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={loadingCardStyle}>불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroCardStyle}>
          <div style={pageEyebrowStyle}>CENTER INFO</div>
          <h1 style={heroTitleStyle}>연혁</h1>
          <p style={heroSubtitleStyle}>
            사단법인 경기서북부 다문화센터의 연혁 안내입니다.
          </p>
        </section>

        <section style={sectionCardStyle}>
          <div style={bodyTextStyle}>{history}</div>
        </section>

        <div style={{ marginTop: 20 }}>
          <a href="/" style={backButtonStyle}>
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f6f9fc 0%, #edf3f9 100%)",
  color: "#0f172a",
}

const containerStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "32px 20px 56px",
  boxSizing: "border-box",
}

const loadingCardStyle: React.CSSProperties = {
  marginTop: 60,
  padding: 24,
  borderRadius: 24,
  background: "#ffffff",
  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
  textAlign: "center",
  fontSize: 18,
}

const heroCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
  borderRadius: 30,
  padding: 32,
  boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
  border: "1px solid #e8eef6",
  marginBottom: 18,
}

const pageEyebrowStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: "0.08em",
  color: "#3867c8",
  marginBottom: 10,
}

const heroTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 36,
  lineHeight: 1.2,
  fontWeight: 900,
  color: "#0f172a",
}

const heroSubtitleStyle: React.CSSProperties = {
  marginTop: 14,
  fontSize: 17,
  lineHeight: 1.8,
  color: "#475569",
}

const sectionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 28,
  padding: 28,
  boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
  border: "1px solid #e8eef6",
  marginBottom: 18,
}

const bodyTextStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  color: "#475569",
  whiteSpace: "pre-line",
}

const backButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 18px",
  borderRadius: 16,
  textDecoration: "none",
  border: "1px solid #cfd9e6",
  background: "#ffffff",
  color: "#0f172a",
  fontWeight: 800,
  fontSize: 15,
}