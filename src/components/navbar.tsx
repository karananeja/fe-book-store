import { Link, NavLink } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
    isActive &&
      'text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-100 after:bg-primary after:transition-transform'
  );

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className='sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3'>
        <div className='flex flex-wrap items-center gap-6'>
          <Link
            to='/'
            className='font-display text-xl font-semibold tracking-tight text-foreground'
          >
            BookShelf
          </Link>
          <div className='flex items-center gap-4'>
            <NavLink to='/' end className={navLinkClass}>
              Catalog
            </NavLink>
            <NavLink to='/library' className={navLinkClass}>
              My Library
            </NavLink>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {isAdmin ? (
            <Button asChild size='sm'>
              <Link to='/books/create'>
                <Plus className='h-4 w-4' />
                Add book
              </Link>
            </Button>
          ) : null}
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <span>{user.name}</span>
            {isAdmin ? <Badge variant='secondary'>Admin</Badge> : null}
          </div>
          <ThemeToggle />
          <Button variant='ghost' size='sm' onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
