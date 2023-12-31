import React, { useEffect, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperTypeProduct, WrapperButtonMore, WrapperProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import * as ProducServices from "../../services/ProductServices"
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponents/Loading'
import { useDebounce } from '../../hooks/useDebounce'
//import NavbarComponent from '../../components/NavbarCompunent/NavbarCompunent'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const [loading, setLoading] = useState(false)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])
    console.log('setLoading', setLoading)
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProducServices.getAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProducServices.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, lay: 1000, keepPreviousData: true })

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <Loading isLoading={isLoading || loading}>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px', width: '80%' }}>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <WrapperProduct>
                    {products?.data?.map((product) => {
                        console.log('product', product)
                        return (
                            <CardComponent
                                key={product._id}
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                selled={product.selled}
                                discount={product.discount}
                                id={product._id}
                            />
                        )
                    })}
                </WrapperProduct>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperButtonMore
                        textButton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                            border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                            width: '240px', height: '38px', borderRadius: '4px'
                        }}
                        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                        styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                        onClick={() => setLimit((prev) => prev + 6)}
                    />
                </div>
            </div>
        </Loading>
    );
}

export default HomePage