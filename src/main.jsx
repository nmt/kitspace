// main.js
const React = require('react');
const ReactDOM = require('react-dom');
const testData = require('./boards.json');

var TitleBar = React.createClass({
  render: function () {
    return (
      <div style={
        { backgroundColor:'rgb(55,55,55)'
        , width:'100%', height:'64px'
        , boxShadow: '0px 0.1em 0.5em #000'
        }
      }>
        <img src='images/logo.png' style={{padding: '10 10 10 10'}}/>
      </div>
    );
  }
});

const dim = {
  thumb : {
      w    : 300
    , h    : 225
    , capH : 48
  }
}

var BoardThumb = React.createClass({
  getInitialState: function() {
    return {hover: false};
  },
  handleMouseOver: function (e) {
    this.setState({hover: true});
  },
  handleMouseOut: function (e) {
    this.setState({hover: false});
  },
  handleClick: function (e) {
    document.location.href += 'boards/' + this.props.data.id;
  },
  render: function () {
    var style = {
      backgroundColor: '#F0F0F0'
      , width: dim.thumb.w + 32 + 16
      , height: dim.thumb.h + dim.thumb.capH + 16 + 5
      , borderRadius: 5
      , fontFamily: 'helvetica, sans'
      , fontWeight: 'bold'
      , fontSize: 16
      , color: 'rgb(55,55,55)'
      , margin: '16px 0px 0px 16px'
      , float: 'left'
    };
    if (this.state.hover) {
      style.backgroundColor = '#CFCFCF';
    }
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
        style={style}
      >
      <div>
        <img src={'boards/' + this.props.data.id + '/images/thumb.png'}
          style = {{
            padding: '16px 16px 0px 16px'
          }}
        />
      </div>
      <div style={
        { height: dim.thumb.capH
        , textAlign: 'center'
        , verticalAlign: 'middle'
        , lineHeight: String(dim.thumb.capH) + 'px'
        , paddingBottom: 5
        }
      }>
        {this.props.data.id.split('/').slice(1).join(' / ')}
      </div>
      </div>
    );
  }
});

var BoardList = React.createClass({
  render: function () {
    var thumbNodes = this.props.data.map(function(data) {
      return (
        <BoardThumb data={data} />
      );
    });
    return (
      <div>
      {thumbNodes}
      </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return (
      <div>
      <TitleBar />
      <BoardList data={testData} />
    </div>
    );
  }
});

ReactDOM.render(
  <Main />,
  document.getElementById('content')
);