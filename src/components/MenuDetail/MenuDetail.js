import React, { Component } from 'react';
import {
  Row, Col, Tag, Button, Icon, Affix, Rate,
} from 'antd';
import { map, isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  shape, func, number, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Gallery from '../Gallery/Gallery';
import './MenuDetail.css';
import { StatSpanStyled } from '../../modules/BrandProfile/components/BrandProfileHeader/BrandProfileHeader.styled';
import LocalIcon from '../../fonts/LocalFont';
import ReviewList from '../ReviewList/ReviewList';
import { selectMenu } from '../../modules/EventPlanner/actions/planningFlow';
import { fetchMenuDetailRequest } from '../../modules/General/actions/general';
import { fetchMenuRatingManyRequest, clearRatingList } from '../../modules/Rating/actions/rating';

// const tags = [
//   { id: 0, name: 'wedding' },
//   { id: 1, name: 'birthday' },
//   { id: 2, name: 'family' },
// ];

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
    fetchMenuRatingManyRequestAction: func.isRequired,
    ratingList: arrayOf(shape({})).isRequired,
    clearRatingListAction: func.isRequired,
  }

  componentWillMount() {
    const {
      fetchMenuDetailRequestAction,
      fetchMenuRatingManyRequestAction,
      match: { params: { id } },
    } = this.props;

    fetchMenuDetailRequestAction(id);
    fetchMenuRatingManyRequestAction(id);
  }

  componentWillUnmount() {
    const { clearRatingListAction } = this.props;
    clearRatingListAction();
  }

  bookmakrMenuAction = (id) => {
    console.log(id);
  }

  render() {
    const {
      history: { push }, selectMenuAction, menuDetail,
      ratingList,
    } = this.props;

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
            <h1>{menuDetail.menuName}</h1>
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
            <Rate allowHalf value={2.5} disabled /> <span className="opfc-menu-rating">({menuDetail.totalRating || 0} ratings)</span>
            <p className="opfc-menu-desc">
              {menuDetail.description}
            </p>
            <Row className="opfc-menu-meal-list">
              <MealList data={menuDetail.mealList} />
            </Row>
            {
              !isEmpty(menuDetail.eventTypeList) && (
                <Row className="opfc-menu-tag-list">
                  {
                    map(menuDetail.eventTypeList, ({ id, eventTypeName }) => (
                      <Tag key={id}>
                        {eventTypeName && eventTypeName.length > 20 ? `${eventTypeName.slice(0, 20)}...` : (eventTypeName || 'N/A')}
                      </Tag>
                    ))
                  }
                </Row>
              )
            }
            {
              !isEmpty(menuDetail.categoryList) && (
                <Row className="opfc-menu-tag-list">
                  {
                    map(menuDetail.categoryList, ({ id, name }) => (
                      <Tag key={id}>
                        {name && name.length > 20 ? `${name.slice(0, 20)}...` : (name || 'N/A')}
                      </Tag>
                    ))
                  }
                </Row>
              )
            }
            <Row>
              <p className="opfc-menu-detail-action-group">
                <Button type="primary" size="large" onClick={() => selectMenuAction(menuDetail)}>
                  <LocalIcon type="icon-spoon" />
                  Taste it
                </Button>
                <Button type="default" size="large" onClick={() => this.bookmakrMenuAction(menuDetail.id)}>
                  <LocalIcon type="icon-bookmark" />
                  Bookmark
                </Button>
              </p>
            </Row>
          </Col>
          <Col className="opfc-brand-info-list">
            <Affix offsetTop={20}>
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
            </Affix>
          </Col>
        </Row>
        <ReviewList menuName={menuDetail.menuName} dataList={ratingList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuDetail: state.generalReducer.menuDetail,
  ratingList: state.ratingReducer.ratingList,
});

const mapDispatchToProps = {
  selectMenuAction: selectMenu,
  fetchMenuDetailRequestAction: fetchMenuDetailRequest,
  fetchMenuRatingManyRequestAction: fetchMenuRatingManyRequest,
  clearRatingListAction: clearRatingList,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuDetail);
