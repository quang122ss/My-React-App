import React, { useState, useEffect, useCallback } from "react"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import InputForm from "../../components/InputForm/InputForm"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from "../../components/LoadingComponents/Loading"
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/Slides/userSlides"

const SignInPage = () => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const dispatch = useDispatch();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data),
    )

    const { data, isSuccess } = mutation

    const navigate = useNavigate()

    const handleGetDetailsUser = useCallback(async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }, [dispatch])

    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                console.log('decode', decoded)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess, navigate, data?.access_token, handleGetDetailsUser, location])

    const handleNavigateLogin = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        });
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com"
                        value={email} onChange={handleOnchangeEmail}
                    />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                right: '8px',
                                top: '4px',
                                zIndex: 10,
                                position: 'absolute'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
                    <p>Chưa có tài khoản ?<WrapperTextLight onClick={handleNavigateLogin}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
                    <h4 style={{ fontSize: '15px', fontFamily: 'bold' }}>Mua sắm tại LTTD</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage