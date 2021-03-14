export class Client {
    id: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    cedula: string;
    telefono: string;
    firebaseUid: string;
    email: string;
    displayName: string;
    tipoUsuario: string;

    constructor(primerNombre?, segundoNombre?, primerApellido?, segundoApellido?, cedula?, telefono?) {

        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.cedula = cedula;
        this.telefono = telefono;


    }

}

// lbwNQbAT5HVNWQ8bFHKniUheRkF3