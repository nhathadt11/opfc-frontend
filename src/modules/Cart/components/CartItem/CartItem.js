import React, { Component } from 'react';
import {
  Row, Col, Button, Icon, Input, Modal, Tooltip,
} from 'antd';
import { shape, arrayOf, func } from 'prop-types';
import {
  map, isEmpty, isArray, isString, split,
} from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './CartItem.css';
import LocalIcon from '../../../../fonts/LocalFont';
import {
  MenuNameStyled, ByBrandNameStyled, ViewMealsInThisMenu,
  MenuPriceStyled, ShippingFeeStyled, SubTotalStyled, NoteWrapperStyled,
  EditingActionsStyled,
  MealListStyled,
} from './CartItem.styled';
import { deselectMenu, saveCartItemNote } from '../../../EventPlanner/actions/planningFlow';
import { MENU_PHOTO_PLACHOLDER } from '../../../../constants/AppConstants';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

const confirmRemove = (onOk) => {
  const modal = Modal.confirm({
    title: 'Remove Menu',
    content: 'Are you sure to remove this Menu?',
    okText: 'Remove',
    cancelText: 'Cancel',
    okType: 'danger',
    maskClosable: true,
    onOk: () => { onOk(); modal.destroy(); },
  });
};

const MealList = ({ meals }) => (
  <MealListStyled>
    { map(meals, m => <li>{m.mealName}</li>) }
  </MealListStyled>
);

MealList.propTypes = {
  meals: arrayOf(shape({})).isRequired,
};

class CartItem extends Component {
  static propTypes = {
    menu: shape({}).isRequired,
    deselectMenuAction: func.isRequired,
    saveCartItemNoteAction: func.isRequired,
    cartItemNotes: shape({}).isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  }

  state = {
    editing: false,
    note: null,
  }

  enableEditing = () => this.setState({ editing: true })

  disableEditing = () => this.setState({ editing: false })

  handleNoteChange = () => {
    const { menu, saveCartItemNoteAction } = this.props;
    const { note } = this.state;

    saveCartItemNoteAction(menu.id, note);
    this.disableEditing();
  }

  rollbackToPrevNote = () => {
    this.setState({ note: this.getNote() });

    this.disableEditing();
  }

  getNote = () => {
    const { cartItemNotes, menu } = this.props;

    return cartItemNotes[menu.id];
  }

  getThumbnailPhoto = () => {
    const { menu } = this.props;

    if (isEmpty(menu.photo)) return MENU_PHOTO_PLACHOLDER;
    if (isArray(menu.photo)) return menu.photo[0];
    if (isString(menu.photo)) return split(menu.photo, ';')[0];

    return MENU_PHOTO_PLACHOLDER;
  };

  render() {
    const { menu, deselectMenuAction, history: { push } } = this.props;
    const { editing, note } = this.state;

    return (
      <Row type="flex" gutter={24} className="opfc-cart-item">
        <Col>
          <img src={this.getThumbnailPhoto()} alt="Menu" width={120} />
        </Col>
        <Col span={4}>
          <div>
            <MenuNameStyled onClick={() => push(`/menus/${menu.id}`)}>{menu.menuName}</MenuNameStyled>
            <ByBrandNameStyled>by {menu.brandName || 'N/A'}</ByBrandNameStyled>
            <section>
              <span><LocalIcon type="icon-dish" /> x {menu.mealList ? menu.mealList.length : 0}</span>
            </section>
            <section>
              <span><Icon type="team" /> x {menu.servingNumber || 0}</span>
            </section>
            <Tooltip title={<MealList meals={menu.mealList} />} placement="right" overlayClassName="opfc-meal-list-view">
              <ViewMealsInThisMenu>View meals</ViewMealsInThisMenu>
            </Tooltip>
          </div>
        </Col>
        <Col span={10} className="opfc-cart-item-service-info">
          {/* <ServiceTimeStyled>Service time</ServiceTimeStyled>
          {
            editing ? (
              <RangePicker
                style={{ width: 'auto' }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Start Time', 'End Time']}
              />
            ) : (<div>Sep 12, 12:00 PM - 13:00 PM</div>)
          } */}
          <NoteWrapperStyled>
            {
              editing ? (
                <TextArea
                  placeholder="Extra note"
                  value={note || this.getNote()}
                  onChange={e => this.setState({ note: e.target.value })}
                />
              ) : (
                <p style={{ width: 200 }}>
                  {note || this.getNote()}
                </p>
              )
            }
          </NoteWrapperStyled>
        </Col>
        <Col span={4} className="opfc-cart-item-price-group">
          <Row>
            <Col span={12} className="opfc-menu-price">Price:</Col>
            <Col className="opfc-cart-item-align-right"><MenuPriceStyled>$ {menu.price}</MenuPriceStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-shipping-fee">Other fee:</Col>
            <Col className="opfc-cart-item-align-right"><ShippingFeeStyled>$ {menu.shippingFee || 0}</ShippingFeeStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-sub-total">Sub Total:</Col>
            <Col className="opfc-cart-item-align-right"><SubTotalStyled>$ {(menu.price || 0) + (menu.shippingFee || 0) }</SubTotalStyled></Col>
          </Row>
        </Col>
        <Col span={4} className="opfc-cart-item-actions">
          {
            editing ? (
              <EditingActionsStyled>
                <Button shape="circle" type="primary" onClick={this.handleNoteChange}>
                  <Icon type="check" theme="outlined" />
                </Button>
                <Button shape="circle" onClick={this.rollbackToPrevNote}>
                  <Icon type="close" theme="outlined" />
                </Button>
              </EditingActionsStyled>
            ) : (
              <Button shape="circle" onClick={this.enableEditing}>
                <Icon type="edit" theme="outlined" />
              </Button>
            )
          }
          <Button shape="circle" type="danger" onClick={() => confirmRemove(() => deselectMenuAction(menu.id))}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  cartItemNotes: state.eventPlannerReducer.event.cartItemNotes,
});

const mapDispatchToProps = {
  deselectMenuAction: deselectMenu,
  saveCartItemNoteAction: saveCartItemNote,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(CartItem);
