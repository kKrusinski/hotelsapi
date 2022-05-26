const router = require("express").Router();
const Room = require("../models/Room");
const {verifyTokenAndAdmin} = require("./verifyToken");



 //Room create
router.post("/", verifyTokenAndAdmin,  async (req,res)=>{
const newRoom = new Room(req.body)
try {
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom)
} catch (error) {
    res.status(500).json(error)
}
})


 //Room update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Room delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("Room has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Room get
  router.get("/:id", async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Rooms get
  router.get("/",  async (req, res) => {
    const roomMaxPeople = req.query.maxPeople;
    try {
      let rooms;
   if(roomMaxPeople){
        rooms = await Room.find({maxPeople:{
              $in:[roomMaxPeople],
          },
    });
        }
    else{
          rooms = await Room.find();
      }
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 