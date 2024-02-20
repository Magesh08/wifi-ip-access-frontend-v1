import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [wifiIP, setWifiIP] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  const getWifiIP = async () => {
    try {
      const res = await axios.get("http://localhost:3000/local-ip");
      const newWifiIP = res.data.wifiIPAddress;

      if (newWifiIP) {
        setWifiIP(newWifiIP);
        setRequestStatus("Success: Wi-Fi IP received");

        // Send the Wi-Fi IP to the API
        sendWifiIPToAPI(newWifiIP);
      } else {
        setRequestStatus("Failure: Wi-Fi IP address not found");
      }
    } catch (error) {
      console.error("Error fetching Wi-Fi IP:", error.message);
      setRequestStatus("Failure: Error fetching Wi-Fi IP");
    }
  };

  const sendWifiIPToAPI = async (wifiIP) => {
    try {
      // Check if the received Wi-Fi IP matches a specific value
      if (wifiIP === "192.168.183.187") {
        setRequestStatus("Success: Wi-Fi IP matches");
      } else {
        setRequestStatus("Failure: Connect to correct Wi-Fi and try again");
      }

      // Send Wi-Fi IP to your API endpoint
      await axios.post("YOUR_API_ENDPOINT", { wifiIP });

      console.log("Wi-Fi IP sent to API:", wifiIP);
    } catch (error) {
      console.error("Error sending Wi-Fi IP to API:", error.message);
    }
  };

  useEffect(() => {
    getWifiIP();
  }, []);

  return (
    <div className="App">
      <h2>Your Wi-Fi IP Address is</h2>
      <h4>{wifiIP}</h4>
      <p>Status: {requestStatus}</p>
    </div>
  );
}

export default App;
