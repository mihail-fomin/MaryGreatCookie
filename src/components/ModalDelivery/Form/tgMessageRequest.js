import { API_URI, POSTFIX } from "../../../const";


export async function submitForm(userData, order) {


  const bodyObject = {
    name: userData.name,
    phone: userData.phone,
    format: userData.format,
    adress: userData.adress,
    floor: userData.floor,
    intercom: userData.intercom,
    comments: userData.comments,
    productArray: order,
  }

  const body = JSON.stringify(bodyObject)

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
