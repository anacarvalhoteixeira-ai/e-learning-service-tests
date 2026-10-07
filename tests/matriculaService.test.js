import { jest } from '@jest/globals';


import { MatriculaService } from '../src/services/matriculaService.js';


import { criarAluno } from './factories/alunoFactory.js';
import { criarDisciplina } from './factories/disciplinaFactory.js';


describe('MatriculaService', () => {
    let repository;
    let service;


    beforeEach(() => {
        repository = {
            buscarAluno: jest.fn(),
            buscarDisciplina: jest.fn()
        };


        service = new MatriculaService(repository);
    });


    it('deve matricular aluno quando todos os pré-requisitos forem cumpridos', async () => {
        // Arrange
        const aluno = criarAluno({
            disciplinasConcluidas: ['HTML', 'Lógica']
        });


        const disciplina = criarDisciplina({
            preRequisitos: ['HTML', 'Lógica']
        });


        repository.buscarAluno.mockResolvedValue(aluno);
        repository.buscarDisciplina.mockResolvedValue(disciplina);


        // Act
        const resultado = await service.matricular(1, 1);


        // Assert
        expect(resultado.sucesso).toBe(true);
        expect(resultado.mensagem).toBe(
            'Aluno matriculado com sucesso'
        );
    });


    it('deve rejeitar matrícula quando faltar pré-requisito', async () => {
        // Arrange
        const aluno = criarAluno({
            disciplinasConcluidas: ['HTML']
        });


        const disciplina = criarDisciplina({
            preRequisitos: ['HTML', 'Lógica']
        });


        repository.buscarAluno.mockResolvedValue(aluno);
        repository.buscarDisciplina.mockResolvedValue(disciplina);


        // Act
        const resultado = service.matricular(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Pré-requisito não cumprido');
    });


    it('deve permitir matrícula quando a disciplina não possui pré-requisitos', async () => {
        // Arrange
        const aluno = criarAluno();


        const disciplina = criarDisciplina({
            preRequisitos: []
        });


        repository.buscarAluno.mockResolvedValue(aluno);
        repository.buscarDisciplina.mockResolvedValue(disciplina);


        // Act
        const resultado = await service.matricular(1, 1);


        // Assert
        expect(resultado.sucesso).toBe(true);
    });


    it('deve rejeitar quando o aluno não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(null);


        // Act
        const resultado = service.matricular(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Aluno não encontrado');
    });


    it('deve rejeitar quando a disciplina não existir', async () => {
        // Arrange
        repository.buscarAluno.mockResolvedValue(criarAluno());
        repository.buscarDisciplina.mockResolvedValue(null);


        // Act
        const resultado = service.matricular(1, 1);


        // Assert
        await expect(resultado)
            .rejects
            .toThrow('Disciplina não encontrada');
    });
});
