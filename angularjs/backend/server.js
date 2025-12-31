const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.get('/api/greeting', (req,res)=>{
    const name = req.query.name || 'Guest';
    res.json({message: `Hello, ${name}!`,time: new Date().toISOString()});
});

app.listen(PORT,()=>{
    console.log(`API server running at http://localhost:${PORT}`);
});