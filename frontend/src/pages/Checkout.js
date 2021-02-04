import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Container, Image, Button } from 'react-bootstrap'
import { completeTransaction } from '../redux/actions/userActions'
import { Link } from 'react-router-dom'


const Checkout = ({ cart, dispatch, shippingAddress }) => {
    return (
        <div>
            <br />
            <Container style={{ textAlign: "left" }}>
                <h2>Review you order</h2>
                {
                    <div>
                    <ListGroup>
                        {cart.map((cartItem, i) =>
                            <ListGroup.Item key={i}>
                                <span>
                                    <Image
                                        src={require('../../../backend/images/' + cartItem.item.picture)}
                                        style={{ maxHeight: '100px', float: "left", marginRight: '10px' }}
                                    />
                                    {cartItem.item.title}<br />
                        Quantity: {cartItem.amount}
                                </span>
                            </ListGroup.Item>
                        )}
                    </ListGroup><br/>
                    <div>
                        Shipping Address: {" "}
                    </div><br/>
                    <div>
                        Payment method: {" "}
                    </div><br/>
                    <Link to='/' ><Button onClick={() => {dispatch(completeTransaction())}}>Place your order</Button></Link>
                </div>
                }
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cart: state.userReducer.cart
})

export default connect(mapStateToProps)(Checkout)
