import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import shortid from "shortid";
const app = express();

/* bodyParser is the objects and the when the new request comes in the server it treats the bodyparser as the json */
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));
/* use to connect the mongodb  */
mongoose.connect("mongodb://localhost/rojiplaza-shopping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

/* modal for the product  
mongoose.model is used for createing the model and accept two parameter first one is the name of the collection and the second one is the types of the data in that collections*/
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate }, // when the new product is created in the database then it will assign the new random id which is perfect
    title: String,
    description: String,
    price: Number,
    image: String,
    availableSizes: [String],
  })
);

/* getting the list of the products */
app.get("/api/products", async (req, res) => {
  /* go to the Product model and return all the products which is done by Product.find({}) if the find() method has the empty object then it will returns the whole product available in the database or the modal*/
  const products = await Product.find({});
  res.send(products);
});

/* for deleting the products  */
//:id is the placeholder for the id of the products where we are going to delete it
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id); //req.params.id is the same value that the(when the admin clicked the button to delete the products then the id is attach to the url or the and that id is assign to the req.params.id)

  res.send(deletedProduct);
});
/* for creating the endpoints for adding the product in the database or the products collections */
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);

  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

/* modal for the order */

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true, //it will add the created at and updated at field in the our data
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.cartItems ||
    !req.body.total
  ) {
    return res.send({ message: "Data is required" });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
/* making the port and process.env.port is such powerful to create the port because whenever when we host the websites then if our define port is not available then process.env.PORT will search for that port which is not busy */
const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log("served at http://localhost:5000"));
