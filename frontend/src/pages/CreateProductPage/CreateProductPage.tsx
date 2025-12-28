import ProductForm from '@/components/ProductForm/ProductForm'
import { useCreateProduct } from '@/hooks/useProducts'
import type { ProductFormData } from '@/types/types'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

interface CreateProductPageProps {}

const CreateProductPage: FC<CreateProductPageProps> = () => {
  const { mutateAsync, error, data } = useCreateProduct()
  const navigate = useNavigate()

  console.log(error)
  console.log(data)

  const handleSubmit = async (data: ProductFormData) => {
    await mutateAsync(data)

    navigate('/')
  }

  return <ProductForm onSubmit={handleSubmit} />
}

export default CreateProductPage
