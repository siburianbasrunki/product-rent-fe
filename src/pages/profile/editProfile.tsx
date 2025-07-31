import { useState, useRef, type ChangeEvent, useEffect } from "react";
import { useUpdateUser } from "../../hook/user";
import { BiSolidEdit } from "react-icons/bi";
import { FaTimes, FaSpinner } from "react-icons/fa";
import Modal from "./modal";
import { useUploadImage } from "../../hook/booking";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    name: string;
    img?: string;
  };
}

const EditProfileModal = ({
  isOpen,
  onClose,
  currentUser,
}: EditProfileModalProps) => {
  const [name, setName] = useState(currentUser.name);
  const [imagePreview, setImagePreview] = useState(currentUser.img || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage } = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      
      let imgUrl: string | undefined;
      if (imageFile) {
        const { url } = await uploadImage(imageFile);
        imgUrl = url;
      }

      const payload: { username: string; img?: string } = {
        username: name
      };

      if (imgUrl || currentUser.img) {
        payload.img = imgUrl || currentUser.img;
      }

      updateUser(payload, {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Update error:", error);
        }
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setName(currentUser.name);
    setImagePreview(currentUser.img || "");
  }, [currentUser]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#033247]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#2A8E9E] shadow-md">
                <img
                  src={imagePreview || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute -bottom-2 -right-2 bg-[#2A8E9E] text-white p-2 rounded-full shadow-lg hover:bg-[#033247] transition-all duration-300"
              >
                <BiSolidEdit size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1D1E20] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-[#E9F3F4] rounded-lg focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-white text-[#1D1E20] rounded-lg border border-[#E9F3F4] hover:bg-[#E9F3F4] transition-colors duration-300"
                disabled={isPending || isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2A8E9E] text-white rounded-lg hover:bg-[#033247] transition-all duration-300 shadow-md disabled:opacity-70"
                disabled={isPending || isUploading}
              >
                {isPending || isUploading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;