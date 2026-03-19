import logo from "../../../assets/bragboard-logo.png";

const Topbar = () => {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <img src={logo} alt="BragBoard" className="h-8" />
        
      </div>
      <h2 className="text-xl font-semibold text-softBrown">
  BragBoard Employee
</h2>

      <div className="w-9 h-9 bg-softBrown text-white rounded-full flex items-center justify-center font-semibold">
        E
      </div>
    </div>
  );
};

export default Topbar;