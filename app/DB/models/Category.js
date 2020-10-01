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
    slug: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    sort: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name.en, {
    lower: true,
    replacement: '-',
  });
  next();
});

module.exports = model('Category', CategorySchema);
