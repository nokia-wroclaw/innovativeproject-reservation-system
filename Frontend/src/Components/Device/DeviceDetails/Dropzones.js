import React, { Component } from 'react';
import DropZone from 'react-dropzone'

import style from './Styles/DeviceStyles'

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
      <div style={style.dropzoneRow}>
        <div style={style.dropzoneBox}>
          {!this.state.isMainImageUploaded
            ? (
              <div>
                <h1 style={style.imageTitle}>Full image</h1>
                <DropZone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onMainImageDrop}
                  thumbnailWidth='200px'
                  thumbnailHeight='200px'
                  maxFiles={ 1}
                >
                <p>Drop an image or click and select it</p>
                </DropZone>
              </div>
            )
            : (
              <div>
                <h1 style={style.imageTitle}>Full image</h1>
                  {this.state.mainImage.map(mi => <img src={mi.preview} style={{maxWidth: '200px', maxHeight: '200px', marginTop: '30px'}} />)}
              </div>
            )
          }
        </div>
        <div style={style.dropzoneBox}>
          {!this.state.isThumbUploaded
            ? (
              <div  >
                <h1 style={style.imageTitle}>Thumbnail</h1>
                <DropZone
                  multiple={false}
                  accept="image/*"
                  thumbnailWidth='200px'
                  thumbnailHeight='200px'
                  onDrop={this.onThumbImageDrop}
                  maxFiles={ 1}
                >
                <p>Drop an image or click and select it</p>
                </DropZone>
              </div>
            )
            : (
              <div>
                <h1 style={style.imageTitle}>Thumbnail</h1>
                  {
                    this.state.thumbImage.map(mi => <img src={mi.preview} style={{maxWidth: '200px', maxHeight: '200px', marginTop: '30px'}} />)
                  }

              </div>
            )
          }
        </div>
      </div>
    );
  }

}

export default Dropzones;
