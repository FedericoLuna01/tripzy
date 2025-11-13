# 🚀 Solución Rápida: Authentication Error

## ✅ Problema Identificado

Tu servidor usa `SECRET_KEY` en lugar de `JWT_SECRET`. Ya he actualizado el código de Socket.IO para aceptar ambos.

## 📝 Pasos para Solucionar (5 minutos)

### 1️⃣ Verifica tu archivo `.env` del servidor

**Ubicación:** `server/.env`

Debe contener:
```env
SECRET_KEY=tu_clave_secreta_aqui
```

**Si no existe el archivo `.env`:**

```bash
cd server
cp .env.example .env
```

Luego edita `server/.env` y agrega:
```env
DATABASE_URL=postgresql://tu_conexion_aqui
SECRET_KEY=tripzy_secret_key_2024_super_secure_change_this
```

### 2️⃣ Reinicia el Servidor

**⚠️ MUY IMPORTANTE:** Después de modificar `.env`, DEBES reiniciar:

```bash
# Presiona Ctrl+C para detener el servidor
# Luego:
cd server
pnpm dev
```

**Deberías ver:**
```
El servidor esta corriendo en el puerto 3000
```

### 3️⃣ Limpia el Token Antiguo y Vuelve a Iniciar Sesión

**En el navegador:**

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Application** (o Storage)
3. En el menú izquierdo: **Local Storage** → `http://localhost:5173`
4. Encuentra el item `token` y **elimínalo** (clic derecho → Delete)
5. **Recarga la página** (F5)
6. **Inicia sesión nuevamente**

### 4️⃣ Verifica la Conexión

1. Después de iniciar sesión, ve a un viaje
2. Abre el chat
3. Abre **DevTools** (F12) → **Console**

**Deberías ver:**
```
🔌 Conectando a Socket.IO...
   📍 URL: http://localhost:3000
   🔑 Token: eyJhbGciOiJIUzI1NiIs...
✅ Conectado al servidor de Socket.IO
   🆔 Socket ID: abc123xyz
🔌 Socket conectado, uniéndose al viaje: 5
```

**En el servidor deberías ver:**
```
✅ Token validado para usuario: 1
Usuario conectado: 1
Usuario 1 se unió al trip 5
```

### 5️⃣ Prueba el Chat

- Escribe un mensaje
- Debería aparecer **INMEDIATAMENTE** ⚡

## 🎯 Checklist Rápido

```bash
✅ Paso 1: Verificar que existe server/.env con SECRET_KEY
✅ Paso 2: Reiniciar el servidor (Ctrl+C → pnpm dev)
✅ Paso 3: Eliminar token de localStorage
✅ Paso 4: Iniciar sesión nuevamente
✅ Paso 5: Abrir chat y verificar consola
```

## 🔍 Si Aún No Funciona

### Verifica el Token en la Consola del Navegador:

```javascript
// Pega esto en la consola
const token = localStorage.getItem("token");
console.log("Token existe:", !!token);
console.log("Token:", token?.substring(0, 50) + "...");
```

**Si es `null`:**
- Inicia sesión nuevamente

**Si existe pero falla:**
- Reinicia el servidor
- Elimina el token de localStorage
- Inicia sesión nuevamente

### Verifica el Servidor:

```bash
# En la terminal del servidor
cd server
cat .env | grep SECRET_KEY
```

Debería mostrar:
```
SECRET_KEY=algo_aqui
```

## 💡 ¿Por Qué Pasa Esto?

1. El servidor genera tokens JWT usando `SECRET_KEY`
2. Socket.IO debe usar la MISMA clave para verificarlos
3. Si el `.env` cambia, los tokens antiguos ya no son válidos
4. Solución: Reiniciar servidor + Nuevo login = Nuevo token válido

## 🎉 Una Vez Funcionando

Deberías ver en la consola del navegador:
- ✅ Conectado al servidor de Socket.IO
- 🔌 Socket conectado, uniéndose al viaje
- ✅ Mensaje enviado (cuando envías mensajes)
- 📩 Nuevo mensaje recibido (cuando recibes mensajes)

Y en el servidor:
- ✅ Token validado para usuario: X
- Usuario X conectado
- Usuario X se unió al trip Y
- 💬 Nuevo mensaje creado
- 📤 Emitiendo nuevo mensaje

## 🆘 ¿Necesitas Más Ayuda?

Si después de seguir estos pasos aún tienes problemas, comparte:

1. **El contenido de `server/.env`** (sin mostrar contraseñas):
   ```bash
   cd server
   cat .env | grep -v DATABASE_URL
   ```

2. **Los logs del servidor** (cuando intentas conectar)

3. **Los logs del navegador** (consola cuando abres el chat)
