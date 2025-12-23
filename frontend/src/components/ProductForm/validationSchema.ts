import * as yup from 'yup'

export const productSchema = yup.object({
  name: yup.string().required('Название обязательно').min(3, 'Минимум 3 символа'),
  price: yup
    .number()
    .required('Цена обязательна')
    .positive('Цена должна быть положительной')
    .typeError('Цена должна быть числом'),
  description: yup.string().optional().default(''),
  characteristics: yup
    .array()
    .of(
      yup.object({
        article: yup.string().required('Артикул обязателен'),
        type: yup.string().required('Тип обязателен'),
        material: yup.string().required('Материал обязателен'),
        height: yup
          .number()
          .required('Высота обязательна')
          .positive('Высота должна быть положительной')
          .typeError('Высота должна быть числом'),
        width: yup
          .number()
          .required('Ширина обязательна')
          .positive('Ширина должна быть положительной')
          .typeError('Ширина должна быть числом'),
        country: yup.string().required('Страна обязательна'),
      }),
    )
    .min(1, 'Добавьте хотя бы одну характеристику')
    .required('Характеристики обязательны'),
})