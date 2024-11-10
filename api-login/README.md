# Hidden Secrets - api

Este é um projeto Node.js utilizando TypeScript e PostgreSQL como banco de dados.

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm (geralmente vem com Node.js)

## Configuração do Banco de Dados

1. Instale o PostgreSQL caso ainda não tenha:
   - Windows: Baixe o instalador em [postgresql.org](https://www.postgresql.org/download/windows/)


2. Crie um banco de dados chamado "projetopratico":
```sql
CREATE DATABASE projetopratico;
```

3. Configure as credenciais do banco de dados:
   - Usuário: postgres
   - Senha: root
   - Porta: 5432

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DO_PROJETO]
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto TypeScript:
```bash
npm run build
```

4. Inicie o projeto:
```bash
npm run start
```

## Estrutura da Conexão com o Banco

O projeto utiliza Sequelize como ORM. A conexão é configurada da seguinte forma:

```typescript
import { Sequelize } from "sequelize";

class Database {
  instance: Sequelize;

  constructor() {
    this.instance = new Sequelize("projetopratico", "postgres", "root", {
      host: "localhost",
      dialect: "postgres",
      port: 5432,
      logging: false,
    });
  }
}
```

## Scripts Disponíveis

- `npm run build` - Compila o projeto TypeScript
- `npm run start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento (se disponível)


## Troubleshooting

Se você encontrar erros de conexão com o banco de dados, verifique:

1. Se o PostgreSQL está rodando
2. Se as credenciais estão corretas
3. Se o banco de dados foi criado
4. Se a porta 5432 está disponível

