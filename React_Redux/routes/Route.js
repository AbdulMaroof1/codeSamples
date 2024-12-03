import React, { createContext, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteProps,
  useLocation,
  Navigate,
  Outlet,
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
import BedBooking from '../views/Dashboard/Services/BedBooking';
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
import Doctors from '../views/Dashboard/Chat/Dotors';

import DoctorDashboard from '../views/HealthPractitioner/Home';
import { useDispatch } from 'react-redux';
import CompleteProfile from '../views/HealthPractitioner/completeProfile';
import AllDepartment from '../views/Dashboard/Departments';
import Wards from '../views/Dashboard/Ward';
import AddWard from '../views/Dashboard/Ward/addWard';
import AddDepartment from '../views/Dashboard/Departments/addDepartment';
import BedBookingService from '../views/Dashboard/Services/Booking';
import ViewBeds from '../views/Dashboard/Services/Booking/ViewBeds';
import HospitalRequests from '../views/Dashboard/Home/HospitalRequests';
import Layout from '../layout/Layout';
import Blogs from '../views/Dashboard/Blogs/Blogs';
import BlogDetails from '../views/Dashboard/Blogs/BlogDetails';
import AddBlogs from '../views/Dashboard/Blogs/AddBlogs';
import WebServices from '../views/Dashboard/WebServices/WebServices';
import ServiceDetails from '../views/Dashboard/WebServices/ServiceDetails';
import AddServiceDetails from '../views/Dashboard/WebServices/AddServiceDetails';
import Inquiries from '../views/Dashboard/Inquiries/Inquiries';
import InquiriesDetails from '../views/Dashboard/Inquiries/InquiriesDetails';
import Hospitals from '../views/Dashboard/HospitalProfile/Hospitals';
import Appointmentss from '../views/Dashboard/HospitalProfile/Appointments';
import SupportInquiries from '../views/Dashboard/Support/SupportInquiries';
import ViewInquiries from '../views/Dashboard/Support/ViewInquiries';
import BookAppointment from '../views/Dashboard/Appointments/BookAppointment';
import Favourites from '../views/Dashboard/Favourites';
import InpersonAppointment from '../views/Dashboard/Appointments/InpersonAppointment';
import VirtualAppointment from '../views/Dashboard/Appointments/VirtualAppoinment';
import PatientBedBooking from '../views/Dashboard/Services/BedBooking/PatientBedBooking';
import PatientBedBookingForm from '../views/Dashboard/Services/BedBooking/PatientBedBookingForm';
import HealthPractitionerAppointment from '../views/Dashboard/Patients/HealthPractitionerAppointment';
import JobDetail from '../components/Website/jobs/JobDetail';
import HospitalJobs from '../views/Dashboard/Jobs/HospitalJobs';
import JobDetails from '../views/Dashboard/Jobs/JobDetails';
import FAQ from '../views/Website/FAQ';
import NearByDoctors from '../views/Dashboard/Home/NearByDoctors';
import ElectronicAdvertising from '../views/Dashboard/ElectronicAdvertising';
import WebLayout from '../layout/WebLayout';
import HospitalsFormRequest from '../views/Dashboard/FormRequest/HospitalsFormRequest';
import FormRequestHospitalList from '../views/Dashboard/FormRequest/formRequestHospitalList';
import FormRequestDetail from '../views/Dashboard/FormRequest/FormRequestDetail';
import ExternalDoctors from '../views/Dashboard/ExternalDoctors/ExternalDoctors';
import DoctorDetail from '../views/Dashboard/ExternalDoctors/DoctorDetail';
import AddStaff from '../views/Dashboard/Staff/AddStaff';
import HospitalStaff from '../views/Dashboard/Staff/HospitalStaff';
import StaffDetail from '../views/Dashboard/Staff/StaffDetail';
import Policy from '../views/Website/Policy';
import PatientServices from '../views/Dashboard/Services/Patient/PatientServices';
import Offer from '../views/Dashboard/Offer/Offer';
import Travel from '../views/Dashboard/Travel/Travel';
import SearhHome from '../views/Dashboard/Search';
import SearchHome from '../views/Dashboard/Search';
import History from '../views/Dashboard/Search/History';
import Credits from '../views/Dashboard/Credits';
import Forget from '../views/verification/Forget';
import NewPassword from '../views/verification/newPassword';

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

  // useEffect(() => {
  //   if (
  //     !user.fullName &&
  //     location.pathname !== '/register' &&
  //     location.pathname !== '/forgot-password'
  //   ) {
  //     navigate('/login');
  //   } else if (
  //     user.fullName &&
  //     (location.pathname === '/login' ||
  //       location.pathname === '/register' ||
  //       location.pathname === '/forgot-password')
  //   ) {
  //     navigate('/dashboard');
  //   }
  // }, [user.fullName, navigate, location.pathname]);

  // return user.fullName ? (
  //   children
  // ) : location.pathname === '/login' ||
  //   location.pathname === '/register' ||
  //   location.pathname === '/forgot-password' ? (
  //   children
  // ) : (
  //   <Login />
  // );
};

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('emediiUser') || '{}');
  // return user.fullName ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={'/login'} state={{ from: location }} replace />
  // );
  return allowedRoles.includes(user.roleID) ? (
    <Outlet />
  ) : user?.fullName ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};
const RequireNoAuth = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('emediiUser') || '{}');
  return user.fullName ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default function AppRoute() {
  return (
    <div>
      {/* <Router> */}
      <ScrollToTop />
      <Routes>
        {/* Define your routes here */}
        <Route element={<WebLayout />}>
          <Route index element={<Login />} />

        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          // element={
          //   <RequireAuth
          //     allowedRoles={[
          //       'hospital',
          //       'practitioner',
          //       'superadmin',
          //       'patient',
          //     ]}
          //   />
          // }
        >
          <Route element={<Layout />}>
            <Route index element={<DashboardHome />} />
            <Route path="new-search" element={<SearchHome />} />
            
            <Route path="buy-credits" element={<Credits />} />
            <Route path="search-history" element={<History />} />

            
            {/* <Route path='/new-search' element={<SearhHome />} /> */}
            <Route path="appointments" element={<DashboardAppointments />} />
            <Route
              path="appointments/appointment-details/:id"
              element={<AppointmentDetail />}
            />
            <Route path="hospital-profile" element={<HospitalProfile />} />
            <Route path="hospital-profile/:id" element={<HospitalProfile />} />
            <Route path="services" element={<ServicesDashboard />} />

            <Route
              path="services/health-practitioner"
              element={<HeathPractitioner />}
            />
            <Route path="services/training-hub" element={<Training />} />
            <Route
              path="services/electronic-advertising"
              element={<Electronic />}
            />

            <Route path="add-hospital-staff" element={<AddStaff />} />
            <Route path="hospital-staff" element={<HospitalStaff />} />
            <Route path="staff-detail/:id" element={<StaffDetail />} />

            <Route path="services/service" element={<Service />} />
            <Route path="hospital-edit-profile" element={<EditProfile />} />
            <Route path="help-support" element={<HelpSupportDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="doctors" element={<DashboardDoctors />} />
            <Route path="edit-doctor" element={<AddDoctorInfo />} />
            <Route path="doctor-profile/:id" element={<DoctorProfile />} />
            <Route path="block-users" element={<BlockUsers />} />
            <Route path="patients" element={<PatientsList />} />
            <Route path="patient-profile/:id" element={<PatientProfile />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogdetails/:id" element={<BlogDetails />} />
            <Route path="addblog" element={<AddBlogs />} />
            <Route path="hospital-services" element={<WebServices />} />
            <Route path="hospital-service/:id" element={<ServiceDetails />} />
            <Route
              path="hospital-addservicesdetails"
              element={<AddServiceDetails />}
            />
            <Route
              path="electronic-advertising"
              element={<ElectronicAdvertising />}
            />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="inquiry/:id" element={<InquiriesDetails />} />
            <Route path="supportinquiries" element={<SupportInquiries />} />
            <Route path="viewinquiries" element={<ViewInquiries />} />

            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="chat/doctors" element={<Doctors />} />
            <Route path="departments" element={<AllDepartment />} />
            <Route path="wards" element={<Wards />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="add-wards" element={<AddWard />} />
            <Route path="services/bed-booking" element={<BedBooking />} />
            <Route path="services/:name/view-beds/:id" element={<ViewBeds />} />

            <Route path="complete-profile" element={<CompleteProfile />} />
            {/* Super Admin */}
            <Route path="hospital-requests" element={<HospitalRequests />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="appointments/:status" element={<Appointmentss />} />
            <Route path="job-details/:id" element={<JobDetail />} />
            <Route path="job-details/edit/:id" element={<JobDetail />} />

            {/* Super Admin */}
            {/* Patient */}
            <Route path="book-appointment/:id" element={<BookAppointment />} />
            <Route path="services/patient" element={<PatientServices />} />
            <Route
              path="inperson-appointment"
              element={<InpersonAppointment />}
            />
            <Route path="near-by-doctors" element={<NearByDoctors />} />
            <Route
              path="virtual-appointment"
              element={<VirtualAppointment />}
            />
            <Route path="favourites" element={<Favourites />} />
            <Route path="bed-booking" element={<PatientBedBooking />} />
            <Route
              path="patient-booking/:id"
              element={<PatientBedBookingForm />}
            />
            <Route path="jobs" element={<HospitalJobs />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="offers" element={<Offer />} />
            <Route path="travel" element={<Travel />} />
            <Route
              path="health-practitioner"
              element={<HealthPractitionerAppointment />}
            />
            {/* Patient */}
          </Route>
        </Route>

        {/* Dashboard Routes */}

        {/* Authentication Routes */}
        <Route element={<RequireNoAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forget />} />
          <Route path="/verify-otp" element={<Verification />} />
          <Route path="/change-password" element={<NewPassword />} />

        </Route>
        <Route
          path="/dashboard"
          // element={
          //   <RequireAuth
          //     allowedRoles={['hospital', 'doctor_web', 'superadmin']}
          //   />
          // }
        >
          <Route element={<Layout />}>
            <Route path="form-request" element={<FormRequest />} />
            <Route path="form-request/:id" element={<FormRequest />} />
            <Route
              path="form-request/hospitals/:id"
              element={<HospitalsFormRequest />}
            />
            <Route path="external-doctors" element={<ExternalDoctors />} />
            <Route path="external-doctor/:id" element={<DoctorDetail />} />
            <Route
              path="form-request/hospitals/form/:formId/:id"
              element={<FormRequestHospitalList />}
            />
            <Route
              path="form-request/detail/:id"
              element={<FormRequestDetail />}
            />
            <Route
              path="form-request/electronic-request/:id"
              element={<ElectronicRequest />}
            />
            <Route
              path="form-request/admission-request/:id"
              element={<AdmissionRequest />}
            />
            <Route
              path="form-request/hospital-request/:id"
              element={<HospitalRequest />}
            />
            <Route
              path="form-request/electronic-hospital-request/:id"
              element={<ElectronicHospitalRequest />}
            />
          <Route
              path="form-request/medical-hospital-request/:id"
              element={<MedicalHospitalRequest />}
            />
          </Route>
        </Route>

        {/* Authentication Routes */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}
