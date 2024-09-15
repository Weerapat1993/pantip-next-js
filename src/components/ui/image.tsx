'use client';

import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

const fallbackImage = '/assets/images/placeholder.svg';

export const Image: React.FC<ImageProps> = ({
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <NextImage
      alt={alt}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};
