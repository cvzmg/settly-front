import SideBar from "./SideBar";
import MainFilterSelector from "./MainFilterSelector";

const NavBar = () => {
  return(
    <div className="flex items-center justify-center w-full h-[7%] ">
      <div className="flex items-center justify-between w-[94%] h-[80%]  pointer-events-auto">
        <div className="text-lg font-bold">Settly</div>
        <MainFilterSelector />
        <SideBar />
      </div>
    </div>
  );
};
export default NavBar;
