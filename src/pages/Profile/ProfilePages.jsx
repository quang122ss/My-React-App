import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../components/LoadingComponents/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/Slides/userSlides'
import { Button } from 'antd'
import { UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'


const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState('');
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isSuccess, isError } = mutation
    console.log('data', data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    const handleGetDetailsUser = useCallback( async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    },[dispatch])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError, handleGetDetailsUser, user?.id, user?.access_token])

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        setIsLoading(true)
            console.log('logingloin');
            setTimeout(() => {
                setIsLoading(false);
              }, 2000);
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{ 
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{ 
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{ 
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                        {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{ 
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{ 
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

// const ProfilePage = () => {
//     const user = useSelector((state) => state.user)
//     const [email, setEmail] = useState(user?.email)
//     const [name, setName] = useState(user?.name)
//     const [phone, setPhone] = useState(user?.phone)
//     const [address, setAddress] = useState(user?.address)
//     const [avatar, setAvatar] = useState(user?.avatar)

//     const mutation = useMutationHooks(
//             (id, data) => UserService.updateUser(id, data)
//     )
//     const { data } = mutation
//     console.log('data', data)

//     useEffect(() => {
//         setEmail('')
//         setName('')
//         setPhone('')
//         setAddress('')
//         setAvatar('')
//     }, [user])

//     const handleOnchangeEmail = (value) => {
//         setEmail(value)
//     }
//     const handleOnchangeName = (value) => {
//         setName(value)
//     }
//     const handleOnchangePhone = (value) => {
//         setPhone(value)
//     }
//     const handleOnchangeAddress = (value) => {
//         setAddress(value)
//     }
//     const handleOnchangeAvatar = (value) => {
//         setAvatar(value)
//     }
//     const handleUpdate = () => {
//         mutation.mutate(user?.id, {email, name, phone, address, avatar})
//         console.log('user?.id', user?.id);
//         console.log('user', user);
//     }

//     return (
//         <div style={{width: '1270px', margin: '0 auto', height: '500px' }}>
//             <WrapperHeader>Thông tin người dùng</WrapperHeader>
//             <WrapperContentProfile>
//                 <WrapperInput>
//                     <WrapperLabel htmlFor="name">Name</WrapperLabel>
//                     <InputForm style={{width: '300px'}} id="name" value={name} onChange={handleOnchangeName} />
//                     <ButtonComponent
//                         onClick={handleUpdate}
//                         size={40}
//                          styleButton={{ 
//                             height: '30px',
//                             width: 'fit-content',
//                             borderRadius: '4px',
//                             padding: '2px 6px 6px'
//                         }}
//                         textButton={'Cập nhật'}
//                         styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
//                     ></ButtonComponent>
//                 </WrapperInput>
//                 <WrapperInput>
//                     <WrapperLabel htmlFor="email">Email</WrapperLabel>
//                     <InputForm style={{width: '300px'}} id="email" value={email} onChange={handleOnchangeEmail} />
//                     <ButtonComponent
//                         onClick={handleUpdate}
//                         size={40}
//                          styleButton={{ 
//                             height: '30px',
//                             width: 'fit-content',
//                             borderRadius: '4px',
//                             padding: '2px 6px 6px'
//                         }}
//                         textButton={'Cập nhật'}
//                         styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
//                     ></ButtonComponent>
//                 </WrapperInput>
//                 <WrapperInput>
//                     <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
//                     <InputForm style={{width: '300px'}} id="phone" value={phone} onChange={handleOnchangePhone} />
//                     <ButtonComponent
//                         onClick={handleUpdate}
//                         size={40}
//                          styleButton={{ 
//                             height: '30px',
//                             width: 'fit-content',
//                             borderRadius: '4px',
//                             padding: '2px 6px 6px'
//                         }}

//                         textButton={'Cập nhật'}
//                         styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
//                     ></ButtonComponent>
//                 </WrapperInput>
//                 <WrapperInput>
//                     <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
//                     <InputForm style={{width: '300px'}} id="avatar" value={avatar} onChange={handleOnchangeAvatar} />
//                     <ButtonComponent
//                         onClick={handleUpdate}
//                         size={40}
//                          styleButton={{ 
//                             height: '30px',
//                             width: 'fit-content',
//                             borderRadius: '4px',
//                             padding: '2px 6px 6px'
//                         }}

//                         textButton={'Cập nhật'}
//                         styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
//                     ></ButtonComponent>
//                 </WrapperInput>
//                 <WrapperInput>
//                     <WrapperLabel htmlFor="address">Address</WrapperLabel>
//                     <InputForm style={{width: '300px'}} id="address" value={address} onChange={handleOnchangeAddress} />
//                     <ButtonComponent
//                         onClick={handleUpdate}
//                         size={40}
//                          styleButton={{ 
//                             height: '30px',
//                             width: 'fit-content',
//                             borderRadius: '4px',
//                             padding: '2px 6px 6px'
//                         }}

//                         textButton={'Cập nhật'}
//                         styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
//                     ></ButtonComponent>
//                 </WrapperInput>
//             </WrapperContentProfile>
//         </div>
//     )
// }

export default ProfilePage