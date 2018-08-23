export interface Tarefa {
    uid?: string,
    titulo: string,
    prioridade: number,
    feito?: boolean,
    selecionada?: boolean
}