import React from "react";
import PropTypes from "prop-types";

// 引入组件
import ItemTest from "../components/item-test/index.jsx";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {this.props.content}
        <ItemTest/>
      </div>
    );
  }
}

App.defaultProps = {
  content: "Hello world~"
};

App.propTypes = {
  content: PropTypes.string
};

module.exports = App;
