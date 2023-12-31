import { Card } from "antd";
import styled from "styled-components";

export const WapperCardStyle = styled(Card)`
    width: 200px;
        & img {
        height: 200px;
        width: 200px;
    }
    position: relative;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    color: rbg(56, 56, 61);
    line-height: 16px;
`

export const WapperReporText = styled.div`
     font-size: 11px;
     color: rbg(128, 128, 137);
     display: flex;
     align-items: center;
     margin: 6px 0 0px;
`
export const WapperPriceText = styled.div`
     font-size: 16px;
     font-weight: 500;
     color: rbg(255, 66, 78);
`
export const WapperDiscountText = styled.span`
     font-size: 12px;
     font-weight: 500;
     color: rbg(255, 66, 78);
`
export const WrapperStyleTextSell = styled.span`
      font-size: 15px;
      line-height: 24px;
      color: rgb(120, 120, 120)
`