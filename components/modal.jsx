import { useState, useEffect } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { FaEquals } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa";
import { selectedItem } from "../atoms/selectedItem";
import { useRecoilState, useRecoilValue } from "recoil";

export function Modal() {
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
  const [selectedResultedItemId, setSelectedResultedItemId] =
    useRecoilState(selectedItem);
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

  useEffect(() => {
    loadCraft();
  }, [selectedResultedItemId]);

  return (
    <>
      <div
        className="modal fade"
        id="updateReview"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Here is your recipe !
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
