import { Link } from '@tanstack/react-router'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { SheetContent, SheetTrigger ,Sheet} from './sheet'
import { ModeToggle } from './mode-toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Input } from './input'

function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to='/'
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            to='/dashboard'
            className="text-foreground transition-colors hover:text-foreground"
            activeProps={{
                className: 'text-foreground font-semibold'
                
            }}
          >
            Dashboard
          </Link>
          <Link
            to='/about'
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{
                className: 'text-foreground font-semibold'
                
            }}
          >
            Orders
          </Link>
          <Link
            to='/'
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{
                className: 'text-foreground font-semibold'
                
            }}
          >
            Products
          </Link>
          <Link
            to='/'
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{
                className: 'text-foreground font-semibold'
                
            }}
          >
            Customers
          </Link>
          <Link
            to='/'
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{
                className: 'text-foreground font-semibold'
                
            }}
          >
            Analytics
          </Link>
            <ModeToggle />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
               to='/'
                className="flex items-center gap-2 text-lg font-semibold"
                activeProps={{
                    className: 'text-foreground font-semibold'
                    
                }}
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link to='/' className="hover:text-foreground"
              activeProps={{
                className: 'text-foreground font-semibold'
                
            }}>
                Dashboard
              </Link>
              <Link
                to='/'
                className="text-muted-foreground hover:text-foreground"
                activeProps={{
                    className: 'text-foreground font-semibold'
                    
                }}
              >
                Orders
              </Link>
              <Link
                to='/'
                className="text-muted-foreground hover:text-foreground"
                activeProps={{
                    className: 'text-foreground font-semibold'
                    
                }}
              >
                Products
              </Link>
              <Link
                to='/'
                className="text-muted-foreground hover:text-foreground"
                activeProps={{
                    className: 'text-foreground font-semibold'
                    
                }}
              >
                Customers
              </Link>
              <Link
                to='/'
                className="text-muted-foreground hover:text-foreground"
                activeProps={{
                    className: 'text-foreground font-semibold'
                    
                }}
              >
                Analytics
              </Link>
              <ModeToggle />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
                  )
                  }

                  export default Navbar