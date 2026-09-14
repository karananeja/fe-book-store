import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
};

export const EmptyState = ({
  title,
  description,
  actionLabel,
  actionTo,
  icon,
}: EmptyStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center'>
      {icon ? <div className='mb-4 text-muted-foreground'>{icon}</div> : null}
      <h2 className='font-display text-xl font-semibold'>{title}</h2>
      <p className='mt-2 max-w-md text-sm text-muted-foreground'>{description}</p>
      {actionLabel && actionTo ? (
        <Button asChild className='mt-6'>
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
};
