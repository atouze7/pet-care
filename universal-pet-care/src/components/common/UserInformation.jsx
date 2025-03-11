import React from "react";

const UserInformation = ({ userType, appointment }) => {
  return (
    <div className="mt-2 mb-2" style={{ backgroundColor: "whiteSmoke" }}>
      <h5>{userType === "VET" ? "Patient " : "Veterinarian "} Information</h5>
      {userType === "VET" ? (
        <React.Fragment>
          <p className="text-info">
            Appointment No: {appointment.appointmentNo}
          </p>
          <p>
            Name: {appointment.patient.firstName} {appointment.patient.lastName}
          </p>
          <p>Email: {appointment.patient.email}</p>
          <p className="text-info">
            Phone Number: {appointment.patient.phoneNumber}
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-info">
            Appointment No: {appointment.appointmentNo}
          </p>
          <p>
            Name: Dr. {appointment.vet.firstName} {appointment.vet.lastName}
          </p>
          <p className="text-info">
            Specialization: {appointment.vet.specialization}
          </p>
          <p>Email: {appointment.vet.email}</p>
          <p className="text-info">
            Phone Number: {appointment.vet.phoneNumber}
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInformation;
