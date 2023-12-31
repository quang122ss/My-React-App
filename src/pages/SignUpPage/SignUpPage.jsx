import React, {  useCallback, useState } from "react"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import InputForm from "../../components/InputForm/InputForm"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from "antd"
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import * as UserService from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from "../../components/LoadingComponents/Loading"
import * as message from"../../components/Message/Message"
import { useEffect } from 'react'

const SignUpPage = () =>{

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState('');
    //const [isSuccess] = useState(false);
    //const [isError] = useState(false);

    const navigate = useNavigate()

    const handleNavigateSignIn = useCallback(() => {
        navigate('/sign-in')
    },[navigate])

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )
    const { data, isSuccess, isError} = mutation

    console.log('isSuccess', isSuccess)

    useEffect(() => {
        if (isSuccess) {
            //setIsSuccess(false)
            message.success()
            handleNavigateSignIn()
        } else if (isError) {
            //setIsSuccess(false)
            message.error()
        }
    }, [handleNavigateSignIn, isSuccess, isError, navigate]);
    
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleSignUp = () => {
        mutation.mutate({email, password, confirmPassword});
        setIsLoading(true)
            console.log('logingloin');
            setTimeout(() => {
                setIsLoading(false);
              }, 2000);
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)',height: '100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{position: 'relative'}}>
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
                        <InputForm style={{marginBottom: '10px'}} placeholder="password" type={isShowPassword ? "text" : "password"} 
                        value={password} onChange={handleOnchangePassword}
                        />
                    </div>
                    <div style={{position: 'relative'}}>
                        <span
                            onClick={() => setIsShowComfirmPassword(!isShowComfirmPassword)}
                            style={{
                                right: '8px',
                                top: '4px',
                                zIndex: 10,
                                position: 'absolute'
                            }}
                        >{
                            isShowComfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm placeholder="comfirm password" type={isShowComfirmPassword ? "text" : "password"} 
                        value={confirmPassword} onChange={handleOnchangeConfirmPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{ 
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng ký'}
                            styleTextButton={{ color: '#fff'}}
                        ></ButtonComponent>
                    </Loading>
                    <p>Bạn đã có tài khoản ?<WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
                    <h4 style={{fontSize: '15px', fontFamily: 'bold'}}>Mua sắm tại LTTD</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage