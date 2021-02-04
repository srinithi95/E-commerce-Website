import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { addToCart } from '../redux/actions/userActions'

import store from '../index'

import { Link } from 'react-router-dom'


const Item = ({ item, dispatch, ws }) => {
    const [views, setViews] = React.useState('')
    const [added, setAdded] = React.useState(false)
    const [amount, setAmount] = React.useState(1)
    const addedToCart = () => {
        setAdded(true)
        setTimeout(() => {
            setAdded(false)
        }, 1500);
    }
    const option = []
    for (let i = 0; i < item.stock; i++) {
        option.push(<option value={i + 1} key={i}>{i + 1}</option>)
    }
    
    ws.onmessage =(message) =>{
        const messageObject = JSON.parse(message.data);
        switch(messageObject.type){
          case 'UPDATE_COUNT':
            
            if(item._id == messageObject.id){
                setViews(messageObject.id.views);
            }
             break;
            
        case 'DECREASE_COUNT':
            
            if(item._id == messageObject.id.id){
                setViews(messageObject.id.views);
            }


    }};

    const leavePage = () => {

        console.log('inside leave page')
        const dataToSend = {
            type:'DECREASE_COUNT',
            id: item._id,
                };
        ws.send(JSON.stringify(dataToSend));
    }

    return (
        <div>
            <br />
            <Container style={{ textAlign: 'left' }}>
                <Link className='btn btn-primary' to='/' onClick={() => {leavePage()}} style={{marginBottom:'10px'}}>Back</Link>
                <Row>
                    <Col sm='4'><Image src={require(`./../../../backend/images/${item.picture}`)} fluid='true' /></Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">from {item.seller}</Card.Subtitle>
                                <Card.Text>
                                    {item.desctiption}<br />
                                    In Stock: {item.stock}
                                </Card.Text>
    <div>People currently viewing the item: {views}</div>
                                Quantity:
                                <select onChange={e => setAmount(e.target.value)}>
                                    {option}
                                </select>
                                {' '}<Button onClick={() => {
                                    dispatch(addToCart(amount))
                                    addedToCart()
                                    leavePage()
                                }}>Add to cart</Button>{added && <p style={{ color: 'red' }}>Item added</p>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    item: state.itemReducer.item,
})

export default connect(mapStateToProps)(Item)
