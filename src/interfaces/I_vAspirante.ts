// I_vAspirante.ts
export interface I_vAspirante {

    // Atributos de la Clase Menor
        get nombre(): string;
        get cedula(): string;
        get notaExamenEscrito(): number;
        get notaExamenPractico(): number;
        get notaExamenAptitudes(): number;

    // Métodos de la Clase Menor
        mostrar(): void;
        ocultar(): void;

    // Botones de Enviar y Cancelar
        onEnviar(callback: () => void): void;
        onCancelar(callback: () => void): void;
}