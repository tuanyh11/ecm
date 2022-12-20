import React from "react";
class Profile extends React.Component {
  render() {
    // this.props.img_url = 'http://via.placeholder.com/350x150'
    const style = {
      padding: "10px",
      border: "1px solid green",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
      color: "#4db1e8",
      textAlign: "center",
      fontFamily: "sans-serif",
    };
    // console.log(process.env);

    return (
      <div style={style}>
        <img src={this.props.logo_url} height="250px" />
        <h1>{this.props.title}aa</h1>
      </div>
    );
  }
}
export default Profile;
