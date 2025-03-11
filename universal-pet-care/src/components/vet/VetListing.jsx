import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VetCard from "./VetCard";
import { getVets } from "./VetService";
import VetSearch from "./VetSearch";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { set } from "date-fns";

export const VetListing = () => {
  const [vets, setVets] = useState([]);
  const [allVeterinarians, setAllVeterinarians] = useState([]);
  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();

  /*useEffect(() => {
    getVets()
      .then((data) => {
        setVets(data.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);*/

  useEffect(() => {
    getVets()
      .then((response) => {
        setVets(response.data); // Accessing the array of vets correctly
        setAllVeterinarians(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.response.message || "An error occurred");
        setShowErrorAlert(true);
      });
  }, []);

  const handleSearchResult = (veterinarians) => {
    if (veterinarians === null) {
      setVets(allVeterinarians);
    } else if (Array.isArray(veterinarians) && veterinarians.length > 0) {
      setVets(veterinarians);
    } else {
      setVets([]);
    }
  };

  if (vets.length === 0) {
    return <p>No Vets found at this time</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="text-center mb-4 mt-4">Meet Our Veterinarians</h2>
      </Row>

      <Row className="justify-content-center">
        <Col md={4}>
          <VetSearch onSearchResult={handleSearchResult} />
        </Col>
        <Col md={7}>
          {vets.map((vet, index) => (
            <VetCard key={index} vet={vet} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};
