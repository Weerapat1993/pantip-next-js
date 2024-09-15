import { cn } from '@/lib/utils';
import { pantipLink } from '@/utils/pantipLink';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const PantipLink = ({ href, className, children }: Props) => {
  return (
    <a
      href={pantipLink(href)}
      className={cn(
        'hover:underline',
        className,
      )}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default PantipLink;
