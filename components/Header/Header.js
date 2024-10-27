import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router"; 
import { UserIdContext } from "../../context/UserIdContext";
import s from './Header.module.scss'
import cn from 'classnames'
import { ModalContext } from "../../context/ModalContext";

const Header = () => {
  const router = useRouter();

  const userId = useContext(UserIdContext);

  const { isMenuOpen, setIsMenuOpen } = useContext(ModalContext);
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  let menuClass = cn(s.header__menu, s.menu, {
    [s.active]: isMenuOpen,
    [s.active_browser]: !userId,
  });

  let burgerClass = cn(s.header__burger, {
    [s.active]: isMenuOpen,
    [s.browser]: !userId,
  });

  let headerClass = cn(s.header, {
    [s.browser]: !userId,
  });

  let linkClass = cn(s.menu__link, s.menu__link_active);

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
      <header className={!userId ? headerClass : s.header} role="banner">
        <div className={s.header__body}>
          <Link href={`/`} className={s.header__logo} aria-label="Перейти на головну сторінку">
            <img 
              src={'https://www.amelsmart.com/wp-content/themes/ameldental/assets/img/main-header/sloganlogo.svg'} 
              alt="Логотип клініки"
              loading="lazy"
            />
          </Link>
          <div 
            className={burgerClass} 
            onClick={toggleMenu} 
            role="button" 
            tabIndex={0} 
            aria-label="Відкрити/закрити меню"
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()} 
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={menuClass} aria-label="Основне меню">
            <ul className={s.menu__list}>
              <li onClick={closeMenu}>
                <Link 
                  href="/" 
                  className={isActive("/") ? linkClass : s.menu__link} 
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  Наші лікарі
                </Link>
              </li> 
              <li onClick={closeMenu}>
                <Link 
                  href="/registration" 
                  className={isActive("/registration") ? linkClass : s.menu__link}
                  aria-current={isActive("/registration") ? "page" : undefined}
                >
                  Запис
                </Link>
              </li>
              {userId && (
                <li onClick={closeMenu}>
                  <Link 
                    href={`/records?user_id=${userId}`} 
                    className={isActive("/records") ? linkClass : s.menu__link}
                    aria-current={isActive("/records") ? "page" : undefined}
                  >
                    Ваші записи
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div> 
      </header>

    </>
  );
};

export default Header;
