import { TodoList, Item } from "./core";

const list = new TodoList();

const server = Bun.serve({
    port: 3000,

    async fetch(req) {
        const url = new URL(req.url);
        const method = req.method;

        // GET /todo
        if (
            url.pathname === "/todo" &&
            method === "GET"
        ) {
            return Response.json(
                list.getItems()
            );
        }

        // POST /todo
        if (
            url.pathname === "/todo" &&
            method === "POST"
        ) {
            const body = await req.json();

            return Response.json(
                list.addItem(
                    new Item(
                        null,
                        body.title
                    )
                )
            );
        }

        // PUT /todo/:id
        if (
            url.pathname.startsWith("/todo/") &&
            method === "PUT"
        ) {
            const id = Number(
                url.pathname.split("/")[2]
            );

            const body = await req.json();

            return Response.json(
                list.updateItem(
                    id,
                    body.title
                )
            );
        }

        // DELETE /todo/:id
        if (
            url.pathname.startsWith("/todo/") &&
            method === "DELETE"
        ) {
            const id = Number(
                url.pathname.split("/")[2]
            );

            return Response.json(
                list.deleteItem(id)
            );
        }

        return new Response(
            "Rota não encontrada",
            { status: 404 }
        );
    },
});

console.log(
    `Servidor rodando em http://localhost:${server.port}`
);