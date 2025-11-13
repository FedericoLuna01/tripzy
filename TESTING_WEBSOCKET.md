# 🧪 Pruebas de WebSocket en Tiempo Real

## Pasos para Probar el Chat en Tiempo Real

### 1. Verificar Variables de Entorno

**Cliente (`client/.env`):**
```env
VITE_BASE_SERVER_URL=http://localhost:3000
```

**Servidor (`server/.env`):**
```env
JWT_SECRET=tu_secret_key
```

### 2. Iniciar el Servidor

```bash
cd server
pnpm dev
```

**Verás en consola:**
- ✅ `El servidor esta corriendo en el puerto 3000`
- Los eventos de Socket.IO cuando se conecten usuarios

### 3. Iniciar el Cliente

```bash
cd client
pnpm dev
```

### 4. Abrir DevTools del Navegador

Abre las **DevTools** (F12) y ve a la pestaña **Console**

### 5. Probar con UN Usuario

1. Inicia sesión en el navegador
2. Entra a un viaje
3. Abre el chat
4. **En la consola deberías ver:**
   ```
   🔌 Conectando a Socket.IO... http://localhost:3000
   ✅ Conectado al servidor de Socket.IO <socket-id>
   🔌 Socket conectado, uniéndose al viaje: <trip-id>
   ```

5. **En el servidor deberías ver:**
   ```
   Usuario conectado: <user-id>
   Usuario <user-id> se unió al trip <trip-id>
   ```

6. **Envía un mensaje**
   - Deberías ver el mensaje INMEDIATAMENTE (Optimistic UI)
   - En la consola del navegador:
     ```
     ✅ Mensaje enviado: {...}
     📩 Nuevo mensaje recibido: {...}
     ```
   - En el servidor:
     ```
     💬 Nuevo mensaje creado: <message-id>
     🔌 Socket.IO disponible, emitiendo mensaje...
     📤 Emitiendo nuevo mensaje al trip-<trip-id>: <message-id>
     ✅ Mensaje emitido a la sala trip-<trip-id>
     ```

### 6. Probar con DOS Usuarios (Tiempo Real)

1. **Abre DOS ventanas del navegador** (o usa modo incógnito para la segunda)
2. Inicia sesión con **usuarios diferentes** en cada ventana
3. Entra al **mismo viaje** en ambas ventanas
4. Abre el chat en ambas ventanas

**Prueba 1: Mensajes en Tiempo Real**
- Escribe un mensaje en la **Ventana 1**
- El mensaje debe aparecer INSTANTÁNEAMENTE en la **Ventana 2** 🎉
- Y viceversa

**Prueba 2: Indicador de Escritura**
- Comienza a escribir en la **Ventana 1**
- En la **Ventana 2** deberías ver: "Usuario está escribiendo..."
- Deja de escribir por 2 segundos
- El indicador desaparece automáticamente

**Prueba 3: Eliminación en Tiempo Real**
- Elimina un mensaje en la **Ventana 1**
- El mensaje desaparece INSTANTÁNEAMENTE en la **Ventana 2**

## 🐛 Solución de Problemas

### Problema 1: No se conecta Socket.IO

**Síntoma:** En consola ves: `❌ Error de conexión Socket.IO:`

**Soluciones:**
1. Verifica que el servidor esté corriendo en el puerto 3000
2. Verifica `VITE_BASE_SERVER_URL` en `.env`
3. Reinicia el servidor y cliente
4. Limpia caché: `rm -rf client/node_modules/.vite && cd client && pnpm dev`

### Problema 2: Mensajes no aparecen en tiempo real

**Síntoma:** El mensaje aparece en tu ventana pero no en la otra

**Soluciones:**
1. Verifica en la consola del servidor que se emite el mensaje:
   - Debes ver: `📤 Emitiendo nuevo mensaje al trip-<id>`
2. Verifica que ambos usuarios estén en el mismo viaje
3. Verifica en la consola del navegador que recibes: `📩 Nuevo mensaje recibido`
4. Asegúrate de que el token JWT sea válido

### Problema 3: Token inválido

**Síntoma:** `❌ Error de conexión Socket.IO: Authentication error`

**Soluciones:**
1. Cierra sesión y vuelve a iniciar sesión
2. Verifica que `JWT_SECRET` sea el mismo en servidor
3. Verifica que el token se esté guardando: `localStorage.getItem("token")`

### Problema 4: Socket se desconecta constantemente

**Síntoma:** Ves repetidamente: `🔌 Desconectado del servidor de Socket.IO`

**Soluciones:**
1. Verifica que el servidor esté estable
2. Revisa los logs del servidor para errores
3. Aumenta `reconnectionAttempts` en `useSocket.jsx`

## 📊 Checklist de Funcionalidad

- [ ] Socket.IO se conecta correctamente
- [ ] El usuario se une a la sala del viaje
- [ ] Los mensajes se envían correctamente
- [ ] Los mensajes aparecen INMEDIATAMENTE para el emisor (Optimistic UI)
- [ ] Los mensajes aparecen EN TIEMPO REAL para otros usuarios
- [ ] El indicador de escritura funciona
- [ ] La eliminación de mensajes funciona en tiempo real
- [ ] Los logs muestran todos los eventos correctamente

## 🎯 Comportamiento Esperado

### Al Enviar un Mensaje:
1. **Tu ventana (Optimistic UI):**
   - ⚡ Mensaje aparece INSTANTÁNEAMENTE
   - 📡 Se envía al servidor en background
   - ✅ Se confirma cuando llega del servidor

2. **Otras ventanas (Tiempo Real):**
   - 📩 Reciben el mensaje vía Socket.IO
   - ⚡ Se muestra INSTANTÁNEAMENTE
   - 🔄 Sin necesidad de recargar

### Al Escribir:
1. **Tu ventana:**
   - ✍️ Emites evento `typing` cada vez que escribes
   - ⏱️ Auto-stop después de 2 segundos

2. **Otras ventanas:**
   - 👀 Ven "Usuario está escribiendo..."
   - ⏱️ Desaparece cuando dejas de escribir

## 🚀 ¡Éxito!

Si todos los pasos funcionan correctamente, tu chat está funcionando en **TIEMPO REAL** 🎉

Los usuarios pueden comunicarse instantáneamente sin recargar la página.
