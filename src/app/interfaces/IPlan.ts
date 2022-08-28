export interface IPlan{
        idPlan: number,
        deducible: [],
        companias: {
            idCompania: number,
            nombreCompania: string,
            ruc: string,
            nombreCoordinador: string,
            celular: string,
            correo: string,
            is_active: number
        },
        tipoDePlan: string,
        tipoDeSeguro: string,
        nombrePlan: string,
        tieneLimite: number,
        cobertura: number,
        is_active: number,
        fecha_creado: Date,
        creado_por_usuario: string,
        creado_id_usuario: string,
        fecha_modificado: Date,
        modificado_por_usuario: string,
        modificado_id_usuario: number,
        idCompania: number
    }