import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
};

const PantipCard: React.FC<Props> = ({ children, title, description }) => {
  return (
    <Card className="my-4">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-yellow-700 dark:text-yellow-400">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      {children}
    </Card>
  );
};

export default PantipCard;
