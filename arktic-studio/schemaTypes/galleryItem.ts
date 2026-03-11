// arktic-studio/schemas/galleryItem.js
export default {
  name: 'galleryItem',
  title: 'Image de la Galerie',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Permet de recadrer l'image dans Sanity
      }
    },
    {
      name: 'title',
      title: 'Titre principal (qui s\'affiche au passage de la souris)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Catégorie (ex: Afterwork, Escalade)',
      type: 'string',
    },
    {
      name: 'altText',
      title: 'Texte alternatif (pour le SEO et l\'accessibilité)',
      type: 'string',
    }
  ],
}