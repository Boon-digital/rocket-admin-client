export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

export interface FileStorageService {
  upload(file: File): Promise<UploadedFile>
  delete(id: string, url?: string): Promise<void>
  getUrl(id: string): string | null
}

class VercelBlobStorage implements FileStorageService {
  async upload(file: File): Promise<UploadedFile> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/v1/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Upload failed: ${text}`)
    }

    const result = await response.json()

    return {
      id: crypto.randomUUID(),
      name: file.name,
      size: result.size ?? file.size,
      type: result.contentType ?? file.type,
      url: result.url,
      uploadedAt: new Date().toISOString(),
    }
  }

  async delete(_id: string, url?: string): Promise<void> {
    if (!url) return
    const params = new URLSearchParams({ url })
    const response = await fetch(`/api/v1/upload?${params}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Delete failed: ${text}`)
    }
  }

  getUrl(_id: string): string | null {
    // Blob URLs are stored directly in the UploadedFile.url field
    return null
  }
}

export const fileStorage: FileStorageService = new VercelBlobStorage()
