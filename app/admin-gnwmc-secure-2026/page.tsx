"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://axxwwqxypggpuhbbiwfy.supabase.co",
  "sb_publishable_IyUS3VaU0Ywyr0jGfgyiRA_xepjaEad"
)
type Application = {
  id: string
  created_at: string
  name: string
  nationality: string
  phone: string
  message: string
}

type ContentMap = Record<string, string>

export default function AdminPage() {
  const [items, setItems] = useState<Application[]>([])
  const [content, setContent] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [inputPassword, setInputPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  const ADMIN_PASSWORD = "100424"

  useEffect(() => {
    const saved = localStorage.getItem("adminLogin")
    if (saved === "true") setUnlocked(true)
  }, [])

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    setLoading(true)

    const { data: appData } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: contentData } = await supabase
      .from("site_content")
      .select("*")

    const contentObj: ContentMap = {}
    contentData?.forEach((item: any) => {
      contentObj[item.key] = item.value
    })

    setItems(appData || [])
    setContent(contentObj)
    setLoading(false)
  }

  const updateContent = async (key: string, value: string) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value })

    if (error) {
      alert("저장 실패")
    } else {
      alert("저장 완료")
      setContent((prev) => ({ ...prev, [key]: value }))
    }
  }

  const deleteItem = async (id: string) => {
    const ok = confirm("삭제하시겠습니까?")
    if (!ok) return

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id)

    if (error) {
      alert("삭제 실패")
    } else {
      loadAll()
    }
  }

  const downloadCSV = () => {
    if (items.length === 0) {
      alert("데이터 없음")
      return
    }

    const headers = ["이름", "국적", "전화번호", "메시지", "날짜"]
    const rows = items.map((item) => [
      item.name,
      item.nationality,
      item.phone,
      item.message,
      item.created_at,
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v ?? "")}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "신청목록.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div style={pageStyle}><div style={cardStyle}>불러오는 중...</div></div>
  }

  if (!unlocked) {
    return (
      <div style={pageStyle}>
        <div style={loginCardStyle}>
          <h1 style={titleStyle}>관리자 로그인</h1>
          <p style={descStyle}>비밀번호를 입력하세요.</p>

          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="비밀번호"
            style={inputStyle}
          />

          <button
            style={primaryButtonStyle}
            onClick={() => {
              if (inputPassword === ADMIN_PASSWORD) {
                localStorage.setItem("adminLogin", "true")
                setUnlocked(true)
              } else {
                alert("비밀번호가 틀렸습니다.")
              }
            }}
          >
            로그인
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={sectionCardStyle}>
          <div style={topRowStyle}>
            <div>
              <h1 style={titleStyle}>사이트 내용 관리</h1>
              <p style={descStyle}>이사장 인사말, 임원명단, 후원계좌 등을 수정할 수 있습니다.</p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={secondaryButtonStyle} onClick={downloadCSV}>
                엑셀 다운로드
              </button>
              <button
                style={outlineButtonStyle}
                onClick={() => {
                  localStorage.removeItem("adminLogin")
                  setUnlocked(false)
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>

        <div style={sectionCardStyle}>
          <h2 style={sectionTitleStyle}>홈페이지 내용 수정</h2>

          <EditorBlock
            label="메인 슬로건"
            value={content.main_slogan || ""}
            onChange={(v) => setContent((p) => ({ ...p, main_slogan: v }))}
            onSave={() => updateContent("main_slogan", content.main_slogan || "")}
          />

          <EditorBlock
            label="메인 소개문구"
            value={content.main_subtitle || ""}
            onChange={(v) => setContent((p) => ({ ...p, main_subtitle: v }))}
            onSave={() => updateContent("main_subtitle", content.main_subtitle || "")}
            textarea
          />

          <EditorBlock
            label="성경 말씀"
            value={content.verse || ""}
            onChange={(v) => setContent((p) => ({ ...p, verse: v }))}
            onSave={() => updateContent("verse", content.verse || "")}
          />

          <EditorBlock
            label="이사장 인사말"
            value={content.chairman_message || ""}
            onChange={(v) => setContent((p) => ({ ...p, chairman_message: v }))}
            onSave={() => updateContent("chairman_message", content.chairman_message || "")}
            textarea
          />

<EditorBlock
  label="홈택스 안내 문구"
  value={content.hometax_intro || ""}
  onChange={(v) => setContent((p) => ({ ...p, hometax_intro: v }))}
  onSave={() => updateContent("hometax_intro", content.hometax_intro || "")}
  textarea
/>

<EditorBlock
  label="오시는 길 안내 문구"
  value={content.directions_intro || ""}
  onChange={(v) => setContent((p) => ({ ...p, directions_intro: v }))}
  onSave={() => updateContent("directions_intro", content.directions_intro || "")}
  textarea
/>

          <EditorBlock
            label="임원명단 / 조직구성"
            value={content.organization || ""}
            onChange={(v) => setContent((p) => ({ ...p, organization: v }))}
            onSave={() => updateContent("organization", content.organization || "")}
            textarea
          />

          <EditorBlock
            label="연혁"
            value={content.history || ""}
            onChange={(v) => setContent((p) => ({ ...p, history: v }))}
            onSave={() => updateContent("history", content.history || "")}
            textarea
          />

          <EditorBlock
            label="사업안내"
            value={content.programs || ""}
            onChange={(v) => setContent((p) => ({ ...p, programs: v }))}
            onSave={() => updateContent("programs", content.programs || "")}
            textarea
          />

          <EditorBlock
            label="참여 안내"
            value={content.participation || ""}
            onChange={(v) => setContent((p) => ({ ...p, participation: v }))}
            onSave={() => updateContent("participation", content.participation || "")}
            textarea
          />

          <EditorBlock
            label="후원 안내 문구"
            value={content.donation_intro || ""}
            onChange={(v) => setContent((p) => ({ ...p, donation_intro: v }))}
            onSave={() => updateContent("donation_intro", content.donation_intro || "")}
            textarea
          />

          <EditorBlock
  label="후원계좌"
  value={content.donation_account || ""}
  onChange={(v) => setContent((p) => ({ ...p, donation_account: v }))}
  onSave={() => updateContent("donation_account", content.donation_account || "")}
  textarea
/>

          <EditorBlock
            label="주소"
            value={content.address || ""}
            onChange={(v) => setContent((p) => ({ ...p, address: v }))}
            onSave={() => updateContent("address", content.address || "")}
          />

          <EditorBlock
            label="대표전화"
            value={content.phone || ""}
            onChange={(v) => setContent((p) => ({ ...p, phone: v }))}
            onSave={() => updateContent("phone", content.phone || "")}
          />

          <EditorBlock
            label="공지/소식"
            value={content.notice || ""}
            onChange={(v) => setContent((p) => ({ ...p, notice: v }))}
            onSave={() => updateContent("notice", content.notice || "")}
            textarea
          />
   <EditorBlock
  label="팝업 사용 여부 (true / false)"
  value={content.popup_enabled || "false"}
  onChange={(v) => setContent((p) => ({ ...p, popup_enabled: v }))}
  onSave={() => updateContent("popup_enabled", content.popup_enabled || "false")}
/>

<EditorBlock
  label="팝업 제목"
  value={content.popup_title || ""}
  onChange={(v) => setContent((p) => ({ ...p, popup_title: v }))}
  onSave={() => updateContent("popup_title", content.popup_title || "")}
/>

<EditorBlock
  label="팝업 내용"
  value={content.popup_content || ""}
  onChange={(v) => setContent((p) => ({ ...p, popup_content: v }))}
  onSave={() => updateContent("popup_content", content.popup_content || "")}
  textarea
/>

<EditorBlock
  label="팝업 시작일시 (예: 2026-04-21T09:00)"
  value={content.popup_start || ""}
  onChange={(v) => setContent((p) => ({ ...p, popup_start: v }))}
  onSave={() => updateContent("popup_start", content.popup_start || "")}
/>

<EditorBlock
  label="팝업 종료일시 (예: 2026-05-31T23:59)"
  value={content.popup_end || ""}
  onChange={(v) => setContent((p) => ({ ...p, popup_end: v }))}
  onSave={() => updateContent("popup_end", content.popup_end || "")}
/>       
        </div>

        <div style={sectionCardStyle}>
          <h2 style={sectionTitleStyle}>신청자 목록</h2>

          {items.length === 0 ? (
            <div style={emptyBoxStyle}>신청 내역이 없습니다.</div>
          ) : (
            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>이름</th>
                    <th style={thStyle}>국적</th>
                    <th style={thStyle}>전화번호</th>
                    <th style={thStyle}>메시지</th>
                    <th style={thStyle}>날짜</th>
                    <th style={thStyle}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>{item.nationality}</td>
                      <td style={tdStyle}>
                        <a href={`tel:${item.phone}`} style={phoneLinkStyle}>
                          {item.phone}
                        </a>
                      </td>
                      <td style={tdMessageStyle}>{item.message}</td>
                      <td style={tdStyle}>
                        {new Date(item.created_at).toLocaleString("ko-KR")}
                      </td>
                      <td style={tdStyle}>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => deleteItem(item.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EditorBlock({
  label,
  value,
  onChange,
  onSave,
  textarea = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onSave: () => void
  textarea?: boolean
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={labelStyle}>{label}</div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={textareaStyle}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
      <button style={primaryButtonStyle} onClick={onSave}>
        저장
      </button>
    </div>
  )
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)",
  padding: "28px 16px 40px",
  boxSizing: "border-box",
}

const containerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
}

const sectionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
  border: "1px solid #eaf0f7",
  marginBottom: 18,
}

const loginCardStyle: React.CSSProperties = {
  maxWidth: 460,
  margin: "80px auto",
  background: "#ffffff",
  borderRadius: 28,
  padding: 34,
  boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
}

const cardStyle: React.CSSProperties = {
  maxWidth: 520,
  margin: "80px auto",
  background: "#ffffff",
  borderRadius: 26,
  padding: 32,
  boxShadow: "0 18px 42px rgba(0,0,0,0.08)",
  textAlign: "center",
  fontSize: 18,
}

const topRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  alignItems: "center",
}

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.15,
  fontWeight: 900,
  color: "#0f172a",
}

const descStyle: React.CSSProperties = {
  marginTop: 10,
  color: "#475569",
  fontSize: 16,
  lineHeight: 1.7,
}

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 18,
  fontSize: 26,
  fontWeight: 900,
  color: "#111827",
}

const labelStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
  marginBottom: 8,
  color: "#374151",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 16,
  marginBottom: 10,
  boxSizing: "border-box",
  outline: "none",
}

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 140,
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 16,
  marginBottom: 10,
  boxSizing: "border-box",
  outline: "none",
  resize: "vertical",
}

const primaryButtonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(to right, #2563eb, #1d4ed8)",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
}

const secondaryButtonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
}

const outlineButtonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
}

const emptyBoxStyle: React.CSSProperties = {
  padding: 24,
  textAlign: "center",
  color: "#64748b",
  fontSize: 16,
}

const tableWrapStyle: React.CSSProperties = {
  overflowX: "auto",
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 920,
  borderCollapse: "collapse",
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "16px 14px",
  borderBottom: "1px solid #e5e7eb",
  color: "#374151",
  fontSize: 14,
  backgroundColor: "#f9fafb",
}

const tdStyle: React.CSSProperties = {
  padding: "16px 14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#111827",
  fontSize: 14,
  verticalAlign: "top",
}

const tdMessageStyle: React.CSSProperties = {
  padding: "16px 14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#111827",
  fontSize: 14,
  verticalAlign: "top",
  maxWidth: 280,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
}

const phoneLinkStyle: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 800,
}

const deleteButtonStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "none",
  backgroundColor: "#dc2626",
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 800,
  cursor: "pointer",
}