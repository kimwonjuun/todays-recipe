import { useState, useRef } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { storage } from '../../apis/firebase';
import { User, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModal from '../common/ConfirmModal';
import useAlert from '../../hooks/useAlert';
import AlertModal from '../common/AlertModal';

interface EditProfileModalProps {
  setIsModalOpen: Function;
  user: User | null;
  photoURL: string | undefined;
  setPhotoURL: Function;
}

const EditProfileModal = ({
  setIsModalOpen,
  user,
  photoURL,
  setPhotoURL,
}: EditProfileModalProps) => {
  // 프로필 이미지
  const [tempPhotoURL, setTempPhotoURL] = useState<any>(null); // 임시 photoURL 상태
  const [tempFileURL, setTempFileURL] = useState<any>(null); // 임시 file URL 상태
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드
  const uploadFirebase = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTempPhotoURL(reader.result);
    };
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    setTempFileURL(await getDownloadURL(uploaded_file.ref));
  };

  // 카메라 이미지 클릭하면 동작
  const onCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 프로필 닉네임
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  );

  // 프로필 닉네임 수정
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const editDisplayName = e.target.value.trim();
    setDisplayName(editDisplayName);
  };

  // custom modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 프로필 수정
  const handleProfileEdit = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: displayName ? displayName : user.displayName,
        photoURL: tempFileURL || photoURL, // 사용자가 이미지를 업로드한 경우 tempFileURL을 사용
      })
        .then(() => {
          openAlert('프로필 수정 완료');
          closeModal();
          setPhotoURL(tempFileURL || photoURL); // photoURL 업데이트
        })
        .catch((error) => {
          console.log(error);
          openAlert('프로필 수정 실패');
        });
    }
  };

  // 계정 삭제
  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await user.delete();
        sessionStorage.clear();
        openAlert('회원 탈퇴가 완료되었습니다.');
      } catch (error) {
        console.log(error);
        openAlert(
          '회원 탈퇴에 실패했습니다. 오류가 지속되는 경우 재로그인 후에 탈퇴해주세요.'
        );
      }
    } else {
      return;
    }
  };

  // custom window.confirm
  const { openConfirm, closeConfirm, handleConfirm, isOpen } =
    useConfirm(handleDeleteAccount);

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setDisplayName(user?.displayName || '');
    setTempFileURL(null);
    setTempPhotoURL(null);
  };

  return (
    <>
      <ModalWrapper>
        <Modal>
          <CloseButtonWrapper>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </CloseButtonWrapper>
          <TopWrapper>
            <ModalTitle>프로필 수정</ModalTitle>
            <ModalImg>
              <Img
                src={
                  tempPhotoURL ||
                  photoURL ||
                  require('../../assets/my/default_image.png')
                }
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{
                  opacity: 0,
                  position: 'absolute',
                  width: '25%',
                  top: '80%',
                  left: '90%',
                  transform: 'translate(-50%, -50%)',
                }}
                onChange={uploadFirebase}
              />
              <ModalCamImg
                src={require('../../assets/my/camera.png')}
                onClick={onCameraClick}
              />
            </ModalImg>
          </TopWrapper>
          <BottomWrapper>
            <Input
              type="text"
              maxLength={4}
              placeholder={user?.displayName ? user?.displayName : undefined}
              onChange={onChangeDisplayName}
            />
            <SubmitButton
              onClick={handleProfileEdit}
              disabled={
                (displayName === '' || displayName === user?.displayName) &&
                !tempFileURL
              }
            >
              수정하기
            </SubmitButton>
            <DeleteAccountBox onClick={openConfirm}>회원 탈퇴</DeleteAccountBox>
          </BottomWrapper>
        </Modal>
        <ConfirmModal
          message="정말 회원 탈퇴를 진행하시겠습니까?"
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
        <AlertModal
          message={alertMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
      </ModalWrapper>
    </>
  );
};

export default EditProfileModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 23rem;
  height: 30rem;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CloseButtonWrapper = styled.div`
  height: 10%;
`;

const TopWrapper = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
`;

const BottomWrapper = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
  position: relative;
`;

const ModalTitle = styled.div`
  font-size: 1.5rem;
`;

const ModalImg = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ModalCamImg = styled.img`
  position: absolute;
  width: 2.5rem;
  top: 78%;
  left: 88%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
`;

const Input = styled.input`
  width: 16.75rem;
  height: 1.75rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  border: 0.2rem solid ${COLORS.blue1};
  border-radius: 1rem;
  text-align: center;
  outline: none;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  width: 18rem;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  border: 0.175rem solid ${COLORS.blue1};
  border-radius: 1rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;

  border: ${({ disabled }) =>
    disabled ? 'none' : `0.25rem solid ${COLORS.blue1}`};
  background-color: ${({ disabled }) =>
    disabled ? COLORS.gray : COLORS.blue1};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  outline: none;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? COLORS.gray : COLORS.blue2};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 10;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const DeleteAccountBox = styled.div`
  position: absolute;
  right: 0.25rem;
  bottom: 0.75rem;
  font-size: 0.8rem;
  color: ${COLORS.gray};
  text-decoration: underline;
  &:hover {
    color: ${COLORS.violet1};
  }
  cursor: pointer;
`;
