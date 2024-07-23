import { useEffect, useState, CSSProperties } from "react";
import { FetchDataFromApi } from "./data";

interface CoinData {
  active: boolean;
  id: string;
  name: string;
  description: string;
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
              <div key={index} style={styles.card}>
                <h2>{coin.name}</h2>
                <p>
                  <strong>ID:</strong> {coin.id}
                </p>
                <p>
                  <strong>Active:</strong> {coin.active ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {coin.description || "No description available"}
                </p>
              </div>
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
    // justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  },
  h1: {
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#444",
  },
  container: {
    display: "grid",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    height: "100vh",
    minWidth: "100vw",
    backgroundColor: "#dad2d2",

    gap: "20px",
    padding: "20px",
    overflow: "scroll",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#7c5757",
  },
};

export default App;
