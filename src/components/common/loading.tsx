import { LucideLoaderCircle } from 'lucide-react';

type Props = {
  isLoading: boolean | undefined;
  children: React.ReactNode;
  className?: string;
};

const Loading: React.FC<Props> = ({ isLoading, children, className }) => {
  return (
    <div className={`relative ${className} ${isLoading ? 'bg-secondary opacity-20' : ''}`}>
      {children}
      {isLoading
        ? (
            <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
              <LucideLoaderCircle className="animate-spin" />
            </div>
          )
        : null}
    </div>
  );
};

export default Loading;
