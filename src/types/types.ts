export interface Usuario {
    nombre: string;
    password: string;
    email: string;
    telefono: number;
  }
  
  export interface Productos {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    img_url: string;
    usuarioId: number;
    estado: string;
    categoriaId: number;
    ordenes: Orden[];
    carritos: Carrito[];
  }
  
  export interface Direcciones {
    id: number;
    pais: string;
    estado: string;
    ciudad: string;
    calle: string;
    codigo_postal: string;
    usuarioId: number;
  }
  
  export interface Categoria {
    id: number;
    nombre: string;
    productos: Productos[];
  }
  
  export interface Orden {
    id: number;
    usuarioId: number;
    productos: Productos[];
    fecha: Date;
    total: number;
    pago?: string;
  }
  
  export interface Carrito {
    id: number;
    usuarioId: number;
    productos: Productos[];
  }
  