import { useEffect } from 'react'

export default function ScrollToTop(pathName) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;
}
