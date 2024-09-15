import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { PantipItem, PantipList } from '@/components/common/pantip-list';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('Highlight');

  return (
    <>
      <Card className="my-4">
        <CardHeader className="bg-secondary">
          <CardTitle className="text-yellow-700 dark:text-yellow-400">{t('title')}</CardTitle>
        </CardHeader>
        <PantipList>
          <PantipItem
            title="คนเราคบกัน จำเป็นต้องมี Love language ที่เท่ากันมั้ยคะ"
            description={(
              <div className="flex flex-wrap gap-2">
                <span className="cursor-pointer text-xs text-secondary-foreground">ความรักต่างวัย</span>
                <span className="cursor-pointer text-xs text-secondary-foreground">ความรักต่างวัย</span>
                <span className="cursor-pointer text-xs text-secondary-foreground">ความรักต่างวัย</span>
              </div>
            )}
          />
          <PantipItem
            title="Card Content"
          />
          <PantipItem
            title="Card Content"
          />
          <PantipItem
            title="Card Content"
          />
        </PantipList>
      </Card>
      <Card className="my-4">
        <CardHeader className="bg-secondary">
          <CardTitle className="text-yellow-700 dark:text-yellow-400">Pantip Realtime</CardTitle>
          <CardDescription>กระทู้ที่มีคนอ่านมาในขณะนี้</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
