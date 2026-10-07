# E-learning Service Tests

Projeto acadêmico que implementa e testa as regras de negócio de uma plataforma de e-learning: matrícula, turmas, trancamento de disciplinas e emissão de certificados.

## Tecnologias

- Node.js (ES Modules)
- Jest, para testes automatizados e cobertura de código

## Regras de negócio

Serviço   --   Regra 

| Matrícula -- A matrícula só é permitida se o aluno tiver concluído todos os pré-requisitos da disciplina. 

| Turma -- A matrícula na turma só é permitida se houver vagas disponíveis. 

| Trancamento -- O trancamento só é permitido em até 30 dias após o início da disciplina. 

| Certificado -- O certificado só é emitido para alunos com média igual ou superior a 7. 

Em todos os serviços, o aluno (e a disciplina ou turma, quando aplicável) precisa existir. Caso contrário, é retornado um erro.

## Estrutura do projeto

```
src/
  services/         Regras de negócio
tests/
  factories/        Dados de exemplo para os testes
  *.test.js         Testes de cada serviço
```

## Como executar

Instalar as dependências:

```bash
npm install
```

Executar os testes:

```bash
npm test
```

Executar os testes com relatório de cobertura:

```bash
npm run test:coverage
```

## Organização do trabalho

O desenvolvimento foi dividido entre os integrantes do grupo, e cada um trabalhou em uma branch própria. Ao final, todas as branches foram integradas à `main` e a suíte completa de testes foi executada.
