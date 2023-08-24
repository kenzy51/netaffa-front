import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formDataHttp(data: any, url: string, method = 'put', headers = {}, baseUrl = true) {
  return axios({
    method,
    url: `${baseUrl ? process.env.NEXT_PUBLIC_API_URL : ''}${url}`,
    data: formData(data),
    headers,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFormData(formData: any, data: any, parentKey?: string) {
  if (data && typeof data === 'object' && !Array.isArray(data) && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else if (Array.isArray(data)) {
    data.forEach((itemOfItem) => buildFormData(formData, itemOfItem, parentKey))
  } else {
    const value = data == null ? '' : data
    formData.append(parentKey, value)
  }
}
export function formData(data: any) {
  const formData = new FormData()
  buildFormData(formData, data)

  return formData
}
