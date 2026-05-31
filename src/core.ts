import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

db.query(`
CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
)
`).run();

export class Item {
    constructor(
        public id: number | null,
        public title: string
    ) {}
}

export class TodoList {

    addItem(item: Item) {
        const query = db.query(
            "INSERT INTO todo (title) VALUES (?)"
        );

        query.run(item.title);

        return {
            message: "Item adicionado!"
        };
    }

    getItems() {
        const query = db.query(
            "SELECT * FROM todo"
        );

        return query.all();
    }

    deleteItem(id: number) {
        const query = db.query(
            "DELETE FROM todo WHERE id = ?"
        );

        query.run(id);

        return {
            message: `Item ${id} removido!`
        };
    }

    updateItem(
        id: number,
        newTitle: string
    ) {
        const query = db.query(
            "UPDATE todo SET title = ? WHERE id = ?"
        );

        query.run(newTitle, id);

        return {
            message: `Item ${id} atualizado!`
        };
    }
}