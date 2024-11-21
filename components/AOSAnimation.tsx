import { loadExternalResource } from '@/lib/utils';
import { useEffect } from 'react';

// import AOS from 'aos'

/**
 * 加载滚动动画
 * 改从外部CDN读取
 * https://michalsnik.github.io/aos/
 */
export default function AOSAnimation() {
  const initAOS = async () => {
    await Promise.all([
      loadExternalResource(
        'https://cdn.bootcdn.net/ajax/libs/aos/2.3.4/aos.js',
        'js'
      ),
      loadExternalResource(
        'https://cdn.bootcdn.net/ajax/libs/aos/2.3.4/aos.css',
        'css'
      )
    ]).then(() => {
      if ((window as any).AOS) {
        (window as any).AOS.init();
      }
    });
  };

  useEffect(() => {
    initAOS();
  }, []);
}
