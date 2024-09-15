'use client';

import { usePantipSuggestTopic } from '@/hooks/usePantipSuggestTopic';
import { dateHuman } from '@/utils/dayjs';

import PantipCard from '../common/card';
import Loading from '../common/loading';
import PantipLink from '../common/pantip-link';
import { PantipItem, PantipList } from '../common/pantip-list';
import { Button } from '../ui/button';

type Props = {
  type: 'room';
};

const PantipSuggestTopic: React.FC<Props> = ({ type }) => {
  const { list, isLoading, isFetch, pagination, refetch } = usePantipSuggestTopic({ key: type });

  const seeMore = () => {
    refetch({
      key: type,
      limit: 1,
      ...pagination,
    });
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        {list.map((item: any) => (
          <PantipCard
            key={item.room_id}
            title={item.room_name_th}
          >
            <PantipList>
              {item.topics.map((topic: any) => (
                <PantipItem
                  key={topic.topic_id}
                  title={(
                    <PantipLink href={`/topic/${topic.topic_id}`}>
                      {topic.title}
                    </PantipLink>
                  )}
                  description={(
                    <div className="text-xs">
                      <div className="flex flex-wrap gap-x-2">
                        {topic.tags.map((tag: any) => (
                          <PantipLink className="text-muted-foreground" key={tag.slug} href={`/tag/${tag.slug}`}>
                            {tag.name}
                          </PantipLink>
                        ))}
                      </div>
                      <div>
                        <PantipLink href={`/profile/${topic.author.id}`}>
                          {topic.author.name}
                        </PantipLink>
                        <span className="text-muted-foreground">
                          {' '}
                          -
                          {' '}
                          {dateHuman(topic.created_time)}
                        </span>
                      </div>
                    </div>
                  )}
                />
              ))}
            </PantipList>
          </PantipCard>
        ))}
        {isFetch
          ? (
              <div className="text-center">
                <Button onClick={seeMore} disabled={isLoading}>See more</Button>
              </div>
            )
          : null}
      </Loading>
    </div>
  );
};

export default PantipSuggestTopic;
