export function offsetToPage(offset: number | string | string[] | undefined, limit: number) {
  const validOffset = offset ? +offset : 1
  return Math.floor(validOffset / limit) + 1
}
export function pageToOffset(page: number | string | string[] | undefined, limit: number) {
  const validPage = page ? +page : 1
  return (validPage - 1) * limit
}
