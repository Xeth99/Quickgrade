import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
interface SideBarChildren {
  children: {
    sidebarElement: ReactNode;
  };
}
function SideBar({ children }: SideBarChildren) {
  const { sidebarElement } = children;

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      // Make a GET request to your logout route
      const redirectURL = location.pathname.startsWith("/students")
        ? "/students"
        : "/lecturers";
      window.localStorage.removeItem("token");
      // await axios.get("http://localhost:3000/students/dashboard/logout", { withCredentials: true });

      navigate(`${redirectURL}/signin`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section className="hidden md:flex fixed top-0 left-0 flex-col bg-primary h-screen w-[20%] p-6 gap-6 transition-all duration-500">
      {/* Logo Section */}
      <div className="flex items-end gap-2">
        <div className="flex items-center justify-center p-2 bg-white rounded-full">
          <img
            className="w-6 h-6"
            src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-award.svg"
            alt="logo icon"
          />
        </div>
        <span className="text-white text-[32px] font-bold -mt-[1px]">
          eloQuence
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-1">
        <img
          className="w-full"
          src="https://c.animaapp.com/IX1zE9E9/img/vector-2.svg"
          alt="divider"
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-[16px] font-medium text-white">Overview</div>
          <div className="mt-2">{sidebarElement}</div>
        </div>

        <div>
          <div className="text-[16px] font-medium text-white">Others</div>

          {/* Settings */}
          <div className="flex items-center gap-2 p-2 mt-2 text-white rounded-lg hover:bg-white hover:text-primary">
            <IoSettingsOutline size={20} />
            <Link
              to={
                location.pathname.startsWith("/students")
                  ? "/students/dashboard/change-password"
                  : "/lecturers/dashboard/change-password"
              }
              className="text-[16px]"
            >
              Settings
            </Link>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-primary"
          >
            <SlLogout size={20} />
            <span className="text-[16px] font-semibold">Logout</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
