export class MatriculaService {
    constructor(repository) {
        this.repository = repository;
    }


    async matricular(alunoId, disciplinaId) {
        const aluno = await this.repository.buscarAluno(alunoId);
        const disciplina = await this.repository.buscarDisciplina(disciplinaId);


        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }


        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }


        const possuiPreRequisitos = disciplina.preRequisitos.every(
            (preRequisito) =>
                aluno.disciplinasConcluidas.includes(preRequisito)
        );


        if (!possuiPreRequisitos) {
            throw new Error('Pré-requisito não cumprido');
        }


        return {
            sucesso: true,
            mensagem: 'Aluno matriculado com sucesso'
        };
    }
}
