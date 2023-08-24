export const prettifyNumber = (num: number | string | undefined) => {
  if (!num) return 0
  const n = Math.ceil(+num).toString()
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ')
}
