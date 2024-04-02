const UsersManager = require("./data/fs/UserManager.js")
const users = new UsersManager()


async function router(req, res){
    const url = req.url;
    console.log(url);
    const options = { "Content-Type" : "text/plain" };
    switch (url) {
        case "/":
            res.writeHead(200, options).end("API CONECTADA");
            break;
        case "/api/users":
        const all = await users.read()
        res.writeHead(200,options).end(JSON.stringify(all))
            break;
        default:
            res.writeHead(404, options).end("RUTA NO ENCONTRADA")
            break;
    }
}

module.exports = router;