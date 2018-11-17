import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { arrayOf, shape, func } from 'prop-types';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import MenuCardGrid from '../../../../containers/MenuCardGrid/MenuCardGrid';
import { fetchBookmarkManyRequest } from '../../../Bookmark/actions/bookmark';

class EventPlannerBookmark extends Component {
  static propTypes = {
    bookmarkList: arrayOf(shape({})).isRequired,
    fetchBookmarkManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchBookmarkManyRequestAction } = this.props;
    fetchBookmarkManyRequestAction();
  }

  render() {
    const { bookmarkList } = this.props;

    return (
      <div>
        <EventPlannerTabTitleStyled>Bookmark</EventPlannerTabTitleStyled>
        <MenuCardGrid dataList={bookmarkList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmarkList: state.bookmarkReducer.bookmarkList,
});

const mapDispatchToProps = {
  fetchBookmarkManyRequestAction: fetchBookmarkManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerBookmark);
