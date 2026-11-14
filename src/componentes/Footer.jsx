import { Link } from "react-router-dom";

import logoPlaymakerz from "../assets/img/logo-playmakerz.png";
import "./Footer.css";

// O ano é calculado quando o site abre: o copyright não fica desatualizado.
// Fica fora do componente porque não muda enquanto a página está aberta.
const ano = new Date().getFullYear();

// Rodapé: contato, links e copyright.
// Fica no App.jsx, então aparece igual em todas as páginas.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img
              className="logo"
              src={logoPlaymakerz}
              alt="Playmakerz"
              width={140}
              height={32}
              loading="lazy"
            />
            <p>
              Uma empresa, duas formas de aplicar a mesma metodologia.
              Transformamos potencial em performance — para cada idade e cada
              esporte.
            </p>
            <address className="addr">Barra da Tijuca · Rio de Janeiro</address>
          </div>
          <nav aria-labelledby="rodape-marcas">
            <h2 id="rodape-marcas">Marcas</h2>
            <ul>
              <li>
                <Link to="/one-to-one">One-to-One Studio</Link>
              </li>
              <li>
                <Link to="/pkz">PKZ · Playmakerz</Link>
              </li>
              <li>
                <Link to="/fisioterapia">Fisioterapia</Link>
              </li>
              <li>
                <Link to="/planos">Planos</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="rodape-acesso">
            <h2 id="rodape-acesso">Acesso</h2>
            <ul>
              <li>
                <Link to="/agendar-one-to-one">Agendar · One-to-One</Link>
              </li>
              <li>
                <Link to="/agendar-pkz">Agendar · PKZ</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; <time dateTime={String(ano)}>{ano}</time> PKZ One-to-One.
            Todos os direitos reservados.
          </p>
          <p className="tag">Do potencial à performance</p>
        </div>
      </div>
    </footer>
  );
}
