import React, { Component } from 'react';
import { Slider, InputNumber } from 'antd';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled, NumberRangeStyled } from '../MenuFilterSider.styled';

class BudgetRange extends Component {
  state = {
    lowerLimit: 150,
    upperLimit: 500,
  }

  handleLimitChange = (limit, value) => this.setState({ [limit]: value })

  handleRangeChange = ([lowerLimit, upperLimit]) => this.setState({ lowerLimit, upperLimit })

  render() {
    const { lowerLimit, upperLimit } = this.state;

    return (
      <MenuFilterItemStyled>
        <MenuFilterItemTitleStyled htmlFor="">Budget</MenuFilterItemTitleStyled>
        <Slider
          range
          defaultValue={[lowerLimit, upperLimit]}
          min={100}
          max={10000000}
          step={10}
          value={[lowerLimit, upperLimit]}
          onChange={this.handleRangeChange}
        />
        <NumberRangeStyled>
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={value => this.handleLimitChange('lowerLimit', value)}
            value={lowerLimit}
          />
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={value => this.handleLimitChange('upperLimit', value)}
            value={upperLimit}
          />
        </NumberRangeStyled>
      </MenuFilterItemStyled>
    );
  }
}

export default BudgetRange;
