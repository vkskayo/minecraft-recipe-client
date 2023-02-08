import "../App.css";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { SiMinecraft } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoadingSpinner } from "@apollo/space-kit/Loaders/LoadingSpinner";
import styled from "@emotion/styled";
import HalfHunger from "../assets/halfHunger.png";
import FilledHunger from "../assets/fullHunger.png";
import EmptyHunger from "../assets/emptyHunger.png";
import { Map } from "../components/Map";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function Foods() {
  const SpinnerContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "100vh",
  });

  const foodIconDimension = {
    width: 30,
    height: 30,
  };

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="">
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="container col-10 col-md-8">
          <a
            className="navbar-brand"
            href="https://pt.wikipedia.org/wiki/Minecraft"
            target="_blank"
          >
            <SiMinecraft size={120} />
          </a>
          <a
            className="navbar-brand"
            href="https://github.com/vkskayo/minecraft-recipe"
            target="_blank"
          >
            <BsGithub size={50} />
          </a>
        </div>
      </nav>
      <div className="mx-auto d-flex justify-content-md-between col-12 col-lg-9 col-md-11 gap-5 flex-column flex-md-row vh-100">
        <div className="d-flex justify-content-center">
          <Map />
        </div>

        <div className="d-flex flex-column gap-5">
          <div className="d-flex  justify-content-center">
            <img style={foodIconDimension} src={EmptyHunger} />
            <img className="" style={foodIconDimension} src={HalfHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
          </div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
      </div>

      <footer className="p-5 mt-5 mx-auto bg-dark">
        <h4 className="text-center text-light">
          © vkskayo | This site is not affiliated with Mojang | Contact
        </h4>
      </footer>
    </div>
  );
}

export default Foods;
