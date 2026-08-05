##must visit requirment.txt file

# Student CRUD API

This is a beginner-friendly CRUD operation with Node.js, Express, and MySQL. It shows how to create, read, update, and delete student records from a database.

## What this project does

- Connects a Node.js app to MySQL
- Creates a `students` table
- Adds new student records
- Reads all students or one student by ID
- Updates student data
- Deletes student data


## What this project does

- Connects a Node.js app to MySQL
- Creates a `students` table
- Adds new student records
- Reads all students or one student by ID
- Updates student data
- Deletes student data



- `app.js`: starts the server and connects the routes
- `config/db.js`: connects to MySQL and creates the database if needed
- `routes/stdroutes.js`: defines the API endpoints
- `controllers/stdcontrollers.js`: contains the SQL logic
- `requirements.txt`: lists the packages and system requirements

## Requirements
check requirment.txt file

## Environment setup

Create a `.env` file in the project root:


PORT=8000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=All_data
MYSQL_PORT=3306
```

Replace `your_mysql_password` with your real MySQL password.

## Install and run

Install dependencies:


npm install


Run the project in development mode:


npm run dev


Or run it normally:


npm start


The server usually runs on `http://localhost:8000`.

## API endpoints

Base path: `/students`

### 1. Create table

- Method: `POST`
- Endpoint: `/students/table`

Postman example:OR thunderclient(vscode extension)

1. Open Postman.
2. Select `POST`.
3. Paste this URL: `http://localhost:8000/students/table`.
4. Click `Send`.
5. You should get a success message that the table was created.

### 2. Get all students

- Method: `GET`
- Endpoint: `/students`

Postman example:

1. Open a new tab in Postman.
2. Select `GET`.
3. Use this URL: `http://localhost:8000/students`.
4. Click `Send`.
5. You will see all student records in JSON format.

### 3. Get one student by ID

- Method: `GET`
- Endpoint: `/students/:id`

Postman example:

1. Select `GET`.
2. Use this URL: `http://localhost:8000/students/1`.
3. Click `Send`.
4. Replace `1` with the student ID you want to search.

### 4. Add a student

- Method: `POST`
- Endpoint: `/students`

Postman example:

1. Select `POST`.
2. Use this URL: `http://localhost:8000/students`.
3. Go to the `Body` tab.
4. Choose `raw` and select `JSON`.
5. Add this JSON:

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

6. Click `Send`.

### 5. Update a student

- Method: `PUT`
- Endpoint: `/students/:id`

Postman example:

1. Select `PUT`.
2. Use this URL: `http://localhost:8000/students/1`.
3. Go to the `Body` tab.
4. Choose `raw` and select `JSON`.
5. Add this JSON:

```json
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com"
}
```

6. Click `Send`.

### 6. Delete a student

- Method: `DELETE`
- Endpoint: `/students/:id`

Postman example:

1. Select `DELETE`.
2. Use this URL: `http://localhost:8000/students/1`.
3. Click `Send`.

## How it works

1. `app.js` starts the server.
2. `config/db.js` connects to MySQL.
3. `routes/stdroutes.js` sends requests to the right controller.
4. `controllers/stdcontrollers.js` runs SQL queries and returns JSON responses.

## Why this project is useful for your CV

- It shows backend development skills.
- It shows database handling with MySQL.
- It shows how to build and test a REST API.
- It is simple enough for a beginner to understand.

## Notes

- Do not put real passwords in git.
- Use `.env` for database settings.
- For a better CV project later, you can add validation, authentication, tests, and Docker.

## Troubleshooting

- If the server does not start, check that MySQL is running.
- Check the values in your `.env` file.
- Make sure you created the database credentials correctly.

If you want, I can also make this README even simpler or create a Postman collection file for you.
