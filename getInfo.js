function getInfo() {
	// console.log(`${this[0].personal.firstName} ${this[0].personal.lastName}, ${this[16].name}`)
	// Находим id професии
	let designers = specialization.find(
		item => item.name.toLowerCase() === 'designer'
	)
	let frontend = specialization.find(
		item => item.name.toLowerCase() === 'frontend'
	)

	// Делаем проверку
	if (designers) {
		// Если такая профеcсия существует тогда используем метод фильтрации массива
		let result = person.filter(item => {
			return (
				// Проверяем у каждого элимента списка
				// Если человека имеет ID професиии равное ID професси designer  и
				item.personal.specializationId === designers.id &&
				// Если его скилл ( умение ) работать равны названию программы Figma
				item.skills.some(skills => skills.name.toLowerCase() === 'figma')
				// То возвращаем данный обьект
			)
		})
		console.log(result) // Делаем вывод в консоль
	}

	if (frontend) {
		let reactDeveloper = person.find(item => {
			if (item.personal.specializationId === frontend.id) {
				return item.skills.some(skill => skill.name.toLowerCase() === 'react')
			}
		})
		console.log(reactDeveloper)
	}
}
