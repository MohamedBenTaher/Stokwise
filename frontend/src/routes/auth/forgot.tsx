import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot')({
  component: () => <div>Hello /auth/forgot!</div>
})