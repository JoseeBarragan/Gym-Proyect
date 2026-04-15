# Business Rules

## Usuario
- El email debe ser único en el sistema
- Un usuario inactivo no puede iniciar sesión
- Solo el administrador puede crear instructores

## Membresía
- Un socio solo puede tener una membresía con estado ACTIVE a la vez
- La fechaVencimiento = fechaInicio + duracionDias del TipoMembresia
- Una membresía solo se activa si el pago asociado tiene estado COMPLETED
- Si la fechaVencimiento es anterior a la fecha actual, el estado pasa a EXPIRED
- No se puede cancelar una membresía con pagos pendientes

## TipoMembresia
- Un TipoMembresia inactivo no puede usarse para crear nuevas membresías
- El precio y duracionDias deben ser mayores a 0

## Pago
- El stripePaymentId debe ser único
- Un pago en estado COMPLETED no puede modificarse
- Si el pago falla, la membresía no se crea

## Clase
- Una clase inactiva no acepta nuevas reservas
- El cupoMaximo debe ser mayor a 0
- Un instructor solo puede tener una clase por día y horario
- Solo el administrador puede crear y modificar clases
- Solo el instructor asignado puede marcar attended en las reservas de su clase

## Reserva
- Un socio solo puede reservar si tiene membresía ACTIVE
- Un socio no puede tener dos reservas para la misma clase
- No se puede reservar una clase inactiva
- El cupo no puede superarse: `reservas CONFIRMED >= cupoMaximo` bloquea nuevas reservas
- Solo se puede cancelar una reserva si la clase no ocurrió todavía
- `attended` solo puede ser true si el estado es CONFIRMED
- Al cancelar una reserva, el cupo se libera
- Un socio no puede reservar una clase si ya tiene una reserva CONFIRMED en el mismo día y horario
