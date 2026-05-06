import { useState } from 'react';
import { 
  useClassReservations,
  useUpdateReservationAttendance,
  type StudentInClass 
} from '../features/useInstructor';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle,
  XCircle,
  TrendingUp,
  User
} from 'lucide-react';
import '../instructor.css';
import type { ClaseItem } from '../../admin/features/clases/useClases';

export function InstructorClassDetail({ claseId, onBack, claseData }: { 
  claseId: string; 
  onBack: () => void;
  claseData?: ClaseItem;
}) {
  const { students, isLoading } = useClassReservations(claseId);
  const updateAttendance = useUpdateReservationAttendance();

  const enrolledCount = students.length;
  const availableSpots = (claseData?.cupo || 20) - enrolledCount;
  const capacityPercentage = (enrolledCount / (claseData?.cupo || 20)) * 100;

  const handleAttendanceUpdate = (reservationId: string, asistio: boolean) => {
    updateAttendance.mutate({ reservationId, asistio });
  };

  const getCapacityClass = () => {
    if (capacityPercentage >= 90) return 'full';
    if (capacityPercentage >= 70) return 'warning';
    return '';
  };

  const presentCount = students.filter(s => s.asistio === true).length;
  const absentCount = students.filter(s => s.asistio === false).length;

  return (
    <div>
      <button onClick={onBack} className="instructor-back-btn">
        <ArrowLeft size={20} />
        Volver a Mis Clases
      </button>

      <div className="instructor-page-header">
        <h1 className="instructor-page-title">{claseData?.nombre || 'Clase'}</h1>
        <p className="instructor-page-subtitle">{claseData?.descripcion || ''}</p>
      </div>

      <div className="instructor-stats-bar">
        <div className="instructor-stat-item">
          <span className="instructor-stat-label">Estudiantes Inscritos</span>
          <span className="instructor-stat-value">{enrolledCount} / {claseData?.cupo}</span>
        </div>
        <div className="instructor-stat-item">
          <span className="instructor-stat-label">Espacios Disponibles</span>
          <span className={`instructor-stat-value ${availableSpots <= 5 ? 'warning' : 'success'}`}>
            {availableSpots}
          </span>
        </div>
        <div className="instructor-stat-item">
          <span className="instructor-stat-label">Presentes</span>
          <span className="instructor-stat-value success">{presentCount}</span>
        </div>
        <div className="instructor-stat-item">
          <span className="instructor-stat-label">Ausentes</span>
          <span className="instructor-stat-value danger">{absentCount}</span>
        </div>
      </div>

      <div className="instructor-class-card" style={{ marginBottom: '2rem' }}>
        <div className="instructor-class-info">
          <div className="instructor-class-info-row">
            <Calendar size={18} />
            <span className="instructor-class-info-label">Día:</span>
            <span>{claseData?.dia}</span>
          </div>
          <div className="instructor-class-info-row">
            <Clock size={18} />
            <span className="instructor-class-info-label">Horario:</span>
            <span>{claseData?.horario}</span>
          </div>
          <div className="instructor-class-info-row">
            <TrendingUp size={18} />
            <span className="instructor-class-info-label">Duración:</span>
            <span>{claseData?.duracionMinutos} minutos</span>
          </div>
        </div>

        <div className="instructor-capacity-bar">
          <div 
            className={`instructor-capacity-fill ${getCapacityClass()}`}
            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
          />
          <div className="instructor-capacity-text">
            <span>{enrolledCount} estudiantes inscritos</span>
            <span>{capacityPercentage.toFixed(0)}% capacidad</span>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.25rem' }}>
        Lista de Estudiantes - Tomar Asistencia
      </h2>

      {isLoading ? (
        <p>Cargando estudiantes...</p>
      ) : students && students.length > 0 ? (
        <div className="instructor-student-list">
          {students.map((student) => (
            <StudentCard 
              key={student.idUsuario} 
              student={student} 
              onAttendanceChange={handleAttendanceUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="instructor-empty-state">
          <User size={48} className="instructor-empty-state-icon" />
          <p className="instructor-empty-state-text">No hay estudiantes inscritos en esta clase</p>
        </div>
      )}
    </div>
  );
}

function StudentCard({ student, onAttendanceChange }: { 
  student: StudentInClass & { reservaId?: string }; 
  onAttendanceChange: (reservationId: string, asistio: boolean) => void;
}) {
  const [attendance, setAttendance] = useState<boolean | null>(student.asistio || null);

  const handlePresent = () => {
    if (student.reservaId) {
      setAttendance(true);
      onAttendanceChange(student.reservaId, true);
    }
  };

  const handleAbsent = () => {
    if (student.reservaId) {
      setAttendance(false);
      onAttendanceChange(student.reservaId, false);
    }
  };

  const getInitials = () => {
    const first = student.nombre?.charAt(0) || '';
    const last = student.apellido?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="instructor-student-card">
      {student.foto ? (
        <div className="instructor-student-photo">
          <img src={student.foto} alt={student.nombre} />
        </div>
      ) : (
        <div className="instructor-student-photo">
          {getInitials()}
        </div>
      )}
      
      <div className="instructor-student-info">
        <div className="instructor-student-name">{student.nombre} {student.apellido}</div>
        <div className="instructor-student-email">{student.email}</div>
      </div>

      <div className="instructor-attendance-toggle">
        <button
          className={`instructor-attendance-btn present ${attendance === true ? 'active' : ''}`}
          onClick={handlePresent}
          title="Presente"
          disabled={!student.reservaId}
        >
          <CheckCircle size={16} />
        </button>
        <button
          className={`instructor-attendance-btn absent ${attendance === false ? 'active' : ''}`}
          onClick={handleAbsent}
          title="Ausente"
          disabled={!student.reservaId}
        >
          <XCircle size={16} />
        </button>
      </div>
    </div>
  );
}
