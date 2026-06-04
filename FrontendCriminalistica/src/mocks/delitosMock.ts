export const delitosMock = [
  {
    id: 1,

    tipoDelito: {
      id: 1,
      nombre: 'Hurto'
    },

    ubicacion: {
      id: 1,
      barrio: 'Cedritos',
      localidad: {
        id: 1,
        nombre: 'Usaquén'
      },
      latitud: 4.7281,
      longitud: -74.0345
    },

    descripcion: 'Hurto de celular en vía pública',

    fecha: '2026-01-10T12:00:00'
  },

  {
    id: 2,

    tipoDelito: {
      id: 2,
      nombre: 'Robo'
    },

    ubicacion: {
      id: 2,
      barrio: 'Chapinero Central',
      localidad: {
        id: 2,
        nombre: 'Chapinero'
      },
      latitud: 4.6482,
      longitud: -74.0621
    },

    descripcion: 'Robo a establecimiento comercial',

    fecha: '2026-02-12T18:20:00'
  },

  {
    id: 3,

    tipoDelito: {
      id: 3,
      nombre: 'Fraude'
    },

    ubicacion: {
      id: 3,
      barrio: 'Modelia',
      localidad: {
        id: 3,
        nombre: 'Fontibón'
      },
      latitud: 4.6785,
      longitud: -74.1124
    },

    descripcion: 'Fraude bancario',

    fecha: '2026-03-15T09:15:00'
  },

  {
    id: 4,

    tipoDelito: {
      id: 4,
      nombre: 'Homicidio'
    },

    ubicacion: {
      id: 4,
      barrio: 'Bosa Centro',
      localidad: {
        id: 4,
        nombre: 'Bosa'
      },
      latitud: 4.6152,
      longitud: -74.1841
    },

    descripcion: 'Investigación en curso',

    fecha: '2026-04-01T23:40:00'
  }
];