import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
                <Link className="main-nav-item" to="">
                Projets
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                Compétences
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                    Formations
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                    Contact
                </Link>
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
                <Link className="main-nav-item" to="">
                Projets
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                Compétences
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                    Formations
                </Link>
            </li>
            <li>
                <Link className="main-nav-item" to="">
                    Contact
                </Link>
            </li>
            </ul>
          </aside>
        </>
      )}
    </header>
  )
}
