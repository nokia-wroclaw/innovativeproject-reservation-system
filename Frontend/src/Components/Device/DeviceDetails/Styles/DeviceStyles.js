const deviceStyles = {
  container: {
    maxWidth: '90%',
    margin: 'auto',
    marginTop: '10px',
    borderTop: '1px solid rgba(30, 32, 33, 0.52)'
  },
  title: {
    fontSize: '32px',
    textAlign: 'center'
  },
  textArea: {
    border: '3px solid rgba(63, 116, 139, 0.57)',
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
      border: '3px solid rgb(63, 116, 139)'
    }
  },
  buttons: {
    margin: '15px 10px 20px 15px',
    position: 'relative'
  }
}

export default deviceStyles;
