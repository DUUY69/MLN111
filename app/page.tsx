'use client'

import { useEffect, useRef, useState } from 'react'

type GameState = 'start' | 'question' | 'explanation' | 'finished'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: {
    wrong: string  // Fallback khi không có wrongReasons theo từng đáp án
    correct: string
  }
  wrongReasons?: string[]  // Giải thích vì sao từng đáp án sai (theo index: 0=A, 1=B, ...)
  theory: string
}

interface LocData {
  title: string
  emoji: string
  questions: Question[]
  illustration?: string   // Ảnh trong câu hỏi (khi mở câu)
  envelopeIllustration?: string  // Ảnh trên phong bì khi đã chọn (nếu khác ảnh câu hỏi)
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  // Mini Game States (của bạn)
  const [gameState, setGameState] = useState<GameState>('start')
  const [currentLoc, setCurrentLoc] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [pickedEnvelopes, setPickedEnvelopes] = useState<number[]>([])
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const gameAudioRef = useRef<HTMLAudioElement>(null)
  
  // States từ main (navbar mobile, card expand)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>('masses')
  
  const gameData: LocData[] = [
    {
      title: 'GÓI BÁNH CHƯNG',
      emoji: '🥟',
      questions: [
        {
          question: 'Ai là chủ thể chính sáng tạo và lưu truyền phong tục gói bánh chưng ngày Tết?',
          options: ['Lãnh tụ', 'Quần chúng nhân dân', 'Triều đình phong kiến', 'Tầng lớp trí thức'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Đáp án này không đúng; quần chúng nhân dân mới là chủ thể sáng tạo và lưu truyền phong tục.',
            correct: 'Gói bánh chưng là hoạt động lao động, sáng tạo văn hóa do nhân dân thực hiện → quần chúng là chủ thể sáng tạo giá trị tinh thần.'
          },
          wrongReasons: [
            'Lãnh tụ không trực tiếp tạo ra các giá trị văn hóa dân gian hằng ngày.',
            '',
            'Triều đình phong kiến không phải chủ thể sáng tạo phong tục dân gian; chính quần chúng nhân dân mới sáng tạo và lưu truyền.',
            'Tầng lớp trí thức có đóng góp nhưng không phải chủ thể chính; quần chúng nhân dân mới là lực lượng sáng tạo và lưu truyền văn hóa dân gian.'
          ],
          theory: 'Quần chúng nhân dân là chủ thể sáng tạo giá trị văn hóa tinh thần'
        },
        {
          question: 'Truyền thống gói bánh chưng được duy trì qua nhiều thế hệ cho thấy điều gì?',
          options: ['Vai trò cá nhân kiệt xuất', 'Sức sáng tạo bền bỉ của quần chúng nhân dân', 'Sự bảo trợ của nhà nước', 'Vai trò của các bậc cao niên'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Truyền thống văn hóa không phụ thuộc vào một yếu tố đơn lẻ; quần chúng mới là chủ thể.',
            correct: 'Chính quần chúng nhân dân là người sáng tạo, lưu giữ và truyền bá văn hóa.'
          },
          wrongReasons: [
            'Truyền thống văn hóa không phụ thuộc vào một cá nhân cụ thể.',
            '',
            'Sự bảo trợ nhà nước có thể hỗ trợ nhưng không phải nguồn gốc; quần chúng nhân dân mới sáng tạo và lưu truyền văn hóa.',
            'Các bậc cao niên là một bộ phận của quần chúng; sức sáng tạo bền bỉ của toàn thể quần chúng mới là then chốt.'
          ],
          theory: 'Quần chúng nhân dân sáng tạo, lưu giữ và truyền bá văn hóa qua các thế hệ'
        },
        {
          question: 'Bánh chưng – biểu tượng văn hóa Tết – do ai sáng tạo nên?',
          options: ['Một cá nhân riêng lẻ', 'Quần chúng nhân dân qua lao động và đời sống', 'Các nghệ nhân cung đình', 'Tầng lớp quý tộc'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Biểu tượng văn hóa dân gian xuất phát từ đời sống quần chúng, không phải từ một nhóm hay cá nhân cụ thể.',
            correct: 'Văn hóa dân gian là sản phẩm của quần chúng qua quá trình lao động và sinh hoạt.'
          },
          wrongReasons: [
            'Một cá nhân riêng lẻ không phải chủ thể sáng tạo văn hóa dân gian; quần chúng qua lao động và đời sống mới sáng tạo nên.',
            '',
            'Nghệ nhân cung đình không phải nguồn gốc của văn hóa dân gian; quần chúng qua lao động và đời sống mới sáng tạo nên.',
            'Tầng lớp quý tộc không phải chủ thể sáng tạo văn hóa dân gian; quần chúng nhân dân mới là lực lượng đó.'
          ],
          theory: 'Văn hóa dân gian là sản phẩm của quần chúng qua lao động và sinh hoạt'
        }
      ],
      illustration: '/game/illustrations/loc-1.png',
      envelopeIllustration: '/game/illustrations/envelope-loc-1.png'
    },
    {
      title: 'DỰNG CÂY NÊU – TỔ CHỨC LỄ HỘI TẾT',
      emoji: '🎋',
      questions: [
        {
          question: 'Để lễ hội Tết diễn ra trật tự và có ý nghĩa, cần vai trò nào?',
          options: ['Chỉ quần chúng', 'Chỉ lãnh tụ', 'Kết hợp quần chúng và lãnh tụ', 'Chỉ cơ quan nhà nước', 'Chỉ các đoàn thể'],
          correctAnswer: 2,
          explanation: {
            wrong: 'Cần có cả quần chúng thực hiện và lãnh tụ tổ chức, định hướng.',
            correct: 'Quần chúng là lực lượng thực hiện, lãnh tụ giữ vai trò tổ chức và định hướng.'
          },
          wrongReasons: [
            'Chỉ quần chúng thì thiếu tổ chức, dễ rối loạn; cần có lãnh tụ định hướng và tổ chức.',
            'Chỉ lãnh tụ thì không đủ; lãnh tụ không thể tự tạo nên lễ hội nếu không có quần chúng tham gia.',
            '',
            'Cơ quan nhà nước chỉ là một bên; cần kết hợp cả quần chúng (thực hiện) và lãnh tụ (tổ chức).',
            'Đoàn thể là một phần; để lễ hội có ý nghĩa cần kết hợp hài hòa quần chúng và lãnh tụ.'
          ],
          theory: 'Kết hợp hài hòa vai trò quần chúng (thực hiện) và lãnh tụ (tổ chức, định hướng)'
        },
        {
          question: 'Vai trò của người đứng đầu làng/xã trong lễ hội Tết thể hiện điều gì?',
          options: ['Thay thế vai trò của nhân dân', 'Định hướng và tổ chức hoạt động chung', 'Trực tiếp thay nhân dân thực hiện', 'Quyết định mọi chi tiết lễ hội'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Lãnh tụ định hướng và tổ chức, không thay thế quần chúng.',
            correct: 'Đây chính là vai trò của lãnh tụ theo quan điểm Mác – Lênin.'
          },
          wrongReasons: [
            'Lãnh đạo không thể thay thế vai trò của nhân dân; lãnh tụ định hướng và tổ chức.',
            '',
            'Lãnh tụ không trực tiếp thay nhân dân thực hiện; họ tổ chức và định hướng để quần chúng thực hiện.',
            'Lãnh tụ không quyết định mọi chi tiết; vai trò là định hướng và tổ chức hoạt động chung.'
          ],
          theory: 'Vai trò lãnh tụ: định hướng và tổ chức, không thay thế quần chúng'
        },
        {
          question: 'Cây nêu ngày Tết được dựng lên nhờ sự kết hợp của ai?',
          options: ['Chỉ người đứng đầu làng', 'Cả quần chúng thực hiện và lãnh tụ tổ chức', 'Chỉ già làng', 'Chỉ thanh niên trong làng'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Cần cả quần chúng thực hiện và lãnh tụ tổ chức.',
            correct: 'Quần chúng là lực lượng thực hiện, lãnh tụ đóng vai trò dẫn dắt và tổ chức.'
          },
          wrongReasons: [
            'Một mình người đứng đầu làng không thể tạo nên lễ hội có ý nghĩa; cần quần chúng thực hiện.',
            '',
            'Già làng chỉ là một bộ phận; cây nêu được dựng nhờ cả quần chúng và lãnh tụ tổ chức.',
            'Thanh niên chỉ là lực lượng tham gia; cần cả quần chúng và lãnh tụ kết hợp.'
          ],
          theory: 'Quần chúng thực hiện, lãnh tụ dẫn dắt và tổ chức – kết hợp biện chứng'
        }
      ],
      illustration: '/game/illustrations/loc-2.png',
      envelopeIllustration: '/game/illustrations/envelope-loc-2.png'
    },
    {
      title: 'PHONG TRÀO "TẾT VÌ NGƯỜI NGHÈO"',
      emoji: '❤️',
      questions: [
        {
          question: 'Phong trào "Tết vì người nghèo" chỉ thành công khi nào?',
          options: ['Có lãnh tụ phát động', 'Có quần chúng tham gia', 'Cả A và B', 'Chỉ khi có kinh phí nhà nước', 'Chỉ khi truyền thông đưa tin'],
          correctAnswer: 2,
          explanation: {
            wrong: 'Cần cả lãnh tụ phát động và quần chúng tham gia.',
            correct: 'Thành công đến từ sự kết hợp biện chứng giữa lãnh tụ và quần chúng.'
          },
          wrongReasons: [
            'Chỉ có lãnh tụ phát động mà không có quần chúng tham gia thì phong trào không hiệu quả.',
            'Chỉ có quần chúng tham gia mà thiếu tổ chức, định hướng từ lãnh tụ thì khó lan tỏa rộng rãi.',
            '',
            'Kinh phí nhà nước có thể hỗ trợ nhưng thành công phụ thuộc vào sự kết hợp lãnh tụ và quần chúng.',
            'Truyền thông là công cụ; thành công thực sự đến từ cả lãnh tụ phát động và quần chúng tham gia.'
          ],
          theory: 'Sự kết hợp biện chứng giữa lãnh tụ (phát động) và quần chúng (tham gia)'
        },
        {
          question: 'Phong trào này thể hiện ý nghĩa phương pháp luận nào?',
          options: ['Đề cao tuyệt đối vai trò lãnh tụ', 'Phát huy sức mạnh toàn dân', 'Dựa vào tài trợ doanh nghiệp', 'Tập trung vào cá nhân tiêu biểu'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Triết học Mác – Lênin nhấn mạnh phát huy sức mạnh toàn dân, không sùng bái cá nhân.',
            correct: 'Mọi phong trào xã hội muốn bền vững phải dựa vào quần chúng.'
          },
          wrongReasons: [
            'Triết học Mác – Lênin phản đối sùng bái cá nhân, đề cao tuyệt đối lãnh tụ.',
            '',
            'Tài trợ doanh nghiệp chỉ là nguồn lực; ý nghĩa phương pháp luận là phát huy sức mạnh toàn dân.',
            'Tập trung vào cá nhân tiêu biểu trái với tinh thần phát huy sức mạnh toàn dân.'
          ],
          theory: 'Phát huy sức mạnh toàn dân; chống sùng bái cá nhân'
        },
        {
          question: 'Ai là người trực tiếp mang quà, lì xì đến với người nghèo trong phong trào "Tết vì người nghèo"?',
          options: ['Chỉ lãnh tụ phát động', 'Quần chúng tình nguyện viên và nhân dân tham gia', 'Chỉ cán bộ đoàn thể', 'Chỉ chính quyền địa phương'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Quần chúng mới là lực lượng trực tiếp thực hiện; lãnh tụ định hướng và tổ chức.',
            correct: 'Quần chúng là lực lượng trực tiếp thực hiện, lãnh tụ định hướng và tổ chức.'
          },
          wrongReasons: [
            'Lãnh tụ phát động nhưng không trực tiếp thực hiện toàn bộ; quần chúng mới là lực lượng trực tiếp.',
            '',
            'Cán bộ đoàn thể là một bộ phận của lực lượng thực hiện; quần chúng tình nguyện viên và nhân dân mới là chủ thể trực tiếp.',
            'Chính quyền địa phương hỗ trợ tổ chức; người trực tiếp mang quà đến là quần chúng tình nguyện viên và nhân dân.'
          ],
          theory: 'Quần chúng là lực lượng trực tiếp thực hiện, lãnh tụ định hướng'
        }
      ],
      illustration: '/game/illustrations/loc-3.png',
      envelopeIllustration: '/game/illustrations/envelope-loc-3.png'
    },
    {
      title: 'TẾT TRONG CÁCH MẠNG THÁNG TÁM 1945',
      emoji: '🇻🇳',
      questions: [
        {
          question: 'Vì sao Cách mạng Tháng Tám năm 1945 giành thắng lợi?',
          options: ['Nhờ một cá nhân kiệt xuất', 'Nhờ sự lãnh đạo đúng đắn và quần chúng nổi dậy', 'Nhờ ngoại bang viện trợ', 'Nhờ yếu tố may mắn'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Thắng lợi cách mạng nhờ lãnh đạo đúng đắn và quần chúng nổi dậy.',
            correct: 'Lãnh tụ đề ra đường lối đúng + quần chúng là lực lượng quyết định.'
          },
          wrongReasons: [
            'Không có quần chúng tham gia thì không thể có thắng lợi cách mạng; một cá nhân không làm nên lịch sử.',
            '',
            'Cách mạng Tháng Tám giành thắng lợi chủ yếu nhờ lãnh đạo đúng đắn và quần chúng nổi dậy, không phải ngoại bang viện trợ.',
            'Thắng lợi không phải may mắn mà nhờ đường lối đúng và sức mạnh quần chúng.'
          ],
          theory: 'Lãnh tụ đề ra đường lối đúng + quần chúng là lực lượng quyết định'
        },
        {
          question: 'Sự kiện này khẳng định luận điểm nào của Triết học Mác – Lênin?',
          options: ['Lãnh tụ quyết định toàn bộ lịch sử', 'Quần chúng là lực lượng quyết định, lãnh tụ giữ vai trò dẫn dắt', 'Lãnh tụ là động lực duy nhất', 'Điều kiện khách quan quyết định tất cả'],
          correctAnswer: 1,
          explanation: {
            wrong: 'Triết học Mác – Lênin khẳng định quần chúng là chủ thể sáng tạo lịch sử.',
            correct: 'Quần chúng là lực lượng quyết định, lãnh tụ giữ vai trò dẫn dắt.'
          },
          wrongReasons: [
            'Lãnh tụ quyết định toàn bộ lịch sử là tư tưởng sùng bái cá nhân; Cách mạng Tháng Tám khẳng định quần chúng là chủ thể.',
            '',
            'Lãnh tụ không phải động lực duy nhất; quần chúng mới là chủ thể sáng tạo lịch sử.',
            'Điều kiện khách quan quan trọng nhưng sự kiện này khẳng định vai trò quần chúng và lãnh tụ trong lịch sử.'
          ],
          theory: 'Quần chúng là chủ thể sáng tạo lịch sử; lãnh tụ dẫn dắt'
        },
        {
          question: 'Trong Cách mạng Tháng Tám 1945, lực lượng nào là "người làm nên lịch sử"?',
          options: ['Chỉ lãnh tụ và Đảng', 'Quần chúng nhân dân dưới sự lãnh đạo của Đảng', 'Chỉ Đảng Cộng sản', 'Chỉ lực lượng vũ trang'],
          correctAnswer: 1,
          explanation: {
            wrong: '"Người làm nên lịch sử" là quần chúng nhân dân dưới sự lãnh đạo của Đảng.',
            correct: 'Quần chúng là chủ thể lịch sử, lãnh tụ đề ra đường lối và dẫn dắt.'
          },
          wrongReasons: [
            'Lãnh tụ và Đảng lãnh đạo nhưng quần chúng mới là lực lượng làm nên lịch sử.',
            '',
            'Đảng lãnh đạo nhưng "người làm nên lịch sử" là quần chúng nhân dân dưới sự lãnh đạo ấy.',
            'Lực lượng vũ trang là một bộ phận; quần chúng nhân dân (trong đó có vũ trang) dưới sự lãnh đạo của Đảng mới là chủ thể.'
          ],
          theory: 'Quần chúng là chủ thể lịch sử – "người làm nên lịch sử"'
        }
      ],
      illustration: '/game/illustrations/loc-4.png',
      envelopeIllustration: '/game/illustrations/envelope-loc-4.png'
    }
  ]

  // Đảo vị trí phong bì: ô thứ i trên lưới → nội dung thứ ENVELOPE_ORDER[i] (0–11)
  const ENVELOPE_ORDER = [3, 7, 0, 10, 1, 4, 8, 11, 2, 5, 9, 6]
  
  const handlePickEnvelope = (index: number) => {
    const contentIndex = ENVELOPE_ORDER[index]
    const locIndex = Math.floor(contentIndex / 3)
    const questionIndex = contentIndex % 3
    if (locIndex < gameData.length) {
      if (!pickedEnvelopes.includes(index)) {
        setPickedEnvelopes([...pickedEnvelopes, index])
      }
      setCurrentLoc(locIndex)
      setCurrentQuestion(questionIndex)
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
            <li>
              <a
                href="#game"
                className={activeSection === 'game' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('game')
                  setIsMobileMenuOpen(false)
                }}
              >
                Mini Game
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
                    Chủ tịch Hồ Chí Minh xuất hiện từ phong trào yêu nước của nhân dân Việt Nam – lãnh tụ xuất phát từ phong trào quần chúng và gắn bó mật thiết với nhân dân, tiêu biểu cho trí tuệ và nguyện vọng của dân tộc trong thời kỳ cách mạng giải phóng dân tộc.
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

      {/* Mini Game Section */}
      <section id="game" className="game-section">
        <audio ref={gameAudioRef} src="/videoplayback.m4a" loop preload="metadata" />
        <button
          type="button"
          className="game-music-toggle"
          onClick={() => {
            const a = gameAudioRef.current
            if (!a) return
            if (isMusicPlaying) {
              a.pause()
              setIsMusicPlaying(false)
            } else {
              a.play().then(() => setIsMusicPlaying(true)).catch(() => {})
            }
          }}
          aria-label={isMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          title={isMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        >
          <span className="game-music-icon">{isMusicPlaying ? '🔊' : '🔇'}</span>
        </button>
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
                  const contentIndex = ENVELOPE_ORDER[index]
                  const locIndex = Math.floor(contentIndex / 3)
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
                            {(locData.envelopeIllustration ?? locData.illustration) ? (
                              <img src={locData.envelopeIllustration ?? locData.illustration} alt={locData.title} className="envelope-illustration" />
                            ) : (
                              <span className="envelope-title">{locData.title}</span>
                            )}
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
              <div className="quiz-frame">
                <div className="quiz-frame-inner">
                  <div className="quiz-frame-header">
                    <h3 className="loc-title">LỘC {currentLoc + 1}: {gameData[currentLoc].title}</h3>
                  </div>
                  {gameData[currentLoc].illustration && (
                    <div className="quiz-frame-illustration">
                      <img src={gameData[currentLoc].illustration} alt={gameData[currentLoc].title} />
                    </div>
                  )}
                  <div className="quiz-label">CÂU HỎI</div>
                  <h4 className="question-text">
                    {gameData[currentLoc].questions[currentQuestion].question}
                  </h4>
                  <div className="options-list">
                    {gameData[currentLoc].questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="choice-frame-wrapper">
                        <div className="choices-frame">
                          <button
                            className={`option-button option-gold ${selectedAnswer === index ? 'selected' : ''} ${selectedAnswer !== null ? 'disabled' : ''}`}
                            onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                            <span className="option-text">{option}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {gameState === 'explanation' && (
            <div className="game-explanation-screen">
              <div className="quiz-frame explanation-frame">
                <div className="quiz-frame-inner">
                  <div className="quiz-frame-header">
                    <h3 className="loc-title">LỘC {currentLoc + 1}: {gameData[currentLoc].title}</h3>
                  </div>
                  <div className="quiz-label">CÂU HỎI</div>
                  <h4 className="question-text">
                    {gameData[currentLoc].questions[currentQuestion].question}
                  </h4>
                  
                  <div className="answer-result-new">
                    {selectedAnswer === gameData[currentLoc].questions[currentQuestion].correctAnswer ? (
                      <div className="answer-card answer-correct-card">
                        <div className="answer-card-content">
                          <div className="answer-card-label">Đáp án đúng</div>
                          <p>{gameData[currentLoc].questions[currentQuestion].explanation.correct}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="answer-card answer-wrong-card">
                          <div className="answer-card-content">
                            <div className="answer-card-label wrong">Đáp án sai</div>
                            <p className="your-choice-line">Bạn đã chọn: <strong>{String.fromCharCode(65 + (selectedAnswer ?? 0))}. {gameData[currentLoc].questions[currentQuestion].options[selectedAnswer ?? 0]}</strong></p>
                            <p>{(() => {
                              const q = gameData[currentLoc].questions[currentQuestion]
                              const reasons = q.wrongReasons
                              const idx = selectedAnswer ?? 0
                              if (reasons && reasons[idx]) return reasons[idx]
                              return q.explanation.wrong
                            })()}</p>
                          </div>
                        </div>
                        <div className="answer-card answer-correct-card">
                          <div className="answer-card-content">
                            <div className="answer-card-label">Đáp án đúng</div>
                            <p>{gameData[currentLoc].questions[currentQuestion].explanation.correct}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="philosophy-message">
                    <span className="philosophy-label">Lý thuyết áp dụng:</span>
                    <p className="message-text">{gameData[currentLoc].questions[currentQuestion].theory}</p>
                  </div>
                  
                  <button className="btn-nhan-loc" onClick={handleContinueAfterExplanation}>
                    {pickedEnvelopes.length === 12 ? 'Xem kết quả' : 'Nhận Lộc'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {gameState === 'finished' && (
            <div className="game-finished-screen">
              <div className="finished-content">
                <div className="finished-icon"></div>
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
                    <li>Quần chúng nhân dân là chủ thể sáng tạo lịch sử</li>
                    <li>Lãnh tụ không đứng ngoài quần chúng</li>
                    <li>Chống sùng bái cá nhân</li>
                    <li>Phát huy sức mạnh toàn dân</li>
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
            <p className="footer-ai-credit">Sản phẩm có sử dụng AI (Cursor và ChatGPT) để hỗ trợ viết code, thiết kế giao diện, soạn nội dung lý thuyết và câu hỏi trắc nghiệm.</p>
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
