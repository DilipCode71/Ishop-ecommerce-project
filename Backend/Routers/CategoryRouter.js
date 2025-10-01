const express = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CategoryRouter = express.Router();
const fileUpload = require("express-fileupload");
const adminAuth = require("../middleware/adminAuth");

// Create category start   
CategoryRouter.post(
  "/create",
  [
    adminAuth,
    fileUpload(
      {
        createParentPath: true,
      }
    ),

  ],
   
  
  (req, res) => {
    const result = new CategoryController().create(
      req.body,
      req.files.CategoryImageName
    );
    result
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
);
// Create category End

// read And show category start

CategoryRouter.get("/:id?",(req, res) => {
  const result = new CategoryController().readShow(req.params.id);

  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// read And show category End

// Status category updated start
CategoryRouter.patch("/status-update/:id",adminAuth, (req, res) => {
  const result = new CategoryController().status(req.params.id);

  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Status category updated End

// Delete category start

CategoryRouter.delete("/delete/:id",adminAuth, (req, res) => {
  const result = new CategoryController().deleteCategory(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Delete category End

// Edit category start

CategoryRouter.put(
  "/edit/:id",
 [
  adminAuth,
   fileUpload({
      createParentPath: true,
    }),
 ],
   
  (req, res) => {
    const result = new CategoryController().editCategory(
      req.body,
      req.params.id,
      req.files?.CategoryImageName
    );

    result
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

// Edit category End

module.exports = CategoryRouter;
