import type { Delito } from '../types';

export const mapApiDelitoToFrontend = (
  apiDelito: any,
  index: number
): Delito => {
  return {
    id: index + 1,

    nombre: apiDelito.tipoDelito,

    descripcion: `Reporte de ${apiDelito.tipoDelito}`,

    fecha: apiDelito.fecha,

    tipoDelito: {
      id: 1,
      nombre: apiDelito.tipoDelito,
    },

    ubicacion: {
      latitud: apiDelito.latitud,
      longitud: apiDelito.longitud,

      localidad: {
        id: 1,
        nombre: 'Sin localidad',
      },

      barrio: {
        id: 1,
        nombre: 'Sin barrio',
      },
    },
  };
};