// arquivo responsavel por exportar funcoes


// guardando os dados
const fs = require('fs')
const data = require("./data.json")



// Create
// estrutura de validacao 
exports.post =  function (req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if (req.body[key] == "") {
            return res.send ('Por favor, preencha todos os campos!')
        }
    }

// destruturando o req.body
let {avatar_url, birth, name, services, gender} = req.body


// configuração para a data de aniversario na entrada de dados 
birth = Date.parse (birth)
const created_at = Date.now()
const id = Number(data.instructors.length + 1)


data.instructors.push({
    id,
    name,
    avatar_url,
    birth,
    created_at,
    gender,
    services
})

// writeFile = escrever o arquivo 
// callback function serve para nao bloquear o seu app enquanto faz uma leitura de dados, função executada depois de certo tempo
// null, 2 formatacao para a melhor visualizacao dos objetivos no data.json
fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ("Erro na gravação!")

    return res.redirect("/instructors")
})

    // return res.send(req.body)
}