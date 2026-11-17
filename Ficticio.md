# O que é fictício

| Categoria | Situação | Onde está |
| --- | --- | --- |
| Fotos de pessoas e treinos | Baixadas de sites externos (não são da empresa) | `src/imagem/`: `prof-carla.jpg`, `prof-henrique.jpg`, `prof-eduardo.jpg`, `prof-rafael.jpg`, `fisio-1.jpg` a `fisio-4.jpg`, `hero-fisioterapia.jpg`, `hero-one-to-one.jpg`, `hero-pkz.jpg`, `pkz-1.jpg` a `pkz-4.jpg`, `hero-home.jpg`, `home-academia.jpg`, `home-academia-2.jpg`, `home-futebol-1.jpg`, `home-futebol-2.jpg`, `home-fisioterapia.jpg` |
| Profissionais da equipe | Fictícios | `src/pages/Fisioterapia.jsx` (`EQUIPE`, linhas 84–103), `src/pages/OneToOne.jsx` (`EQUIPE`, linhas 39–58), `src/pages/Pkz.jsx` (`EQUIPE`, linhas 73–92) |
| Depoimentos de clientes | Fictícios | `src/pages/Fisioterapia.jsx` (`DEPOIMENTOS`, linhas 105–124), `src/pages/OneToOne.jsx` (`DEPOIMENTOS`, linhas 60–79), `src/pages/Pkz.jsx` (`DEPOIMENTOS`, linhas 94–113) |
| Dados da página de fisioterapia | Fictícios | `src/pages/Fisioterapia.jsx` (`AREAS`, `FOTOS`, `PASSOS`, `EQUIPE`, `DEPOIMENTOS`, `PERGUNTAS` e textos fixos, linhas 28–282); card da fisioterapia na home em `src/pages/Home.jsx` (linhas 172–183) |
| Perguntas frequentes | Fictícios | `src/pages/Fisioterapia.jsx` (`PERGUNTAS`, linhas 126–154), `src/pages/OneToOne.jsx` (`PERGUNTAS`, linhas 81–118), `src/pages/Pkz.jsx` (`PERGUNTAS`, linhas 115–157) |
| Horários disponíveis no agendamento | Fictícios (horários de exemplo) | `src/agendamento.js` (`HORARIOS`, linhas 33–51) |
| Reservas do agendamento | Simuladas: ficam salvas só no navegador de quem agendou (`localStorage`) e não chegam à empresa; a confirmação real é a mensagem enviada pelo WhatsApp | `src/agendamento.js` (`carregaReservas` e `salvaReservas`, linhas 73–92) |
