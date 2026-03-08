import { useRef, useEffect, useState } from 'react'
import { X, Paperclip, ArrowSquareOut, FilePdf } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

async function openPresigned(url: string) {
  const params = new URLSearchParams({ key: url })
  const res = await fetch(`/api/v1/documents/presign?${params}`, { credentials: 'include' })
  if (!res.ok) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }
  const data = await res.json()
  window.open(data.url, '_blank', 'noopener,noreferrer')
}

export interface EmailLogEntry {
  _id: any
  bookingId: string
  confirmationNo: string
  to: string
  sentBy: string
  sentAt: string
  status: 'sent' | 'failed'
  errorMessage?: string
  resendId?: string
  html?: string
  pdfFilename?: string | null
  pdfUrl?: string | null
}

interface EmailDetailPanelProps {
  entry: EmailLogEntry | null
  isOpen: boolean
  onClose: () => void
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

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-14 shrink-0 text-muted-foreground">{label}</span>
      <span className="flex-1 break-all">{children}</span>
    </div>
  )
}

export function EmailDetailPanel({ entry, isOpen, onClose }: EmailDetailPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    observer.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const resizeIframe = () => {
      try {
        const h = iframe.contentDocument?.body?.scrollHeight
        if (h) iframe.style.height = `${h}px`
      } catch {
        // cross-origin guard (won't happen with srcDoc)
      }
    }
    iframe.addEventListener('load', resizeIframe)
    return () => iframe.removeEventListener('load', resizeIframe)
  }, [entry?.html])

  return (
    <div
      className="border-l bg-background flex flex-col shrink-0 overflow-hidden transition-[max-width] duration-[400ms]"
      style={{ maxWidth: isOpen ? '640px' : '0px', width: '640px' }}
    >
      {/* sticky header */}
      <div className="flex items-center justify-between p-6 sticky top-0 bg-background z-10 shrink-0">
        <h2 className="text-lg font-semibold">Email Detail</h2>
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground size-9 transition-all"
          aria-label="Close panel"
        >
          <X className="size-4" />
        </button>
      </div>

      {entry && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4 space-y-4">
            {/* Subject */}
            <p className="text-base font-semibold leading-snug">
              {`Your hotel confirmation: ${entry.confirmationNo || entry.bookingId}`}
            </p>

            {/* Metadata */}
            <div className="space-y-1.5">
              <MetaRow label="From">donotreply@miceflow.com</MetaRow>
              <MetaRow label="To">{entry.to}</MetaRow>
              <MetaRow label="Sent">{formatDateTime(entry.sentAt)}</MetaRow>
              <MetaRow label="By">{entry.sentBy}</MetaRow>
              <MetaRow label="Status">
                {entry.status === 'sent' ? (
                  <Badge variant="success">Sent</Badge>
                ) : (
                  <Badge variant="destructive">Failed</Badge>
                )}
              </MetaRow>
              {entry.errorMessage && (
                <MetaRow label="Error">
                  <span className="text-destructive">{entry.errorMessage}</span>
                </MetaRow>
              )}
            </div>

            {/* PDF attachment */}
            {entry.pdfFilename && (
              entry.pdfUrl ? (
                <button
                  type="button"
                  onClick={() => openPresigned(entry.pdfUrl!)}
                  className="flex items-center gap-2 text-sm rounded-md px-2 py-1.5 -mx-2 hover:bg-accent cursor-pointer w-full text-left"
                >
                  <FilePdf className="size-4 shrink-0 text-muted-foreground" weight="light" />
                  <span className="truncate">{entry.pdfFilename}</span>
                  <ArrowSquareOut className="size-4 shrink-0 text-muted-foreground ml-auto" weight="light" />
                </button>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="size-4 shrink-0" />
                  <span>{entry.pdfFilename}</span>
                </div>
              )
            )}

            {/* HTML body */}
            {entry.html ? (
              <iframe
                ref={iframeRef}
                srcDoc={isDark ? `<style>html{filter:invert(1) hue-rotate(180deg)}img,video{filter:invert(1) hue-rotate(180deg)}</style>${entry.html}` : entry.html}
                sandbox=""
                className="w-full min-h-40"
                style={{ height: '400px' }}
                title="Email body"
              />
            ) : (
              <p className="text-sm text-muted-foreground italic">
                HTML body not available for this entry.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
