import React, { Component } from 'react';
import { InputNumber } from 'antd';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled, NumberRangeStyled } from '../MenuFilterSider.styled';

class ServingNumber extends Component {
  state = {
    lowerLimit: 1,
    upperLimit: 100,
  }

  handleLimitChange = (limit, value) => this.setState({ [limit]: value })

  render() {
    const { lowerLimit, upperLimit } = this.state;

    return (
      <MenuFilterItemStyled>
        <MenuFilterItemTitleStyled htmlFor="">Serving Number</MenuFilterItemTitleStyled>
        <NumberRangeStyled servingNumber>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={value => this.handleLimitChange('lowerLimit', value)}
            value={lowerLimit}
          />
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={value => this.handleLimitChange('upperLimit', value)}
            value={upperLimit}
          />
        </NumberRangeStyled>
      </MenuFilterItemStyled>
    );
  }
}

export default ServingNumber;
