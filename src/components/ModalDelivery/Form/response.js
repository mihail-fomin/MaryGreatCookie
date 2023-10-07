import { API_URI, POSTFIX } from "../../../const";
import db from "../../../store/db";


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

export async function submitForm(data, order, totalPrice, totalCount) {

  let formatBody = ({
    name,
    phone,
    format,
    floor,
    adress,
    intercom,
    comments,
    order,
    totalPrice,
    totalCount
  }) => `
		<strong>Заявка с сайта</strong>
		<b>Отправитель:</b> <i>${name}</i>
		<b>Телефон:</b> <i>${phone}</i>
		<b>Способ передачи:</b> ${format === 'delivery' ? `<i>Доставка</i> ` : `<i>Самовывоз</i>`}
    ${format === 'delivery'
      ? `<b>Адрес:</b> <i>${adress}</i>
		     <b>Этаж:</b> <i>${floor}</i>
		     <b>Домофон:</b> <i>${intercom}</i>`
      : ``}
    ${comments.length > 0
      ? `<b> Комментарии к заказу:</b> <i>${comments}</i>`
      : ``}
		${printOrder(order)}
    Итого: <b>${totalCount}</b> товаров на сумму <b>${totalPrice}</b> рублей	
  `

  let printOrder = (order) => {
    let str = `<b> Товары: </> `
    order.forEach(el => {
      let item = db.find(item => item.id === el.id)
      str += `<b> ${item.title}</> `;
      str += ` <i> в количестве ${el.count} шт,</> ` + "\n";
    })
    return str
  }

  let body = formatBody({
    name: data.name,
    phone: data.phone,
    format: data.format,
    adress: data.adress,
    floor: data.floor,
    intercom: data.intercom,
    comments: data.comments,
    order: order,
    totalPrice: totalPrice,
    totalCount: totalCount,
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
