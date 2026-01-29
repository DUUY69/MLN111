'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToTop()}>
            Triết học Mác – Lênin
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Trang chủ</a></li>
            <li><a href="#intro" onClick={(e) => { e.preventDefault(); scrollToSection('intro') }}>Giới thiệu</a></li>
            <li><a href="#content" onClick={(e) => { e.preventDefault(); scrollToSection('content') }}>Nội dung</a></li>
            <li><a href="#examples" onClick={(e) => { e.preventDefault(); scrollToSection('examples') }}>Ví dụ</a></li>
            <li><a href="#conclusion" onClick={(e) => { e.preventDefault(); scrollToSection('conclusion') }}>Kết luận</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Banner */}
      <section id="home" className="hero">
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
        <div className="hero-overlay"></div>
      </section>

      {/* About/Intro Section */}
      <section id="intro" className="about-section">
        <div className="container">
          <h2 className="section-heading">Giới thiệu</h2>
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
      <section id="content" className="content-section">
        <div className="container">
          <h2 className="section-heading">Nội dung chính</h2>
          
          {/* Concept Section */}
          <div className="content-card concept-card">
            <h3 className="card-title">1. Khái niệm quần chúng nhân dân và lãnh tụ</h3>
            
            <div className="card-content">
              <h4 className="card-subtitle">Quần chúng nhân dân</h4>
              <p>
                Quần chúng nhân dân là tập hợp đông đảo những con người hoạt động trong những điều kiện lịch sử – xã hội nhất định, bao gồm nhiều thành phần và tầng lớp xã hội khác nhau.
              </p>
              <ul className="feature-list">
                <li>Những người lao động sản xuất ra của cải vật chất và tinh thần (lực lượng căn bản)</li>
                <li>Toàn thể nhân dân đấu tranh chống áp bức, bóc lột</li>
                <li>Những người trực tiếp hoặc gián tiếp góp phần vào sự biến đổi xã hội</li>
              </ul>

              <h4 className="card-subtitle">Lãnh tụ</h4>
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

          {/* Role Section */}
          <div className="content-card role-card">
            <h3 className="card-title">2. Vai trò quyết định của quần chúng nhân dân</h3>
            
            <div className="card-content">
              <p className="lead-text">
                Triết học Mác – Lênin khẳng định quần chúng nhân dân là chủ thể sáng tạo chân chính của lịch sử, thể hiện trên ba phương diện cơ bản:
              </p>

              <div className="feature-grid">
                <div className="feature-item">
                  <div className="feature-number">2.1</div>
                  <h4 className="feature-title">Lực lượng sản xuất cơ bản</h4>
                  <p>Quần chúng nhân dân trực tiếp sản xuất ra toàn bộ của cải vật chất và các giá trị tinh thần, tạo cơ sở cho sự tồn tại và phát triển của mọi xã hội.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-number">2.2</div>
                  <h4 className="feature-title">Động lực cách mạng</h4>
                  <p>Mọi cuộc cách mạng xã hội chỉ có thể giành thắng lợi khi có sự tham gia tích cực, tự giác và rộng rãi của quần chúng nhân dân.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-number">2.3</div>
                  <h4 className="feature-title">Sáng tạo văn hóa</h4>
                  <p>Thông qua hoạt động thực tiễn phong phú, quần chúng nhân dân sáng tạo, lưu giữ và truyền bá các giá trị văn hóa, đạo đức và tinh thần của xã hội.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leader Section */}
          <div className="content-card leader-card">
            <h3 className="card-title">3. Vai trò quan trọng của lãnh tụ</h3>
            
            <div className="card-content">
              <p>
                Bên cạnh vai trò quyết định của quần chúng nhân dân, triết học Mác – Lênin cũng khẳng định vai trò to lớn của lãnh tụ trong lịch sử.
              </p>
              <p>
                Lãnh tụ là người nhận thức đúng quy luật khách quan, đề ra đường lối, chiến lược và phương pháp hành động phù hợp; đồng thời tổ chức và lãnh đạo quần chúng hành động thống nhất, qua đó thúc đẩy phong trào xã hội phát triển.
              </p>
              <div className="highlight-box">
                <strong>Lưu ý quan trọng:</strong> Tuy nhiên, lãnh tụ không thể thay thế vai trò của quần chúng nhân dân, mà chỉ có thể phát huy vai trò của mình thông qua hoạt động thực tiễn của quần chúng.
              </div>
            </div>
          </div>

          {/* Relationship Section */}
          <div className="content-card relationship-card">
            <h3 className="card-title">4. Mối quan hệ biện chứng</h3>
            
            <div className="card-content">
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
          <div className="content-card methodology-card">
            <h3 className="card-title">5. Ý nghĩa phương pháp luận</h3>
            
            <div className="card-content">
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

      {/* Examples/Gallery Section */}
      <section id="examples" className="examples-section">
        <div className="container">
          <h2 className="section-heading">Ví dụ minh họa</h2>
          <div className="examples-grid">
            <div className="example-card">
              <h4 className="example-title">Chủ tịch Hồ Chí Minh</h4>
              <p className="example-text">
                Chủ tịch Hồ Chí Minh xuất hiện từ phong trào yêu nước của nhân dân Việt Nam, tiêu biểu cho trí tuệ và nguyện vọng của dân tộc trong thời kỳ cách mạng giải phóng dân tộc.
              </p>
            </div>
            <div className="example-card">
              <h4 className="example-title">Thành tựu kinh tế - xã hội</h4>
              <p className="example-text">
                Mọi thành tựu kinh tế – xã hội đều gắn liền với lao động của hàng triệu người lao động, chứ không phải do một cá nhân riêng lẻ tạo ra.
              </p>
            </div>
            <div className="example-card">
              <h4 className="example-title">Cách mạng Tháng Tám 1945</h4>
              <p className="example-text">
                Trong Cách mạng Tháng Tám năm 1945, chính sự nổi dậy đồng loạt của quần chúng nhân dân trên phạm vi cả nước đã quyết định thắng lợi của cách mạng.
              </p>
            </div>
            <div className="example-card">
              <h4 className="example-title">Giá trị văn hóa dân gian</h4>
              <p className="example-text">
                Kho tàng ca dao, tục ngữ, phong tục tập quán và các giá trị văn hóa dân gian đều do quần chúng nhân dân sáng tạo và lưu truyền qua nhiều thế hệ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="conclusion-section">
        <div className="container">
          <h2 className="section-heading white">Kết luận</h2>
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
                <li><a href="#examples">Ví dụ minh họa</a></li>
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
          ↑
        </button>
      )}
    </>
  )
}
