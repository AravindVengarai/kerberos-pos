import  api  from './setupApi';

export async function getUserInfo(loyaltyID: string) {
  try {
    const response: any = await api.post("/api/findOne", {
      dataSource: "Cluster0",
      database: "kerberos",
      collection: "users",
      filter: {
          loyalties: {$elemMatch: {loyaltyID: loyaltyID}},

      },
  });
  console.log(response.data.document);
  return response.data.document;
  }
  catch(error : any ) {
    console.log('something went wrong in the userInfo API call');
    console.log(error);
    console.log(error.response);
  }
}