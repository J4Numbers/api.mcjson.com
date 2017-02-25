import React from 'react';

export class LoadWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loaded: false,
            dirty: false
        }
        
    }

     componentDidMount(){
         this.doLoad(this.props);
     }

    componentWillReceiveProps(nextProps){
        this.doLoad(nextProps);
    }

    doLoad(props) {
        this.setState({ loaded: false });
        this.props.loaderFn(props)
            .then(data => {
                this.setState({
                    loaded: true,
                    data: data,
                    dirty: false
                })
            })
    }

    doSave() {
        if (this.state.dirty) {
            this.props.saverFn(this.state.data)
                .then(data => {
                    this.setState({
                        dirty: false
                    })
                })
        }
    }

    render() {
        let {Composed} = this.props;
        if (!this.state.loaded) {
            return <div><h4>Loading...</h4></div>
        } else {
            return <div>
                <button
                    className="btn btn-primary" style={{ float: "right" }}
                    disabled={!this.state.dirty}
                    onClick={() => this.doSave()}>Save</button>
                <Composed
                    value={this.state.data}
                    onChange={v => this.setState({ dirty: true, data: v })}
                />
            </div>
        }
    }
}

export function connectLoader(Composed, loaderFn, saverFn) {
    return props => <LoadWrapper {...props} {...{ loaderFn, saverFn, Composed }} />
}

export function loadData(data) {
    return () => Promise.resolve(data);
}