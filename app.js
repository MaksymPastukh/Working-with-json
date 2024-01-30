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
  // 1 - Пример вывода: «Алексей Чеканов, Москва».
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
  let backend = specialization.find(
    item => item.name.toLowerCase() === "backend"
  )

  // Находим id города

  let moscow = cities.find(item => item.name.toLowerCase() === "москва")

  // 2 - Найдите среди пользователей всех дизайнеров, которые владеют Figma и выведите данные о них в консоль с помощью getInfo.

  if (designers) {
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

  // 3 - Найдите первого попавшегося разработчика, который владеет React. Выведите в консоль через getInfo данные о нем.

  if (frontend) {
    let reactDeveloper = person.find(item => {
      if (item.personal.specializationId === frontend.id) {
        return item.skills.some(skill => skill.name.toLowerCase() === "react")
      }
    })
    console.log(reactDeveloper)
  }

  // 4 - Проверьте, все ли пользователи старше 18 лет. Выведите результат проверки в консоль.

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

    return console.log(Array(yersPerson).every(el => el >= 18))
  })

  // 5 - Найдите всех backend-разработчиков из Москвы, которые ищут работу на полный день и отсортируйте их в порядке возрастания зарплатных ожиданий.

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
      .sort((a, b) => {
        let salaryA = a.request.find(
          acc => acc.name.toLowerCase() === "зарплата" && acc.value
        )

        let salaryB = b.request.find(
          acc => acc.name.toLowerCase() === "зарплата" && acc.value
        )

        return salaryA.value - salaryB.value
      })

    console.log(backendMoscow)
  }

  // 6 - Найдите всех дизайнеров, которые владеют Photoshop и Figma одновременно на уровне не ниже 6 баллов.

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

    console.log(allDesigner)
  }

  // 7 - Соберите команду для разработки проекта

  if (designers && frontend && backend) {
    let maxFigmaUser = 0
    let maxFigmaLevel = null

    let designer = person.filter(item => {
      let isFigma = item.skills.find(el => el.name.toLowerCase() === "figma")

      if (isFigma && isFigma.level >= maxFigmaLevel) {
        maxFigmaLevel = isFigma.level
        maxFigmaUser = item
      }

      return item.personal.specializationId === designers.id && isFigma
    })
    let maxAngularUser = 0
    let maxAngularLevel = null

    let frontends = person.filter(item => {
      let isAngular = item.skills.find(
        el => el.name.toLowerCase() === "angular"
      )

      if (isAngular && isAngular.level >= maxAngularLevel) {
        maxAngularLevel = isAngular.level
        maxAngularUser = item
      }

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

    console.log([maxFigmaUser, maxAngularUser, maxGoUser])
  }
}
