import { useEffect, useMemo, useRef, useState } from 'react'
import type { DetailPanelHandle, EntityConfig } from '../types'
import { DetailPanel } from './DetailPanel'

interface EntityModalProps<T> {
  isOpen: boolean
  onClose: () => void
  data: T | null
  config: EntityConfig<T>
  onSave?: (data: T, isNew: boolean) => Promise<void>
  defaultMode?: 'view' | 'edit'
  initialMode?: 'view' | 'edit' | 'create'
  originPoint?: { x: number; y: number }
}

export function EntityModal<T>({
  isOpen,
  onClose,
  data,
  config,
  onSave,
  defaultMode = 'view',
  initialMode,
  originPoint,
}: EntityModalProps<T>) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const activeOrigin = useRef<{ x: number; y: number } | undefined>(undefined)
  const panelRef = useRef<DetailPanelHandle>(null)

  // Compute the modal's final rect and transform-origin from the click point
  const transformOrigin = useMemo(() => {
    const origin = activeOrigin.current
    if (!origin) return 'center center'

    const vw = window.innerWidth
    const vh = window.innerHeight
    const margin = vh * 0.02

    const modalHeight = vh * 0.96
    const modalTop = (vh - modalHeight) / 2

    const gridColumns = config.gridColumns || 8
    const columnWidth = 90
    const modalWidth = gridColumns * columnWidth + (gridColumns - 1) * 12 + 48

    const modalRight = vw - margin
    const modalLeft = modalRight - modalWidth

    const originX = origin.x - modalLeft
    const originY = origin.y - modalTop
    return `${originX}px ${originY}px`
  }, [activeOrigin.current, config.gridColumns])

  // Mount then animate in, or animate out then unmount
  useEffect(() => {
    if (isOpen) {
      activeOrigin.current = originPoint
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      const timer = setTimeout(() => {
        setMounted(false)
        activeOrigin.current = undefined
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen, originPoint])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') panelRef.current?.requestClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={() => panelRef.current?.requestClose()}
      />

      {/* Modal container — width is dictated by the DetailPanel's gridColumns config */}
      <div
        className="relative z-10 h-[96vh] mr-[2vh] overflow-hidden rounded-lg bg-background shadow-xl transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)] [&>div]:h-full [&>div]:max-h-[96vh] [&>div]:border-0"
        style={{
          transform: visible ? 'scale(1)' : 'scale(0)',
          transformOrigin,
        }}
      >
        <DetailPanel
          ref={panelRef}
          isOpen={true}
          onClose={onClose}
          data={data}
          config={config}
          onSave={onSave}
          mode={initialMode}
          defaultMode={defaultMode}
          allowModeSwitch={true}
          cancelClosesPanel={true}
        />
      </div>
    </div>
  )
}
