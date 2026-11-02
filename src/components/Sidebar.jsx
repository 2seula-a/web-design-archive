import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Grid2X2, UserRound, PenLine, Clapperboard, ShoppingBag, Tag, PanelTop, Info, Mail, Menu, X, Sun, Moon } from 'lucide-react'
import { categoryNames } from '../data/projects'

const icons = { 'All Works': Grid2X2, Personal: UserRound, Redesign: PenLine, Video: Clapperboard, 'E-Commerce': ShoppingBag, Brand: Tag, 'Landing Page': PanelTop }

function ThemeButton({ theme, onToggleTheme, className }) {
  const isDark = theme === 'dark'
  return (
    <button className={`theme-toggle ${className}`} type="button" onClick={onToggleTheme} aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'} title={isDark ? '라이트 모드' : '다크 모드'}>
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span>Theme</span>
    </button>
  )
}

export default function Sidebar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const active = location.pathname === '/' ? params.get('category') || 'All Works' : ''

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const filter = (category) => {
    navigate(category === 'All Works' ? '/' : `/?category=${encodeURIComponent(category)}`)
    setIsMenuOpen(false)
  }

  return (
    <aside className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="sidebar-header">
        <Link className="brand" to="/" aria-label="WEB DESIGN ARCHIVE 홈" onClick={() => setIsMenuOpen(false)}>
          WEB DESIGN<br />ARCHIVE
        </Link>
        <p className="brand-copy">A curated collection of web design & digital creative works.</p>
        <div className="header-actions">
          <ThemeButton theme={theme} onToggleTheme={onToggleTheme} className="theme-toggle-mobile" />
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            aria-controls="sidebar-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="sidebar-menu" id="sidebar-menu">
        <nav className="sidebar-nav" aria-label="프로젝트 카테고리">
          {categoryNames.map((name) => {
            const Icon = icons[name]
            return (
              <button key={name} type="button" className={`nav-item ${active === name ? 'active' : ''}`} onClick={() => filter(name)} aria-pressed={active === name}>
                <Icon size={18} strokeWidth={1.55} />
                <span>{name}</span>
              </button>
            )
          })}
        </nav>

        <nav className="utility-nav" aria-label="기타 메뉴">
          <Link className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`} to="/about" onClick={() => setIsMenuOpen(false)}><Info size={18} strokeWidth={1.55} /><span>About</span></Link>
          <Link className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact" onClick={() => setIsMenuOpen(false)}><Mail size={18} strokeWidth={1.55} /><span>Contact</span></Link>
        </nav>

        <ThemeButton theme={theme} onToggleTheme={onToggleTheme} className="theme-toggle-desktop" />

        <div className="sidebar-note" aria-hidden="true">
          <span className="stem">⌇</span>
          <p>Good design<br />makes a kinder web.</p>
          <i />
        </div>
      </div>

      <button className="menu-backdrop" type="button" aria-label="메뉴 닫기" tabIndex={isMenuOpen ? 0 : -1} onClick={() => setIsMenuOpen(false)} />
    </aside>
  )
}
