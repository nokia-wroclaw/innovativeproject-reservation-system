const deviceStyles = {
  title: {
    fontSize: '32px',
    textAlign: 'center'
  },
  textArea: {
    border: '3px solid rgba(0, 0, 0, 0.25)',
    margin: '10px 5px 5px 5px',
    color: 'black',
    padding: '2px',
    minWidth: '40%',
    fontSize: '14px',
    maxWidth: '80%',
    maxHeight: '20%',
    position: 'relative',
    resize: 'none',
    ":active": {
      border: '3px solid rgba(0, 0, 0, .5)'
    }
  },
  buttons: {
    margin: '15px 10px 20px 15px',
    position: 'relative'
  },
  imageTitle: {
    fontSize: '16px',
    position: 'relative'
  },
  textFieldForm: {
    minWidth: '130px',
    overflow: 'hidden',
    width: '30%',
    position: 'absolute'
  },
  dropzoneBox: {
    width: '50%',
    display: 'inline-block',
    overflow: 'hidden',
  },
  dropzoneRow: {
    width: '100%',
  }
}

export default deviceStyles;
