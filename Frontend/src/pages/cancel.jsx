import React from "react";
import "../assets/css/product.css";

const Cancel = () => {
  return (
    <div class="sc-container">
      <h1>Something Went Wrong!</h1>
      <p>
        We apologize for the inconvenience. An error occurred while processing
        your order request.
      </p>
      <p>
        For any support, email:{" "}
        <a href="mailto:SmartBuildMarket@company.com">
          SmartBuildMarket@company.com
        </a>
      </p>
      <img src="images/cancel.png" alt="Order Canceled Image" />
      <a href="HistoricFormal.html" class="sc-btn">
        Back to Product Page
      </a>
    </div>
  );
};

export default Cancel;
