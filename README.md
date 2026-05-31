# prog2.tri2.ativ1

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.11. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


# prog2.tri2.ativ2

Essa atividade teve como objetivo alterar o funcionamento do ToDo List feito em aula para que ele deixasse de salvar os dados em arquivo .json e passasse a usar um banco de dados SQLite. Além disso, o sistema foi organizado usando orientação a objetos, criando uma classe responsável pelas funções da lista de tarefas e outra para representar os itens. O projeto funciona como uma API, permitindo adicionar, listar, atualizar e remover tarefas através de rotas HTTP.

---

## Como o projeto funciona

O projeto foi dividido em dois arquivos principais:

### `core.ts`

Esse arquivo ficou responsável pela lógica do sistema e pelas operações no banco de dados.

Nele foi criada a classe TodoList, que contém as funções principais do sistema, como:

- `addItem()` → adiciona uma tarefa ao banco
- `getItems()` → retorna as tarefas cadastradas
- `updateItem()` → atualiza uma tarefa existente
- `deleteItem()` → remove uma tarefa do banco

Também foi criada a classe `Item`, responsável por representar uma tarefa.

Além disso, é nesse arquivo que acontece a conexão com o banco SQLite e a criação da tabela todo.

A tabela é criada automaticamente ao iniciar o projeto:

```sql
CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
)
```

### `index.ts`

Esse arquivo ficou responsável pelas rotas da API.

Nele é criado o servidor usando Bun.serve(), e cada rota chama os métodos da classe TodoList.

Rotas implementadas:

|  Método  |    Rota    |     Função       |
|----------|------------|------------------|
| `GET`    | `/todo`    | Listar tarefas   |
| `POST`   | `/todo`    | Adicionar tarefa |
| `PUT`    | `/todo/:id`| Atualizar tarefa |
| `DELETE` | `/todo/:id`| Remover tarefa   |

Dessa forma, o index.ts cuida das rotas e o core.ts cuida da lógica e do banco de dados.

---

## Como as funções foram implementadas

### `addItem(item)`

Essa função adiciona uma tarefa no banco de dados utilizando um comando `INSERT`.

Exemplo:

```sql
INSERT INTO todo (title) VALUES (?)
```

---

### `getItems()`

Essa função busca todos os itens cadastrados no banco de dados.

Exemplo:

```sql
SELECT * FROM todo
```

---

### `updateItem(id, newTitle)`

Essa função atualiza o título de uma tarefa utilizando o `id`.

Exemplo:

```sql
UPDATE todo
SET title = ?
WHERE id = ?
```

---

### `deleteItem(id)`

Essa função remove uma tarefa do banco de dados utilizando o `id`.

Exemplo:

```sql
DELETE FROM todo
WHERE id = ?
```

---

## Banco de dados

O projeto utiliza um banco SQLite chamado:

```txt
database.sqlite
```

A tabela é criada automaticamente ao iniciar o projeto:

```sql
CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
)
```

## Instalar dependências

```bash
bun install
```

Em alguns computadores pode ser necessário instalar novamente as dependências do Bun antes de executar o projeto.

---

## Rodar o projeto

```bash
bun run src\index.ts
```

Se estiver funcionando corretamente, o terminal mostrará algo parecido com:

```txt
Servidor rodando em http://localhost:3000
```

---

## Como testar as rotas

### Listar tarefas

Abrir no navegador:

```txt
http://localhost:3000/todo
```

### Adicionar tarefa

```powershell
Invoke-RestMethod `
-Uri "http://localhost:3000/todo" `
-Method POST `
-ContentType "application/json" `
-Body '{"title":"estudar log para prova de física 08/06"}'
```

### Atualizar tarefa

```powershell
Invoke-RestMethod `
-Uri "http://localhost:3000/todo/1" `
-Method PUT `
-ContentType "application/json" `
-Body '{"title":"Limpar o fogão quando chegar em casa"}'
```

### Remover tarefa

```powershell
Invoke-RestMethod `
-Uri "http://localhost:3000/todo/1" `
-Method DELETE
```

---

## Considerações Finais 

Com essas alterações, os dados deixaram de ser armazenados em um arquivo .json e passaram a ser salvos no banco SQLite, fazendo com que as informações permaneçam salvas mesmo após fechar o programa.

Além disso, o projeto passou a funcionar através de uma API e utilizando orientação a objetos para organizar melhor o código.