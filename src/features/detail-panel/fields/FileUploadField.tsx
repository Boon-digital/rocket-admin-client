import { useCallback, useRef, useState } from 'react'
import { Upload, X, File, Download } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { fileStorage, type UploadedFile } from '@/lib/file-storage'
import type { FieldRendererProps } from '../types'
import { isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploadField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const files: UploadedFile[] = Array.isArray(value) ? value : []
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const maxFiles = field.maxFiles ?? 10
  const maxFileSize = field.maxFileSize ?? 10 * 1024 * 1024 // 10MB default

  const handleFiles = useCallback(async (fileList: FileList) => {
    const remaining = maxFiles - files.length
    const toUpload = Array.from(fileList).slice(0, remaining)

    const uploaded: UploadedFile[] = []
    for (const f of toUpload) {
      if (f.size > maxFileSize) continue
      const result = await fileStorage.upload(f)
      uploaded.push(result)
    }

    if (uploaded.length > 0) {
      onChange([...files, ...uploaded])
    }
  }, [files, onChange, maxFiles, maxFileSize])

  const removeFile = useCallback((id: string) => {
    const file = files.find((f) => f.id === id)
    fileStorage.delete(id, file?.url)
    onChange(files.filter((f) => f.id !== id))
  }, [files, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  if (readOnly) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        {files.length > 0 ? (
          <ul className="space-y-1">
            {files.map((f) => (
              <li key={f.id}>
                <a
                  href={f.url}
                  download={f.name}
                  className="flex items-center gap-2 text-sm rounded-md px-2 py-1.5 -mx-2 hover:bg-accent cursor-pointer"
                >
                  <File className="h-4 w-4 shrink-0 text-muted-foreground" weight="light" />
                  <span className="truncate">{f.name}</span>
                  <span className="text-muted-foreground shrink-0">({formatFileSize(f.size)})</span>
                  <Download className="h-4 w-4 shrink-0 text-muted-foreground ml-auto" weight="light" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No files uploaded</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>

      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-sm cursor-pointer transition-colors ${
          dragOver
            ? 'border-ring bg-accent/50'
            : error
              ? 'border-destructive'
              : 'border-input hover:border-ring'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="h-6 w-6 text-muted-foreground" weight="light" />
        <span className="text-muted-foreground">Drag files here or click to browse</span>
        <input
          ref={inputRef}
          id={field.key}
          type="file"
          multiple
          accept={field.accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files)
              e.target.value = ''
            }
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-2 text-sm">
              <File className="h-4 w-4 shrink-0 text-muted-foreground" weight="light" />
              <span className="truncate">{f.name}</span>
              <span className="text-muted-foreground shrink-0">({formatFileSize(f.size)})</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => removeFile(f.id)}
              >
                <X className="h-3 w-3" weight="light" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
