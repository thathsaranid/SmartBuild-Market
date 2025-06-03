const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thathsaranidala:20020704@smartbuild.6orfocq.mongodb.net/smartbuild?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

module.exports = mongoose;
