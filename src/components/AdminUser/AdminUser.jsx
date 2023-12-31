import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Form, Space } from "antd"
import TableComponent from "../TableComponents/TableComponents"
import { WrapperHeader, WrapperUploadFile } from "./style"
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from "../DrawerComponents/DrawerComponent"
import Loading from "../LoadingComponents/Loading"
import ModalComponent from "../ModalComponents/ModalComponents"
import { getBase64 } from "../../utils"
import * as message from '../../components/Message/Message'
import { useSelector } from "react-redux"
import { useMutationHooks } from "../../hooks/useMutationHooks"
import * as UserServices from '../../services/UserServices'
import { useQuery } from "@tanstack/react-query"
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    //const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user)

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = UserServices.updateUser(
                id,
                { ...rests }, token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = UserServices.deleteManyUser(
                ids,
                token)
            return res
        },
    )

    const handleDelteManyUsers = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = UserServices.deleteUser(
                id,
                token)
            return res
        },
    )

    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const getAllUser = async () => {
        const res = await UserServices.getAllUser(user?.access_token)
        console.log('res', res)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserServices.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res?.data?.avatar,
            })
        }
        //setIsLoadingUpdate(false)
    }

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            //setIsLoadingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    console.log('dataUpdated', dataUpdated)
    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUser })
    const { isLoading: isLoadingUsers, data: users } = queryUser

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        //setSearchText(selectedKeys[0]);
        //setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        //setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={`${selectedKeys[0] || ''}`}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: text =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                }
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
    })

    const handleCancelDelete = useCallback(() => {
        setIsModalOpenDelete(false)
    }, [])

    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const handleCloseDrawer = useCallback(() => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    }, [form]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            handleCloseDrawer()
            message.success()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated, isErrorUpdated, dataUpdated?.status, handleCloseDrawer])

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            handleCancelDelete()
            message.success()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected, isErrorDeleted, dataDeleted?.status, handleCancelDelete])

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDelectedMany, dataDeletedMany?.status, isErrorDeletedMany])

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyUsers} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <DrawerComponent forceRender title="Chi tiết người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Form
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onUpdateUser}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input your count avatar!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button >Select File</Button>
                            {stateUserDetails?.avatar && (
                                <img src={stateUserDetails?.avatar} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar" />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tài khoản này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminUser