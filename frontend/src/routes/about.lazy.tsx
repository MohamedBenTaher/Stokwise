import Navbar from '@/components/ui/navbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    
  component: () =>    <><Navbar /><div>Hello /about!</div></>
})