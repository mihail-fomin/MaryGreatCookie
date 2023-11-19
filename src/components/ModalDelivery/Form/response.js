import { API_URI, POSTFIX } from "../../../const";
import db from "../../../store/db";


// async function getToken() {
//   try {
//     const tokenResponse = await fetch(`${API_URI}${POSTFIX}/token`);
//     if (!tokenResponse.ok) {
//       throw new Error(`Ошибка ${tokenResponse.statusText}`);
//     }

//     const tokenText = await tokenResponse.text(); // Получаем текст ответа
//     const cleanedToken = tokenText.replace(/"/g, ""); // Удаляем кавычки

//     return cleanedToken; // Возвращаем токен без кавычек
//   } catch (error) {
//     console.error(error);
//     throw error; // Перебрасываем ошибку для обработки выше
//   }
// }

export async function submitForm(userData, order) {


  let body = formatBody({
    name: userData.name,
    phone: userData.phone,
    format: userData.format,
    adress: userData.adress,
    floor: userData.floor,
    intercom: userData.intercom,
    comments: userData.comments,
    order: order,
  })


  try {
    const response = await fetch(`${API_URI}/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    if (!response.ok) {
      throw new Error(`Ошибка ${response.statusText}`);
    }

    return await response.json()
  } catch (e) {
    return e.message
  }
}
