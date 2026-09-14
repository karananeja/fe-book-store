import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const COVER_PALETTES = [
  ['#1c2b24', '#4a6b5c', '#8fbc8f'],
  ['#2a1f1a', '#6b4a3a', '#c4a484'],
  ['#1a2332', '#3d5a6c', '#7eb6d0'],
  ['#2b1c2b', '#5c4a6b', '#b89fbc'],
  ['#1f2420', '#3f5e46', '#a3b18a'],
  ['#2c1810', '#7c4a2d', '#d4a574'],
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

type BookCoverProps = {
  title: string;
  author: string;
  bookId: string;
  className?: string;
};

export const BookCover = ({
  title,
  author,
  bookId,
  className,
}: BookCoverProps) => {
  const hash = hashString(bookId || title);
  const [deep, mid, light] = COVER_PALETTES[hash % COVER_PALETTES.length];
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(bookId || title)}/480/720`;
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      className={cn(
        'relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg ring-1 ring-black/10',
        className
      )}
      style={{
        background: `linear-gradient(160deg, ${deep} 0%, ${mid} 48%, ${light} 100%)`,
      }}
    >
      <img
        src={imageUrl}
        alt=''
        className='absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-overlay'
        loading='lazy'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10' />
      <div
        className='absolute inset-y-0 left-0 w-2.5 opacity-80'
        style={{ background: `linear-gradient(180deg, ${light}, ${deep})` }}
        aria-hidden
      />
      <div className='relative flex h-full flex-col justify-between p-5 text-white'>
        <div className='flex items-start justify-between gap-2'>
          <Badge
            variant='secondary'
            className='border-0 bg-white/15 text-white backdrop-blur-sm'
          >
            BookShelf
          </Badge>
          <span className='font-display text-2xl font-semibold tracking-wide text-white/80'>
            {initials || 'BK'}
          </span>
        </div>
        <div>
          <p className='font-display text-xl font-semibold leading-snug drop-shadow-sm line-clamp-4'>
            {title}
          </p>
          <p className='mt-2 text-sm text-white/85 line-clamp-2'>{author}</p>
        </div>
      </div>
    </div>
  );
};
