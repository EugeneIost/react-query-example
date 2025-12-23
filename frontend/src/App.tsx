import { ConfigProvider, theme } from 'antd'
import BodyWrapper from './components/BodyWrapper/BodyWrapper'
import ProductListPage from './components/pages/ProductsListPage/ProductListPage'
import { Navigate, Route, Routes } from 'react-router'
import CreateProductPage from './components/pages/CreateProductPage/CreateProductPage'
import ProductDetailPage from './components/pages/ProductDetailPage/ProductDetailPage'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <BodyWrapper>
        <Routes>
          {/* Главная страница */}
          <Route index element={<Navigate to='/products' replace />} />

          {/* Страница создания продукта */}
          <Route path='/products/create' element={<CreateProductPage />} />

          {/* Страница деталей продукта */}
          <Route path='/products/:id' element={<ProductDetailPage />} />

          {/* Список всех продуктов (опционально) */}
          <Route path='/products' element={<ProductListPage />} />
        </Routes>
      </BodyWrapper>
    </ConfigProvider>
  )
}

export default App
