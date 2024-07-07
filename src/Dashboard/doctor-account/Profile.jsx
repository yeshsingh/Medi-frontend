import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import { BASE_URL,token } from "../../../config";
import { toast } from "react-toastify";

const Profile = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',  
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [{ startingDate: "", endingDate: "", degree: "", university: "" }],
        experiences: [{ startingDate: "", endingDate: "", position: "", hospital: "" }],
        timeSlots: [],
        about: '',
        photo: null
    });

    const handleInputChange = (e, section, index) => {
        const { name, value } = e.target;
        const newData = { ...formData };
        newData[section][index] = { ...newData[section][index], [name]: value };
        setFormData(newData);
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        
    };
    
    const addItem = (section, item = {}) => {
        setFormData(prevState => ({
            ...formData,
            [section]: [...prevState[section], item]
        }));
    };

    const deleteItem = (section, index) => {
        setFormData(prevState => ({
            ...formData,
            [section]: prevState[section].filter((_, i) => i !== index)
        }));
    };
    
    const updateProfileHandler = async (e) => {
        e.preventDefault();

        try{
            const res=await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
                method: "PUT",
                headers:{
                    "content-type":"application/json",
                    Authorization:`Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const result=await res.json();
            if(!res.ok)
                {
                    throw Error(result.message);
                }
                toast.success(result.message);
        }
        catch(err){
            toast.error(err.message);
        }
        // Your update profile logic here
    };

    const addQualification = (e) => {
        e.preventDefault();
        addItem("qualifications");
    };

    const handleQualificationChange = (e, index) => {
        const { name, value } = e.target;
        const updatedQualifications = [...formData.qualifications];
        updatedQualifications[index][name] = value;
        setFormData({ ...formData, qualifications: updatedQualifications });
    };

    const addExperience = (e) => {
        e.preventDefault();
        addItem("experiences", { startingDate: "", endingDate: "", position: "", hospital: "" });
    };

    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>

            <form>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="form__input"
                        readOnly
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone Number"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Bio"
                        className="form__input"
                        maxLength={100}
                    />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="form__input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                className="form__input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Ticket Price*</p>
                            <input
                                type="number"
                                placeholder="100"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                                className="form__input"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="form__label">Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Degree*</p>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={item.degree}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">University*</p>
                                    <input
                                        type="text"
                                        name="university"
                                        value={item.university}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <button
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                                onClick={() => deleteItem("qualifications", index)}
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addQualification}
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                    >
                        Add Qualification
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={(e) => handleInputChange(e, "experiences", index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={(e) => handleInputChange(e, "experiences", index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        onChange={(e) => handleInputChange(e, "experiences", index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        onChange={(e) => handleInputChange(e, "experiences", index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <button
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                                onClick={() => deleteItem("experiences", index)}
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                        onClick={addExperience}
                    >
                        Add Experience
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                <div>
                                    <p className="form__label">Day*</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        onChange={(e) => handleInputChange(e, "timeSlots", index)}
                                        className="form__input py-3.5"
                                    >
                                        <option value="">Select</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form__label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        onChange={(e) => handleInputChange(e, "timeSlots", index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        onChange={(e) => handleInputChange(e, "timeSlots", index)}
                                        className="form__input"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6"
                                        onClick={() => deleteItem("timeSlots", index)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                        onClick={addTimeSlot}
                    >
                        Add Time Slot
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">About</p>
                    <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        placeholder="Write about you"
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        className="form_input w-full"
                    ></textarea>
                </div>

                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                        <img src={formData.photo} alt="" className="w-full rounded-full" />
                    </figure>}

                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />

                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>

                <div className="mt-7">
                    <button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white tex [18px] leading-[30px] w-full py-3 px-4 rounded-lg">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
