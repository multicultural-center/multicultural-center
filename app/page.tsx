"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"


const supabase = createClient(
  "https://axxwwqxypggpuhbbiwfy.supabase.co",
  "sb_publishable_IyUS3VaU0Ywyr0jGfgyiRA_xepjaEad"
)

type ContentMap = Record<string, string>

export default function HomePage() {
const [currentSlide, setCurrentSlide] = useState(0)
const [isSlidePaused, setIsSlidePaused] = useState(false)     
const [content, setContent] = useState<ContentMap>({})
const [loading, setLoading] = useState(true)
const [showPopup, setShowPopup] = useState(false)
const [isMobile, setIsMobile] = useState(false)
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
const [isDragging, setIsDragging] = useState(false)
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }) 

const popupEnabled = content.popup_enabled === "true"
const popupTitle = content.popup_title || "공지사항"
const popupContent = content.popup_content || ""
const popupStart = content.popup_start || ""
const popupEnd = content.popup_end || ""

useEffect(() => {
  const hiddenDate = localStorage.getItem("hidePopupUntil")
  const today = new Date().toDateString()

  if (hiddenDate === today) {
    setShowPopup(false)
    return
  }

  if (!popupEnabled) {
    setShowPopup(false)
    return
  }

  const now = new Date()
  const startOk = popupStart ? now >= new Date(popupStart) : true
  const endOk = popupEnd ? now <= new Date(popupEnd) : true

  if (startOk && endOk) {
    setShowPopup(true)
  } else {
    setShowPopup(false)
  }
}, [popupEnabled, popupStart, popupEnd])

const closePopup = () => {
  setShowPopup(false)
}

const closePopupToday = () => {
  const today = new Date().toDateString()
  localStorage.setItem("hidePopupUntil", today)
  setShowPopup(false)
}

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

  useEffect(() => {
    fetchContent()
  }, [])
       
 useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  checkMobile()
  window.addEventListener("resize", checkMobile)

  return () => window.removeEventListener("resize", checkMobile)
}, [])   

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  setIsDragging(true)
  setDragOffset({
    x: e.clientX - popupPosition.x,
    y: e.clientY - popupPosition.y,
  })
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return

  setPopupPosition({
    x: e.clientX - dragOffset.x,
    y: e.clientY - dragOffset.y,
  })
}

const handleMouseUp = () => {
  setIsDragging(false)
}

const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  setIsDragging(true)

  const touch = e.touches[0]

  setDragOffset({
    x: touch.clientX - popupPosition.x,
    y: touch.clientY - popupPosition.y,
  })
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging) return

  const touch = e.touches[0]

  setPopupPosition({
    x: touch.clientX - dragOffset.x,
    y: touch.clientY - dragOffset.y,
  })
}

const handleTouchEnd = () => {
  setIsDragging(false)
}

useEffect(() => {
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mouseup", handleMouseUp)
  window.addEventListener("touchmove", handleTouchMove)
  window.addEventListener("touchend", handleTouchEnd)

  return () => {
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleMouseUp)
    window.removeEventListener("touchmove", handleTouchMove)
    window.removeEventListener("touchend", handleTouchEnd)
  }
}, [isDragging, dragOffset])

useEffect(() => {
  if (showPopup && popupPosition.x === 0 && popupPosition.y === 0) {
    setPopupPosition({
      x: Math.max(window.innerWidth / 2 - 230, 20),
      y: 100,
    })
  }
}, [showPopup, popupPosition])
 
const heroSlides = [
  {
    title: "무료 한국어교실",
    subtitle: "매주 토요일 오후 2시 ~ 5시",
    description: "처음 오시는 분도 자유롭게 참여 가능합니다.",
    background: "linear-gradient(135deg, #2f5fd8 0%, #6ea8ff 100%)",
  },
  {
    title: "다문화 지원 프로그램",
    subtitle: "함께 배우고 함께 성장합니다",
    description: "외국인 근로자와 다문화 가정을 위한 다양한 지원 사업",
    background: "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)",
  },
  {
    title: "센터 소개",
    subtitle: "사단법인 경기서북부 다문화센터",
    description: "정착, 교육, 상담, 교류를 돕는 따뜻한 공동체",
    background: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
  },
]

 useEffect(() => {
  if (isSlidePaused) return

  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, 3500)

  return () => clearInterval(interval)
}, [isSlidePaused, heroSlides.length]) 


  const donationAccount =
    content.donation_account ||
    "○○은행 / ○○○○-○○○○-○○○○ / 사단법인 경기서북부 다문화센터"

  const phone = content.phone || "010-2313-4714"
  const address =
    content.address || "경기도 파주시 문산읍 독산로35번길 26 (문산교회 교육관 3층)"
  const mainSlogan = content.main_slogan || "함께하는 다문화, 따뜻한 세상으로"
  const mainSubtitle =
    content.main_subtitle ||
    "다문화 가정과 외국인 근로자가 한국 사회에 안정적으로 정착하고 함께 살아가는 공동체를 이루도록 돕습니다."
  const verse = content.verse || "“너희는 나그네를 사랑하라” (신명기 10:19)"
  const chairmanMessage =
    content.chairman_message ||
    "안녕하십니까. 사단법인 경기서북부 다문화센터 이사장 류병수 목사입니다."
  const organization =
    content.organization ||
    "이사장: 류병수\n이사: 김진영 장로 | 박근우 집사 | 이정지 권사 | 김영애 전도사 | 전영대 집사 | 조규빈 장로 | 김옥 권사 | 이종수 장로 | 홍정숙 집사\n감사: 조용원 집사\n사무국: 센터 운영 및 프로그램 진행 담당"
  const history =
    content.history ||
    "2026.03.03. 사단법인 설립 허가 (허가번호: 2026-02-03)\n2026.03.17. 법인 성립\n2026.05. 무료 한국어교실 개설 예정\n2026.05. 다문화 지원 사업 확대"
  const programs =
    content.programs ||
    "① 다문화 한국어교실\n외국인 및 다문화가정을 위한 무료 한국어 교육 프로그램\n운영: 매주 토요일 14:00 ~ 17:00\n대상: 외국인 누구나, 다문화가정\n비용: 무료\n\n② 다문화 스포츠문화교실\n다양한 스포츠 활동을 통해 건강을 증진하고 참여자 간의 친목과 공동체 의식을 형성하는 프로그램입니다."
  const participation =
    content.participation ||
    "수강 신청: 누구나 자유롭게 참여 가능 (예약 없이 방문 가능)\n자원봉사: 다문화 교육 및 행사에 함께할 자원봉사자를 모집합니다."
  const donationIntro =
    content.donation_intro ||
    "여러분의 따뜻한 후원은 다문화 가정과 외국인 이웃들에게 큰 힘이 됩니다."
  const notice =
    content.notice ||
    "무료 한국어교실 개설 예정 / 다문화 지원 사업 확대 예정 / 프로그램 신청은 온라인으로 가능합니다."
  const hometaxIntro =
    content.hometax_intro ||
    "후원금 영수증 및 세무 관련 안내는 홈택스를 통해 확인하실 수 있습니다. 필요한 경우 센터로 문의해 주세요."
  const directionsIntro =
    content.directions_intro ||
    "문산역 1번 출구에서 도보 약 13분(583m) 거리입니다."
  
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`
  const hometaxUrl = "https://www.hometax.go.kr"


 useEffect(() => {
  if (!loading) {
    const scriptId = "kakao-map-script"

    const oldScript = document.getElementById(scriptId)
    if (oldScript) {
      oldScript.remove()
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src =
  "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ddf6c189589c75e44aa6ec0e4514ff54&autoload=false&libraries=services"
    script.async = true



    script.onload = () => {
  window.kakao.maps.load(() => {

    setTimeout(() => {
      const container = document.getElementById("map")
      if (!container) return

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      })

      const geocoder = new window.kakao.maps.services.Geocoder()

      geocoder.addressSearch(
        "경기도 파주시 문산읍 독산로35번길 26",
        function (result: any, status: any) {

          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

            new window.kakao.maps.Marker({
              map,
              position: coords,
            })

            // 💥 여기 딱 여기
            setTimeout(() => {
              map.relayout()
              map.setCenter(coords)
            }, 100)

            console.log("📍 정확한 위치로 이동 완료")
          } else {
            console.log("❌ 주소 검색 실패")
          }
        }
      )

    }, 300)

  })
}
    document.head.appendChild(script)
    console.log("script append 완료")
  }
}, [loading])



  const copyDonationAccount = async () => {
    try {
      await navigator.clipboard.writeText(donationAccount)
      alert("후원계좌가 복사되었습니다.")
    } catch {
      alert("복사에 실패했습니다. 직접 복사해주세요.")
    }
  }

  if (loading) {
    return (
      <div style={pageStyle}> 
       
      {mobileMenuOpen && (
  <>
    <div
      style={mobileMenuOverlayStyle}
      onClick={() => setMobileMenuOpen(false)}
    />

    <div style={mobileMenuPanelStyle}>
      <div style={mobileMenuHeaderStyle}>
        <div style={mobileMenuTitleStyle}>메뉴</div>
        <button
          style={mobileMenuCloseStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          ✕
        </button>
      </div>

      <div style={mobileMenuListStyle}>
        <a href="/message" style={mobileMenuLinkStyle} onClick={() => setMobileMenuOpen(false)}>
  이사장 인사말
</a>

<a href="/organization" style={mobileMenuLinkStyle} onClick={() => setMobileMenuOpen(false)}>
  조직구성
</a>

<a href="/history" style={mobileMenuLinkStyle} onClick={() => setMobileMenuOpen(false)}>
  연혁
</a>

<a
  href="/donation-report" style={mobileMenuLinkStyle} onClick={() => setMobileMenuOpen(false)}
>기부금 모금액 및 활용실적
</a>

        <a
          href="/apply"
          style={mobileMenuLinkStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          프로그램 신청하기
        </a>

        <a
          href="https://wa.me/821023134714"
          target="_blank"
          rel="noopener noreferrer"
          style={mobileMenuLinkStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          WhatsApp 상담하기
        </a>
      </div>
    </div>
  </>
)}  

        <div style={containerStyle}>
          <div style={loadingCardStyle}>불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      
 {showPopup && (
  <div style={popupOverlayStyle}>
    <div
      style={{
        ...popupBoxStyle,
        left: popupPosition.x,
        top: popupPosition.y,
      }}
    >
      <div
  style={popupHeaderStyle}
  onMouseDown={handleMouseDown}
  onTouchStart={handleTouchStart}
>
        <div style={popupTitleStyle}>{popupTitle}</div>
        <div style={popupDragHintStyle}>드래그해서 이동</div>
      </div>

      <div style={popupTextStyle}>
        {popupContent}
      </div>

      <div style={popupButtonRowStyle}>
        <button onClick={closePopupToday} style={popupSecondaryButtonStyle}>
          오늘 하루 안 보기
        </button>

        <button onClick={closePopup} style={popupPrimaryButtonStyle}>
          닫기
        </button>
      </div>
    </div>
  </div>
)}  
      
      <div style={containerStyle}>
        <section style={heroWrapStyle}>
          <div style={heroCardStyle}>
            
           <div style={heroTopStyle}>
  <div style={heroTextColStyle}>
    <div style={badgeStyle}>{mainSlogan}</div>

    {isMobile && (
      <button
        type="button"  
        aria-label="메뉴 열기" 
        onClick={() => setMobileMenuOpen(true)} 
        style={mobileHamburgerButtonStyle}
        >
        ☰
      </button>
    )}
   
{isMobile && mobileMenuOpen && (
  <>
    <div
      style={mobileMenuBackdropStyle}
      onClick={() => setMobileMenuOpen(false)}
    />

    <div style={mobileMenuPanelStyle}>
      <div style={mobileMenuHeaderStyle}>
        <div style={mobileMenuTitleStyle}>메뉴</div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          style={mobileMenuCloseButtonStyle}
        >
          ✕
        </button>
      </div>

      <div style={mobileMenuListStyle}>
        <a
          href="/message"
          style={mobileMenuLinkStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          이사장 인사말
        </a>  
         
        <a
          href="/organization"
          style={mobileMenuLinkStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          조직구성
        </a>

        <a
          href="/history"
          style={mobileMenuLinkStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          연혁
        </a>

<a
  href="/donation-report" style={mobileMenuLinkStyle} onClick={() => setMobileMenuOpen(false)}
>기부금 모금액 및 활용실적
</a>

        </div>
    </div>
  </>
)}

    <h1 style={heroTitleStyle}>
      사단법인 경기서북부
      <br />
      다문화센터
    </h1>

    <p style={heroSubtitleStyle}>{mainSubtitle}</p>

    <div
  style={{
    ...sliderCardStyle,
    background: heroSlides[currentSlide].background,
  }}
>
  <div style={sliderContentStyle}>
    <div style={sliderBadgeStyle}>{heroSlides[currentSlide].subtitle}</div>
    <div style={sliderTitleStyle}>{heroSlides[currentSlide].title}</div>
    <div style={sliderDescriptionStyle}>
      {heroSlides[currentSlide].description}
    </div>
  </div>

  <div style={sliderControlWrapStyle}>
    <div style={sliderDotsWrapStyle}>
      {heroSlides.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setCurrentSlide(index)}
          style={{
            ...sliderDotStyle,
            ...(currentSlide === index ? sliderDotActiveStyle : {}),
          }}
        />
      ))}
    </div>

    <button
      type="button"
      onClick={() => setIsSlidePaused((prev) => !prev)}
      style={sliderPauseButtonStyle}
    >
      {isSlidePaused ? "▶" : "❚❚"}
    </button>
  </div>
</div>
  </div>

  {!isMobile && (
    <div style={topMenuWrapStyle}>
      <a
  href="/message"
  style={topMenuButtonStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#0f172a"
    e.currentTarget.style.color = "#ffffff"
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#ffffff"
    e.currentTarget.style.color = "#0f172a"
  }}
>
  이사장 인사말
</a> 
       
       <a
        href="/organization"
        style={topMenuButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#0f172a"
          e.currentTarget.style.color = "#ffffff"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff"
          e.currentTarget.style.color = "#0f172a"
        }}
      >
        조직구성
      </a>

      <a
        href="/history"
        style={topMenuButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#0f172a"
          e.currentTarget.style.color = "#ffffff"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff"
          e.currentTarget.style.color = "#0f172a"
        }}
      >
        연혁
      </a>
    
    <a
  href="/donation-report"
  style={topMenuButtonStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#0f172a"
    e.currentTarget.style.color = "#ffffff"
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#ffffff"
    e.currentTarget.style.color = "#0f172a"
  }}
>
  기부금 모금액 및 활용실적
</a>
    
    
    </div>
  )}
</div>
            <div style={heroButtonRowStyle}>
              <a href="https://wa.me/821023134714" style={whatsappButtonStyle}>
  💬 WhatsApp 상담하기
</a>
              <a href="/apply" style={darkButtonStyle}>
                📝 프로그램 신청하기
              </a>
            </div>
          </div>
        </section>

        
<section style={sectionCardStyle}>
  <div style={sectionHeaderStyle}>
    <div style={sectionEyebrowStyle}>NOTICE</div>
    <h2 style={sectionTitleStyle}>공지사항</h2>
  </div>

  <div style={bodyTextStyle}>
    {notice}
  </div>
</section>



        <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionEyebrowStyle}>PROGRAM</div>
            <h2 style={sectionTitleStyle}>사업안내</h2>
          </div>
          <div style={bodyTextStyle}>{programs}</div>
        </section>

        <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionEyebrowStyle}>PARTICIPATION</div>
            <h2 style={sectionTitleStyle}>참여안내</h2>
          </div>
          <div style={bodyTextStyle}>{participation}</div>
        </section>

        <section style={twoColGridStyle}>
          <div style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionEyebrowStyle}>DONATION</div>
              <h2 style={sectionTitleStyle}>후원안내</h2>
            </div>

            <p style={bodyTextStyle}>{donationIntro}</p>

            <div style={accountBoxStyle}>{donationAccount}</div>

            <div style={heroButtonRowStyle}>
              <button onClick={copyDonationAccount} style={primaryButtonStyle}>
                후원계좌 복사
              </button>
            </div>
          </div>

          </section>
                  <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionEyebrowStyle}>HOMETAX</div>
            <h2 style={sectionTitleStyle}>홈택스 / 기부금영수증 안내</h2>
          </div>

          <p style={bodyTextStyle}>{hometaxIntro}</p>

          <div style={infoBoxStyle}>
            <div style={infoBoxTitleStyle}>안내</div>
            <div style={bodyTextStyle}>
              후원금 영수증 발급, 세무 확인, 전자신고 관련 업무는 홈택스를 통해 진행할 수 있습니다.
              자세한 안내가 필요하시면 센터로 문의해 주세요.
            </div>
          </div>

          <div style={heroButtonRowStyle}>
            <a
              href={hometaxUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={primaryButtonStyle}
            >
              홈택스 바로가기
            </a>

            <a href={`tel:${phone}`} style={outlineButtonStyle}>
              센터 문의하기
            </a>
          </div>
        </section>

        <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionEyebrowStyle}>LOCATION</div>
            <h2 style={sectionTitleStyle}>센터 약도 / 오시는 길</h2>
          </div>

       
          <div style={mapWrapStyle}>
            <div id="map" style={{ width: "100%", height: "420px" }} />
          </div>

          <div style={contactGridStyle}>
            <div style={contactItemStyle}>
              <div style={contactLabelStyle}>센터 주소</div>
              <div style={contactValueStyle}>{address}</div>
            </div>

            <div style={contactItemStyle}>
              <div style={contactLabelStyle}>오시는 길 안내</div>
              <div style={contactValueStyle}>
                문산역 1번 출구에서 도보 약 13분(538m)  
            거리입니다.
              </div>
            </div>
          </div>

          <div style={heroButtonRowStyle}>
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={primaryButtonStyle}
            >
              네이버지도에서 보기
            </a>

            <a
              href={kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={outlineButtonStyle}
            >
              카카오맵에서 보기
            </a>
          </div>
        </section>

        <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionEyebrowStyle}>CONTACT</div>
            <h2 style={sectionTitleStyle}>문의 및 주소</h2>
          </div>

          <div style={contactGridStyle}>
            <div style={contactItemStyle}>
  <div style={contactLabelStyle}>사무국</div>
  <div style={contactValueStyle}>
    ☎️ 031-954-1004{"\n"}
    📱 010-2313-4714 / 010-2584-8163
  </div>
</div>

            <div style={contactItemStyle}>
              <div style={contactLabelStyle}>주소</div>
              <div style={contactValueStyle}>{address}</div>
            </div>
          </div>
        </section>
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
  padding: "0 20px 56px",
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

const heroWrapStyle: React.CSSProperties = {
  paddingTop: 32,
  paddingBottom: 18,
}

const heroCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
  borderRadius: 30,
  padding: 32,
  boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
  border: "1px solid #e8eef6",
}

const heroTopStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  position: "relative",
  gap: 24,
}

const heroTextColStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  position: "relative",
}


const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: 999,
  background: "#e8f0ff",
  color: "#2757c8",
  fontSize: 14,
  fontWeight: 800,
  marginBottom: 16,
}

const heroTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 7vw, 56px)", // 핵심
  lineHeight: 1.15,
  fontWeight: 900,
  letterSpacing: "-0.03em",
  wordBreak: "keep-all",
}

const heroSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(15px, 4vw, 18px)",
  lineHeight: 1.8,
  color: "#475569",
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
}

const verseCardStyle: React.CSSProperties = {
  width: "100%",
  margin: 0,
  padding: 24,
  borderRadius: 26,
  background: "linear-gradient(135deg, #2f5fd8 0%, #6ea8ff 100%)",
  color: "#fff",
  boxSizing: "border-box", 
  boxShadow: "0 16px 36px rgba(37,99,235,0.25)",
}

const verseLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: "0.08em",
  opacity: 0.75,
  marginBottom: 12,
}

const verseTextStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  lineHeight: 1.45,
}

const verseSubStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 15,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.78)",
}

const heroButtonRowStyle: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  flexDirection: "row",
  gap: 12,
  alignItems: "stretch",
  flexWrap: "wrap",
}

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "14px 18px",
  borderRadius: 16,
  textDecoration: "none",
  border: "none",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(37,99,235,0.28)",
}

const popupOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.45)",
  zIndex: 9999,
}

const popupBoxStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  maxWidth: 460,
  background: "#ffffff",
  borderRadius: 24,
  padding: 24,
  boxSizing: "border-box",
  boxShadow: "0 20px 60px rgba(15,23,42,0.22)",
  border: "1px solid #e5edf6",
}

const popupHeaderStyle: React.CSSProperties = {
  cursor: "grab",
  userSelect: "none",
  marginBottom: 14,
}

const popupDragHintStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#94a3b8",
  marginTop: 4,
}

const popupTitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 14,
}

const popupTextStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: "#475569",
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
}

const popupButtonRowStyle: React.CSSProperties = {
  marginTop: 20,
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  flexWrap: "wrap",
}

const popupPrimaryButtonStyle: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  fontWeight: 800,
  cursor: "pointer",
}

const popupSecondaryButtonStyle: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 14,
  border: "1px solid #d6e0ee",
  background: "#ffffff",
  color: "#334155",
  fontWeight: 800,
  cursor: "pointer",
}

const darkButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flex: 1,
  padding: "16px",
  borderRadius: 999,
  textDecoration: "none",
  border: "none",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  fontWeight: 800,
  fontSize: 15,
  boxSizing: "border-box", 
  minWidth: 140,
}
  
const whatsappButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flex: 1,
  padding: "16px",
  borderRadius: 999,
  textDecoration: "none",
  border: "none",
  background: "#25D366",
  color: "#ffffff",
  fontWeight: 800,
  fontSize: 15,
  boxSizing: "border-box",
  minWidth: 140,
}

const outlineButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "14px 18px",
  borderRadius: 16,
  textDecoration: "none",
  border: "1px solid #cfd9e6",
  background: "#ffffff",
  color: "#0f172a",
  fontWeight: 800,
  fontSize: 15,
}

const twoColGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 18,
  marginBottom: 18,
}

const sectionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 28,
  padding: 28,
  boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
  border: "1px solid #e8eef6",
  marginBottom: 18,
}

const sectionHeaderStyle: React.CSSProperties = {
  marginBottom: 18,
}

const sectionEyebrowStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: "0.08em",
  color: "#3867c8",
  marginBottom: 10,
}

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.3,
  fontWeight: 900,
  color: "#0f172a",
}

const bodyTextStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  color: "#475569",
  whiteSpace: "pre-line",
}

const accountBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 18,
  borderRadius: 20,
  background: "#f8fbff",
  border: "1px solid #e4edf8",
  fontSize: 16,
  lineHeight: 1.8,
  whiteSpace: "pre-line",
}

const infoBoxStyle: React.CSSProperties = {
  background: "#f8fbff",
  borderRadius: 20,
  padding: 18,
  border: "1px solid #e4edf8",
  marginTop: 16,
  marginBottom: 18,
}

const infoBoxTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "#2563eb",
  marginBottom: 8,
}

const mapWrapStyle: React.CSSProperties = {
  marginTop: 18,
  marginBottom: 18,
  borderRadius: 24,
  overflow: "hidden",
  border: "1px solid #dfe8f7",
  boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
}

const contactGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
}

const contactItemStyle: React.CSSProperties = {
  padding: 18,
  borderRadius: 20,
  background: "#f8fafc",
  border: "1px solid #e6edf5",
}

const contactLabelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  color: "#3867c8",
  marginBottom: 8,
}

const contactValueStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: "#1e293b",
  whiteSpace: "pre-line",
}

const topMenuWrapStyle: React.CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,

  display: "flex",
  flexDirection: "column",
  gap: 8,

  zIndex: 10,
}

const topMenuButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 999, 
  border: "1px solid #d5deea",
  background: "#ffffff",
  textDecoration: "none",
  color: "#0f172a",
  fontSize: 13,
  fontWeight: 700,

  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
}
      

const mobileMenuOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.35)",
  zIndex: 9998,
}


const mobileMenuCloseStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid #d5deea",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: 20,
  cursor: "pointer",
}

  
const mobileHamburgerButtonStyle: React.CSSProperties = {
  position: "fixed",
  top: 110,
  right: 24,
  width: 56,
  height: 56,
  borderRadius: 16,
  border: "1px solid #d5deea",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: 28,
  fontWeight: 800,
  cursor: "pointer",
  zIndex: 100000,
  boxShadow: "0 8px 24px rgba(15,23,42,0.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
  touchAction: "manipulation",
}

const mobileMenuBackdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.35)",
  zIndex: 99998,
}

const mobileMenuPanelStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "78%",
  maxWidth: 320,
  height: "100vh",
  background: "#ffffff",
  boxShadow: "-12px 0 30px rgba(15,23,42,0.16)",
  zIndex: 99999,
  padding: "24px 20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}

const mobileMenuHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
}

const mobileMenuTitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 900,
  color: "#0f172a",
}

const mobileMenuCloseButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: "1px solid #d5deea",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: 22,
  cursor: "pointer",
}

const mobileMenuListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
}

const mobileMenuLinkStyle: React.CSSProperties = {
  display: "block",
  padding: "14px 16px",
  borderRadius: 14,
  textDecoration: "none",
  background: "#f8fbff",
  border: "1px solid #e4edf8",
  color: "#0f172a",
  fontSize: 16,
  fontWeight: 800,
}
  
 
const sliderCardStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 26,
  padding: 24,
  boxSizing: "border-box",
  color: "#ffffff",
  boxShadow: "0 16px 36px rgba(37,99,235,0.22)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
}

const sliderContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  justifyContent: "center",
  height: "100%",
}

const sliderBadgeStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  opacity: 0.95,
}

const sliderTitleStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 6vw, 54px)",
  lineHeight: 1.2,
  fontWeight: 900,
  wordBreak: "keep-all",
}

const sliderDescriptionStyle: React.CSSProperties = {
  fontSize: "clamp(14px, 3.8vw, 20px)",
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.9)",
  wordBreak: "keep-all",
  maxWidth: "85%",
}

const sliderControlWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  marginTop: 14,
}

const sliderDotsWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.94)",
  borderRadius: 999,
  padding: "10px 16px",
  boxShadow: "0 8px 20px rgba(15,23,42,0.16)",
}

const sliderDotStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  border: "none",
  background: "#9ca3af",
  cursor: "pointer",
  padding: 0,
}

const sliderDotActiveStyle: React.CSSProperties = {
  width: 28,
  borderRadius: 999,
  background: "#111827",
}

const sliderPauseButtonStyle: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.96)",
  color: "#111827",
  fontSize: 20,
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(15,23,42,0.16)",
}
   
const sliderOuterWrapStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

declare global {
  interface Window {
    kakao: any
  }
}

