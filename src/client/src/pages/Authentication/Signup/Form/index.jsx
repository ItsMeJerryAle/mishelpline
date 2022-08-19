import React from 'react';
import FacultyForm from './FacultyForm';
import StaffForm from './StaffForm';
import StudentForm from './StudentForm';

const Forms = ({ userType }) => {
	if (userType === 'faculty') {
		return <FacultyForm userType={userType} />;
	} else if (userType === 'staff') {
		return <StaffForm userType={userType} />;
	} else if (userType === 'student') {
		return <StudentForm userType={userType} />;
	} else {
		return <div>Please select User Type</div>;
	}
};

export default Forms;
