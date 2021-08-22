import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <Container className="pt-6 pb-1 absolute inset-x-0 bottom-0">
                <Row>
                    <Col className="text-center">
                        <span className="text-gray-500">Copyright &copy; All rights reserved </span>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer
