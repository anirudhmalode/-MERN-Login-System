const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connection Established`)).catch(err => console.log('DB Connection Error -->', err));
