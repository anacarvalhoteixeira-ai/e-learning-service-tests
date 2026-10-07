export function criarAluno(overrides = {}) {
    return {
        id: 1,
        nome: 'Ana Clara',
        disciplinasConcluidas: [],
        media: 7.5,
        ...overrides
    };
}