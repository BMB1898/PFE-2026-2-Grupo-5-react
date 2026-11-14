// Número de WhatsApp da empresa (formato internacional, só dígitos).
// No site em HTML puro o número aparecia em vários links.
// Aqui ele fica só neste arquivo: todos os componentes importam
// a função criaLinkWhatsapp, então basta trocar o número uma vez.
export const WHATSAPP_NUMBER = "5521972657266";

// Monta o link do WhatsApp com uma mensagem já escrita.
// encodeURIComponent troca espaços e acentos por códigos que podem ir na URL.
export function criaLinkWhatsapp(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}
