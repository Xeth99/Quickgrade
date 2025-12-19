import "./LecturerDashboard.css";
import "../../../assets/menu-board.png";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../../utils/axiosInstance";
import Header from "../../../components/header/header";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import ToastContainerComponent from "../../../components/notifications/Notifications";

interface Exam {
  courseCode: string;
  department: string;
  examDate: string;
  examDuration: string;
  venue: string;
  registered: string;
  noOfStudents: number;
}

function LecturerDashboard() {
  const { lecturerData } = useAuth();

  const [examData, setExamData] = useState<Exam[]>([]);

  const baseStyle = "border-t border-[#98A2B3] border-b py-[1rem] px-[0.6rem]";
  const thStyle = "px-[0.4rem]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/lecturers/dashboard");

        if (res.status === 200 && res.data.examsTotal) {
          setExamData(res.data.examsTotal);
        }
      } catch (error) {
        ToastContainerComponent.error("Error fetching dashboard data:");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full">
      <LecturerSideBar />

      <div className="w-[80%] ml-[20%]">
        {lecturerData && (
          <Header newUser={lecturerData.title + " " + lecturerData.lastName} />
        )}
        <div className="heading-dashboard">Dashboard</div>

        <div className="bg-primary w-[90%]  my-8 mx-auto p-6 rounded-2xl items-center">
          {lecturerData && (
            <div className="text-white font-semibold">
              <p>
                {lecturerData.title} {lecturerData.firstName}{" "}
                {lecturerData.lastName},
              </p>{" "}
              <p>Department of {lecturerData?.department},</p>
              <p>Faculty of {lecturerData?.faculty}</p>
              <p>Camouflage University</p>
              <p>Lagos, Nigeria</p>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="w-[90%] mx-auto">
          <div className="lecturer-dashboard-semester-session-container">
            2022/2023 : First Semester
          </div>

          <div className="font-semibold">Course Examination TimeTable</div>

          {examData && examData.length > 0 && (
            <table className="border-collapse border-spacing-8 table-auto w-[96%] mx-4 my-4">
              <thead>
                <tr>
                  <th className={thStyle}>Course Code</th>
                  <th className={thStyle}>Department</th>
                  <th className={thStyle}>Exam Date</th>
                  <th className={thStyle}>Venue</th>
                  <th className={thStyle}>Registered</th>
                  <th className={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {examData.map((exam, index) => (
                  <tr className="lecturer-exam-timetable-row" key={index}>
                    <td className={baseStyle}>{exam.courseCode}</td>
                    <td className={baseStyle}>{exam.department}</td>
                    <td className="date-column">
                      {format(exam.examDate, "d MMM,yyyy / h:mmaa")}
                    </td>
                    <td className={baseStyle}>Campus E-center</td>
                    <td className={`${baseStyle} w-[20%]`} >{exam.noOfStudents}</td>
                    <td>
                      <button className="rounded-md bg-primary text-white p-2 w-full">
                        <p>Set Exam</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}

export default LecturerDashboard;
