const express= require('express')
const bodyparser = require('body-parser')
const cors= require('cors')

const OpenAI =require ('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app=express()
app.use(bodyparser.json())
app.use(cors())

app.post('/chat', async(req,res)=>{
    const {input}=req.body;
    console.log(input)
try {
    const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: "ronaldo the best player?",
        max_tokens: 30,
      });
      console.log(completion.choices[0].message);
      res.send(completion.choices[0].message);
    
} catch (error) {
    res.status(500).send('Internal server error')
}  
})

app.listen(5000,function(err){
    if(err) throw err
    console.log("Server created successfully", 5000)
})