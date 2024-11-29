import React from "react";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-400 flex items-center justify-center">
      <div className="w-full max-w-md p-4"> {/* Added padding to ensure content doesn't touch edges */}
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-10">Enter symptoms</h1>

        {/* MultiSelectDropdown Component */}
        <MultiSelectDropdown />
      </div>
    </div>
  );
};

export default App;
