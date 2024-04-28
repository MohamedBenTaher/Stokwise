import * as React from 'react'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import Navbar from '@/components/ui/navbar'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient,
  auth: any
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
 
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}
