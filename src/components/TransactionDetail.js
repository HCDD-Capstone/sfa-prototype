import React from 'react';
import '../styles/TransactionDetail.css';
class TransactionDetail extends React.Component {

    render() {
      return <div className="wrapper">
        <div className="top">
          <div className="name">{this.props.name}</div>
          <div className="price">-${this.props.price}</div>
        </div>
        <div className="date">{this.props.date.toLocaleDateString("en-US")}</div>
      </div>;
    }
}

export default TransactionDetail;