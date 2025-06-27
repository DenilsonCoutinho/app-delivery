export function formatToBrl(centavos: number): string {
  const reais = centavos / 100
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
