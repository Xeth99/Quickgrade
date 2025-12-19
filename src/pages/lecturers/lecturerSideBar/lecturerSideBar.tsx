import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiExamLight } from "react-icons/pi";
import { TbTallymarks } from "react-icons/tb";
import { PiListChecksLight } from "react-icons/pi";
function LecturerSideBar() {
  const sameStyle =
    "flex w-auto items-center gap-2 p-2 relative flex-none rounded-lg text-white hover:bg-white hover:text-primary hover:ml-[1px] hover:p-[10px] hover:relative hover:flex-none";
  return (
    <SideBar>
      {{
        sidebarElement: (
          <>
            <div className={sameStyle}>
              <RxDashboard size={20} />
              <Link to="/lecturers/dashboard">Dashboard</Link>
            </div>

            <div className={sameStyle}>
              <PiExamLight size={20} />
              <Link to="/lecturers/dashboard/set-exams">Set Exams</Link>
            </div>
            <div className={sameStyle}>
              <TbTallymarks size={20} />
              <Link to="/lecturers/dashboard/grade-exams">Grade Exams</Link>
            </div>
            <div className={sameStyle}>
              <PiListChecksLight size={20} />
              <Link to="/lecturers/dashboard/results">Results</Link>
            </div>
          </>
        ),
      }}
    </SideBar>
  );
}

export default LecturerSideBar;
