import React from "react";
import { Container, Row, Form, Col, InputGroup, Button } from "react-bootstrap";
import { formatAppointmentStatus } from "../uitls/utilities";

const AppointmentFilter = ({
  statuses = [],
  selectedStatus,
  onSelectStatus,
  onClearFilters,
}) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Filter appointments by status:</Form.Label>
              <InputGroup>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => onSelectStatus(e.target.value)}
                >
                  <option value="all">all</option>
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>
                      {formatAppointmentStatus(status)}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={onClearFilters}
                >
                  Clear filter
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentFilter;
