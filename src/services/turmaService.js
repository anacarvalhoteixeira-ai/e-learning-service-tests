export class TurmaService {
    constructor(repository) {
        this.repository = repository;
    }


    async matricularNaTurma(alunoId, turmaId) {
        const aluno = await this.repository.buscarAluno(alunoId);
        const turma = await this.repository.buscarTurma(turmaId);


        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }


        if (!turma) {
            throw new Error('Turma não encontrada');
        }


        if (turma.alunosMatriculados >= turma.capacidadeMaxima) {
            throw new Error('Turma sem vagas disponíveis');
        }


        return {
            sucesso: true,
            mensagem: 'Aluno matriculado na turma com sucesso'
        };
    }
}



