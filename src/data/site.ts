export const site = {
  name: 'Instituto Superior de Sanidad Prof. Dr. Ramón Carrillo - Fundación HAC',
  shortName: 'Instituto Superior de Sanidad Ramón Carrillo',
  description: 'El Instituto Superior de Sanidad "Prof. Dr. Ramón Carrillo" es la excelencia y profesionalismo en enseñanza sanitaria de Formosa.',
  address: 'Córdoba 447 - Formosa (Capital)',
  email: 'contacto@issformosa.edu.ar',
  phones: [
    { label: '(3704) 421840', href: 'tel:+543704421840' },
    { label: '(3704) 431868', href: 'tel:+543704431868' },
  ],
  social: {
    instagram: 'https://www.instagram.com/institutosanidadformosa',
    facebook: 'https://www.facebook.com/ISSFormosa?rdid=xpH5sigJmN8DweEQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17w46LFF2w%2F#',
    email: 'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=contacto@issformosa.edu.ar',
  },
  campusUrl: '#campus-pendiente',
  locale: 'es_AR',
} as const;

export const navigation = [
  { href: '/', label: 'Inicio' },
  { href: '/institucion/', label: 'Institución' },
  { href: '/carreras/', label: 'Carreras' },
  { href: '/ingresantes/', label: 'Ingresantes' },
  { href: '/noticias/', label: 'Noticias' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const calendarEvents: Array<{ date: string; title: string; category: string }> = [];
