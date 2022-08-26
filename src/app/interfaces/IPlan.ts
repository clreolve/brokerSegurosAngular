export interface IPlan{
    idPlan: number,
    idCompania: number,
    tipoDePlan: string,
    tipoDeSeguro: string,
    nombrePlan: string,
    tieneLimite: string,
    cobertura: string,
    is_active: number,
    fecha_creado:Date,
    fecha_modificado:Date,
    creado_por_usuario:string,
    modificado_por_usuario:string
}