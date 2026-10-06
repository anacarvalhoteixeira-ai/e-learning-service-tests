import { jest } from '@jest/globals';


import { CertificadoService } from '../src/services/certificadoService.js';


import { criarAluno } from './factories/alunoFactory.js';


describe('CertificadoService', () => {
    let repository;
    let service;


    beforeEach(() => {
        repository = {
            buscarAluno: jest.fn()
        };


        service = new CertificadoService(repository);
    });


    it('deve emitir certificado para aluno com média igual a 7', async () => {
        // Arrange
        const aluno = criarAluno({
            media: 7
        });


        repository.buscarAluno.mockResolvedValue(aluno);


        // Act
        const resultado = await service.emitirCertificado(1);


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('deve emitir certificado para aluno com média acima de 7', async () => {
        // Arrange
        const aluno = criarAluno({
            media: 9
        });


        repository.buscarAluno.mockResolvedValue(aluno);


        // Act
        const resultado = await service.emitirCertificado(1);


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('não deve emitir certificado para média abaixo de 7', async () => {
        // Arrange
        const aluno = criarAluno({
            media: 6.9
        });


        repository.buscarAluno.mockResolvedValue(aluno);


        // Act
        const resultado = service.emitirCertificado(1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow(
                'Aluno não atingiu a média mínima para certificação'
            );
    });


    it('deve rejeitar quando o aluno não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(null);


        // Act
        const resultado = service.emitirCertificado(1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Aluno não encontrado');
    });
});