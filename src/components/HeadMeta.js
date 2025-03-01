'use client';

import themeConfig from '@/config/themeConfig';
import { useEffect } from 'react';

const SeoData = ({ title, description, image }) => {
  useEffect(() => {
    document.title = title || themeConfig.seo_title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description || themeConfig.seo_discription;
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description || themeConfig.seo_discription;
      document.head.appendChild(metaDescription);
    }

    let metaImage = document.querySelector('meta[property="og:image"]');
    if (metaImage) {
      metaImage.content = image || themeConfig.seo_image;
    } else {
      metaImage = document.createElement('meta');
      metaImage.property = 'og:image';
      metaImage.content = image || themeConfig.seo_image;
      document.head.appendChild(metaImage);
    }
  }, [title, description, image]);

  return null;
};

export default SeoData;
