export const htmlToStr = (htmlContent: string) => {
  return htmlContent.replace(/<[^>]+>/g, '')
}
