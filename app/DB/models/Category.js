const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new Schema(
  {
    name: {
      en: {
        required: true,
        type: String,
        trim: true,
        index: true,
        unique: true,
        min: 4,
        uniqueCaseInsensitive: true,
      },
      ar: {
        required: true,
        type: String,
        trim: true,
        min: 4,
        index: true,
        unique: true,
        uniqueCaseInsensitive: true,
      },
    },
    slug: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  },
  { timestamps: true }
);

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name.en, '_');
  next();
});

module.exports = model('Category', CategorySchema);
