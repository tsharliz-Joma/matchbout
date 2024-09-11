import React from "react";

const Header = ({children}) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-lg">MatchBout Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
