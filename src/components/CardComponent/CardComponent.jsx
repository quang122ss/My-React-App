import React from "react"
import { StyleNameProduct, WapperDiscountText, WapperPriceText, WapperReporText, WapperCardStyle, WrapperStyleTextSell } from "./style"
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom"
import { convertPrice } from "../../utils"

const CardComponent = (props) => {
    const { image, name, price, rating, selled, discount, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WapperCardStyle
            hoverable
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            <img
                alt=""
                src={logo}
                style={{
                    width: '68px', height: '14px', position: 'absolute', top: -1, left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WapperReporText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled || 1000}</WrapperStyleTextSell>
            </WapperReporText>
            <WapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WapperDiscountText>
                    - {discount || 5} %
                </WapperDiscountText>
            </WapperPriceText>
        </WapperCardStyle>
    )
}

export default CardComponent