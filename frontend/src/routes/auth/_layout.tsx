import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout')({
  component: () => <div>Hello /auth/_layout!</div>
})