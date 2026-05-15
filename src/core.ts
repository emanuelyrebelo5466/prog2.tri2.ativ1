import {Database} from "bun:sqlite";

const db = new Database("database.sqlite");

const sql = `
    CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    TITLE VARCHAR (108))
`
db.query(sql).run()

const insertItem = db.query("INSERT INTO todo (title) VALUES ($title)")

class Item {
    constructor(public title: string) {}
}

class TodoList {
    private items: Item[] = []

    addItem(item: Item) {
        this.items.push(item)
        insertItem.run({ $title: item.title })
    }

    removeItem(index: number){
        this.items.splice(index, 1)
    }

    getItems() {
        return Array.from(this.items)
    }
}

const list = new TodoList ()
list.addItem(new Item("danca"))

 