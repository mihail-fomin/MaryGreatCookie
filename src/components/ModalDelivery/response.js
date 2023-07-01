

export async function submitForm(data) {
	const { name, phone } = data
	console.log('name: ', name);

	let formatBody = ({ name, phone }) => `
		<strong>Заявка с сайта</strong>
		<b>Отправитель:</b> <i>${name}</i>
		<b>Телефон:</b> <i>${phone}</i>
	`
	// <b>Способ передачи:</b> ${format === 'delivery' ? 'Доставка' : 'Самовывоз'} n/
	// <b>Комментарии к заказу:</b> ${comments}

	let body = formatBody({
		name: name,
		phone: phone,

	})


	try {
		const response = await fetch('https://api.telegram.org/bot5775183225:AAGUPuyf5PHRfSa5Zoux-zz5_KWIx1vHAPo/sendMessage',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					chat_id: "-1001759583869",
					text: body,
					parse_mode: "html",
				})
			}
		)
		if (!response.ok) {
			throw new Error(`Ошибка ${response.statusText}`)
		}

		return await response.json()
	} catch (e) {
		return e.message
	}
}
