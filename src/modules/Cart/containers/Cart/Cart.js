import React from 'react';
import {
  List, Row, Col, Affix,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import {
  CartStyled, CheckoutSubTotalLabelStyled, CheckoutShippingFeeLabelStyled,
  CheckoutTotalStyled, CheckoutTotalLabelStyled,
} from './Cart.styled';
import './Cart.css';

const Cart = ({ selectedMenuList }) => {
  const subTotal = selectedMenuList.reduce((acc, menu) => acc + (menu.price || 0), 0);
  const totalShippingFee = selectedMenuList.reduce((acc, menu) => acc + (menu.shippingFee || 0), 0);
  const total = subTotal + totalShippingFee;

  return (
    <CartStyled>
      <Row type="flex" style={{ flexFlow: 'unset' }}>
        <Col>
          <List
            dataSource={selectedMenuList}
            renderItem={item => <List.Item><CartItem menu={item} /></List.Item>}
          />
        </Col>
        <Col className="opfc-cart-item-checkout">
          <Affix offsetTop={100} style={{ width: '100%' }}>
            <Row className="opfc-cart-item-checkout-price-summary">
              <Col span={12}>
                <CheckoutSubTotalLabelStyled>Sub Total</CheckoutSubTotalLabelStyled>
              </Col>
              <Col className="opfc-cart-item-checkout-price">
                $ { subTotal }
              </Col>
              <Col span={12}>
                <CheckoutShippingFeeLabelStyled>Other fee</CheckoutShippingFeeLabelStyled>
              </Col>
              <Col className="opfc-cart-item-checkout-price">
                $ { totalShippingFee }
              </Col>
              <Col span={12}>
                <CheckoutTotalLabelStyled>Total</CheckoutTotalLabelStyled>
              </Col>
              <Col className="opfc-cart-item-checkout-price">
                <CheckoutTotalStyled>$ { total }</CheckoutTotalStyled>
              </Col>
            </Row>
          </Affix>
          {/* <Row>
            <Button type="primary" size="large" onClick={() => push('/checkout')}>Checkout Now</Button>
          </Row> */}
        </Col>
      </Row>
    </CartStyled>
  );
};

Cart.propTypes = {
  selectedMenuList: arrayOf(shape({})).isRequired,
};

const mapStateToProps = state => ({
  selectedMenuList: state.eventPlannerReducer.event.selectedMenuList,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Cart);
