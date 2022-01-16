const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KI0ArDLlI568lnbAv5a5zkPygrlvT4oycepfpVLU1VhMgqOondWujsGOQw596ZhzBDaWvDNhFWDdiNjuQhGnHtT00eoDlOnSm"
);

//API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//API Routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>>", total);

  if (total === "0") {
    res.status(200).send({ clientSecret: null });
    return;
  }

  //amount could not be 0
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(total), //subunits of the currency
      currency: "usd",
    });

    //console.log(paymentIntent);

    //OK - Created
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }

  return;
});

// Listen Command
exports.api = functions.https.onRequest(app);

//firebase emulators:start
//Example endpoint
//(http://localhost:5001/react-clone-01-13-22/us-central1/api)
