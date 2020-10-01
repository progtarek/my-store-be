const mongoose = require('./mongoose-setup');

module.exports = async function (cb) {
  try {
    const options = {
      dbName: 'my-store',
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    await mongoose.connect(process.env.DB_URI, options).then((_) => {
      console.log('Database connected successfully');
      cb();
    });
  } catch (error) {
    throw error;
  }
};
