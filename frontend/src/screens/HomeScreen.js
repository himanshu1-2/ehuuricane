import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
//import products from '../products'
import Product from '../componets/Product'
import Loader from '../componets/Loader'
import Message from '../componets/Message'
import Paginate from '../componets/Paginate'

import { listProducts } from '../actions/productAction'
import ProductCarousel from '../componets/ProductCarousel'
const HomeScreen = ({ match }) => {
    //const [products, setProducts] = useState([])
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Product</h1>
            {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}
export default HomeScreen
