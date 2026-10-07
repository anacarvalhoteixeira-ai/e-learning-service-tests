import { jest } from '@jest/globals';


import { TrancamentoService } from '../src/services/trancamentoService.js';


import { criarAluno } from './factories/alunoFactory.js';


describe('TrancamentoService', () => {
    let repository;
    let service;


    beforeEach(() => {
        repository = {
            buscarAluno: jest.fn()
        };


        service = new TrancamentoService(repository);
    });


    it('deve permitir trancamento dentro do prazo', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        // Act
        const resultado = await service.trancarDisciplina(
            1,
            1,
            '2026-09-01',
            '2026-09-20'
        );


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('deve permitir trancamento exatamente no 30º dia', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        // Act
        const resultado = await service.trancarDisciplina(
            1,
            1,
            '2026-09-01',
            '2026-10-01'
        );


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('deve rejeitar trancamento após o prazo', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        // Act
        const resultado = service.trancarDisciplina(
            1,
            1,
            '2026-09-01',
            '2026-10-05'
        );


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Prazo para trancamento expirado');
    });


    it('deve rejeitar quando o aluno não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(null);


        // Act
        const resultado = service.trancarDisciplina(
            1,
            1,
            '2026-09-01',
            '2026-09-10'
        );


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Aluno não encontrado');
    });
});

