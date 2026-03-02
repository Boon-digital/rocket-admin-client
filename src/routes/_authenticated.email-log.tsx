import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
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
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowUp, ArrowDown, ArrowsDownUp } from '@phosphor-icons/react'

export const Route = createFileRoute('/_authenticated/email-log')({
  component: EmailLogPage,
})

interface EmailLogEntry {
  _id: any
  bookingId: string
  confirmationNo: string
  to: string
  sentBy: string
  sentAt: string
  status: 'sent' | 'failed'
  errorMessage?: string
  resendId?: string
}

interface EmailLogResponse {
  data: EmailLogEntry[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

type SortKey = 'confirmationNo' | 'to' | 'sentBy' | 'sentAt' | 'status'
type SortDir = 'asc' | 'desc'

async function fetchEmailLogs(): Promise<EmailLogResponse> {
  const res = await fetch('/api/v1/email/logs?pageSize=500', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to fetch email logs')
  return res.json()
}

function formatDateTime(dateString: string): string {
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

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== column) return <ArrowsDownUp className="size-3.5 ml-1 opacity-30" />
  return sortDir === 'asc'
    ? <ArrowUp className="size-3.5 ml-1" />
    : <ArrowDown className="size-3.5 ml-1" />
}

function EmailLogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['email-logs'],
    queryFn: fetchEmailLogs,
  })

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'failed'>('all')
  const [sortKey, setSortKey] = useState<SortKey | null>('sentAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const processed = useMemo(() => {
    if (!data) return []

    let rows = data.data

    // Filter by status
    if (statusFilter !== 'all') {
      rows = rows.filter((r) => r.status === statusFilter)
    }

    // Filter by search (confirmation no, recipient, sent by)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        (r) =>
          (r.confirmationNo ?? '').toLowerCase().includes(q) ||
          (r.to ?? '').toLowerCase().includes(q) ||
          (r.sentBy ?? '').toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av = a[sortKey] ?? ''
        let bv = b[sortKey] ?? ''
        if (sortKey === 'sentAt') {
          av = new Date(av).getTime() as any
          bv = new Date(bv).getTime() as any
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
  }, [data, search, statusFilter, sortKey, sortDir])

  const thClass = 'cursor-pointer select-none'

  return (
    <div className="flex flex-1">
      <main className="flex flex-col flex-1 min-h-0 max-h-dvh">
        <PageHeader />
        <div className="flex-1 overflow-auto px-6 pb-6">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Search booking ref, recipient, sender…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            {data && (
              <span className="text-sm text-muted-foreground ml-auto">
                {processed.length} {processed.length === 1 ? 'entry' : 'entries'}
              </span>
            )}
          </div>

          {isLoading && <p className="text-sm text-muted-foreground">Loading email log…</p>}
          {isError && <p className="text-sm text-destructive">Failed to load email log.</p>}

          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={thClass} onClick={() => handleSort('confirmationNo')}>
                    <span className="flex items-center">
                      Booking Ref <SortIcon column="confirmationNo" sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </TableHead>
                  <TableHead className={thClass} onClick={() => handleSort('to')}>
                    <span className="flex items-center">
                      To <SortIcon column="to" sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </TableHead>
                  <TableHead className={thClass} onClick={() => handleSort('sentBy')}>
                    <span className="flex items-center">
                      Sent By <SortIcon column="sentBy" sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </TableHead>
                  <TableHead className={thClass} onClick={() => handleSort('sentAt')}>
                    <span className="flex items-center">
                      Sent At <SortIcon column="sentAt" sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </TableHead>
                  <TableHead className={thClass} onClick={() => handleSort('status')}>
                    <span className="flex items-center">
                      Status <SortIcon column="status" sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processed.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {data.data.length === 0 ? 'No emails sent yet.' : 'No results match your filters.'}
                    </TableCell>
                  </TableRow>
                )}
                {processed.map((entry) => {
                  const id = typeof entry._id === 'object' ? entry._id.$oid : String(entry._id)
                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Link
                          to="/bookings"
                          search={{ id: entry.bookingId }}
                          className="text-primary underline underline-offset-2 hover:opacity-80"
                        >
                          {entry.confirmationNo || entry.bookingId}
                        </Link>
                      </TableCell>
                      <TableCell>{entry.to}</TableCell>
                      <TableCell>{entry.sentBy}</TableCell>
                      <TableCell>{formatDateTime(entry.sentAt)}</TableCell>
                      <TableCell>
                        {entry.status === 'sent' ? (
                          <Badge variant="success">Sent</Badge>
                        ) : (
                          <Badge variant="destructive" title={entry.errorMessage}>Failed</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  )
}
