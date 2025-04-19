import React from "react";

const CustomerOrder = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(250, 235, 215)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            color: "#8b4513",
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "600",
          }}
        >
          Your Orders
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid #f0f0f0",
                backgroundColor: "#f9f9f9",
              }}
            >
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Order ID
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Product Name
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Total Price
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>{/* Sample data for demonstration*/}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrder;
