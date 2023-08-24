export const removeUndefined = <T>(o: T): T => {
  if (typeof o === 'object') {
    return Object.entries(o as Record<string, unknown>)
      .filter(([, val]) => val)
      .reduce((result: Record<string, unknown>, [key, val]) => {
        result[key] = val
        return result
      }, {}) as T
  }
  return o
}
