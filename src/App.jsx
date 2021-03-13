import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

// this thing is for testing
class Area extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.size} cm²</h4>
      </div>
    );
  };
};

class Calculation extends Component {
  render() {
    let tray = this.props.tray,
        biscuit = this.props.biscuit,
        layers = this.props.layers,
        biscuits = this.props.biscuits;
    
    let inOneLayer = tray / biscuit;
    let remainsInLayer = tray % biscuit;
    let remainsInTotal = remainsInLayer * layers;
    let moreBiscuits = remainsInTotal / biscuit;
    let biscuitsInTotal = (inOneLayer * layers) + moreBiscuits;
    let packsOfBiscuits = biscuitsInTotal / biscuits;
    let remains = biscuitsInTotal % biscuits;
    return (
      <div>
        <h4>You will need:</h4>
        <p><b>{packsOfBiscuits.toFixed(1)}</b> packs of biscuits</p>
        <p><b>{remains.toFixed(1)}</b> biscuits additionally</p>
        { remainsInTotal !== 0 ?
        <p><b>And 1 biscuit extra, to fill in the gap</b></p>
        : null }
        <h3>Happy making biscuit cake! :)</h3>
      </div>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trayArea: {
        length: 0,
        width: 0,
      },
      biscuitArea: {
        length: 0,
        width: 0,
      },
      layers: 0,
      biscuitsInPack: 0,
      trayVisible: true,
      biscuitVisible: false,
      layersVisible: false,
      biscuitsVisible: false,
      calcVisible: false
    }
    this.handleTraySubmit = this.handleTraySubmit.bind(this);
    this.setTrayLength = this.setTrayLength.bind(this);
    this.setTrayWidth = this.setTrayWidth.bind(this);
    this.renderTrayArea = this.renderTrayArea.bind(this);
    this.handleBiscuitAreaSubmit = this.handleBiscuitAreaSubmit.bind(this);
    this.setBiscuitLength = this.setBiscuitLength.bind(this);
    this.setBiscuitAreaWidth = this.setBiscuitAreaWidth.bind(this);
    this.renderBiscuitArea = this.renderBiscuitArea.bind(this);
    this.handleLayersSubmit = this.handleLayersSubmit.bind(this);
    this.setLayers = this.setLayers.bind(this);
    this.setBiscuits = this.setBiscuits.bind(this);
    this.handleBiscuitsSubmit = this.handleBiscuitsSubmit.bind(this);
  }

  async handleTraySubmit(e) {
    e.preventDefault();
    if (this.state.trayArea.length <= 0 && this.state.trayArea.width <= 0) return;
    await this.setState({ ...this.state, trayVisible: !this.state.trayVisible });
    await this.setState({ ...this.state, biscuitVisible: !this.state.biscuitVisible });
  };

  setTrayLength(e) {
    this.setState({ trayArea: { ...this.state.trayArea, length: e.target.value } });
  };

  setTrayWidth(e) {
    this.setState({ trayArea: { ...this.state.trayArea, width: e.target.value } });
  };

  renderTrayArea() {
    let area = this.state.trayArea.length * this.state.trayArea.width;
    return <Area size={area} />
  };

  async handleBiscuitAreaSubmit(e) {
    e.preventDefault();
    if (this.state.biscuitArea.length <= 0 && this.state.biscuitArea.width <= 0) return;
    await this.setState({ ...this.state, biscuitVisible: !this.state.biscuitVisible });
    await this.setState({ ...this.state, layersVisible: !this.state.layersVisible });
  };

  setBiscuitLength(e) {
    this.setState({ biscuitArea: { ...this.state.biscuitArea, length: e.target.value } });
  };

  setBiscuitAreaWidth(e) {
    this.setState({ biscuitArea: { ...this.state.biscuitArea, width: e.target.value } });
  };

  renderBiscuitArea() {
    let area = this.state.biscuitArea.length * this.state.biscuitArea.width;
    return <Area size={area} />
  };

  async handleLayersSubmit(e) {
    e.preventDefault();
    if (this.state.layers <= 0) return;
    await this.setState({ ...this.state, layersVisible: !this.state.layersVisible });
    await this.setState({ ...this.state, biscuitsVisible: !this.state.biscuitsVisible });
  };

  setLayers(e) {
    this.setState({ ...this.state, layers: e.target.value });
  }

  setBiscuits(e) {
    this.setState({ ...this.state, biscuitsInPack: e.target.value });
  }

  async handleBiscuitsSubmit(e) {
    e.preventDefault();
    if (this.state.biscuitsInPack <= 0) return;
    await this.setState({ ...this.state, biscuitsVisible: !this.state.biscuitsVisible });
    await this.setState({ ...this.state, calcVisible: !this.state.calcVisible });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Calculator for making biscuit cake.</h3> 
          { this.state.trayVisible && (
            <div className="tray-area">
              <form onSubmit={this.handleTraySubmit}>
                <p>Insert the length and width of your tray (in cm).</p>
                <p>Your tray's length: {this.state.trayArea.length} cm</p>
                <input
                  type="number"
                  onChange={this.setTrayLength}
                  value={this.state.trayArea.length}
                />
                <p>Your tray's width: {this.state.trayArea.width} cm</p>
                <input
                  type="number"
                  onChange={this.setTrayWidth}
                  value={this.state.trayArea.width}
                />
                <button onClick={this.handleTraySubmit}>
                  Submit!
                </button>
              </form>
            </div>
          )}
          { this.state.biscuitVisible && (
            <div className="biscuit-area">
              <form onSubmit={this.handleBiscuitAreaSubmit.bind(this)}>
                <p>Insert the length and width of one biscuit (in cm).</p>
                <p>Your biscuit's length: {this.state.biscuitArea.length} cm</p>
                <input
                  type="number"
                  onChange={this.setBiscuitLength}
                  value={this.state.biscuitArea.length}
                />
                <p>Your biscuit's width: {this.state.biscuitArea.width} cm</p>
                <input
                  type="number"
                  onChange={this.setBiscuitAreaWidth}
                  value={this.state.biscuitArea.width}
                />
                <button onClick={this.handleBiscuitAreaSubmit}>
                  Submit!
                </button>
              </form>
            </div>
          )}
          { this.state.layersVisible && (
            <div className="layers">
              <form onSubmit={this.handleLayersSubmit}>
                <p>How many layers do you want to have your biscuit cake?</p>
                <h4>{this.state.layers}</h4>
                <input
                  type="number"
                  onChange={this.setLayers}
                  value={this.state.layers}
                />
                <button onClick={this.handleLayersSubmit}>
                  Submit!
                </button>
              </form>
            </div>
          )}
          { this.state.biscuitsVisible && (
            <div className="biscuits">
              <form onSubmit={this.handleBiscuitsSubmit}>
                <p>How many biscuits in one pack?</p>
                <h4>{this.state.biscuitsInPack}</h4>
                <input
                  type="number"
                  onChange={this.setBiscuits}
                  value={this.state.biscuitsInPack}
                />
                <button onClick={this.handleBiscuitsSubmit}>
                  Submit!
                </button>
              </form>
            </div>
          )}
          { this.state.calcVisible && <Calculation
            tray={this.state.trayArea.length * this.state.trayArea.width}
            biscuit={this.state.biscuitArea.length * this.state.biscuitArea.width}
            layers={this.state.layers}
            biscuits={this.state.biscuitsInPack}
          />}
        </header>
      </div>
    )
  }
}

export default App;
