import { jest } from '@jest/globals';


import { TurmaService } from '../src/services/turmaService.js';


import { criarAluno } from './factories/alunoFactory.js';
import { criarTurma } from './factories/turmaFactory.js';


describe('TurmaService', () => {
    let repository;
    let service;


    beforeEach(() => {
        repository = {
            buscarAluno: jest.fn(),
            buscarTurma: jest.fn()
        };


        service = new TurmaService(repository);
    });


    it('deve matricular aluno quando houver vaga', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        repository.buscarTurma.mockResolvedValue(
            criarTurma({
                capacidadeMaxima: 30,
                alunosMatriculados: 29
            })
        );


        // Act
        const resultado = await service.matricularNaTurma(1, 1);


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('deve rejeitar matrícula quando a turma estiver lotada', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        repository.buscarTurma.mockResolvedValue(
            criarTurma({
                capacidadeMaxima: 30,
                alunosMatriculados: 30
            })
        );


        // Act
        const resultado = service.matricularNaTurma(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Turma sem vagas disponíveis');
    });


    it('deve rejeitar quando o aluno não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(null);


        // Act
        const resultado = service.matricularNaTurma(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Aluno não encontrado');
    });


    it('deve rejeitar quando a turma não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(
            criarAluno()
        );


        repository.buscarTurma.mockResolvedValue(null);


        // Act
        const resultado = service.matricularNaTurma(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Turma não encontrada');
    });
});
