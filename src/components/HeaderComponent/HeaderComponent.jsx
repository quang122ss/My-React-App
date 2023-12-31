import React, { useEffect, useState } from "react"
import { Badge, Col, Popover } from "antd"
import { WrapperHeader, WrapperTextHeader, WrapperHeaderSmall, WrapperHeaderAccout, WrapperContentPopup } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as UserService from "../../services/UserServices"
import { resetUser } from "../../redux/Slides/userSlides"
import Loading from '../LoadingComponents/Loading'
import { searchProduct } from '../../redux/Slides/productSlides';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [Search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const [loading, setLoading] = useState(false)
    console.log('Search', Search)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.LogoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        // rgb(26, 148, 255)
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader>SHOP</WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            placeholder="Search"
                            textButton="Tìm kiếm"
                            size="large"
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isLoading={loading} >
                        <WrapperHeaderAccout>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger={"click"}>
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperHeaderSmall>Đăng nhập/Đăng ký</WrapperHeaderSmall>
                                    <div>
                                        <WrapperHeaderSmall>Tài khoản</WrapperHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccout>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperHeaderSmall>Giỏ hàng</WrapperHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent