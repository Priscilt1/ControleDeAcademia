const fs = require('fs')
const data = require("./data.json")
const { age } = require('./utils')
const Intl = require('intl')


//show
exports.show = function (req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado!")


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        // o split serve para pegar uma string e transformar em um array
        services: foundInstructor.services.split(","),
        // formatacao da data - tive que instalar o intl no npm e importar ele no arquivo para resolver o bug
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor })
}
//create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body


    birth = Date.parse(birth)
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

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na gravação!")

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}