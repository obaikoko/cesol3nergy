import https from 'https';
import asyncHandler from '../middleware/asyncHandler.js';

const createTransaction = asyncHandler(async (req, res) => {
  const params = JSON.stringify({
    email: req.body.email, // Use email from request body
    amount: req.body.amount * 100, // Convert amount to kobo (Naira x 100)
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const paystackReq = https
    .request(options, (paystackRes) => {
      let data = '';

      // Collect data chunks
      paystackRes.on('data', (chunk) => {
        data += chunk;
      });

      // Handle response completion
      paystackRes.on('end', () => {
        const response = JSON.parse(data);

        if (response.status) {
          res.status(200).json({
            success: true,
            data: response.data,
          });
        } else {
          res.status(400).json({
            success: false,
            message: response.message,
          });
        }
      });
    })
    .on('error', (error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    });

  paystackReq.write(params);
  paystackReq.end();
});

const confirmTransaction = asyncHandler ( async (req, res) => {

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/verify/:id',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  },
};

https
  .request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  })
  .on('error', (error) => {
    console.error(error);
  });
})


export { createTransaction, confirmTransaction };
