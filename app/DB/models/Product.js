const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new Schema(
  {
    name: {
      en: {
        required: true,
        type: String,
        trim: true,
        index: true,
        unique: true,
        min: 3,
        uniqueCaseInsensitive: true,
      },
      ar: {
        required: true,
        type: String,
        trim: true,
        min: 3,
        index: true,
        unique: true,
        uniqueCaseInsensitive: true,
      },
    },
    description: {
      en: {
        required: false,
        type: String,
        trim: true,
        min: 3,
      },
      ar: {
        required: false,
        type: String,
        trim: true,
        min: 3,
      },
    },
    slug: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    offer: { type: Number },
    productPictures: [{ type: String, required: false }],
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        review: { type: String, required: true, min: 3 },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

ProductSchema.pre('save', async function (next) {
  const category = await model('Category').findById(this.category);
  this.slug = slugify(`${category.name.en}-${this.name.en}`, {
    lower: true,
    replacement: '-',
  });
  next();
});

module.exports = model('Product', ProductSchema);
