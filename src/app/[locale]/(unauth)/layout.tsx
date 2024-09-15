import { unstable_setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/navbar/navbar';
import NavbarMenu from '@/components/navbar/NavbarMenu';

type Props = {
  children: React.ReactNode;
  params: Params;
};

type Params = {
  locale: string;
};

const Layout: React.FC<Props> = (props) => {
  const { children, params } = props;
  unstable_setRequestLocale(params.locale || 'th');
  return (
    <div className="min-h-screen bg-white dark:bg-[#353157]">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-6">
          <NavbarMenu />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
