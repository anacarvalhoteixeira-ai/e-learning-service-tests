export function criarTurma(overrides = {}) {
    return {
        id: 1,
        disciplinaId: 1,
        capacidadeMaxima: 30,
        alunosMatriculados: 10,
        ...overrides
    };
}