import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { LayoutBreadcrumb } from '@/components/common/layout-breadcrumb';
import PantipAnnounce from '@/components/common/pantip-announce';
import PantipSuggestTopic from '@/components/home/PantipSuggestTopic';
import NavbarMenu from '@/components/navbar/NavbarMenu';

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
  const t = useTranslations('RootLayout');
  const breadcrumb = [
    {
      key: 1,
      title: t('home_link'),
      href: '/',
      isLast: true,
    },
  ];

  return (
    <div>
      <LayoutBreadcrumb list={breadcrumb} />
      <h2 className="mb-4 text-2xl font-bold">{t('home_link')}</h2>
      <PantipAnnounce />
      <NavbarMenu />
      <div className="flex flex-row-reverse flex-wrap gap-4 lg:flex-nowrap">
        <div className="flex w-full flex-none flex-col lg:w-80">
          <PantipSuggestTopic type="tag" />
        </div>
        <div className="flex w-full flex-auto flex-col">
          <PantipSuggestTopic type="room" />
        </div>
      </div>

    </div>
  );
}
