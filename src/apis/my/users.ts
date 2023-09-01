import { User, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

interface userProfileProps {
  user: User;
  displayName: string | null;
  photoURL: string | null;
}

// 유저 프로필 이미지 create
export const uploadUserImage = async (file: File) => {
  const uploaded_file = await uploadBytes(
    ref(storage, `images/${file.name}`),
    file
  );
  return await getDownloadURL(uploaded_file.ref);
};

// 유저 프로필 update
export const updateUserProfile = async ({
  user,
  displayName,
  photoURL,
}: userProfileProps) => {
  return await updateProfile(user, {
    displayName,
    photoURL,
  });
};

// 유저 계정 delete
export const deleteUserAccount = async (user: User) => {
  return await user.delete();
};
