# Resolver chains

## Define top-level resolvers

The resolver for a parent field always executes **before** the resolvers for that **field's children**. Therefore, let's start by defining resolvers for some top-level fields: the fields of the Query type.

## Field level resolvers

- Field level resolver is given high priority as compared to query level resolver.

**Example 1**

```js
const typeDefs = gql`
  type Query {
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User! // !!! Object type field !!!
  }
`;

module.exports.tasks = [
  { id: "1", name: "Work", completed: false, userId: "3" },
  { id: "2", name: "Eat", completed: true, userId: "1" },
  { id: "3", name: "Shopping", completed: true, userId: "4" },
  { id: "4", name: "Gym", completed: true, userId: "2" },
];

const resolvers = {
  Query: {
    //Top-level resolver
    tasks: () => tasks,
  },
  Task: {
    // Field-level resolver (Execute field level resolver FIRST BEFORE top-level Query resolver)
    user: ({ userId }) => {
      return users.find((user) => user.id === userId);
    },
  },
};
```

<hr />

**Example 2**

```js
# A library has a branch and books
type Library {
  branch: String!
  books: [Book!]
}

# A book has a title and author
type Book {
  title: String!
  author: Author!
}

# An author has a name
type Author {
  name: String!
}

type Query {
  libraries: [Library]
}
```

**Query.libraries() -> Library.books() -> Book.author() -> Author.name()**

```js
const { ApolloServer, gql } = require("apollo-server");

const libraries = [
  {
    branch: "downtown",
  },
  {
    branch: "riverside",
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "riverside",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    branch: "downtown",
  },
];

// Schema definition
const typeDefs = gql`
  # A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # An author has a name
  type Author {
    name: String!
  }

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library]
  }
`;

// Resolver map
const resolvers = {
  Query: {
    libraries() {
      // Return our hardcoded array of libraries
      return libraries;
    },
  },
  Library: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.
};
```

**parent**
The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).

For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.

### References:

- [Apollo Basics - Write query resolvers](https://www.apollographql.com/docs/tutorial/resolvers/)

- [Apollo Server - Resolvers - Resolver chains](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains)
