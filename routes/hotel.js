const router = require("express").Router();
const Hotel = require("../models/Hotel");
const { verifyTokenAndAdmin} = require("./verifyToken");



 //Hotel create
router.post("/", verifyTokenAndAdmin,  async (req,res)=>{
const newHotel = new Hotel(req.body)
try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel)
} catch (error) {
    res.status(500).json(error)
}
})


 //Hotel update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Hotel delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Hotel get
  router.get("/:id", async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Hotels get
  router.get("/",  async (req, res) => {
    const hotelCity = req.query.city;
    const hotelRooms = req.query.rooms;
    const hotelRating = req.query.rating;
    try {
      let hotels;
   if(hotelCity){
        hotels = await Hotel.find({city:{
              $in:[hotelCity],
          },
    });
      }
    else if(hotelRooms){
        hotels = await Hotel.find({rooms:{
              $in:[hotelRooms],
          },
    });
      }
      else if(hotelRating){
        hotels = await Hotel.find({rating:{
              $in:[hotelRating],
          },
    });
      }
    else{
          hotels = await Hotel.find();
      }
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 