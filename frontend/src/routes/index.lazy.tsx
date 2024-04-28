import Navbar from '@/components/ui/navbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: () =>    <><Navbar /><div>Hello /!</div></>
})