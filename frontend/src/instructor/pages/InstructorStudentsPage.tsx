import { useInstructorClasses, useClassReservations } from '../features/useInstructor';
import { 
  Mail,
  User as UserIcon
} from 'lucide-react';
import '../instructor.css';
import type { ClaseItem } from '../../admin/features/clases/useClases';

export function InstructorStudentsPage() {
  const { data: clases } = useInstructorClasses();
  
  if (!clases || clases.length === 0) {
    return (
      <div>
        <div className="instructor-page-header">
          <h1 className="instructor-page-title">Estudiantes</h1>
          <p className="instructor-page-subtitle">Visualiza todos los estudiantes inscritos en tus clases</p>
        </div>
        <div className="instructor-empty-state">
          <UserIcon size={48} className="instructor-empty-state-icon" />
          <p className="instructor-empty-state-text">No hay estudiantes inscritos</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="instructor-page-header">
        <h1 className="instructor-page-title">Estudiantes</h1>
        <p className="instructor-page-subtitle">Visualiza todos los estudiantes inscritos en tus clases</p>
      </div>

      {clases.map((clase) => (
        <StudentsByClass key={clase.idClase} clase={clase} />
      ))}
    </div>
  );
}

function StudentsByClass({ clase }: { clase: ClaseItem }) {
  const { students, isLoading } = useClassReservations(clase.idClase);

  if (isLoading) {
    return <p>Cargando estudiantes...</p>;
  }

  if (!students || students.length === 0) {
    return null;
  }

  return (
    <div className="instructor-class-card" style={{ marginBottom: '1.5rem' }}>
      <div className="instructor-class-card-header">
        <h3 className="instructor-class-name">{clase.nombre}</h3>
        <span className="instructor-class-status instructor-class-status-active">
          {students.length} estudiantes
        </span>
      </div>

      <div className="instructor-student-list">
        {students.map((student) => (
          <div key={student.idUsuario} className="instructor-student-card">
            {student.foto ? (
              <div className="instructor-student-photo">
                <img src={student.foto} alt={student.nombre} />
              </div>
            ) : (
              <div className="instructor-student-photo">
                {getInitials(student.nombre, student.apellido)}
              </div>
            )}
            
            <div className="instructor-student-info">
              <div className="instructor-student-name">
                {student.nombre} {student.apellido}
              </div>
              <div className="instructor-student-email">
                <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {student.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getInitials(nombre?: string, apellido?: string) {
  const first = nombre?.charAt(0) || '';
  const last = apellido?.charAt(0) || '';
  return `${first}${last}`.toUpperCase();
}
