import { useProducts } from '@/hooks/useProducts'
import { Button, Card } from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import { DollarSignIcon } from 'lucide-react'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

interface ProductListPageProps {}

const ProductListPage: FC<ProductListPageProps> = () => {
  const navigate = useNavigate()
  const { data } = useProducts()

  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between w-full'>
        <Title className='text-neutral-900 ![mb-0]'>Продукты</Title>

        <Button type='primary' onClick={() => navigate('/products/create')}>
          Добавить продукт
        </Button>
      </div>

      <div className='flex flex-col w-full h-full gap-5'>
        {(data || []).map((product) => (
          <Card key={product.id} className='w-full h-fit p-3'>
            <div className='flex justify-between'>
              <Link>
                <h2 className='text-2lx'>{product.name}</h2>
              </Link>

              <div className=' flex items-center gap-1 text-green-600'>
                <DollarSignIcon />
                {usdFormatter.format(product.price)}
              </div>
            </div>

            <div className='text-neutral-900'>{product.description}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductListPage
