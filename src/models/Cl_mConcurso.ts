// Cl_mConcurso.ts

import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mConcurso {
    public aspirantes: Cl_mAspirante[] = [];

    public agregarAspirante(aspirante: Cl_mAspirante): void {
        this.aspirantes.push(aspirante);
    }
    
    setAspirantes(aspirante: any[]) {
        this.aspirantes = [];
        aspirante.forEach((item) => {
            const aspirante = new Cl_mAspirante({
                cedula: item.cedula,
                nombre: item.nombre,
                notaExamenEscrito: item.notaExamenEscrito,
                notaExamenPractico: item.notaExamenPractico,
                notaExamenAptitudes: item.notaExamenAptitudes,
            });
            this.aspirantes.push(aspirante);
        });
    }
    
    getAspirantes(): Cl_mAspirante[] {
        return this.aspirantes;
    }
}