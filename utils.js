module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  // convertendo o formato de milisegundo por yyyy-mm-dd   
  date: function(timestamp) {
    //date(instructor.birth)
    const date = new Date (timestamp)  
    //instructor.birth = 09329832837287483748739483
    //date(instructor.bith)
    //return yyyy-mm-dd

    //o UTC deixa a data universal 
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate ()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  }
}
