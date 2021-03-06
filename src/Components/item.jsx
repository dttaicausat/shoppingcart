import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BiPurchaseTag } from "react-icons/bi";
import { add } from "../redux/Action";
import { BsFillHeartFill } from "react-icons/bs";
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      love: false,
    };
    this.Add = this.Add.bind(this);
    this.Love = this.Love.bind(this);
  }
  Add() {
    this.props.AddToCart(this.props.item);
    this.setState({ count: this.state.count + 1 });
  }
  Love() {
    if (!this.state.love) {
      axios
        .post(`http://localhost:5000/product/update/${this.props.item._id}`, {
          ...this.props.item,
          love: this.props.item.love + 1,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
        this.setState({love:true});
    }
  }
  render() {
    return (
      <div className="item">
        <img
          className="itemImg img-thumbnail"
          src={this.props.item.url}
          alt={this.props.item.name}
        />

        <p className="itemName">{this.props.item.name}</p>
        <h3 className="itemPrice">
          {this.props.item.cost.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h3>

        <button
          onClick={this.Add}
          className="btn btn-secondary  text-center btn-buy mb-3 itemBuy"
        >
          Buy <BiPurchaseTag />
        </button>
        {/* <h4 className="itemRemain"> {this.props.item.quantity}Remain</h4> */}
        <button onClick={this.Love} className="itemHeart">
          <BsFillHeartFill></BsFillHeartFill> {this.props.item.love}
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { NewListItem: state.itemReducer.OnProcessing };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddToCart: (item) => {
      dispatch(add(item));
    },
  };
};

const Item = connect(mapStateToProps, mapDispatchToProps)(Presentational);
export default Item;
