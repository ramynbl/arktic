import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialisation du client pour lire les données
export const sanityClient = createClient({
    projectId: 'd54axgq0',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2026-03-11',
})

// Outil magique pour générer les liens des images Sanity
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}