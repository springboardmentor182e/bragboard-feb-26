# Employee Management API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Get All Employees (with pagination, search, filter)

**GET** `/admin/employees`

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `page_size` (int, default: 10, max: 100) - Items per page
- `department` (string, optional) - Filter by department
- `search` (string, optional) - Search by name or email

**Example Request:**
```bash
curl -X GET "http://localhost:8000/admin/employees?page=1&page_size=10&department=Engineering&search=john" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response (200 OK):**
```json
{
  "total": 45,
  "page": 1,
  "page_size": 10,
  "employees": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@company.com",
      "department": "Engineering",
      "role": "employee",
      "is_active": true,
      "joined_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@company.com",
      "department": "Engineering",
      "role": "admin",
      "is_active": true,
      "joined_at": "2024-01-20T14:20:00Z"
    }
  ]
}
```

---

### 2. Get Single Employee

**GET** `/admin/employees/{employee_id}`

**Example Request:**
```bash
curl -X GET "http://localhost:8000/admin/employees/1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@company.com",
  "department": "Engineering",
  "role": "employee",
  "is_active": true,
  "joined_at": "2024-01-15T10:30:00Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "detail": "Employee not found"
}
```

---

### 3. Create New Employee

**POST** `/admin/employees`

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "password": "securepass123",
  "department": "Marketing",
  "role": "employee"
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:8000/admin/employees" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "password": "securepass123",
    "department": "Marketing",
    "role": "employee"
  }'
```

**Example Response (201 Created):**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "department": "Marketing",
  "role": "employee",
  "is_active": true,
  "joined_at": "2024-02-26T09:15:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "detail": "Email already registered"
}
```

---

### 4. Update Employee

**PUT** `/admin/employees/{employee_id}`

**Request Body (all fields optional):**
```json
{
  "name": "Alice Johnson Updated",
  "email": "alice.new@company.com",
  "department": "Sales",
  "role": "admin",
  "is_active": false
}
```

**Example Request:**
```bash
curl -X PUT "http://localhost:8000/admin/employees/3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson Updated",
    "department": "Sales"
  }'
```

**Example Response (200 OK):**
```json
{
  "id": 3,
  "name": "Alice Johnson Updated",
  "email": "alice@company.com",
  "department": "Sales",
  "role": "employee",
  "is_active": true,
  "joined_at": "2024-02-26T09:15:00Z"
}
```

---

### 5. Delete Employee

**DELETE** `/admin/employees/{employee_id}`

**Example Request:**
```bash
curl -X DELETE "http://localhost:8000/admin/employees/3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response (200 OK):**
```json
{
  "message": "Employee deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "detail": "Employee not found"
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "detail": "Admin access required"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## Field Validations

### Employee Creation
- `name`: Required, 1-100 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters
- `department`: Optional, string
- `role`: Optional, enum ("employee" or "admin"), default: "employee"

### Employee Update
- All fields optional
- `email`: Must be unique if changed
- Password hashing handled automatically

---

## Usage Examples

### JavaScript/Axios
```javascript
import axios from 'axios';

const token = localStorage.getItem('token');

// Get employees
const response = await axios.get('http://localhost:8000/admin/employees', {
  params: { page: 1, page_size: 10, search: 'john' },
  headers: { Authorization: `Bearer ${token}` }
});

// Create employee
await axios.post('http://localhost:8000/admin/employees', {
  name: 'New Employee',
  email: 'new@company.com',
  password: 'password123',
  department: 'HR',
  role: 'employee'
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Python/Requests
```python
import requests

token = "your_jwt_token"
headers = {"Authorization": f"Bearer {token}"}

# Get employees
response = requests.get(
    "http://localhost:8000/admin/employees",
    params={"page": 1, "page_size": 10},
    headers=headers
)

# Create employee
response = requests.post(
    "http://localhost:8000/admin/employees",
    json={
        "name": "New Employee",
        "email": "new@company.com",
        "password": "password123",
        "department": "HR",
        "role": "employee"
    },
    headers=headers
)
```
