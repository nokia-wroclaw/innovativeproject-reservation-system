import React, { Component } from 'react';
import DropZone from 'react-dropzone'

class Dropzones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
      thumbImage: '',
      isMainImageUploaded: false,
      isThumbUploaded: false
    };
  }

  onMainImageDrop = (files) => {
    this.setState({
      mainImage: files,
      isMainImageUploaded: true
    });
  }

  onThumbImageDrop = (files) => {
    this.setState({
      thumbImage: files,
      isThumbUploaded: true
    });
  }

  render() {
    return (
      <div>
        <div>
          {!this.state.isMainImageUploaded
            ? (
              <DropZone
                multiple={false}
                accept="image/*"
                onDrop={this.onMainImageDrop}
              >
              <p>Drop an image or click and select it</p>
              </DropZone>
            )
            : (
              <p>dzieki</p>
            )
          }
        </div>
        <div>
          {!this.state.isThumbUploaded
            ? (
              <DropZone
                multiple={false}
                accept="image/*"
                onDrop={this.onThumbImageDrop}
              >
              <p>Drop an image or click and select it</p>
              </DropZone>
            )
            : (
              <p>dzieki</p>
            )
          }
        </div>
      </div>
    );
  }

}

export default Dropzones;
