import React from 'react';
import {
  Checkbox, Row, Col, Spin,
} from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, number, string, func, bool,
} from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';
import './Category.css';

const Category = ({
  categoryList, changeFullTextSearchCriteriaAction, categoryNames, fetching,
}) => {
  const onChange = checkedValues => changeFullTextSearchCriteriaAction('categoryNames', checkedValues);

  return (
    <MenuFilterItemStyled>
      <MenuFilterItemTitleStyled htmlFor="">Category</MenuFilterItemTitleStyled>
      <Spin spinning={fetching}>
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={onChange}
          value={categoryNames}
          className="opfc-category-type-list"
        >
          <Row>
            {
              map(categoryList, category => (
                <Col span={24} key={category.id}>
                  <Checkbox value={category.name}>{category.name}</Checkbox>
                </Col>
              ))
            }
          </Row>
        </Checkbox.Group>
      </Spin>
    </MenuFilterItemStyled>
  );
};

Category.propTypes = {
  categoryList: arrayOf(shape({
    id: number,
    name: string,
  })).isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
  categoryNames: arrayOf(string).isRequired,
  fetching: bool.isRequired,
};

const mapStateToProps = state => ({
  categoryList: state.generalReducer.categoryList,
  fetching: state.generalReducer.fetchingCategoryList,
  categoryNames: state.generalReducer.fullTextSearch.categoryNames,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Category);
