# Task Manager API

This is a project that allows for the management of maintenance tasks, it allows for adding, updating, retrieving and deleting of said tasks

## Local Setup

1. Open a terminal in the root of the project
2. Install the dependencies by running `npm i`
3. Set up the `.env` file with the correct values (the template can be found on `.env.dist`)
4. Be sure to migrate and seed the data in your database by running:
		`npx knex migrate:latest`
		`npx knex seed:run`
5. Run the application by running the command `npm run start:dev`

## Docker Setup
1. Open a terminal in the root of the project
2. Run the command `docker-compose up --build`
3. Be sure to migrate and seed the database by oppening the container shell of the container `task-manager-api` and running the commands
		 `npm run docker:migrate`
		`npm run docker:seed`


## Postman
To help you test the application on your own, you can find a Postman file in the folder `documentation/postman`