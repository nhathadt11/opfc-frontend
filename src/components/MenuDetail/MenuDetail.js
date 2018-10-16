import React, { Component } from 'react';
import {
  Row, Col, Tag, Button, Icon,
} from 'antd';
import { map } from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  shape, func, number, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Gallery from '../Gallery/Gallery';
import './MenuDetail.css';
import Rate from '../Rate/Rate';
import { StatSpanStyled } from '../../modules/BrandProfile/components/BrandProfileHeader/BrandProfileHeader.styled';
import LocalIcon from '../../fonts/LocalFont';
import ReviewList from '../ReviewList/ReviewList';
import { selectMenu } from '../../modules/EventPlanner/actions/planningFlow';
import { fetchMenuDetailRequest } from '../../modules/General/actions/general';

const tags = [
  { id: 0, name: 'wedding' },
  { id: 1, name: 'birthday' },
  { id: 2, name: 'family' },
];

const MealList = ({ data }) => (
  <ul>
    {
      map(data, meal => (
        <li key={meal.id}>
          <section>{meal.mealName}</section>
          <div className="opfc-menu-meal-desc">{meal.description}</div>
        </li>
      ))
    }
  </ul>
);

MealList.propTypes = {
  data: arrayOf(shape({})),
};

MealList.defaultProps = {
  data: [],
};

class MenuDetail extends Component {
  static propTypes = {
    history: shape({
      push: func.isRequired,
    }).isRequired,
    selectMenuAction: func.isRequired,
    fetchMenuDetailRequestAction: func.isRequired,
    match: shape({
      params: shape({
        id: number,
      }),
    }).isRequired,
    menuDetail: shape({}).isRequired,
  }

  componentWillMount() {
    const { fetchMenuDetailRequestAction, match: { params: { id } } } = this.props;
    fetchMenuDetailRequestAction(id);
  }

  render() {
    const { history: { push }, selectMenuAction, menuDetail } = this.props;

    return (
      <div>
        <Row type="flex" className="opfc-menu-detail">
          <Col className="opfc-menu-detail-image">
            <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" width="100%" alt="Product detail" />
            <div className="opfc-menu-detail-gallery">
              <Gallery />
            </div>
          </Col>
          <Col className="opfc-menu-detail-main">
            <h1>{menuDetail.name}</h1>
            <section className="opfc-menu-price">{menuDetail.price}</section>
            <div style={{ margin: '10px 0' }}>
              <StatSpanStyled>
                <Icon type="team" className="opfc-menu-stat" />
                {menuDetail.servingNumber || 0} Servings
              </StatSpanStyled>
              <StatSpanStyled>
                <LocalIcon type="icon-bookmark" className="opfc-menu-stat" />
                {menuDetail.totalBookmark || 0} Saved
              </StatSpanStyled>
            </div>
            <Rate allowHalf defaultValue={2.5} /> <span className="opfc-menu-rating">({menuDetail.totalRating || 0} ratings)</span>
            <p className="opfc-menu-desc">
              {menuDetail.description}
            </p>
            <Row className="opfc-menu-meal-list">
              <MealList data={menuDetail.mealList} />
            </Row>
            <Row className="opfc-menu-tag-list">
              {
                map(tags, ({ id, name }) => (
                  <Tag key={id}>
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                  </Tag>
                ))
              }
            </Row>
            <Row>
              <p>
                <Button type="primary" size="large" onClick={() => selectMenuAction(menuDetail)}>Taste it</Button>
              </p>
            </Row>
          </Col>
          <Col className="opfc-brand-info-list">
            <div className="opfc-brand-info-item">
              <h3>Brand Name</h3>
              <Row>
                <Col span={4} className="opfc-brand-info-label"><Icon type="phone" style={{ fontSize: 18 }} /></Col>
                <Col><section className="opfc-brand-info-label">Hotline</section><section>123456789</section></Col>
              </Row>
              <Row>
                <Col span={4} className="opfc-brand-info-label"><Icon type="mail" style={{ fontSize: 18 }} /></Col>
                <Col><section className="opfc-brand-info-label">Email</section><section>johndoe@gmail.com</section></Col>
              </Row>
              <Row>
                <Col span={4} className="opfc-brand-info-label"><Icon type="team" style={{ fontSize: 18 }} /></Col>
                <Col><section className="opfc-brand-info-label">Members</section><section>12</section></Col>
              </Row>
            </div>

            <div className="opfc-brand-info-item">
              <h3>Summary on 100 orders</h3>
              <Row>
                <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                <Col><section className="opfc-brand-info-label">On time delivery</section><section>97%</section></Col>
              </Row>
              <Row>
                <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                <Col><section className="opfc-brand-info-label">Total service time</section><section>257 hours</section></Col>
              </Row>
            </div>

            <div className="opfc-brand-info-item opfc-brand-info-view">
              <Button size="small" onClick={() => push(`/brand/${menuDetail.brandId}`)}>View profile</Button>
            </div>
          </Col>
        </Row>
        <ReviewList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuDetail: state.generalReducer.menuDetail,
});

const mapDispatchToProps = {
  selectMenuAction: selectMenu,
  fetchMenuDetailRequestAction: fetchMenuDetailRequest,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuDetail);
