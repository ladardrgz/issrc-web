export type Career = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  duration: string;
  period: string;
  modality: string;
  image: string;
  imageAlt: string;
  profile: string[];
  plan?: {
    years: {
      title: string;
      subjects: {
        name: string;
        hours?: string;
      }[];
    }[];
  };
};

const institutionalCareerImage = '/images/institution/portada-iss.png';

// Datos cargados desde información institucional provista.
// Los planes de estudio no se incluyen porque no fueron informados con materias y carga horaria oficial.
// Para agregar un plan, sumar la propiedad `plan` dentro de la carrera correspondiente.
export const careers: Career[] = [
  {
    slug: 'salud-materno-infantil',
    title: 'Tecnicatura Superior en Salud Materno Infantil',
    shortTitle: 'Salud Materno Infantil',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/materno-infantil.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en salud materno infantil',
    description:
      'El egresado estará formado para desempeñarse en el ámbito del sector salud, en las diferentes etapas del cuidado de la madre y del niño, tanto a nivel domiciliario, comunitario e institucional.',
    profile: [
      'Integración a equipos que conforman la Estrategia de Atención Primaria de la Salud.',
      'Participación en acciones de promoción de la salud y prevención de enfermedades.',
      'Intervención en puericultura, pautas de crianza y cuidados de la madre y del niño.',
      'Participación en procesos de planificación, garantizando calidad en su área de responsabilidad e incumbencia.',
      'Desempeño en equipos multidisciplinarios e interdisciplinarios.',
    ],
  },
  {
    slug: 'instrumentacion-quirurgica',
    title: 'Tecnicatura Superior en Instrumentación Quirúrgica',
    shortTitle: 'Instrumentación Quirúrgica',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/iq.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en instrumentación quirúrgica',
    description:
      'El egresado de la Tecnicatura Superior en Instrumentación Quirúrgica estará capacitado para desempeñarse en áreas con actividad quirúrgica, obstétrica y de emergencia, aplicando normas legales, criterios de organización y principios de administración de los servicios de salud.',
    profile: [
      'Dirigir, gestionar, administrar, coordinar, asesorar y auditar áreas con actividad quirúrgica, obstétrica y de emergencia.',
      'Conocer y aplicar normas legales generales y específicas relacionadas con el ejercicio de la profesión.',
      'Desarrollar modelos de organización y planificación de áreas quirúrgicas en planta, emergencia y obstetricia.',
      'Planificar, organizar, ejecutar y dirigir programas educativos vinculados con la instrumentación quirúrgica.',
      'Integrar organismos competentes nacionales e internacionales.',
      'Desarrollar un desempeño ético profesional con responsabilidad personal y social.',
    ],
  },
  {
    slug: 'enfermeria-profesional',
    title: 'Tecnicatura Superior en Enfermería Profesional',
    shortTitle: 'Enfermería Profesional',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/enfermeria.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en enfermería profesional',
    description:
      'El Enfermero es un profesional de las Ciencias de la Salud con formación científica, técnica y humanística, responsable de brindar cuidados de enfermería a las personas, familias y comunidad.',
    profile: [
      'Brindar cuidados de enfermería a personas, familias y comunidad.',
      'Integrarse al sistema de salud para contribuir a garantizar el derecho a la salud.',
      'Asumir roles de ejecución, supervisión, coordinación y dirección según el contexto de desempeño.',
      'Desarrollar actividades de protección, promoción, asistencia y recuperación de la salud.',
      'Participar en procesos de gestión de los servicios de enfermería.',
      'Valorar la educación permanente en salud y el protagonismo de las personas en el cuidado de su salud.',
    ],
  },
  {
    slug: 'bioinformatica',
    title: 'Tecnicatura Superior en Bioinformática',
    shortTitle: 'Bioinformática',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/bio-informatica.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en bioinformática',
    description:
      'El Técnico Superior en Bioinformática estará capacitado para preparar, configurar, administrar, analizar, supervisar y asistir técnicamente equipos informáticos, así como participar en el desarrollo, mantenimiento y programación de sistemas.',
    profile: [
      'Preparar, configurar, administrar y supervisar equipos informáticos.',
      'Asistir técnicamente a usuarios y equipos de trabajo.',
      'Participar en el desarrollo, mantenimiento y programación de sistemas informáticos.',
      'Capacitar y asesorar a usuarios en la optimización y uso de equipos y programas.',
      'Administrar recursos informáticos en centros de cómputos.',
      'Armar y administrar estructuras de red.',
      'Diseñar programas de alto nivel y desarrollar habilidades comunicativas propias de la profesión.',
    ],
  },
  {
    slug: 'hemoterapia',
    title: 'Tecnicatura Superior en Hemoterapia',
    shortTitle: 'Hemoterapia',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/hemoterapia.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en hemoterapia',
    description:
      'El Técnico Superior en Hemoterapia participa en procesos de hemodonación, fraccionamiento de hemocomponentes, calificación biológica de unidades de sangre, transfusión e inmunohematología.',
    profile: [
      'Participar en admisión, entrevista, extracción, registro y control clínico posdonación de donantes de sangre.',
      'Realizar fraccionamiento en hemocomponentes, seguimiento, control y registro del proceso.',
      'Aplicar criterios de seguridad, impacto ambiental, relaciones humanas, calidad, productividad y costos.',
      'Calificar biológicamente unidades de sangre extraídas.',
      'Realizar tamizaje de enfermedades transmisibles por transfusión.',
      'Participar en tipificación de antígenos y estudio de anticuerpos regulares e irregulares.',
      'Intervenir en procesos transfusionales y seguimiento del receptor.',
      'Estudiar inmunohematología de embarazadas, puérperas y recién nacidos.',
    ],
  },
  {
    slug: 'acompanante-terapeutico',
    title: 'Tecnicatura Superior en Acompañante Terapéutico',
    shortTitle: 'Acompañante Terapéutico',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/acompanante.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en acompañamiento terapéutico',
    description:
      'El Acompañante Terapéutico estará capacitado para acompañar, desde las indicaciones médicas, a personas con padecimientos crónicos, agudos o incurables, en el marco de un equipo interdisciplinario y bajo supervisión profesional.',
    profile: [
      'Acompañar a pacientes en el marco de indicaciones médicas y equipos interdisciplinarios.',
      'Realizar acciones específicas para el restablecimiento de un mejor estar de la persona.',
      'Llevar adelante acciones de prevención.',
      'Promover procesos de resocialización y reinserción psicosocial.',
      'Brindar contención y guía junto al equipo de salud.',
      'Facilitar procesos de escucha a familiares y dinamizar la red vincular.',
      'Intervenir en campos como salud mental, clínica quirúrgica, adicciones, gerontología y educación.',
    ],
  },
  {
    slug: 'medicina-nuclear',
    title: 'Tecnicatura Superior en Medicina Nuclear',
    shortTitle: 'Medicina Nuclear',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/medicina-nuclear.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en medicina nuclear',
    description:
      'El Técnico en Medicina Nuclear está capacitado para realizar, bajo supervisión médica, procedimientos diagnósticos y terapéuticos mediante la utilización de sustancias radioactivas, radioisótopos y radiofármacos.',
    profile: [
      'Realizar procedimientos técnicos de medicina nuclear bajo supervisión médica.',
      'Valorar resultados técnicos como soporte al diagnóstico clínico o seguimiento terapéutico.',
      'Actuar bajo normas de calidad, radioprotección y seguridad.',
      'Participar en la organización y administración de áreas de medicina nuclear.',
      'Interpretar consignas de estamentos profesionales y jerárquicos del equipo de trabajo.',
      'Gestionar actividades específicas y recursos bajo su responsabilidad.',
      'Aplicar criterios de seguridad, radioprotección, impacto ambiental, bioética, calidad, productividad y costos.',
    ],
  },
  {
    slug: 'auxiliar-odontologia-promotor-salud-bucal',
    title: 'Tecnicatura Superior en Auxiliar en Odontología y Promotor de la Salud Bucal',
    shortTitle: 'Auxiliar en Odontología y Promotor de la Salud Bucal',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/odontologia.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en odontología y salud bucal',
    description:
      'El Técnico Superior en Auxiliar de Odontología y Promotor de Salud Bucal está capacitado para colaborar en procedimientos del consultorio odontológico, actuar bajo normas de calidad y seguridad, y participar en acciones de promoción y prevención de la salud bucal.',
    profile: [
      'Desplegar procedimientos en el ámbito del consultorio odontológico.',
      'Colaborar con el profesional odontólogo en un equipo de trabajo armónico y productivo.',
      'Actuar bajo normas de calidad y seguridad.',
      'Participar en la organización y administración de áreas del Servicio de Odontología.',
      'Desarrollar actividades de promoción y prevención de la salud bucal.',
      'Interactuar con profesionales y personal de distintas áreas de salud.',
    ],
  },
  {
    slug: 'emergencias-y-desastres',
    title: 'Tecnicatura Superior en Emergencias y Desastres',
    shortTitle: 'Emergencias y Desastres',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/emergencias.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en emergencias y desastres',
    description:
      'El Técnico Superior en Emergencias y Desastres estará capacitado para organizar sistemas de respuesta ante emergencias, trauma y desastres, y formar parte de procesos de logística sanitaria ante situaciones individuales, colectivas o de catástrofe.',
    profile: [
      'Organizar sistemas de respuesta ante emergencias, trauma y desastres.',
      'Prestar asistencia inicial básica en el entorno prehospitalario.',
      'Realizar tareas de radio operación y despacho.',
      'Colaborar en la elaboración de planes de emergencia y dispositivos de riesgo previsibles.',
      'Realizar actividades de promoción de la salud y prevención de accidentes y enfermedades relacionadas con emergencias.',
      'Formar parte de procesos de logística sanitaria ante emergencias individuales, colectivas o catástrofes.',
    ],
  },
  {
    slug: 'diagnostico-por-imagenes',
    title: 'Tecnicatura Superior en Diagnóstico por Imágenes',
    shortTitle: 'Diagnóstico por Imágenes',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/diagnostico.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en diagnóstico por imágenes',
    description:
      'El diagnóstico a partir de la producción de bioimágenes abarca distintos campos de actuación, desde la radiología simple hasta aparatología computarizada y digital, con necesidad permanente de capacitación y formación actualizada.',
    profile: [
      'Participar en procesos vinculados a la producción de bioimágenes.',
      'Intervenir en áreas de radiología simple y aparatología computarizada o digital.',
      'Contribuir al diagnóstico como campo específico del sistema de salud.',
      'Participar en prácticas vinculadas con terapéutica, hemodinamia intervencionista y diagnóstico intraoperatorio, según incumbencias y supervisión correspondiente.',
      'Desarrollar formación técnica actualizada en diagnóstico por imágenes.',
    ],
  },
  {
    slug: 'procesos-y-servicios-farmaceuticos',
    title: 'Tecnicatura Superior en Procesos y Servicios Farmacéuticos',
    shortTitle: 'Procesos y Servicios Farmacéuticos',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/procesos-farmacia.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en procesos y servicios farmacéuticos',
    description:
      'El Técnico Superior en Procesos y Servicios Farmacéuticos adquiere competencia científico-técnica para participar en procesos de fabricación, control, expedición y dispensación de medicamentos e industrias afines.',
    profile: [
      'Participar en la calificación de instalación, operación y performance de equipos, máquinas e instrumentos.',
      'Interpretar la farmacopea nacional y farmacopeas internacionales.',
      'Ejecutar procedimientos indicados por normativas farmacéuticas.',
      'Participar en instancias de producción, control y expendio de medicamentos.',
      'Colaborar en el control de calidad fisicoquímico de materias primas, productos intermedios y finales.',
      'Participar en controles higiénicos de materias primas, envases y productos.',
      'Aplicar buenas prácticas de laboratorio y fabricación.',
      'Dispensar medicamentos y elementos conforme a disposiciones legales vigentes.',
    ],
  },
  {
    slug: 'administracion-y-facturacion-en-salud',
    title: 'Tecnicatura Superior en Administración y Facturación en Salud',
    shortTitle: 'Administración y Facturación en Salud',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/admin-salud.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en administración y facturación en salud',
    description:
      'Información descriptiva pendiente de confirmación institucional. El material provisto indica la denominación, nivel, modalidad, duración y título otorgado, pero el texto descriptivo aparece duplicado respecto de otra carrera.',
    profile: [
      'Información académica específica pendiente de confirmación institucional.',
      'La denominación oficial informada es Tecnicatura Superior en Administración y Facturación en Salud.',
      'El título informado es Técnico Superior en Administración y Facturación en Salud.',
      'El detalle de perfil profesional deberá cargarse cuando se disponga de información oficial verificada.',
    ],
  },
  {
    slug: 'podologia',
    title: 'Tecnicatura Superior en Podología',
    shortTitle: 'Podología',
    duration: '3 años',
    period: 'A confirmar',
    modality: 'Presencial',
    image: '/images/careers/podologia.jpeg',
    imageAlt: 'Espacio institucional vinculado a la formación en podología',
    description:
      'El egresado de la Tecnicatura Superior en Podología podrá desempeñarse en el área de la salud en las diferentes etapas del cuidado de los pies, tanto en la prevención como en el tratamiento y la rehabilitación.',
    profile: [
      'Desempeñarse en ámbitos privados y públicos, en consultorio particular, domicilios y servicios institucionales.',
      'Intervenir en prevención, diagnóstico, tratamiento y rehabilitación de enfermedades del pie.',
      'Manipular equipamiento y aparatología podológica.',
      'Utilizar materiales, técnicas e instrumentos para examen y asistencia de pacientes.',
      'Cumplir normas de bioseguridad correspondientes.',
      'Integrar equipos multidisciplinarios en Atención Primaria de la Salud y Alta Complejidad.',
      'Comprender políticas sanitarias vigentes y responsabilidades de la profesión.',
      'Diseñar estrategias de promoción de la salud, prevención de enfermedades y proyectos de investigación relacionados con su campo.',
    ],
  },
];