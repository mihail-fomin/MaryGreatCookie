export const validateDeliveryForm = (values) => {
	const errors = {};
	const phonePatern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

	if (!values.name) {
		errors.name = 'Заполните поле "Имя"';
	} else if (
		!/^[-A-ZА-Я' ]+?$/iu.test(values.name)
	) {
		errors.name = 'Некорректное имя'
	}


	if (!values.phone) {
		errors.phone = 'Заполните поле "Телефон"';
	} else if (
		!phonePatern.test(values.phone)
	) {
		errors.phone = 'Некорректный телефон'
	}

	if (values.format === 'delivery' && !values.adress) {
		errors.adress = 'Заполните поле "Адрес"';
	}

	return errors
}