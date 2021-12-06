import React from "react";

import Form from "./Form/Form";
import Posts from "./Posts/Posts";
import SearchTerm from "./Search";

class Home extends React.Component {
  state = { currentId: 0 };

  setCurrentId = (id) => {
    this.setState({ currentId: id });
  };
  render() {
    return (
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6 order-0 order-md-1 mb-3">
          <SearchTerm />
          <Form
            fetchId={this.state.currentId}
            setCurrentId={this.setCurrentId}
          />
        </div>
        <div className="col-xl-9 col-lg-8 col-md-6 order-1 order-md-0">
          <Posts setCurrentId={this.setCurrentId} />
        </div>
      </div>
    );
  }
}

export default Home;
