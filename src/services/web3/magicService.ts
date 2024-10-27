import { Magic } from '@magic-sdk/admin';

const magic: any = new Magic(process.env.MAGIC_SECRET_KEY); // Initialize Magic SDK with secret key

// Login with Magic Link - creates a DID Token
export const magicLogin = async (email: string): Promise<string> => {
    email = 'test@gmail.com';
  //try {
    // You send the email from your frontend for the Magic Link login
    const didToken = await magic.auth.loginWithEmailOTP({ email });

    return didToken;
//   } catch (error) {
//     throw new Error('Failed to send Magic Link');
//   }
};

// Validate Magic Token
export const magicTokenValidation = async (didToken: string): Promise<any> => {
  try {
    // Validate and get the metadata (user information) from the Magic token
    const metadata = await magic.token.validate(didToken);
    return metadata;
  } catch (error) {
    throw new Error('Failed to validate token');
  }
};
