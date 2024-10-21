import React from "react";
import FightersPage from "../../page/FightersPage/FightersPage";
import {getStaticProps} from "next/dist/build/templates/pages";

const Fighters = ({data}) => {
  return (
    <>
      <FightersPage data={data} />
    </>
  );
};
