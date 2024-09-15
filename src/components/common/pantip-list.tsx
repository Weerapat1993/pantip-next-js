import { CardContent } from '@/components/ui/card';

type Props = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
};

export const PantipList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-px bg-[rgba(233,229,246,0.8)] lg:grid-cols-2">
      {children}
    </div>
  );
};

export const PantipItem: React.FC<Props> = ({ title, description }) => {
  return (
    <CardContent className="bg-card py-4 hover:bg-[#2b274c]">
      {title ? <h3>{title}</h3> : null}
      {description}
    </CardContent>
  );
};
