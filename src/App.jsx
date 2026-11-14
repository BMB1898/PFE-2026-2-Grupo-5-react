import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import useReveal from "./useReveal.js";
import Header from "./componentes/Header.jsx";
import Footer from "./componentes/Footer.jsx";
import Planos from "./pages/Planos.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

// O App é o "molde" de todas as páginas: o Header e o Footer aparecem
// sempre, e o <Routes> troca só o miolo conforme o endereço (URL).
// Antes, cada arquivo .html repetia o header e o footer inteiros.
//
// Cada parte do site acrescenta aqui:
//   - o import da sua página (ou do Header e do Footer)
//   - a sua <Route> dentro do <Routes>
export default function App() {
  // useLocation diz em qual endereço o site está (ex.: "/planos")
  const { pathname } = useLocation();

  // Ao trocar de página, volta para o topo.
  // (Com <Link> o navegador não recarrega, então não faria isso sozinho.)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Liga a animação de entrada das seções em cada página
  useReveal(pathname);

  return (
    <>
    <Header />
    <Route path="/planos" element={<Planos />} />
      <Routes>
        {/* path="*": qualquer endereço que não existe.
            Enquanto a Home não for adicionada, o "/" também cai aqui. */}
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
      <Footer />
    </>
  );
}
