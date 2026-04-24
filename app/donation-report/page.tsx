export default function DonationReportPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <div style={eyebrowStyle}>DONATION REPORT</div>

        <h1 style={titleStyle}>기부금 모금액 및 활용실적 공개</h1>

        <p style={textStyle}>
          본 법인은 투명한 운영을 위하여 기부금 모금액 및 활용실적을
          공개합니다.
        </p>

        <div style={infoBoxStyle}>
          <strong>공개자료</strong>
          <p style={textStyle}>
            기부금 모금액 및 활용실적 자료는 PDF 파일로 확인하실 수 있습니다.
          </p>
        </div>

        <a
          href="/donation-report-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          📄 기부금 모금액 및 활용실적 PDF 보기
        </a>

        <div style={pdfBoxStyle}>
          <iframe
            src="/donation-report-2026.pdf"
            style={iframeStyle}
            title="기부금 모금액 및 활용실적 PDF"
          />
        
        <a href="/" style={homeButtonStyle}>
  🏠 홈으로 돌아가기
</a>
        
        </div>
      </section>
    </main>
  )
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f6f9fc 0%, #edf3f9 100%)",
  padding: "40px 20px",
  color: "#0f172a",
}

const cardStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: 28,
  padding: 28,
  boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
  border: "1px solid #e8eef6",
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: "0.08em",
  color: "#3867c8",
  marginBottom: 12,
}

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 6vw, 42px)",
  lineHeight: 1.3,
  fontWeight: 900,
}

const textStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.9,
  color: "#475569",
  wordBreak: "keep-all",
}

const infoBoxStyle: React.CSSProperties = {
  marginTop: 24,
  padding: 20,
  borderRadius: 20,
  background: "#f8fbff",
  border: "1px solid #e4edf8",
}

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 24,
  padding: "14px 20px",
  borderRadius: 16,
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  fontWeight: 900,
  textDecoration: "none",
  boxShadow: "0 12px 24px rgba(37,99,235,0.28)",
}

const pdfBoxStyle: React.CSSProperties = {
  marginTop: 28,
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid #dfe8f7",
  background: "#f8fafc",
}

const iframeStyle: React.CSSProperties = {
  width: "100%",
  height: "700px",
  border: "none",
}

const homeButtonStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: 16,
  padding: "12px 18px",
  borderRadius: 14,
  background: "#f1f5f9",
  color: "#0f172a",
  fontWeight: 700,
  textDecoration: "none",
  border: "1px solid #e2e8f0",
}