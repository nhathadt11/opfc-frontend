import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, func, bool,
} from 'prop-types';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import MenuCardGrid from '../../../../containers/MenuCardGrid/MenuCardGrid';
import { fetchBookmarkManyRequest } from '../../../Bookmark/actions/bookmark';

class EventPlannerBookmark extends Component {
  static propTypes = {
    bookmarkList: arrayOf(shape({})).isRequired,
    fetchBookmarkManyRequestAction: func.isRequired,
    fetching: bool.isRequired,
  }

  componentDidMount() {
    const { fetchBookmarkManyRequestAction } = this.props;
    fetchBookmarkManyRequestAction();
  }

  render() {
    const { bookmarkList, fetching } = this.props;

    return (
      <div>
        <EventPlannerTabTitleStyled>Bookmark</EventPlannerTabTitleStyled>
        <MenuCardGrid dataList={bookmarkList} fetching={fetching} forceFetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmarkList: state.bookmarkReducer.bookmarkList,
  fetching: state.bookmarkReducer.fetching,
});

const mapDispatchToProps = {
  fetchBookmarkManyRequestAction: fetchBookmarkManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerBookmark);
