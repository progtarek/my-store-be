const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, min: 1, required: true },
        price: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

CartSchema.pre('save', async function (next) {
  if (this.items && this.items.length) {
    this.items = await Promise.all(
      this.items.map(async (item) => {
        const product = await model('Product').findById(item.product);
        return {
          product: item.product,
          quantity: item.quantity,
          price: item.quantity * product.price,
        };
      })
    );
  }
  next();
});

module.exports = model('Cart', CartSchema);
