import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadcrumbProps = {
  key: string | number;
  title: string;
  href: string;
  isLast?: boolean;
};

type Props = {
  list: BreadcrumbProps[];
};

export const LayoutBreadcrumb: React.FC<Props> = (props) => {
  const { list } = props;
  return list.length
    ? (
        <div className="my-4 flex h-8 items-center rounded-md bg-secondary shadow">
          <div className="mx-auto my-4 w-full px-2 sm:px-4 lg:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                {list.map(item => item.isLast
                  ? (
                      <BreadcrumbItem key={item.key}>
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    )
                  : (
                      <Fragment key={item.key}>
                        <BreadcrumbItem key={item.key}>
                          <BreadcrumbLink>
                            <Link href={item.href}>
                              {item.title}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </Fragment>
                    ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )
    : null;
};
