import { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";


export default function Header() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Fermer avec la touche Échap
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

    // Focus sur le bouton fermer à l’ouverture (petit plus accessibilité)
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  return (
    <header>
      <nav>
        <div>
            <img src="/logo.png" alt="logo" />
        </div>
        {/* desktop */}
        <ul className="nav-links">
            <li>
                <HashLink smooth className="main-nav-item" to="#projects">
                Projets
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#skills">
                Compétences
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#education">
                    Formations
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#contact">
                    Contact
                </HashLink>
            </li>
        </ul>

        {/* Bouton hamburger mobile */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-controls="mobile-drawer"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >

        <RxHamburgerMenu />        
        </button>
      </nav>

      {/* ombre + volet mobile */}
      {open && (
        <>
          <button
            className="backdrop"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
          <aside
            id="mobile-drawer"
            className="mobile-drawer open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="drawer-header">
              <button
                ref={closeBtnRef}
                type="button"
                className="drawer-close"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <IoIosClose />
              </button>
            </div>
            <ul className="drawer-links" onClick={() => setOpen(false)}>
            <li>
                <HashLink smooth className="main-nav-item" to="#projects">
                Projets
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#skills">
                Compétences
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#education">
                    Formations
                </HashLink>
            </li>
            <li>
                <HashLink smooth className="main-nav-item" to="#contact">
                    Contact
                </HashLink>
            </li>
            </ul>
          </aside>
        </>
      )}
    </header>
  )
}
