import React from 'react'
import SnackBar from './SnackBar'
import { v4 } from 'uuid'

let alertSnack: (item: any) => void;

interface AlertSnackState {
  snacklist: Array<any>;
  last: number;
}

class AlertSnack extends React.PureComponent {
  state: AlertSnackState = {
    last: 0,
    snacklist: [],
  }

  closeSnackbar = (key: any) => {
    this.setState({
      snacklist: [...this.state.snacklist.filter(item => item?.key !== key)],
    })
  }

  addSnackbar = (item: any) => {
    const currKey = this.state.last + 1

    this.setState({
      last: currKey,
      snacklist: [
        ...this.state.snacklist,
        {
          key: currKey,
          ...item,
        },
      ],
    })
  }

  onClose = (key: string) => (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }
    this.closeSnackbar(key)
  }
  componentDidMount() {
    alertSnack = this.addSnackbar
  }
  render() {
    return (
      <React.Fragment>
        {this.state.snacklist.map((item: any) => (
          <SnackBar key={v4()} {...item} onClose={this.onClose(item.key)} open={true} />
        ))}
      </React.Fragment>
    )
  }
}

export default AlertSnack
export { alertSnack }