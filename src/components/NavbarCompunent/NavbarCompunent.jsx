import React from "react"
import { WrapperLableText, WrapperContent, WrapperTextValue, WrapperTextPrice } from './style'
import { Checkbox, Rate } from "antd"

const NavbarComponent = () =>{
    const onChange = () => { }
    const rederContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px'}} onChange={onChange} >
                        {options.map((option) => {
                            return(
                                <Checkbox style={{marginLeft: 0}} value={option.value}>{option.lable}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    console.log('check', option)
                    return(
                        <div style={{display: 'flex'}}>
                            <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                            <span>tu {option} sao</span>
                        </div>
                    )
                })
            case 'price':
                    return options.map((option) => {
                        return(
                            <WrapperTextPrice>{option}</WrapperTextPrice>
                        )
            })
            default: 
                return{}
        }
    }

    return (
        <div>
            <WrapperLableText>lable</WrapperLableText>
            <WrapperContent>
                {rederContent('text', ['Tu lanh', 'TV', 'May giat'])}
            </WrapperContent>
            <WrapperContent>
            {rederContent('checkbox', [
                    {value: 'a', lable: 'A'},
                    {value: 'b', lable: 'B'}
                ])}
            </WrapperContent>
            <WrapperContent>
                {rederContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {rederContent('price', ['duoi 40', 'tren 50.000'])}
            </WrapperContent>
        </div>
    )
}

export default NavbarComponent