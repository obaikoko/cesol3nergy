// components/BlogSection.js
'use client';

import { useSpring, animated } from '@react-spring/web';

const articles = [
  {
    title: 'The Future of Solar Energy',
    description: 'Discover the latest advancements in solar technology.',
    date: 'Oct 20, 2024',
    image: '/images/future-of-solar-power-energy.jpg',
  },
  {
    title: 'Top 5 Solar Products for 2024',
    description:
      'A roundup of must-have solar products for any home or business.',
    date: 'Oct 15, 2024',
    image: '/images/solar-energy-grid-integration.jpg',
  },
  {
    title: 'Why Solar is the Future of Energy',
    description:
      'Learn why solar energy is the top choice for sustainable power.',
    date: 'Oct 10, 2024',
    image: '/images/solar-future.jpg',
  },
];

export default function BlogSection() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-blue-800 mb-8'>Latest News</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {articles.map((article, index) => (
            <animated.div
              key={index}
              className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105'
            >
              <img
                src={article.image}
                alt={article.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6 text-left'>
                <h3 className='text-lg font-semibold text-blue-800'>
                  {article.title}
                </h3>
                <p className='text-gray-500 my-2'>{article.description}</p>
                <p className='text-sm text-gray-400'>{article.date}</p>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
}
