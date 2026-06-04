// Cl_mAspirante.ts

export default class Cl_mAspirante {
    private _nombre: string;
    private _cedula: string;

    // Arrays de De las Secciones de Preguntas
        private postgrado: any[] = [];
        private pregrado: any[] = [];
        private produccion: any[] = [];
        private meritos: any[] = [];

    /* Nota: declaramos los arrays con any, ya que hay convinaciones de 
    preguntas de distintos tipos, lo cual no nos permite definir un tipo 
    específico para cada array. */

    constructor ({nombre, cedula}: 
        {nombre: string, cedula: string} = 
        {nombre: '', cedula: ''}) {

        this._nombre = nombre;
        this._cedula = cedula;

    // Inicializamos los Arrays de las Secciones de Preguntas en el constructor
        this.inicializarPostgrado();
        this.inicializarPregrado();
        this.inicializarProduccion();
        this.inicializarMeritos();
    }

    // Getters y Setters
        set nombre(n: string) {
            this._nombre = n; }

        get nombre(): string {
            return this._nombre; }

        set cedula(c: string) {
            this._cedula = c; }
        
        get cedula(): string {
            return this._cedula; }

    // Metodos para Inicializar las Secciones de Preguntas
        private inicializarPostgrado(): void {
            this.postgrado = [
                { id: "postgradoArea", pregunta: "Postgrado en el área objeto", valor: false, puntos: 0, maxPuntos: 25 },
                { id: "otrosPostgrados", pregunta: "Otros Postgrados", valor: false, puntos: 0, maxPuntos: 20 },
                { id: "cursoActualizacion", pregunta: "Cursos de Actualización", valor: false, puntos: 0, maxPuntos: 6, factor: 3 },
                { id: "meritosTesis", pregunta: "éritos en Tesis", valor: false, puntos: 0, maxPuntos: 5 }
            ];
        }

        private inicializarPregrado(): void {
            this.pregrado = [
                { id: "promedioUniversitario", texto: "Promedio universitario", valor: 0, puntos: 0, max: 25 },
                { id: "preparador", texto: "Años como preparador", valor: 0, puntos: 0, max: 10, factor: 10 },
                { id: "actividadesOtras", texto: "Actividades en otras áreas", valor: 0, puntos: 0, max: 3, factor: 3 },
                { id: "diplomaSobresalienteArea", texto: "Diploma sobresaliente en el área", valor: false, puntos: 0, max: 5 },
                { id: "diplomasOtras", texto: "Diplomas en otras áreas", valor: 0, puntos: 0, max: 3, factor: 1 },
                { id: "diplomasInvestigacion", texto: "Diplomas en investigación", valor: 0, puntos: 0, max: 3, factor: 1 },
                { id: "diplomasExtension", texto: "Diplomas en extensión", valor: 0, puntos: 0, max: 3, factor: 1 }
            ];
        }

        private inicializarProduccion(): void {
            this.produccion = [
                { id: "librosComite", texto: "Libros con comité editorial", valor: 0, puntos: 0, max: 15, factor: 15 },
                { id: "librosSinComite", texto: "Libros sin comité editorial", valor: 0, puntos: 0, max: 12, factor: 12 },
                { id: "articulosIndexados", texto: "Artículos indexados", valor: 0, puntos: 0, max: 10, factor: 10 },
                { id: "articulosNoIndexados", texto: "Artículos no indexados", valor: 0, puntos: 0, max: 6, factor: 6 },
                { id: "articulosNoArbitrados", texto: "Artículos no arbitrados", valor: 0, puntos: 0, max: 4, factor: 4 },
                { id: "articulosOtrasAreas", texto: "Artículos en otras áreas", valor: 0, puntos: 0, max: 3, factor: 3 },
                { id: "memoriasCongresos", texto: "Memorias de congresos", valor: 0, puntos: 0, max: 10 },
                { id: "ponencias", texto: "Ponencias internacionales", valor: 0, puntos: 0, max: 6, factor: 6 },
                { id: "patentes", texto: "Patentes", valor: 0, puntos: 0, max: 15, factor: 15 }
            ];
        }

    private inicializarMeritos(): void {
        this.meritos = [
            { id: "anosDocencia", texto: "Años de docencia en el área", valor: 0, puntos: 0, max: 12, factor: 2 },
            { id: "premiosDocencia", texto: "Premios en docencia", valor: 0, puntos: 0, max: 8, factor: 2 },
            { id: "mesesExpArea", texto: "Meses experiencia en el área", valor: 0, puntos: 0, max: 12, factor: 1/6 },
            { id: "mesesExpOtra", texto: "Meses experiencia en otras áreas", valor: 0, puntos: 0, max: 3, factor: 0.5/6 },
            { id: "premioLaboral", texto: "Premio laboral", valor: "Ninguno", puntos: 0, max: 1 },
            { id: "anosDirector", texto: "Años como director", valor: 0, puntos: 0, max: 6, factor: 2 },
            { id: "pasantiasArea", texto: "Pasantías en el área", valor: 0, puntos: 0, max: 2, factor: 0.5 },
            { id: "pasantiasOtra", texto: "Pasantías en otras áreas", valor: 0, puntos: 0, max: 1, factor: 0.5 }
        ];
    }

    // Valor en Especifico para cada Sección.

    setValor(seccion: string, id: string, valor: any): void {
        let items: any[] = [];
        
        if (seccion === "postgrado") items = this.postgrado;
        else if (seccion === "pregrado") items = this.pregrado;
        else if (seccion === "produccion") items = this.produccion;
        else if (seccion === "meritos") items = this.meritos;
        else return;

        const item = items.find(i => i.id === id);
            if (!item) return;

        item.valor = valor;
        this.recalcularPuntos(item);
    }

    // Recalcula los puntos de un ítem específico según su valor y tipo

    private recalcularPuntos(item: any): void {
            // Booleanos (Sí/No)
        if (typeof item.valor === "boolean") {
            item.puntos = item.valor ? item.max : 0;    } // El operador logico ? asigna item.max si item.valor es true, o 0 si es false.

            // Promedio universitario
        else if (item.id === "promedioUniversitario") {
            item.puntos = this.convertirPromedio(item.valor);   }

            // Premio laboral
        else if (item.id === "premioLaboral") {
            const premios: any = { "Ninguno": 0, "Estadal": 0.5, "Nacional": 0.75, "Internacional": 1 };
            item.puntos = premios[item.valor] || 0;   }

        // Memorias de congresos (baremo especial)
            else if (item.id === "memoriasCongresos") {
                if (item.valor === 1) item.puntos = 5;
                else if (item.valor === 2) item.puntos = 8;
                else if (item.valor >= 3) item.puntos = 10;
                else item.puntos = 0;   }

        // Números con factor (tipo la cantidad de Algo en especifico que tenga la persona)
            else if (typeof item.valor === "number" && item.factor) {
                let calculado = item.valor * item.factor;
                item.puntos = Math.min(calculado, item.max);    }

            /* 
            Nota: el Calculo de puntos te va a devolver el valor más pequeño de ambos  con el Math.min, es decir, 
                el calculo no puede superar el item.max en este caso, ya que retorna el valor del item.max.
            */
                
    }

    // Convertimos el Promedio Universitario a Puntos según el baremo establecido

    private convertirPromedio(promedio: number): number {
        if (promedio >= 20) return 25;
        if (promedio >= 19) return 22;
        if (promedio >= 18) return 18;
        if (promedio >= 17) return 15;
        if (promedio >= 16) return 12;
        if (promedio >= 15) return 10;
        if (promedio >= 14) return 8;
        if (promedio >= 13) return 5;
        if (promedio >= 12) return 3;
        return 0;
    }

    // Calculo de Puntos Totales por Sección

    calcularSeccion(seccion: string): number {
        let items: any[] = [];
        let tope = 0;
        
        if (seccion === "postgrado") { items = this.postgrado; tope = 35; }
        else if (seccion === "pregrado") { items = this.pregrado; tope = 30; }
        else if (seccion === "produccion") { items = this.produccion; tope = 15; }
        else if (seccion === "meritos") { items = this.meritos; tope = 20; }
        else return 0;

        const total = items.reduce((suma, item) => suma + item.puntos, 0); // el ", 0" es el valor inicial de la suma, es decir, comienza desde 0.
        return Math.min(total, tope);

        /* reduce: Es un metodo para los arrays que permite acumular un valor a lo 
        largo de la iteración. En este caso, suma los puntos de cada item, comenzando desde 0. */
    }

    // Calculo del Puntaje Total sobre 100 puntos

    calcularTotal(): number {
        return this.calcularSeccion("postgrado") +
               this.calcularSeccion("pregrado") +
               this.calcularSeccion("produccion") +
               this.calcularSeccion("meritos");
    }

    // Calculo de la Nota Final sobre 20 puntos
    calcularNotaFinal(): number {
        return this.calcularTotal() / 5;
    }

}