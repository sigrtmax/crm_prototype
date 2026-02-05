export async function fetcher<TResponse>(url: string): Promise<TResponse> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Ошибка загрузки данных (${res.status})`)
  }

  return res.json()
}
