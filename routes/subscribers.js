const express = require('express');
const router = express.Router();
const Subscriber = require('../model/subscriber')



// 0. Getting All

router.get('/' , async(req , res)=>{
    
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);

        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// 1. Getting one
router.get('/:id' , getSubscriber,(req , res)=>
{   
    res.json(res.subscriber);    
})

// 2. Creating one

router.post('/' , async (req , res)=>
{   
    const subscriber = new Subscriber( {
        name : req.body.name , 
        subscriberToChannel : req.body.subscriberToChannel 

    })
    try {

        const newSubsriber = await subscriber.save()
        res.status(201).json(newSubsriber)
        
    } catch (error) {
        res.status(400).json({message : error.message})

    }
    
})



async function getSubscriber(req , res , next)
{
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null)
        {
            return res.status(404).json({message :"Cannot find subscriber"});
        }
    } catch (error) {
        res.status(500).json({message : error.message})

    }

    res.subscriber = subscriber;
    next()
}



//3. Updating One
router.patch('/:id' , getSubscriber, async(req , res)=>
{   

  if(req.body.name != null)
  {
    res.subscriber.name = req.body.name;
  }

  if(req.body.subscriberToChannel != null)
  {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }
    

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(400).json({message : error.message})
 
  }
})


// 4. Deleting one 


router.delete('/:id' , getSubscriber,async(req , res)=>
{   
      try {
        await Subscriber.deleteOne({_id: res.subscriber._id });
        res.json({message : "Subscriber deleted succesfully"});

    } catch (error) {
        res.status(500).json({message : error.message})

      }
})

module.exports  =router;

// export default router;
