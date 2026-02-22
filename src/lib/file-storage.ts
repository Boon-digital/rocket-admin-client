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
  delete(id: string): Promise<void>
  getUrl(id: string): string | null
}

class LocalFileStorage implements FileStorageService {
  private files = new Map<string, UploadedFile>()

  async upload(file: File): Promise<UploadedFile> {
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

    const uploaded: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      uploadedAt: new Date().toISOString(),
    }

    this.files.set(uploaded.id, uploaded)
    return uploaded
  }

  async delete(id: string): Promise<void> {
    this.files.delete(id)
  }

  getUrl(id: string): string | null {
    return this.files.get(id)?.url ?? null
  }
}

// Single swap point — replace with Vercel Blob storage later
export const fileStorage: FileStorageService = new LocalFileStorage()
