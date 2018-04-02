// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

//var Alert = require('react-bootstrap/lib/Alert');

var MySmallModal = React.createClass({
    render: function () {
        return (
            <ReactBootstrap.Modal
                {...this.props}
                bsSize="small"
                aria-labelledby="contained-modal-title-sm"
            >
                <ReactBootstrap.Modal.Header closeButton>
                    <ReactBootstrap.Modal.Title id="contained-modal-title-sm">Modal heading</ReactBootstrap.Modal.Title>
                </ReactBootstrap.Modal.Header>
                <ReactBootstrap.Modal.Body>
                    <h4>Wrapped Text</h4>
                    <p>Test
                    </p>
                </ReactBootstrap.Modal.Body>
                <ReactBootstrap.Modal.Footer>
                    <ReactBootstrap.Button onClick={this.props.onHide}>Close</ReactBootstrap.Button>
                </ReactBootstrap.Modal.Footer>
            </ReactBootstrap.Modal>

        )
    }
});

var UploadBar = React.createClass({
    getInitialState: function (){
        return {
            smShow: false,
            lgShow: false
        }
    },
   
   render: function () {
       let smClose = () => this.setState({ smShow: false });
       let lgClose = () => this.setState({ lgShow: false });

       return (
           <ReactBootstrap.ButtonToolbar>
               <ReactBootstrap.Button
                   bsStyle="primary"
                   onClick={() => this.setState({ smShow: true })}
               >
                   Launch small demo modal
               </ReactBootstrap.Button>
               <ReactBootstrap.Button
                   bsStyle="primary"
                   onClick={() => this.setState({ lgShow: true })}
               >
                   Launch large demo modal
               </ReactBootstrap.Button>

               <MySmallModal show={this.state.smShow} onHide={smClose} />
               <MySmallModal show={this.state.lgShow} onHide={lgClose} />
           </ReactBootstrap.ButtonToolbar>)
   } 
});