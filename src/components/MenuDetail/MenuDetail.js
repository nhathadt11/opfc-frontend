import React, { Component } from 'react';
import {
  Row, Col, Tag, Button, Input, Icon,
} from 'antd';
import { map } from 'lodash';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Gallery from '../Gallery/Gallery';
import './MenuDetail.css';
import Rate from '../Rate/Rate';
import { StatSpanStyled } from '../../modules/BrandProfile/components/BrandProfileHeader/BrandProfileHeader.styled';
import LocalIcon from '../../fonts/LocalFont';
import ReviewList from '../ReviewList/ReviewList';
import { selectMenu } from '../../modules/EventPlanner/actions/planningFlow';

const tags = [
  { id: 0, name: 'wedding' },
  { id: 1, name: 'birthday' },
  { id: 2, name: 'family' },
];

class MenuDetail extends Component {
  static propTypes = {
    history: shape({
      push: func.isRequired,
    }).isRequired,
    selectMenuAction: func.isRequired,
  }

  state = {
    newTagInputVisible: false,
  }

  showNewTagInput = () => this.setState({ newTagInputVisible: true })

  render() {
    const { history: { push }, selectMenuAction } = this.props;
    const { newTagInputVisible } = this.state;

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
            <h1>Menu name</h1>
            <section className="opfc-menu-price">$123,456</section>
            <div style={{ margin: '10px 0' }}>
              <StatSpanStyled>
                <Icon type="team" className="opfc-menu-stat" />
                5 Servings
              </StatSpanStyled>
              <StatSpanStyled>
                <LocalIcon type="icon-bookmark" className="opfc-menu-stat" />
                123 Saved
              </StatSpanStyled>
            </div>
            <Rate allowHalf defaultValue={2.5} /> <span className="opfc-menu-rating">(32 ratings)</span>
            <p className="opfc-menu-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget ante id urna blandit venenatis in vitae enim. Nam a placerat lacus. Curabitur pellentesque turpis nisi, id volutpat leo eleifend at
            </p>
            <Row className="opfc-menu-meal-list">
              <ul>
                <li>
                  <section>Chicken Quesadilla</section>
                  <div className="opfc-menu-meal-desc">Served with sour cream & pico de gallo.</div>
                </li>
                <li>
                  <section>Southwestern Shrimp</section>
                  <div className="opfc-menu-meal-desc">Shrimp sautéed with peppers and Southwestern cream sauce. Served with pasta. Add drinks and perhaps dessert, and you're all set.</div>
                </li>
                <li>
                  <section>Fresh Cookie Tray</section>
                  <div className="opfc-menu-meal-desc">Lady fingers soaked in espresso and layered with sweetened mascarpone cheese. Topped with cocoa.</div>
                </li>
                <li>
                  <section>Assorted Individual Sodas</section>
                  <div className="opfc-menu-meal-desc">Pair soup with sandwiches or a salad for a complete meal. Add drinks and perhaps dessert, and you're all set.</div>
                </li>
                <li>
                  <section>Meat Lasagna</section>
                  <div className="opfc-menu-meal-desc">Pasta layered with meat, ricotta cheese, tomato sauce, and mozzarella. Served with rolls. Add drinks, and perhaps salad and/or dessert, and you're all set.</div>
                </li>
                <li>
                  <section>Moussaka</section>
                  <div className="opfc-menu-meal-desc">Grape leaves stuffed with ground beef. Served with rice, lemon sauce, and pita bread. Add drinks and perhaps dessert, and you're all set.</div>
                </li>
              </ul>
            </Row>
            <Row className="opfc-menu-tag-list">
              {
                map(tags, ({ id, name }, index) => (
                  <Tag key={id} closable={index !== 0}>
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                  </Tag>
                ))
              }
              {
                newTagInputVisible ? (
                  <Input
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                  />
                ) : (
                  <Tag
                    onClick={this.showNewTagInput}
                    className="opfc-menu-tag-new"
                  >
                    <Icon type="plus" /> New Tag
                  </Tag>
                )
              }
            </Row>
            <Row>
              <p>
                <Button type="primary" size="large" onClick={() => selectMenuAction(1)}>Taste it</Button>
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
              <Button size="small" onClick={() => push('/profile/brand')}>View profile</Button>
            </div>
          </Col>
        </Row>
        <ReviewList />
      </div>
    );
  }
}

const mapDispatchToProps = {
  selectMenuAction: selectMenu,
};

export default compose(
  withRouter,
  connect(undefined, mapDispatchToProps),
)(MenuDetail);
