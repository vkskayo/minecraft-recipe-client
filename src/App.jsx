import "./App.css";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { CraftingTable } from "../components/CraftingTable";
import { SiMinecraft } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedItem } from "../atoms/selectedItem";
import { Modal } from "../components/modal";
import { LoadingSpinner } from "@apollo/space-kit/Loaders/LoadingSpinner";
import styled from "@emotion/styled";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedItem);

  const RECIPES = gql`
    query {
      recipes
    }
  `;

  const { loading, error, data } = useQuery(RECIPES, {
    onCompleted: (queryData) => {
      setRecipes(queryData.recipes);
    },
  });

  const functionCall = (event) => {
    setSelectedIndex(event.target.getAttribute("a-key"));
  };
  const SpinnerContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "100vh",
  });
  return (
    <div className="App">
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

      <CraftingTable itemIndex={selectedIndex} />

      {!loading ? <h1 className="my-4 title">- Recipes</h1> : null}

      <div className="d-flex flex-wrap col-10  col-md-8 mx-auto justify-content-center">
        {!loading ? (
          recipes.map((recipeUrl, idx) => {
            if (recipeUrl) {
              return (
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#updateReview"
                  onClick={functionCall}
                  key={idx}
                  a-key={idx}
                  className="iventory-bg d-flex justify-content-center align-items-center hover-effect"
                >
                  <img a-key={idx} className="item-img" src={recipeUrl} />
                </div>
              );
            }
          })
        ) : (
          <SpinnerContainer>
            <LoadingSpinner
              data-testid="spinner"
              size="large"
              theme="grayscale"
            />
          </SpinnerContainer>
        )}
      </div>
      <Modal />
      <footer className="p-5 mt-5 mx-auto bg-dark">
        <h4 className="text-center text-light">
          © vkskayo | This site is not affiliated with Mojang | Contact
        </h4>
      </footer>
    </div>
  );
}

export default App;
