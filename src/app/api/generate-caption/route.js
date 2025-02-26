import { NextResponse } from 'next/server';
import { client } from "@gradio/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // If the URL is a local path, we need to convert it to a blob
    // This assumes your local images are accessible via their URLs
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.statusText}` }, 
        { status: 500 }
      );
    }
    
    const imageBlob = await imageResponse.blob();
    
    // Connect to the Gradio CLIP Interrogator API
    const app = await client("https://pharmapsychotic-clip-interrogator.hf.space/");
    
    // Use the more detailed analysis (fn_index: 3)
    const result = await app.predict(3, [
      imageBlob,
      "ViT-L (best for Stable Diffusion 1.*)",
      "best"
    ]);
    
    // The caption will be the first item in the result data array
    const generatedCaption = result.data[0];
    
    return NextResponse.json({ caption: generatedCaption });
  } catch (error) {
    console.error('Error generating caption:', error);
    
    // Provide full fallback captions as specified
    const fallbackCaptions = {
      'image1': "A glass teapot sitting on a table, holding a bottle of arak, inspired by Derek Jarman. Made of dried flowers, coffee, and musical instruments, with phragmites. A still image from the movie, set in Tehran, full-width, inspired by Jeanne du Maurier. The subject is in brown robes, captured in multi-layered artworks.",
      'image2': "A group of ducks floating on a lake, captured in an Unsplash photograph during sunset. The panorama is inspired by Flora Macdonald Reid, with swans and an ocean shoreline visible on the horizon.",
      'image3': "A woman standing in front of a bush of purple flowers, a Pexels contest winner. The fashion model has a happy expression, trending on Pexels.",
      'image4': "A woman in a pink suit and a man in a white shirt, captured trending on ArtStation. The 30-year-old French woman is walking confidently in the style of Davey Adesida.",
      'image5': "A woman taking a picture of herself in a mirror, a Pexels contest winner, inspired by Tran Nguyen. She stands in a grassy field with rippling fabric, symbolizing a distortion of reality.",
      'image6': "A man standing in water holding a lantern, featured on Pexels. The scene is set under a moonlit, starry sky, evoking themes of beauty in ugliness, a shining crescent moon, and a sense of longing. The calm ambiance reflects a lunar walk, with the atmosphere of camping.",
      'image7': "A person pouring orange juice into a glass, captured on Unsplash in Brazil. The photo shows a large local food spread, with mangoes featured prominently.",
      'image8': "A small boat floating in the middle of the ocean, a Pexels contest winner. The image represents a solid object in a void.",
      'image9': "A woman in a black top holding a pink ball, depicted in a 90s fashion editorial. The youthful Japanese girl is tall, lanky, and dressed in shamanistic dark blue clothes. The photo features sleek round shapes, with the stone being round as well. The image is playful and cheerful, capturing her in baggy clothing with fringe. This archive photo has a three-color scheme, resembling a magazine photograph.",
      'image10': "A man sitting next to a body of water, holding a camera."
    };
    
    // Extract image name from URL for fallback
    const imageName = imageUrl.split('/').pop().split('.')[0];
    const fallbackCaption = fallbackCaptions[imageName] || "Caption unavailable";
    
    return NextResponse.json({ 
      caption: fallbackCaption,
      error: 'Failed to generate caption using AI. Showing fallback caption.'
    });
  }
}