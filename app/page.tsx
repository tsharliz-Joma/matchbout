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
      <h3>View Fighters button</h3>
      <h3>My Fighters</h3>
    </main>
  );
}
