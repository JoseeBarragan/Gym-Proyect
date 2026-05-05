import { useInstructorClasses, useClassReservations } from '../features/useInstructor';
import { 
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import '../instructor.css';

export function InstructorHistoryPage() {
  const { data: clases } = useInstructorClasses();
  
  if (!clases || clases.length === 0) {
    return (
      <div>
        <div className="instructor-page-header">
          <h1 className="instructor-page-title">Historial de Asistencia</h1>
          <p className="instructor-page-subtitle">Revisa el historial de asistencia de todas tus clases</p>
        </div>
        <div className="instructor-empty-state">
          <User size={48} className="instructor-empty-state-icon" />
          <p className="instructor-empty-state-text">No hay clases registradas</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="instructor-page-header">
        <h1 className="instructor-page-title">Historial de Asistencia</h1>
        <p className="instructor-page-subtitle">Revisa el historial de asistencia de todas tus clases</p>
      </div>

      {clases.map((clase) => (
        <ClassHistoryRow key={clase.idClase} clase={clase} />
      ))}
    </div>
  );
}

function ClassHistoryRow({ clase }: { clase: any }) {
  const { data: reservations } = useClassReservations(clase.idClase);

  const present = reservations?.filter(r => r.asistencia === true).length || 0;
  const absent = reservations?.filter(r => r.asistencia === false).length || 0;
  const total = reservations?.length || 0;
  const rate = total > 0 ? ((present / total) * 100).toFixed(0) : '0';

  return (
    <div className="instructor-class-card" style={{ marginBottom: '1.5rem' }}>
      <div className="instructor-class-card-header">
        <h3 className="instructor-class-name">{clase.nombre}</h3>
        <span className={`instructor-class-status ${clase.activa ? 'instructor-class-status-active' : 'instructor-class-status-inactive'}`}>
          {clase.activa ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      {reservations && reservations.length > 0 ? (
        <div className="instructor-table-container">
          <table className="instructor-history-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Fecha Reserva</th>
                <th>Estado Reserva</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.idReserva}>
                  <td>{reservation.Usuario?.nombre} {reservation.Usuario?.apellido}</td>
                  <td>{new Date(reservation.fechaReserva).toLocaleDateString('es-ES')}</td>
                  <td>
                    <span className={`instructor-attendance-badge ${
                      reservation.estadoReserva === 'Reservada' ? 'present' : 'absent'
                    }`}>
                      {reservation.estadoReserva}
                    </span>
                  </td>
                  <td>
                    {reservation.asistencia !== null ? (
                      <span className={`instructor-attendance-badge ${
                        reservation.asistencia ? 'present' : 'absent'
                      }`}>
                        {reservation.asistencia ? (
                          <>
                            <CheckCircle size={14} /> Presente
                          </>
                        ) : (
                          <>
                            <XCircle size={14} /> Ausente
                          </>
                        )}
                      </span>
                    ) : (
                      <span style={{ color: '#64748b' }}>Sin marcar</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '1rem', display: 'flex', gap: '2rem' }}>
            <div className="instructor-stat-item">
              <span className="instructor-stat-label">Total</span>
              <span className="instructor-stat-value">{total}</span>
            </div>
            <div className="instructor-stat-item">
              <span className="instructor-stat-label">Presentes</span>
              <span className="instructor-stat-value success">{present}</span>
            </div>
            <div className="instructor-stat-item">
              <span className="instructor-stat-label">Ausentes</span>
              <span className="instructor-stat-value danger">{absent}</span>
            </div>
            <div className="instructor-stat-item">
              <span className="instructor-stat-label">Asistencia</span>
              <span className={`instructor-stat-value ${
                Number(rate) >= 80 ? 'success' : Number(rate) >= 60 ? 'warning' : 'danger'
              }`}>
                {rate}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="instructor-empty-state">
          <p className="instructor-empty-state-text">No hay reservas registradas</p>
        </div>
      )}
    </div>
  );
}
