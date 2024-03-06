import { useState } from "react";
import axios from "axios";

const useApi = (apiUrl) => {
  const [error, setError] = useState("");

  const fetchDistricts = async (coordinates, type) => {
    let url = ``;
    let data = {};

    if (type === "click") {
      url = `${apiUrl}/get-okres`;
      data = { coordinate: coordinates };
    } else if (type === "polygon") {
      url = `${apiUrl}/get-okreses`;
      data = { polygon: coordinates };
    }

    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      if (
        (type === "click" && response.data.district) ||
        (type === "polygon" && Array.isArray(response.data))
      ) {
        return response.data;
      } else {
        setError("Please select a valid area in Slovakia.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setError("Failed to fetch districts.");
      return null;
    }
  };

  const fetchHistoricalData = async (district) => {
    const options = {
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8e9659e239msha0e2ee3c5fc19a2p1c0830jsn2b73b68cdc35",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `3 historical attractions in ${district}`,
          },
        ],
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };
  return { error, fetchDistricts, fetchHistoricalData };
};

export default useApi;
