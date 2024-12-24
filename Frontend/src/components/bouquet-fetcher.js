import { useEffect } from "react";

const BouquetFetcher = () => {
  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/bouquets");

        if (response.ok) {
          const bouquets = await response.json();

          localStorage.setItem("mesBouquets", JSON.stringify(bouquets));
        } else {
          console.error("Error ");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBouquets();
  }, []);

  return null;
};

export default BouquetFetcher;
