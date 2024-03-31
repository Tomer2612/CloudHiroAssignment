const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

app.use(bodyParser.json());

app.get("/api/data", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM cloudhiro");
    res.json(rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create
app.post("/api/data", async (req, res) => {
  try {
    const {
      date,
      subscription_name,
      resource_group,
      meter_category,
      meter_subcategory,
      resource_location,
      unit_price,
      cost,
      additional_info,
      vcpus,
    } = req.body;
    const { rows } = await db.query(
      "INSERT INTO cloudhiro (date, subscription_name, resource_group, meter_category, meter_subcategory, resource_location, unit_price, cost, additional_info, vcpus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        date,
        subscription_name,
        resource_group,
        meter_category,
        meter_subcategory,
        resource_location,
        unit_price,
        cost,
        additional_info,
        vcpus,
      ]
    );
    res.json({ message: "Record created successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update
app.put("/api/data/:Date/:SubscriptionName", async (req, res) => {
  try {
    const { Date, SubscriptionName } = req.params;
    const {
      date,
      subscription_name,
      resource_group,
      meter_category,
      meter_subcategory,
      resource_location,
      unit_price,
      cost,
      additional_info,
      vcpus,
    } = req.body;
    const { rows } = await db.query(
      "UPDATE cloudhiro SET date = $1, subscription_name = $2, resource_group = $3, meter_category = $4, meter_subcategory = $5, resource_location = $6, unit_price = $7, cost = $8, additional_info = $9, vcpus = $10 WHERE date = $11 AND subscription_name = $12",
      [
        date,
        subscription_name,
        resource_group,
        meter_category,
        meter_subcategory,
        resource_location,
        unit_price,
        cost,
        additional_info,
        vcpus,
        Date,
        SubscriptionName,
      ]
    );
    res.json({ message: "Record updated successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Delete
app.delete("/api/data/:Date/:SubscriptionName", async (req, res) => {
  try {
    const { Date, SubscriptionName } = req.params;
    const { rows } = await db.query(
      "DELETE FROM cloudhiro WHERE date = $1 AND subscription_name = $2",
      [Date, SubscriptionName]
    );
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error"});
   }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
 });
