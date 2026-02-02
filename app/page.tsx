'use client'

import { useEffect, useState } from 'react'

type GameState = 'start' | 'question' | 'explanation' | 'finished'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: {
    wrong: string
    correct: string
  }
}

interface LocData {
  title: string
  emoji: string
  questions: Question[]
  message: string
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // Mini Game States
  const [gameState, setGameState] = useState<GameState>('start')
  const [currentLoc, setCurrentLoc] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [pickedEnvelopes, setPickedEnvelopes] = useState<number[]>([])
  
  const gameData: LocData[] = [
    {
      title: 'GÓI BÁNH CHƯNG',
      emoji: '🥟',
      questions: [
        {
          question: 'Gói bánh chưng ngày Tết thể hiện vai trò nào trong lịch sử xã hội?',
          options: ['Lãnh tụ', 'Quần chúng nhân dân'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Lãnh tụ không trực tiếp tạo ra các giá trị văn hóa dân gian hằng ngày.',
            correct: 'Gói bánh chưng là hoạt động lao động, sáng tạo văn hóa do nhân dân thực hiện → quần chúng là chủ thể sáng tạo giá trị tinh thần.'
          }
        },
        {
          question: 'Truyền thống gói bánh chưng được duy trì qua nhiều thế hệ cho thấy điều gì?',
          options: ['Vai trò cá nhân kiệt xuất', 'Sức sáng tạo bền bỉ của quần chúng nhân dân'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Truyền thống văn hóa không phụ thuộc vào một cá nhân cụ thể.',
            correct: 'Chính quần chúng nhân dân là người sáng tạo, lưu giữ và truyền bá văn hóa.'
          }
        }
      ],
      message: 'Quần chúng nhân dân là chủ thể sáng tạo giá trị văn hóa tinh thần'
    },
    {
      title: 'DỰNG CÂY NÊU – TỔ CHỨC LỄ HỘI TẾT',
      emoji: '🎋',
      questions: [
        {
          question: 'Để lễ hội Tết diễn ra trật tự và có ý nghĩa, cần vai trò nào?',
          options: ['Chỉ quần chúng', 'Chỉ lãnh tụ', 'Kết hợp quần chúng và lãnh tụ'],
          correctAnswer: 2,
          explanation: {
            wrong: 'Quần chúng đông đảo nhưng thiếu tổ chức sẽ dễ dẫn đến rối loạn. Lãnh tụ không thể tự mình tạo nên lễ hội nếu không có quần chúng tham gia.',
            correct: 'Quần chúng là lực lượng thực hiện, lãnh tụ giữ vai trò tổ chức và định hướng.'
          }
        },
        {
          question: 'Vai trò của người đứng đầu làng/xã trong lễ hội Tết thể hiện điều gì?',
          options: ['Thay thế vai trò của nhân dân', 'Định hướng và tổ chức hoạt động chung'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Lãnh đạo không thể thay thế hoạt động của quần chúng.',
            correct: 'Đây chính là vai trò của lãnh tụ theo quan điểm Mác – Lênin.'
          }
        }
      ],
      message: 'Kết hợp hài hòa vai trò của quần chúng và lãnh tụ'
    },
    {
      title: 'PHONG TRÀO "TẾT VÌ NGƯỜI NGHÈO"',
      emoji: '❤️',
      questions: [
        {
          question: 'Phong trào "Tết vì người nghèo" chỉ thành công khi nào?',
          options: ['Có lãnh tụ phát động', 'Có quần chúng tham gia', 'Cả A và B'],
          correctAnswer: 2,
          explanation: {
            wrong: 'Chỉ phát động mà không có sự tham gia của quần chúng thì phong trào không hiệu quả. Tự phát, thiếu tổ chức sẽ khó lan tỏa rộng rãi.',
            correct: 'Thành công đến từ sự kết hợp biện chứng giữa lãnh tụ và quần chúng.'
          }
        },
        {
          question: 'Phong trào này thể hiện ý nghĩa phương pháp luận nào?',
          options: ['Đề cao tuyệt đối vai trò lãnh tụ', 'Phát huy sức mạnh toàn dân'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Triết học Mác – Lênin phản đối sùng bái cá nhân.',
            correct: 'Mọi phong trào xã hội muốn bền vững phải dựa vào quần chúng.'
          }
        }
      ],
      message: 'Phát huy sức mạnh toàn dân trong mọi phong trào xã hội'
    },
    {
      title: 'TẾT TRONG CÁCH MẠNG THÁNG TÁM 1945',
      emoji: '🇻🇳',
      questions: [
        {
          question: 'Vì sao Cách mạng Tháng Tám năm 1945 giành thắng lợi?',
          options: ['Nhờ một cá nhân kiệt xuất', 'Nhờ sự lãnh đạo đúng đắn và quần chúng nổi dậy'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Không có quần chúng tham gia thì không thể có thắng lợi cách mạng.',
            correct: 'Lãnh tụ đề ra đường lối đúng + quần chúng là lực lượng quyết định.'
          }
        },
        {
          question: 'Sự kiện này khẳng định luận điểm nào của Triết học Mác – Lênin?',
          options: ['Lãnh tụ quyết định toàn bộ lịch sử', 'Quần chúng là chủ thể sáng tạo lịch sử'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Đây là biểu hiện của tư tưởng sùng bái cá nhân.',
            correct: 'Quần chúng là lực lượng quyết định, lãnh tụ giữ vai trò dẫn dắt.'
          }
        }
      ],
      message: 'Quần chúng là lực lượng quyết định, lãnh tụ giữ vai trò dẫn dắt'
    }
  ]
  
  const handlePickEnvelope = (index: number) => {
    const locIndex = Math.floor(index / 3) // Mỗi lộc có 3 phong bao
    if (locIndex < gameData.length) {
      // Nếu chưa chọn phong bao này, thêm vào danh sách
      if (!pickedEnvelopes.includes(index)) {
        setPickedEnvelopes([...pickedEnvelopes, index])
      }
      // Luôn chuyển sang câu hỏi của lộc này (bắt đầu từ câu hỏi đầu tiên)
      setCurrentLoc(locIndex)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setGameState('question')
    }
  }
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    // Tự động hiện giải thích ngay sau khi chọn đáp án
    setTimeout(() => {
      setGameState('explanation')
    }, 300)
  }
  
  const handleContinueAfterExplanation = () => {
    // Quay lại màn hình chọn phong bao để chọn phong bao tiếp theo
    // Kiểm tra xem đã chọn hết tất cả phong bao chưa
    if (pickedEnvelopes.length === 12) {
      setGameState('finished')
    } else {
      setGameState('start')
    }
  }
  
  const handleRestartGame = () => {
    setGameState('start')
    setCurrentLoc(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setPickedEnvelopes([])
  }

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
      {/* Navigation - Dark Theme */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${showNavbar ? 'visible' : 'hidden'}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToTop()}>
            Triết học Mác – Lênin
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Trang chủ</a></li>
            <li><a href="#intro" onClick={(e) => { e.preventDefault(); scrollToSection('intro') }}>Giới thiệu</a></li>
            <li><a href="#content" onClick={(e) => { e.preventDefault(); scrollToSection('content') }}>Nội dung</a></li>
            <li><a href="#conclusion" onClick={(e) => { e.preventDefault(); scrollToSection('conclusion') }}>Kết luận</a></li>
            <li><a href="#game" onClick={(e) => { e.preventDefault(); scrollToSection('game') }}>Mini Game</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Banner - Large with Image Area */}
      <section id="home" className="hero">
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
      <section id="intro" className="about-section">
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
      <section id="content" className="content-section">
        <div className="container">
          <h2 className="section-heading">
            <span className="heading-main">Nội dung chính</span>
            <span className="heading-sub">Khám phá các khái niệm</span>
          </h2>
          
          {/* Concept Section - Quần chúng nhân dân */}
          <div className="content-card concept-masses-card">
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
          <div className="content-card concept-leader-card">
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
          <div className="content-card role-card">
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
          <div className="content-card leader-card">
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
          <div className="content-card relationship-card">
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
          <div className="content-card methodology-card">
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
      <section id="conclusion" className="conclusion-section">
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

      {/* Mini Game Section */}
      <section id="game" className="game-section">
        <div className="falling-elements falling-1"></div>
        <div className="falling-elements falling-2"></div>
        <div className="falling-elements falling-3"></div>
        <div className="falling-elements falling-4"></div>
        <div className="game-banner-block container">
          <img src="/game/game-header.png" alt="Hái Lộc Đầu Xuân" className="game-banner-img" />
          
          {gameState === 'start' && (
            <div className="game-start-screen">
              <div className="envelopes-grid">
                {Array.from({ length: 12 }).map((_, index) => {
                  const locIndex = Math.floor(index / 3)
                  const isPicked = pickedEnvelopes.includes(index)
                  const locData = gameData[locIndex]
                  
                  return (
                    <div
                      key={index}
                      className={`envelope ${isPicked ? 'picked' : ''} ${pickedEnvelopes.length === 12 ? 'all-picked' : ''}`}
                      onClick={() => !isPicked && handlePickEnvelope(index)}
                    >
                      <div className="envelope-front">
                        <div className="envelope-gold-design"></div>
                        {isPicked && locData && (
                          <div className="envelope-content">
                            <span className="envelope-emoji">{locData.emoji}</span>
                            <span className="envelope-title">{locData.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {pickedEnvelopes.length === 0 && (
                <div>
                  <p className="game-instruction" style={{ marginBottom: '1rem' }}>
                    Chọn một phong bao để bắt đầu hái lộc
                  </p>
                </div>
              )}
              
              {pickedEnvelopes.length > 0 && pickedEnvelopes.length < 12 && (
                <p className="game-instruction">Chọn một phong bao khác để tiếp tục</p>
              )}
              
              {pickedEnvelopes.length === 12 && (
                <button className="game-start-button" onClick={() => setGameState('finished')}>
                  Xem kết quả
                </button>
              )}
            </div>
          )}
          
          {gameState === 'question' && (
            <div className="game-question-screen">
              <div className="game-loc-header">
                <span className="loc-emoji">{gameData[currentLoc].emoji}</span>
                <h3 className="loc-title">LỘC {currentLoc + 1}: {gameData[currentLoc].title}</h3>
              </div>
              
              <div className="loc-image-container">
                {currentLoc === 0 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc1/banh-chung.jpg)' }}></div>
                )}
                {currentLoc === 1 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc2/cay-neu.jpg)' }}></div>
                )}
                {currentLoc === 2 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc3/tet-nguoi-ngheo.jpg)' }}></div>
                )}
                {currentLoc === 3 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc4/cm-thang-8.jpg)' }}></div>
                )}
              </div>
              
              <div className="question-box">
                <h4 className="question-text">
                  {gameData[currentLoc].questions[currentQuestion].question}
                </h4>
                
                <div className="options-list">
                  {gameData[currentLoc].questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${selectedAnswer === index ? 'selected' : ''} ${selectedAnswer !== null ? 'disabled' : ''}`}
                      onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {gameState === 'explanation' && (
            <div className="game-explanation-screen">
              <div className="game-loc-header">
                <span className="loc-emoji">{gameData[currentLoc].emoji}</span>
                <h3 className="loc-title">LỘC {currentLoc + 1}: {gameData[currentLoc].title}</h3>
              </div>
              
              <div className="loc-image-container">
                {currentLoc === 0 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc1/banh-chung.jpg)' }}></div>
                )}
                {currentLoc === 1 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc2/cay-neu.jpg)' }}></div>
                )}
                {currentLoc === 2 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc3/tet-nguoi-ngheo.jpg)' }}></div>
                )}
                {currentLoc === 3 && (
                  <div className="loc-image" style={{ backgroundImage: 'url(/game/loc4/cm-thang-8.jpg)' }}></div>
                )}
              </div>
              
              <div className="explanation-box">
                <h4 className="question-text">
                  {gameData[currentLoc].questions[currentQuestion].question}
                </h4>
                
                <div className="answer-result">
                  <div className={`result-badge ${selectedAnswer === gameData[currentLoc].questions[currentQuestion].correctAnswer ? 'correct' : 'wrong'}`}>
                    {selectedAnswer === gameData[currentLoc].questions[currentQuestion].correctAnswer ? '✅ Đúng' : '❌ Sai'}
                  </div>
                  
                  <div className="explanation-content">
                    {selectedAnswer === gameData[currentLoc].questions[currentQuestion].correctAnswer ? (
                      <div className="explanation-correct">
                        <p><strong>✅ Đáp án đúng:</strong></p>
                        <p>{gameData[currentLoc].questions[currentQuestion].explanation.correct}</p>
                      </div>
                    ) : (
                      <>
                        <div className="explanation-wrong">
                          <p><strong>❌ Đáp án sai:</strong></p>
                          <p>{gameData[currentLoc].questions[currentQuestion].explanation.wrong}</p>
                        </div>
                        <div className="explanation-correct">
                          <p><strong>✅ Đáp án đúng:</strong></p>
                          <p>{gameData[currentLoc].questions[currentQuestion].explanation.correct}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="philosophy-message">
                  <p className="message-text">🌱 {gameData[currentLoc].message}</p>
                </div>
                
                <button className="game-action-button primary" onClick={handleContinueAfterExplanation}>
                  {pickedEnvelopes.length === 12 ? 'Xem kết quả' : 'Hái lộc tiếp'}
                </button>
              </div>
            </div>
          )}
          
          {gameState === 'finished' && (
            <div className="game-finished-screen">
              <div className="finished-content">
                <div className="finished-icon">🎊</div>
                <h3 className="finished-title">Chúc mừng bạn đã hoàn thành!</h3>
                
                <div className="finished-image-container">
                  <div className="finished-image" style={{ backgroundImage: 'url(/game/finished/family.jpg)' }}></div>
                </div>
                
                <div className="final-message-box">
                  <p className="final-message-line">Tết là sản phẩm văn hóa do nhân dân sáng tạo</p>
                  <p className="final-message-line">Sự phát triển xã hội cần quần chúng làm nền tảng</p>
                  <p className="final-message-line">và lãnh tụ giữ vai trò định hướng</p>
                </div>
                
                <div className="philosophy-summary">
                  <h4>Thông điệp triết học:</h4>
                  <ul className="philosophy-list">
                    <li>🌱 Quần chúng nhân dân là chủ thể sáng tạo lịch sử</li>
                    <li>🌱 Lãnh tụ không đứng ngoài quần chúng</li>
                    <li>🌱 Chống sùng bái cá nhân</li>
                    <li>🌱 Phát huy sức mạnh toàn dân</li>
                  </ul>
                </div>
                
                <button className="game-action-button primary" onClick={handleRestartGame}>
                  Chơi lại
                </button>
              </div>
            </div>
          )}
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
                <li><a href="#game">Mini Game</a></li>
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
