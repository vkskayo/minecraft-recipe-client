import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Map() {
  const mapStyle = {
    width: 250,
    height: 250,
  };
  const containerStyle = {
    width: 320,
    height: 320,
    backgroundImage: `url("https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.9/map/map_background.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const iconSize = {
    width: 35,
    height: 35,
  };

  const [path, setPath] = useState("/");
  const actualPath = useLocation().pathname;

  const pointing = {
    cursor: "pointer",
  };

  useEffect(() => {
    setPath(actualPath);
  }, []);

  return (
    <>
      <div style={containerStyle} className="position-relative p-5 ">
        {path !== "/foods" ? (
          <Link to="/foods">
            <div className="d-flex align-items-center gap-2 hover-effect mx-2">
              <img
                style={iconSize}
                src="https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.18.1/items/apple.png"
              />
              <p className="indice-1 m-0 text-dark">Foods</p>
            </div>
          </Link>
        ) : null}

        {path !== "/" ? (
          <Link to="/">
            <div className="d-flex align-items-center gap-2 hover-effect mx-2">
              <img
                style={iconSize}
                src="https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.19.1/blocks/crafting_table_front.png"
              />
              <p className="indice-1 m-0 text-dark">Recipes</p>
            </div>
          </Link>
        ) : null}

        <div
          style={pointing}
          className="d-flex align-items-center gap-2 hover-effect mx-2"
        >
          <img
            style={iconSize}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAw0lEQVQ4y72SvQ3CUAyEM0KKNDRhA5DoqMIAVFBEoqOgZwNGYBJmdHSILzJPjqM0seQmz/fjc6pqzTq997YI0H+6EbB9bEw9C6ovtaHmCfT9dT/a87ozZsLSgFpqItGwB9+69tuhXVQF1jDKkAqoN+8sJNGwFFGCoBRKswB0PjQj2AulBLKJdRRZJ72ELJe7lrnoTa7Cn4RbM0gWrAGYC/2BaZxI1efglf1seg3cRKmnBACw7oNcVOQgotm7TxFMpv6rAQRW0AwRKoTrAAAAAElFTkSuQmCC"
          />
          <p className="indice-2 m-0">Biomes</p>
        </div>
        <div
          style={pointing}
          className="d-flex align-items-center gap-2 hover-effect mx-2"
        >
          <img
            style={iconSize}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2klEQVQ4jWNgoDUwVGT5D8NkaQzSE/if6i0OxkQZkiMu/h+EkTUiY5yGwGxcoqMNxkeFLcEaXIwFwBinIehODbET/j9X2hxsAFGGoPsTnyHIalxUuSCGoLsAphDZEJCXkDWCcHR09H8UL2zfvh2rISDNlxeJgTFI48yZM8FqQTTYADEBVrDGa9euoRiCbCNI85VpUmB5mGaQpSA5nIbAnApSDHJFp6ICikaQHhCGxwa6ITCngjBIMwhj1YgMsBkC0gTSnCgiglsjNkNgXgDxQZoJakQ3BK9TqQkAQoET8UHXsmMAAAAASUVORK5CYII="
          />
          <p className="indice-3 m-0">Enchantments</p>
        </div>

        <p style={pointing} className="indice-4 fs-2 mt-4 hover-effect mx-2">
          (In development)
        </p>
      </div>
    </>
  );
}
