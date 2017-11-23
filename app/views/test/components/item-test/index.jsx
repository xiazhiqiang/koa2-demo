import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

class ItemTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="item-test">
        <h2>ItemTest</h2>
        <p>content</p>
      </div>
    );
  }
}

ItemTest.propTypes = {};

ItemTest.defaultProps = {};

module.exports = ItemTest;