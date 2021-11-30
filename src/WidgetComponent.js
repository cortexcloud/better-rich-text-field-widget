import React from 'react';
import './WidgetComponent.css';

class WidgetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData: props.inputData ?? 0,
            config: props.config ?? {hideButton: false}
        };
    }

    resetInputData = () => {
        this.setState({
            ...this.state ?? {},
            inputData: 500
        });
    }

    updateInputData = (e) => {
        this.setState({
            ...this.state,
            inputData: e.target.value
        });
        this.props.outputData(e.target.value);
    }

    render() {
      return (
          <div className="WidgetComponent">
              {!this.state.config?.hideButton && <button onClick={this.resetInputData}>reset input data to 500</button>}
              <span>this is a widget template. here you see basic input that also outputs data: </span>
              <input type="number" value={this.state.inputData} onChange={this.updateInputData} />
          </div>
      );
    }
}

export default WidgetComponent;
