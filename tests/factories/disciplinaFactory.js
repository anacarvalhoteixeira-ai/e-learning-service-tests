export function criarDisciplina(overrides = {}) {
    return {
        id: 1,
        nome: 'Banco de Dados',
        preRequisitos: [],
        ...overrides
    };
}