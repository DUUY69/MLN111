'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>('masses')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      setShowBackToTop(currentScrollY > 300)
      
      // Ẩn navbar khi cuộn xuống, hiện khi cuộn lên
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Theo dõi section đang hiển thị để highlight trên navbar & áp dụng hiệu ứng xuất hiện
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          const id = target.id

          if (entry.isIntersecting) {
            setActiveSection(id)
            target.classList.add('visible')
          } else {
            target.classList.remove('visible')
          }
        })
      },
      {
        threshold: 0.35,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCard = (id: string) => {
    setExpandedCard((current) => (current === id ? null : id))
  }

  return (
    <>
      {/* Navigation - Dark Theme */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${showNavbar ? 'visible' : 'hidden'}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToTop()}>
            Triết học Mác – Lênin
          </div>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Mở/đóng menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('home')
                  setIsMobileMenuOpen(false)
                }}
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="#intro"
                className={activeSection === 'intro' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('intro')
                  setIsMobileMenuOpen(false)
                }}
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="#content"
                className={activeSection === 'content' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('content')
                  setIsMobileMenuOpen(false)
                }}
              >
                Nội dung
              </a>
            </li>
            <li>
              <a
                href="#conclusion"
                className={activeSection === 'conclusion' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('conclusion')
                  setIsMobileMenuOpen(false)
                }}
              >
                Kết luận
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Banner - Large with Image Area */}
      <section id="home" className="hero reveal-section">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử</h1>
          <p className="hero-subtitle">Theo mục 3.2 – Giáo trình Triết học Mác – Lênin</p>
          <p className="hero-description">
            Khám phá mối quan hệ biện chứng giữa quần chúng nhân dân và lãnh tụ trong tiến trình phát triển lịch sử
          </p>
          <button className="hero-cta" onClick={() => scrollToSection('intro')}>
            Tìm hiểu thêm
          </button>
        </div>
        <div className="scroll-indicator">
          <span>↓</span>
        </div>
      </section>

      {/* About/Intro Section */}
      <section id="intro" className="about-section reveal-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-heading">
            <span className="heading-main">Giới thiệu</span>
            <span className="heading-sub">Tìm hiểu về chủ đề</span>
          </h2>
          <div className="about-content">
            <p className="lead-text">
              Trong chủ nghĩa duy vật lịch sử, vấn đề vai trò của con người trong lịch sử được giải quyết trên lập trường khoa học và biện chứng.
            </p>
            <p>
              Triết học Mác – Lênin khẳng định rằng quần chúng nhân dân là người sáng tạo chân chính ra lịch sử, giữ vai trò quyết định đối với sự phát triển của xã hội, trong khi lãnh tụ giữ vai trò quan trọng trong việc định hướng, tổ chức và thúc đẩy phong trào xã hội.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section id="content" className="content-section reveal-section">
        <div className="container">
          <h2 className="section-heading">
            <span className="heading-main">Nội dung chính</span>
            <span className="heading-sub">Khám phá các khái niệm</span>
          </h2>
          
          {/* Concept Section - Quần chúng nhân dân */}
          <div
            className={`content-card concept-masses-card ${expandedCard === 'masses' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('masses')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">1. Khái niệm quần chúng nhân dân</h3>
              
              <p>
                Quần chúng nhân dân là tập hợp đông đảo những con người hoạt động trong những điều kiện lịch sử – xã hội nhất định, bao gồm nhiều thành phần và tầng lớp xã hội khác nhau.
              </p>
              <ul className="feature-list">
                <li>Những người lao động sản xuất ra của cải vật chất và tinh thần (lực lượng căn bản)</li>
                <li>Toàn thể nhân dân đấu tranh chống áp bức, bóc lột</li>
                <li>Những người trực tiếp hoặc gián tiếp góp phần vào sự biến đổi xã hội</li>
              </ul>
            </div>
          </div>

          {/* Concept Section - Lãnh tụ */}
          <div
            className={`content-card concept-leader-card ${expandedCard === 'leader' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('leader')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">2. Khái niệm lãnh tụ</h3>
              
              <p>
                Lãnh tụ là những cá nhân kiệt xuất xuất hiện từ trong phong trào quần chúng nhằm giải quyết các nhiệm vụ lịch sử đặt ra.
              </p>
              <ul className="feature-list">
                <li>Nhận thức đúng quy luật và xu thế phát triển của thời đại</li>
                <li>Có năng lực tổ chức, tập hợp và lãnh đạo quần chúng</li>
                <li>Được quần chúng tín nhiệm và ủng hộ</li>
              </ul>
            </div>
          </div>

          {/* Character/Showcase Section - Moved here */}
          <div className="character-card">
            <div className="character-bg-image"></div>
            <div className="character-content-inner">
              <h2 className="section-heading white">
                <span className="heading-main">Nhân vật tiêu biểu</span>
                <span className="heading-sub">Tìm hiểu về các nhân vật lịch sử</span>
              </h2>
              <div className="character-showcase">
                <div className="character-image-area"></div>
                <div className="character-info">
                  <h3 className="character-name">Chủ tịch Hồ Chí Minh</h3>
                  <p className="character-description">
                    Chủ tịch Hồ Chí Minh xuất hiện từ phong trào yêu nước của nhân dân Việt Nam, tiêu biểu cho trí tuệ và nguyện vọng của dân tộc trong thời kỳ cách mạng giải phóng dân tộc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Section */}
          <div
            className={`content-card role-card ${expandedCard === 'role' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('role')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">3. Vai trò quyết định của quần chúng nhân dân</h3>
              
              <p className="lead-text">
                Triết học Mác – Lênin khẳng định quần chúng nhân dân là chủ thể sáng tạo chân chính của lịch sử, thể hiện trên ba phương diện cơ bản:
              </p>

              <div className="feature-grid">
                <div className="feature-item">
                  <div className="feature-number">3.1</div>
                  <h4 className="feature-title">Lực lượng sản xuất cơ bản</h4>
                  <p>Quần chúng nhân dân trực tiếp sản xuất ra toàn bộ của cải vật chất và các giá trị tinh thần.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-number">3.2</div>
                  <h4 className="feature-title">Động lực cách mạng</h4>
                  <p>Mọi cuộc cách mạng xã hội chỉ có thể giành thắng lợi khi có sự tham gia tích cực của quần chúng nhân dân.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-number">3.3</div>
                  <h4 className="feature-title">Sáng tạo văn hóa</h4>
                  <p>Quần chúng nhân dân sáng tạo, lưu giữ và truyền bá các giá trị văn hóa, đạo đức và tinh thần.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leader Section */}
          <div
            className={`content-card leader-card ${expandedCard === 'leaderRole' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('leaderRole')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">4. Vai trò quan trọng của lãnh tụ</h3>
              
              <p>
                Bên cạnh vai trò quyết định của quần chúng nhân dân, triết học Mác – Lênin cũng khẳng định vai trò to lớn của lãnh tụ trong lịch sử.
              </p>
              <p>
                Lãnh tụ là người nhận thức đúng quy luật khách quan, đề ra đường lối, chiến lược và phương pháp hành động phù hợp; đồng thời tổ chức và lãnh đạo quần chúng hành động thống nhất.
              </p>
              <div className="highlight-box">
                <strong>Lưu ý quan trọng:</strong> Tuy nhiên, lãnh tụ không thể thay thế vai trò của quần chúng nhân dân, mà chỉ có thể phát huy vai trò của mình thông qua hoạt động thực tiễn của quần chúng.
              </div>
            </div>
          </div>

          {/* Relationship Section */}
          <div
            className={`content-card relationship-card ${expandedCard === 'relationship' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('relationship')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">5. Mối quan hệ biện chứng</h3>
              
              <p>
                Giữa quần chúng nhân dân và lãnh tụ tồn tại mối quan hệ thống nhất biện chứng, không tách rời:
              </p>
              <ul className="feature-list">
                <li>Quần chúng nhân dân là lực lượng tạo ra lãnh tụ; lãnh tụ là sản phẩm của thời đại và phong trào quần chúng.</li>
                <li>Lãnh tụ giữ vai trò dẫn dắt, định hướng và tổ chức phong trào quần chúng, qua đó thúc đẩy sự phát triển của lịch sử.</li>
              </ul>
            </div>
          </div>

          {/* Methodology Section */}
          <div
            className={`content-card methodology-card ${expandedCard === 'methodology' ? 'expanded' : 'collapsed'}`}
            onClick={() => toggleCard('methodology')}
          >
            <div className="card-image-area"></div>
            <div className="card-content">
              <h3 className="card-title">6. Ý nghĩa phương pháp luận</h3>
              
              <p>
                Từ mối quan hệ giữa quần chúng nhân dân và lãnh tụ, triết học Mác – Lênin rút ra những ý nghĩa phương pháp luận quan trọng:
              </p>
              <ul className="feature-list">
                <li>Chống tư tưởng sùng bái cá nhân, tuyệt đối hóa vai trò của lãnh tụ</li>
                <li>Đồng thời chống quan điểm xem nhẹ hoặc phủ nhận vai trò của lãnh tụ</li>
                <li>Cần kết hợp hài hòa vai trò của quần chúng nhân dân và lãnh tụ để phát huy sức mạnh tổng hợp của xã hội</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="conclusion-section reveal-section">
        <div className="container">
          <h2 className="section-heading white">
            <span className="heading-main">Kết luận</span>
            <span className="heading-sub">Tóm tắt nội dung</span>
          </h2>
          <div className="conclusion-content">
            <p>
              Triết học Mác – Lênin khẳng định rằng quần chúng nhân dân là chủ thể sáng tạo ra lịch sử, còn lãnh tụ giữ vai trò quan trọng trong việc định hướng và tổ chức phong trào. Hai yếu tố này thống nhất với nhau và cùng thúc đẩy sự phát triển của xã hội.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">Về bài nghiên cứu</h4>
              <p>Triết học Mác – Lênin</p>
              <p>Mục 3.2 – Giáo trình chính thức</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Nội dung</h4>
              <ul className="footer-links">
                <li><a href="#intro">Giới thiệu</a></li>
                <li><a href="#content">Nội dung chính</a></li>
                <li><a href="#conclusion">Kết luận</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Liên kết</h4>
              <ul className="footer-links">
                <li><a href="#home">Trang chủ</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToTop() }}>Về đầu trang</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 - Triết học Mác – Lênin - Mục 3.2. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Về đầu trang">
          <span className="arrow-up">↑</span>
        </button>
      )}
    </>
  )
}
