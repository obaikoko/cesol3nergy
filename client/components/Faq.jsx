'use client';
import { useState } from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What services does Cesol3nergy provide?',
      answer:
        'Cesol3nergy specializes in providing clean energy solutions such as solar panel installations, energy audits, and maintenance services for both residential and commercial properties.',
    },
    {
      question: 'How can I contact Cesol3nergy for support?',
      answer:
        'You can reach us through our contact page, email us at support@cesol3nergy.com, or call our customer service line at (123) 456-7890.',
    },
    {
      question: 'Do you offer warranties for your solar panels?',
      answer:
        'Yes, all our solar panels come with a 25-year warranty. We also offer warranties for installation services.',
    },
    {
      question: 'What are the benefits of switching to solar energy?',
      answer:
        'Switching to solar energy can help you save on energy bills, reduce your carbon footprint, and increase the value of your property.',
    },
    {
      question: 'Does Cesol3nergy provide financing options?',
      answer:
        'Yes, we offer flexible financing plans to make clean energy accessible to everyone. Contact us to learn more about our financing options.',
    },
  ];

  const [openIndex, setOpenIndex] = (useState < number) | (null > null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className='bg-gray-100 min-h-screen py-10 px-5 md:px-20'>
      <h1 className='text-4xl font-bold text-center text-purple-700 mb-10'>
        Frequently Asked Questions
      </h1>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10'>
        {faqs.map((faq, index) => (
          <div key={index} className='mb-4'>
            <button
              onClick={() => toggleFAQ(index)}
              className='w-full text-left focus:outline-none'
            >
              <h3 className='text-xl font-semibold text-purple-700 flex justify-between items-center'>
                {faq.question}
                <span className='text-gray-500'>
                  {openIndex === index ? '-' : '+'}
                </span>
              </h3>
            </button>
            {openIndex === index && (
              <p className='mt-2 text-gray-700'>{faq.answer}</p>
            )}
            <hr className='mt-4' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
