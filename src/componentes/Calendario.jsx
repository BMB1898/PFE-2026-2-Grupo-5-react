import {
  MESES,
  DIAS_DA_SEMANA,
  diaDeHoje,
  ultimoDiaAgendavel,
  diaDisponivel,
  horariosDoDia,
} from "../agendamento.js";
import "./Calendario.css";

// CALENDÁRIO DE AGENDAMENTO
// Monta a tabela do mês, marca os dias com vaga e lista os
// horários do dia escolhido como inputs radio.
//
// O calendário não guarda estado próprio: quem guarda o mês na tela,
// o dia e o horário escolhidos é a página Agendar (o componente "pai"),
// porque o formulário também precisa desses valores. O calendário só
// mostra os valores e avisa o pai quando algo muda (as props "on...").
//
// Props:
//   marca, reservas      para saber quais horários estão livres
//   mesNaTela            primeiro dia do mês que aparece na tabela
//   onTrocaMes(data)     chamada ao clicar nas setas < >
//   dataSelecionada      dia escolhido (Date) ou null
//   onSelecionaData(data)
//   horario              horário escolhido ("14:00") ou ""
//   onSelecionaHorario(horario)
export default function Calendario({
  marca,
  reservas,
  mesNaTela,
  onTrocaMes,
  dataSelecionada,
  onSelecionaData,
  horario,
  onSelecionaHorario,
}) {
  const hoje = diaDeHoje();
  const ano = mesNaTela.getFullYear();
  const mes = mesNaTela.getMonth();

  const ehPrimeiroMes = ano === hoje.getFullYear() && mes === hoje.getMonth();
  const ehUltimoMes = new Date(ano, mes + 1, 1) > ultimoDiaAgendavel();

  // Monta a tabela do mês: 6 linhas (semanas) x 7 colunas (dias).
  // Começa no domingo da semana em que o mês começa.
  const inicio = new Date(ano, mes, 1 - new Date(ano, mes, 1).getDay());
  const semanas = [];
  for (let semana = 0; semana < 6; semana++) {
    const dias = [];
    for (let dia = 0; dia < 7; dia++) {
      const data = new Date(inicio);
      data.setDate(inicio.getDate() + semana * 7 + dia);
      dias.push(data);
    }
    semanas.push(dias);
  }

  // Horários do dia escolhido e o resumo (manhã, tarde ou os dois)
  const horarios = dataSelecionada
    ? horariosDoDia(marca, reservas, dataSelecionada)
    : [];
  const daManha = horarios.filter(
    (h) => Number(h.slice(0, 2)) < 12,
  ).length;
  let periodo = "Manhã e tarde";
  if (daManha === horarios.length) periodo = "Manhã";
  if (daManha === 0) periodo = "Tarde";

  // "1 horário" / "2 horários"
  const plural = (n, singular, varios) => `${n} ${n === 1 ? singular : varios}`;

  return (
    <div className="calendar reveal">
      <fieldset>
        <legend>Escolha a data e o horário</legend>
        <div className="cal-head">
          <h2>
            {MESES[mes]} {ano}
          </h2>
          <div className="cal-nav">
            <button
              type="button"
              className="prev"
              aria-label="Mês anterior"
              disabled={ehPrimeiroMes}
              onClick={() => onTrocaMes(new Date(ano, mes - 1, 1))}
            >
              <span className="chev"></span>
            </button>
            <button
              type="button"
              className="next"
              aria-label="Próximo mês"
              disabled={ehUltimoMes}
              onClick={() => onTrocaMes(new Date(ano, mes + 1, 1))}
            >
              <span className="chev"></span>
            </button>
          </div>
        </div>

        {/* Calendário do mês: uma linha (tr) por semana */}
        <table className="cal-table">
          <thead>
            <tr>
              <th scope="col" abbr="Domingo">DOM</th>
              <th scope="col" abbr="Segunda-feira">SEG</th>
              <th scope="col" abbr="Terça-feira">TER</th>
              <th scope="col" abbr="Quarta-feira">QUA</th>
              <th scope="col" abbr="Quinta-feira">QUI</th>
              <th scope="col" abbr="Sexta-feira">SEX</th>
              <th scope="col" abbr="Sábado">SÁB</th>
            </tr>
          </thead>
          <tbody>
            {semanas.map((dias, indice) => (
              <tr key={indice}>
                {dias.map((data) => {
                  const doMes = data.getMonth() === mes;
                  const livre = doMes && diaDisponivel(marca, reservas, data);
                  const selecionado =
                    doMes &&
                    dataSelecionada &&
                    data.getTime() === dataSelecionada.getTime();

                  let classes = "cal-day";
                  if (!doMes) classes += " muted";
                  if (data.getTime() === hoje.getTime()) classes += " today";
                  if (selecionado) classes += " selected";

                  return (
                    <td key={data.getTime()}>
                      <button
                        type="button"
                        className={classes}
                        disabled={!livre}
                        aria-label={
                          livre ? `${data.getDate()} de ${MESES[mes]}` : undefined
                        }
                        aria-pressed={selecionado ? true : undefined}
                        onClick={() => onSelecionaData(data)}
                      >
                        {data.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Resumo do dia escolhido (só aparece se houver um dia) */}
        {dataSelecionada && (
          <div className="cal-selected">
            <div>
              {/* template string: o texto fica num pedaço só, como no original */}
              <p className="cal-selected-day">
                {`${dataSelecionada.getDate()} de ${MESES[dataSelecionada.getMonth()]}`}
              </p>
              <p className="cal-selected-info">
                {`${DIAS_DA_SEMANA[dataSelecionada.getDay()]} · ${periodo}`}
              </p>
            </div>
            <span className="pill">
              {plural(horarios.length, "horário", "horários")}
            </span>
          </div>
        )}

        <div className="slots-head">
          <h3>Horários disponíveis</h3>
          <span>
            {dataSelecionada && plural(horarios.length, "opção", "opções")}
          </span>
        </div>

        {/* Horários: um input radio por horário, encapsulado no label */}
        <div className="slots" aria-live="polite">
          {!dataSelecionada && (
            <p className="slots-empty">Selecione uma data disponível.</p>
          )}
          {horarios.map((h) => (
            <label className="slot" key={h}>
              <input
                type="radio"
                name="horario"
                value={h}
                required
                checked={horario === h}
                onChange={() => onSelecionaHorario(h)}
              />
              <span>{h}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
