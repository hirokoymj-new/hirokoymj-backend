# Quiz - Apollo Server

**Q1: Write Schema from below data structure**

```js
query EventList {
  upcomingEvents {
    name
    date
    location {
      name
      weather {
        temperature
        description
      }
    }
  }
}
```

**A1:**

```js
type Query {
  upcomingEvents: [Event]
}

type Event {
  name: String
  date: String
  location: Location
}

type Location {
  name: String
  weather: WeatherInfo
}

type WeatherInfo {
  temperature: Float
  description: String
}
```

<hr />

**Q2: Write Schema from below data structure**

```js
mutation updateMyUser {
  updateUserEmail(id: 1, email: "jane@example.com"){
    id
    name
    email
  }
}
```

**A2:**

```js
type Mutation {
  # This mutation takes id and email parameters and responds with a User
  updateUserEmail(id: ID!, email: String!): User
}

type User {
  id: ID!
  name: String!
  email: String!

```

<hr />

**Q3: List five supported types for Schema**

**A3:**

- A schema defines a collection of types and the relationships between those types.

**Supported types**

1. Scalar types

   ```js
   //Scalar types == primitive type
   Int, Float, String, Boolean, ID (serialized as a String):
   ```

2. Object types
3. The Query type
4. The Mutation type
5. Input types

<hr />

## References:

https://www.apollographql.com/docs/apollo-server/schema/schema/

<!--
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr /> -->
