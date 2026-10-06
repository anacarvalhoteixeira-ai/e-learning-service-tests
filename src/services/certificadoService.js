export class CertificadoService {
    constructor(repository) {
        this.repository = repository;
    }


    async emitirCertificado(alunoId) {
        const aluno = await this.repository.buscarAluno(alunoId);


        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }


        if (aluno.media < 7) {
            throw new Error(
                'Aluno não atingiu a média mínima para certificação'
            );
        }


        return {
            sucesso: true,
            mensagem: 'Certificado emitido com sucesso'
        };
    }
}