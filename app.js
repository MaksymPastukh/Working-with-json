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
  console
    .log
    // `${this[0].personal.firstName} ${this[0].personal.lastName}, ${this[16].name}`
    ()

  // Находим id професии
  let designers = specialization.find(
    item => item.name.toLowerCase() === "designer"
  )
  let frontend = specialization.find(
    item => item.name.toLowerCase() === "frontend"
  )
  let backend = specialization.find(
    item => item.name.toLowerCase() === "backend"
  )

  // Находим id города

  let moscow = cities.find(item => item.name.toLowerCase() === "москва")

  // Найдите среди пользователей всех дизайнеров, которые владеют Figma и выведите данные о них в консоль с помощью getInfo.

  if (designers) {
    // Если такая професия существует тогда используем метод фильтрации массива
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

    // console.log(result) // Делаем вывод в консоль
  }

  //Найдите первого попавшегося разработчика, который владеет React. Выведите в консоль через getInfo данные о нем.

  if (frontend) {
    let reactDeveloper = person.find(item => {
      if (item.personal.specializationId === frontend.id) {
        return item.skills.some(skill => skill.name.toLowerCase() === "react")
      }
    })
    // console.log(reactDeveloper)
  }

  let currentDate = new Date()

  person.forEach(item => {
    let dateParts = item.personal.birthday.split(".")
    let birthDay = new Date(+dateParts[2], +dateParts[1], +dateParts[0])

    let ageInMilliseconds = currentDate - birthDay,
      ageInSeconds = ageInMilliseconds / 1000,
      ageInMinutes = ageInSeconds / 60,
      ageInHourse = ageInMinutes / 60,
      ageInDays = ageInHourse / 24,
      ageInYear = ageInDays / 365

    let yersPerson = ageInYear.toFixed()
    // return console.log(Array(yersPerson).some(el => el >= 18))
  })

  if (backend && moscow) {
    let backendMoscow = person
      .filter(
        item =>
          item.personal.locationId === moscow.id &&
          item.personal.specializationId === backend.id &&
          item.request.find(
            req =>
              req.name.toLowerCase() === "тип занятости" &&
              req.value.toLowerCase() === "полная"
          )
      )
      .map(el =>
        el.request.find(
          acc => acc.name.toLowerCase() === "зарплата" && acc.value
        )
      )
      .sort((a, b) => a.value - b.value)

    // console.log(backendMoscow)
  }

  if (designers) {
    let allDesigner = person.filter(item => {
      let isFigma = item.skills.some(
        el => el.name.toLowerCase() === "figma" && el.level >= 6
      )
      let isPhotoshop = item.skills.some(
        el => el.name.toLowerCase() === "photoshop" && el.level >= 6
      )

      return (
        item.personal.specializationId === designers.id &&
        isFigma &&
        isPhotoshop
      )
    })

    // console.log(allDesigner)
  }

  if (designers && frontend && backend) {
    let designer = person.filter(item => {
      let isFigma = item.skills.some(
        el => el.name.toLowerCase() === "figma" && el.level
      )

      return item.personal.specializationId === designers.id && isFigma
    })

    let frontends = person.filter(item => {
      let isAngular = item.skills.find(
        el => el.name.toLowerCase() === "angular" && el.level
      )

      return item.personal.specializationId === frontend.id && isAngular
    })

    let maxGoUser = 0
    let maxGoLevel = null

    let backends = person.filter(item => {
      let isGo = item.skills.find(el => el.name.toLowerCase() === "go")

      if (isGo && isGo.level >= maxGoLevel) {
        maxGoLevel = isGo.level
        maxGoUser = item
      }

      return item.personal.specializationId === backend.id && maxGoUser
    })

    console.log(designer)
    console.log(frontends)
    console.log(maxGoUser)
  }
}
