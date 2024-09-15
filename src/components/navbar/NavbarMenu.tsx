'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import PantipCard from '../common/card';

const categories = [
  { icon: '🍴', label: 'กินครัว' },
  { icon: '🎵', label: 'กรุงไทย' },
  { icon: '🔊', label: 'การตูน' },
  { icon: '🏔️', label: 'แกลเลอรี่' },
  { icon: '✂️', label: 'จุดจักร' },
  { icon: '🎬', label: 'เฉลิมไทย' },
  { icon: '🏠', label: 'ชายคา' },
  { icon: '👫', label: 'ดิโอลด์สยาม' },
  { icon: '✍️', label: 'ถนนนักเขียน' },
  { icon: '🏙️', label: 'บางรูปพรม' },
  { icon: '🌿', label: 'พรมชาติ' },
  { icon: '🗺️', label: 'ภูมิภาค' },
  { icon: '🌱', label: 'กรีนโซน' },
  { icon: '📷', label: 'กล้อง' },
  { icon: '🎮', label: 'แก็ดเจ็ต' },
  { icon: '✈️', label: 'ไกลบ้าน' },
  { icon: '🎼', label: 'เฉลิมกรุง' },
  { icon: '👥', label: 'ชายเขียน' },
  { icon: '💻', label: 'ซิลิคอนวัลเลย์' },
  { icon: '🍷', label: 'โต๊ะเครื่องแป้ง' },
  { icon: '🌍', label: 'บลูแพลนเน็ต' },
  { icon: '💕', label: 'บางรัก' },
  { icon: '😊', label: 'ฟันฟิน' },
  { icon: '📱', label: 'มาบุญครอง' },
];

export default function Component() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <PantipCard title="เลือกหัวข้อ">
      <div className="relative mt-4">
        <div
          ref={scrollRef}
          className="grid auto-cols-max grid-flow-col gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map(category => (
            <div key={category.label} className="flex w-20 flex-col items-center md:w-24">
              <div className="mb-2 rounded-lg border border-secondary p-2 md:p-2">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
              </div>
              <span className="text-center text-xs text-primary md:text-sm">{category.label}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-primary transition-opacity duration-300 ease-in-out${
            showLeftArrow ? 'opacity-100' : 'pointer-events-none opacity-0'
          } hidden md:block`}
          aria-hidden={!showLeftArrow}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-primary transition-opacity duration-300 ease-in-out${
            showRightArrow ? 'opacity-100' : 'pointer-events-none opacity-0'
          } hidden md:block`}
          aria-hidden={!showRightArrow}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </PantipCard>
  );
}
