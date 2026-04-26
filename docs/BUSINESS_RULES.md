# Business Rules

## Alcance
Este documento refleja el estado actual del codigo en `src/` y `prisma/schema.prisma`.
Incluye reglas implementadas, parciales y pendientes.

## Reglas globales
- Toda ruta requiere JWT salvo endpoints con decorador `Public`.
- Los roles se validan con `RolesGuard` y comparan `tipoUsuario` del JWT.
- Validaciones de DTO se aplican globalmente con `ValidationPipe` (`whitelist: true`, `transform: true`).

## Usuario
### Implementadas
- El email es unico en base de datos (`Usuario.email` con unique).
- `signup` falla si el email ya existe.
- Solo `Administrador` puede crear instructores (`POST /users/instructor`).
- En login se validan credenciales (email + contrasena).
- La contrasena se hashea al registrarse y al actualizarse.

### Pendientes o no implementadas
- No existe campo de usuario inactivo/activo, por lo tanto no se puede aplicar la regla "usuario inactivo no puede iniciar sesion".

## Membresia
### Implementadas
- Al asignar membresia, `fechaVencimiento = fechaInicio + duracionDias` del tipo de membresia.
- Si el socio ya tiene membresia `Activa`, la nueva inicia en la fecha de vencimiento de la activa (encadenamiento).
- Si una membresia activa esta vencida (`fechaVencimiento < hoy`), se actualiza a `Expirada` antes de consultar activa.
- La creacion de membresia por flujo de pago ocurre al webhook `checkout.session.completed` de Stripe.

### Parciales
- Regla "un socio solo puede tener una membresia activa": se controla por logica de negocio, pero no hay constraint unico en BD para forzarlo.

### Pendientes o no implementadas
- No existe flujo de cancelacion de membresia con validacion de pagos pendientes.

## TipoMembresia
### Implementadas
- Debe existir el tipo de membresia para crear una sesion de pago.

### Pendientes o no implementadas
- No existe campo `activo` en `TipoMembresia`.
- No hay validacion explicita de `precio > 0` y `duracionDias > 0` en DTO/servicio.

## Pago
### Implementadas
- `stripePaymentId` es unico en BD.
- El registro de pago se persiste como `Completado` luego del webhook exitoso.
- Si falla firma de webhook o metadata, se corta el proceso.
- Si el pago no llega a `checkout.session.completed`, no se ejecuta alta de membresia ni registro de pago en este flujo.

### Parciales
- "Un pago completado no puede modificarse" se cumple de forma indirecta porque no hay endpoint de update de pago.

## Clase
### Implementadas
- Solo `Administrador` crea, actualiza y elimina clases.
- Solo `Administrador` e `Instructor` listan clases (`GET /`).
- `cupo` y `duracionMinutos` deben ser >= 1 por validacion DTO.
- `idInstructor` debe pertenecer a un usuario de tipo `Instructor` para crear clase.

### Pendientes o no implementadas
- No hay constraint para "un instructor solo puede tener una clase por dia y horario".
- No existe campo `attended` en `Reserva`.
- No existe regla de "solo instructor asignado marca attended" por falta de funcionalidad.

## Reserva
### Implementadas
- Solo `Socio` puede crear/cancelar/listar sus reservas.
- Solo `Administrador` o `Instructor` pueden listar reservas por clase.
- Un socio debe tener membresia activa para reservar.
- No se permite superar cupo: si reservas activas para esa clase/fecha >= cupo, se rechaza.
- Al "cancelar" se cambia estado a `Cancelada` (cancelacion logica).
- Restriccion unica en BD: `@@unique([idSocio, idClase, fechaReserva])`.

### Pendientes o no implementadas
- No se valida `clase.activa` al reservar.
- No se valida "no cancelar si la clase ya ocurrio".
- No existe estado `CONFIRMED`; el enum actual es `Reservada | Cancelada`.
- No se valida choque de horario para un mismo socio en clases distintas del mismo dia/horario.

## Observaciones tecnicas relevantes
- En el estado actual hay inconsistencias de inyeccion de dependencias en algunos modulos que pueden impedir ejecutar ciertos flujos en runtime hasta corregirse.
