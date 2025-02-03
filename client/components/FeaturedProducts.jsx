import Link from 'next/link';
const products = [
  {
    title: 'Basic Home Solution',
    description:
      'Designed for light load applications like lighting, fans, and small appliances. Perfect for small households.',
    price: '700K',
    image: '/images/basic.jpg',
    link: '/products/search?keyword=&category=Basic%20Solutions',
  },
  {
    title: 'Standard Family Solution',
    description:
      'Reliable and efficient for medium-sized homes, supporting TVs, fridges, and more. A balance of cost and power.',
    price: '1.8M',
    image: '/images/standard.jpg',
    link: '/products/search?keyword=&category=Standard%20Solutions',
  },
  {
    title: 'Advanced Business Solution',
    description:
      'High-capacity inverter system suitable for small businesses or offices, ensuring uninterrupted operations.',
    price: '4M',
    image: '/images/advanced.jpg',
    link: '/products/search?keyword=&category=Advanced%20Solutions',
  },
  {
    title: 'Industrial Load Solution',
    description:
      'Heavy-duty solution built for industrial equipment and large-scale energy needs. Durable and robust.',
    price: '8M',
    image: '/images/industrial.jpg',
    link: '/products/search?keyword=&category=Industrial%20Solutions',
  },
];

export default function FeaturedProducts() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-blue-800 mb-8'>Our Solutions</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {products.map((product, index) => (
            <div
              key={index}
              className='bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300'
            >
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6 text-left'>
                <h3 className='text-lg font-semibold text-blue-800'>
                  {product.title}
                </h3>
                <p className='text-gray-600 my-2'>{product.description}</p>
                <p>
                  
                  <Link className='text-purple-600 underline' href={product.link}>
                    see more
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
