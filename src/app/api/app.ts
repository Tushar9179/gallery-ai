export const uploadImageAndGetCaption = async (imagePath: string): Promise<string> => {
    const imageName = imagePath.split("/").pop() || "";
    
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], imageName, { type: "image/jpeg" });
  
      const formData = new FormData();
      formData.append("image", file);
  
      const apiResponse = await fetch("http://127.0.0.1:5000/caption", {
        method: "POST",
        body: formData,
      });
  
      const data = await apiResponse.json();
  
      if (!apiResponse.ok || data.error) {
        throw new Error(data.error || `Server Error: ${apiResponse.status}`);
      }
  
      return data.caption || "No caption available";
    } catch (error) {
      console.error(`Error generating caption for ${imageName}:`, error);
      return "Caption unavailable";
    }
  };
  