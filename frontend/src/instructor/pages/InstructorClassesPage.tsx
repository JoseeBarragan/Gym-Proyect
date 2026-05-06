import { useState } from 'react';
import { useInstructorClasses, useClassReservations } from '../features/useInstructor';
import { InstructorClassDetail } from './InstructorClassDetail';
import { 
  Calendar, 
  Clock, 
  TrendingUp,
  User
} from 'lucide-react';
import '../instructor.css';
import type { ClaseItem } from '../../admin/features/clases/useClases';

export function InstructorClassesPage() {
  const { data: clases, allClasses, isLoading, error } = useInstructorClasses();
  const [selectedClass, setSelectedClass] = useState<{id: string; data: ClaseItem} | null>(null);

  if (selectedClass) {
    const claseData = allClasses?.find(c => c.idClase === selectedClass.id);
    return (
      <InstructorClassDetail 
        claseId={selectedClass.id} 
        onBack={() => setSelectedClass(null)}
        claseData={claseData}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="instructor-empty-state">
        <p>Cargando clases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="instructor-empty-state">
        <p style={{ color: '#ef4444' }}>Error al cargar las clases</p>
      </div>
    );
  }

  const instructorClasses = clases || [];

  return (
    <div>
      <div className="instructor-page-header">
        <h1 className="instructor-page-title">Mis Clases</h1>
        <p className="instructor-page-subtitle">Gestiona la asistencia y visualiza el estado de tus clases asignadas</p>
      </div>

      {instructorClasses.length > 0 ? (
        <div className="instructor-cards-grid">
          {instructorClasses.map((clase) => (
            <ClassCard 
              key={clase.idClase} 
              clase={clase} 
              onSelect={() => setSelectedClass({ id: clase.idClase, data: clase })}
            />
          ))}
        </div>
      ) : (
        <div className="instructor-empty-state">
          <User size={48} className="instructor-empty-state-icon" />
          <p className="instructor-empty-state-text">No tienes clases asignadas</p>
          <p style={{ fontSize: '0.875rem' }}>Contacta al administrador para que te asigne clases</p>
        </div>
      )}
    </div>
  );
}

function ClassCard({ clase, onSelect }: {
  clase: ClaseItem;
  onSelect: () => void;
}) {
  const { students } = useClassReservations(clase.idClase);
  const enrolledCount = students.length;
  const capacityPercentage = (enrolledCount / (clase.cupo || 20)) * 100;

  const getCapacityClass = () => {
    if (capacityPercentage >= 90) return 'full';
    if (capacityPercentage >= 70) return 'warning';
    return '';
  };

  return (
    <div className="instructor-class-card" onClick={onSelect}>
      <div className="instructor-class-card-header">
        <h3 className="instructor-class-name">{clase.nombre}</h3>
        <span className={`instructor-class-status ${clase.activa ? 'instructor-class-status-active' : 'instructor-class-status-inactive'}`}>
          {clase.activa ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <p className="instructor-class-description">{clase.descripcion}</p>

      <div className="instructor-class-info">
        <div className="instructor-class-info-row">
          <Calendar size={18} />
          <span className="instructor-class-info-label">Día:</span>
          <span>{clase.dia}</span>
        </div>
        <div className="instructor-class-info-row">
          <Clock size={18} />
          <span className="instructor-class-info-label">Horario:</span>
          <span>{clase.horario}</span>
        </div>
        <div className="instructor-class-info-row">
          <TrendingUp size={18} />
          <span className="instructor-class-info-label">Duración:</span>
          <span>{clase.duracionMinutos} min</span>
        </div>
      </div>

      <div className="instructor-capacity-bar">
        <div 
          className={`instructor-capacity-fill ${getCapacityClass()}`}
          style={{ width: `${capacityPercentage}%` }}
        />
<div className="instructor-capacity-text">
  <span>{enrolledCount} estudiantes inscritos</span>
  <span>{capacityPercentage.toFixed(0)}% capacidad</span>
</div>
      </div>

      <button className="instructor-attendace-btn">
        Gestionar Asistencia
      </button>
    </div>
  );
}
