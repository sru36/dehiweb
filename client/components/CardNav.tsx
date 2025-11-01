import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardNav.css';

interface NavLink {
  label: string;
  ariaLabel: string;
  to?: string;
  href?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ease?: string;
}

export function CardNav({
  logo,
  logoAlt = "Logo",
  items,
  baseColor = "#fff",
  menuColor = "#000",
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
  ease = "power3.out",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={navRef}
      className={`card-nav-container ${!isVisible ? 'nav-hidden' : ''}`}
      style={{
        transition: `transform 0.3s ${ease}, opacity 0.3s ${ease}`,
      }}
    >
      <nav className={`card-nav ${isOpen ? 'open' : ''}`}>
        <div className="card-nav-top" style={{ backgroundColor: baseColor, color: menuColor }}>
          <div className="logo-container">
            <Link to="/" onClick={handleLinkClick}>
              <img src={logo} alt={logoAlt} className="logo" />
            </Link>
          </div>
          
          <button
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{ color: menuColor }}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <Link to="/login" onClick={handleLinkClick}>
            <button
              className="card-nav-cta-button"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              Login
            </button>
          </Link>
        </div>
        
        <div className="card-nav-content">
          {items.map((item, index) => (
            <div
              key={index}
              className="nav-card"
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((link, linkIndex) => {
                  const LinkComponent = link.to ? (
                    <Link
                      key={linkIndex}
                      to={link.to}
                      className="nav-card-link"
                      onClick={handleLinkClick}
                      aria-label={link.ariaLabel}
                      style={{ color: item.textColor }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={linkIndex}
                      href={link.href || '#'}
                      className="nav-card-link"
                      onClick={handleLinkClick}
                      aria-label={link.ariaLabel}
                      style={{ color: item.textColor }}
                    >
                      {link.label}
                    </a>
                  );
                  return LinkComponent;
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}


