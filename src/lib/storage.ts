import { supabase } from '../supabaseClient';

/**
 * Uploads a file to the private "app-files" bucket in Supabase Storage.
 * The file path follows the folder structure:
 * ${userId}/${featureName}/${itemId}/${uuid}.${extension}
 *
 * @param file The file object to upload
 * @param featureName Name of the feature (e.g., 'paymentProof', 'mentors', 'facilities', 'testimonials')
 * @param itemId Unique ID of the associated item
 * @returns Promise resolving to the uploaded storage path
 */
export async function uploadFile(
  file: File,
  featureName: string,
  itemId: string
): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || 'u_anonymous';
  
  const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop() || 'png';
  const filePath = `${userId}/${featureName}/${itemId}/${uuid}.${extension}`;
  
  const { error } = await supabase.storage
    .from('app-files')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    
  if (error) {
    throw error;
  }
  
  return filePath;
}

/**
 * Generates a signed URL for a private storage path.
 * If the path is already a full URL or base64, returns it as-is.
 *
 * @param path The storage path or external URL
 * @param expiresIn Time in seconds until the signed URL expires (defaults to 24 hours)
 * @returns Promise resolving to the signed URL or fallback string
 */
export async function getSignedUrl(path: string, expiresIn: number = 60 * 60 * 24): Promise<string> {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  try {
    const { data, error } = await supabase.storage
      .from('app-files')
      .createSignedUrl(path, expiresIn);
      
    if (error) {
      console.error('Error generating signed URL for:', path, error);
      return '';
    }
    
    return data?.signedUrl || '';
  } catch (err) {
    console.error('Exception generating signed URL:', err);
    return '';
  }
}

/**
 * Deletes a file from Supabase Storage using its path.
 *
 * @param path The storage path to delete
 */
export async function deleteFile(path: string): Promise<void> {
  if (!path || path.startsWith('http') || path.startsWith('data:')) {
    return;
  }
  
  try {
    const { error } = await supabase.storage
      .from('app-files')
      .remove([path]);
      
    if (error) {
      console.error('Error deleting file from Supabase Storage:', path, error);
    }
  } catch (err) {
    console.error('Exception deleting file from Supabase Storage:', err);
  }
}
