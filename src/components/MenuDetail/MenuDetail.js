import React, { Component, Fragment } from 'react';
import {
  Row, Col, Tag, Button, Icon, Affix, Rate, message,
} from 'antd';
import { map, isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  shape, func, number, arrayOf, bool,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Gallery from '../Gallery/Gallery';
import './MenuDetail.css';
import { StatSpanStyled } from '../../modules/BrandProfile/components/BrandProfileHeader/BrandProfileHeader.styled';
import LocalIcon from '../../fonts/LocalFont';
import ReviewList from '../ReviewList/ReviewList';
import { selectMenu } from '../../modules/EventPlanner/actions/planningFlow';
import { fetchMenuDetailRequest, addFullTextSearchCriteriaEventType, addFullTextSearchCriteriaCategory } from '../../modules/General/actions/general';
import { fetchMenuRatingManyRequest, clearRatingList } from '../../modules/Rating/actions/rating';
import { bookmarkRequest } from '../../modules/Bookmark/actions/bookmark';
import { ListTitleStyled } from './MenuDetail.styled';
import { showLoginModal } from '../../modules/Account/actions/modal';

// const tags = [
//   { id: 0, name: 'wedding' },
//   { id: 1, name: 'birthday' },
//   { id: 2, name: 'family' },
// ];

const percentage = (count, total) => {
  if (!count) return 'N/A';
  return (total / count).toFixed();
};

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
    addEventTypeAction: func.isRequired,
    addCategoryAction: func.isRequired,
    bookmarkMenuRequestAction: func.isRequired,
    showLoginModalAction: func.isRequired,
    loggedIn: bool,
    selectedEvent: shape({}).isRequired,
  }

  static defaultProps = {
    loggedIn: false,
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

  bookmarkMenuRequestAction = (menuId, menuName) => {
    const { bookmarkMenuRequestAction } = this.props;
    bookmarkMenuRequestAction(menuId, menuName);
  }

  handleEventTypeSelect = (eventTypeName) => {
    const { addEventTypeAction, history: { push } } = this.props;

    addEventTypeAction(eventTypeName);
    push('/');
  }

  handleCategorySelect = (categoryName) => {
    const { addCategoryAction, history: { push } } = this.props;

    addCategoryAction(categoryName);
    push('/');
  }

  handleSelectMenu = (menu) => { // eslint-disable-line
    const {
      loggedIn, selectedEvent, selectMenuAction, showLoginModalAction,
    } = this.props;

    if (!loggedIn) return showLoginModalAction();
    if (isEmpty(selectedEvent)) return message.info('Please start planning event to select this menu.');

    selectMenuAction(menu);
    message.success(`${menu.menuName} is selected!`);
  }

  handleBookmark = (menuId, menuName) => { // eslint-disable-line
    const { loggedIn, bookmarkMenuRequestAction, showLoginModalAction } = this.props;

    if (!loggedIn) return showLoginModalAction();

    bookmarkMenuRequestAction(menuId, menuName);
  }

  render() {
    const {
      history: { push }, menuDetail,
      ratingList,
    } = this.props;
    const { brandSummary = {} } = menuDetail;

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
                {menuDetail.totalBookmark || 0} Bookmarks
              </StatSpanStyled>
            </div>
            <Rate allowHalf value={menuDetail.averageRatingPoint} disabled /> <span className="opfc-menu-rating">({menuDetail.totalRating || 0} reviews)</span>
            <p className="opfc-menu-desc">
              {menuDetail.description}
            </p>
            <Row className="opfc-menu-meal-list">
              <MealList data={menuDetail.mealList} />
            </Row>
            {
              !isEmpty(menuDetail.eventTypeList) && (
                <Fragment>
                  <ListTitleStyled>
                    Event Types
                  </ListTitleStyled>
                  <Row className="opfc-menu-tag-list">
                    {
                      map(menuDetail.eventTypeList, ({ id, eventTypeName }) => (
                        <Tag
                          className="opfc-menu-tag-item"
                          key={id}
                          onClick={() => this.handleEventTypeSelect(eventTypeName)}
                        >
                          {eventTypeName && eventTypeName.length > 20 ? `${eventTypeName.slice(0, 20)}...` : (eventTypeName || 'N/A')}
                        </Tag>
                      ))
                    }
                  </Row>
                </Fragment>
              )
            }
            {
              !isEmpty(menuDetail.categoryList) && (
                <Fragment>
                  <ListTitleStyled>
                    Categories
                  </ListTitleStyled>
                  <Row className="opfc-menu-tag-list">
                    {
                      map(menuDetail.categoryList, ({ id, name }) => (
                        <Tag
                          className="opfc-menu-tag-item"
                          key={id}
                          onClick={() => this.handleCategorySelect(name)}
                        >
                          {name && name.length > 20 ? `${name.slice(0, 20)}...` : (name || 'N/A')}
                        </Tag>
                      ))
                    }
                  </Row>
                </Fragment>
              )
            }
            <Row>
              <p className="opfc-menu-detail-action-group">
                <Button type="primary" size="large" onClick={() => this.handleSelectMenu(menuDetail)}>
                  <LocalIcon type="icon-spoon" />
                  Taste it
                </Button>
                <Button type="default" size="large" onClick={() => this.handleBookmark(menuDetail.id, menuDetail.menuName)}>
                  <LocalIcon type="icon-bookmark" />
                  Bookmark
                </Button>
              </p>
            </Row>
          </Col>
          <Col className="opfc-brand-info-list">
            <Affix offsetTop={20}>
              <div className="opfc-brand-info-item">
                <h3>{menuDetail.brandName || 'N/A'}</h3>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="phone" style={{ fontSize: 18 }} /></Col>
                  <Col><section className="opfc-brand-info-label">Hotline</section><section>{menuDetail.brandPhone || 'N/A'}</section></Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="mail" style={{ fontSize: 18 }} /></Col>
                  <Col><section className="opfc-brand-info-label">Email</section><section>{menuDetail.brandEmail || 'N/A'}</section></Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="team" style={{ fontSize: 18 }} /></Col>
                  <Col><section className="opfc-brand-info-label">Members</section><section>{menuDetail.brandParticipantNumber || 'N/A'}</section></Col>
                </Row>
              </div>

              <div className="opfc-brand-info-item">
                <h3>Summary on {brandSummary.orderCount} orders</h3>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">Support Service</section>
                    <section>
                      {percentage(
                        brandSummary.supportServiceCount,
                        brandSummary.totalSupportService,
                      )}
                    </section>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">Varieties</section>
                    <section>
                      {percentage(
                        brandSummary.diffVateriesCount,
                        brandSummary.TotalDiffVateries,
                      )}
                    </section>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">Reasonable Price</section>
                    <section>
                      {percentage(
                        brandSummary.reasonablePriceCount,
                        brandSummary.totalReasonablePrice,
                      )}
                    </section>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">On Time</section>
                    <section>
                      {percentage(
                        brandSummary.onTimeCount,
                        brandSummary.totalOnTime,
                      )}
                    </section>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">Food Quality</section>
                    <section>
                      {percentage(
                        brandSummary.foodQualityCount,
                        brandSummary.totalFoodQuality,
                      )}
                    </section>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="opfc-brand-info-label"><Icon type="check-circle" style={{ fontSize: 18 }} /></Col>
                  <Col>
                    <section className="opfc-brand-info-label">Attitude</section>
                    <section>
                      {percentage(
                        brandSummary.attitudeCount,
                        brandSummary.totalAttitude,
                      )}
                    </section>
                  </Col>
                </Row>
              </div>

              <div className="opfc-brand-info-item opfc-brand-info-view">
                <Button size="small" onClick={() => push(`/brand/${menuDetail.brandId}`)}>View profile</Button>
              </div>
            </Affix>
          </Col>
        </Row>
        <ReviewList
          menuName={menuDetail.menuName}
          averageRatingPoint={menuDetail.averageRatingPoint}
          totalRating={menuDetail.totalRating}
          dataList={ratingList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuDetail: state.generalReducer.menuDetail,
  ratingList: state.ratingReducer.ratingList,
  loggedIn: state.accountReducer.account.loggedIn,
  selectedEvent: state.eventPlannerReducer.event.event,
});

const mapDispatchToProps = {
  selectMenuAction: selectMenu,
  fetchMenuDetailRequestAction: fetchMenuDetailRequest,
  fetchMenuRatingManyRequestAction: fetchMenuRatingManyRequest,
  clearRatingListAction: clearRatingList,
  addEventTypeAction: addFullTextSearchCriteriaEventType,
  addCategoryAction: addFullTextSearchCriteriaCategory,
  bookmarkMenuRequestAction: bookmarkRequest,
  showLoginModalAction: showLoginModal,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuDetail);
