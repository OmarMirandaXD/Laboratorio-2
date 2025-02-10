# 📌 API Endpoints Documentation

## 📂 Colección de Postman
Para facilitar las pruebas de los endpoints, puedes importar la siguiente colección en Postman. 

📥 **Descargar la colección:** [API_Endpoints_Collection.json](configs/API_Endpoints_Collection.json.)

### 📌 ¿Cómo importar la colección en Postman?
1. Descarga el archivo JSON desde el enlace.
2. Abre Postman y haz clic en **Importar**.
3. Selecciona el archivo JSON y cárgalo en Postman.
4. ¡Listo! Ahora puedes probar los endpoints con facilidad.

---

## 🔐 LOGIN
### ➤ POST /v1/auth/login  
📌 **Body:**  
```json
{
  "email": "string",
  "password": "string"
}
```

---
## 👨‍🎓 STUDENTS
### ➤ POST /v1/auth/register  
📌 **Body:**  
```json
{
  "name": "Nombre",
  "surname": "Apellido",
  "email": "email@example.com",
  "password": "Contraseña123!",
  "phone": "12345678",
  "role": "STUDENT_ROLE"
}
```

### ➤ POST /v1/student/assignClass/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  
📌 **Body:**  
```json
{
  "classId": "string"
}
```

### ➤ GET /v1/student/findStudent/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  

### ➤ GET /v1/student/  

### ➤ GET /v1/student/assignedClasses/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  

### ➤ PATCH /v1/student/updatePassword/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  
📌 **Body:**  
```json
{
  "newPassword": "string"
}
```

### ➤ PUT /v1/student/updateStudent/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  
📌 **Body:**  
```json
{
  "name": "string",
  "email": "string",
  "age": "number",
  "class": "string"
}
```

### ➤ DELETE /v1/student/deleteStudent/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del estudiante)  

---
## 👨‍🏫 TEACHERS
### ➤ POST /v1/auth/register  
📌 **Body:**  
```json
{
  "name": "Nombre del profesor",
  "surname": "Apellido del profesor",
  "email": "email@example.com",
  "password": "Contraseña123!",
  "asignature": "Asignatura",
  "role": "TEACHER_ROLE"
}
```

### ➤ POST /v1/teacher/assignClass/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  
📌 **Body:**  
```json
{
  "classId": "string"
}
```

### ➤ GET /v1/teacher/findTeacher/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  

### ➤ GET /v1/teacher/  

### ➤ GET /v1/teacher/assignedClasses/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  

### ➤ PATCH /v1/teacher/updatePassword/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  
📌 **Body:**  
```json
{
  "newPassword": "string"
}
```

### ➤ PUT /v1/teacher/updateTeacher/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  
📌 **Body:**  
```json
{
  "name": "string",
  "email": "string",
  "age": "number",
  "subject": "string"
}
```

### ➤ DELETE /v1/teacher/deleteTeacher/:uid  
📌 **Parámetros:**  
- `uid`: string (ID del profesor)  

---
## 🏫 CLASSES
### ➤ POST /v1/class/createClass  
📌 **Body:**  
```json
{
  "className": "Mate",
  "teacher": "67a9450a5a6075f422d88dbb",
  "schedule": "Horario de la clase"
}
```

### ➤ GET /v1/class/findClass/:classId  
📌 **Parámetros:**  
- `classId`: string (ID de la clase)  

### ➤ GET /v1/class/  

### ➤ GET /v1/class/assignedStudents/:classId  
📌 **Parámetros:**  
- `classId`: string (ID de la clase)  

### ➤ PATCH /v1/class/updateClass/:classId  
📌 **Parámetros:**  
- `classId`: string (ID de la clase)  
📌 **Body:**  
```json
{
  "name": "string",
  "description": "string",
  "teacherId": "string"
}
```

### ➤ DELETE /v1/class/deleteClass/:classId  
📌 **Parámetros:**  
- `classId`: string (ID de la clase)

