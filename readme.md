      <Form style={{with: '700px'}}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={e => onInputChange('firstName', e)}
                value={inputs['firstName']} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Last Name"
                
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="npiNumber">
          <Form.Label></Form.Label>
        </Form.Group>
      </Form>