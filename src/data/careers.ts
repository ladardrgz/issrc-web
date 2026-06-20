export interface Career {
  slug: string;
  name: string;
  level: string;
  modality: string;
  duration: string;
  awardedTitle: string;
  description: string;
  graduateRole: string;
  professionalProfile: string[];
  careerOpportunities: string[];
  curriculum: Array<{ year: string; subjects: string[] }>;
  admissionRequirements: string[];
  requiredDocuments: string[];
  faqs: Array<{ question: string; answer: string }>;
}

// Reemplazar estos placeholders únicamente con información académica oficial aprobada.
export const careers: Career[] = [
  {
    slug: 'carrera-a-confirmar',
    name: '[Nombre oficial de la carrera]',
    level: '[Nivel]',
    modality: '[Modalidad]',
    duration: '[Duración de la carrera]',
    awardedTitle: '[Título otorgado]',
    description: '[Descripción oficial de la propuesta académica]',
    graduateRole: '[Rol profesional del egresado]',
    professionalProfile: ['[Competencia profesional a confirmar]', '[Competencia profesional a confirmar]'],
    careerOpportunities: ['[Ámbito laboral a confirmar]', '[Ámbito laboral a confirmar]'],
    curriculum: [{ year: '[Año o tramo]', subjects: ['[Asignatura a confirmar]'] }],
    admissionRequirements: ['[Requisito de inscripción a confirmar]'],
    requiredDocuments: ['[Documentación necesaria a confirmar]'],
    faqs: [{ question: '[Pregunta frecuente]', answer: '[Respuesta institucional a confirmar]' }],
  },
];
