import { forwardRef, useState } from 'react';

export type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Local asset images: shows a dark placeholder if the file 404s or fails to load.
 */
export const SafeImage = forwardRef<HTMLImageElement, SafeImageProps>(function SafeImage(
  { className, style, alt, onError, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#1A1A1A] bg-[radial-gradient(ellipse_at_center,_#2a2618_0%,_#131313_70%)] ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={alt ?? 'Image unavailable'}
      />
    );
  }

  return (
    <img
      ref={ref}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
});
