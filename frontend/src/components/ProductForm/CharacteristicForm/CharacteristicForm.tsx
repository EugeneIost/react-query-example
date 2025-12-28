import type { ProductFormData } from '@/types/types'
import { Button, Card, Form, Input, InputNumber } from 'antd'
import { DeleteIcon } from 'lucide-react'
import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface CharacteristicFormProps {
  isDeleteButtonShown: boolean
  index: number
  onDelete: (index: number) => void
}

const CharacteristicForm: FC<CharacteristicFormProps> = ({ isDeleteButtonShown, onDelete, index }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>()

  return (
    <Card
      className='mb-4'
      title={
        <div className='flex justify-between items-center'>
          <span>Характеристика #{index + 1}</span>
          {isDeleteButtonShown && <Button type='text' danger icon={<DeleteIcon />} onClick={() => onDelete(index)} />}
        </div>
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Form.Item
          label='Артикул'
          required
          validateStatus={errors.characteristics?.[index]?.article ? 'error' : ''}
          help={errors.characteristics?.[index]?.article?.message}
        >
          <Controller
            name={`characteristics.${index}.article`}
            control={control}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.invalid ? 'error' : ''} placeholder='ART-001' />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Тип'
          required
          validateStatus={errors.characteristics?.[index]?.type ? 'error' : ''}
          help={errors.characteristics?.[index]?.type?.message}
        >
          <Controller
            name={`characteristics.${index}.type`}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                status={fieldState.invalid ? 'error' : ''}
                placeholder='Электроника, мебель, одежда...'
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Материал'
          required
          validateStatus={errors.characteristics?.[index]?.material ? 'error' : ''}
          help={errors.characteristics?.[index]?.material?.message}
        >
          <Controller
            name={`characteristics.${index}.material`}
            control={control}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.invalid ? 'error' : ''} placeholder='Дерево, металл, пластик...' />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Страна производства'
          required
          validateStatus={errors.characteristics?.[index]?.country ? 'error' : ''}
          help={errors.characteristics?.[index]?.country?.message}
        >
          <Controller
            name={`characteristics.${index}.country`}
            control={control}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.invalid ? 'error' : ''} placeholder='Россия, Китай, Германия...' />
            )}
          />
        </Form.Item>

        <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Form.Item
            label='Высота (см)'
            required
            validateStatus={errors.characteristics?.[index]?.height ? 'error' : ''}
            help={errors.characteristics?.[index]?.height?.message}
          >
            <Controller
              name={`characteristics.${index}.height`}
              control={control}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  status={fieldState.invalid ? 'error' : ''}
                  min={0}
                  className='w-full'
                  placeholder='Высота в сантиметрах'
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label='Ширина (см)'
            required
            validateStatus={errors.characteristics?.[index]?.width ? 'error' : ''}
            help={errors.characteristics?.[index]?.width?.message}
          >
            <Controller
              name={`characteristics.${index}.width`}
              control={control}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  status={fieldState.invalid ? 'error' : ''}
                  min={0}
                  className='w-full'
                  placeholder='Ширина в сантиметрах'
                />
              )}
            />
          </Form.Item>
        </div>
      </div>
    </Card>
  )
}

export default CharacteristicForm
