import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import LogoOneToOne from "./LogoOneToOne.jsx";
import logoPlaymakerz from "../assets/img/logo-playmakerz.png";
import logoPkzLab from "../assets/img/logo-pkz-lab.png";
import "./Header.css";

// Cabeçalho: logo + menu de navegação.
// No site em HTML, o script.js procurava os elementos com querySelector
// e trocava classes na mão. Aqui cada coisa que muda na tela é um estado
// (useState) e o React atualiza as classes sozinho.
export default function Header() {
  const { pathname } = useLocation();

  const [rolou, setRolou] = useState(false); // a página desceu mais de 10px?
  const [menuAberto, setMenuAberto] = useState(false); // menu do celular
  const [submenuAberto, setSubmenuAberto] = useState(false); // submenu "Agendar"

  // useRef guarda uma referência a um elemento do DOM,
  // usada para saber se um clique foi dentro ou fora do menu
  const refMenu = useRef(null);
  const refBotaoMenu = useRef(null);
  const refAgendar = useRef(null);

  function fechaTudo() {
    setMenuAberto(false);
    setSubmenuAberto(false);
  }

  // 1. HEADER QUE MUDA AO ROLAR A PÁGINA
  // Quando a página desce mais de 10px, o header ganha a classe
  // "scrolled", que no CSS deixa o fundo escuro.
  useEffect(() => {
    function atualizaHeader() {
      setRolou(window.scrollY > 10);
    }
    atualizaHeader();
    window.addEventListener("scroll", atualizaHeader, { passive: true });
    return () => window.removeEventListener("scroll", atualizaHeader);
  }, []); // lista vazia: liga o evento uma vez só

  // 2 e 3. Fecha o menu do celular e o submenu ao clicar fora ou apertar ESC
  useEffect(() => {
    function cliqueFora(evento) {
      const noMenu = refMenu.current.contains(evento.target);
      const noBotao = refBotaoMenu.current.contains(evento.target);
      if (!noMenu && !noBotao) setMenuAberto(false);
      if (!refAgendar.current.contains(evento.target)) setSubmenuAberto(false);
    }
    function apertouTecla(evento) {
      if (evento.key === "Escape") fechaTudo();
    }
    document.addEventListener("click", cliqueFora);
    document.addEventListener("keydown", apertouTecla);
    return () => {
      document.removeEventListener("click", cliqueFora);
      document.removeEventListener("keydown", apertouTecla);
    };
  }, []);

  // A logo muda conforme a página: One to One, PKZ Lab ou Playmakerz
  let logo;
  if (pathname === "/one-to-one" || pathname === "/agendar-one-to-one") {
    logo = (
      <Link
        className="nav-logo"
        to="/"
        aria-label="One to One Studio — página inicial"
        onClick={fechaTudo}
      >
        <LogoOneToOne variante="nav" />
      </Link>
    );
  } else if (pathname === "/pkz" || pathname === "/agendar-pkz") {
    logo = (
      <Link className="nav-logo" to="/" onClick={fechaTudo}>
        <img
          className="nav-pkzlab"
          src={logoPkzLab}
          alt="PKZ Lab — página inicial"
          width={133}
          height={40}
        />
      </Link>
    );
  } else {
    logo = (
      <Link className="nav-logo" to="/" onClick={fechaTudo}>
        <img
          src={logoPlaymakerz}
          alt="Playmakerz — página inicial"
          width={150}
          height={34}
        />
      </Link>
    );
  }

  // Monta a className juntando as classes que estão valendo agora
  let classesHeader = "site-header";
  if (rolou) classesHeader += " scrolled";
  if (menuAberto) classesHeader += " nav-open";

  const emAgendar = pathname.startsWith("/agendar");

  return (
    <header className={classesHeader}>
      <div className="container nav">
        {logo}

        <button
          ref={refBotaoMenu}
          className="nav-toggle"
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="nav-links"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav aria-label="Menu principal">
          {/* NavLink é um Link que ganha a classe "active" (e aria-current)
              sozinho quando o endereço é o da página atual */}
          <ul className="nav-links" id="nav-links" ref={refMenu}>
            <li>
              <NavLink to="/one-to-one" onClick={fechaTudo}>
                One to One
              </NavLink>
            </li>
            <li>
              <NavLink to="/pkz" onClick={fechaTudo}>
                PKZ
              </NavLink>
            </li>
            <li>
              <NavLink to="/fisioterapia" onClick={fechaTudo}>
                Fisioterapia
              </NavLink>
            </li>
            <li>
              <NavLink to="/planos" onClick={fechaTudo}>
                Planos
              </NavLink>
            </li>
            <li
              ref={refAgendar}
              className={submenuAberto ? "has-dropdown open" : "has-dropdown"}
            >
              <button
                type="button"
                className={emAgendar ? "dropdown-toggle active" : "dropdown-toggle"}
                aria-expanded={submenuAberto}
                onClick={() => setSubmenuAberto(!submenuAberto)}
              >
                Agendar <span className="chev"></span>
              </button>
              <ul className="dropdown">
                <li>
                  <NavLink to="/agendar-one-to-one" onClick={fechaTudo}>
                    One-to-One
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/agendar-pkz" onClick={fechaTudo}>
                    PKZ
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
