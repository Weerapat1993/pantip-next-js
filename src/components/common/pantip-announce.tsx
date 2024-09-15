'use client';

import { usePantipAnnounce } from '@/hooks/usePantipAnnounce';

import PantipCard from './card';
import { PantipItem, PantipList } from './pantip-list';

const PantipAnnounce: React.FC = () => {
  const { list, isFetch } = usePantipAnnounce();
  return isFetch
    ? (
        <PantipCard title="Announce">
          <PantipList>
            {list.map((item: any) => {
              return (
                <PantipItem
                  key={item?.announce_id}
                  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                  title={<div dangerouslySetInnerHTML={{ __html: item.display_message }} />}
                />
              );
            })}
          </PantipList>
        </PantipCard>
      )
    : null;
};

export default PantipAnnounce;
