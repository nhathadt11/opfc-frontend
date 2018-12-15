import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';
import { compose } from 'redux';
import {
  shape, func, arrayOf, number,
} from 'prop-types';
import { connect } from 'react-redux';
import {
  map, filter, some, intersection,
} from 'lodash';
import { fetchServiceLocationManyRequest, updateServiceLocationManyRequest } from '../../actions/settings';

const FormItem = Form.Item;

class ServiceLocation extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    cityList: arrayOf(shape({})).isRequired,
    districtList: arrayOf(shape({})).isRequired,
    fetchServiceLocationManyRequestAction: func.isRequired,
    serviceLocationIds: arrayOf(number).isRequired,
    updateServiceLocationManyRequestAction: func.isRequired,
  }

  state = {
    selectedCityIds: [],
  }

  componentDidMount() {
    const { fetchServiceLocationManyRequestAction } = this.props;

    fetchServiceLocationManyRequestAction();

    const selectedCityList = this.getCityListBySelectedDistrictIds();
    const selectedCityIds = map(selectedCityList, c => c.id);

    this.setState({ selectedCityIds });
  }

  componentDidUpdate(prevProps) {
    const { serviceLocationIds, form: { setFieldsValue } } = this.props;

    if (JSON.stringify(prevProps.serviceLocationIds) !== JSON.stringify(serviceLocationIds)) {
      const selectedCityList = this.getCityListBySelectedDistrictIds();
      const selectedCityIds = map(selectedCityList, c => c.id);

      setFieldsValue({ serviceCityIds: selectedCityIds, serviceLocationIds });
    }
  }

  getCityListBySelectedDistrictIds() {
    const { districtList, cityList, serviceLocationIds } = this.props;
    const selectedDistrictList = filter(
      districtList,
      d => some(serviceLocationIds, id => id === d.id),
    );
    const cityListContainsSelectedDistrictList = filter(
      cityList,
      c => some(selectedDistrictList, d => d.cityId === c.id),
    );

    return cityListContainsSelectedDistrictList;
  }

  handleCityChange = (cityIds) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const ableSelectDistrictIds = map(this.getAbleDistrictList(cityIds), d => d.id);
    const selectedDistrictIds = getFieldValue('serviceLocationIds');

    const nextSelectedDistrictIds = intersection(ableSelectDistrictIds, selectedDistrictIds);
    setFieldsValue({ serviceLocationIds: nextSelectedDistrictIds });

    this.setState({ selectedCityIds: cityIds });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      updateServiceLocationManyRequestAction,
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) updateServiceLocationManyRequestAction(values.serviceLocationIds);
    });
  };

  getAbleDistrictList = (cityIds) => {
    const { districtList } = this.props;
    const { selectedCityIds } = this.state;

    return filter(
      districtList,
      d => some(cityIds || selectedCityIds, id => id === d.cityId),
    );
  }

  render() {
    const {
      form, cityList, serviceLocationIds,
    } = this.props;
    const { selectedCityIds } = this.state;
    const ableSelectDistrictList = this.getAbleDistrictList();

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          label="Service Cities"
        >
          {form.getFieldDecorator('serviceCityIds', {
            initialValue: selectedCityIds,
            rules: [{ type: 'array', required: true, message: 'Please select service cities!' }],
          })(
            <Select
              mode="multiple"
              showSearch
              onChange={this.handleCityChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} // eslint-disable-line
            >
              { map(cityList, c => (
                <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
              )) }
            </Select>,
          )}
        </FormItem>
        <FormItem
          label="Service Districts"
        >
          {form.getFieldDecorator('serviceLocationIds', {
            initialValue: serviceLocationIds,
            rules: [{ type: 'array', required: true, message: 'Please select service districts!' }],
          })(
            <Select
              mode="multiple"
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} // eslint-disable-line
            >
              { map(ableSelectDistrictList, d => (
                <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
              )) }
            </Select>,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  districtList: state.generalReducer.districtList,
  cityList: state.generalReducer.cityList,
  serviceLocationIds: state.settingsReducer.serviceLocation.serviceLocationIds,
});

const mapDispatchToProps = {
  fetchServiceLocationManyRequestAction: fetchServiceLocationManyRequest,
  updateServiceLocationManyRequestAction: updateServiceLocationManyRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(ServiceLocation);
