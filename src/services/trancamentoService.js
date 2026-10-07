export class TrancamentoService {
    constructor(repository) {
        this.repository = repository;
    }


    async trancarDisciplina(alunoId, disciplinaId, dataInicio, dataSolicitacao) {
        const aluno = await this.repository.buscarAluno(alunoId);


        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }


        const inicio = new Date(dataInicio);
        const solicitacao = new Date(dataSolicitacao);


        const diferencaEmMs = solicitacao - inicio;
        const diferencaEmDias =
            diferencaEmMs / (1000 * 60 * 60 * 24);


        if (diferencaEmDias > 30) {
            throw new Error(
                'Prazo para trancamento expirado'
            );
        }


        return {
            sucesso: true,
            mensagem: 'Disciplina trancada com sucesso'
        };
    }
}
