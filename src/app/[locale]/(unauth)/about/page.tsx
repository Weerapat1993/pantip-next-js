import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { LayoutBreadcrumb } from '@/components/common/layout-breadcrumb';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function About(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  const breadcrumb = [
    {
      key: 1,
      title: t('home_link'),
      href: '/',
    },
    {
      key: 2,
      title: t('about_link'),
      href: '/about',
      isLast: true,
    },
  ];

  return (
    <>
      <LayoutBreadcrumb list={breadcrumb} />
      <h2 className="mb-4 text-2xl font-bold">{t('about_link')}</h2>
      <Image
        src="/assets/pages/about-us/aboutus.jpg"
        alt="About Us"
        width={1280}
        height={6715}
      />
    </>
  );
}
