import { Menu } from 'antd'
import React, {  useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const OrderPage = () =>{
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />)
    ];

    const [keySelected, setkeySelected] = useState('')

    // const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKey(keys);
    //     } else {
    //         setOpenKey(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };

    const renderPage = (key) => {
      switch(key) {
        case 'user':
          return (
            <AdminUser />
          )
        case 'product':
          return (
            <AdminProduct />
          )
        default:
          return <></>
      }
    }

    const handleOnCLick = ({key}) => {
        setkeySelected(key)
    }

    return (
        <>
        <HeaderComponent isHiddenSearch isHiddenCart />
        <div style={{ display: 'flex',overflowX: 'hidden' }}>
            <Menu
                mode="inline"
                style={{
                    width: 256,
                    boxShadow: '1px 1px 2px #ccc',
                    height: '100vh'
                }}
                items={items}
                onClick={handleOnCLick}
            />
            <div style={{ flex: 1, padding: '15px' }}>
              {renderPage(keySelected)}
            </div>
        {/* <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div> */}
      </div>
    </>
    )
}

export default OrderPage