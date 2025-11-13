# 🔧 Diagnóstico de Errores de Autenticación WebSocket

## Error: "Authentication error"

Este error ocurre cuando el servidor no puede verificar tu token JWT. Sigue estos pasos para solucionarlo:

### Paso 1: Verificar JWT_SECRET en el Servidor

**Archivo: `server/.env`**

Asegúrate de tener UNA de estas variables:

```env
JWT_SECRET=tu_clave_secreta_aqui
# O
SECRET_KEY=tu_clave_secreta_aqui
```

**⚠️ IMPORTANTE:**
- La clave debe ser la MISMA que usas para generar tokens en tu servicio de autenticación
- Debe ser una cadena de texto segura (al menos 32 caracteres)
- NO debe tener espacios extras ni comillas

**Ejemplo de .env correcto:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/tripzy
JWT_SECRET=mi_clave_super_secreta_de_al_menos_32_caracteres_1234
```

### Paso 2: Verificar que el Token se Guarda Correctamente

**Abre DevTools (F12) → Console y ejecuta:**

```javascript
localStorage.getItem("token")
```

**Deberías ver algo como:**
```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ..."
```

**Si ves `null`:**
- No estás autenticado
- Cierra sesión e inicia sesión nuevamente

### Paso 3: Verificar que el Servicio de Auth usa el mismo SECRET

**Archivo: `server/src/services/auth.services.js` (o similar)**

Busca donde se genera el token JWT:

```javascript
// Debe usar el MISMO secret
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET || process.env.SECRET_KEY,  // ✅ Igual que en socket.js
  { expiresIn: '24h' }
);
```

### Paso 4: Reiniciar el Servidor

Después de modificar `.env`, DEBES reiniciar el servidor:

```bash
# Detén el servidor (Ctrl+C)
cd server
pnpm dev
```

### Paso 5: Cerrar Sesión y Volver a Iniciar Sesión

1. En el navegador, cierra sesión
2. Vuelve a iniciar sesión
3. El nuevo token usará el JWT_SECRET correcto

### Paso 6: Verificar los Logs del Servidor

Cuando intentes conectar Socket.IO, deberías ver en el servidor:

**✅ Correcto:**
```
✅ Token validado para usuario: 1
Usuario conectado: 1
```

**❌ Error:**
```
❌ Socket.IO: Error al verificar token: jwt malformed
```
o
```
❌ Socket.IO: Error al verificar token: invalid signature
```

### Paso 7: Verificar CORS y URL

**Cliente (`client/.env`):**
```env
VITE_BASE_SERVER_URL=http://localhost:3000
```

**⚠️ Verifica:**
- NO incluyas `/` al final
- Usa `http://` no `https://` (a menos que uses SSL)
- El puerto debe coincidir con el servidor (3000)

### Checklist de Diagnóstico

- [ ] `.env` del servidor tiene `JWT_SECRET` o `SECRET_KEY`
- [ ] Reinicié el servidor después de modificar `.env`
- [ ] El servicio de auth usa el mismo `JWT_SECRET`
- [ ] Cerré sesión e inicié sesión nuevamente
- [ ] `localStorage.getItem("token")` devuelve un token válido
- [ ] Los logs del servidor muestran "Token validado"
- [ ] `VITE_BASE_SERVER_URL` está configurado correctamente

## 🔍 Comandos de Diagnóstico

### En el Navegador (Console):

```javascript
// 1. Ver el token
console.log("Token:", localStorage.getItem("token"));

// 2. Ver la configuración
console.log("Server URL:", import.meta.env.VITE_BASE_SERVER_URL);

// 3. Decodificar el token (sin verificar)
const token = localStorage.getItem("token");
if (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  console.log("Token payload:", payload);
}
```

### En el Servidor (Terminal):

```bash
# Ver las variables de entorno
cd server
cat .env | grep SECRET

# Reiniciar el servidor con logs
pnpm dev
```

## 🚑 Solución Rápida

Si nada funciona, sigue estos pasos en orden:

1. **Crea/actualiza `server/.env`:**
   ```env
   JWT_SECRET=tripzy_secret_key_2024_super_secure
   ```

2. **Reinicia el servidor:**
   ```bash
   cd server
   pnpm dev
   ```

3. **En el navegador:**
   - Abre DevTools (F12)
   - Ve a Application → Local Storage
   - Elimina el item `token`
   - Recarga la página

4. **Inicia sesión nuevamente**

5. **Ve al chat y abre la consola**
   - Deberías ver: ✅ Conectado al servidor de Socket.IO

## 📞 ¿Aún no funciona?

Comparte estos logs:

**Del Servidor:**
```
[Copiar todo lo que aparece cuando intentas conectar]
```

**Del Navegador (Console):**
```
[Copiar los mensajes de error]
```

**Tu configuración:**
- ¿Tienes `JWT_SECRET` en `.env`?
- ¿El token existe en localStorage?
- ¿Reiniciaste el servidor después de cambiar `.env`?
