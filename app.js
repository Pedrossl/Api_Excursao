import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Destino } from './models/Destino.js'
import { Cliente } from './models/Cliente.js'
import { Excursao } from './models/Excursao.js'
import { Reserva } from './models/Reserva.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');

    // Pode-se indicar a sincronização das models uma por uma
    await Destino.sync()
    await Cliente.sync()
//    await Excursao.sync({force: true})
    await Excursao.sync()
    await Reserva.sync()
//    await sequelize.sync();  // cria as tabelas do sistema (a partir dos modelos - se não existirem)
//    await sequelize.sync({alter: true});  // Verifica se há alterações e atualiza as tabelas se houver
//    await sequelize.sync({force: true});  // recria as tabelas, mesmo se já existirem
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API Agência de Turismo')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})