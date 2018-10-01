import React from 'react';
import {
  List, Row, Col, Button,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import CartItem from '../../components/CartItem/CartItem';
import {
  CartStyled, CheckoutSubTotalLabelStyled, CheckoutShippingFeeLabelStyled,
  CheckoutTotalStyled, CheckoutTotalLabelStyled,
} from './Cart.styled';
import './Cart.css';

const menus = [
  <CartItem />,
  <CartItem />,
  <CartItem />,
];

const Cart = ({ history: { push } }) => (
  <CartStyled>
    <Row type="flex" style={{ flexFlow: 'unset' }}>
      <Col>
        <List
          dataSource={menus}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Col>
      <Col className="opfc-cart-item-checkout">
        <Row className="opfc-cart-item-checkout-price-summary">
          <Col span={12}>
            <CheckoutSubTotalLabelStyled>Sub Total</CheckoutSubTotalLabelStyled>
          </Col>
          <Col className="opfc-cart-item-checkout-price">
            $23.50
          </Col>
          <Col span={12}>
            <CheckoutShippingFeeLabelStyled>Shipping fee</CheckoutShippingFeeLabelStyled>
          </Col>
          <Col className="opfc-cart-item-checkout-price">
            $23.50
          </Col>
          <Col span={12}>
            <CheckoutTotalLabelStyled>Total</CheckoutTotalLabelStyled>
          </Col>
          <Col className="opfc-cart-item-checkout-price">
            <CheckoutTotalStyled>$23.50</CheckoutTotalStyled>
          </Col>
        </Row>
        <Row>
          <Button type="primary" size="large" onClick={() => push('/checkout')}>Checkout Now</Button>
        </Row>
      </Col>
    </Row>
  </CartStyled>
);

Cart.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(Cart);
