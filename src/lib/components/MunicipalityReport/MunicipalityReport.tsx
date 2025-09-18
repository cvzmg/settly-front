import React from 'react';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

const MunicipalityReport = () => {
const alcaldiaName = "Coyoacán";

const images = [
  { src: "https://64.media.tumblr.com/83e2e5338ab01edcafee8751a7793cc7/e71c4f2979e944b4-09/s2048x3072/451f2276fbf041d16aff7f59b85b3c54de735377.jpg", alt: "A vibrant street in Coyoacán." },
  { src: "https://64.media.tumblr.com/05020a3e1f46e23e1d71b18dca9821e3/e71c4f2979e944b4-7b/s1280x1920/2c9cb90f02fd706122401b9dcf4b99d4a9094413.jpg", alt: "Jardín Hidalgo fountain in Coyoacán." },
  { src: "https://64.media.tumblr.com/0a3735a1e23eab97731017f7eafcfdc0/e71c4f2979e944b4-8b/s2048x3072/25848a7913fb7dbad44bb49dd0b5daaa70790cbf.jpg", alt: "Colorful banners in Coyoacán." },
  { src: "https://64.media.tumblr.com/6c2676eedd1ae0db5b4a4371179ab265/066b8625ed50c38c-3b/s2048x3072/db5a327b3caef3616996696365106f3d7c8b74bd.jpg", alt: "Colorful banners in Coyoacán." },
];

const description = "Coyoacán is a historic borough in Mexico City, known for its cobblestone streets, colonial architecture, and vibrant cultural scene. It's famously the home of artists like Frida Kahlo and Diego Rivera, with the 'Casa Azul' museum being a major landmark.";

return (
  <div className="flex flex-col h-full">
    <h1 className="text-3xl font-bold mb-4 px-1 text-gray-800 flex-shrink-0">{alcaldiaName}</h1>
    
    {/* Carousel container with explicit flex-grow and min-height */}
    <div className="flex-grow min-h-[15ch] mb-4">
      <ImageCarousel images={images} />
    </div>
    
    <p className="text-sm text-gray-600 px-1 flex-shrink-0">{description}</p>
  </div>
);
};

export default MunicipalityReport;
