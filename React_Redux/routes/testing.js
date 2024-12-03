import React, { createContext, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteProps,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import RouteSwitch from './RouteSwitch';
import Home from '../views/Website/Home';
import NotFound from '../views/NotFound';
import AboutUs from '../views/Website/About';
import Services from '../views/Website/Services';
import ServiceInner from '../views/Website/ServiceInner';
import BlogsMain from '../views/Website/Blogs';
import SingleBlog from '../views/Website/SingleBlog';
import Career from '../views/Website/Careers';
import SingleCareer from '../views/Website/SingelCareer';
import Terms from '../views/Website/Terms';
import Apply from '../views/Website/Apply';
import Contact from '../views/Website/Contact';
import Login from '../views/auth/Login';
import Verification from '../views/verification';
import Register from '../views/auth/Register';
import DashboardHome from '../views/Dashboard/Home';
import HospitalProfile from '../views/Dashboard/HospitalProfile';
import EditProfile from '../views/Dashboard/HospitalProfile/EditProfile';
import DashboardAppointments from '../views/Dashboard/Appointments';
import HelpSupportDashboard from '../views/Dashboard/Help';
import AppointmentDetail from '../views/Dashboard/Appointments/AppointmentDetail';
import ServicesDashboard from '../views/Dashboard/Services';
// import BedBooking from '../views/Dashboard/Services/BedBooking';
import Service from '../views/Dashboard/Services/Service';
import HeathPractitioner from '../views/Dashboard/Services/HealthPractitioner';
import Training from '../views/Dashboard/Services/Training';
import Electronic from '../views/Dashboard/Services/Electronic';

import Profile from '../views/Dashboard/Profile';
import DashboardDoctors from '../views/Dashboard/Doctors';
import AddDoctorInfo from '../views/Dashboard/Doctors/AddDoctorInfo';
import DoctorProfile from '../views/Dashboard/Doctors/DoctorProfile';
import PatientsList from '../views/Dashboard/Patients';
import PatientProfile from '../views/Dashboard/Patients/PatientProfile';
import Chat from '../views/Dashboard/Chat';
import BlockUsers from '../views/Dashboard/BlockUsers/index';
import FormRequest from '../views/Dashboard/FormRequest';
import ElectronicRequest from '../views/Dashboard/FormRequest/ElectronicRequest';
import AdmissionRequest from '../views/Dashboard/FormRequest/AdmissionRequest';
import HospitalRequest from '../views/Dashboard/FormRequest/HospitalRequest';
import ElectronicHospitalRequest from '../views/Dashboard/FormRequest/ElectronicHospitalRequest';
import MedicalHospitalRequest from '../views/Dashboard/FormRequest/MedicalHospitalRequest';

import DoctorDashboard from '../views/HealthPractitioner/Home';
import { useDispatch } from 'react-redux';
import CompleteProfile from '../views/HealthPractitioner/completeProfile';
import AllDepartment from '../views/Dashboard/Departments';
import Wards from '../views/Dashboard/Ward';
import AddWard from '../views/Dashboard/Ward/addWard';
import AddDepartment from '../views/Dashboard/Departments/addDepartment';
import BedBookingService from '../views/Dashboard/Services/Booking';
import ViewBeds from '../views/Dashboard/Services/Booking/ViewBeds';
import Layout from '../layout/Layout';
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
export const UserContext = createContext();

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('emediiUser') || '{}');

  useEffect(() => {
    if (
      !user.fullName &&
      location.pathname !== '/register' &&
      location.pathname !== '/forgot-password'
    ) {
      navigate('/login');
    } else if (
      user.fullName &&
      (location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/forgot-password')
    ) {
      navigate('/dashboard');
    }
  }, [user.fullName, navigate, location.pathname]);

  return user.fullName ? (
    children
  ) : location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password' ? (
    children
  ) : (
    <Login />
  );
};

export default function AppRoute() {
  return (
    <div>
      {/* <Router> */}
      <ScrollToTop />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-inner/:id" element={<ServiceInner />} />
        <Route path="/blogs" element={<BlogsMain />} />
        <Route path="/single-blog/:id" element={<SingleBlog />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/single-career/:id" element={<SingleCareer />} />
        <Route path="/apply-career/:id" element={<Apply />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/contact-us" element={<Contact />} />
        {/* Dashboard Routes */}

        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            }
          />
          <Route
            path="appointments"
            element={
              <PrivateRoute>
                <DashboardAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="appointments/appointment-details/:id"
            element={
              <PrivateRoute>
                <AppointmentDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital-profile"
            element={
              <PrivateRoute>
                <HospitalProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="services"
            element={
              <PrivateRoute>
                <ServicesDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="services/health-practitioner"
            element={
              <PrivateRoute>
                <HeathPractitioner />
              </PrivateRoute>
            }
          />
          <Route
            path="services/training-hub"
            element={
              <PrivateRoute>
                <Training />
              </PrivateRoute>
            }
          />
          <Route
            path="services/electronic-advertising"
            element={
              <PrivateRoute>
                <Electronic />
              </PrivateRoute>
            }
          />
          <Route
            path="services/service"
            element={
              <PrivateRoute>
                <Service />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital-edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="help-support"
            element={
              <PrivateRoute>
                <HelpSupportDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="doctors"
            element={
              <PrivateRoute>
                <DashboardDoctors />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-doctor"
            element={
              <PrivateRoute>
                <AddDoctorInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="doctor-profile/:id"
            element={
              <PrivateRoute>
                <DoctorProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="block-users"
            element={
              <PrivateRoute>
                <BlockUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="patients"
            element={
              <PrivateRoute>
                <PatientsList />
              </PrivateRoute>
            }
          />
          <Route
            path="patient-profile/:id"
            element={
              <PrivateRoute>
                <PatientProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request"
            element={
              <PrivateRoute>
                <FormRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request/electronic-request/:id"
            element={
              <PrivateRoute>
                <ElectronicRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request/admission-request/:id"
            element={
              <PrivateRoute>
                <AdmissionRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request/hospital-request/:id"
            element={
              <PrivateRoute>
                <HospitalRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request/electronic-hospital-request/:id"
            element={
              <PrivateRoute>
                <ElectronicHospitalRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="form-request/medical-hospital-request/:id"
            element={
              <PrivateRoute>
                <MedicalHospitalRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="departments"
            element={
              <PrivateRoute>
                <AllDepartment />
              </PrivateRoute>
            }
          />
          <Route
            path="wards"
            element={
              <PrivateRoute>
                <Wards />
              </PrivateRoute>
            }
          />
          <Route
            path="add-department"
            element={
              <PrivateRoute>
                <AddDepartment />
              </PrivateRoute>
            }
          />
          <Route
            path="add-wards"
            element={
              <PrivateRoute>
                <AddWard />
              </PrivateRoute>
            }
          />
          <Route
            path="services/bed-booking"
            element={
              <PrivateRoute>
                <BedBookingService />
              </PrivateRoute>
            }
          />
          <Route
            path="services/:name/view-beds/:id"
            element={
              <PrivateRoute>
                <ViewBeds />
              </PrivateRoute>
            }
          />

          <Route
            path="complete-profile"
            element={
              <PrivateRoute>
                <CompleteProfile />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Dashboard Routes */}

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PrivateRoute>
              <Verification />
            </PrivateRoute>
          }
        />
        {/* Authentication Routes */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}
