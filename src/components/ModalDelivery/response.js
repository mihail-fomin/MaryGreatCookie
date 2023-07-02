import { API_URI, POSTFIX } from "../../const";

async function getToken() {
  try {
    const tokenResponse = await fetch(`${API_URI}${POSTFIX}/token`);
    if (!tokenResponse.ok) {
      throw new Error(`Ошибка ${tokenResponse.statusText}`);
    }

    const tokenText = await tokenResponse.text(); // Получаем текст ответа
    const cleanedToken = tokenText.replace(/"/g, ""); // Удаляем кавычки

    return cleanedToken; // Возвращаем токен без кавычек
  } catch (error) {
    console.error(error);
    throw error; // Перебрасываем ошибку для обработки выше
  }
}

export async function submitForm(data, order) {
  console.log('data: ', data);
  console.log('order: ', order);


  let formatBody = ({
    name,
    phone,
    format,
    floor,
    adress,
    intercom,
    comments,
    order,
  }) => `
		<strong>Заявка с сайта</strong>
		<b>Отправитель:</b> <i>${name}</i>
		<b>Телефон:</b> <i>${phone}</i>
		<b>Способ передачи:</b> ${format === 'delivery' ? 'Доставка' : 'Самовывоз'}
		<b>Адрес:</b> <i>${adress}</i>
		<b>Этаж:</b> <i>${floor}</i>
		<b>Домофон:</b> <i>${intercom}</i>
		<b>Комментарии к заказу:</b> <i>${comments}</i>
		<b>Товары:</b> ${JSON.stringify(order)}	
	`

  let body = formatBody({
    name: data.name,
    phone: data.phone,
    format: data.format,
    adress: data.adress,
    floor: data.floor,
    intercom: data.intercom,
    comments: data.comments,
    order: order,
  })


  try {
    const token = await getToken()
    const response = await fetch(`https://api.telegram.org/${token}/sendMessage`, {
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
      throw new Error(`Ошибка ${response.statusText}`);
    }

    return await response.json()
  } catch (e) {
    return e.message
  }
}
