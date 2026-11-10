// Client for the PHP backend in ../rangoma_backend. Requests go to /api on the same origin
// (Vite proxies it in development; the web server routes it in production).

export class ApiError extends Error {
  status: number
  fields: Record<string, string>

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const isForm = body instanceof FormData
  let res: Response
  try {
    res = await fetch(path, {
      method,
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(body !== undefined && !isForm ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection and try again.')
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(res.status, data?.error ?? 'Something went wrong.', data?.fields ?? {})
  return data as T
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {}),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
  del: <T>(path: string) => request<T>('DELETE', path),
  upload: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return request<{ path: string }>('POST', '/api/admin/uploads', form)
  },
}

// ---------- public ----------

export interface Post {
  slug: string
  tag: string
  title: string
  excerpt: string
  date: string | null
  read: string | null
  thumb: string | null
  hasBody: boolean
  body?: string
}

export const getPosts = () => api.get<{ posts: Post[] }>('/api/posts').then((r) => r.posts)
export const getPost = (slug: string) => api.get<{ post: Post }>(`/api/posts/${encodeURIComponent(slug)}`).then((r) => r.post)

export interface ContactPayload {
  name: string
  email: string
  phone: string
  area: string
  message: string
  website: string // honeypot, always empty for real visitors
}

export const sendEnquiry = (data: ContactPayload) => api.post<{ ok: boolean; emailed: boolean }>('/api/contact', data)

// ---------- admin ----------

export interface AdminUser {
  id: number
  name: string
  username: string | null
  email: string
}

export interface AdminPostRow extends Post {
  id: number
  status: 'draft' | 'published'
  scheduled: boolean
  updatedAt: string
}

export interface AdminPost {
  id: number
  slug: string
  title: string
  tag: string
  excerpt: string
  body: string
  thumb: string | null
  status: 'draft' | 'published'
  publishedAt: string | null
}

export type PostInput = Omit<AdminPost, 'id' | 'slug'>

export type EnquiryStatus = 'new' | 'read' | 'archived'

export interface Enquiry {
  id: number
  name: string
  email: string
  phone: string | null
  area: string | null
  message: string
  status: EnquiryStatus
  createdAt: string
  replySentAt: string | null
  replyError: string | null
}

export interface EnquiryPage {
  items: Enquiry[]
  total: number
  page: number
  pages: number
  counts: Record<EnquiryStatus, number>
}

export interface Stats {
  newEnquiries: number
  totalEnquiries: number
  publishedPosts: number
  draftPosts: number
  recent: Enquiry[]
}
