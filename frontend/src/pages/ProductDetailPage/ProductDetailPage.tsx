import ProductForm from '@/components/ProductForm/ProductForm'
import { useProduct, useUpdateProduct } from '@/hooks/useProducts'
import type { ProductFormData } from '@/types/types'
import type { FC } from 'react'
import { useParams } from 'react-router'

interface ProductDetailPageProps {}

const ProductDetailPage: FC<ProductDetailPageProps> = () => {
  const { id } = useParams()

  const { data } = useProduct(Number(id))
  const { mutateAsync: updateProduct } = useUpdateProduct()

  const handleSubmit = async (data: ProductFormData) => {
    await updateProduct({ id: Number(id), data })
  }

  return <ProductForm initialValues={data} onSubmit={handleSubmit} />
}

export default ProductDetailPage
