import React, { Component } from 'react';
import {
  Row, Col, Button, Icon, DatePicker, Input, Modal,
} from 'antd';
import './CartItem.css';
import LocalIcon from '../../../../fonts/LocalFont';
import {
  MenuNameStyled, ByBrandNameStyled, ViewMealsInThisMenu, ServiceTimeStyled,
  MenuPriceStyled, ShippingFeeStyled, SubTotalStyled, NoteWrapperStyled,
  EditingActionsStyled,
} from './CartItem.styled';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const confirmDelete = () => {
  Modal.confirm({
    title: 'Delete Menu',
    content: 'Are you sure to delete this Menu?',
    okText: 'Delete',
    cancelText: 'Cancel',
    okType: 'danger',
    maskClosable: true,
  });
};

class CartItem extends Component {
  state = {
    editing: false,
  }

  enableEditing = () => this.setState({ editing: true })

  disableEditing = () => this.setState({ editing: false })

  render() {
    const { editing } = this.state;

    return (
      <Row type="flex" gutter={24} className="opfc-cart-item">
        <Col>
          <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" alt="Menu" width={120} />
        </Col>
        <Col span={4}>
          <div>
            <MenuNameStyled>Menu Name</MenuNameStyled>
            <ByBrandNameStyled>by Brand Name</ByBrandNameStyled>
            <section>
              <span><LocalIcon type="icon-dish" /> x 4</span>
            </section>
            <section>
              <span><Icon type="team" /> x 7</span>
            </section>
            <ViewMealsInThisMenu>View meals</ViewMealsInThisMenu>
          </div>
        </Col>
        <Col span={10} className="opfc-cart-item-service-info">
          <ServiceTimeStyled>Service time</ServiceTimeStyled>
          {
            editing ? (
              <RangePicker
                style={{ width: 'auto' }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Start Time', 'End Time']}
              />
            ) : (<div>Sep 12, 12:00 PM - 13:00 PM</div>)
          }
          <NoteWrapperStyled>
            {
              editing ? (
                <TextArea
                  placeholder="Extra note"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer eget ante id urna blandit venenatis in vitae enim."
                />
              ) : (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer eget ante id urna blandit venenatis in vitae enim.
                </p>
              )
            }
          </NoteWrapperStyled>
        </Col>
        <Col span={4} className="opfc-cart-item-price-group">
          <Row>
            <Col span={12} className="opfc-menu-price">Price:</Col>
            <Col className="opfc-cart-item-align-right"><MenuPriceStyled>$47.50</MenuPriceStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-shipping-fee">Shipping fee:</Col>
            <Col className="opfc-cart-item-align-right"><ShippingFeeStyled>$47.50</ShippingFeeStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-sub-total">Sub Total:</Col>
            <Col className="opfc-cart-item-align-right"><SubTotalStyled>$47.50</SubTotalStyled></Col>
          </Row>
        </Col>
        <Col span={4} className="opfc-cart-item-actions">
          {
            editing ? (
              <EditingActionsStyled>
                <Button shape="circle" type="primary" onClick={this.disableEditing}>
                  <Icon type="check" theme="outlined" />
                </Button>
                <Button shape="circle" onClick={this.disableEditing}>
                  <Icon type="close" theme="outlined" />
                </Button>
              </EditingActionsStyled>
            ) : (
              <Button shape="circle" onClick={this.enableEditing}>
                <Icon type="edit" theme="outlined" />
              </Button>
            )
          }
          <Button shape="circle" type="danger" onClick={confirmDelete}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default CartItem;
