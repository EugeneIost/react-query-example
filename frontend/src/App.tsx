import { ConfigProvider, theme } from 'antd'
import BodyWrapper from './components/BodyWrapper/BodyWrapper'
import ProductListPage from './pages/ProductsListPage/ProductListPage'
import { Navigate, Route, Routes } from 'react-router'
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <BodyWrapper>
        <Routes>
          <Route index element={<Navigate to='/products' replace />} />

          <Route path='/products/create' element={<CreateProductPage />} />

          <Route path='/products/:id' element={<ProductDetailPage />} />

          <Route path='/products' element={<ProductListPage />} />
        </Routes>
      </BodyWrapper>
    </ConfigProvider>
  )
}

export default App
