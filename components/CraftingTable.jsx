import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { FaEquals } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa";

export function CraftingTable() {
  const CRAFTING = gql`
    query {
      getCrafts {
        resultedItem
        resultedItemId
        inShape
      }
    }
  `;

  const [crafts, setCrafts] = useState([]);
  const [selectedResultedItemId, setSelectedResultedItemId] = useState(-1);
  const [resultedItemImage, setResultedItemImage] = useState("");

  const [loadCraft, { a, b, c }] = useLazyQuery(CRAFTING, {
    onCompleted: (queryData) => {
      setResultedItemImage(
        queryData.getCrafts[selectedResultedItemId].resultedItem
      );
      setCrafts(
        queryData.getCrafts[selectedResultedItemId].inShape
          ? queryData.getCrafts[selectedResultedItemId].inShape
          : []
      );
    },
  });

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5">
          <div className="crafting-table d-flex flex-wrap">
            {crafts.length >= 1 ? (
              crafts.map((arr, idx) => {
                if (Array.isArray(arr)) {
                  if (arr.length == 1) {
                    return (
                      <>
                        {arr[0] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[0]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}
                        <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                      </>
                    );
                  } else if (arr.length == 2) {
                    return (
                      <>
                        {arr[0] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[0]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}

                        {arr[1] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[1]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}
                        <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                      </>
                    );
                  } else if (arr.length == 3) {
                    return (
                      <>
                        {arr[0] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[0]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}
                        {arr[1] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[1]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}
                        {arr[2] !== null ? (
                          <div className="iventory-bg d-flex justify-content-center align-items-center">
                            <img className="item-img" src={arr[2]} />
                          </div>
                        ) : (
                          <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                        )}
                      </>
                    );
                  }
                }
              })
            ) : (
              <>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
                <div className="iventory-bg d-flex justify-content-center align-items-center"></div>
              </>
            )}
          </div>
          <FaEquals className="d-none d-md-block" />
          <FaGripLinesVertical className="d-block d-md-none" />
          <div className="iventory-bg d-flex justify-content-center align-items-center">
            {resultedItemImage ? (
              <img className="item-img" src={resultedItemImage} />
            ) : null}
          </div>
        </div>
        <div className="my-5 d-flex justify-content-center gap-3">
          <button
            onClick={() => {
              loadCraft();
              setSelectedResultedItemId(selectedResultedItemId + 1);
            }}
            className=""
          >
            Next Craft
          </button>
        </div>
      </div>
    </>
  );
}
