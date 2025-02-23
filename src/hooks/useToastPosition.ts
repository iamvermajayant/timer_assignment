import { useState, useEffect } from 'react';

export const useToastPosition = () => {
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>(
    window.innerWidth <= 768 ? 'bottom-center' : 'top-right'
  );

  useEffect(() => {
    const handleResize = () => {
      setPosition(window.innerWidth <= 768 ? 'bottom-center' : 'top-right');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return position;
}; 