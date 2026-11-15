import { useEffect, useRef, useState } from "react";

import Calendario from "../componentes/Calendario.jsx";
import { criaLinkWhatsapp } from "../whatsapp.js";
import {
  MESES,
  DIAS_DA_SEMANA,
  REGEX_NOME,
  carregaReservas,
  salvaReservas,
  primeiroDiaDisponivel,
  inicioDoMes,
  diaDeHoje,
  formataData,
  formataTelefone,
} from "../agendamento.js";
import setasAltas from "../imagem/chevrons-tall.svg";
import iconeOk from "../imagem/check.svg";
import iconeWhatsapp from "../imagem/whatsapp.svg";
import "./Agendar.css";

// Textos que mudam de uma marca para a outra.
// No site em HTML eram dois arquivos quase iguais (agendar-one-to-one.html
// e agendar-pkz.html). Aqui é um componente só, e a prop "marca" escolhe
// qual destes objetos usar.
const TEXTOS = {
  "One-to-One": {
    titulo: "Agendar aula experimental · One to One Studio",
    descricao:
      "Agende sua aula experimental no One-to-One Studio. Treino individualizado, sem compromisso.",
    eyebrow: "Aula experimental · One-to-One",
    h1: (
      <>
        Agende o seu <span className="hl">treino</span>.
      </>
    ),
    intro:
      "Deixe seus dados, escolha um horário e a nossa equipe confirma com você. Sem compromisso — é a forma de sentir na prática como é treinar de forma individualizada.",
    lista: [
      "Conheça o studio e a metodologia",
      "Treine com um professor da equipe",
      "Receba a proposta de plano depois da aula",
    ],
    legenda: "Seus dados",
    rotuloNome: "Nome completo",
    pedeAtleta: false, // o One-to-One não tem o campo "Nome do atleta"
    servico: "uma aula experimental",
    botao: "Solicitar aula experimental",
    paraQuem: "você",
  },
  PKZ: {
    titulo: "Agendar avaliação · PKZ Lab",
    descricao:
      "Agende a avaliação do seu atleta no PKZ. Alto rendimento para jovens atletas de 7 a 15 anos, sem compromisso.",
    eyebrow: "Avaliação · PKZ",
    h1: (
      <>
        Agende a avaliação do seu <span className="hl">atleta</span>.
      </>
    ),
    intro:
      "Deixe seus dados, escolha um horário e a nossa equipe confirma com você. Sem compromisso — é a forma de conhecer de perto como trabalhamos com atletas de 7 a 15 anos.",
    lista: [
      "Conheça o espaço e a metodologia PKZ",
      "Converse com um treinador da equipe",
      "Receba a proposta de pacote depois da visita",
    ],
    legenda: "Dados do responsável e do atleta",
    rotuloNome: "Nome do responsável",
    pedeAtleta: true,
    servico: "uma avaliação",
    botao: "Solicitar avaliação",
    paraQuem: "o seu atleta",
  },
};

const CAMPOS_VAZIOS = { nome: "", atleta: "", whatsapp: "", email: "" };

// FORMULÁRIO DE AGENDAMENTO
// A validação básica é do próprio HTML (required e pattern).
// O React completa com uma regex para o nome, formata o telefone e,
// no envio, salva a reserva no navegador e monta a mensagem para o WhatsApp.
//
// Props:
//   marca  "One-to-One" ou "PKZ"
export default function Agendar({ marca }) {
  const textos = TEXTOS[marca];

  // ---------- Estados ----------
  // A função dentro do useState só roda na primeira vez (valor inicial)
  const [reservas, setReservas] = useState(() => carregaReservas());
  const [dataSelecionada, setDataSelecionada] = useState(() =>
    primeiroDiaDisponivel(marca, reservas),
  );
  const [mesNaTela, setMesNaTela] = useState(() =>
    inicioDoMes(dataSelecionada || diaDeHoje()),
  );
  const [horario, setHorario] = useState("");
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [confirmacao, setConfirmacao] = useState({ resumo: "", link: "" });
  const [mostraDados, setMostraDados] = useState(false);

  // Referências aos campos, para colocar o cursor neles (focus)
  const refNome = useRef(null);
  const refAtleta = useRef(null);

  // Depois de "Fazer outro agendamento", o formulário volta a aparecer
  // e o cursor vai para o primeiro campo. Precisa ser num useEffect porque
  // o campo só fica visível depois que o React redesenha a página.
  const jaEnviou = useRef(false);
  useEffect(() => {
    if (enviado) jaEnviou.current = true;
    else if (jaEnviou.current) refNome.current.focus();
  }, [enviado]);

  // ---------- Funções chamadas pelos eventos ----------

  // Atualiza um campo do formulário. O "name" do input diz qual campo é.
  function atualizaCampo(evento) {
    const { name, value } = evento.target;
    const novoValor = name === "whatsapp" ? formataTelefone(value) : value;
    // ...campos copia os outros campos; [name] troca só o que mudou
    setCampos({ ...campos, [name]: novoValor });
    setErro(""); // apaga a mensagem de erro quando a pessoa volta a digitar
  }

  function selecionaData(data) {
    setDataSelecionada(new Date(data));
    setHorario(""); // os horários mudam com o dia
    setErro("");
  }

  function selecionaHorario(novoHorario) {
    setHorario(novoHorario);
    setErro("");
  }

  // O evento submit só dispara depois que o navegador validou os campos
  function enviaFormulario(evento) {
    evento.preventDefault(); // não recarrega a página

    // regras extras com regex
    if (!REGEX_NOME.test(campos.nome)) {
      setErro("O nome deve ter só letras e espaços.");
      refNome.current.focus();
      return;
    }
    if (textos.pedeAtleta && !REGEX_NOME.test(campos.atleta)) {
      setErro("O nome do atleta deve ter só letras e espaços.");
      refAtleta.current.focus();
      return;
    }
    if (!dataSelecionada || !horario) {
      setErro("Escolha a data e o horário.");
      return;
    }

    // Cria o objeto da reserva, coloca na lista e salva no navegador.
    // Depois disso o horário passa a aparecer como ocupado.
    const reserva = {
      marca: marca,
      data: formataData(dataSelecionada),
      horario: horario,
      nome: campos.nome.trim(),
      email: campos.email,
      whatsapp: campos.whatsapp,
    };
    if (textos.pedeAtleta) reserva.atleta = campos.atleta.trim();

    const novaLista = [...reservas, reserva];
    setReservas(novaLista);
    salvaReservas(novaLista);

    const dataTexto =
      `${DIAS_DA_SEMANA[dataSelecionada.getDay()]}, ${dataSelecionada.getDate()} de ${MESES[dataSelecionada.getMonth()]}`.toLowerCase();
    const doAtleta = reserva.atleta ? ` do(a) atleta ${reserva.atleta}` : "";
    const mensagem = `Olá! Sou ${reserva.nome} e gostaria de agendar ${textos.servico}${doAtleta} no ${marca} para ${dataTexto}, às ${horario}.`;

    setConfirmacao({
      resumo: `${marca} · ${dataTexto} · ${horario}`,
      link: criaLinkWhatsapp(mensagem),
    });
    setEnviado(true);
  }

  // "Fazer outro agendamento": limpa o formulário e mostra de novo,
  // com o calendário no primeiro dia que ainda tem vaga
  function novoAgendamento() {
    const primeiro = primeiroDiaDisponivel(marca, reservas);
    setDataSelecionada(primeiro);
    setMesNaTela(inicioDoMes(primeiro || diaDeHoje()));
    setHorario("");
    setCampos(CAMPOS_VAZIOS);
    setErro("");
    setEnviado(false);
  }

  // Ferramenta de teste: apaga todas as reservas, liberando os horários de novo
  function limpaReservas() {
    setReservas([]);
    salvaReservas([]);
  }

  return (
    <main className={marca === "PKZ" ? "pkz-rockets" : undefined}>
      <title>{textos.titulo}</title>
      <meta name="description" content={textos.descricao} />

      <section className="section page-head" style={{ paddingTop: 60 }}>
        <img
          className="deco-chevrons"
          src={setasAltas}
          alt=""
          width={140}
          height={150}
          style={{ left: 80, top: 260 }}
        />
        {/*
          Formulário de agendamento: o próprio <form> é o grid da página.
          Os dados ficam em dois fieldsets (dados pessoais e data/horário).
          Quando enviado, ganha a classe "sent": o CSS esconde os campos
          e mostra a confirmação.
        */}
        <form
          className={enviado ? "container schedule sent" : "container schedule"}
          onSubmit={enviaFormulario}
        >
          {/* Introdução */}
          <div className="schedule-intro">
            <p className="eyebrow">{textos.eyebrow}</p>
            <h1>{textos.h1}</h1>
            <p>{textos.intro}</p>
            <ul className="check-list">
              {textos.lista.map((item) => (
                <li key={item}>
                  <span className="chev"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="form-card dados">
            <fieldset>
              <legend>{textos.legenda}</legend>
              {/* Em JSX o "for" do label se escreve htmlFor.
                  value + onChange: o React controla o que aparece no campo. */}
              <div className="field">
                <label htmlFor="ag-nome">{textos.rotuloNome}</label>
                <input
                  ref={refNome}
                  id="ag-nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  pattern="\s*\S+(\s+\S+)+\s*"
                  title="Informe nome e sobrenome."
                  required
                  value={campos.nome}
                  onChange={atualizaCampo}
                />
              </div>
              {/* só a página do PKZ pede o nome do atleta */}
              {textos.pedeAtleta && (
                <div className="field">
                  <label htmlFor="ag-atleta">Nome do atleta</label>
                  <input
                    ref={refAtleta}
                    id="ag-atleta"
                    name="atleta"
                    type="text"
                    placeholder="Nome do atleta"
                    autoComplete="off"
                    minLength={2}
                    required
                    value={campos.atleta}
                    onChange={atualizaCampo}
                  />
                </div>
              )}
              <div className="field">
                <label htmlFor="ag-whats">WhatsApp</label>
                <input
                  id="ag-whats"
                  name="whatsapp"
                  type="tel"
                  placeholder="(21) 90000-0000"
                  autoComplete="tel"
                  pattern="\(\d{2}\) \d{4,5}-\d{4}"
                  title="Informe o WhatsApp com DDD, no formato (21) 90000-0000."
                  required
                  value={campos.whatsapp}
                  onChange={atualizaCampo}
                />
              </div>
              <div className="field">
                <label htmlFor="ag-email">E-mail</label>
                <input
                  id="ag-email"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  autoComplete="email"
                  required
                  value={campos.email}
                  onChange={atualizaCampo}
                />
              </div>
              {/* mensagem de erro: aparece quando o estado "erro" tem texto */}
              <p className="erro" aria-live="polite">
                {erro}
              </p>
            </fieldset>
          </div>

          <Calendario
            marca={marca}
            reservas={reservas}
            mesNaTela={mesNaTela}
            onTrocaMes={setMesNaTela}
            dataSelecionada={dataSelecionada}
            onSelecionaData={selecionaData}
            horario={horario}
            onSelecionaHorario={selecionaHorario}
          />

          <button className="btn btn-primary btn-submit" type="submit">
            {textos.botao}
          </button>

          {/* Mensagem exibida depois do envio */}
          <div className="form-card form-success" aria-live="polite">
            <img className="ok" src={iconeOk} alt="" width={64} height={64} />
            <h2>Horário reservado!</h2>
            <p>
              {confirmacao.resumo}
              <br />O horário ficou reservado para {textos.paraQuem}. Se quiser,
              confirme também com a equipe pelo WhatsApp.
            </p>
            <a
              className="btn btn-whatsapp"
              href={confirmacao.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconeWhatsapp} alt="" width={18} height={18} />
              Confirmar pelo WhatsApp
            </a>
            <p style={{ margin: "18px 0 0" }}>
              <button
                type="button"
                className="link-arrow"
                onClick={novoAgendamento}
              >
                Fazer outro agendamento
              </button>
            </p>
            {/* Ferramentas de teste: mostram e apagam as reservas salvas no navegador */}
            <p style={{ margin: "8px 0 0" }}>
              <button
                type="button"
                className="link-arrow"
                onClick={() => setMostraDados(!mostraDados)}
              >
                {mostraDados ? "Esconder dados salvos" : "Ver dados salvos"}
              </button>
              {/* O JSX apaga a quebra de linha entre as tags. Sem este
                  espaço, os dois botões ficariam grudados. */}{" "}
              <button
                type="button"
                className="link-arrow"
                onClick={limpaReservas}
              >
                Limpar reservas
              </button>
            </p>
            {mostraDados && (
              // JSON.stringify com o 2 deixa o texto indentado e legível
              <pre className="dados-salvos">
                {JSON.stringify(reservas, null, 2)}
              </pre>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
