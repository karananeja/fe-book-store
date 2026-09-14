import { Badge } from '@/components/ui/badge';
import { BOOK_STATUS_LABELS, BookStatus } from '@/utils/types';

const statusVariant: Record<
  BookStatus,
  'default' | 'secondary' | 'outline'
> = {
  want_to_read: 'outline',
  reading: 'secondary',
  completed: 'default',
};

export const StatusBadge = ({ status }: { status: BookStatus }) => {
  return (
    <Badge variant={statusVariant[status]}>{BOOK_STATUS_LABELS[status]}</Badge>
  );
};
