const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://nisansalagamchchige:Hansi2002@cluster0.1z1w5zv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    console.log('Database name:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testConnection();
