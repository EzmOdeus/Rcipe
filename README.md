# Calories Tracker API

A Node.js API for tracking calories, food intake, and user goals. The application includes user authentication, food management, calorie tracking, and statistics visualization.

## Features
- User registration and login (with Google OAuth support).
- JWT-based authentication and route protection.
- Manage daily food entries (add, view, delete).
- Set and retrieve calorie goals.
- Weekly statistics for calorie consumption.
- Secure RESTful API endpoints.

---

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB Atlas or local MongoDB setup

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calories-tracker-api.git
   cd calories-tracker-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## API Documentation

### Base URL
- Development: `http://localhost:5000`

### Authentication
All protected routes require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

### Routes

#### User Routes (`/api/users`)
| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| POST   | `/register`      | Register a new user      | No   |
| POST   | `/login`         | Login user               | No   |
| GET    | `/profile`       | Retrieve user profile    | Yes  |

#### Food Routes (`/api/food`)
| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| POST   | `/add`           | Add a new food entry     | Yes  |
| GET    | `/daily`         | Retrieve daily food list | Yes  |
| DELETE | `/:id`           | Delete a food entry      | Yes  |

#### Goal Routes (`/api/goals`)
| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| POST   | `/set`           | Set calorie goal         | Yes  |
| GET    | `/`              | Retrieve calorie goal    | Yes  |

#### Statistics Routes (`/api/stats`)
| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| GET    | `/weekly`        | Weekly calorie stats     | Yes  |

---

## Development

### File Structure
```
calories-tracker-api/
|-- src/
|   |-- config/         # Configuration files (DB, OAuth, etc.)
|   |-- controllers/    # Route controllers
|   |-- models/         # Mongoose models
|   |-- routes/         # API route handlers
|   |-- middlewares/    # Authentication & other middlewares
|   |-- app.js          # App initialization
|   |-- server.js       # Server entry point
|-- .env.example         # Environment variable template
|-- package.json         # Dependencies and scripts
|-- README.md            # Project documentation
```

### Scripts
- Start development server:
  ```bash
  npm start
  ```
- Run in development mode with auto-reload:
  ```bash
  npm run dev
  ```

---

## Testing
1. Use **Postman** or any API client to test endpoints.
2. Import the provided `postman_collection.json` file for ready-to-use API documentation.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## Contact
For any inquiries or suggestions, feel free to reach out to:
- Email: ezmodeus@gmail.com
- phone : +201091511313
- GitHub: [EzmOdeus](https://github.com/EzmOdeus)
