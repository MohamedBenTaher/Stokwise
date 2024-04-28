import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
          throw redirect({
            to: '/auth/login',
            search: {
              redirect: location.href,
            },
          })
        }
      },
  component: () => <div>Hello /dashboard/!</div>
})