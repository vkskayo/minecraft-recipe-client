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
import fatSteve from "../assets/fatSteve.png";

function useDebounce(value) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value]);

  return debounceValue;
}

const FOODS = gql`
  query ($name: String!) {
    getSubsetFoods(name: $name) {
      name
      displayName
      foodImage
      foodPoints
    }
  }
`;

const foodSize = {
  width: 30,
  height: 30,
};

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
  const [inputField, setInputField] = useState("");
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanillaa" },
  ]);
  const [foodPoints, setFoodPoints] = useState(0);

  const debounceValue = useDebounce(inputField);

  const [loadCraft, { a, b, c }] = useLazyQuery(FOODS, {
    onCompleted: (queryData) => {
      console.log(queryData);
      const newOptions = queryData.getSubsetFoods.map((food) => {
        return {
          value: [food.name, food.foodPoints],
          label: (
            <div className="d-flex gap-2">
              <img style={foodSize} src={food.foodImage} />
              <p className="fs-5">{food.displayName}</p>
            </div>
          ),
        };
      });

      setOptions(newOptions);
    },
  });

  useEffect(() => {
    loadCraft({ variables: { name: debounceValue } });
    // I might need this.
  }, []);

  console.log(foodPoints);

  const steveSize = {
    width: 206,
    height: 412,
  };

  const fatSteveSize = {
    width: 250,
    height: 250,
  };

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
      <div className="mx-auto d-flex justify-content-md-between col-12 col-lg-9 col-md-11 gap-5 flex-column flex-lg-row body-food">
        <div className="d-flex justify-content-center">
          <Map />
        </div>

        {foodPoints >= 20 ? (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4">
              <img style={fatSteveSize} src={fatSteve} />
              <button onClick={() => setFoodPoints(0)}>Help Steve !!</button>
            </div>
          </>
        ) : (
          <img
            className="mx-auto"
            style={steveSize}
            src="https://lh3.googleusercontent.com/PgfJZomAD_4Q1BM9e9yxrvo6BXPX4BnYTCV23GIHGLGjFTEQS1UFR2-SF63r7llMAsq7t6Z-s2VBIH3hmr5zoA=s400"
          />
        )}

        <div className="d-flex flex-column gap-5">
          <div className="d-flex  justify-content-center">
            {Array(Math.floor((20 - foodPoints) / 2))
              .fill(0)
              .map(() => {
                return <img style={foodIconDimension} src={EmptyHunger} />;
              })}

            {Array(Math.floor(foodPoints % 2 == 1))
              .fill(0)
              .map(() => {
                return <img style={foodIconDimension} src={HalfHunger} />;
              })}

            {Array(Math.floor(foodPoints / 2))
              .fill(0)
              .map(() => {
                return <img style={foodIconDimension} src={FilledHunger} />;
              })}

            {/*            <img style={foodIconDimension} src={EmptyHunger} />
            <img style={foodIconDimension} src={HalfHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} />
            <img style={foodIconDimension} src={FilledHunger} /> */}
          </div>
          <Select
            className="col-md-12 col-10 mx-auto"
            onInputChange={setInputField}
            inputValue={inputField}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          {selectedOption ? (
            <>
              <p>
                Food Points: <span>{selectedOption.value[1]}</span>
              </p>
              <button
                onClick={() =>
                  setFoodPoints(
                    foodPoints + selectedOption.value[1] >= 20
                      ? 20
                      : foodPoints + selectedOption.value[1]
                  )
                }
              >
                Eat a {selectedOption.value[0]}
              </button>
            </>
          ) : null}
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
