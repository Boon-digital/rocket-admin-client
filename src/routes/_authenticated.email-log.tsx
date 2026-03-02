import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
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

async function fetchEmailLogs(): Promise<EmailLogResponse> {
  const res = await fetch('/api/v1/email/logs?pageSize=100', {
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

function EmailLogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['email-logs'],
    queryFn: fetchEmailLogs,
  })

  return (
    <div className="flex flex-1">
      <main className="flex flex-col flex-1 min-h-0 max-h-dvh">
        <PageHeader />
        <div className="flex-1 overflow-auto px-6 pb-6">
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading email log…</p>
          )}
          {isError && (
            <p className="text-sm text-destructive">Failed to load email log.</p>
          )}
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking Ref</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Sent By</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No emails sent yet.
                    </TableCell>
                  </TableRow>
                )}
                {data.data.map((entry) => {
                  const id =
                    typeof entry._id === 'object' ? entry._id.$oid : String(entry._id)
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
                          <Badge variant="destructive">Failed</Badge>
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
