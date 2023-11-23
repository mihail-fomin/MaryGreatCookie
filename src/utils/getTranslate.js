import categoryTranslations from '../assets/category.json'

export function getCategoryTranslate(category) {
  const categoryObject = categoryTranslations.find(el => el.rus === category)
  return categoryObject.image || category
}