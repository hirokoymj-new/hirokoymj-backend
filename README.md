# GraphQL Apollo Server for hirokoymj.com

### Production URL

https://hirokoymj-backend.herokuapp.com/

### Localhost URL

http://localhost:4000/

### MongoDB Local

mongodb://localhost:27017/mydb

### MongoDB Production

[MongoDB Altras Login](https://account.mongodb.com/account/login?nds=true)

### Deploying Apollo Server to Heroku in production

- [Deploying with Heroku](https://www.apollographql.com/docs/apollo-server/deployment/heroku/)

### Enabling GraphQL Playground in production

- `introspection` and the `playground` can be enabled explicitly in the following manner.
- [Apollo Server Official Doc: GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#gatsby-focus-wrapper)

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // enabled!!
  playground: true, // enabled!!
});
```

<hr />

## Run local

```js
npm run dev
```

RegisteredUser

```js
mutation RegisterUser {
  registerUser(registerInput: {username: "test", email: "test@test.com", password: "test"}) {
     username
     email
     password
  }
}

{
  "data": {
    "registerUser": {
      "username": "test",
      "email": "test@test.com",
      "password": "$2a$10$jWLsWh7TNYrPszogbEwole.MH.EPZv4d8x.sfLmDz27n0eEifonke"
    }
  }
}
```

```js
// User Query
query GETUSER{
  user(id: "625b8f06a3426c0cc489723c"){
    username
    email
    token
    password
  }
}
{
  "data": {
    "user": {
      "username": "test",
      "email": "test@test.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI1YjhmMDZhMzQyNmMwY2M0ODk3MjNjIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjUwMTY3NTU4LCJleHAiOjE2NTAxNzQ3NTh9.9iHCXDIYZly6a0e00mbUxP3W-zq8saetuy-QV7fzQ9o",
      "password": "$2a$10$jWLsWh7TNYrPszogbEwole.MH.EPZv4d8x.sfLmDz27n0eEifonke"
    }
  }
}
```

```js
mutation LOGINUSER{
	loginUser(loginInput: {email: "test@test.com", password: "test"}){
    username
    email
    password
    token
  }
}

{
  "data": {
    "loginUser": {
      "username": "test",
      "email": "test@test.com",
      "password": "$2a$10$jWLsWh7TNYrPszogbEwole.MH.EPZv4d8x.sfLmDz27n0eEifonke",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI1YjhmMDZhMzQyNmMwY2M0ODk3MjNjIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjUwMjQzNjg1LCJleHAiOjE2NTAyNTA4ODV9.NOfe1Vd7FzfbofbGc3RnOT8faiVDG19_XhUHoJre1nM"
    }
  }
}
```

## graphql-tools

https://www.apollographql.com/docs/apollo-server/api/graphql-tools/
https://www.graphql-tools.com/docs/introduction/

## Apollo Server Instance Options

https://www.apollographql.com/docs/apollo-server/api/apollo-server/
