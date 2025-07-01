# Sistema de Gestión Veterinaria 🐶🐱

**Autor:** Claudio Masa

Este es un proyecto de backend desarrollado en **Node.js + Express + MySQL**, orientado a la gestión de pacientes (mascotas), sus familias responsables y consultas veterinarias.

---

## 🔧 Tecnologías utilizadas

* Node.js
* Express
* MySQL
* Express-validator (para validaciones de entrada)

---

## 📊 Estructura del proyecto

```bash
/config
  db.mysql.js             # Conexión a la base de datos MySQL

/services
  familias.service.js     # Lógica de negocio para "familias" (dueños)
  mascotas.service.js     # Lógica de negocio para "mascotas"
  consultas.service.js    # Lógica para consultas veterinarias

/controllers
  familias.controller.js
  mascotas.controller.js
  consultas.controller.js

/routes
  familias.routes.js
  mascotas.routes.js
  consultas.routes.js

/middlewares
  handleValidation.js     # Captura errores de validación
  familiasValidator.js    # Validaciones para "familias"
  mascotasValidator.js    # Validaciones para "mascotas"
  consultasValidator.js   # Validaciones para "consultas"
```

---

## 📝 Inicialización de la base de datos

El proyecto incluye un archivo llamado **`init.sql`**, el cual permite generar todas las tablas necesarias y poblar la base de datos con datos iniciales.

> ⬆️ Ejecutar este archivo en cualquier instancia local de MySQL para comenzar a trabajar con el sistema.

---

## 📂 Endpoints por entidad (usables con Thunder Client)

### 👥 Familias (Dueños)

#### Obtener todas las familias

```
GET http://localhost:3000/familias
```

#### Buscar familias por nombre/apellido

```
GET http://localhost:3000/familias/buscar/Perez
```

#### Obtener familia por ID

```
GET http://localhost:3000/familias/1
```

#### Crear nueva familia

```
POST http://localhost:3000/familias
```

```json
{
  "nombre": "Carlos",
  "apellido": "Gomez",
  "telefono": "1122334455",
  "direccion": "Calle Falsa 123",
  "email": "carlos@email.com"
}
```

#### Editar familia existente

```
PUT http://localhost:3000/familias/1
```

#### Marcar familia como inactiva

```
PUT http://localhost:3000/familias/inactivar/1
```

```json
{
  "inactivo": 1
}
```

#### Eliminar familia (físicamente)

```
DELETE http://localhost:3000/familias/1
```

---

### 🐾 Mascotas

#### Obtener todas las mascotas

```
GET http://localhost:3000/mascotas
```

#### Buscar por nombre de mascota o familia

```
GET http://localhost:3000/mascotas/buscar/luna
```

#### Obtener mascota por ID

```
GET http://localhost:3000/mascotas/1
```

#### Crear nueva mascota

```
POST http://localhost:3000/mascotas
```

```json
{
  "nombre": "Luna",
  "especie": "perro",
  "raza": "Labrador",
  "edad": 4,
  "peso": 25.5,
  "id_dueno": 1
}
```

#### Editar mascota

```
PUT http://localhost:3000/mascotas/1
```

#### Eliminar mascota

```
DELETE http://localhost:3000/mascotas/1
```

---

### ⚕️ Consultas

#### Obtener consulta por ID

```
GET http://localhost:3000/consultas/1
```

#### Obtener consultas por mascota

```
GET http://localhost:3000/consultas/mascota/1
```

#### Crear nueva consulta

```
POST http://localhost:3000/consultas
```

```json
{
  "id_mascota": 1,
  "motivo": "Control anual",
  "notas": "Todo en orden"
}
```

#### Editar consulta

```
PUT http://localhost:3000/consultas
```

#### Eliminar consulta

```
DELETE http://localhost:3000/consultas/1
```

---

## 💡 Notas adicionales

* Se implementan validaciones exhaustivas con **express-validator**.
* Se controla que `id_dueno` y `id_mascota` existan antes de insertar.
* Se usan campos como `fecha_creacion` y `fecha_actualizacion` para trazabilidad de datos.
* Todas las rutas siguen un estilo RESTful limpio y modular.

---

## ℹ️ Disclaimer

Por el momento no he llegado a agregar JWT, ni la validación de usuarios. Para realizar este proyecto, tuve algunas conversaciones con la recepcionista de una clínica veterinaria amiga.
Ella me dijo que no sería tan necesario sumar validaciones por usuarios, etc, porque lo estarían utilizando localmente. De todos modos, mi intensión es agregarlo para entender como funciona y ponerlo en práctica.
Espero poder tenerlo listo para una próxima entrega.
