# Documentation for I love my friends app API

Endpoints:

GET /

Description: Root endpoint to show the server is running

GET /users

Description: Retrieves a complete list of all users from the database.

Response: Returns an array of user objects. If an error occurs during the database fetch, it catches and returns the error object.

POST /users

Description: Creates a new user in the database.

Request Body: Expects a JSON payload containing the new user's details matching the Prisma User schema.

Response: Returns the newly created user object (including any auto-generated fields like ID or timestamps). Returns an error object if the creation fails.

GET /users/:keyword

Description: Searches for and retrieves users based on a specific keyword.

Parameters:

keyword (URL Parameter): The string used to filter or search the users.

Response: Returns an array of user objects that match the search criteria.

POST /users/random3

Description: Retrieves exactly 3 random users from the database while excluding specific users from the selection pool. A POST method is used here instead of GET to accept an array of exceptions in the request body, which might otherwise exceed URL length limits if passed as query parameters.

Request Body:

exceptions (Optional, Array of strings): A list of identifiers (user IDs) to exclude from the random selection. Defaults to an empty array if not provided.

Response: Returns an array containing up to 3 random user objects.
