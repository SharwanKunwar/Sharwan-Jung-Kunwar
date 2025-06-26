import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollBottomToTop({ scrollRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!scrollRef?.current) {
      // For window
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' }); // jump to bottom
      window.scrollTo({ top: 0, behavior: 'smooth' }); // smoothly scroll to top
    } else {
      const el = scrollRef.current;
      el.scrollTo({ top: el.scrollHeight, behavior: 'auto' }); // jump to bottom
      el.scrollTo({ top: 0, behavior: 'smooth' }); // smooth scroll to top
    }
  }, [pathname, scrollRef]);

  return null;
}
