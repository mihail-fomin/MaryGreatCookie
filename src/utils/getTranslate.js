import categoryTranslations from '../assets/category.json'

export function getCategoryTranslate(category) {
  console.log('category: ', category);
  const categoryObject = categoryTranslations.find(el => el.rus === category)
  console.log('categoryObject: ', categoryObject);
  return categoryObject.image || category
}