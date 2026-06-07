// Cl_mConcurso.ts

import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mConcurso {
    public aspirantes: Cl_mAspirante[] = [];
    private cntAspirantes: number = 0;

    public agregarAspirante(aspirante: Cl_mAspirante): void {
        this.aspirantes.push(aspirante);

        this.cntAspirantes ++;
    }

    contadorAspirantes(): number {
        return this.cntAspirantes;  }

}

/*
hay que colocar aca el arreglo de los aspirantes
y para cada dato a reportar igual un arreglo para ver cada metodo
*/