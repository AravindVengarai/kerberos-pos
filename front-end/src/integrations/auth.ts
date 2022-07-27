import { api } from './setupApi';

async function getUserInfo(loyaltyID: string) {
  try {
    const response = api({
      method: 'post',
      url: '',
      data: {
        loyaltyID: loyaltyID,
      }
    });
    return response;
  }
  catch(error : any ) {
    console.log('something went wrong in the userInfo API call');
    console.log(error);
  }
}