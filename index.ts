const server = Bun.serve({
    port: process.env.PORT ?? 3050,
    async fetch(req) {
        return new Response("API de BUN está funcionando correctamente.");
    } 
})

console.log(`Server is running on ${server.url}:${server.port}`);