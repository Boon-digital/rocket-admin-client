import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowUp, ArrowDown, ArrowsDownUp, ArrowSquareOut, Trash } from '@phosphor-icons/react'

export const Route = createFileRoute('/_authenticated/documents')({
  component: DocumentsPage,
})

interface DocumentRow {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
  uploadedBy?: string
  source: 'booking' | 'stay'
  bookingId?: string
  bookingConfirmationNo?: string
  stayId?: string
  hotelName?: string
  hotelConfirmationNo?: string
}

interface DocumentsResponse {
  data: DocumentRow[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

type SortKey = 'name' | 'type' | 'source' | 'uploadedBy' | 'uploadedAt'
type SortDir = 'asc' | 'desc'

async function fetchDocuments(): Promise<DocumentsResponse> {
  const res = await fetch('/api/v1/documents?pageSize=1000', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to fetch documents')
  return res.json()
}

async function deleteDocument(doc: DocumentRow): Promise<void> {
  const res = await fetch('/api/v1/documents', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      docId: doc.id,
      docUrl: doc.url,
      entityType: doc.source === 'stay' ? 'stay' : 'booking',
      entityId: doc.source === 'stay' ? doc.stayId! : doc.bookingId!,
    }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error((data as any).error ?? 'Delete failed')
  }
}

async function getPresignedUrl(url: string): Promise<string> {
  const params = new URLSearchParams({ key: url })
  const res = await fetch(`/api/v1/documents/presign?${params}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to get presigned URL')
  const data = await res.json()
  return data.url
}

function formatBytes(bytes: number): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDateTime(dateString: string): string {
  if (!dateString) return '—'
  try {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

function formatType(type: string): string {
  if (!type) return '—'
  // Shorten common MIME types
  return type.replace('application/', '').replace('image/', '').replace('text/', '')
}

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== column) return <ArrowsDownUp className="size-3.5 ml-1 opacity-30" />
  return sortDir === 'asc'
    ? <ArrowUp className="size-3.5 ml-1" />
    : <ArrowDown className="size-3.5 ml-1" />
}

function DocumentsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  })

  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey | null>('uploadedAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (doc: DocumentRow) => {
    if (!confirm(`Delete "${doc.name}"? This permanently removes the file and cannot be undone.`)) return
    setDeleting(doc.id)
    try {
      await deleteDocument(doc)
      await queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success('Document deleted')
    } catch (err) {
      console.error('[documents] delete error:', err)
      toast.error((err as Error).message ?? 'Failed to delete document')
    } finally {
      setDeleting(null)
    }
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const handleDownload = async (doc: DocumentRow) => {
    setDownloading(doc.id)
    try {
      const signedUrl = await getPresignedUrl(doc.url)
      window.open(signedUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('[documents] download error:', err)
    } finally {
      setDownloading(null)
    }
  }

  const processed = useMemo(() => {
    if (!data) return []

    let rows = data.data

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter((r) => {
        if (r.name.toLowerCase().includes(q)) return true
        if (r.source === 'stay') {
          return (
            (r.hotelName ?? '').toLowerCase().includes(q) ||
            (r.hotelConfirmationNo ?? '').toLowerCase().includes(q)
          )
        } else {
          return (r.bookingConfirmationNo ?? '').toLowerCase().includes(q)
        }
      })
    }

    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av: any = a[sortKey] ?? ''
        let bv: any = b[sortKey] ?? ''
        if (sortKey === 'uploadedAt') {
          av = av ? new Date(av).getTime() : 0
          bv = bv ? new Date(bv).getTime() : 0
        } else {
          av = String(av).toLowerCase()
          bv = String(bv).toLowerCase()
        }
        if (av < bv) return sortDir === 'asc' ? -1 : 1
        if (av > bv) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }

    return rows
  }, [data, search, sortKey, sortDir])

  const thClass = 'cursor-pointer select-none'

  return (
    <div className="flex flex-1 min-h-0 max-h-dvh overflow-hidden">
      <main className="flex flex-col flex-1 min-h-0 overflow-auto">
        <PageHeader />
        <div className="flex-1 overflow-auto px-6 pb-6">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Search filename, booking ref, or hotel…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {isLoading && <p className="text-sm text-muted-foreground">Loading documents…</p>}
          {isError && <p className="text-sm text-destructive">Failed to load documents.</p>}

          {data && (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={thClass} onClick={() => handleSort('name')}>
                      <span className="flex items-center">
                        File name <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead className={thClass} onClick={() => handleSort('type')}>
                      <span className="flex items-center">
                        Type · Size <SortIcon column="type" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead className={thClass} onClick={() => handleSort('source')}>
                      <span className="flex items-center">
                        Source <SortIcon column="source" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className={thClass} onClick={() => handleSort('uploadedBy')}>
                      <span className="flex items-center">
                        Uploaded by <SortIcon column="uploadedBy" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead className={thClass} onClick={() => handleSort('uploadedAt')}>
                      <span className="flex items-center">
                        Uploaded at <SortIcon column="uploadedAt" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processed.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        {data.data.length === 0 ? 'No documents uploaded yet.' : 'No results match your search.'}
                      </TableCell>
                    </TableRow>
                  )}
                  {processed.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium max-w-60 truncate" title={doc.name}>
                        {doc.name || '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatType(doc.type)} · {formatBytes(doc.size)}
                      </TableCell>
                      <TableCell>
                        {doc.source === 'stay' ? (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                            Stay
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            Booking
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {doc.source === 'stay' && doc.stayId ? (
                          <Link
                            to="/stays"
                            search={{ id: doc.stayId }}
                            className="text-primary underline underline-offset-2 hover:opacity-80"
                          >
                            {doc.hotelName || doc.stayId}
                          </Link>
                        ) : doc.bookingId ? (
                          <Link
                            to="/bookings"
                            search={{ id: doc.bookingId }}
                            className="text-primary underline underline-offset-2 hover:opacity-80"
                          >
                            {doc.bookingConfirmationNo || doc.bookingId}
                          </Link>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {doc.uploadedBy || '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDateTime(doc.uploadedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(doc)}
                          disabled={downloading === doc.id}
                          title="Download"
                        >
                          <ArrowSquareOut className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { void handleDelete(doc) }}
                          disabled={deleting === doc.id}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-sm text-muted-foreground mt-3">
                {processed.length} {processed.length === 1 ? 'document' : 'documents'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
