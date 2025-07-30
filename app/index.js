const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')

const connection = mysql.createConnection(config)
const createTableSql = `CREATE TABLE IF NOT EXISTS people(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY (id)
)`
connection.query(createTableSql)
connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    
    const insertSql = `INSERT INTO people(name) values('Henrique')`
    connection.query(insertSql)
    
    const selectSql = `SELECT name FROM people`
    connection.query(selectSql, (err, results) => {
        if (err) {
            console.error('Erro na consulta:', err)
            res.send('<h1>Erro ao consultar banco de dados</h1>')
            return
        }
        
        let nomes = '<ul>'
        results.forEach(row => {
            nomes += `<li>${row.name}</li>`
        })
        nomes += '</ul>'
        
        const html = `
            <h1>Full Cycle Rocks!</h1>
            <h2>Lista de nomes:</h2>
            ${nomes}
        `
        
        res.send(html)
        connection.end()
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
