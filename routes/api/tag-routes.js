const router = require("express").Router();
// object destructuring of each model
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// remember to pass the async for the async function and request, response
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // use the models as reference
  // this is for the get request looking on the index / --> so api/tags/
  // try and catch for the async function
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// endpoint now is the id selected -->  api/tags/:id
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // instead of sequelize findAll method for query, we can use findByPk() --> primary key
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "There is no tag with that id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post method looking at the index for tag and will require some json data to be sent to it to create (CRUD)
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// put method looking at specific id --> can update the properties with the associated id
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "Cannot update, no tag with this id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete method for specific id in request
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
