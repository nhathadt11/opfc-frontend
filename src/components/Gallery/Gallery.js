import React from 'react';
import { Upload, Modal } from 'antd';
import { arrayOf, string } from 'prop-types';
import { map, isEmpty } from 'lodash';

class Gallery extends React.Component {
  static propTypes = {
    photoList: arrayOf(string),
  }

  static defaultProps = {
    photoList: [],
  }

  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { photoList } = this.props;
    const { previewVisible, previewImage } = this.state;
    const fileList = !isEmpty(photoList) ? map(photoList, (p, idx) => ({
      uid: idx,
      name: 'photo.png',
      status: 'done',
      url: p,
    })) : [{
      uid: '-1',
      name: 'photo.png',
      status: 'done',
      url: 'https://vanteacafe.com/img/placeholders/xcomfort_food_placeholder.png,qv=1.pagespeed.ic.x100Yi-Swz.png',
    }];

    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          // onChange={this.handleChange}
          showUploadList={{ showRemoveIcon: false }}
        />
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Gallery;
