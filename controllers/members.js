const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')
const Intl = require('intl')

exports.index = function (req, res) {
    return res.render("Members/index", {Members: data.Members})
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.Members.find(function (Member) {
        return Member.id == id
    })

    if (!foundmember) return res.send("Membro não encontrado!")

    const Member = {
        ...foundMember,
        age: age(foundMember.birth)
    }

    return res.render("Members/show", { Member })
}

exports.create = function (req, res) {
    return res.render ('members/create')
}

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
    const id = Number(data.Members.length + 1)


    data.Members.push({
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

        return res.redirect("/Members")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.Members.find(function (Member) {
        return Member.id == id
    })

    if (!foundMember) return res.send("Membro não encontrado!")

    const Member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('Members/edit', {Member})
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.Members.find(function (Member, foundIndex) {
        if (id == Member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Membro não encontrado!")

    const Member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.Members[index] = Member
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Escreva o erro!")

        return res.redirect(`/Members/${ id }`)
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredMembers = data.Members.filter(function(Member){
        return Member.id != id
    })

    data.Members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Escreva o erro!")

        return res.redirect("/Members")
    })
}