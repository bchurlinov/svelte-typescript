export const createUserMutation = (args) => {
   return {
      query: `mutation createUser($username: String!, $email: String!, $password: String!, $first_name: String!, $last_name: String!){
            createUser(
    createUser: {
    username: $username
    email: $email
    password: $password
    first_name: $first_name
    last_name: $last_name
    }
    ) {
    id
    username
    email
    first_name
    last_name
    token
    }
    
         }`,
      variables: { ...args },
   };
};
