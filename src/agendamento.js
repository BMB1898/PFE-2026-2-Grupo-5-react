// REGRAS DO AGENDAMENTO
// Funções e dados usados pelo calendário e pelo formulário de agendamento.
// Aqui não tem nada de React: são funções JavaScript comuns, que recebem
// valores e devolvem um resultado. Assim os componentes ficam mais curtos.

export const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DIAS_DA_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Horários de exemplo de cada marca (objeto com arrays).
// Domingo fechado; sábado só de manhã.
export const HORARIOS = {
  "One-to-One": {
    semana: [
      "07:00",
      "08:30",
      "10:00",
      "11:30",
      "13:00",
      "14:30",
      "17:00",
      "18:30",
    ],
    sabado: ["08:00", "09:30", "11:00"],
  },
  PKZ: {
    semana: ["14:00", "15:30", "17:00", "18:30"],
    sabado: ["09:00", "10:30"],
  },
};

// Hoje à meia-noite
export function diaDeHoje() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

// O último dia que pode ser agendado (60 dias depois de hoje)
export function ultimoDiaAgendavel() {
  const ultimoDia = diaDeHoje();
  ultimoDia.setDate(ultimoDia.getDate() + 60);
  return ultimoDia;
}

// Data no formato AAAA-MM-DD, como fica guardada na reserva
export function formataData(data) {
  const doisDigitos = (numero) => String(numero).padStart(2, "0");
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

// Lista das reservas, salva no navegador (localStorage) e compartilhada
// pelas duas páginas. Cada reserva é um objeto com a marca, o horário e
// os dados de contato:
// { marca: "PKZ", data: "2026-10-27", horario: "14:00", nome: "Ana Souza",
//   email: "ana@email.com", whatsapp: "(21) 99999-9999", atleta: "Leo Souza" }
export function carregaReservas() {
  try {
    return JSON.parse(localStorage.getItem("reservas")) || [];
  } catch {
    return []; // texto inválido salvo ou navegador sem localStorage
  }
}

export function salvaReservas(reservas) {
  try {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  } catch {
    // navegador sem localStorage (ex.: janela anônima com bloqueio)
  }
}

// Diz se um horário desta marca já está na lista de reservas (true ou false)
function estaReservado(marca, reservas, data, horario) {
  const dia = formataData(data);
  return reservas.some(
    (reserva) =>
      reserva.marca === marca &&
      reserva.data === dia &&
      reserva.horario === horario,
  );
}

// Devolve os horários livres de um dia (array de strings):
// tira os que já foram reservados e os que já passaram
export function horariosDoDia(marca, reservas, data) {
  const diaDaSemana = data.getDay();
  if (diaDaSemana === 0) return []; // domingo

  const lista =
    diaDaSemana === 6 ? HORARIOS[marca].sabado : HORARIOS[marca].semana;
  const agora = new Date();

  return lista.filter((horario) => {
    // data e hora de INÍCIO deste horário, para saber se já passou
    const inicio = new Date(data);
    inicio.setHours(Number(horario.slice(0, 2)), Number(horario.slice(3, 5)));
    return inicio > agora && !estaReservado(marca, reservas, data, horario);
  });
}

// O dia aceita agendamento? (de hoje até o último dia, e com horário livre)
export function diaDisponivel(marca, reservas, data) {
  return (
    data >= diaDeHoje() &&
    data <= ultimoDiaAgendavel() &&
    horariosDoDia(marca, reservas, data).length > 0
  );
}

// O primeiro dia com vaga (ou null, se não houver nenhum nos próximos 60 dias)
export function primeiroDiaDisponivel(marca, reservas) {
  const data = diaDeHoje();
  const ultimoDia = ultimoDiaAgendavel();
  while (data <= ultimoDia) {
    if (diaDisponivel(marca, reservas, data)) return new Date(data);
    data.setDate(data.getDate() + 1);
  }
  return null;
}

// O primeiro dia do mês de uma data (é assim que guardamos o "mês na tela")
export function inicioDoMes(data) {
  return new Date(data.getFullYear(), data.getMonth(), 1);
}

// Nome: só letras (com acento) e espaços
export const REGEX_NOME = /^[A-Za-zÀ-ÿ\s]+$/;

// Formata o telefone enquanto a pessoa digita:
// celular (11 dígitos) → (21) 90000-0000 · fixo (10 dígitos) → (21) 3333-4444
export function formataTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11); // \D = tudo que não é dígito

  // o hífen fica depois do 5º número no celular e depois do 4º no fixo
  const corte = digitos.length === 11 ? 7 : 6;

  let formatado = digitos;
  if (digitos.length > 2) {
    formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  }
  if (digitos.length > corte) {
    formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2, corte)}-${digitos.slice(corte)}`;
  }
  return formatado;
}
