import React from "react";
import {
  Accordion,
  AccordionItem,
  Col,
  Placeholder,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import placeHolder from "../../assets/images/placeHolder.jpg";
import UserImage from "../common/UserImage";
import RatingStars from "../rating/RatingStars";

export default function VetCard(props) {
  return (
    <Col key={props.vet.id} className="mb-4 xs=(12)">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex align-items-center">
              <Link>
                <UserImage
                  userId={props.vet.id}
                  userPhoto={props.vet.photo}
                  placeholder={placeHolder}
                />
              </Link>
            </div>
            <div>
              <Card.Title className="ttile">
                Dr. {props.vet.firstName} {props.vet.lastName}
              </Card.Title>
              <Card.Title>
                <h6>{props.vet.specialization}</h6>
              </Card.Title>
              <Card.Text className="review rating-stars">
                Reviews: <RatingStars rating={props.vet.averageRating} /> (
                {props.vet.totalReviewers})
              </Card.Text>
              <Link
                to={`/book-appointment/${props.vet.id}/new-appointment`}
                className="link"
              >
                Book appointment
              </Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Link to={`/vet/${props.vet.id}/vet`} className="link-2">
                See what people are saying about
              </Link>{" "}
              <span className="margin-left-space">
                Dr.{props.vet.firstName}
              </span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
}
