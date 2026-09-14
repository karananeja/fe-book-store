import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(name, email, password);
      enqueueSnackbar('Account created', { variant: 'success' });
      navigate('/', { replace: true });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Registration failed'
        : 'Registration failed';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center p-4 page-enter'>
      <div className='absolute right-4 top-4'>
        <ThemeToggle />
      </div>
      <Card className='w-full max-w-md border-border/80 bg-card/90 shadow-md backdrop-blur'>
        <CardHeader className='space-y-2 text-center sm:text-left'>
          <p className='font-display text-2xl font-semibold tracking-tight'>
            BookShelf
          </p>
          <CardTitle className='font-display text-3xl'>Create account</CardTitle>
          <CardDescription>Start building your reading list.</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete='name'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={submitting}>
              {submitting ? 'Creating…' : 'Create account'}
            </Button>
            <p className='text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link className='font-medium text-foreground underline-offset-4 hover:underline' to='/login'>
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
