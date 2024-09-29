import axios from 'axios';
import qs from 'qs'; // Make sure to install qs with `npm install qs`

export const generateAccessTokenForPaypal = async (paypal_baseUrl: string, client_id: string, client_secret: string) => {
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios.post(
      `${paypal_baseUrl}/v1/oauth2/token`,
      qs.stringify({ grant_type: 'client_credentials' }), // Properly format request body
      {
        headers: {
          Authorization: `Basic ${auth}`, // Use Basic authorization
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // The token will be in response.data
    return response.data.access_token;
  } catch (error) {
    throw new Error(`Failed to obtain access token`);
  }
};
