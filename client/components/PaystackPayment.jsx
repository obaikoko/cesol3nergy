import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

const PaystackPayment = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Send request to your backend to initialize the transaction
      const response = await fetch(
        'http://localhost:5000/api/transaction/initialize',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'customer@example.com', // Replace with user's email
            amount: 5000, // Replace with the actual amount (in Naira)
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Step 2: Trigger Paystack popup with the access_code
        const popup = new PaystackPop();
        popup.resumeTransaction(data.data.access_code);
      } else {
        alert('Failed to initialize transaction: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while initializing the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className='bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors'
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaystackPayment;
