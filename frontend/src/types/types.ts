export interface Product {
  id: number
  name: string
  price: number
  description: string

  characteristics: {
    article: string
    type: string
    material: string
    height: number
    width: number
    country: string
  }[]
}

export interface ProductFormData extends Omit<Product, 'id'> {
  name: string
  price: number
  description: string
  characteristics: Product['characteristics']
}
