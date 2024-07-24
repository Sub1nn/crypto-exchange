import { useEffect, useState, CSSProperties } from "react";
import { FetchDataFromApi } from "./data";

interface CoinData {
  active: boolean;
  id: string;
  name: string;
  description: string;
  reported_rank: number;
}

function App() {
  const [data, setData] = useState<CoinData[] | undefined>();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = (await FetchDataFromApi()) as CoinData[];
        setData(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <div style={styles.main}>
        <h1 style={styles.h1}>Crypto Exchange</h1>
        <div style={styles.container}>
          {data ? (
            data.map((coin, index) => (
              <>
                <div key={index} style={styles.card}>
                  <h2>{coin.name}</h2>
                  <p>
                    <strong>ID:</strong> {coin.id}
                  </p>
                  <p>
                    <strong>Active:</strong> {coin.active ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Rank:</strong>{" "}
                    {coin.reported_rank !== null
                      ? coin.reported_rank
                      : "No Rank Data"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {coin.description
                      ? coin.description.length > 300
                        ? coin.description.substring(0, 300) + "..."
                        : coin.description
                      : "No description available"}
                  </p>
                </div>
              </>
            ))
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #f5af19, #f12711)",

    color: "rgba(255, 255, 255, 0.87)",
    fontFamily: "montserat",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  h1: {
    fontWeight: "bold",
    background: "#a75656",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    borderRadius: "5px",
    padding: "5px 10px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "50px 30px", // row-gap-50px and column-gap-30px
    padding: "10px 20px",
    overflow: "auto",
    boxSizing: "border-box",
  },
  card: {
    borderRadius: "8px",
    padding: "0 20px 10px",
    height: "270px",
    maxWidth: "500px",
    boxShadow: " rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
    backgroundColor: "#8e362e",
  },
};

export default App;
