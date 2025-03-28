import React, { useEffect, useState } from "react";
import { Accordion, Container, Row, Button, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import PetsTable from "../pets/PetsTable";
import { UserType } from "../uitls/utilities";
import { formatAppointmentStatus } from "../uitls/utilities";
import useColorMapping from "../hooks/ColorMapping";
import PatientActions from "../actions/PatientActions";
import VeterinarianActions from "../actions/VetActions";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Link, useParams } from "react-router-dom";
import {
  updateAppointment,
  cancelAppointment,
  declineAppointment,
  approveAppointment,
  getAppointmentById,
} from "./AppointmentService";

import AlertMessage from "../common/AlertMessage";
import UserInformation from "../common/UserInformation";
import AppointmentFilter from "./AppointmentFilter";
import Paginator from "../common/Paginator";

const UserAppointments = ({ user, appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);

  const colors = useColorMapping();

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  const { recipientId } = useParams();

  const fetchAppointment = async (appointmentId) => {
    try {
      console.log("The appointment Id :", appointmentId);
      const response = await getAppointmentById(appointmentId);
      const updatedAppointment = response.data;
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handlePetsUpdate = async (updatedAppointmentId) => {
    try {
      await fetchAppointment(updatedAppointmentId);
    } catch (error) {
      console.error(error);
    }
  };

  // For Vets:

  // Aprrove Appointment.
  const handleDeclineAppointment = async (appointmentId) => {
    try {
      const response = await declineAppointment(appointmentId);
      console.log("The cancellation response: ", response);
      setSuccessMessage(response.message);
      setShowErrorAlert(false);
      setShowSuccessAlert(true);
    } catch (error) {
      console.log("The decline error: ", error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  //Decline Appointment
  const handleApproveAppointment = async (appointmentId) => {
    try {
      const response = await approveAppointment(appointmentId);
      console.log("The cancellation response: ", response);
      setSuccessMessage(response.message);
      setShowErrorAlert(false);
      setShowSuccessAlert(true);
    } catch (error) {
      console.log("The decline error: ", error);
      setErrorMessage(error.response.data.message);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  };

  //Patients:
  // Cancel Appointment

  const handleCancelAppointment = async (id) => {
    try {
      const response = await cancelAppointment(id);
      console.log("The cancellation response: ", response);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  //Update Appointment
  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      const result = await updateAppointment(
        updatedAppointment.id,
        updatedAppointment
      );
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
      console.log("The result from update :", result);
      setSuccessMessage(result.data.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSelectStatus = (status) => {
    setSelectedStatus(status);
  };
  const handleClearFilter = () => {
    setSelectedStatus("all");
  };

  const statuses = Array.from(
    new Set(appointments.map((appointment) => appointment.status))
  );

  useEffect(() => {
    let filter = appointments;
    if (selectedStatus && selectedStatus !== "all") {
      filter = appointments.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }
    setFilteredAppointments(filter);
  }, [selectedStatus, appointments]);

  const indexOfLastVet = currentPage * appointmentsPerPage;
  const indexOfFirstVet = indexOfLastVet - appointmentsPerPage;

  const currentAppointments = filteredAppointments.slice(
    indexOfFirstVet,
    indexOfLastVet
  );

  return (
    <Container className="p-3">
      <AppointmentFilter
        onClearFilters={handleClearFilter}
        statuses={statuses}
        onSelectStatus={onSelectStatus}
      />

      <Accordion className="mt-4 mb-5">
        {currentAppointments.map((appointment, index) => {
          const formattedStatus = formatAppointmentStatus(appointment.status);

          const statusColor = colors[formattedStatus] || colors["default"];

          const isWaitingForApproval =
            formattedStatus === "waiting-for-approval";
          const isApproved = formattedStatus === "approved";

          return (
            <Accordion.Item eventKey={index} key={index} className="mb-4">
              <Accordion.Header>
                <div>
                  <div className="mb-3">
                    Date: {appointment.appointmentDate}
                  </div>
                  <div style={{ color: statusColor }}>
                    Status: {formattedStatus}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-4">
                  <Col md={4} className="m-t2">
                    <p>
                      Appointment Number :{" "}
                      <span className="text-info">
                        {appointment.appointmentNo}
                      </span>{" "}
                    </p>

                    <ReactDatePicker
                      selected={
                        new Date(
                          `${appointment.appointmentDate}T${appointment.appointmentTime}`
                        )
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      inline
                    />

                    <p>
                      Time :
                      <span className="text-info">
                        {" "}
                        {appointment.appointmentTime}
                      </span>{" "}
                    </p>
                    <p>Reason: {appointment.reason}</p>
                  </Col>

                  <Col md={8} className="mt-2">
                    <h4>Pets:</h4>
                    <PetsTable
                      pets={appointment.pets}
                      onPetsUpdate={handlePetsUpdate}
                      isEditable={isWaitingForApproval}
                      isPatient={user.userType === UserType.Patient}
                      appointmentId={appointment.id}
                    />
                  </Col>

                  {isApproved && (
                    <UserInformation
                      userType={user.userType}
                      appointment={appointment}
                    />
                  )}
                </Row>
                {showErrorAlert && (
                  <AlertMessage type={"danger"} message={errorMessage} />
                )}

                {showSuccessAlert && (
                  <AlertMessage type={"success"} message={successMessage} />
                )}
                {user.userType === UserType.Patient && (
                  <Link to={`/book-appoitnemnt/${recipientId}/new-appointmnet`}>
                    Book New Apppointment
                  </Link>
                )}

                {user && user.userType === UserType.Patient && (
                  <div>
                    <PatientActions
                      onCancel={handleCancelAppointment}
                      onUpdate={handleUpdateAppointment}
                      isDisabled={!isWaitingForApproval}
                      appointment={appointment}
                    />
                  </div>
                )}

                {user && user.userType === UserType.VET && (
                  <div>
                    <VeterinarianActions
                      onApprove={handleApproveAppointment}
                      onDecline={handleDeclineAppointment}
                      isDisabled={!isWaitingForApproval}
                      appointment={appointment}
                    />
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Paginator
        itemsPerPage={appointmentsPerPage}
        totalItems={filteredAppointments.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default UserAppointments;
