import React from 'react';
import { List } from 'antd';
import CartItem from '../../components/CartItem/CartItem';
import { CartStyled } from './Cart.styled';

const menus = [
  <CartItem />,
  <CartItem />,
  <CartItem />,
];

const Cart = () => (
  <CartStyled>
    <List
      dataSource={menus}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  </CartStyled>
);

export default Cart;
