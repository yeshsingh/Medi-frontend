// import React from 'react';

// function MyBookings() {
//   return (
//     <div>
//         MyBookings
//     </div>
//   );
// }

// export default MyBookings;
import usefetchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../components/Loader/Loading";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Error from "../../components/Error/Error";

const MyBookings = () => {

  const {data:appointments, loading, error} = usefetchData(`${BASE_URL}/users/appointments/my-appointments`)

  return (
    <div>
    {loading && !error && <Loading />}
      
    {error && !loading && <Error errMessage={error}/>}
    {
      !loading && !error && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {appointments.map(doctor=>(
        <DoctorCard doctor={doctor} key={doctor._id}/>
        
      ))}
      </div>
  )}
  {!loading && !error && appointments.length===0 && (
      <h2 className="mt-5 tect-center leading-7 text-[20px] font-semibold text-primaryColor">
      You have booked an appointment with Dr. Alfaz
      </h2>
    )}
    </div>

    
  );
};

export default MyBookings;
