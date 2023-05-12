import { useState } from "react";
import "./App.css";
import Header from "@/components/Header";
import FiltersContainer from "@/components/FiltersContainer";

function App() {
  const user = {
    name: "Yunier Rizo",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
  };

  return (
    <>
      <Header user={user} />
      <FiltersContainer/>
    </>
  );
}

export default App;
