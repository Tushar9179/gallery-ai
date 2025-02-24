import { useEffect, useState } from 'react';
import { client } from "@gradio/client";

const GalleryPage = () => {
  const [caption, setCaption] = useState(""); // Store the caption result
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Async function to fetch the image and predict
    const fetchAndPredict = async () => {
      try {
        // Fetch the local image from the 'public' folder
        const response_0 = await fetch("/images/image1.jpg");
        const exampleImage = await response_0.blob();  // Convert it to a Blob

        // Initialize the Gradio app
        const app = await client("https://pharmapsychotic-clip-interrogator.hf.space/");

        // Predict the result using the image and model
        const result = await app.predict(1, [
          exampleImage, // Image blob
          "ViT-L (best for Stable Diffusion 1.*)", // Model option
        ]);

        setCaption(result.data); // Store the caption in state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching or predicting:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    // Trigger the function when the component mounts
    fetchAndPredict();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Gallery Page</h1>
      {loading ? (
        <p>Loading caption...</p>
      ) : (
        <p>{caption ? `Caption: ${caption}` : "No caption available"}</p>
      )}
    </div>
  );
};

export default GalleryPage;
