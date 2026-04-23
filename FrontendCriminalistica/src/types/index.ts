export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  tipoDocumento: string;
  documento: number;
}

export interface TipoDelito {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Localidad {
  id: number;
  nombre: string;
  numeroLocalidad?: number;
  codigoPostal?: number;
}

export interface Barrio {
  id: number;
  nombre: string;
  localidad: Localidad;
}

export interface Ubicacion {
  id: number;
  localidad: Localidad;
  barrio: Barrio;
  latitud: number;
  longitud: number;
}

export interface Delito {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha: string;
  tipoDelito: TipoDelito;
  ubicacion: Ubicacion;
  idEstado: number;
}