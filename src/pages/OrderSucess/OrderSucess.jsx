import React from 'react'
import { Lable, WrapperContainer, WrapperInfo, WrapperItemOrder, WrapperValue } from './style';
import { convertPrice } from '../../utils';
//import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';


const OrderSucess = () => {
    //const order = useSelector((state) => state.order)
    const location = useLocation()
    const { state } = location

    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            {/* <Loading isLoading={isLoadingAddOrder}> */}
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3 style={{ fontWeight: 'bold' }}>Đơn hàng đặt thành công</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperContainer>
                        <WrapperInfo>
                            <div>
                                <Lable>Phương thức giao hàng</Lable>
                                <WrapperValue>
                                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                </WrapperValue>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <div>
                                    <Lable>Phương thức thanh toán</Lable>

                                    <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapperValue>
                                </div>
                            </div>
                        </WrapperInfo>
                        <WrapperItemOrder>
                            {state.orders?.map((order) => {
                                return (
                                    <WrapperItemOrder>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} alt='' />
                                            <div style={{
                                                width: 260,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                                            </span>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {convertPrice(order?.mount)}</span>
                                            </span>
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperItemOrder>
                    </WrapperContainer>
                </div>
            </div>
            {/* </Loading> */}
        </div >
    )
}

export default OrderSucess