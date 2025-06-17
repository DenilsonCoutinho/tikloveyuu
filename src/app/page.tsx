"use client"
import { FormUserProvider } from "../../context/FormUserContext";
import Presentation from "./home/page";
export default function Home() {

  return (
    <FormUserProvider>
      <div className="bg-defaultBg ">
        <Presentation />
      </div>
    </FormUserProvider>
  );
}
