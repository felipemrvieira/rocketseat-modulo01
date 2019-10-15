const express = require('express');
const server = express();

server.use(express.json());

// Middleware aplicado a todas as rotas
server.use((req, res, next) => {
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    return next();
})

// Middleware
function checkIfUserExists(req, res, next) {
    const user = users[req.params.id];
    if(!user){
        return res.status(400).json({error: 'user does not exist'})
    }
    req.user = user;
    return next();
}

server.get('/teste', (req, res) => {
    return res.json({message: 'Hello World'});
})

// Query params
server.get('/hello', (req, res) => {
    const { nome } = req.query;
    return res.json({message: `Hello ${nome}`});
})

// Route params
// server.get('/users/:id', (req, res) => {
//     const { id } = req.params
//     return res.json({message: `User ${id}`});
// })

const users = ['Felipe', 'Galvão', 'Rubem'];

// Route params get user
// Uso de middleware em rota
server.get('/users/:id', checkIfUserExists, (req, res) => {
    const { id } = req.params;
    return res.json(users[id]);
})

// Route params get all users
server.get('/users', (req, res) => {
    return res.json(users);
})

// Request body
server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users[id] = name;
    return res.json(users);
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users.splice(id, 1);

    return res.send();
})


server.listen(3000);