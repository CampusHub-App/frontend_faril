import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Poster from "./assets/Image/Poster.svg";
import Ellipse from "./assets/Image/Ellipse.svg";
import Lecturer from "./assets/Image/lecturer.svg";
import Date from "./assets/Image/date.svg";
import Chair from "./assets/Image/chair.svg";
import "./css/DetailEvent.css";

const DetailEvent = () => {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // For controlling fade-in
  const [isExiting, setIsExiting] = useState(false); // For controlling fade-out
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `https://campushub.web.id/api/events/${id}/view`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventData();

    // Trigger fade-in effect after loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Delay before the fade-in effect

    return () => clearTimeout(timer);
  }, [id]);

  const handleExit = () => {
    setIsExiting(true); // Start fade-out effect
    setTimeout(() => {
      navigate(`/`); // Navigate elsewhere after fade-out
    }, 500); // Wait for the fade-out to complete
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-red-500 text-2xl font-semibold">Error</h1>
          <p className="text-red-700 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return null;
  }

  return (
    <div className="detail-event h-[1024px] pt-10 mx-4 lg:mx-20">
      <div
        className={`detail-event-container ${isLoaded ? "loaded" : ""} ${
          isExiting ? "exiting" : ""
        }`}
      >
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link
                to={
                  eventData.category_name === "Seminar"
                    ? "/seminar"
                    : eventData.category_name === "Webinar"
                    ? "/webinar"
                    : eventData.category_name === "Kuliah Tamu"
                    ? "/kuliah-tamu"
                    : eventData.category_name === "Sertifikasi"
                    ? "/sertifikasi"
                    : eventData.category_name === "Workshop"
                    ? "/workshop"
                    : "/home"
                }
                className="hover:underline"
              >
                {eventData.category_name}
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col md:flex-row">
          <div className="PosterEvent w-full md:w-1/2 h-1/2">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src={eventData.foto_event || Poster}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mx-8 mt-4 md:mt-0 md:ml-8">
            <span className="bg-[#027FFF] font-regular px-8 py-1 rounded-full text-white text-[14px] sm:text-[12px]">
              {eventData.category_name}
            </span>
            <h1 className="font-bold text-[32px] py-4 sm:text-[24px]">
              {eventData.judul}
            </h1>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="flex gap-2 ml-2">
              <img src={Date} alt="Calendar" className="text-4xl sm:text-3xl" />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">
                {eventData.date}
              </span>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 ml-auto mr-2">
                {eventData.start_time} - {eventData.end_time}
              </span>
            </div>
            <div className="flex gap-2 ml-1 my-4">
              <i className="ri-map-pin-2-fill text-4xl sm:text-3xl"></i>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">
                {eventData.tempat}
              </span>
              <img
                src={Chair}
                alt="Location"
                className="text-4xl sm:text-3xl ml-auto"
              />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 mr-2">
                {eventData.available_slot} Kursi
              </span>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="lecturer flex gap-2 ml-2 w-auto">
              <img
                src={eventData.foto_pembicara || Lecturer}
                alt="Profile"
                className="w-16 h-16 text-4xl sm:text-3xl rounded-full"
              />
              <div className="lecturername flex flex-col ml-4 gap-2 justify-center">
                <span className="font-semibold text-[16px] sm:text-[14px]">
                  {eventData.pembicara}
                </span>
                <span className="text-regular text-[14px] sm:text-[12px]">
                  {eventData.role}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[16px] sm:text-[14px] block w-full max-w-[486px]">
                {eventData.deskripsi}
              </p>
            </div>
          </div>
          <div className="booking w-full md:w-4/12 h-36 px-6 mx-auto bg-white shadow-lg rounded-2xl flex flex-col mt-4 md:mt-0">
            <h1 className="text-left my-4 font-semibold text-[20px] sm:text-[18px] pl-2 lg:text-left sm:text-center ">
              Pesan Sekarang!
            </h1>
            <button
              className="bg-[#027FFF] font-regular w-full h-11 my-4 rounded-lg text-medium text-white text-[16px] sm:text-[14px]"
              onClick={() => navigate(`/${eventData.id}/preview`)}
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-[300px]" />
      </div>
    </div>
  );
};

export default DetailEvent;
