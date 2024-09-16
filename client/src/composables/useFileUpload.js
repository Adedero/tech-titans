import { ref } from 'vue';
import { storage } from '@/config/firebase';
import { ref as fRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export default function useFileUpload() {
  const uploadedFileUrl = ref('');

  async function uploadFile(file) {
    const storageRef = fRef(storage, `gs://csc-tech-titans.appspot.com/Titans/${file.name}`);

    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded');

      // Get the download URL
      const url = await getDownloadURL(storageRef);
      
      // Set the uploadedFileUrl
      return url;

    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFile(url) {

      const storageRef = fRef(storage, url);
      
      try {
        // Delete the file
        await deleteObject(storageRef);
      } catch (error) {
        console.error(error);
      }
  }

  return { uploadFile, deleteFile, uploadedFileUrl };
}
