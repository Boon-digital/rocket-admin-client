import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/PageHeader'

export const Route = createFileRoute('/_authenticated/tasks')({
  component: TasksPage,
})

function TasksPage() {
  return (
    <div className="flex flex-1">
      <main className="flex flex-col flex-1 min-h-0 max-h-dvh">
        <PageHeader />
      </main>
    </div>
  )
}
