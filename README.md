# Playmakerz · site em React

Site da **Playmakerz**, um centro de treinamento na Barra da Tijuca (Rio de
Janeiro) que aplica a mesma metodologia em duas marcas:

- **One-to-One Studio**: treinamento individualizado e musculação para todas
  as idades, de 17 a 90 anos, com até 3 alunos por professor.
- **PKZ**: alto rendimento para jovens atletas de 7 a 15 anos, dentro do
  esporte que cada um pratica.

O site também apresenta o serviço de **fisioterapia** integrado ao treino, os
**planos** e um **agendamento online** com calendário.

Projeto da disciplina PFE 2026.2, Grupo 5. O site foi feito primeiro em HTML,
CSS e JavaScript puro e depois migrado para React com Vite.

## Páginas

| Endereço | Página |
| --- | --- |
| `/` | Início: quem somos, as duas marcas e o método de trabalho |
| `/one-to-one` | One-to-One Studio: metodologia, professores, depoimentos e perguntas frequentes |
| `/pkz` | PKZ: o "sistema complexo", processo do atleta, serviços, especialistas e depoimentos de pais |
| `/fisioterapia` | Fisioterapia: áreas de atuação, como funciona, equipe e depoimentos |
| `/planos` | Planos Essencial, Completo e Performance |
| `/agendar-one-to-one` | Agendamento da aula experimental do One-to-One |
| `/agendar-pkz` | Agendamento da avaliação do PKZ |
| qualquer outro | Página 404 ("Página não encontrada") |

## O que o site faz

- **Menu** que escurece ao rolar a página, com submenu "Agendar" e versão
  para celular (botão de 3 risquinhos). Fecha ao clicar fora ou apertar ESC.
- **Logo do menu** que muda conforme a página: One to One, PKZ Lab ou
  Playmakerz.
- **Animação de entrada** das seções conforme a página rola.
- **Perguntas frequentes** que abrem e fecham (uma de cada vez).
- **Agendamento**:
  - calendário com os próximos 60 dias e só os horários livres de cada marca
    (domingo fechado, sábado só de manhã);
  - formulário com validação: nome e sobrenome só com letras, WhatsApp
    formatado enquanto a pessoa digita, e-mail;
  - a reserva fica salva no navegador (`localStorage`) e o horário deixa de
    aparecer como livre;
  - no fim, um botão abre o WhatsApp da empresa com a mensagem de confirmação
    já escrita.
- **Botões de WhatsApp** com mensagem pronta nos planos e na fisioterapia.

## Tecnologias

- [React 19](https://react.dev): componentes, props, `useState`, `useEffect`
  e `useRef`
- [Vite](https://vite.dev): servidor de desenvolvimento e build
- [React Router](https://reactrouter.com): troca de página sem recarregar
  (`BrowserRouter`, `Routes`, `Route`, `Link` e `NavLink`)
- CSS puro: um arquivo global e um arquivo ao lado de cada componente
- [oxlint](https://oxc.rs): verificação de erros comuns no código


## Grupo

Cada integrante fez o commit de uma parte do site:

| Parte | Integrante |
| --- | --- |
| Base do projeto (configuração, rotas, CSS global, imagens, página 404 e publicação) | Giulia Merino |
| Menu, rodapé e página de Planos | João Enes |
| Página inicial e componentes das seções (Hero, Passos, MosaicoFotos) | Bernardo Borghetti |
| Agendamento (calendário, formulário e reservas) | Giovanni |
| Página One-to-One e componentes (Faq, Depoimento, CardEquipe, Chamada) | Rafael Castro |
| Páginas PKZ e Fisioterapia | Bernardo Parrilha |
