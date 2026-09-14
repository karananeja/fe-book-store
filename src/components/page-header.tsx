import { type ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <h1 className='font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
          {title}
        </h1>
        {description ? (
          <p className='mt-2 max-w-xl text-muted-foreground'>{description}</p>
        ) : null}
      </div>
      {actions ? <div className='flex flex-wrap items-center gap-2'>{actions}</div> : null}
    </div>
  );
};
