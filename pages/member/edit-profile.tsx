import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";
import { updateProfile } from "../../services/member";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
interface UserStateTypes {
  id: string;
  name: string;
  email: string;
  avatar: any;
  phoneNumber: string;
}

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMAGES;
      user.avatar = `${IMG}/${userFromPayload.avatar}`;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    console.log(user);
    const data = new FormData();
    data.append("image", user.avatar);
    data.append("name", user.name);
    data.append("name", user.name);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      console.log(response);
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form>
              <div className="photo d-flex">
                <div className="position-relative me-20">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="rounded-circle"
                      alt="icon upload"
                      width={90}
                      height={90}
                    />
                  ) : (
                    <img
                      src={user.avatar}
                      className="rounded-circle"
                      alt="icon upload"
                      width={90}
                      height={90}
                    />
                  )}

                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center"></div>
                </div>
                <div className="image-upload">
                  <label htmlFor="avatar">
                    <img
                      src="/icon/upload.svg"
                      alt="icon upload"
                      width={90}
                      height={90}
                      style={{ borderRadius: "100%" }}
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-30">
                <Input
                  label="Email Address"
                  disabled
                  value={user.email}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      email: event.target.value,
                    })
                  }
                />
              </div>

              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
