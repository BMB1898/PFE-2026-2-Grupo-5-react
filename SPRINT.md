# Sprint · 10/11/2026 a 16/11/2026

Documentação da sprint do **Grupo 5** (PFE 2026.2) no site da **Playmakerz**.

> Os campos marcados com _(a preencher)_ dependem de informações do grupo
> que não estão no repositório (reuniões, papéis, estimativas).

## Informações gerais

| | |
| --- | --- |
| **Período** | 10/11/2026 (terça) a 16/11/2026 (segunda) |
| **Duração** | 7 dias |
| **Scrum Master** | _Bernardo Machado Borghetti_ |
| **Time de desenvolvimento** | Bernardo Machado Borghetti, Bernardo Parrilha de Sá, Giovanni Chianello Correia de Melo, Giulia Cabral Merino, João Eduardo Enes, Rafael Castro |

## Objetivo da sprint

Migrar o site da Playmakerz, feito antes em HTML, CSS e JavaScript puro, para
**React com Vite**. Todas as páginas e funcionalidades da versão anterior devem
continuar funcionando, e o código repetido entre páginas deve virar
componentes reutilizáveis.

## Sprint Backlog

Cada item foi dividido em uma "parte" e entregue por um integrante, em um
commit próprio.

| # | Item | Responsável | Status |
| --- | --- | --- | --- |
| 1 | Base do projeto: Vite, rotas, CSS global, imagens, página 404 e publicação | Giulia Merino | Concluído |
| 2 | Menu (Header), rodapé (Footer), logo One to One e página de Planos | João Enes | Concluído |
| 3 | Página inicial (Home) e componentes Hero, CabecalhoSecao, MosaicoFotos e Passos | Bernardo Borghetti | Concluído |
| 4 | Agendamento: calendário, formulário com validação e reservas | Giovanni | Concluído 
| 5 | Páginas PKZ e Fisioterapia | Bernardo Parrilha | Concluído |
| 6 | Página One-to-One e componentes Faq, Depoimento, CardEquipe, Chamada e Diferenciais | Rafael Castro | Concluído |
| 7 | Correções e refinamentos: pasta de imagens, ajustes nas páginas e README | SkyeMel | Concluído |

**Resultado:** 7 de 7 itens concluídos.

### Dependências entre os itens

A ordem de envio foi definida para o build nunca quebrar:

```
1 Base ──► 2 Menu/Rodapé/Planos ──► 3 Home ──► 5 PKZ e Fisioterapia
                                         └──► 6 One-to-One
1 Base ──► 4 Agendamento
```

- PKZ, Fisioterapia e One-to-One reaproveitam os componentes da Home (Hero,
  CabecalhoSecao, MosaicoFotos e Passos).

## Linha do tempo

| Data | O que aconteceu |
| --- | --- |
| 10/11 a 13/11 | Planejamento da sprint e divisão das partes |
| 14/11 | Repositório criado; base do projeto; menu, rodapé e planos; correções; página inicial; agendamento |
| 15/11 | Páginas PKZ e Fisioterapia; página One-to-One; refinamentos e README completo |
| 16/11 | Revisão e retrospectiva da sprint |

## Burndown

Itens do backlog restantes ao fim de cada dia:

| Dia | 10/11 | 11/11 | 12/11 | 13/11 | 14/11 | 15/11 | 16/11 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Itens restantes | 7 | 7 | 7 | 7 | 3 | 0 | 0 |

Toda a implementação ficou concentrada em 14/11 e 15/11.

## Definição de Pronto (Definition of Done)

Um item só era enviado ao GitHub quando:

- [x] `npm run lint` passava sem erros;
- [x] `npm run build` passava sem erros;
- [x] a página foi aberta com `npm run dev` e conferida no navegador;
- [x] as linhas dos colegas no `App.jsx` foram mantidas (só acrescentar);
- [x] o commit foi feito com a conta do GitHub do próprio integrante.

## Incremento entregue

Site em React com as rotas:

| Endereço | Página |
| --- | --- |
| `/` | Início |
| `/one-to-one` | One-to-One Studio |
| `/pkz` | PKZ |
| `/fisioterapia` | Fisioterapia |
| `/planos` | Planos |
| `/agendar-one-to-one` | Agendamento One-to-One |
| `/agendar-pkz` | Agendamento PKZ |
| qualquer outro | Página 404 |

Publicado no Vercel.


### Sprint Retrospective

**O que funcionou bem**

- Dividir o site em partes independentes, cada uma em um commit e com um
  responsável.
- Instruções passo a passo para cada parte, com lint e build antes de enviar.
- Componentes reutilizados entre páginas (Hero, Passos, CabecalhoSecao,
  MosaicoFotos), o que diminuiu o código repetido.

**O que pode melhorar**

- Várias pessoas editando o `App.jsx` aumenta o risco de conflito no `git pull`.

