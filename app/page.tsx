import React from "react";
import DashBoard from "@/components/ux/dashboard";

export default function Home() {
  return (
    <main className="">
      <section id="header" className="text-center">
        <h1>Match Bout</h1>
      </section>
      <DashBoard />
      <h3>Messages button</h3>
      <h3>Find sparring button</h3>
      <h3>Add Fighter</h3>
      <hr></hr>
      <div className="text-center">Your Fighters</div>
      {/* Carousel of the fighters  */}
    </main>
  );
}
