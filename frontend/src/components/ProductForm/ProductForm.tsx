import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Button, Card, Form, Input, InputNumber, Space } from 'antd'
import { PlusCircleIcon } from 'lucide-react'
import { productSchema } from './validationSchema'
import { emptyFormValues } from './emptyFormValues'
import { useEffect, type FC } from 'react'
import type { ProductFormData } from '@/types/types'
import CharacteristicForm from './CharacteristicForm/CharacteristicForm'

type Props = {
  initialValues?: ProductFormData
  onSubmit: (data: ProductFormData) => void
}

const ProductForm: FC<Props> = ({ onSubmit, initialValues }) => {
  const methods = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: initialValues || emptyFormValues,
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    trigger,
    watch,
    reset,
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characteristics'
  })

  const updateForm = async (data: ProductFormData) => {
    const isFormValid = await trigger()

    onSubmit(data)

    if (!isFormValid) return
  }

  useEffect(() => {
    if (!initialValues) return

    reset(initialValues)

  }, [initialValues])

  const price = watch('price')

  console.log("HELLO")

  return (
    <Card>
      <h1 className='font-bold mb-6'>Создание нового продукта</h1>
      <FormProvider {...methods}>
        <Form layout='vertical' onFinish={handleSubmit(updateForm)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Form.Item
              label='Название'
              required
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} status={fieldState.invalid ? 'error' : ''} placeholder='Название продукта' />
                )}
              />
            </Form.Item>

            <Form.Item
              label={`Цена: ${price || 0} ₽`}
              required
              validateStatus={errors.price ? 'error' : ''}
              help={errors.price?.message}
            >
              <Controller
                name='price'
                control={control}
                render={({ field, fieldState }) => (
                  <InputNumber
                    {...field}
                    status={fieldState.invalid ? 'error' : ''}
                    min={0}
                    step={100}
                    className='w-full'
                    formatter={(value) => `${value} ₽`}
                  />
                )}
              />
            </Form.Item>
          </div>

          <Form.Item
            label='Описание'
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description?.message}
          >
            <Controller
              name='description'
              control={control}
              render={({ field, fieldState }) => (
                <Input.TextArea
                  {...field}
                  status={fieldState.invalid ? 'error' : ''}
                  rows={3}
                  showCount
                  maxLength={500}
                  placeholder='Подробное описание продукта...'
                />
              )}
            />
          </Form.Item>

          <div className='border-t pt-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Характеристики продукта</h3>
              <Button
                type='dashed'
                icon={<PlusCircleIcon />}
                onClick={() =>
                  append({
                    article: `ART-${Date.now().toString().slice(-4)}`,
                    type: '',
                    material: '',
                    height: 0,
                    width: 0,
                    country: '',
                  })
                }
              >
                Добавить
              </Button>
            </div>

            {fields.map((field, index) => (
              <CharacteristicForm
                key={field.article}
                isDeleteButtonShown={fields.length > 1}
                onDelete={(index) => remove(index)}
                index={index}
              />
            ))}
          </div>

          <div className='flex justify-between items-center pt-6 border-t'>
            <div className='text-sm text-gray-500'>
              Статус: {isValid ? '✅ Готово к отправке' : '❌ Есть ошибки'} | Изменено: {isDirty ? 'Да' : 'Нет'}
            </div>

            <Space>
              <Button onClick={() => trigger()}>Проверить форму</Button>
              <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting || !isDirty} size='large'>
                {isSubmitting ? 'Отправка...' : 'Создать продукт'}
              </Button>
            </Space>
          </div>
        </Form>
      </FormProvider>
    </Card>
  )
}

export default ProductForm
