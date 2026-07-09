import React, { useEffect, useState } from 'react';
import { getSignedUrl } from '../lib/storage';

interface SupabaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | null | undefined;
  fallback?: string;
}

export const SupabaseImage: React.FC<SupabaseImageProps> = ({ src, fallback = '', ...props }) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    if (!src) {
      setResolvedSrc(fallback);
      setLoading(false);
      return;
    }
    
    if (src.startsWith('http') || src.startsWith('data:')) {
      setResolvedSrc(src);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    getSignedUrl(src)
      .then((url) => {
        if (active) {
          setResolvedSrc(url || fallback);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error resolving image src:', err);
        if (active) {
          setResolvedSrc(fallback);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [src, fallback]);

  if (loading && !resolvedSrc) {
    // Optionally render a subtle gray placeholder while loading to prevent abrupt jumps
    return (
      <div 
        className={`animate-pulse bg-gray-100 ${props.className || ''}`} 
        style={props.style}
      />
    );
  }

  return (
    <img 
      {...props} 
      src={resolvedSrc || fallback || undefined} 
    />
  );
};

export default SupabaseImage;
