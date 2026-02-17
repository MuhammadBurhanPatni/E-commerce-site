import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [

    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

  ],
});
