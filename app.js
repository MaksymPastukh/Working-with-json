let cities = [],
  person = [],
  specialization = []

Promise.all([
  fetch("cities.json"),
  fetch("person.json"),
  fetch("specializations.json"),
])
  .then(async ([citiesResponse, personResponse, specializationResponse]) => {
    const citiesJson = await citiesResponse.json()

    const personJson = await personResponse.json()
    const specializationJson = await specializationResponse.json()
    return [citiesJson, personJson, specializationJson]
  })
  .then(response => {
    cities = response[0]
    person = response[1]
    specialization = response[2]

    let combined = person.concat(cities)
    getInfo.call(combined)
  })

function getInfo() {
  console.log(
    `${this[0].personal.firstName} ${this[0].personal.lastName}, ${this[16].name}`
  )

  // Находим id професии
  let designers = specialization.find(
    item => item.name.toLowerCase() === "designer"
  )
  let frontend = specialization.find(
    item => item.name.toLowerCase() === "frontend"
  )

  // Делаем проверку
  if (designers) {
    // Если такая професия существует тогда используем метод фильтра`1ции массива
    let result = person.filter(item => {
      return (
        // Проверяем у каждого элимента списка
        // Если человека имеет ID професиии равное ID професси designer  и
        item.personal.specializationId === designers.id &&
        // Если его скил ( умение ) работать равны названию программы Figma
        item.skills.some(skills => skills.name.toLowerCase() === "figma")
        // То возвращаем данный обьект
      )
    })

    console.log(result) // Делаем вывод в консоль
  }

  if (frontend) {
    let reactDeveloper = person.find(item => {
      if (item.personal.specializationId === frontend.id) {
        return item.skills.some(skill => skill.name.toLowerCase() === "react")
      }
    })
    console.log(reactDeveloper)
  }
}
